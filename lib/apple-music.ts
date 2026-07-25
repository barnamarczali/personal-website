import { SignJWT, importPKCS8 } from 'jose';

/**
 * Apple Music does NOT expose a public "currently playing" endpoint.
 * The closest thing available is the "recently played tracks" endpoint, which
 * updates once a track finishes playing. So this is near-live, not realtime.
 *
 * Two credentials are needed:
 *  1. a developer token: an ES256 JWT signed with a MusicKit private key
 *     (.p8) from the Apple Developer Program. Minted here, server side.
 *  2. a Music User Token: obtained in-browser via MusicKit JS authorize().
 *     The admin page does that and stores the result in Redis.
 */

const RECENTLY_PLAYED_URL =
  'https://api.music.apple.com/v1/me/recent/played/tracks?limit=1&types=songs';

// Apple caps developer tokens at 6 months. Mint for 180 days.
const TOKEN_TTL_SECONDS = 180 * 24 * 60 * 60;
// Re-mint once the cached token is within 24h of expiring.
const TOKEN_RENEW_WINDOW_SECONDS = 24 * 60 * 60;

export interface AppleMusicTrack {
  title: string;
  url: string;
}

/**
 * Thrown when Apple rejects the Music User Token (401/403). The caller should
 * delete the stored user token and fall back to the manual song.
 */
export class AppleMusicAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppleMusicAuthError';
  }
}

export function isAppleMusicConfigured(): boolean {
  return Boolean(
    process.env.APPLE_MUSIC_TEAM_ID &&
      process.env.APPLE_MUSIC_KEY_ID &&
      process.env.APPLE_MUSIC_PRIVATE_KEY
  );
}

let cachedDeveloperToken: { token: string; expiresAt: number } | null = null;

export async function getDeveloperToken(): Promise<string> {
  const teamId = process.env.APPLE_MUSIC_TEAM_ID;
  const keyId = process.env.APPLE_MUSIC_KEY_ID;
  const rawPrivateKey = process.env.APPLE_MUSIC_PRIVATE_KEY;

  if (!teamId || !keyId || !rawPrivateKey) {
    throw new Error('Apple Music environment variables are not configured');
  }

  const nowSeconds = Math.floor(Date.now() / 1000);

  if (
    cachedDeveloperToken &&
    cachedDeveloperToken.expiresAt - nowSeconds > TOKEN_RENEW_WINDOW_SECONDS
  ) {
    return cachedDeveloperToken.token;
  }

  // Dashboard-pasted .p8 contents usually arrive with literal "\n" sequences.
  const privateKeyPem = rawPrivateKey.replace(/\\n/g, '\n');
  const privateKey = await importPKCS8(privateKeyPem, 'ES256');

  const expiresAt = nowSeconds + TOKEN_TTL_SECONDS;
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'ES256', kid: keyId })
    .setIssuer(teamId)
    .setIssuedAt(nowSeconds)
    .setExpirationTime(expiresAt)
    .sign(privateKey);

  cachedDeveloperToken = { token, expiresAt };

  return token;
}

interface RecentlyPlayedResponse {
  data?: Array<{
    attributes?: {
      name?: string;
      artistName?: string;
      url?: string;
    };
  }>;
}

/**
 * Returns the most recently played song, or null when Apple has nothing to
 * report. Throws AppleMusicAuthError on 401/403 so the caller can drop the
 * stored Music User Token; throws a plain Error on any other failure.
 */
export async function fetchRecentlyPlayed(
  musicUserToken: string
): Promise<AppleMusicTrack | null> {
  const developerToken = await getDeveloperToken();

  const response = await fetch(RECENTLY_PLAYED_URL, {
    headers: {
      Authorization: `Bearer ${developerToken}`,
      'Music-User-Token': musicUserToken,
    },
    cache: 'no-store',
  });

  if (response.status === 401 || response.status === 403) {
    throw new AppleMusicAuthError(
      `Apple Music rejected the user token (${response.status})`
    );
  }

  if (!response.ok) {
    throw new Error(`Apple Music request failed (${response.status})`);
  }

  const body = (await response.json()) as RecentlyPlayedResponse;
  const attributes = body.data?.[0]?.attributes;

  if (!attributes?.name) {
    return null;
  }

  const title = attributes.artistName
    ? `${attributes.name} - ${attributes.artistName}`
    : attributes.name;

  const url =
    attributes.url ||
    `https://music.apple.com/search?term=${encodeURIComponent(title)}`;

  return { title, url };
}

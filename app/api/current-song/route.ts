import { createClient } from 'redis';
import { NextRequest, NextResponse } from 'next/server';
import {
  AppleMusicAuthError,
  fetchRecentlyPlayed,
  isAppleMusicConfigured,
} from '@/lib/apple-music';

export const runtime = 'nodejs';
// Next caches GET route handlers by default, which would freeze the song at
// build time. This one has to run on every request to stay live.
export const dynamic = 'force-dynamic';

// Create Redis client
const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on('error', (err) => console.error('Redis Client Error', err));

// Connect to Redis. Memoizing the promise (not a boolean) keeps two
// concurrent requests from both calling connect(), which throws
// "Socket already opened" on the loser.
let connectPromise: Promise<unknown> | null = null;
async function connectRedis() {
  if (redis.isOpen) return;
  if (!connectPromise) {
    connectPromise = redis.connect().catch((error) => {
      connectPromise = null;
      throw error;
    });
  }
  await connectPromise;
}

const APPLE_USER_TOKEN_KEY = 'apple-music:user-token';
const APPLE_CACHE_KEY = 'music:apple-cache';
const APPLE_CACHE_TTL_MS = 60 * 1000;

/**
 * Apple Music has no public "now playing" endpoint. The closest thing is the
 * "recently played tracks" endpoint, so this updates as songs finish rather
 * than in true realtime. Returns null whenever Apple is not configured, not
 * connected, or fails for any reason, in which case the caller falls back to
 * the song set manually from /admin.
 */
async function getAppleMusicSong() {
  if (!isAppleMusicConfigured()) {
    return null;
  }

  try {
    const musicUserToken = await redis.get(APPLE_USER_TOKEN_KEY);
    if (!musicUserToken) {
      return null;
    }

    const cached = await redis.get(APPLE_CACHE_KEY);
    if (cached) {
      const { title, url, fetchedAt } = JSON.parse(cached);
      if (title && url && Date.now() - new Date(fetchedAt).getTime() < APPLE_CACHE_TTL_MS) {
        return { title, url };
      }
    }

    const track = await fetchRecentlyPlayed(musicUserToken);
    if (!track) {
      return null;
    }

    const now = new Date().toISOString();
    await redis.set(
      APPLE_CACHE_KEY,
      JSON.stringify({ ...track, fetchedAt: now })
    );
    // Keep the manual key warm so it stays a sensible fallback if apple
    // music is later disconnected or starts failing.
    await redis.set(
      'music:current',
      JSON.stringify({ ...track, updatedAt: now, source: 'apple-music' })
    );

    return track;
  } catch (error) {
    if (error instanceof AppleMusicAuthError) {
      console.error('Apple Music user token rejected, clearing it');
      await redis.del(APPLE_USER_TOKEN_KEY).catch(() => undefined);
    } else {
      console.error('Apple Music lookup failed:', error);
    }
    return null;
  }
}

// GET - Fetch current song
export async function GET() {
  try {
    await connectRedis();

    const appleSong = await getAppleMusicSong();
    if (appleSong) {
      return NextResponse.json({ currentSong: appleSong });
    }

    const data = await redis.get('music:current');
    const currentSong = data ? JSON.parse(data) : {
      title: 'humans',
      url: 'https://en.wikipedia.org/wiki/Human'
    };
    
    return NextResponse.json({ currentSong });
  } catch (error) {
    console.error('Error fetching current song:', error);
    return NextResponse.json(
      { error: 'Failed to fetch current song' },
      { status: 500 }
    );
  }
}

// POST - Update current song (using POST instead of PUT)
export async function POST(request: NextRequest) {
  try {
    await connectRedis();
    
    const { title, url } = await request.json();

    if (!title || !url) {
      return NextResponse.json(
        { error: 'Title and URL are required' },
        { status: 400 }
      );
    }

    const songData = {
      title,
      url,
      updatedAt: new Date().toISOString()
    };

    await redis.set('music:current', JSON.stringify(songData));

    return NextResponse.json({ 
      success: true,
      currentSong: songData 
    });
  } catch (error) {
    console.error('Error updating current song:', error);
    return NextResponse.json(
      { error: 'Failed to update current song' },
      { status: 500 }
    );
  }
}


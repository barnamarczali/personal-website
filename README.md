# Personal Website

Personal website of Barna Marczali built with Next.js, TypeScript, and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Database Setup (Vercel Redis)

1. **Create Redis Database**:
   - Go to Vercel Dashboard → Your Project → Storage tab
   - Click "Create Database" → Select "Redis" (Upstash)
   - Vercel automatically adds `REDIS_URL` environment variable

2. **Set Admin Password**:
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add: `PASSWORD` = your chosen admin password
   - Redeploy

3. **Local Development** (optional):
   ```bash
   vercel env pull .env.local
   npm run dev
   ```

## Admin Dashboard

Visit `/admin` to view submitted recommendations (password-protected).

## Stack

- Next.js 14 + TypeScript + React 18
- Tailwind CSS
- Vercel Redis (stores song/writing recommendations)
- Custom animations & click effects
- Fully responsive design

## live apple music

The homepage can show what you have actually been listening to instead of a song
you typed into `/admin`.

Honest caveat: Apple has no public "currently playing" endpoint. The closest thing
is the Apple Music API "recently played tracks" endpoint, so the song on the site
changes once each track finishes, not the second you press play.

### 1. Requirements

- An active **Apple Developer Program** membership (the paid one).
- A MusicKit key: Apple Developer portal → Certificates, Identifiers & Profiles →
  Keys → create a key with **MusicKit** enabled → download the `.p8` file. Apple
  lets you download it once, so keep it safe.
- Your **Team ID** (top right of the developer portal) and the **Key ID** shown on
  the key you just created.

### 2. Environment variables

```bash
# .env.local (placeholder values, replace with your own)
APPLE_MUSIC_TEAM_ID=ABCDE12345
APPLE_MUSIC_KEY_ID=FGHIJ67890
APPLE_MUSIC_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqG...\n-----END PRIVATE KEY-----"
```

`APPLE_MUSIC_PRIVATE_KEY` is the full contents of the `.p8` file. When you paste it
into the Vercel dashboard you can either keep the real line breaks or flatten it to
a single line using literal `\n` escapes. Both work: the app turns `\n` back into
newlines before signing.

### 3. Connect

1. Deploy, or restart `npm run dev` so the new env vars are loaded.
2. Open `/admin` and log in.
3. In the "apple music" card, click **connect apple music** and sign in with your
   Apple ID in the popup. That gives the site a Music User Token, which is stored
   in Redis.
4. Done. The site now shows your most recently played track.

If the keys are missing, if the Music User Token is revoked, or if Apple fails for
any other reason, the site quietly falls back to whatever is in the "currently
listening to" field on `/admin`, so nothing ever breaks visibly.

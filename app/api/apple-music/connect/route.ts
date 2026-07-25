import { createClient } from 'redis';
import { NextRequest, NextResponse } from 'next/server';
import { isAppleMusicConfigured } from '@/lib/apple-music';

export const runtime = 'nodejs';

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

const USER_TOKEN_KEY = 'apple-music:user-token';
const CACHE_KEY = 'music:apple-cache';

// POST - three password-protected actions:
//   { password, status: true }          -> { connected, configured }
//   { password, musicUserToken }        -> store the Music User Token
//   { password, disconnect: true }      -> forget the token and cached track
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, musicUserToken, disconnect, status } = body;

    const correctPassword = process.env.PASSWORD;

    if (!correctPassword) {
      return NextResponse.json(
        { error: 'Admin password not configured' },
        { status: 500 }
      );
    }

    if (!password || password !== correctPassword) {
      return NextResponse.json(
        { error: 'Incorrect password' },
        { status: 401 }
      );
    }

    await connectRedis();

    if (status === true) {
      const stored = await redis.get(USER_TOKEN_KEY);
      return NextResponse.json({
        connected: Boolean(stored),
        configured: isAppleMusicConfigured(),
      });
    }

    if (disconnect === true) {
      await redis.del(USER_TOKEN_KEY);
      await redis.del(CACHE_KEY);
      return NextResponse.json({ success: true });
    }

    if (typeof musicUserToken !== 'string' || !musicUserToken.trim()) {
      return NextResponse.json(
        { error: 'musicUserToken is required' },
        { status: 400 }
      );
    }

    await redis.set(USER_TOKEN_KEY, musicUserToken.trim());
    // Drop any stale cached track so the next poll fetches fresh.
    await redis.del(CACHE_KEY);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling Apple Music connection:', error);
    return NextResponse.json(
      { error: 'Failed to update Apple Music connection' },
      { status: 500 }
    );
  }
}

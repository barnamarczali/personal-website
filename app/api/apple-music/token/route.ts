import { NextRequest, NextResponse } from 'next/server';
import { getDeveloperToken, isAppleMusicConfigured } from '@/lib/apple-music';

export const runtime = 'nodejs';

// POST - Mint an Apple Music developer token for the admin page's
// MusicKit JS configure() call. Password protected, same as /api/auth.
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

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

    if (!isAppleMusicConfigured()) {
      return NextResponse.json(
        { error: 'apple music not configured' },
        { status: 503 }
      );
    }

    const developerToken = await getDeveloperToken();

    return NextResponse.json({ developerToken });
  } catch (error) {
    console.error('Error minting Apple Music developer token:', error);
    return NextResponse.json(
      { error: 'Failed to mint developer token' },
      { status: 500 }
    );
  }
}

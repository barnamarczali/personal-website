import { createClient } from 'redis';
import { NextRequest, NextResponse } from 'next/server';

// Create Redis client
const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on('error', (err) => console.error('Redis Client Error', err));

// Connect to Redis (singleton pattern)
let isConnected = false;
async function connectRedis() {
  if (!isConnected) {
    await redis.connect();
    isConnected = true;
  }
}

// GET - Fetch current song
export async function GET() {
  try {
    await connectRedis();
    
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


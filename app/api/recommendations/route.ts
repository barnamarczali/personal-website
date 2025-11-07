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

export async function POST(request: NextRequest) {
  try {
    await connectRedis();
    
    const body = await request.json();
    const { type, content } = body;

    if (!type || !content) {
      return NextResponse.json(
        { error: 'Type and content are required' },
        { status: 400 }
      );
    }

    // Validate type
    if (!['song', 'book', 'writing'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type. Must be song, book, or writing' },
        { status: 400 }
      );
    }

    // Create a unique key for this recommendation
    const timestamp = Date.now();
    const key = `recommendation:${type}:${timestamp}`;

    // Store the recommendation with metadata
    const data = JSON.stringify({
      type,
      content,
      timestamp,
      date: new Date().toISOString(),
    });

    await redis.set(key, data);

    // Also add to a list for easy retrieval
    await redis.lPush(`recommendations:${type}`, key);

    return NextResponse.json({
      success: true,
      message: 'Recommendation saved successfully',
    });
  } catch (error) {
    console.error('Error saving recommendation:', error);
    return NextResponse.json(
      { error: 'Failed to save recommendation' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectRedis();
    
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');

    if (!type) {
      return NextResponse.json(
        { error: 'Type parameter is required' },
        { status: 400 }
      );
    }

    // Get all recommendations of this type
    const keys = await redis.lRange(`recommendations:${type}`, 0, -1);
    const recommendations = await Promise.all(
      keys.map(async (key) => {
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
      })
    );

    return NextResponse.json({
      success: true,
      recommendations: recommendations.filter(Boolean),
    });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recommendations' },
      { status: 500 }
    );
  }
}


import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
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
    await kv.set(key, {
      type,
      content,
      timestamp,
      date: new Date().toISOString(),
    });

    // Also add to a list for easy retrieval
    await kv.lpush(`recommendations:${type}`, key);

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
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');

    if (!type) {
      return NextResponse.json(
        { error: 'Type parameter is required' },
        { status: 400 }
      );
    }

    // Get all recommendations of this type
    const keys = await kv.lrange(`recommendations:${type}`, 0, -1);
    const recommendations = await Promise.all(
      keys.map(async (key) => await kv.get(key))
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


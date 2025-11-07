import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    // Check if password matches the environment variable
    const correctPassword = process.env.PASSWORD;

    if (!correctPassword) {
      return NextResponse.json(
        { error: 'Admin password not configured' },
        { status: 500 }
      );
    }

    if (password === correctPassword) {
      return NextResponse.json({
        success: true,
        authenticated: true,
      });
    } else {
      return NextResponse.json({
        success: false,
        authenticated: false,
        error: 'Incorrect password',
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Error authenticating:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}


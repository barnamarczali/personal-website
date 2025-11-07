# Database Setup Guide

This site uses **Redis** to store recommendations. Follow these simple steps to set it up:

## Setup Steps

### 1. Add Redis to Your Vercel Project

The package is already installed in this project. To enable Redis in Vercel:

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to the **Storage** tab
4. Click **Create Database**
5. Select **Redis** (Upstash Redis)
6. Give it a name (e.g., "personal-website-redis")
7. Click **Create**

### 2. Connect to Your Project

After creating the Redis database:

1. Vercel will automatically add the `REDIS_URL` environment variable
2. The environment variable will be in the format: `redis://default:password@host:port`
3. Redeploy your site (Vercel will prompt you to do this)

### 3. Local Development (Optional)

If you want to test locally with a real database:

1. Pull the environment variables from Vercel:
   ```bash
   vercel env pull .env.local
   ```

2. Run your development server:
   ```bash
   npm run dev
   ```

Alternatively, for local testing without setting up Redis, the API will fail gracefully.

## How It Works

### Database Structure

The database stores three types of recommendations:
- **Song recommendations** - from the music section
- **Writing requests** - from the writing section  
- **Book recommendations** - (input not yet added, but supported by API)

### Data Format

Each recommendation is stored with:
```json
{
  "type": "song" | "writing" | "book",
  "content": "user's recommendation text",
  "timestamp": 1234567890,
  "date": "2025-11-07T12:00:00.000Z"
}
```

### API Endpoints

- **POST** `/api/recommendations` - Save a new recommendation
  - Body: `{ "type": "song" | "writing" | "book", "content": "text" }`
  
- **GET** `/api/recommendations?type=song` - Get all recommendations of a type

## Viewing Recommendations

To view the recommendations people have submitted:

1. Visit `/admin` on your site to see all submissions
2. Or use the Vercel Redis dashboard:
   - Go to Storage → Your Redis Database
   - Click "Data Browser"
   - Search for keys like `recommendations:song` or `recommendations:writing`

## Cost

Upstash Redis on Vercel has a generous free tier:
- 10,000 commands per day
- 30MB storage

This is more than enough for a personal website collecting recommendations!

## Admin Dashboard Security

The admin dashboard at `/admin` is password-protected. You need to set up a password:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add a new environment variable:
   - **Name**: `PASSWORD`
   - **Value**: Your chosen admin password
3. Redeploy your site

Once set up, you'll need to enter this password to access the admin dashboard and view recommendations.

## Environment Variables

Required environment variables:
- `REDIS_URL` - Redis connection URL (automatically added by Vercel)
  - Format: `redis://default:password@host:port`
- `PASSWORD` - Admin password for accessing the dashboard (you need to add this)

## Troubleshooting

If recommendations aren't saving:
1. Check that Redis is properly connected in Vercel Dashboard
2. Check the browser console for errors
3. Verify the `REDIS_URL` environment variable is set (in Vercel Dashboard → Settings → Environment Variables)

If you can't access the admin dashboard:
1. Make sure the `PASSWORD` environment variable is set in Vercel
2. Clear your browser's session storage and try again
3. Check the browser console for authentication errors


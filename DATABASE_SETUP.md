# Database Setup Guide

This site uses **Vercel KV** (Redis) to store recommendations. Follow these simple steps to set it up:

## Setup Steps

### 1. Install Vercel KV in Your Project

The package is already installed in this project, but when you deploy to Vercel, you need to enable KV:

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to the **Storage** tab
4. Click **Create Database**
5. Select **KV Database**
6. Give it a name (e.g., "personal-website-kv")
7. Click **Create**

### 2. Connect to Your Project

After creating the KV database:

1. Vercel will automatically connect it to your project
2. The required environment variables will be added automatically
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

Alternatively, for local testing without setting up KV, the API will fail gracefully and you can add mock responses.

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

1. Create a simple admin page (optional), or
2. Use the Vercel KV dashboard:
   - Go to Storage → Your KV Database
   - Click "Data Browser"
   - Search for keys like `recommendations:song` or `recommendations:writing`

## Cost

Vercel KV has a generous free tier:
- 256MB storage
- 3000 commands per day

This is more than enough for a personal website collecting recommendations!

## Troubleshooting

If recommendations aren't saving:
1. Check that KV is properly connected in Vercel Dashboard
2. Check the browser console for errors
3. Verify environment variables are set (in Vercel Dashboard → Settings → Environment Variables)

The required environment variables (automatically added by Vercel):
- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`


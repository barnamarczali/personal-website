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

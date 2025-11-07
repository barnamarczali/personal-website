# Personal Website

personal website of Barna Marczali

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- React 18
- Vercel KV (Redis database)

## Features

- 🎨 Beautiful, animated UI with smooth page transitions
- 🎵 Music section with playlist recommendations
- ✍️ Writing section with interactive inputs
- 💾 Database integration for collecting song recommendations and writing requests
- 🔥 Custom click spark effects
- 📱 Fully responsive design

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Database Setup

The site uses Vercel KV for storing recommendations. See `DATABASE_SETUP.md` for detailed setup instructions.

For local development without database:
```bash
vercel env pull .env.local  # Optional: pull env vars from Vercel
npm run dev
```

## Admin Dashboard

Visit `/admin` to view submitted recommendations (requires database setup).

## Design

- Background: `#063970`
- Accent: `#E58F65`
- Text: `#F1F1E7`
- Font: Manrope (sans-serif)

## Documentation

- `DATABASE_SETUP.md` - Database configuration guide

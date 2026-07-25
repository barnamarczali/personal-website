# 2026-07-25: full redesign, scout rebrand, live apple music

## What we did
Five-lens design critique, then a full implementation: component split of the 1288-line page.tsx,
display-type landing with letter stagger, live now-playing surfaced on the landing, flat crisp navy
(gradients removed on feedback), flat rounded-md project cards (glow removed on feedback), scout as
featured project + timeline entry (dayli ended jun 2026), cmd+K palette, strum easter egg, ?v= deep
links, custom 404, OG image, reduced-motion sweep. Apple Music "live" pipeline: MusicKit dev-token
route (jose), admin connect flow, recently-played -> Redis with 60s cache and manual fallback.

## What broke / what surprised us
- `npm run build` while `next dev` runs clobbers .next; dev server 404s all static assets. Restart dev after builds.
- Original Redis connect used a boolean singleton; concurrent requests raced into "Socket already opened" 500s. Fixed with a memoized connect promise in current-song + apple-music routes. Same latent bug still exists in app/api/recommendations/route.ts (untouched, admin-only).
- Tailwind rings are box-shadows: ring transitions need box-shadow in the transition list.
- The fixed ambient rail collided with long timeline lines; moved it into the bottom scrim's fade zone.

## What the next session should know
- Verify scout facts: role "co-founder" and location "baltimore, md" were inferred, not confirmed.
- Apple Music needs APPLE_MUSIC_TEAM_ID / APPLE_MUSIC_KEY_ID / APPLE_MUSIC_PRIVATE_KEY (see README); shows recently played, not true realtime.
- Design taste memory: crisp/flat, no glows, rounded-md max (memory/design-taste-crisp-flat.md).

# Policy & Waiver Viewer

Live web app for viewing and downloading gym policies and waivers.

## Deploy to Vercel (recommended)

1. Open https://vercel.com and sign up or log in (free)
2. Install Vercel CLI: `npm i -g vercel`
3. From this folder run: `vercel login` (if first time)
4. Then: `vercel` or `npx vercel`
5. Accept defaults, get your live URL

**Or use the Vercel website:** Drag the entire `waiver-viewer-web` folder onto https://vercel.com/new

## Deploy to Netlify (no account needed)

1. Go to https://app.netlify.com/drop
2. Drag the `waiver-viewer-web` folder onto the page
3. You get a live link instantly (e.g. https://random-name-123.netlify.app)

## Adding logos

Place gym logo images in this folder (same level as index.html) with these exact filenames:
- `Capital classic colors with circle shadow (1).png`
- `RR pink circle no shadow (1).png`
- `rba_rbk 250x250 (1).png`
- `hga logo 250x250.png`
- `Estrella 2025 Logo Rebranded (1).png`
- `oasiss.png`
- `sgt logo 200.png`
- `tigar logo.png`

Without logos, gym abbreviations (CCP, OAS, etc.) display instead.

# zaflick.com

The Zaflick website: athleisure for women and men, designed in India to be worn from morning to dinner.

A Next.js static export. The homepage is a 3D scroll story (three.js + Lenis); every other page is static HTML. Hosted on GitHub Pages from the `gh-pages` branch.

## Run it
```
npm install
npm run dev          # http://localhost:3000, live reload while editing
npm run build        # prototype build → out/ (noindex, no Tag Manager, forms send nothing)
npm run build:live   # the real site → out/
npm run deploy       # build:live, then publish out/ to GitHub Pages
npm run serve        # serve out/ on http://localhost:4321
npm run check        # with serve running: every URL 200, h1/canonical/description/JSON-LD per page
```
Add `?still=1` to the homepage to see the story without 3D (also used for reduced motion or when WebGL is unavailable).

## Deploy
`npm run deploy` builds the live site and publishes `out/` to the `gh-pages` branch, which GitHub Pages serves. Commit to `main` first so each deploy names the commit it came from. To roll back, check out an earlier commit and deploy again.

## Where things are
- `lib/site.ts`: the prototype/live switch, links, emails and social profiles.
- `lib/content/`: all copy as data (products, looks, the day, FAQ answer bank, journal).
- `lib/member.ts`: early-list sign-up and member state.
- `lib/track.ts`: analytics events, sent through Google Tag Manager.
- `lib/seo.ts`: titles, canonicals, Open Graph and structured data.
- `components/site/`: header, footer, join drawer, forms and shared blocks.
- `components/story/` and `components/three/`: the homepage scroll story and its 3D.

## Settings (build-time)
| Variable | Live value |
|---|---|
| `NEXT_PUBLIC_SITE_MODE` | `live` |
| `NEXT_PUBLIC_GTM_ID` | `GTM-5G79GDM9` |
| `NEXT_PUBLIC_WHATSAPP` | digits only; WhatsApp buttons are hidden while empty |
| `NEXT_PUBLIC_FORMS_ENDPOINT` | forms web app; while empty, the forms open a prefilled email to marketing@zaflick.com |

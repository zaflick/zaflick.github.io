# zaflick.com

The Zaflick website: athleisure for women and men, designed in India to be worn from morning to dinner.

A Next.js static export. Every page is static HTML. The homepage is seven sections built for phones first; its top section sits on a 3D knit fabric, and a pinned cut-and-stitch animation leads into the five pieces (three.js, loaded after the page is up / when the section gets close). Hosted on GitHub Pages from the `gh-pages` branch.

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
- `lib/content/`: all copy as data (products, looks, FAQ answer bank, journal).
- `lib/member.ts`: Circle sign-up (formerly the early list) and member state.
- `lib/track.ts`: analytics events, sent through Google Tag Manager.
- `lib/seo.ts`: titles, canonicals, Open Graph and structured data.
- `components/site/`: header, footer, join drawer, forms and shared blocks.
- `components/home/`: homepage sections that need the browser (the 3D fabric behind the top section, Bring a friend).
- `components/three/`: `fabric.ts` (knit fabric), `stitch.ts` + `patterns.ts` (cut and stitch), `gl-check.ts` (skip 3D on reduced motion or software WebGL).

## Settings (build-time)
| Variable | Live value |
|---|---|
| `NEXT_PUBLIC_SITE_MODE` | `live` |
| `NEXT_PUBLIC_GTM_ID` | `GTM-5G79GDM9` |
| `NEXT_PUBLIC_WHATSAPP` | digits only; WhatsApp buttons are hidden while empty |
| `NEXT_PUBLIC_FORMS_ENDPOINT` | forms web app; while empty, the forms open a prefilled email to marketing@zaflick.com |

# Sip Social — website

Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4. Fully static, deploys cleanly to Vercel.

## What's here

- **Homepage, About, Packages, Gallery, 4 event-type pages, Enquiry form** — all built from real brand assets (your logo, colours and fonts, traced from the Canva files) and real event photos, colour-corrected by hand (no AI-generated imagery anywhere).
- **Instagram-style gallery feed** on the homepage, plus a full gallery page.
- **SEO**: per-page metadata, Open Graph images generated automatically, sitemap, robots.txt, and structured data (schema.org) for the business, each service/event type, and FAQs — aimed at UK-wide search, not local-area pages (per your call to hold off town pages until you've run more events).
- **Enquiry form** that emails you directly (via Resend) with a copy back to the enquirer, spam-protected with Cloudflare Turnstile and a honeypot field.
- **Content layer**: all copy and data live in `content/*.ts`, read through `lib/content/get.ts`. Pages never import content directly — they take it as props. This is deliberate scaffolding: if you move to Makeswift (or any other visual CMS) later, you only need to swap what's behind `get.ts`, not rebuild the pages.

## Running it locally

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build     # production build
npm run start     # serve the production build locally
npm run lint       # ESLint
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you have. The site builds and runs fine with none of these set — the enquiry form will show a friendly error if email isn't configured, and the Instagram feed just won't appear.

| Variable | What it's for | Where to get it |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your real domain, used in metadata/sitemap | — |
| `RESEND_API_KEY` | Sends the enquiry emails | [resend.com](https://resend.com) — free tier is plenty to start. Verify your sending domain there. |
| `ENQUIRY_TO_EMAIL` | Where enquiries land (defaults to your Outlook address) | — |
| `ENQUIRY_FROM_EMAIL` | The "from" address on outgoing mail — needs to be on a domain verified in Resend | — |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Spam protection on the enquiry form | [Cloudflare Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile) — free |
| `INSTAGRAM_ACCESS_TOKEN` | Powers the live Instagram feed | Instagram Graph API — long-lived token, needs a Business/Creator account linked to a Facebook Page |

Without `INSTAGRAM_ACCESS_TOKEN`, the Instagram section simply doesn't render — nothing breaks.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add the environment variables above in the Vercel project settings.
4. Point your domain at it and set `NEXT_PUBLIC_SITE_URL` to match.

## Changing things day-to-day

- **Text, packages, event-type pages, FAQs**: edit the files in `content/`. Everything is plain, readable TypeScript objects — no build tooling needed beyond saving the file.
- **Photos**: `lib/content/photo-manifest.json` + `public/images/photos/`. Each photo has 4 pre-cropped variants (wide/ultra/portrait/square) so it looks right in every layout slot. Swapping a photo is a one-line change to the manifest plus dropping the new files in.
- **Brand colours/fonts**: `app/globals.css` (colour tokens at the top) and `lib/fonts.ts`.
- **Town/local-area SEO pages**: scaffolded but intentionally empty in `content/towns.ts` — there's a comment there explaining exactly how to switch this on once you've got more events under your belt and want to target specific areas.

## Outstanding / nice-to-haves

- A handful of photos (noted when the images were being processed) are usable but not hero-quality — worth replacing with sharper, better-lit shots next time you shoot an event, especially a "guests enjoying their coffee" shot, which the site doesn't have yet.
- If you want the AI background-extension pass on a few images (for wider/cleaner crops), ask and I'll give you the exact file list and instructions.
- No prices are shown anywhere — it's quote-only by design, matching how you actually price jobs right now.

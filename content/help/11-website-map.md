---
order: 11
title: Website map – developer ya AI ke liye
---
Ye guide kisi bhi developer ya AI ko dein. Isse wo foran samajh jayega ke website kaise bani hai. (Ye technical hai, is liye English mein hai.)

## Stack

- **Next.js 16** (App Router, TypeScript), **Tailwind CSS 4**
- Hosted on **Vercel**. Pushing to the `main` branch on GitHub deploys production.
- Repo: `github.com/jahangirjan397-lang/printypackaging`
- Domain DNS and business email: **Hostinger**
- Content editor: **Decap CMS** at `/admin` (`public/admin/config.yml`), GitHub backend with OAuth routes in `src/app/api/decap/`
- Read `AGENTS.md` first: this Next.js version has breaking changes, check `node_modules/next/dist/docs/`.

## Where things live

| What | File / folder |
|---|---|
| Blog posts (edited in admin) | `content/blogs/*.json`, loaded by `src/data/blogs.ts` |
| Product galleries (admin) | `content/product-images.json`, used by `src/data/products.ts` |
| Business promises, phone (admin) | `content/settings/business.json`, via `src/data/businessInfo.ts` |
| Reviews, sales team (admin) | `content/settings/reviews.json` |
| Social links (admin) | `content/settings/social.json`, via `src/data/socialLinks.ts` |
| Backlink tracker (admin only, not on site) | `content/backlinks/*.json` |
| Help guides (admin only) | `content/help/*.md` |
| Product names, descriptions, SEO text | `src/data/products.ts` (code) |
| Style guide pages (15 box styles) | `src/data/styleGuides.ts` (code) |
| Portfolio gallery | `src/data/inspirationGallery.ts` (code) |
| Homepage sections | `src/app/page.tsx` + `src/components/*` |
| Quote form | `src/components/QuoteSection.tsx` |
| Quote API (email + Google Sheet) | `src/app/api/quote/route.ts` |
| Images | `public/images/...`, admin uploads go to `public/images/uploads/` |

## Environment variables (set in Vercel, never commit)

`GOOGLE_SHEETS_WEBHOOK_URL`, `GOOGLE_SHEETS_SECRET`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `QUOTE_RECEIVER_EMAIL`, `QUOTE_FROM_EMAIL`, `DECAP_GITHUB_CLIENT_ID`, `DECAP_GITHUB_CLIENT_SECRET`, `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_TAWK_PROPERTY_ID`, `NEXT_PUBLIC_TAWK_WIDGET_ID`

## Google Sheet

"Printy Packaging Leads" with an Apps Script web app (`doPost`). The secret in Apps Script `SECRET_KEY` must match `GOOGLE_SHEETS_SECRET`. `refreshDashboard()` rebuilds the Dashboard tab.

## Run locally

```
npm install
npm run build
npx next start -p 3000
```
To use the admin panel on localhost without GitHub login, run `npm run cms:local` in a second terminal and open `http://localhost:3000/admin`.

## Working rules

- Work on a branch and open a Pull Request; the owner approves merges to `main`.
- Run `npm run lint` and `npm run build` before pushing.
- Do not commit secrets. Do not change blog slugs (they are live URLs).
- Only real customer reviews; no third-party brand logos.

## Git branches (important)

The admin panel commits straight to `main`. Before doing code work on another
branch, merge `main` into it first (`git pull origin main`), otherwise pushing
that branch to `main` will be rejected or will undo admin edits.

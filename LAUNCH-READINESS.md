# Printy Packaging launch readiness

Working branch: `printy-master-system`  
Draft PR: #1 into `printy-final-work`  
Production `main`: unchanged.

## Completed on working branch

- Shared category and market templates, buyer journey pages, blog imagery, compact payment options.
- Quote form accepts up to 5 artwork files, 4 MB total; artwork is emailed to the configured receiver.
- Quote API avoids saving an artwork lead in CRM if its attachment cannot be delivered.
- Contextual food article image and social preview image.
- Automated GitHub Actions gate: `npm ci`, `npm run lint`, `npm run build`, then built-site internal link sweep.
- Image staging command for the delivered Printy Image Library:
  `npm run images:stage -- "C:\\path\\to\\Printy-Image-Library"`.
  It checks WebP dimensions and names before copying supported product and home images.
  New category, blog and portfolio photos require page mapping in a final image integration batch.

## Remaining launch gates

0. **Blocker:** replace or clear every temporary image listed in `IMAGE-FIX-LIST.md` (rights unconfirmed, third-party branding on several). Do not deploy to production before this is done.

1. Receive the user's nine missing product galleries (45 WebP images), then remaining approved replacements. Review real product structure, composition, permission and filenames; stage images on this branch.
2. Map any new category/blog/portfolio images and build the curated portfolio. Mark concept visuals honestly and avoid invented customers or reviews.
3. Confirm SMTP and Google Sheet webhook credentials in the target deployment; submit an end-to-end test quote with and without artwork, verify receiver email, client reply and CRM row. Do not expose secrets in Git.
4. Confirm the payment accounts and provider methods before any active payment links. The page currently states methods are subject to approval/verification.
5. Access the protected Vercel preview for mobile and desktop visual QA. Check home, products, nine galleries, category/market pages, blog, quote, payment and footer on narrow and wide screens.
6. Confirm GitHub Actions and Vercel checks are green for the final image commit. Review SEO titles, schema, sitemap, redirects and image crops.
7. Follow the agreed sequence only after validation: merge master into `printy-final-work`, final build, merge into `main`, deploy, then check live `printypackaging.com`.

## Notes

The Vercel preview currently redirects unauthenticated viewers to Vercel sign-in; successful builds alone do not constitute visual QA. Site traffic and client inquiries will require ongoing search visibility and outreach after launch.

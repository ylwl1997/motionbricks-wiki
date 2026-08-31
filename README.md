# motionbricks.wiki

Unofficial community guide to **NVIDIA MotionBricks** (SIGGRAPH 2026 real-time motion model). Astro v5 static site → GitHub Actions → Cloudflare Pages.

- Live: https://motionbricks.wiki (pages.dev fallback: https://motionbricks-wiki.pages.dev)
- Not affiliated with, endorsed by, or sponsored by NVIDIA. MotionBricks™ and NVIDIA® are trademarks of NVIDIA Corporation.

## Facts & guardrails
- Every number/command lives in `src/data/site.js`, sourced from the official project page, the MotionBricks README, the GR00T-WholeBodyControl README, and arXiv:2604.24833. Do not invent facts in page files.
- Official figures: **15,000 FPS / 2 ms / 350,000+ clips**. The "5,000 FPS" circulating in posts is wrong.
- Gallery GIFs are Git LFS-tracked — embed via `media.githubusercontent.com/media/...`, never `raw.githubusercontent.com` (returns a 1 KB pointer). Nothing is downloaded or re-hosted.

## Develop
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # astro build
python3 scripts/gen-sitemap.py   # writes dist/sitemap.xml (run after build, CI does it)
```
Build must pass locally before push (the deploy workflow runs gen-sitemap → astro build → wrangler pages deploy).

## Structure
- `src/layouts/Base.astro` — SEO head, hreflang, breadcrumb, nav, GA4 (G-T9W89LYVR5), legal footer
- `src/components/Faq.astro` — visible Q&A + matching FAQPage JSON-LD
- `src/data/site.js` — single source of truth
- `public/_redirects` — www → apex 301; `public/robots.txt` + generated `sitemap.xml`

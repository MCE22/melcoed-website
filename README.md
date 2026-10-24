# melcoed.com

Website for **Mel-Co-Ed, Inc.** — precision metal stamping, Pawtucket, RI, since 1948.

Built with [Astro](https://astro.build) as a fully static site, deployed on Cloudflare Pages.

## Local development

Requires Node **22.23.4+** (pinned in `.node-version`).

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # serve the built site
npm run todos     # list every placeholder that still needs real content
```

## Cloudflare Pages settings

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | from `.node-version` (or set env var `NODE_VERSION=22.23.4`) |
| Env: `PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms key registered to sales@melcoed.com (see `.env.example`) |
| Env: `PUBLIC_WEB3FORMS_FILE_UPLOADS` | `true` only on a Web3Forms Pro plan (attachments are Pro-only) |

`public/_headers` sets security headers and long-term caching for hashed assets.
Canonical host is **https://www.melcoed.com**. The apex `melcoed.com` should 301 to www via a
Cloudflare redirect rule. DNS and custom-domain setup are handled outside this repo.

`npm run build` also runs `scripts/check-links.mjs`, which fails the build if any page links to an
internal URL that doesn't exist.

## Navigation and unbuilt pages

`src/data/site.ts` describes the full navigation. `src/lib/routes.ts` checks which page files exist,
and the header, footer and Home page only show links to pages that exist. Adding a page file makes
its links appear automatically.

## Where things live

| Path | What |
| --- | --- |
| `src/data/site.ts` | **Business facts** (name, address, phone, divisions, nav). Edit here once; header, footer, page copy and schema update everywhere. |
| `src/lib/schema.ts` | schema.org JSON-LD builders: Organization + LocalBusiness, WebSite, WebPage, BreadcrumbList, FAQPage, Product. |
| `src/layouts/BaseLayout.astro` | `<head>` (title, description, canonical, Open Graph, JSON-LD), header, footer. |
| `src/components/` | Header, Footer, Logo, Seal, FaqList, Todo. |
| `src/styles/global.css` | Design tokens and shared styles (sign red / cream / black). |
| `src/pages/` | One file per page. |

## Design and brand

- **Look:** editorial, converted-factory studio. Cream paper, near-black type, oxblood accents,
  aged-brass labels and hairline rules, square corners. Tokens live in `src/styles/global.css`.
- **Type:** Playfair Display (uppercase serif headlines; key words in oxblood via `<em>`), Inter for
  body and the letter-spaced brass eyebrows. No script faces.
- **Marks:** `npm run brand` regenerates the SVG logos in `public/brand/` (enamel plate, compact header
  plate, round seal, Made-in seal) plus `public/favicon.svg` and `public/logo.svg`. Lettering is
  converted to outlines, so the files need no fonts. To use a photo of a real struck plate instead,
  change the paths in `src/data/brand.ts`.
- **Origin claim:** "Made in Rhode Island, USA" / "Pawtucket Proud" (`src/data/brand.ts`), shown in
  the footer and Home and included in the Organization schema and `/llms.txt`.
- **Photos:** `src/data/photos.ts` slots. Hero and tile images use `<MediaSlot>` (dark frame, optional fade
  into the background, built for moody product shots); galleries use `<PhotoSlot>`.

## Confirmed facts, catalogs and official logos

- **`src/data/facts.ts`:** confirmed facts from the 2026 sell sheet (tagline, materials, finishes, sizes,
  minimums, lead time, pricing, two ways to buy, process). Pages, specs and FAQ answers read from here.
- **Catalogs:** put the PDFs in `public/catalogs/` as `mce-findings-stampings-catalog-2026.pdf` and
  `mce-pattern-banding-catalog-2026.pdf`. "Download Catalog (PDF)" links then appear on Home, Products,
  Findings, Pattern Stock & Banding and in the footer (hidden while a file is missing).
- **Official logos:** put `mce-plate.png` and `mce-seal.png` in `src/assets/brand/`. They replace the
  generated SVG marks (header, footer, About, seal, favicon) as WebP with a PNG fallback.
- **Photos:** from the old site's media library. The raw import, with a manifest, is on the
  `photo-import` branch (not merged into `main`).

## Search and AI summaries

- **Search:** `/search/` uses [Pagefind](https://pagefind.app). `npm run build` runs `pagefind --site dist`
  after Astro, indexing only `<main data-pagefind-body>` content (utility pages are excluded).
- **`/llms.txt`:** a plain-text company summary for AI assistants, generated from `src/data/` at build.

## Motion

One shared system, loaded by `BaseLayout`, so every page (current and future) gets it:

- `src/styles/motion.css`: timing tokens (`--dur-fast` 150ms, `--dur` 250ms, `--shift`, `--lift`),
  link transitions, scroll-reveal states, smooth `<details>` (FAQ) expansion, and the
  `prefers-reduced-motion` kill switch.
- `src/scripts/reveal.ts`: fades section blocks and grid items in as they scroll into view.
  It only dims elements that start **below the fold**, so nothing visible is hidden or delayed,
  and with JavaScript off nothing is dimmed. Anything scrolled past (fast scrolls, anchor jumps)
  is revealed too, so content can never be left dimmed. Opt out with `data-no-reveal`; opt in with `data-reveal`.
- Header menus fade and slide with CSS `@starting-style` (no JS); older browsers open instantly.

Rule: every effect is small. If one is noticeable on its own, tone it down. No autoplay, parallax,
bounce, spin, count-ups or scroll-jacking. Use the tokens for any new transition.

## Placeholder content (TODO)

Anything that needs real information from Mel-Co-Ed is marked **TODO**:

- On the page it renders as a yellow dashed box via `<Todo>…</Todo>`.
- In data/config files it is a `// TODO:` comment.
- FAQ answers with `todo: true` show on the page but are **excluded from FAQ schema** until confirmed.

Run `npm run checklist` to regenerate **docs/CONTENT-CHECKLIST.md**, a page-by-page list of everything still to fill in (specs, facts, FAQ answers, photos). `npm run todos` shows the raw source lines. Every TODO must be resolved before launch.

## Page status

- [x] Home
- [x] Findings, Badges, Medallions, Awards, Industrial Components (shared template: `src/components/ProductPage.astro` + `src/data/products.ts`)
- [x] Fraternal & Lodge Emblems → served by `/industries/fraternal-lodge/` (avoids two pages competing for the same searches)
- [x] Capabilities
- [x] About
- [x] FAQ (general + ordering FAQs from `src/data/faqs.ts`; FAQPage markup for those lives only here)
- [x] Request a Quote (Web3Forms; honeypot spam check; no-JS fallback at /request-a-quote/thank-you/)
- [x] Industries hub, Fraternal & Lodge, Commemorative & 250th
- [x] Contact

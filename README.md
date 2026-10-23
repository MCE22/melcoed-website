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
| Env: `PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms key registered to quotes@melcoed.com (see `.env.example`) |
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

## Placeholder content (TODO)

Anything that needs real information from Mel-Co-Ed is marked **TODO**:

- On the page it renders as a yellow dashed box via `<Todo>…</Todo>`.
- In data/config files it is a `// TODO:` comment.
- FAQ answers with `todo: true` show on the page but are **excluded from FAQ schema** until confirmed.

Run `npm run todos` to see them all. Every TODO must be resolved before launch.

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

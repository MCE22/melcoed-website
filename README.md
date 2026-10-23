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

`public/_headers` sets security headers and long-term caching for hashed assets.
DNS and custom-domain setup are handled outside this repo.

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
- [ ] Findings
- [ ] Badges
- [ ] Medallions
- [ ] Awards
- [ ] Fraternal & Lodge Emblems
- [ ] Industrial Components
- [ ] Capabilities
- [ ] About
- [ ] FAQ
- [ ] Request a Quote (form — needs a handler; Cloudflare Pages Function or form service)
- [ ] Contact

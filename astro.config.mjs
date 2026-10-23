// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static output for Cloudflare Pages (build: `npm run build`, output dir: `dist`).
export default defineConfig({
  // Canonical host. Apex (melcoed.com) should 301 to www via a Cloudflare redirect rule.
  site: 'https://www.melcoed.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // Keep utility pages (form confirmations) out of the sitemap; they are also noindex.
  integrations: [sitemap({ filter: (page) => !page.includes('/thank-you/') })],
});

// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Utility pages remain accessible to visitors but are excluded from the production sitemap.
const utilityPaths = new Set(['/404', '/search', '/request-a-quote/thank-you', '/at-a-glance']);

// Static output for Cloudflare Pages (build: `npm run build`, output dir: `dist`).
export default defineConfig({
  // Canonical host. Apex (melcoed.com) should 301 to www via a Cloudflare redirect rule.
  site: 'https://www.melcoed.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (page) => !utilityPaths.has(new URL(page).pathname.replace(/\/$/, '')) })],
});

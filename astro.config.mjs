// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static output for Cloudflare Pages (build: `npm run build`, output dir: `dist`).
export default defineConfig({
  // TODO: confirm canonical host (apex vs. www) before launch; must match Cloudflare redirect rules.
  site: 'https://melcoed.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap()],
});

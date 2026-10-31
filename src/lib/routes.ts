// Knows which pages exist so navigation never links to a 404 while the site is
// being built out. A link appears automatically once its page file is added.

import { resources } from '../data/resources';

const pageFiles = import.meta.glob('/src/pages/**/*.{astro,md,mdx}');

const routes = new Set(
  Object.keys(pageFiles)
    .filter((f) => !f.includes('[')) // dynamic routes aren't resolvable here
    .map((f) => {
      const r = f
        .replace(/^\/src\/pages/, '')
        .replace(/\.(astro|mdx?)$/, '')
        .replace(/\/index$/, '');
      return r + '/';
    }),
);
// Dynamic route: /resources/[slug]/ pages come from src/data/resources.ts
for (const r of resources) routes.add(`/resources/${r.slug}/`);

export function isLive(href: string): boolean {
  if (/^(https?:|tel:|mailto:)/.test(href)) return true;
  const path = href.split('#')[0];
  if (path === '' || path === '/') return true;
  return routes.has(path.endsWith('/') ? path : path + '/');
}

export function liveLinks<T extends { href: string }>(links: T[]): T[] {
  return links.filter((l) => isLive(l.href));
}

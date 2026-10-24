// Downloadable PDF catalogs. Drop the files into public/catalogs/ with these names;
// links appear automatically wherever <CatalogLinks> is used, and stay hidden while
// a file is missing (so the site never links to a 404).
import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

export type Catalog = { title: string; href: string; sizeMb?: number };

const all: Catalog[] = [
  { title: 'Findings & Stampings Catalog 2026', href: '/catalogs/mce-findings-stampings-catalog-2026.pdf' },
  { title: 'Pattern & Banding Catalog 2026', href: '/catalogs/mce-pattern-banding-catalog-2026.pdf' },
];

const file = (href: string) => join(process.cwd(), 'public', href);

/** Catalogs whose PDF is present in public/catalogs/. */
export const catalogs: Catalog[] = all
  .filter((c) => existsSync(file(c.href)))
  .map((c) => ({ ...c, sizeMb: Math.max(0.1, Math.round((statSync(file(c.href)).size / 1e6) * 10) / 10) }));

export const missingCatalogs = all.filter((c) => !existsSync(file(c.href)));

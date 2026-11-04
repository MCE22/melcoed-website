// Downloadable sell sheet. Exported from /sell-sheet/ by `npm run sell-sheet`.
// The link stays hidden while the PDF is missing, so the site never links to a 404.
import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const href = '/downloads/mce-sell-sheet-2026.pdf';
const file = join(process.cwd(), 'public', href);

export const sellSheet = existsSync(file)
  ? { title: 'Sell Sheet 2026', href, sizeMb: Math.max(0.1, Math.round((statSync(file).size / 1e6) * 10) / 10) }
  : null;

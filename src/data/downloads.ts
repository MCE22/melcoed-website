// Downloadable "Mel-Co-Ed at a Glance" PDF. Exported from /at-a-glance/ by `npm run at-a-glance`.
// The link stays hidden while the PDF is missing, so the site never links to a 404.
import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const href = '/downloads/mel-co-ed-at-a-glance.pdf';
const file = join(process.cwd(), 'public', href);

export const atAGlance = existsSync(file)
  ? { title: 'Mel-Co-Ed at a Glance', href, sizeMb: Math.max(0.1, Math.round((statSync(file).size / 1e6) * 10) / 10) }
  : null;

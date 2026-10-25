// Builds docs/CONTENT-CHECKLIST.md: every placeholder the owner still needs to fill,
// grouped by page. Run `npm run checklist` after filling things in to see what's left.
//
// Sources it understands:
//   <Todo>...</Todo> in .astro files           → visible TODO boxes
//   todo: '...' / typesTodo / photoTodo / ...  → TODO fields in data files
//   FAQ objects with `todo: true`              → answers to confirm (kept out of schema)
//   moqFaq('...')                              → minimum-order FAQ (always needs confirming)
//   <PhotoSlot slot="..." todo="..." />        → photo slots, only while the slot is empty
//   // TODO: comments in src/data, src/components, astro.config.mjs

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const src = join(root, 'src');
const read = (p) => readFileSync(join(root, p), 'utf8');

const ENTITIES = { '&ndash;': '–', '&mdash;': '—', '&times;': '×', '&Prime;': '″', '&plusmn;': '±', '&rarr;': '→', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&trade;': '™' };
const clean = (s) =>
  s
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-zA-Z]+;/g, (e) => ENTITIES[e] ?? e)
    .replace(/\{['"`]\s*['"`]\}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// page label for a file
const PAGE_NAMES = {
  'index.astro': 'Home',
  'about.astro': 'About',
  'faq.astro': 'FAQ',
  'contact.astro': 'Contact',
  'capabilities.astro': 'Capabilities',
  'metal-stamping.astro': 'Metal Stamping',
  'capabilities/product-development.astro': 'Product Development',
  'industries/index.astro': 'Industries hub',
  'industries/fraternal-lodge.astro': 'Fraternal & Lodge',
  'industries/commemorative.astro': 'Commemorative & 250th',
  'request-a-quote/index.astro': 'Request a Quote',
  'request-a-quote/thank-you.astro': 'Request a Quote',
  'search.astro': 'Search',
};

const groups = new Map(); // page -> {specs:[], copy:[], faq:[], photos:[]}
const add = (page, kind, text) => {
  if (!groups.has(page)) groups.set(page, { specs: [], copy: [], faq: [], photos: [] });
  const g = groups.get(page)[kind];
  if (!g.includes(text)) g.push(text);
};
const kindOf = (t) => (/^photo/i.test(t) ? 'photos' : 'copy');

// --- data: photo slots that are filled ---
const photosSrc = read('src/data/photos.ts');
const filledSlots = new Set([...photosSrc.matchAll(/^\s*'?([a-z-]+)'?:\s*\[\s*\{/gm)].map((m) => m[1]));
// Slots filled with labeled illustrations still need real house-sample photos.
const ILLUS_PAGES = { badges: 'Badges', 'industries-fraternal': 'Fraternal & Lodge' };
for (const m of photosSrc.matchAll(/^\s*'?([a-z-]+)'?:\s*\[([\s\S]*?)^\s*\],/gm)) {
  if (m[2].includes('illustration: true'))
    add(ILLUS_PAGES[m[1]] ?? 'Sitewide / business info', 'photos', `Replace the labeled illustrations in the \`${m[1]}\` slot with house-sample photos (keep the illustration flag off for real photos)`);
}

// --- .astro pages ---
function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}
for (const file of walk(join(src, 'pages')).filter((f) => f.endsWith('.astro'))) {
  const rel = relative(join(src, 'pages'), file);
  const page = PAGE_NAMES[rel];
  if (!page) continue;
  const s = readFileSync(file, 'utf8');
  for (const m of s.matchAll(/<Todo(?:\s+block)?>([\s\S]*?)<\/Todo>/g)) {
    const t = clean(m[1]);
    if (!t || t.startsWith('{')) continue;
    // inside a spec list (<dt>Label</dt><dd><Todo>) → label it
    const before = s.slice(Math.max(0, m.index - 160), m.index);
    const dt = [...before.matchAll(/<dt>([^<]+)<\/dt>/g)].pop();
    if (dt && before.lastIndexOf('<dt>') > before.lastIndexOf('</dd>')) add(page, 'specs', `**${clean(dt[1])}**: ${t}`);
    else add(page, kindOf(t), t);
  }
  for (const m of s.matchAll(/todo: '([^']+)'/g)) add(page, 'copy', clean(m[1]));
  for (const m of s.matchAll(/<(?:PhotoSlot|MediaSlot)\s[^>]*?slot="([a-z-]+)"[^>]*?todo="([^"]+)"/g))
    if (!filledSlots.has(m[1])) add(page, 'photos', clean(m[2]));
  // page-header photos: <PageHero photo="slot" photoTodo="...">
  for (const m of s.matchAll(/photo="([a-z-]+)"\s+photoTodo="([^"]+)"/g))
    if (!filledSlots.has(m[1])) add(page, 'photos', `${clean(m[2])} (page header)`);
  for (const m of s.matchAll(/\{\s*q: (['"`])(.+?)\1,\s*a:[^}]*?todo: true/g)) add(page, 'faq', clean(m[2]));
}

// --- products (rendered by ProductPage) ---
const products = read('src/data/products.ts');
const blocks = products.split(/\n  (?:'[a-z-]+'|[a-z]+): \{\n    slug: /).slice(1);
for (const b of blocks) {
  const page = clean(b.match(/name: '([^']+)'/)[1]);
  const slug = b.match(/^'([a-z-]+)'/)[1];
  for (const m of b.matchAll(/\{ label: '([^']+)', todo: '([^']+)' \}/g)) add(page, 'specs', `**${m[1]}**: ${clean(m[2])}`);
  for (const key of ['typesTodo', 'audienceNoteTodo']) {
    const m = b.match(new RegExp(`${key}: '([^']+)'`));
    if (m) add(page, 'copy', clean(m[1]));
  }
  const photo = b.match(/photoTodo: '([^']+)'/);
  if (photo && !filledSlots.has(slug)) add(page, 'photos', clean(photo[1]));
  for (const m of b.matchAll(/\{\s*q: (['"`])(.+?)\1,\s*a:[^}]*?todo: true/g)) add(page, 'faq', clean(m[2]));
  for (const m of b.matchAll(/moqFaq\('([^']+)'\)/g)) add(page, 'faq', `What is the minimum order for ${m[1]}?`);
}

// --- sitewide FAQs (shown on Home + FAQ) ---
for (const m of read('src/data/faqs.ts').matchAll(/\{\s*q: (['"`])(.+?)\1,\s*a:[^}]*?todo: true/g)) add('FAQ (also shown on Home)', 'faq', clean(m[2]));

// --- code comments: business facts ---
for (const p of ['src/data/site.ts', 'src/components/Logo.astro', 'src/components/QuoteForm.astro', 'astro.config.mjs']) {
  let s;
  try {
    s = read(p);
  } catch {
    continue;
  }
  for (const m of s.matchAll(/(?:\/\/|<!--)\s*TODO:?\s*([^\n]+?)(?:-->)?\s*$/gm)) add('Sitewide / business info', 'copy', `${clean(m[1])} _(${p})_`);
}
// QuoteForm visible TODO boxes (turnaround promise)
for (const m of read('src/components/QuoteForm.astro').matchAll(/<Todo(?:\s+block)?>([\s\S]*?)<\/Todo>/g)) {
  const t = clean(m[1]);
  if (!t.includes('PUBLIC_WEB3FORMS_ACCESS_KEY')) add('Request a Quote', 'copy', t);
}

// --- photo slots defined in photos.ts but not placed on any page yet (e.g. the Home hero) ---
const allSlots = [...photosSrc.matchAll(/\| '([a-z-]+)'/g)].map((m) => m[1]);
const pageSrc = walk(join(src, 'pages')).map((f) => readFileSync(f, 'utf8')).join('\n');
const productSlugs = [...products.matchAll(/slug: '([a-z-]+)'/g)].map((m) => m[1]);
for (const slot of allSlots) {
  if (filledSlots.has(slot) || productSlugs.includes(slot) || pageSrc.includes(`slot="${slot}"`) || pageSrc.includes(`photo="${slot}"`)) continue;
  add(slot.startsWith('home') ? 'Home' : 'Sitewide / business info', 'photos', `\`${slot}\` photo slot (not placed on the page yet; layout will be designed around the chosen photo)`);
}

// --- output ---
const ORDER = ['Sitewide / business info', 'Home', 'Metal Stamping', 'About', 'Capabilities', 'Product Development', 'Findings', 'Badges', 'Medallions', 'Awards', 'Industrial Components', 'Industries hub', 'Fraternal & Lodge', 'Commemorative & 250th', 'FAQ (also shown on Home)', 'FAQ', 'Request a Quote', 'Contact'];
const pages = [...groups.keys()].sort((a, b) => (ORDER.indexOf(a) + 99 * (ORDER.indexOf(a) < 0)) - (ORDER.indexOf(b) + 99 * (ORDER.indexOf(b) < 0)));
const LABELS = { specs: 'Specs & numbers', copy: 'Facts & copy', faq: 'FAQ answers to confirm', photos: 'Photos' };
let total = 0;
let md = `# Content checklist\n\nEverything on the site that still needs real information from Mel-Co-Ed. Generated by \`npm run checklist\` from the source; re-run it after filling items in.\n\n`;
const counts = Object.fromEntries(Object.keys(LABELS).map((k) => [k, 0]));
let body = '';
for (const page of pages) {
  const g = groups.get(page);
  const n = Object.values(g).reduce((a, v) => a + v.length, 0);
  if (!n) continue;
  total += n;
  body += `## ${page} (${n})\n\n`;
  for (const k of Object.keys(LABELS)) {
    if (!g[k].length) continue;
    counts[k] += g[k].length;
    body += `**${LABELS[k]}**\n\n` + g[k].map((t) => `- [ ] ${t}`).join('\n') + '\n\n';
  }
}
md += `**${total} items**: ${counts.specs} specs, ${counts.copy} facts/copy, ${counts.faq} FAQ answers, ${counts.photos} photo slots.\n\n`;
md += `FAQ answers marked here are shown on the site but kept out of Google's FAQ markup until confirmed: edit the answer, then delete its \`todo: true\`.\n\n${body}`;
mkdirSync(join(root, 'docs'), { recursive: true });
writeFileSync(join(root, 'docs/CONTENT-CHECKLIST.md'), md);
console.log(`docs/CONTENT-CHECKLIST.md: ${total} items (${counts.specs} specs, ${counts.copy} copy, ${counts.faq} FAQ, ${counts.photos} photos)`);

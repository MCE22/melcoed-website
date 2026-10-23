// Fails the build if any page links to an internal URL that wasn't generated.
// Runs after `astro build` (see package.json) so Cloudflare Pages never deploys a dead link.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (p.endsWith('.html')) yield p;
  }
}

const exists = (urlPath) => {
  const clean = decodeURI(urlPath.split(/[?#]/)[0]);
  const p = join(dist, clean);
  if (clean.endsWith('/')) return existsSync(join(p, 'index.html'));
  return existsSync(p) || existsSync(join(p, 'index.html')) || existsSync(p + '.html');
};

const broken = [];
for (const file of htmlFiles(dist)) {
  const html = readFileSync(file, 'utf8');
  for (const [, url] of html.matchAll(/\s(?:href|src)="(\/[^"]*)"/g)) {
    if (url.startsWith('//')) continue;
    if (!exists(url)) broken.push(`${relative(dist, file)} -> ${url}`);
  }
}

if (broken.length) {
  console.error(`\n✖ ${broken.length} broken internal link(s):\n  ` + broken.join('\n  '));
  process.exit(1);
}
console.log('✓ internal links OK');

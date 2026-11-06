// Export /at-a-glance/ to public/downloads/mel-co-ed-at-a-glance.pdf (2 pages, US Letter).
// Usage: npm run at-a-glance  (builds the site first, then prints the page with Playwright's Chromium)
// Needs Playwright: `npm i -D playwright && npx playwright install chromium` if it isn't already available.
// pdf-lib (a devDependency) sets the PDF title and metadata.
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { readFile, stat, writeFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const root = resolve('dist');
const out = resolve('public/downloads/mel-co-ed-at-a-glance.pdf');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml' };

// Serve dist/ so the page's absolute /_astro/ asset paths resolve.
const server = createServer(async (req, res) => {
  let p = join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  try {
    if ((await stat(p)).isDirectory()) p = join(p, 'index.html');
    res.writeHead(200, { 'content-type': types[extname(p)] ?? 'application/octet-stream' });
    res.end(await readFile(p));
  } catch {
    res.writeHead(404).end();
  }
}).listen(0);
const port = server.address().port;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`http://localhost:${port}/at-a-glance/`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const raw = await page.pdf({ format: 'Letter', printBackground: true, preferCSSPageSize: true });
await browser.close();
server.close();

// Chromium only writes the page <title> into the PDF. Set the full document metadata here.
const { PDFDocument } = await import('pdf-lib');
const pdf = await PDFDocument.load(raw);
pdf.setTitle('Mel-Co-Ed at a Glance', { showInWindowTitleBar: true });
pdf.setAuthor('Mel-Co-Ed, Inc.');
pdf.setSubject('Custom die-struck emblems, jewelry findings and stampings. Made in Rhode Island since 1948; Pawtucket, RI since 1964.');
pdf.setKeywords(['Mel-Co-Ed', 'die striking', 'stamping', 'jewelry findings', 'pattern stock', 'Made in USA']);
pdf.setCreator('melcoed.com');
pdf.setProducer('melcoed.com');
await writeFile(out, await pdf.save());
console.log(`Wrote ${out}`);

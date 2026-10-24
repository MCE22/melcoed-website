// Generates the Mel-Co-Ed brand marks as self-contained SVGs (all lettering converted
// to outlines, so they render identically everywhere and stay sharp at any size).
//
//   public/brand/plate.svg          primary: oxblood enamel plate, raised brass MEL-CO-ED / INC.
//   public/brand/plate-compact.svg  header version
//   public/brand/seal.svg           round brass seal: MEL-CO-ED · INC. · EST. 1948 · PAWTUCKET, R.I.
//   public/brand/seal-made-in.svg   MADE IN RHODE ISLAND · USA / PAWTUCKET PROUD
//   public/favicon.svg              simplified seal for tiny sizes
//   public/logo.svg                 schema.org logo (the seal)
//
// Run: npm run brand   (only needed when the marks change; outputs are committed)
// To use a photo of a real struck plate instead, see src/data/brand.ts.

import opentype from 'opentype.js';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const fontFile = (w) => `${root}node_modules/@fontsource/playfair-display/files/playfair-display-latin-${w}-normal.woff`;
const load = (w) => {
  const b = readFileSync(fontFile(w));
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
};
const BLACK = load(900);
const BOLD = load(700);

const f = (n) => +n.toFixed(2);

/** Outline a string centered at (cx, baseline) with extra tracking (em fraction). */
function word(font, text, size, cx, baseline, tracking = 0) {
  const scale = size / font.unitsPerEm;
  const glyphs = font.stringToGlyphs(text);
  const adv = glyphs.map((g, i) => g.advanceWidth * scale + (i < glyphs.length - 1 ? tracking * size : 0));
  const width = adv.reduce((a, b) => a + b, 0);
  let x = cx - width / 2;
  const d = glyphs
    .map((g, i) => {
      const p = g.getPath(x, baseline, size).toPathData(2);
      x += adv[i];
      return p;
    })
    .join('');
  return { d, width };
}

/** Outline a string around a circle (clockwise, starting at top-center). */
function ring(font, text, size, cx, cy, r) {
  const scale = size / font.unitsPerEm;
  const glyphs = font.stringToGlyphs(text);
  const adv = glyphs.map((g) => g.advanceWidth * scale);
  const natural = adv.reduce((a, b) => a + b, 0);
  const circ = 2 * Math.PI * r;
  const gap = (circ - natural) / glyphs.length; // spread evenly to close the ring
  let s = 0;
  return glyphs
    .map((g, i) => {
      const mid = s + adv[i] / 2;
      s += adv[i] + gap;
      const theta = (mid / circ) * 360;
      const p = g.getPath(-adv[i] / 2, 0, size).toPathData(2);
      if (!p) return '';
      const rad = (theta * Math.PI) / 180;
      return `<path transform="translate(${f(cx + r * Math.sin(rad))} ${f(cy - r * Math.cos(rad))}) rotate(${f(theta)})" d="${p}"/>`;
    })
    .join('');
}

// ---------- shared paint ----------
const defs = (id) => `
  <linearGradient id="${id}-brass" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#f3e3ae"/><stop offset=".22" stop-color="#d4b46a"/>
    <stop offset=".5" stop-color="#a8843f"/><stop offset=".72" stop-color="#c9a75e"/>
    <stop offset="1" stop-color="#6e531f"/>
  </linearGradient>
  <linearGradient id="${id}-rim" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#f0dca0"/><stop offset=".35" stop-color="#a8843f"/>
    <stop offset=".6" stop-color="#d9bd7a"/><stop offset="1" stop-color="#5e4518"/>
  </linearGradient>
  <radialGradient id="${id}-enamel" cx=".45" cy=".35" r=".85">
    <stop offset="0" stop-color="#93302b"/><stop offset=".6" stop-color="#7a1f1f"/><stop offset="1" stop-color="#541313"/>
  </radialGradient>
  <radialGradient id="${id}-rivet" cx=".35" cy=".3" r=".75">
    <stop offset="0" stop-color="#fbf0c8"/><stop offset=".45" stop-color="#c9a75e"/><stop offset="1" stop-color="#5e4518"/>
  </radialGradient>
  <filter id="${id}-soft" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.1"/></filter>
  <filter id="${id}-grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" result="n"/>
    <feColorMatrix in="n" type="saturate" values="0"/>
    <feComponentTransfer><feFuncA type="linear" slope=".09"/></feComponentTransfer>
    <feComposite operator="in" in2="SourceGraphic"/>
  </filter>`;

/** Raised brass lettering: drop shadow, top highlight, brass face, thin dark edge. */
const raised = (id, ref, k = 1) => `
  <use href="#${ref}" fill="#1c0606" opacity=".7" transform="translate(${f(1.6 * k)} ${f(2.2 * k)})" filter="url(#${id}-soft)"/>
  <use href="#${ref}" fill="#fff4cf" opacity=".55" transform="translate(${f(-0.7 * k)} ${f(-0.9 * k)})"/>
  <use href="#${ref}" fill="url(#${id}-brass)" stroke="#4f3a12" stroke-width="${f(0.7 * k)}" stroke-opacity=".7"/>`;

const rivet = (id, x, y, r) => `
  <circle cx="${f(x + r * 0.15)}" cy="${f(y + r * 0.25)}" r="${f(r)}" fill="#1c0606" opacity=".45" filter="url(#${id}-soft)"/>
  <circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id}-rivet)" stroke="#4f3a12" stroke-width=".6"/>
  <circle cx="${f(x - r * 0.3)}" cy="${f(y - r * 0.35)}" r="${f(r * 0.28)}" fill="#fffbe8" opacity=".7"/>`;

/** Rectangular enamel plate with brass rim, inner rule and rivets. */
function plate({ id, w, h, rim, rivetR, mainSize, mainBase, incSize, incBase, ruleY, title }) {
  // Fit the name inside the raised border with breathing room on both sides.
  const inner = w - 2 * (rim + rim + rivetR * 0.9) - 2 * rivetR * 3.2;
  let main = word(BLACK, 'MEL-CO-ED', mainSize, w / 2, mainBase, 0.04);
  if (main.width > inner) main = word(BLACK, 'MEL-CO-ED', mainSize * (inner / main.width), w / 2, mainBase, 0.04);
  const inc = word(BOLD, 'INC.', incSize, w / 2, incBase, 0.32);
  const ruleGap = incSize * 1.3;
  const ruleLen = Math.min(main.width / 2 - inc.width / 2 - ruleGap, w * 0.22);
  const lx2 = w / 2 - inc.width / 2 - ruleGap;
  const rx1 = w / 2 + inc.width / 2 + ruleGap;
  const rh = Math.max(1.5, incSize * 0.09);
  const inset = rim + rivetR * 0.9;
  const rules = `<path d="M${f(lx2 - ruleLen)} ${f(ruleY - rh / 2)}h${f(ruleLen)}v${f(rh)}h${f(-ruleLen)}zM${f(rx1)} ${f(ruleY - rh / 2)}h${f(ruleLen)}v${f(rh)}h${f(-ruleLen)}z"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="${id}-t">
  <title id="${id}-t">${title}</title>
  <defs>${defs(id)}
    <g id="${id}-main"><path d="${main.d}"/></g>
    <g id="${id}-inc"><path d="${inc.d}"/>${rules}</g>
  </defs>
  <!-- cast brass frame -->
  <rect x="0" y="0" width="${w}" height="${h}" rx="${f(rim * 0.5)}" fill="url(#${id}-rim)"/>
  <rect x="${f(rim * 0.35)}" y="${f(rim * 0.35)}" width="${f(w - rim * 0.7)}" height="${f(h - rim * 0.7)}" rx="${f(rim * 0.35)}" fill="none" stroke="#fff3c8" stroke-opacity=".45" stroke-width="${f(rim * 0.12)}"/>
  <!-- enamel field -->
  <rect x="${rim}" y="${rim}" width="${w - 2 * rim}" height="${h - 2 * rim}" rx="2" fill="url(#${id}-enamel)"/>
  <rect x="${rim}" y="${rim}" width="${w - 2 * rim}" height="${h - 2 * rim}" rx="2" fill="#000" filter="url(#${id}-grain)"/>
  <rect x="${rim}" y="${rim}" width="${w - 2 * rim}" height="${h - 2 * rim}" rx="2" fill="none" stroke="#2a0808" stroke-opacity=".55" stroke-width="${f(rim * 0.25)}"/>
  <!-- raised inner border -->
  <rect x="${f(rim + inset)}" y="${f(rim + inset * 0.85)}" width="${f(w - 2 * (rim + inset))}" height="${f(h - 2 * (rim + inset * 0.85))}" rx="1.5" fill="none" stroke="url(#${id}-brass)" stroke-width="${f(Math.max(1.2, rim * 0.18))}"/>
  ${raised(id, `${id}-main`, mainSize / 90)}
  ${raised(id, `${id}-inc`, incSize / 60)}
  ${rivet(id, rim + rivetR * 1.6, rim + rivetR * 1.6, rivetR)}
  ${rivet(id, w - rim - rivetR * 1.6, rim + rivetR * 1.6, rivetR)}
  ${rivet(id, rim + rivetR * 1.6, h - rim - rivetR * 1.6, rivetR)}
  ${rivet(id, w - rim - rivetR * 1.6, h - rim - rivetR * 1.6, rivetR)}
  <!-- soft top sheen -->
  <rect x="${rim}" y="${rim}" width="${w - 2 * rim}" height="${f((h - 2 * rim) * 0.45)}" fill="#fff" opacity=".05"/>
</svg>
`;
}

/** Round brass seal with ring lettering and an enamel center. */
function seal({ id, title, ringText, center }) {
  const S = 400, c = 200;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" role="img" aria-labelledby="${id}-t">
  <title id="${id}-t">${title}</title>
  <defs>${defs(id)}
    <g id="${id}-ring">${ring(BOLD, ringText, 27, c, c, 150)}</g>
    <g id="${id}-center">${center}</g>
  </defs>
  <circle cx="${c}" cy="${c + 3}" r="196" fill="#1c0606" opacity=".35" filter="url(#${id}-soft)"/>
  <circle cx="${c}" cy="${c}" r="196" fill="url(#${id}-rim)"/>
  <circle cx="${c}" cy="${c}" r="189" fill="none" stroke="#fff3c8" stroke-opacity=".5" stroke-width="2"/>
  <circle cx="${c}" cy="${c}" r="183" fill="url(#${id}-brass)"/>
  <circle cx="${c}" cy="${c}" r="183" fill="#000" filter="url(#${id}-grain)"/>
  <circle cx="${c}" cy="${c}" r="178" fill="none" stroke="#4f3a12" stroke-opacity=".55" stroke-width="2"/>
  <circle cx="${c}" cy="${c}" r="124" fill="none" stroke="#4f3a12" stroke-opacity=".55" stroke-width="2"/>
  <!-- engraved ring lettering (darkened into the brass) -->
  <use href="#${id}-ring" fill="#fff4cf" opacity=".5" transform="translate(.6 .9)"/>
  <use href="#${id}-ring" fill="#3d2c0c"/>
  <!-- enamel center -->
  <circle cx="${c}" cy="${c}" r="118" fill="url(#${id}-rim)"/>
  <circle cx="${c}" cy="${c}" r="111" fill="url(#${id}-enamel)"/>
  <circle cx="${c}" cy="${c}" r="111" fill="#000" filter="url(#${id}-grain)"/>
  <circle cx="${c}" cy="${c}" r="100" fill="none" stroke="url(#${id}-brass)" stroke-width="2"/>
  ${raised(id, `${id}-center`, 1)}
  <ellipse cx="${c - 40}" cy="${c - 70}" rx="90" ry="44" fill="#fff" opacity=".06"/>
</svg>
`;
}

const star = (x, y, r) => {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 ? r * 0.42 : r;
    pts.push(`${f(x + rr * Math.cos(a))} ${f(y + rr * Math.sin(a))}`);
  }
  return `<path d="M${pts.join('L')}Z"/>`;
};

mkdirSync(`${root}public/brand`, { recursive: true });

writeFileSync(
  `${root}public/brand/plate.svg`,
  plate({ id: 'p', w: 640, h: 300, rim: 14, rivetR: 9, mainSize: 118, mainBase: 172, incSize: 40, incBase: 236, ruleY: 222, title: 'Mel-Co-Ed, Inc.' }),
);
writeFileSync(
  `${root}public/brand/plate-compact.svg`,
  plate({ id: 'pc', w: 300, h: 124, rim: 7, rivetR: 4.2, mainSize: 54, mainBase: 72, incSize: 17, incBase: 101, ruleY: 95, title: 'Mel-Co-Ed, Inc.' }),
);

const est = word(BOLD, 'EST.', 30, 200, 172, 0.3).d;
const year = word(BLACK, '1948', 78, 200, 248, 0.02).d;
writeFileSync(
  `${root}public/brand/seal.svg`,
  seal({
    id: 's',
    title: 'Mel-Co-Ed, Inc. · Est. 1948 · Pawtucket, R.I.',
    ringText: 'MEL-CO-ED · INC. · EST. 1948 · PAWTUCKET, R.I. · ',
    center: `<path d="${est}"/><path d="${year}"/>${star(140, 268, 9)}${star(260, 268, 9)}${star(200, 278, 11)}`,
  }),
);

const made1 = word(BOLD, 'PAWTUCKET', 25, 200, 194, 0.12).d;
const made2 = word(BLACK, 'PROUD', 52, 200, 250, 0.12).d;
writeFileSync(
  `${root}public/brand/seal-made-in.svg`,
  seal({
    id: 'm',
    title: 'Made in Rhode Island, USA · Pawtucket Proud',
    ringText: 'MADE IN RHODE ISLAND · USA · MADE IN RHODE ISLAND · USA · ',
    center: `<path d="${made1}"/><path d="${made2}"/>${star(200, 150, 14)}`,
  }),
);

// Favicon: at 16–32px only a monogram survives, so the seal is reduced to rim + enamel + M.
const m = word(BLACK, 'M', 230, 256, 338, 0).d;
writeFileSync(
  `${root}public/favicon.svg`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs>${defs('f')}<g id="f-m"><path d="${m}"/></g></defs>
  <circle cx="256" cy="256" r="252" fill="url(#f-rim)"/><circle cx="256" cy="256" r="214" fill="url(#f-enamel)"/>
  <circle cx="256" cy="256" r="196" fill="none" stroke="url(#f-brass)" stroke-width="6"/>${raised('f', 'f-m', 2.4)}</svg>
`,
);
writeFileSync(`${root}public/logo.svg`, readFileSync(`${root}public/brand/seal.svg`));
console.log('brand marks written to public/brand/, public/favicon.svg, public/logo.svg');

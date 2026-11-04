// Photo slots for every page. Put image files in src/assets/photos/, import them
// here, and add them to a slot. <PhotoSlot> and <MediaSlot> render them through
// Astro's <Image> (resized, WebP, responsive srcset, lazy-loaded); an empty slot
// shows its TODO box. The first photo of a slot is used for page headers and
// tiles; galleries show the rest.
//
// Alt text: describe what is in the photo (part, finish, setting), not "image of".
// Photo direction: people and craftsmanship, tight close-ups, a few big-machine moments.
// No wide shop-floor views. Current photos are close-ups from the old melcoed.com library;
// Badges and Fraternal & Lodge use labeled illustrations until house samples are shot.
//
// NEW SHOOT: add next week's photos to the matching `shoot` entry below. Each one then
// leads the page slots listed for it automatically. An empty slot renders as a clean dark
// frame; new-only positions (marked "shows when filled") stay hidden until a photo exists.

import type { ImageMetadata } from 'astro';

import brassBlanks from '../assets/photos/brass-blanks.jpg';
import buildingSign from '../assets/photos/building-sign.jpg';
import findingsBoards from '../assets/photos/findings-sample-boards.jpg';
import cuffsTextured from '../assets/photos/cuffs-textured.jpg';
import cuffsEmbossed from '../assets/photos/cuffs-embossed.jpg';
import tieBars from '../assets/photos/tie-bars.jpg';
import cufflinksFootball from '../assets/photos/cufflinks-football.jpg';
import cufflinksWorn from '../assets/photos/cufflinks-worn.jpg';
import pendantsDogTags from '../assets/photos/pendants-dog-tags.jpg';
import flagPinFront from '../assets/photos/flag-pin-front.jpg';
import flagPinAngle from '../assets/photos/flag-pin-angle.jpg';
import dieSetBench from '../assets/photos/die-set-bench.jpg';
import dieBlockCloseup from '../assets/photos/die-block-closeup.jpg';
import pressControlPanel from '../assets/photos/press-control-panel.jpg';
import partsConveyor from '../assets/photos/parts-conveyor.jpg';
import finishedGoods from '../assets/photos/finished-goods-assortment.jpg';
import patternStock from '../assets/photos/pattern-stock.jpg';
// Labeled illustrations of styles we strike, cropped from src/assets/illustrations/badge-styles-sheet.png.
// Customer work is confidential; these use fictional names only.
import ilPolice from '../assets/illustrations/badge-style-police-eagle.jpg';
import ilFireCross from '../assets/illustrations/badge-style-fire-maltese-cross.jpg';
import ilSheriff from '../assets/illustrations/badge-style-sheriff-star.jpg';
import ilSecurity from '../assets/illustrations/badge-style-security-shield.jpg';
import ilWings from '../assets/illustrations/badge-style-pilot-wings.jpg';
import ilFireRound from '../assets/illustrations/badge-style-fire-rescue-round.jpg';
import ilEdge from '../assets/illustrations/badge-style-edge-closeup.jpg';
import ilLodge from '../assets/illustrations/lodge-style-square-compass.jpg';
import ilTree from '../assets/illustrations/lodge-style-tree-medallion.jpg';
import ilCross from '../assets/illustrations/lodge-style-cross-emblem.jpg';
import ilTorch from '../assets/illustrations/lodge-style-torch-diamond.jpg';
import ilLighthouse from '../assets/illustrations/lodge-style-lighthouse-medallion.jpg';

/** `illustration: true` marks a labeled illustration of a style we strike (fictional names,
 *  never a customer piece). It renders with a visible "Illustration" label and the
 *  confidentiality note. Replace with real house-sample photos when available. */
export type Photo = { src: ImageMetadata; alt: string; illustration?: boolean };

// ============ NEW SHOOT ============
// Shot list for next week. Add photos to `shoot.<key>`, e.g.
//   import toolmaker1 from '../assets/photos/toolmaker-bench.jpg';
//   toolmaker: [{ src: toolmaker1, alt: 'A toolmaker fitting a die at the bench' }],
export const newShoot = [
  { key: 'toolmaker', shot: 'Toolmaker at bench', pages: 'About, Tooling' },
  { key: 'operatorPress', shot: 'Operator at a press, tight', pages: 'Metal Stamping' },
  { key: 'calipers', shot: 'Hands checking a part with calipers', pages: 'Capabilities (quality)' },
  { key: 'buildingSign', shot: 'Team or owner at the building sign', pages: 'About' },
  { key: 'largePress', shot: 'One large press, low angle', pages: 'Home, Metal Stamping' },
  { key: 'coilFeed', shot: 'Coil feeding a press', pages: 'Metal Stamping' },
  { key: 'dieInPress', shot: 'Die set in a press, close up', pages: 'Die Striking' },
  { key: 'dieAndPart', shot: 'Die next to its struck part', pages: 'Home, Tooling, Who Owns the Die' },
  { key: 'freshStrike', shot: 'Fresh strike coming off the die', pages: 'Die Striking' },
  { key: 'finishedTray', shot: 'Tray of finished parts', pages: 'Products' },
  { key: 'rawStock', shot: 'Raw brass and sterling stock', pages: 'Materials' },
  { key: 'velvet', shot: 'Polished pieces on dark velvet', pages: 'Findings, Medallions' },
] as const;
export type ShootKey = (typeof newShoot)[number]['key'];

export const shoot: Record<ShootKey, Photo[]> = {
  toolmaker: [],
  operatorPress: [],
  calipers: [],
  buildingSign: [],
  largePress: [],
  coilFeed: [],
  dieInPress: [],
  dieAndPart: [],
  freshStrike: [],
  finishedTray: [],
  rawStock: [],
  velvet: [],
};

export type PhotoSlotName =
  | 'home-hero'
  | 'home-heritage'
  | 'findings'
  | 'pattern-stock'
  | 'badges'
  | 'medallions'
  | 'awards'
  | 'industrial-components'
  | 'metal-stamping'
  | 'capabilities'
  | 'product-development'
  | 'industries'
  | 'industries-fraternal'
  | 'industries-commemorative'
  | 'about'
  // service tiles
  | 'die-striking'
  | 'tooling'
  | 'cnc-milling'
  | 'packaging'
  // shows when filled (new-shoot-only positions)
  | 'products'
  | 'quality'
  | 'materials'
  | 'die-striking-shoot'
  | 'tooling-shoot'
  | 'die-ownership';

// Close-ups reused across pages.
const close = {
  brassBlanks: { src: brassBlanks, alt: 'A pile of brass stamped blanks catching warm light' },
  dieBlock: { src: dieBlockCloseup, alt: 'Close-up of a stamping die block with guide posts and fasteners' },
  dieSet: { src: dieSetBench, alt: 'A stamping die set clamped on the bench, with freshly stamped parts below it' },
  conveyor: { src: partsConveyor, alt: 'A parts conveyor carrying stamped parts away from the presses' },
  controlPanel: { src: pressControlPanel, alt: 'An operator at the control panel of a stamping press, beside a cart of dies' },
  finishedGoods: {
    src: finishedGoods,
    alt: 'Finished pieces built from stamped components: cuffs, bangles, bracelets, cufflinks, tie bars and flag pins',
  },
  sign: { src: buildingSign, alt: 'The Mel-Co-Ed, Inc. building in Pawtucket, Rhode Island, with the company name in script across the facade' },
  cuffsEmbossed: { src: cuffsEmbossed, alt: 'Two embossed cuff bracelets, one in antique brass and one in satin silver' },
} satisfies Record<string, Photo>;

export const photos: Partial<Record<PhotoSlotName, Photo[]>> = {
  'home-hero': [...shoot.largePress, close.brassBlanks],
  'home-heritage': [...shoot.buildingSign, close.sign],
  findings: [
    ...shoot.velvet,
    { src: findingsBoards, alt: 'Sample boards covered with hundreds of stamped jewelry findings, mounted on purple and teal panels' },
    { src: cuffsTextured, alt: 'Three stamped cuff bracelets with textured and hammered patterns in a silver finish' },
    close.cuffsEmbossed,
    { src: tieBars, alt: 'Stamped tie bars in gold, silver, gunmetal and antique brass finishes' },
    { src: cufflinksFootball, alt: 'A pair of football-shaped cufflinks in an antique brass finish' },
    { src: cufflinksWorn, alt: 'A square cufflink fastened on a French cuff under a navy suit jacket' },
  ],
  'pattern-stock': [{ src: patternStock, alt: 'Strips of embossed brass pattern stock with a finished cuff made from it' }],
  badges: [
    { illustration: true, src: ilPolice, alt: 'Illustration of a gold police badge with an eagle crest, star center and laurel border, for a fictional department' },
    { illustration: true, src: ilFireCross, alt: 'Illustration of a fire department badge in a Maltese cross shape with red enamel and firefighting tools' },
    { illustration: true, src: ilSheriff, alt: 'Illustration of a six-point sheriff star with ball tips and engraved scrollwork' },
    { illustration: true, src: ilSecurity, alt: 'Illustration of a silver security badge with an eagle crest and a shield center' },
    { illustration: true, src: ilWings, alt: 'Illustration of a pair of silver pilot wings with a navy enamel shield and star' },
    { illustration: true, src: ilFireRound, alt: 'Illustration of a round fire rescue badge with a red enamel ring and a Maltese cross center' },
    { illustration: true, src: ilEdge, alt: 'Illustration of a close-up of a struck medallion edge, showing raised oak-leaf relief and a polished rim' },
  ],
  'industries-fraternal': [
    { illustration: true, src: ilLodge, alt: 'Illustration of a round lodge emblem with a square and compasses, navy enamel and a laurel border, for a fictional lodge' },
    { illustration: true, src: ilTree, alt: 'Illustration of a bronze medallion with a tree of life, ringed by the words Service, Character, Unity' },
    { illustration: true, src: ilCross, alt: 'Illustration of a fraternal cross emblem in navy enamel with a laurel wreath and gold rays' },
    { illustration: true, src: ilTorch, alt: 'Illustration of a diamond-shaped pin with a torch and laurel on red enamel' },
    { illustration: true, src: ilLighthouse, alt: 'Illustration of a bronze medallion with a lighthouse scene, ringed by the words Guidance, Service, Community' },
  ],
  medallions: [
    ...shoot.velvet,
    { src: pendantsDogTags, alt: 'Die-struck pendants on ball chains in silver and gold finishes, displayed on black velvet' },
  ],
  awards: [
    { src: flagPinFront, alt: 'An enameled American flag lapel pin' },
    { src: flagPinAngle, alt: 'An American flag lapel pin shown at an angle with its clutch back' },
  ],
  'industrial-components': [close.conveyor, close.dieSet, close.dieBlock],
  'metal-stamping': [...shoot.largePress, ...shoot.operatorPress, ...shoot.coilFeed, close.controlPanel, close.conveyor, close.brassBlanks],
  capabilities: [...shoot.toolmaker, close.dieBlock, close.controlPanel, close.conveyor, close.dieSet],
  // Development work is customer work, so none of it is shown.
  'product-development': [...shoot.dieAndPart, close.cuffsEmbossed, close.dieSet, close.dieBlock],
  industries: [close.finishedGoods],
  about: [...shoot.buildingSign, close.sign, ...shoot.toolmaker],
  // Service tiles (Home and menus)
  'die-striking': [...shoot.dieInPress, ...shoot.freshStrike, close.dieSet],
  tooling: [...shoot.toolmaker, ...shoot.dieAndPart, close.dieBlock],
  'cnc-milling': [],
  packaging: [],
  // Shows when filled
  products: [...shoot.finishedTray],
  quality: [...shoot.calipers],
  materials: [...shoot.rawStock],
  'die-striking-shoot': [...shoot.dieInPress, ...shoot.freshStrike],
  'tooling-shoot': [...shoot.toolmaker, ...shoot.dieAndPart],
  'die-ownership': [...shoot.dieAndPart],
};

/** True when a slot has at least one photo (for positions that only show when filled). */
export const hasPhoto = (slot: PhotoSlotName) => (photos[slot]?.length ?? 0) > 0;

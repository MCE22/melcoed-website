// Photo slots for every page. Put image files in src/assets/photos/, import them
// here, and add them to a slot. <PhotoSlot> and <MediaSlot> render them through
// Astro's <Image> (resized, WebP, responsive srcset, lazy-loaded). The first photo of
// a slot is used for page headers and tiles; galleries show the rest.
//
// Alt text: describe what is in the photo (part, finish, setting), not "image of".
//
// OWNER PHOTO RULES (final, Nov 2026)
//   Allowed: building exterior and sign; office; showroom; our own product (Open Line
//   findings, pattern stock, stampings), NEVER customer work; labeled AI illustrations
//   (badges, lodge, medallions); unlabeled AI material close-ups (coil, strip, die face,
//   struck relief, blanks, milled surface) with no machines, no people, no logos.
//   Not allowed: factory floor photos of any kind. No presses, no shop floor, no
//   workers at machines.
//
// SHOT LIST: add photos to the matching `shoot` entry below. Until a shot exists, every
// position that needs it shows a SPACER: a solid brand-tone panel with the small seal,
// the same size as the photo, no text, tagged in the HTML with data-shot="PHOTO-05" etc.
// Fill `shoot.<key>` and the spacer is replaced automatically. Positions marked
// "shows when filled" stay hidden until a photo exists. AI prompts: docs/photo-prompts.md.

import type { ImageMetadata } from 'astro';

import brassBlanks from '../assets/photos/brass-blanks.jpg';
import findingsBoards from '../assets/photos/findings-sample-boards.jpg';
import cuffsTextured from '../assets/photos/cuffs-textured.jpg';
import cuffsEmbossed from '../assets/photos/cuffs-embossed.jpg';
import tieBars from '../assets/photos/tie-bars.jpg';
import cufflinksFootball from '../assets/photos/cufflinks-football.jpg';
import cufflinksWorn from '../assets/photos/cufflinks-worn.jpg';
import flagPinFront from '../assets/photos/flag-pin-front.jpg';
import flagPinAngle from '../assets/photos/flag-pin-angle.jpg';
import finishedGoods from '../assets/photos/finished-goods-assortment.jpg';
import patternStock from '../assets/photos/pattern-stock.jpg';
import libertasObverse from '../assets/photos/libertas-americana-obverse.jpg';
import buildingSign from '../assets/photos/building-sign.jpg';
import teamShowroom from '../assets/photos/team-showroom.jpg';
import showroomWall from '../assets/photos/showroom-wall.jpg';
import showroomStands from '../assets/photos/showroom-display-stands.jpg';
import findingsFloral from '../assets/photos/findings-floral-stampings.jpg';
import patternDiscs from '../assets/photos/pattern-discs.jpg';
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
/** Placeholder for a shot not taken yet. `shot` is the shot-list id, e.g. "PHOTO-05". */
export type Spacer = { spacer: true; shot: string; label: string };
export type SlotItem = Photo | Spacer;
export const isSpacer = (p: SlotItem | undefined): p is Spacer => !!p && 'spacer' in p;

// ============ SHOT LIST ============
// AI = owner runs the prompt in docs/photo-prompts.md. Phone = owner shoots it, portrait
// mode, background blurred. Add results to `shoot.<key>`, e.g.
//   import coil1 from '../assets/photos/brass-coil-edge.jpg';
//   coil: [{ src: coil1, alt: 'Edge of a brass coil in warm light' }],
// Retired (owner rules): PHOTO-01 toolmaker, PHOTO-02 press operator, PHOTO-04 team at sign.
export const newShoot = [
  { key: 'calipers', id: 'PHOTO-03', shot: 'Phone: calipers on a part', pages: 'Capabilities gallery (spacer); Quality section when filled' },
  { key: 'coil', id: 'PHOTO-05', shot: 'AI: brass coil, edge-on close-up', pages: 'Home Services and Metal Stamping hero (spacers)' },
  { key: 'strip', id: 'PHOTO-06', shot: 'AI: stamped brass strip with blanked openings', pages: 'Metal Stamping gallery (spacer)' },
  { key: 'dieFace', id: 'PHOTO-07', shot: 'AI: polished die face, macro', pages: 'Capabilities hero (spacer); Tooling section when filled' },
  { key: 'dieAndPart', id: 'PHOTO-08', shot: 'Phone: die next to its struck part', pages: 'Product Development gallery (spacer); Tooling and Who Owns the Die when filled' },
  { key: 'struckRelief', id: 'PHOTO-09', shot: 'AI: struck relief in raking light', pages: 'Product Development gallery (spacer); Die Striking section when filled' },
  { key: 'finishedTray', id: 'PHOTO-10', shot: 'AI or phone: tray of Open Line findings', pages: 'Metal Stamping gallery (spacer); Products hub header when filled' },
  { key: 'rawStock', id: 'PHOTO-11', shot: 'AI: raw brass and silver sheet stock', pages: 'Capabilities materials section when filled' },
  { key: 'velvet', id: 'PHOTO-12', shot: 'AI: polished pieces on dark velvet', pages: 'leads the Findings and Medallions pages when filled' },
  { key: 'milledSurface', id: 'PHOTO-13', shot: 'AI: milled steel surface, macro', pages: 'Capabilities gallery (spacer)' },
  { key: 'packaging', id: 'PHOTO-14', shot: 'AI: bagged and boxed parts, close-up', pages: 'Packaging service tile (not placed on a page yet)' },
  { key: 'showroom', id: 'PHOTO-15', shot: 'Phone: showroom, fresh shot', pages: 'replaces the current showroom photos on About when filled' },
  { key: 'office', id: 'PHOTO-16', shot: 'Phone: office', pages: 'About page when filled (add to the about slot)' },
] as const;
export type ShootKey = (typeof newShoot)[number]['key'];

export const shoot: Record<ShootKey, Photo[]> = {
  calipers: [],
  coil: [],
  strip: [],
  dieFace: [],
  dieAndPart: [],
  struckRelief: [],
  finishedTray: [],
  rawStock: [],
  velvet: [],
  milledSurface: [],
  packaging: [],
  showroom: [],
  office: [],
};

/** The shoot photos for `key`, or its spacer while none exist. */
const shot = (key: ShootKey): SlotItem[] => {
  if (shoot[key].length) return shoot[key];
  const s = newShoot.find((n) => n.key === key)!;
  return [{ spacer: true, shot: s.id, label: s.shot }];
};

export type PhotoSlotName =
  | 'home-hero'
  | 'home-heritage'
  | 'findings'
  | 'pattern-stock'
  | 'badges'
  | 'medallions'
  | 'awards'
  | 'metal-stamping'
  | 'capabilities'
  | 'product-development'
  | 'industries'
  | 'industries-fraternal'
  | 'about'
  // service tiles
  | 'die-striking'
  | 'tooling'
  | 'precision-milling'
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
  finishedGoods: {
    src: finishedGoods,
    alt: 'Finished pieces built from stamped components: cuffs, bangles, bracelets, cufflinks, tie bars and flag pins',
  },
  cuffsEmbossed: { src: cuffsEmbossed, alt: 'Two embossed cuff bracelets, one in antique brass and one in satin silver' },
  libertasObverse: { src: libertasObverse, alt: 'Antique-silver Libertas Americana medal reading "Tribute to 1783, Princeton, NJ, 2008"' },
  sign: { src: buildingSign, alt: 'The Mel-Co-Ed, Inc. building in Pawtucket, Rhode Island, with the company name in script across the facade' },
} satisfies Record<string, Photo>;

const showroom: Photo[] = shoot.showroom.length
  ? shoot.showroom
  : [
      { src: showroomWall, alt: 'The Mel-Co-Ed showroom: a purple wall of Open Line finding sample boards in gold and silver' },
      { src: showroomStands, alt: 'Swinging display panels of Open Line stampings in the Mel-Co-Ed showroom' },
    ];

export const photos: Partial<Record<PhotoSlotName, SlotItem[]>> = {
  'home-hero': [close.brassBlanks],
  'home-heritage': [close.sign],
  findings: [
    ...shoot.velvet,
    { src: findingsBoards, alt: 'Sample boards covered with hundreds of stamped jewelry findings, mounted on purple and teal panels' },
    { src: findingsFloral, alt: 'Die-struck floral findings in gold: leaves, an iris and a cluster of flowers on a dark background' },
    { src: cuffsTextured, alt: 'Three stamped cuff bracelets with textured and hammered patterns in a silver finish' },
    close.cuffsEmbossed,
    { src: tieBars, alt: 'Stamped tie bars in gold, silver, gunmetal and antique brass finishes' },
    { src: cufflinksFootball, alt: 'A pair of football-shaped cufflinks in an antique brass finish' },
    { src: cufflinksWorn, alt: 'A square cufflink fastened on a French cuff under a navy suit jacket' },
  ],
  'pattern-stock': [
    { src: patternStock, alt: 'Strips of embossed brass pattern stock with a finished cuff made from it' },
    { src: patternDiscs, alt: 'Brass discs cut from embossed pattern stock, overlapping on a dark background' },
  ],
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
  medallions: [...shoot.velvet, close.libertasObverse],
  awards: [
    { src: flagPinFront, alt: 'An enameled American flag lapel pin' },
    { src: flagPinAngle, alt: 'An American flag lapel pin shown at an angle with its clutch back' },
  ],
  // Hero/tile = [0]; the gallery shows the next two.
  'metal-stamping': [...shot('coil'), ...shot('strip'), ...shot('finishedTray')],
  capabilities: [...shot('dieFace'), ...shot('calipers'), ...shot('milledSurface')],
  // Development work is customer work, so none of it is shown.
  'product-development': [close.cuffsEmbossed, ...shot('dieAndPart'), ...shot('struckRelief')],
  industries: [close.finishedGoods],
  // About gallery: two pictures, the team and the showroom (an office shot can take the team's spot later).
  about: [close.sign, { src: teamShowroom, alt: 'Members of the Mel-Co-Ed team gathered around a table in the showroom' }, showroom[0], ...shoot.office],
  // Service tiles (not placed on a page today)
  'die-striking': shot('struckRelief'),
  tooling: shot('dieFace'),
  'precision-milling': shot('milledSurface'),
  packaging: shot('packaging'),
  // Shows when filled
  products: [...shoot.finishedTray],
  quality: [...shoot.calipers],
  materials: [...shoot.rawStock],
  'die-striking-shoot': [...shoot.struckRelief],
  'tooling-shoot': [...shoot.dieFace, ...shoot.dieAndPart],
  'die-ownership': [...shoot.dieAndPart],
};

/** True when a slot has something to show, photo or spacer (for positions that only show when filled). */
export const hasPhoto = (slot: PhotoSlotName) => (photos[slot]?.length ?? 0) > 0;

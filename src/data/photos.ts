// Photo slots for every page. Put image files in src/assets/photos/, import them
// here, and add them to a slot. <PhotoSlot> and <MediaSlot> render them through
// Astro's <Image> (resized, WebP, responsive srcset, lazy-loaded); an empty slot
// shows its TODO box. The first photo of a slot is used for page headers and
// tiles; galleries show the rest.
//
// Alt text: describe what is in the photo (part, finish, setting), not "image of".
// Current photos come from the old melcoed.com media library (raw import on the
// `photo-import` branch). Badges and Fraternal & Lodge have no usable photos yet.

import type { ImageMetadata } from 'astro';

import brassBlanks from '../assets/photos/brass-blanks.jpg';
import pressFloorPerkins from '../assets/photos/press-floor-perkins.jpg';
import buildingSign from '../assets/photos/building-sign.jpg';
import findingsBoards from '../assets/photos/findings-sample-boards.jpg';
import cuffsTextured from '../assets/photos/cuffs-textured.jpg';
import cuffsEmbossed from '../assets/photos/cuffs-embossed.jpg';
import tieBars from '../assets/photos/tie-bars.jpg';
import cufflinksFootball from '../assets/photos/cufflinks-football.jpg';
import cufflinksWorn from '../assets/photos/cufflinks-worn.jpg';
import medallionsAssortment from '../assets/photos/medallions-assortment.jpg';
import pendantsDogTags from '../assets/photos/pendants-dog-tags.jpg';
import flagPinFront from '../assets/photos/flag-pin-front.jpg';
import flagPinAngle from '../assets/photos/flag-pin-angle.jpg';
import dieSetBench from '../assets/photos/die-set-bench.jpg';
import dieBlockCloseup from '../assets/photos/die-block-closeup.jpg';
import pressesRow from '../assets/photos/presses-row.jpg';
import brassCoilShelves from '../assets/photos/brass-coil-shelves.jpg';
import brassCoilPallet from '../assets/photos/brass-coil-pallet.jpg';
import pressOperators from '../assets/photos/press-operators.jpg';
import pressControlPanel from '../assets/photos/press-control-panel.jpg';
import toolRoomCnc from '../assets/photos/tool-room-cnc.jpg';
import toolRoomEdm from '../assets/photos/tool-room-edm.jpg';
import toolRoomBandsaw from '../assets/photos/tool-room-bandsaw.jpg';
import dieStorageRacks from '../assets/photos/die-storage-racks.jpg';
import footPresses from '../assets/photos/foot-presses.jpg';
import partsConveyor from '../assets/photos/parts-conveyor.jpg';
import finishedGoods from '../assets/photos/finished-goods-assortment.jpg';
import libertasObverse from '../assets/photos/libertas-americana-obverse.jpg';
import libertasReverse from '../assets/photos/libertas-americana-reverse.jpg';
import pressAisle from '../assets/photos/press-aisle-operator.jpg';
import team from '../assets/photos/team.jpg';
import packingOrders from '../assets/photos/packing-orders.jpg';
import assemblyBenches from '../assets/photos/assembly-benches.jpg';
import shopFloorDesk from '../assets/photos/shop-floor-desk.jpg';
import patternStock from '../assets/photos/pattern-stock.jpg';

export type Photo = { src: ImageMetadata; alt: string };

export type PhotoSlotName =
  | 'home-hero'
  | 'home-heritage'
  | 'home-approach'
  | 'findings'
  | 'pattern-stock'
  | 'badges'
  | 'medallions'
  | 'awards'
  | 'industrial-components'
  | 'capabilities'
  | 'industries'
  | 'industries-fraternal'
  | 'industries-commemorative'
  | 'about';

export const photos: Partial<Record<PhotoSlotName, Photo[]>> = {
  'home-hero': [{ src: brassBlanks, alt: 'A pile of brass stamped blanks catching warm light' }],
  'home-approach': [
    { src: pressFloorPerkins, alt: 'Perkins mechanical stamping presses on the press floor, with coils of brass strip on pallets' },
  ],
  'home-heritage': [
    { src: buildingSign, alt: 'The Mel-Co-Ed, Inc. building in Pawtucket, Rhode Island, with the company name in script across the facade' },
  ],
  findings: [
    { src: findingsBoards, alt: 'Sample boards covered with hundreds of stamped jewelry findings, mounted on purple and teal panels' },
    { src: cuffsTextured, alt: 'Three stamped cuff bracelets with textured and hammered patterns in a silver finish' },
    { src: cuffsEmbossed, alt: 'Two embossed cuff bracelets, one in antique brass and one in satin silver' },
    { src: tieBars, alt: 'Stamped tie bars in gold, silver, gunmetal and antique brass finishes' },
    { src: cufflinksFootball, alt: 'A pair of football-shaped cufflinks in an antique brass finish' },
    { src: cufflinksWorn, alt: 'A square cufflink fastened on a French cuff under a navy suit jacket' },
  ],
  'pattern-stock': [{ src: patternStock, alt: 'Strips of embossed brass pattern stock with a finished cuff made from it' }],
  medallions: [
    { src: medallionsAssortment, alt: 'An assortment of die-struck medallions and pendants in gold and antique finishes' },
    { src: pendantsDogTags, alt: 'Die-struck pendants on ball chains in silver and gold finishes, displayed on black velvet' },
  ],
  awards: [
    { src: flagPinFront, alt: 'An enameled American flag lapel pin' },
    { src: flagPinAngle, alt: 'An American flag lapel pin shown at an angle with its clutch back' },
  ],
  'industrial-components': [
    { src: dieSetBench, alt: 'A stamping die set clamped on the bench, with freshly stamped parts below it' },
    { src: dieBlockCloseup, alt: 'Close-up of a stamping die block with guide posts and fasteners' },
    { src: pressesRow, alt: 'Mechanical punch presses lined up on the press floor' },
    { src: brassCoilShelves, alt: 'Coils of brass strip stored on wooden shelving' },
    { src: brassCoilPallet, alt: 'Shrink-wrapped coils of brass strip stock on a pallet' },
  ],
  capabilities: [
    { src: pressOperators, alt: 'Operators setting up a large mechanical stamping press on the shop floor' },
    { src: pressControlPanel, alt: 'An operator at the control panel of a stamping press, beside a cart of dies' },
    { src: toolRoomCnc, alt: 'A computer-controlled machining station in the tool room' },
    { src: toolRoomEdm, alt: 'An electrical discharge machine used for die making in the tool room' },
    { src: toolRoomBandsaw, alt: 'A DoAll vertical band saw in the tool room' },
    { src: dieStorageRacks, alt: 'Racks of stored stamping dies and tooling' },
    { src: footPresses, alt: 'A row of blue foot presses for secondary operations' },
    { src: partsConveyor, alt: 'A parts conveyor running alongside a stairway on the shop floor' },
  ],
  industries: [
    {
      src: finishedGoods,
      alt: 'Finished pieces built from stamped components: cuffs, bangles, bracelets, cufflinks, tie bars and flag pins',
    },
  ],
  'industries-commemorative': [
    { src: libertasObverse, alt: 'Antique-silver Libertas Americana medal reading "Tribute to 1783, Princeton, NJ, 2008"' },
    { src: libertasReverse, alt: 'Reverse of the Libertas Americana medal, inscribed "Non sine diis animosus infans" with the dates 1777 and 1781' },
  ],
  about: [
    { src: pressAisle, alt: 'An operator at a stamping press in an aisle lined with tooling shelves' },
    { src: team, alt: 'Mel-Co-Ed team members gathered around a table in the break room' },
    { src: packingOrders, alt: 'Finished orders being packed into cartons for shipment' },
    { src: assemblyBenches, alt: 'Assembly benches with team members at work' },
    { src: shopFloorDesk, alt: 'A Mel-Co-Ed employee working at a desk on the shop floor' },
  ],
};

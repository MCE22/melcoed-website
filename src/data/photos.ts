// Photo slots for every page. Put image files in src/assets/photos/, import them
// here, and add them to a slot. <PhotoSlot> renders them through Astro's <Image>
// (resized, WebP, responsive srcset, lazy-loaded); an empty slot shows its TODO box.
//
// Example:
//   import badgesFront from '../assets/photos/badges-police-shield.jpg';
//   badges: [{ src: badgesFront, alt: 'Die-struck nickel-finish police shield badge, front view' }],
//
// Alt text: describe what is in the photo (part, finish, setting), not "image of".

import type { ImageMetadata } from 'astro';

export type Photo = { src: ImageMetadata; alt: string };

export type PhotoSlotName =
  | 'home-hero'
  | 'home-heritage'
  | 'home-approach'
  | 'findings'
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
  // Empty until photos are supplied (old-site pull pending network access to www.melcoed.com).
};

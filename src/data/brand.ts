// Brand marks: the official plate logo and round seal (src/assets/brand/).
// Rendered through Astro's <Picture> (WebP + PNG fallback) by Logo.astro and Seal.astro.

import platePng from '../assets/brand/mce-plate.png';
import sealPng from '../assets/brand/mce-seal.png';

export { platePng, sealPng };
export const brandAlt = 'Mel-Co-Ed, Inc. — Pawtucket, Rhode Island, Est. 1948';

/** Verified origin claim. Primary line + small secondary line. */
export const madeIn = { primary: 'Made in Rhode Island, USA', secondary: 'Pawtucket Proud' };

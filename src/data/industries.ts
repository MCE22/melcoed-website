// Buyer groups for ornamental and industrial stamping. Used by the Industries page and
// the Home industries strip. `href` is the best page for that audience: a dedicated
// industry page where one exists, otherwise the closest service or product page.

export type Industry = {
  name: string;
  /** Line icon name (src/components/Icon.astro). */
  icon: 'gear' | 'hex' | 'bolt' | 'gem' | 'ribbon' | 'shield' | 'columns' | 'tag' | 'cross' | 'golf';
  summary: string;
  href: string;
  /** Has its own page under /industries/ */
  dedicated?: boolean;
  /** A related industry page shown as a second link on the card. */
  related?: { label: string; href: string };
};

export const industries: Industry[] = [
  {
    name: 'Jewelry & Fashion',
    icon: 'gem',
    summary: 'Findings, blanks and stamped components for jewelers, designers and fashion brands.',
    href: '/findings/',
  },
  {
    name: 'Awards & Recognition',
    icon: 'ribbon',
    summary: 'Medallions, service awards and recognition pins, struck to your design.',
    href: '/awards/',
  },
  {
    name: 'Government & Public Safety',
    icon: 'shield',
    summary: 'Die-struck police, sheriff, fire, EMS, military and government badges and insignia.',
    href: '/badges/',
  },
  {
    name: 'Fraternal & Lodge',
    icon: 'columns',
    summary: 'Fraternal emblems, lapel pins and jewels, made to your design.',
    href: '/industries/fraternal-lodge/',
    dedicated: true,
  },
  {
    name: 'Product brands & packaging',
    icon: 'tag',
    summary: 'Raised metal emblems and nameplates for mounting on packaging, accessories and finished goods.',
    href: '/resources/custom-die-struck-emblems-nameplates/',
  },
  {
    name: 'Corporate & Promotional',
    icon: 'tag',
    summary: 'Challenge coins, emblems and pins for companies, programs and events.',
    href: '/medallions/',
  },
  {
    name: 'Religious Goods',
    icon: 'cross',
    summary: 'Die-struck and stamped pieces made to order for religious goods suppliers.',
    href: '/products/',
  },
  {
    name: 'Golf & Sports',
    icon: 'golf',
    summary: 'Ball markers, divot tools, money clips and team and event pieces.',
    href: '/products/',
  },
  {
    name: 'OEM & Industrial',
    icon: 'gear',
    summary: 'Parts stamped to print for manufacturers and contract assemblers.',
    href: '/metal-stamping/',
  },
  {
    name: 'Hardware',
    icon: 'hex',
    summary: 'Stamped parts built to print for hardware makers.',
    href: '/metal-stamping/',
  },
  {
    name: 'Electrical',
    icon: 'bolt',
    summary: 'Stamped parts built to print for electrical products.',
    href: '/metal-stamping/',
  },
];

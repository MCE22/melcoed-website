// Industries served. Used by the Industries hub and the Home page.
// `href` is the best page for that audience: a dedicated industry page where one
// exists, otherwise the closest product page. Links only render once the page exists.

export type Industry = {
  name: string;
  summary: string;
  href: string;
  /** Has its own page under /industries/ */
  dedicated?: boolean;
};

export const industries: Industry[] = [
  {
    name: 'Fraternal & Lodge',
    summary: 'Masonic and fraternal emblems, lapel pins and insignia for lodges, grand lodges and regalia suppliers.',
    href: '/industries/fraternal-lodge/',
    dedicated: true,
  },
  {
    name: 'Commemorative & 250th',
    summary: "Medallions, coins and pins for America's 250th, town anniversaries, historical societies and milestones.",
    href: '/industries/commemorative/',
    dedicated: true,
  },
  {
    name: 'Law Enforcement & Public Safety',
    summary: 'Die-struck police, sheriff, fire and EMS badges, plus reproductions of retired designs.',
    href: '/badges/',
  },
  {
    name: 'Military & Government',
    summary: 'Die-struck badges, insignia and medallions for agencies, units and government programs.',
    href: '/badges/',
  },
  {
    name: 'Jewelry & Accessory Brands',
    summary: 'Findings and raw die-struck stampings for jewelers, designers and finishers.',
    href: '/findings/',
  },
  {
    name: 'Awards & Recognition',
    summary: 'Service awards, recognition pins and stamped components for award programs.',
    href: '/awards/',
  },
  {
    name: 'Industrial OEMs',
    summary: 'Precision stamped components built to print for manufacturers and contract assemblers.',
    href: '/industrial-components/',
  },
];

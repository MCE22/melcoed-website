// Industries served. Used by the Industries hub and the Home page.
// `href` is the best page for that audience: a dedicated industry page where one
// exists, otherwise the closest product page. Links only render once the page exists.

export type Industry = {
  name: string;
  /** Line icon name (src/components/Icon.astro) for the Home "Trusted across industries" strip. */
  icon: 'shield' | 'star' | 'columns' | 'medal' | 'gem' | 'ribbon' | 'gear';
  summary: string;
  href: string;
  /** Has its own page under /industries/ */
  dedicated?: boolean;
};

export const industries: Industry[] = [
  {
    name: 'Fraternal & Lodge',
    icon: 'columns',
    summary: 'Masonic and fraternal emblems, lapel pins and insignia for lodges, grand lodges and regalia suppliers.',
    href: '/industries/fraternal-lodge/',
    dedicated: true,
  },
  {
    name: 'Commemorative & 250th',
    icon: 'medal',
    summary: "Medallions, coins and pins for America's 250th, town anniversaries, historical societies and milestones.",
    href: '/industries/commemorative/',
    dedicated: true,
  },
  {
    name: 'Law Enforcement & Public Safety',
    icon: 'shield',
    summary: 'Die-struck police, sheriff, fire and EMS badges, plus reproductions of retired designs.',
    href: '/badges/',
  },
  {
    name: 'Military & Government',
    icon: 'star',
    summary: 'Die-struck badges, insignia and medallions for agencies, units and government programs.',
    href: '/badges/',
  },
  {
    name: 'Jewelry & Accessory Brands',
    icon: 'gem',
    summary: 'Findings and raw die-struck stampings for jewelers, designers and finishers.',
    href: '/findings/',
  },
  {
    name: 'Awards & Recognition',
    icon: 'ribbon',
    summary: 'Service awards, recognition pins and stamped components for award programs.',
    href: '/awards/',
  },
  {
    name: 'Industrial OEMs',
    icon: 'gear',
    summary: 'Precision stamped components built to print for manufacturers and contract assemblers.',
    href: '/industrial-components/',
  },
];

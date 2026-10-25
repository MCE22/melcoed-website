// Industries served: metal stamping for every industry. Used by the Industries page and
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
    name: 'OEM & Industrial',
    icon: 'gear',
    summary: 'Precision stamped components built to print for manufacturers and contract assemblers.',
    href: '/industrial-components/',
  },
  {
    name: 'Hardware',
    icon: 'hex',
    summary: 'Stamped brackets, plates, clips and washers for hardware makers, built to print.',
    href: '/metal-stamping/',
  },
  {
    name: 'Electrical',
    icon: 'bolt',
    summary: 'Stamped contacts, clips, brackets and shims for electrical products, built to print.',
    href: '/metal-stamping/',
  },
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
    related: { label: 'Commemorative & 250th', href: '/industries/commemorative/' },
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
    summary: 'Masonic and fraternal emblems, lapel pins and insignia for lodges and regalia suppliers.',
    href: '/industries/fraternal-lodge/',
    dedicated: true,
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
];

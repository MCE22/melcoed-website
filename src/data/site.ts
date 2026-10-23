// Single source of truth for business facts. Header, footer, page copy and
// schema.org JSON-LD all read from here, so a change made once stays consistent
// everywhere (important for Google Business Profile / NAP consistency).

export const site = {
  name: 'Mel-Co-Ed, Inc.',
  shortName: 'Mel-Co-Ed',
  abbreviation: 'MCE',
  url: 'https://melcoed.com', // keep in sync with `site` in astro.config.mjs
  tagline: 'Precision Metal Stamping Since 1948',
  description:
    'Mel-Co-Ed, Inc. is a third-generation, family-owned precision metal stamping company in Pawtucket, Rhode Island. Since 1948 we have produced die-struck badges, medallions, awards, fraternal emblems, jewelry findings and industrial components, with in-house tooling and precision milling.',
  foundingYear: 1948,
  generation: 'third-generation',
  phone: {
    display: '(401) 724-2160',
    e164: '+14017242160',
  },
  // TODO: supply the public sales/quote inbox (e.g. sales@melcoed.com). Leave null until confirmed.
  email: null as string | null,
  address: {
    street: '381 Roosevelt Ave',
    city: 'Pawtucket',
    region: 'RI',
    regionName: 'Rhode Island',
    postalCode: '02860', // TODO: confirm ZIP for 381 Roosevelt Ave (02860 assumed).
    country: 'US',
  },
  // TODO: supply exact lat/long (copy from Google Business Profile). Left null rather than guessed.
  geo: null as { lat: number; lng: number } | null,
  // TODO: confirm office/shipping hours. Format: schema.org openingHours, e.g. 'Mo-Fr 07:00-15:30'.
  openingHours: null as string | null,
  // TODO: add Google Business Profile, LinkedIn, Facebook, etc. Used for schema.org `sameAs`.
  sameAs: [] as string[],
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name} ${fullAddress}`)}`;

export type Division = {
  slug: string;
  name: string;
  summary: string;
  links: { label: string; href: string }[];
};

export const divisions: Division[] = [
  {
    slug: 'raw-stampings-findings',
    name: 'Raw Stampings & Findings',
    summary:
      'Unfinished die-struck blanks, jewelry findings and stamped components supplied to jewelers, craft brands and finishers.',
    links: [{ label: 'Findings', href: '/findings/' }],
  },
  {
    slug: 'industrial-components',
    name: 'Industrial Components',
    summary:
      'Short- and long-run stamped metal parts built to print: brackets, clips, contacts, washers, shims and custom flat parts.',
    links: [{ label: 'Industrial Components', href: '/industrial-components/' }],
  },
  {
    slug: 'finished-goods',
    name: 'Finished Goods',
    summary:
      'Die-struck badges, medallions, awards and fraternal emblems, struck in Pawtucket and finished to your spec.',
    links: [
      { label: 'Badges', href: '/badges/' },
      { label: 'Medallions', href: '/medallions/' },
      { label: 'Awards', href: '/awards/' },
      { label: 'Fraternal & Lodge', href: '/fraternal-emblems/' },
    ],
  },
  {
    slug: 'precision-milling',
    name: 'Precision Milling',
    summary:
      'In-house CNC milling for die and tool making, plus machined parts and secondary operations on stamped work.',
    links: [{ label: 'Capabilities', href: '/capabilities/' }],
  },
];

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const productLinks = [
  { label: 'Findings', href: '/findings/' },
  { label: 'Badges', href: '/badges/' },
  { label: 'Medallions', href: '/medallions/' },
  { label: 'Awards', href: '/awards/' },
  { label: 'Fraternal & Lodge Emblems', href: '/fraternal-emblems/' },
  { label: 'Industrial Components', href: '/industrial-components/' },
];

export const nav: NavItem[] = [
  { label: 'Products', href: '/#products', children: productLinks },
  { label: 'Capabilities', href: '/capabilities/' },
  { label: 'About', href: '/about/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Contact', href: '/contact/' },
];

export const quoteHref = '/request-a-quote/';

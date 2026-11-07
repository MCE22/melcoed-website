// Single source of truth for business facts. Header, footer, page copy and
// schema.org JSON-LD all read from here, so a change made once stays consistent
// everywhere (important for Google Business Profile / NAP consistency).

import { services } from './services';

export const site = {
  name: 'Mel-Co-Ed, Inc.',
  shortName: 'Mel-Co-Ed',
  abbreviation: 'MCE',
  url: 'https://www.melcoed.com', // canonical host; keep in sync with `site` in astro.config.mjs
  tagline: 'Coined. Die struck. Stamped. Since 1948.',
  description:
    'Mel-Co-Ed, Inc. is a third-generation metal stamping manufacturer in Pawtucket, Rhode Island. Founded in 1948, the company specializes in ornamental stamping and die striking for badges, emblems, medallions, awards and jewelry findings, with in-house tooling and industrial stamping to print.',
  foundingYear: 1948,
  generation: 'third-generation',
  phone: {
    display: '(401) 724-2160',
    e164: '+14017242160',
  },
  // Quote/sales inbox. Web3Forms delivers form submissions to the address the access key was created with,
  // so that key must be registered to this address.
  email: 'sales@melcoed.com' as string | null,
  address: {
    street: '381 Roosevelt Ave',
    city: 'Pawtucket',
    region: 'RI',
    regionName: 'Rhode Island',
    postalCode: '02860',
    country: 'US',
  },
  // TODO: supply exact lat/long (copy from Google Business Profile). Left null rather than guessed.
  geo: null as { lat: number; lng: number } | null,
  // schema.org openingHours (Eastern Time) and the same hours for people.
  openingHours: ['Mo-Th 07:30-16:30', 'Fr 07:30-15:30'] as string[] | null,
  hoursText: ['Mon–Thu 7:30am–4:30pm ET', 'Fri 7:30am–3:30pm ET'],
  // TODO: Google review link (Google Business Profile > Ask for reviews > copy link). The footer's "Leave us a Google review" link appears once this is set.
  googleReviewUrl: null as string | null,
  // Used for schema.org `sameAs`. Add the Google Business Profile link when it exists.
  sameAs: ['https://www.linkedin.com/company/mel-co-ed-inc/', 'https://www.facebook.com/melcoed'] as string[],
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
    links: [
      { label: 'Findings', href: '/findings/' },
      { label: 'Pattern Stock & Banding', href: '/pattern-stock/' },
    ],
  },
  {
    slug: 'finished-goods',
    name: 'Finished Goods',
    summary:
      'Die-struck badges, medallions, awards and fraternal emblems, struck in Pawtucket and finished to your spec.',
    links: [
      { label: 'Badges', href: '/badges/' },
      { label: 'Medals & Medallions', href: '/medallions/' },
      { label: 'Awards', href: '/awards/' },
      { label: 'Fraternal & Lodge', href: '/industries/fraternal-lodge/' },
    ],
  },
  {
    slug: 'precision-milling',
    name: 'Precision Milling',
    summary:
      'Precision milling for dies, tooling and parts, managed through our shop so you deal with one supplier.',
    links: [{ label: 'Capabilities', href: '/capabilities/' }],
  },
];

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const productLinks = [
  { label: 'Findings', href: '/findings/' },
  { label: 'Pattern Stock & Banding', href: '/pattern-stock/' },
  { label: 'Badges', href: '/badges/' },
  { label: 'Medals & Medallions', href: '/medallions/' },
  { label: 'Awards', href: '/awards/' },
  { label: 'Fraternal & Lodge Emblems', href: '/industries/fraternal-lodge/' },
];

export const industryLinks = [
  { label: 'Fraternal & Lodge', href: '/industries/fraternal-lodge/' },
];

// Links to pages that don't exist yet are filtered out at build time (see src/lib/routes.ts),
// so this list can describe the full site while pages are still being built.
export const serviceLinks = services.map((s) => ({ label: s.label, href: s.href }));

export const nav: NavItem[] = [
  { label: 'Products', href: '/products/' },
  { label: 'Capabilities', href: '/capabilities/' },
  { label: 'Industries', href: '/industries/' },
  { label: 'Buyer guides', href: '/resources/' },
  { label: 'Company', href: '/about/' },
];

export const quoteHref = '/request-a-quote/';

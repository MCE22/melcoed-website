// schema.org JSON-LD builders. Every page emits one @graph containing the
// shared Organization/LocalBusiness + WebSite nodes plus page-specific nodes
// (WebPage, BreadcrumbList, FAQPage, Product). Nodes cross-reference by @id so
// search engines and AI crawlers resolve them to a single business entity.

import { site } from '../data/site';
import { madeIn } from '../data/brand';

const abs = (path: string) => new URL(path, site.url).toString();

export const ids = {
  organization: abs('/#organization'),
  website: abs('/#website'),
  logo: abs('/#logo'),
};

type Node = Record<string, unknown>;

export function organizationNode(): Node {
  const node: Node = {
    // Multi-typed: one entity that is both the company and its physical shop.
    '@type': ['Organization', 'LocalBusiness'],
    '@id': ids.organization,
    name: site.name,
    alternateName: [site.shortName, site.abbreviation, 'Mel Co Ed', 'Melcoed'],
    url: abs('/'),
    description: site.description,
    slogan: `${madeIn.primary}. ${madeIn.secondary}.`,
    foundingDate: String(site.foundingYear),
    foundingLocation: { '@type': 'Place', name: 'Pawtucket, Rhode Island' },
    telephone: site.phone.e164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: { '@type': 'Country', name: 'United States' },
    // Official plate logo (public copy of src/assets/brand/mce-plate.png for a stable URL)
    logo: { '@type': 'ImageObject', '@id': ids.logo, url: abs('/brand/mce-plate.png'), width: 794, height: 316 },
    image: abs('/og-default.png'),
    knowsAbout: [
      'Precision metal stamping',
      'Die striking',
      'Tool and die making',
      'CNC milling',
      'Jewelry findings',
      'Police badges',
      'Medallions',
      'Fraternal and Masonic emblems',
      'Industrial stamped components',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.phone.e164,
      contactType: 'sales',
      areaServed: 'US',
      availableLanguage: 'English',
      ...(site.email ? { email: site.email } : {}),
    },
  };
  if (site.email) node.email = site.email;
  if (site.geo) node.geo = { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng };
  if (site.openingHours) node.openingHours = site.openingHours;
  if (site.sameAs.length) node.sameAs = site.sameAs;
  return node;
}

export function websiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: abs('/'),
    name: site.name,
    publisher: { '@id': ids.organization },
    inLanguage: 'en-US',
  };
}

export function webPageNode(opts: { path: string; title: string; description: string; type?: string }): Node {
  return {
    '@type': opts.type ?? 'WebPage',
    '@id': abs(opts.path) + '#webpage',
    url: abs(opts.path),
    name: opts.title,
    description: opts.description,
    isPartOf: { '@id': ids.website },
    about: { '@id': ids.organization },
    inLanguage: 'en-US',
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbNode(crumbs: Crumb[]): Node {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

// `todo: true` marks an answer awaiting owner confirmation: it renders on the
// page with a TODO flag but is kept out of structured data until confirmed.
export type Faq = { q: string; a: string; todo?: boolean };

export function faqPageNode(path: string, faqs: Faq[]): Node {
  return {
    '@type': 'FAQPage',
    '@id': abs(path) + '#faq',
    mainEntity: faqs.filter((f) => !f.todo).map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

// Custom manufactured goods: no price/offers (quoted per job). Still useful for
// entity understanding by Google and AI search even without rich-result eligibility.
export function productNode(opts: {
  path: string;
  name: string;
  description: string;
  category: string;
  material?: string[];
  image?: string;
}): Node {
  return {
    '@type': 'Product',
    '@id': abs(opts.path) + '#product',
    name: opts.name,
    description: opts.description,
    category: opts.category,
    url: abs(opts.path),
    brand: { '@id': ids.organization },
    manufacturer: { '@id': ids.organization },
    countryOfOrigin: 'US',
    ...(opts.material?.length ? { material: opts.material.join(', ') } : {}),
    ...(opts.image ? { image: abs(opts.image) } : {}),
  };
}

export function graph(nodes: Node[]): string {
  // Escape `<` so no string value can close the surrounding <script> tag.
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c');
}

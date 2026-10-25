// /llms.txt: a plain-text summary of the business for AI assistants and LLM crawlers
// (https://llmstxt.org). Generated from the same data as the site, so it can't drift.
import type { APIRoute } from 'astro';
import { site, fullAddress, productLinks } from '../data/site';
import { services } from '../data/services';
import { industries } from '../data/industries';
import { madeIn } from '../data/brand';
import { isLive } from '../lib/routes';

export const GET: APIRoute = () => {
  const abs = (p: string) => new URL(p, site.url).toString();
  const links = (items: { label: string; href: string }[]) =>
    items.filter((l) => isLive(l.href)).map((l) => `- [${l.label}](${abs(l.href)})`).join('\n');

  const body = `# ${site.name}

> ${site.description}

- Founded: ${site.foundingYear}, ${site.address.city}, ${site.address.regionName}; ${site.generation}, family-owned
- Origin: ${madeIn.primary} (${madeIn.secondary})
- Address: ${fullAddress}
- Phone: ${site.phone.display}${site.email ? `\n- Email: ${site.email}` : ''}
- Quotes: ${abs('/request-a-quote/')}

## Services

${services.filter((x) => isLive(x.href)).map((x) => `- [${x.label}](${abs(x.href)}): ${x.summary}`).join('\n')}

## Products

${links(productLinks)}

## Industries

Metal stamping for every industry: ${industries.map((i) => i.name).join(', ')}.

${links([{ label: 'All industries', href: '/industries/' }, { label: 'Fraternal & Lodge', href: '/industries/fraternal-lodge/' }, { label: 'Commemorative & 250th', href: '/industries/commemorative/' }])}

## Company

${links([
  { label: 'Capabilities (processes, materials, gauges, tolerances)', href: '/capabilities/' },
  { label: 'Custom product development (sketch, drawing or sample to production, on an exclusive die)', href: '/capabilities/product-development/' },
  { label: 'About', href: '/about/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Contact', href: '/contact/' },
])}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

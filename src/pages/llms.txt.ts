// /llms.txt: a plain-text summary of the business for AI assistants and LLM crawlers
// (https://llmstxt.org). Generated from the same data as the site, so it can't drift.
import type { APIRoute } from 'astro';
import { site, fullAddress, divisions, productLinks, industryLinks } from '../data/site';
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

## Divisions

${divisions.map((d) => `- ${d.name}: ${d.summary}`).join('\n')}

## Products

${links(productLinks)}

## Industries

${links([{ label: 'All industries', href: '/industries/' }, ...industryLinks])}

## Company

${links([
  { label: 'Capabilities (processes, materials, gauges, tolerances)', href: '/capabilities/' },
  { label: 'About', href: '/about/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Contact', href: '/contact/' },
])}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

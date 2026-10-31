// Sitewide general FAQs. Structured data (FAQPage) for these is emitted only on
// /faq/ — Google asks that a given FAQ be marked up in one place. The Home page
// shows a subset as plain content. Product, industry and quote-page FAQs live
// with their pages and are marked up there.

import { site, fullAddress } from './site';
import type { Faq } from '../lib/schema';
import { ordering, materials, materialsNote, waysToBuy, tooling, whoWeSellTo } from './facts';
import { confidentialFaq } from './confidential';

export const generalFaqs: Faq[] = [
  {
    q: 'What does Mel-Co-Ed, Inc. make?',
    a: 'Mel-Co-Ed (MCE) is a precision metal stamping company with four divisions: Raw Stampings & Findings, Industrial Components, Finished Goods (die-struck badges, medallions, awards and fraternal emblems) and Precision Milling.',
  },
  {
    q: 'Where is Mel-Co-Ed located?',
    a: `Our shop is at ${fullAddress}. We have operated in Pawtucket, Rhode Island, since ${site.foundingYear}.`,
  },
  {
    q: 'Is Mel-Co-Ed a family-owned company?',
    a: `Yes. Mel-Co-Ed was founded in ${site.foundingYear} and is a third-generation, family-owned business.`,
  },
  {
    q: 'How do I request a quote for custom metal stamping?',
    a: `Use the Request a Quote form or call ${site.phone.display}. Include a drawing or sample, the material, finish, quantity and the date you need parts. Prints, CAD files and photos all help.`,
  },
  {
    q: 'Can you make die-struck police and government badges?',
    a: 'Yes. Die-struck police, fire, military and government badges are part of our Finished Goods division. Badges are struck from steel dies for sharp, deep detail.',
  },
  {
    q: 'What is your minimum order quantity and typical lead time?',
    a: `Our minimum is ${ordering.minimum}; smaller runs are available at a higher price. ${ordering.noMinimum} Lead time is typically ${ordering.leadTime}.`,
  },
  {
    q: 'How is pricing set?',
    a: `${ordering.pricing} ${ordering.custom}`,
  },
  {
    q: 'What are the two ways to buy from Mel-Co-Ed?',
    a: waysToBuy.map((w) => `${w.name}: ${w.summary}`).join(' '),
  },
  confidentialFaq,
  {
    q: 'What metals do you work with?',
    a: `${materials.join(', ')}. ${materialsNote}`,
  },
];

export const orderingFaqs: Faq[] = [
  {
    q: 'Do you build the tooling for my parts?',
    a: 'Yes. Dies are designed and built in-house, supported by our Precision Milling division, so tooling, changes and repairs stay on our schedule.',
  },
  {
    q: 'Who owns the tooling I pay for?',
    a: `${tooling.ownership} ${tooling.storage} ${tooling.billing}`,
  },
  {
    q: 'Do you work with distributors and resellers?',
    a: 'Yes. We make parts and finished pieces for regalia suppliers, uniform and equipment suppliers, award companies and other distributors, to their designs.',
  },
  {
    q: 'Do you sell to individuals?',
    a: whoWeSellTo,
  },
  {
    q: 'What are your payment terms?',
    a: 'Payment terms are confirmed on your quote.',
    todo: true,
  },
  {
    q: 'How do you ship orders?',
    a: 'Orders ship from Pawtucket, Rhode Island. Tell us your delivery requirements and we will confirm the shipping method in your quote.',
    todo: true,
  },
];

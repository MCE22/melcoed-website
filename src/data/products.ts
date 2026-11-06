// Product page content. Each entry renders through src/components/ProductPage.astro
// from a one-line page file in src/pages/ (e.g. src/pages/badges.astro).
//
// Specs: give `value` once confirmed; until then `todo` renders a visible TODO box.
// FAQs: `todo: true` keeps an unconfirmed answer out of FAQ schema (see src/lib/schema.ts).

import type { Faq } from '../lib/schema';
import type { PhotoSlotName } from './photos';
import { materialsLine, finishesLine, minimumLine, leadTimeLine, dieStrikingLine, ordering, processesLine, outsourcedLine, pressesLine, stampingThicknessLine, toleranceLine, tooling, edgeFinishes, bandingWidths, badgeAuthorization, enamel, whoWeSellTo, reproductions, attachments, coinPackaging } from './facts';

export type Spec = { label: string; value?: string; todo?: string };
export type ProductType = { title: string; body: string; href?: string };

export type Product = {
  slug: string;
  name: string; // nav / card name
  division: string;
  quoteType: string; // preselects the quote form: /request-a-quote/?type=<quoteType>
  metaTitle: string;
  metaDescription: string;
  h1: string;
  accent: string;
  lead: string;
  intro: string[];
  typesHeading: string;
  types: ProductType[];
  /** TODO note shown above the types grid until the list is confirmed. */
  typesTodo?: string;
  audienceHeading: string;
  audience: string[];
  /** Short paragraph under the audience list (policies, notes). */
  audienceNote?: string;
  audienceNoteTodo?: string;
  specs: Spec[];
  photoTodo: string;
  faqs: Faq[];
  related: string[]; // hrefs; only rendered if the page exists
  /** Show catalog download(s) whose title contains this text. */
  catalog?: string;
  /** Show the "Your die. Your design." confidentiality section. */
  confidential?: boolean;
  /** Show the "Government buyers" block (NAICS, CAGE, UEI, SAM.gov). */
  government?: boolean;
  schemaCategory: string;
};

const moqFaq = (thing: string): Faq => ({
  q: `What is the minimum order for ${thing}?`,
  a: `Our minimum is ${ordering.minimum}; smaller runs are available at a higher price. ${ordering.noMinimum} Lead time is typically ${ordering.leadTime}, and pricing is quoted at the time of order based on current metal prices.`,
});

export const products: Record<string, Product> = {
  findings: {
    slug: 'findings',
    name: 'Findings',
    division: 'Raw Stampings & Findings',
    quoteType: 'findings',
    metaTitle: 'Jewelry Findings & Raw Die-Struck Stampings',
    metaDescription:
      'Jewelry findings and stampings from Mel-Co-Ed in Pawtucket, RI: 30,000+ stock findings with no tooling cost, or custom on your own die. Supplied raw or finished.',
    h1: 'Jewelry Findings & Raw Stampings',
    accent: 'stamped in Pawtucket',
    lead: 'Jewelry findings and raw stampings for brands, designers and finishers: 30,000+ stock findings on our Open Line, or your design on your own exclusive die.',
    intro: [
      "Rhode Island built America's jewelry industry, and we've stamped findings here since 1948.",
      'Every finding is struck from steel dies we build in-house, so parts match run after run and tooling stays ready for reorders. Supplied raw or finished.',
    ],
    typesHeading: 'Findings & stampings we make',
    types: [
      {
        title: 'Novelty & charms',
        body: 'More than 30,000 ornamental findings on our Open Line, from heart charms and animal pendants to planes and automobiles.',
      },
      {
        title: 'Men’s jewelry & accessories',
        body: 'Tie bars, tie tacks, cufflinks, collar clips, money clips, bracelets and necklaces.',
      },
      {
        title: 'Women’s jewelry & accessories',
        body: 'Cuff bracelets, earrings, necklaces and pendants, from the Open Line or made to your design.',
      },
      {
        title: 'Ad specialty',
        body: 'Custom and imprinted pieces, including items that can be screen or pad printed: divot tools, key tags, money clips.',
      },
      {
        title: 'Functional stampings',
        body: 'Shoe horns, letter openers, butter spreaders, bookmarks, card cases, bottle openers and more.',
      },
      {
        title: 'Pattern stock',
        body: 'Several hundred embossed patterns for texturing findings, from floral and hammered to stone.',
        href: '/pattern-stock/',
      },
    ],
    audienceHeading: 'Who buys our findings',
    audience: [
      'Jewelry and accessory brands',
      'Independent designers',
      'Platers, finishers and assemblers',
      'Craft and supply distributors',
    ],
    specs: [
      { label: 'Process', value: 'Die striking, blanking and forming from in-house tooling' },
      { label: 'Ways to buy', value: 'Open Line: 30,000+ stock findings, no tooling cost. Confined & Custom: your design on your own exclusive die.' },
      { label: 'Metals', value: materialsLine },
      { label: 'Thickness', value: stampingThicknessLine },
      { label: 'Finishes', value: `Supplied raw or finished. ${finishesLine} ${outsourcedLine}` },
      { label: 'Minimum order', value: minimumLine },
      { label: 'Lead time', value: leadTimeLine },
    ],
    photoTodo: 'Photos: 3–6 findings shots (raw and finished side by side works well). Min. 1200px wide.',
    faqs: [
      {
        q: 'What are jewelry findings?',
        a: 'Findings are the metal components used to make and assemble jewelry: charms, connectors, links, bails, caps, blanks and similar parts. Stamped findings are cut and formed from sheet metal with dies, which gives consistent, repeatable parts.',
      },
      {
        q: 'Can you supply raw, unfinished stampings for my own plater?',
        a: 'Yes. Our Raw Stampings & Findings division supplies unfinished die-struck parts to brands and finishers who plate, polish or assemble them elsewhere.',
      },
      {
        q: 'Can you match an existing finding from a sample?',
        a: `Yes. ${reproductions} Send us the sample and we will tell you what new tooling would take.`,
      },
      {
        q: 'Do you sell stock findings, or only custom work?',
        a: 'Both. Our Open Line has more than 30,000 stock findings, stampings and pattern stock with no tooling cost. Confined & Custom work puts your design on your own exclusive die, run only for you.',
      },
      moqFaq('custom findings'),
    ],
    related: ['/pattern-stock/', '/metal-stamping/', '/medallions/', '/capabilities/'],
    catalog: 'Findings',
    schemaCategory: 'Jewelry findings',
  },

  badges: {
    slug: 'badges',
    name: 'Badges',
    confidential: true,
    government: true,
    division: 'Finished Goods',
    quoteType: 'badges',
    metaTitle: 'Die-Struck Police, Fire, Military & Government Badges',
    metaDescription:
      'Die-struck police, sheriff, fire, EMS, military and government badges made by Mel-Co-Ed in Pawtucket, RI since 1948. Custom designs, reproductions and retirement badges.',
    h1: 'Die-Struck Badges',
    accent: 'police, fire, government',
    lead: 'Die-struck badges for police, fire, EMS, government and security, and secondary badge work for the companies that make them.',
    intro: [
      'We handle secondary badge work today, and our presses, tool room and die striking can take on full badge production.',
      'Die striking presses the design into solid metal under heavy pressure: crisp lettering and deep relief that hold up to years of daily wear.',
    ],
    typesHeading: 'Badges we strike',
    typesTodo: 'Confirm the badge types listed and whether you add hallmarks (hard and soft enamel and numbering are confirmed).',
    types: [
      { title: 'Police & sheriff', body: 'Shields, stars and ovals for municipal, county and state agencies.' },
      { title: 'Fire & EMS', body: 'Maltese cross and custom fire and EMS badges for departments and districts.' },
      { title: 'Military & government', body: 'Badges and insignia for federal, state and municipal agencies and units.' },
      { title: 'Corporate & security', body: 'Badges for private security, corporate programs and identification.' },
      { title: 'Retirement & reproductions', body: 'Retirement badges, and reproductions of retired designs.' },
    ],
    audienceHeading: 'Who orders badges',
    audience: [
      'Police and sheriff departments',
      'Fire departments and EMS agencies',
      'Federal, state and municipal agencies',
      'Uniform and equipment suppliers',
      'Private security companies',
    ],
    audienceNote: badgeAuthorization,
    specs: [
      { label: 'Process', value: 'Die-struck from steel tooling' },
      { label: 'Metals', value: materialsLine },
      { label: 'Finishes', value: `${finishesLine} ${enamel}.` },
      { label: 'Attachments', value: attachments },
      { label: 'Size', value: dieStrikingLine },
      { label: 'Minimum order', value: minimumLine },
      { label: 'Lead time', value: leadTimeLine },
    ],
    photoTodo: 'Photos: 4–6 badge shots (front and back). Get each agency’s permission before showing its badge.',
    faqs: [
      {
        q: 'What is a die-struck badge?',
        a: 'A die-struck badge is made by stamping a blank of solid metal between hardened steel dies under heavy pressure. The process produces deep relief and sharp lettering, and a badge that is dense and durable enough for daily duty wear.',
      },
      {
        q: 'Do you need authorization to make police or government badges?',
        a: `Yes. ${badgeAuthorization}`,
      },
      {
        q: 'Can you reproduce a retired badge design?',
        a: `Yes. ${reproductions} ${badgeAuthorization}`,
      },
      {
        q: 'Do you make retirement badges?',
        a: 'Yes. Retirement badges can be struck to match a department’s duty badge with the added retirement wording.',
        todo: true,
      },
      moqFaq('custom badges'),
    ],
    related: ['/medallions/', '/awards/', '/industries/'],
    schemaCategory: 'Badges',
  },

  medallions: {
    slug: 'medallions',
    name: 'Medals & Medallions',
    division: 'Finished Goods',
    quoteType: 'medallions',
    metaTitle: 'Custom Struck Medals, Medallions & Challenge Coins',
    metaDescription:
      'Custom die-struck medals, medallions and challenge coins from Mel-Co-Ed in Pawtucket, RI. Any type of medal, struck from your design with relief on both sides.',
    h1: 'Custom Medals & Medallions',
    accent: 'any type of medal',
    lead: 'Die-struck medals, medallions and challenge coins of any type, struck on both sides from your design, for organizations, units and award programs.',
    intro: [
      'Struck between two steel dies, a medallion gets sharp relief on both faces and a solid, heavy feel that cast or printed pieces can’t match.',
      'We cut the dies and strike every piece in Pawtucket.',
    ],
    typesHeading: 'Medallions we strike',
    typesTodo: 'Confirm the medallion types listed (coins and challenge coins are confirmed, struck up to 3.5″).',
    types: [
      { title: 'Any type of medal', body: 'Tell us what it’s for. If it can be struck in metal, we’ll make it.' },
      { title: 'Challenge coins', body: 'Coin-sized pieces for units, departments, organizations and teams.' },
      { title: 'Presentation & award', body: 'Medallions presented to honorees, retirees, donors and graduates.' },
      { title: 'Organizational', body: 'Medallions for lodges, societies, schools and associations.' },
    ],
    audienceHeading: 'Who orders medallions',
    audience: [
      'Police, fire and military units',
      'Schools, colleges and alumni groups',
      'Lodges and fraternal organizations',
      'Companies and award programs',
    ],
    specs: [
      { label: 'Process', value: 'Die-struck from steel tooling, two-sided relief' },
      { label: 'Size', value: dieStrikingLine },
      { label: 'Metals', value: materialsLine },
      { label: 'Finishes', value: finishesLine },
      { label: 'Edge options', value: edgeFinishes },
      { label: 'Packaging', value: coinPackaging },
      { label: 'Minimum order', value: minimumLine },
      { label: 'Lead time', value: leadTimeLine },
    ],
    photoTodo: 'Photos: 4–6 medallion shots, obverse and reverse, ideally with a coin or ruler for scale.',
    faqs: [
      {
        q: 'What is the difference between a struck and a cast medallion?',
        a: 'A struck medallion is stamped from a solid metal blank between steel dies, giving sharp detail and a dense, heavy piece. A cast medallion is poured into a mold, which suits very deep or undercut designs but typically shows softer detail.',
      },
      {
        q: 'What is the difference between a medallion and a challenge coin?',
        a: 'Both are struck metal pieces with relief on both sides. Medallions are usually larger presentation or keepsake pieces. Challenge coins are typically coin-sized, carried by members, and given to mark service or membership.',
      },
      {
        q: 'Can you add edge lettering or serial numbers?',
        a: `Engraving and numbering are done in-house. ${edgeFinishes}`,
      },
      {
        q: 'Can you reproduce an old medallion from a sample?',
        a: `Yes. ${reproductions} Send us the sample and we will tell you what new tooling would take.`,
      },
      moqFaq('custom medallions'),
    ],
    related: ['/awards/', '/badges/', '/industries/fraternal-lodge/'],
    schemaCategory: 'Medallions',
  },

  awards: {
    slug: 'awards',
    name: 'Awards',
    division: 'Finished Goods',
    quoteType: 'awards',
    metaTitle: 'Custom Service Award Pins, Recognition Medals & Award Components',
    metaDescription:
      'Die-struck service award pins, recognition medals and plaque and trophy components from Mel-Co-Ed in Pawtucket, RI. Matched sets for long-running award programs.',
    h1: 'Awards & Recognition',
    accent: 'made to be kept',
    lead: 'Years-of-service pins, recognition medals and struck plaque and trophy components for companies, agencies, associations and award suppliers.',
    intro: [
      'Award programs run for decades, and every pin has to match the last. We keep your tooling in our own tool room, so this year’s 5-year pin matches the one before.',
    ],
    typesHeading: 'Award pieces we make',
    typesTodo: 'Confirm the award products you make.',
    types: [
      { title: 'Service & years pins', body: 'Years-of-service pins in matched sets, with year or gem variations.' },
      { title: 'Recognition medals', body: 'Struck medals for achievement, valor, safety and milestone awards.' },
      { title: 'Plaque & trophy components', body: 'Struck emblems and inserts for plaques, trophies and donor walls.' },
      { title: 'Organization awards', body: 'Award pieces for lodges, associations, schools and clubs.' },
    ],
    audienceHeading: 'Who orders awards',
    audience: [
      'HR and employee recognition programs',
      'Police, fire and public safety agencies',
      'Associations and fraternal organizations',
      'Award and trophy suppliers',
    ],
    specs: [
      { label: 'Process', value: 'Die-struck from steel tooling' },
      { label: 'Metals', value: materialsLine },
      { label: 'Finishes', value: finishesLine },
      { label: 'Attachments', value: attachments },
      { label: 'Minimum order', value: minimumLine },
      { label: 'Lead time', value: leadTimeLine },
    ],
    photoTodo: 'Photos: 3–6 award pieces; a full years-of-service set makes a strong image.',
    faqs: [
      {
        q: 'Can you match pins we have ordered in previous years?',
        a: `If we made the original die, we still have it: ${tooling.storage.toLowerCase()} If another supplier made them, send a sample and we will tell you what matching it involves.`,
      },
      {
        q: 'Do you work with award and trophy companies?',
        a: 'Yes. We supply struck emblems, pins and components to award suppliers, made to their designs.',
      },
      moqFaq('award pins'),
    ],
    related: ['/medallions/', '/badges/', '/industries/fraternal-lodge/'],
    schemaCategory: 'Awards',
  },

  'pattern-stock': {
    slug: 'pattern-stock',
    name: 'Pattern Stock & Banding',
    division: 'Raw Stampings & Findings',
    quoteType: 'pattern',
    metaTitle: 'Embossed Pattern Stock & Banding for Jewelry and Accessories',
    metaDescription:
      'Embossed metal pattern stock and banding from Mel-Co-Ed in Pawtucket, RI: several hundred patterns, from floral and hammered to stone, on the Open Line with no tooling cost.',
    h1: 'Pattern Stock & Banding',
    accent: 'texture by the strip',
    lead: 'Embossed pattern stock and banding for jewelry, recognition, gift and lighting makers: several hundred patterns, from floral and hammered to stone.',
    intro: [
      'Pattern stock textures findings, cuffs, tie bars and recognition pieces without engraving each part. Or bring your own flat stock and we’ll emboss it.',
      'Stock patterns are on our Open Line, with no tooling cost. Want one no one else has? We cut it on your own exclusive die.',
    ],
    typesHeading: 'Made from pattern stock',
    types: [
      { title: 'Jewelry & accessories', body: 'Cuff bracelets, bracelets, tie bars, lapel pins and collar stays.' },
      { title: 'Recognition', body: 'Recognition pins and items, nameplates and badges, and ball markers.' },
      { title: 'Gifts & keepsakes', body: 'Bookmarks, ornaments, money clips, card cases, letter openers and paper weights.' },
      { title: 'Architectural & lighting', body: 'Embossed metal for architectural applications and the lighting industry.' },
      {
        title: 'Any shape',
        body: 'Every pattern can be made into pendants, bracelets, earrings or any other shape: rounds in any size, with or without a hole, tags, bars or your own design.',
      },
    ],
    audienceHeading: 'Who uses pattern stock',
    audience: ['Jewelry and accessory brands', 'Recognition and awards suppliers', 'Gift and ad specialty companies', 'Architectural and lighting manufacturers'],
    specs: [
      { label: 'Patterns', value: 'Several hundred, including floral, hammered and stone' },
      { label: 'Metals', value: materialsLine },
      { label: 'Banding widths', value: bandingWidths },
      { label: 'Thickness', todo: 'stamping gauge range' },
      { label: 'Finishes', value: finishesLine },
      { label: 'Minimum order', value: minimumLine },
      { label: 'Lead time', value: leadTimeLine },
    ],
    photoTodo: 'Photos: close-ups of 4–6 embossed patterns and banding, plus a finished piece made from each.',
    faqs: [
      {
        q: 'What is embossed pattern stock?',
        a: 'Flat metal strip or sheet with a decorative pattern pressed into its surface. It is blanked, formed and finished into jewelry, accessories and recognition pieces, giving every part the same texture without engraving.',
      },
      {
        q: 'Can you emboss my own flat stock?',
        a: 'Yes. Bring your flat stock and we will emboss it with one of our patterns. Have dies or metal already? We’ll run yours.',
      },
      {
        q: 'How do I order a pattern or banding?',
        a: 'Call or email with the part number from our Pattern & Banding catalog, the metal and the quantity.',
      },
      {
        q: 'Do I pay for tooling to use a stock pattern?',
        a: 'No. Stock patterns are part of our Open Line, with no tooling cost. A custom pattern is cut on your own exclusive die and quoted per job.',
      },
      moqFaq('pattern stock'),
    ],
    related: ['/findings/', '/products/', '/capabilities/'],
    catalog: 'Pattern',
    schemaCategory: 'Embossed metal pattern stock',
  },

};

// Cards for the /products/ index (fraternal emblems live on their industry page).
export const productIndex: { title: string; href: string; slot: PhotoSlotName; body: string }[] = [
  {
    title: 'Findings',
    slot: 'findings',
    href: '/findings/',
    body: '30,000+ stock findings for jewelry brands and designers, or your design on your own die.',
  },
  {
    title: 'Pattern Stock & Banding',
    slot: 'pattern-stock',
    href: '/pattern-stock/',
    body: 'Several hundred embossed patterns on flat stock and banding. Open Line, no tooling cost.',
  },
  {
    title: 'Badges',
    slot: 'badges',
    href: '/badges/',
    body: 'Die-struck badges for police, fire, EMS, military, government, corporate and security.',
  },
  {
    title: 'Medals & Medallions',
    slot: 'medallions',
    href: '/medallions/',
    body: 'Any type of medal, medallion or challenge coin, struck on both sides.',
  },
  {
    title: 'Awards',
    slot: 'awards',
    href: '/awards/',
    body: 'Service pins, recognition medals and plaque and trophy components for award programs.',
  },
  {
    title: 'Fraternal & Lodge Emblems',
    slot: 'industries-fraternal',
    href: '/industries/fraternal-lodge/',
    body: 'Masonic and fraternal emblems, lapel pins, jewels and insignia for lodges, Grand Lodges and regalia suppliers.',
  },
];

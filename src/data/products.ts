// Product page content. Each entry renders through src/components/ProductPage.astro
// from a one-line page file in src/pages/ (e.g. src/pages/badges.astro).
//
// Specs: give `value` once confirmed; until then `todo` renders a visible TODO box.
// FAQs: `todo: true` keeps an unconfirmed answer out of FAQ schema (see src/lib/schema.ts).

import type { Faq } from '../lib/schema';
import type { PhotoSlotName } from './photos';
import { materialsLine, finishesLine, minimumLine, leadTimeLine, dieStrikingLine, ordering, processesLine } from './facts';

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
      'Jewelry findings and stampings from Mel-Co-Ed in Pawtucket, RI: 30,000+ stock findings with no tooling cost, or custom on your own die. Supplied raw or finished in-house.',
    h1: 'Jewelry Findings & Raw Stampings',
    accent: 'stamped in Pawtucket',
    lead: 'More than 30,000 stock findings on our Open Line, from charms to men’s and women’s accessories, or struck to your design on your own exclusive die. Supplied raw or finished in-house.',
    intro: [
      "Rhode Island built America's jewelry industry, and Mel-Co-Ed has been part of it since 1948. Our Raw Stampings & Findings division supplies the stamped metal components that jewelry and accessory brands build on.",
      'We strike findings from steel dies we build in-house, so you get consistent parts run after run, and tooling stays available for reorders.',
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
      { label: 'Thickness', todo: 'stamping gauge range' },
      { label: 'Finishes', value: `Supplied raw or finished in-house. ${finishesLine}` },
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
        a: 'Yes. Send the sample or clear photos with dimensions, and we will tell you what new tooling would take.',
        todo: true,
      },
      {
        q: 'Do you sell stock findings, or only custom work?',
        a: 'Both. Our Open Line has more than 30,000 stock findings, stampings and pattern stock with no tooling cost. Confined & Custom work puts your design on your own exclusive die, run only for you.',
      },
      moqFaq('custom findings'),
    ],
    related: ['/pattern-stock/', '/industrial-components/', '/medallions/', '/capabilities/'],
    catalog: 'Findings',
    schemaCategory: 'Jewelry findings',
  },

  badges: {
    slug: 'badges',
    name: 'Badges',
    division: 'Finished Goods',
    quoteType: 'badges',
    metaTitle: 'Die-Struck Police, Fire, Military & Government Badges',
    metaDescription:
      'Die-struck police, sheriff, fire, EMS, military and government badges made by Mel-Co-Ed in Pawtucket, RI since 1948. Custom designs, reproductions and retirement badges.',
    h1: 'Die-Struck Badges',
    accent: 'police, fire, government',
    lead: 'Police, sheriff, fire, EMS, military and government badges, struck from steel dies for deep, sharp detail that holds up to years of daily wear.',
    intro: [
      'A badge is worn every shift for years. Die-striking stamps the design into solid metal under heavy pressure, giving crisp lettering, deep relief and a piece that stands up to daily wear.',
      'We strike badges in Pawtucket from tooling built in-house, for agencies, departments and the uniform suppliers who serve them.',
    ],
    typesHeading: 'Badges we strike',
    typesTodo: 'Confirm the badge types you make and whether you offer hard or soft enamel, hallmarks or serial numbering (color fill is confirmed).',
    types: [
      { title: 'Police & sheriff', body: 'Shields, stars and ovals for municipal, county and state agencies.' },
      { title: 'Fire & EMS', body: 'Maltese cross and custom fire and EMS badges for departments and districts.' },
      { title: 'Military & government', body: 'Badges and insignia for federal, state and municipal agencies and units.' },
      { title: 'Corporate & security', body: 'Badges for private security, corporate programs and identification.' },
      { title: 'Retirement & reproductions', body: 'Retirement and commemorative badges, and reproductions of retired designs.' },
    ],
    audienceHeading: 'Who orders badges',
    audience: [
      'Police and sheriff departments',
      'Fire departments and EMS agencies',
      'Federal, state and municipal agencies',
      'Uniform and equipment suppliers',
      'Private security companies',
    ],
    audienceNote:
      'Law enforcement and government badges are issued items. We require authorization from the issuing agency before striking them.',
    audienceNoteTodo: 'confirm your authorization policy (e.g. order on agency letterhead or PO) before publishing this note',
    specs: [
      { label: 'Process', value: 'Die-struck from steel tooling' },
      { label: 'Metals', value: materialsLine },
      { label: 'Finishes', value: finishesLine },
      { label: 'Attachments', todo: 'e.g. pin & safety catch, clip, wallet mount' },
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
        a: 'Yes. Law enforcement and government badges are issued items, so we require authorization from the issuing agency before striking them.',
        todo: true,
      },
      {
        q: 'Can you reproduce a retired badge design?',
        a: 'Yes. Send photos of the front, back and edge with dimensions, plus the agency authorization, and we will tell you what new tooling involves.',
        todo: true,
      },
      {
        q: 'Do you make retirement badges?',
        a: 'Yes. Retirement and commemorative badges can be struck to match a department’s duty badge with the added retirement wording.',
        todo: true,
      },
      moqFaq('custom badges'),
    ],
    related: ['/medallions/', '/awards/', '/industries/'],
    schemaCategory: 'Badges',
  },

  medallions: {
    slug: 'medallions',
    name: 'Medallions',
    division: 'Finished Goods',
    quoteType: 'medallions',
    metaTitle: 'Custom Struck Medallions & Challenge Coins',
    metaDescription:
      'Custom die-struck medallions and challenge coins from Mel-Co-Ed in Pawtucket, RI: commemorative, presentation and award medallions with relief on both sides.',
    h1: 'Custom Medallions',
    accent: 'struck on both sides',
    lead: 'Commemorative, presentation and award medallions and challenge coins, die-struck in solid metal with relief on both sides.',
    intro: [
      'A struck medallion carries weight, literally. Struck between two steel dies, it gets sharp relief on both faces and a solid, heavy feel that cast or printed pieces can’t match.',
      'We cut the dies and strike the medallions in Pawtucket, for anniversaries, organizations, award programs and commemorative events.',
    ],
    typesHeading: 'Medallions we strike',
    typesTodo: 'Confirm the medallion types and sizes you offer.',
    types: [
      {
        title: 'Commemorative',
        body: "Anniversary and event medallions, including America's 250th and town milestones.",
        href: '/industries/commemorative/',
      },
      { title: 'Challenge coins', body: 'Coin-sized pieces for units, departments, organizations and teams.' },
      { title: 'Presentation & award', body: 'Medallions presented to honorees, retirees, donors and graduates.' },
      { title: 'Organizational', body: 'Medallions for lodges, societies, schools and associations.' },
    ],
    audienceHeading: 'Who orders medallions',
    audience: [
      'Anniversary and 250th committees',
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
      { label: 'Edge options', todo: 'e.g. plain, reeded, edge lettering' },
      { label: 'Packaging', todo: 'e.g. capsules, velvet boxes' },
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
        a: 'Tell us what you need on the edge and we will confirm what is possible for your size and quantity.',
        todo: true,
      },
      moqFaq('custom medallions'),
    ],
    related: ['/industries/commemorative/', '/awards/', '/badges/'],
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
    lead: 'Years-of-service pins, recognition medals and struck components for plaques and trophies, made as matched sets for award programs that run for decades.',
    intro: [
      'Recognition programs run for years, and every pin in the series has to match the last one. Because we build and maintain the tooling in our own tool room, your 5-year pin this year matches the 5-year pin you ordered before.',
      'We strike award pieces for companies, organizations, departments and the award suppliers who serve them.',
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
      { label: 'Attachments', todo: 'e.g. clutch back, tie tack, ribbon drape' },
      { label: 'Minimum order', value: minimumLine },
      { label: 'Lead time', value: leadTimeLine },
    ],
    photoTodo: 'Photos: 3–6 award pieces; a full years-of-service set makes a strong image.',
    faqs: [
      {
        q: 'Can you match pins we have ordered in previous years?',
        a: 'If we made the original tooling, we can run matching pieces. If another supplier made them, send a sample and we will tell you what matching it involves.',
        todo: true,
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
    lead: 'Several hundred embossed patterns on flat stock and banding, from floral and hammered to stone, ready to blank, form and finish into your pieces.',
    intro: [
      'Embossed pattern stock adds texture to findings, cuffs, tie bars and recognition pieces without engraving each part. Choose one of our popular patterns or one of the more unusual ones, or bring your own flat stock to be embossed.',
      'Pattern stock is part of our Open Line: stock patterns with no tooling cost. Need something no one else has? Put your pattern on your own exclusive die.',
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
      { label: 'Banding widths', todo: 'available banding widths' },
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

  'industrial-components': {
    slug: 'industrial-components',
    name: 'Industrial Components',
    division: 'Industrial Components',
    quoteType: 'industrial',
    metaTitle: 'Precision Metal Stamping: Industrial Stamped Components Built to Print',
    metaDescription:
      'Precision stamped metal components built to print by Mel-Co-Ed in Pawtucket, RI: brackets, clips, contacts, terminals, washers, shims and flat parts, with in-house tooling.',
    h1: 'Industrial Stamped Components',
    accent: 'built to print',
    lead: 'Brackets, clips, contacts, terminals, washers, shims and flat parts, stamped to your print with tooling built and maintained in-house.',
    intro: [
      'Our Industrial Components division stamps production parts to your drawing. Tooling is built in-house, and our Precision Milling division supports die work and secondary operations, so engineering changes and repeat orders don’t wait on outside shops.',
      'Send a print or STEP file with material, quantity and critical dimensions, and we will quote tooling and piece price at your volumes.',
    ],
    typesHeading: 'Components we stamp',
    typesTodo: 'Confirm part families and add industries/OEM types you serve (only where you can name them).',
    types: [
      { title: 'Brackets & clips', body: 'Formed brackets, clips and retainers made to your print.' },
      { title: 'Contacts & terminals', body: 'Stamped electrical contacts and terminals.' },
      { title: 'Washers, shims & spacers', body: 'Standard and custom washers, shims and spacers held to thickness.' },
      { title: 'Flat parts & blanks', body: 'Blanked and pierced flat parts, and blanks for further processing.' },
      { title: 'Formed parts', body: 'Single-hit and multi-stage formed parts made to print.' },
    ],
    audienceHeading: 'Who we supply',
    audience: [
      'OEMs and product manufacturers',
      'Contract manufacturers and assemblers',
      'Electrical and hardware manufacturers',
      'Buyers needing a second source or tooling transfer',
    ],
    specs: [
      { label: 'Processes', value: `${processesLine}; blanking, piercing, forming and CNC milling` },
      { label: 'Press capacity', todo: 'press count and tonnage range' },
      { label: 'Materials', value: materialsLine },
      { label: 'Thickness', todo: 'gauge / thickness range' },
      { label: 'Tolerances', todo: 'typical and best achievable' },
      { label: 'Max part size', todo: 'largest blank / part' },
      { label: 'Minimum order', value: minimumLine },
      { label: 'Lead time', value: leadTimeLine },
      { label: 'Quality', todo: 'inspection methods, material certs, certifications (ISO, ITAR?) if any' },
    ],
    photoTodo: 'Photos: 4–6 production parts (no customer-identifying parts without permission) and one press-floor shot.',
    faqs: [
      {
        q: 'What do you need to quote a stamped part?',
        a: 'A drawing or STEP file, the material and thickness, annual or order quantities, any finish or plating, and the dimensions or tolerances that matter most. We quote tooling and piece price separately so you can see both.',
      },
      {
        q: 'Do you build your own tooling?',
        a: 'Yes. Dies are built in-house, with support from our Precision Milling division, which keeps engineering changes and repairs on our schedule instead of an outside tool shop’s.',
      },
      {
        q: 'Can you run short runs and prototypes?',
        a: `Yes. Our standard minimum is ${ordering.minimum}; smaller runs are available at a higher price. Tell us your quantities and we will recommend the most economical tooling approach.`,
      },
      {
        q: 'Can you take over tooling from another supplier?',
        a: 'Yes. Have dies or metal already? We’ll run yours. Send details of the existing tooling and we will confirm the fit with our presses.',
      },
      {
        q: 'Do you provide material certifications and inspection reports?',
        a: 'Tell us what documentation your quality system requires and we will confirm what we can provide.',
        todo: true,
      },
    ],
    related: ['/capabilities/', '/findings/', '/industries/'],
    schemaCategory: 'Metal stampings',
  },
};

// Cards for the /products/ index (fraternal emblems live on their industry page).
export const productIndex: { title: string; href: string; slot: PhotoSlotName; body: string }[] = [
  {
    title: 'Findings',
    slot: 'findings',
    href: '/findings/',
    body: 'More than 30,000 stock findings on our Open Line, from charms and novelty pieces to men’s and women’s accessories, or custom on your own die.',
  },
  {
    title: 'Pattern Stock & Banding',
    slot: 'pattern-stock',
    href: '/pattern-stock/',
    body: 'Several hundred embossed patterns on flat stock and banding, from floral and hammered to stone. Open Line, no tooling cost.',
  },
  {
    title: 'Badges',
    slot: 'badges',
    href: '/badges/',
    body: 'Die-struck police, fire, military and government badges, plus corporate and security badges. Struck from steel dies for crisp, deep detail.',
  },
  {
    title: 'Medallions',
    slot: 'medallions',
    href: '/medallions/',
    body: 'Commemorative, challenge and presentation medallions, struck in solid metal with relief on both sides.',
  },
  {
    title: 'Awards',
    slot: 'awards',
    href: '/awards/',
    body: 'Service awards, recognition pins and stamped components for plaques and trophies, from small runs to program quantities.',
  },
  {
    title: 'Fraternal & Lodge Emblems',
    slot: 'industries-fraternal',
    href: '/industries/fraternal-lodge/',
    body: 'Masonic and fraternal emblems, lapel pins, jewels and insignia for lodges, grand lodges and regalia suppliers.',
  },
  {
    title: 'Industrial Components',
    slot: 'industrial-components',
    href: '/industrial-components/',
    body: 'Precision stamped parts built to your print: brackets, clips, contacts, terminals, washers, shims and flat parts.',
  },
];

// Buyer-question pages under /resources/. One entry per page, rendered by
// src/pages/resources/[slug].astro. Every Mel-Co-Ed claim here comes from facts.ts
// (owner-confirmed); general explanations of processes are labeled as such in context.
// No TODOs on these pages: if a fact isn't confirmed, the page doesn't mention it.

import type { Faq } from '../lib/schema';
import type { PhotoSlotName } from './photos';
import {
  materialsLine,
  finishes,
  plating,
  ordering,
  minimumLine,
  pressesLine,
  presses,
  stampingThickness,
  tolerance,
  outsourcedLine,
  pinPosts,
  madeHere,
  whoWeSellTo,
  goldLine,
  tooling,
  edgeFinishes,
  bandingWidths,
  badgeAuthorization,
} from './facts';
import { confidential } from './confidential';

export type Row = { label: string; value: string };
export type Step = { title: string; body: string };
export type ResourceGroup = 'Stamping & manufacturing' | 'Die striking & coining' | 'Jewelry & findings' | 'Emblems, awards & organizations';

export type Resource = {
  slug: string;
  group: ResourceGroup;
  /** H1: the buyer's question or search, in their words. */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** First two sentences: answer the question and name Mel-Co-Ed, Pawtucket, Rhode Island, since 1948. */
  answer: string;
  body: string[];
  list: { heading: string; items: string[] };
  specs: Row[];
  steps: [Step, Step, Step, Step];
  faqs: Faq[];
  /** Matching service/product pages. Those pages list this guide back. */
  links: { label: string; href: string }[];
  quoteType: string;
  /** Custom-work page: links to "Who owns the die?" */
  custom?: boolean;
  /** Shows the confidentiality line. */
  confidential?: boolean;
  /** A labeled illustration only (never customer work). */
  image?: { slot: PhotoSlotName; index: number };
};

// ---- Spec rows, built only from confirmed facts ----
const R = {
  presses: { label: 'Presses', value: pressesLine },
  automatic: { label: 'Automatic department', value: `Presses from ${presses.automatic}` },
  thickness: { label: 'Stock thickness', value: `${stampingThickness} thick` },
  tolerance: { label: 'Typical tolerance', value: tolerance },
  metals: { label: 'Metals', value: materialsLine },
  dieStrike: { label: 'Die striking', value: 'Up to 3.5″ diameter and .250″ thick' },
  struck: { label: 'Size', value: 'Struck up to 3.5″ in diameter' },
  minimum: { label: 'Minimum order', value: minimumLine },
  noMinimum: { label: 'Sterling and gold', value: ordering.noMinimum },
  leadTime: { label: 'Lead time', value: `Typically ${ordering.leadTime}, including building a new die` },
  finishing: {
    label: 'Finishing',
    value: `${finishes.join(', ')}. Plating in ${plating.map((p) => p.toLowerCase()).join(', ')}. ${outsourcedLine}`,
  },
  plating: { label: 'Plating', value: `${plating.join(', ')}, through outside finishers` },
  enamel: { label: 'Enamel', value: 'Soft and hard enamel, applied by outside finishers' },
  engraving: { label: 'Engraving & numbering', value: 'Done in-house' },
  assembly: { label: 'Soldering & assembly', value: 'Done in-house' },
  pinPosts: { label: 'Pin posts', value: pinPosts },
  die: { label: 'Your die', value: `${tooling.ownership} ${tooling.storage}` },
  toolingCost: { label: 'Tooling cost', value: tooling.billing },
  shortRun: { label: 'Short runs', value: tooling.shortRun },
  yourDies: { label: 'Your dies or metal', value: "Have dies or metal already? We'll run yours." },
  openLine: { label: 'Open Line', value: '30,000+ stock findings, stampings and pattern stock. No tooling cost.' },
  exclusive: { label: 'Confined & Custom', value: 'Your design on your own exclusive die, run only for you' },
  madeHere: { label: 'Made in', value: madeHere },
  origin: { label: 'Made in', value: 'Pawtucket, Rhode Island, USA, since 1948' },
  sellTo: { label: 'Who we sell to', value: whoWeSellTo },
  gold: { label: 'Gold', value: goldLine },
  pricing: { label: 'Pricing', value: ordering.pricing },
  edges: { label: 'Edge finishes', value: edgeFinishes },
  widths: { label: 'Banding widths', value: bandingWidths },
  patterns: { label: 'Patterns', value: 'Several hundred, including floral, hammered and stone' },
  auth: { label: 'Authorization', value: badgeAuthorization },
  confidential: { label: 'Confidentiality', value: "Customer dies are used only for that customer's orders. NDA on request." },
} satisfies Record<string, Row>;

// Shared step for die-struck work.
const strikeSteps = (artwork: string, finish: string): [Step, Step, Step, Step] => [
  { title: 'Artwork', body: artwork },
  { title: 'Build the dies', body: 'The design is engraved into steel dies in our own tool room. You own the die you pay for.' },
  { title: 'Strike', body: 'Blanks are struck under heavy pressure, forcing the metal into every line of the design.' },
  { title: 'Finish & ship', body: finish },
];

export const resources: Resource[] = [
  // ============ Stamping & manufacturing ============
  {
    slug: 'custom-metal-stamping-new-england',
    group: 'Stamping & manufacturing',
    h1: 'Custom metal stamping company in New England',
    metaTitle: 'Custom Metal Stamping Company in New England | Pawtucket, RI',
    metaDescription:
      'Mel-Co-Ed is a custom metal stamping company in Pawtucket, Rhode Island, since 1948: 20+ presses from 5 to 250 tons, dies built in-house, ±.002″ typical tolerance.',
    answer:
      'Mel-Co-Ed, Inc. is a custom metal stamping company in Pawtucket, Rhode Island, stamping parts for manufacturers since 1948. We build the die in our own tool room and run progressive, transfer and automatic stamping, coining and die striking under one roof.',
    body: [
      'Pawtucket is where American manufacturing started, a few minutes from Providence and about an hour from Boston. We are a third-generation, family-owned shop with 20+ presses, from 5 tons in our secondary department to 250 tons in our automatic department.',
      'Every die is built in-house, so engineering changes and reorders never wait on an outside tool shop. The die you pay for is yours, and we store it free for as long as you need it.',
    ],
    list: {
      heading: 'What New England manufacturers send us',
      items: [
        'Flat and formed parts stamped to print, from .010″ to .250″ stock',
        'Coined and die-struck pieces up to 3.5″ across',
        'Prototypes and short runs on low-cost tooling',
        'Second-source work on dies you already own',
        'Jewelry findings and components from a 30,000+ part Open Line',
      ],
    },
    specs: [R.presses, R.thickness, R.tolerance, R.metals, R.minimum, R.leadTime, R.die, R.origin],
    steps: [
      { title: 'Send your print', body: 'A drawing, CAD file, sketch or sample, with the material and quantities you need.' },
      { title: 'Quote', body: 'Tooling and piece price, billed separately or built into the piece price, your choice.' },
      { title: 'Build the die', body: 'Designed and built in our own tool room, then stored free here between runs.' },
      { title: 'Stamp & ship', body: 'Parts run in our automatic or secondary department and ship from Pawtucket.' },
    ],
    faqs: [
      {
        q: 'Where is Mel-Co-Ed’s stamping shop?',
        a: 'At 381 Roosevelt Ave, Pawtucket, Rhode Island 02860, where the company has stamped metal since 1948.',
      },
      {
        q: 'Does your lead time include building the die?',
        a: `Yes. Lead time is typically ${ordering.leadTime}, and that includes building a new die.`,
      },
      {
        q: 'What size presses do you run?',
        a: `We run ${presses.total} presses: ${presses.automatic} in our automatic department and ${presses.secondary} in our secondary department.`,
      },
    ],
    links: [
      { label: 'Metal Stamping', href: '/metal-stamping/' },
      { label: 'Industrial Components', href: '/industrial-components/' },
    ],
    quoteType: 'stamping',
    custom: true,
  },

  {
    slug: 'progressive-die-stamping-small-mid-volume',
    group: 'Stamping & manufacturing',
    h1: 'Progressive die stamping for small and mid-volume runs',
    metaTitle: 'Progressive Die Stamping for Small & Mid-Volume Runs | Mel-Co-Ed',
    metaDescription:
      'Progressive die stamping in Pawtucket, RI since 1948. Dies built in-house, automatic presses from 25 to 250 tons, 3-gross minimum, tooling billed separately or in the piece price.',
    answer:
      'Mel-Co-Ed runs progressive die stamping for small and mid-volume programs from our shop in Pawtucket, Rhode Island, where we have stamped parts since 1948. Our minimum is 3 gross (432 pieces) per item, and the progressive die is built in our own tool room.',
    body: [
      'In a progressive die, strip steps through a row of stations. Each press stroke pierces, blanks or forms one stage, and a finished part leaves the end of the die. Every part comes off the same tool, so parts stay consistent run after run.',
      'Progressive tooling costs more up front than a simple blanking die, so it pays off as quantities grow. When a program is still small, low-cost short-run tooling is available instead.',
    ],
    list: {
      heading: 'Parts that suit a progressive die',
      items: [
        'Flat parts with several holes, slots or cut-outs',
        'Parts that are blanked, pierced and formed in one pass',
        'Small components needed in steady, repeat quantities',
        'Parts in brass, copper, nickel silver, stainless or cold-rolled steel',
      ],
    },
    specs: [R.automatic, R.thickness, R.tolerance, R.metals, R.minimum, R.leadTime, R.toolingCost, R.die],
    steps: [
      { title: 'Review the print', body: 'We check material, thickness and features to lay out the strip and the stations.' },
      { title: 'Build the die', body: 'The progressive die is designed and built in our own tool room.' },
      { title: 'Run it', body: `Strip feeds through our automatic department, on presses from ${presses.automatic}.` },
      { title: 'Ship & store', body: 'Parts ship from Pawtucket. Your die stays here, stored free, for the next run.' },
    ],
    faqs: [
      {
        q: 'What quantity makes a progressive die worth it?',
        a: `It depends on the part and how many you will need over the life of the program. Send your annual and per-order quantities. ${tooling.shortRun}`,
      },
      {
        q: 'Can tooling cost be built into the piece price?',
        a: `Yes. ${tooling.billing}`,
      },
      {
        q: 'How thick can the strip be?',
        a: `We stamp stock from ${stampingThickness} thick and typically hold ${tolerance}.`,
      },
    ],
    links: [
      { label: 'Metal Stamping', href: '/metal-stamping/' },
      { label: 'Industrial Components', href: '/industrial-components/' },
    ],
    quoteType: 'stamping',
    custom: true,
  },

  {
    slug: 'short-run-metal-stamping-prototypes',
    group: 'Stamping & manufacturing',
    h1: 'Short-run metal stamping and prototypes',
    metaTitle: 'Short-Run Metal Stamping & Prototypes | Mel-Co-Ed, Pawtucket RI',
    metaDescription:
      'Prototype and short-run metal stamping in Pawtucket, RI since 1948. Low-cost short-run tooling, runs below 432 pieces at a higher price, no minimum on sterling or gold.',
    answer:
      'Mel-Co-Ed makes prototypes and short runs of stamped parts in Pawtucket, Rhode Island, as we have stamped metal since 1948. Low-cost short-run tooling is available, and runs smaller than our 3-gross (432-piece) minimum are available at a higher price.',
    body: [
      'A prototype run lets you check fit and function before committing to production tooling. Short-run tooling keeps the up-front cost down, which suits pilot builds and products still finding their market.',
      'When the part is proven, the same print can move to production tooling. Either way, the die you pay for is yours, and we store it free.',
    ],
    list: {
      heading: 'Good fits for short-run stamping',
      items: [
        'Prototypes and fit-check samples',
        'Pilot builds before a product launch',
        'Small programs that don’t justify a full progressive die',
        'Sterling silver and gold parts, which carry no minimum',
      ],
    },
    specs: [R.shortRun, R.minimum, R.leadTime, R.thickness, R.tolerance, R.metals, R.toolingCost, R.die],
    steps: [
      { title: 'Send what you have', body: 'A print, CAD file, sketch or sample, with the quantity you need now and later.' },
      { title: 'Choose the tooling', body: 'We quote short-run tooling, billed separately or built into the piece price.' },
      { title: 'Stamp the run', body: 'Parts are blanked, pierced or formed on presses sized to the job.' },
      { title: 'Test, then scale', body: 'When the part is proven, we quote production tooling from the same print.' },
    ],
    faqs: [
      {
        q: 'Can I order fewer than 432 pieces?',
        a: `Yes. ${ordering.smallRuns} ${ordering.noMinimum}`,
      },
      {
        q: 'How does short-run tooling compare with production tooling?',
        a: 'Short-run tooling costs less up front, and the trade-off is usually a higher price per piece. Send your quantities and we will quote the tooling that fits.',
      },
      {
        q: 'How fast can I get prototype parts?',
        a: `Lead time is typically ${ordering.leadTime}, including building the die.`,
      },
    ],
    links: [
      { label: 'Metal Stamping', href: '/metal-stamping/' },
      { label: 'Product Development', href: '/capabilities/product-development/' },
    ],
    quoteType: 'stamping',
    custom: true,
  },

  {
    slug: 'brass-copper-nickel-silver-stamping-usa',
    group: 'Stamping & manufacturing',
    h1: 'Brass, copper and nickel silver stamping, made in the USA',
    metaTitle: 'Brass, Copper & Nickel Silver Stamping Made in the USA | Mel-Co-Ed',
    metaDescription:
      'Brass (230/260), copper and nickel silver stampings and die-struck parts from Pawtucket, RI since 1948. Stock .010″–.250″, die striking to 3.5″, dies built in-house.',
    answer:
      'Mel-Co-Ed has stamped and die struck brass, copper and nickel silver in Pawtucket, Rhode Island since 1948. We run brass 230 and 260 alongside copper and nickel silver, with every die built in our own tool room.',
    body: [
      'Brass strikes crisply, holds fine detail and takes plating well. Brass 230, red brass, has the warmer color; 260, cartridge brass, is the more formable of the two. Copper brings warmth and conductivity.',
      'Nickel silver contains no silver: it is copper, nickel and zinc, with a pale color that suits pieces meant to look like silver. All three can be stamped from .010″ to .250″ stock or die struck for relief up to 3.5″ across.',
    ],
    list: {
      heading: 'What we make in these metals',
      items: [
        'Jewelry findings, charms and blanks',
        'Emblems, medallions and coins',
        'Embossed pattern stock and banding',
        'Industrial parts stamped to print',
        'Pieces to be plated in gold, karat gold, silver or imitation rhodium',
      ],
    },
    specs: [
      { label: 'Metals', value: 'Brass (230/260), copper, nickel silver. All metals available, or send us yours.' },
      R.thickness,
      R.dieStrike,
      R.tolerance,
      R.finishing,
      R.minimum,
      R.leadTime,
      R.origin,
    ],
    steps: [
      { title: 'Pick the alloy', body: 'Match brass, copper or nickel silver to the color, strength and finish you need.' },
      { title: 'Build the die', body: 'Designed and built in our own tool room, for stamping or die striking.' },
      { title: 'Stamp or strike', body: 'Flat and formed parts are stamped; relief pieces are struck.' },
      { title: 'Finish or ship raw', body: 'Plating, polishing and enamel go to outside finishers, or parts ship raw to yours.' },
    ],
    faqs: [
      {
        q: 'What is the difference between brass 230 and brass 260?',
        a: 'Brass 230 (red brass) has more copper and a warmer color. Brass 260 (cartridge brass) has more zinc and is more formable. We stamp both.',
      },
      {
        q: 'Does nickel silver contain silver?',
        a: 'No. Nickel silver is an alloy of copper, nickel and zinc. Its silvery color makes it a lower-cost base for pieces that should look like silver.',
      },
      {
        q: 'Can I send you my own brass or copper strip?',
        a: "Yes. Have metal already? We'll run yours.",
      },
    ],
    links: [
      { label: 'Metal Stamping', href: '/metal-stamping/' },
      { label: 'Findings', href: '/findings/' },
    ],
    quoteType: 'stamping',
    custom: true,
  },

  {
    slug: 'who-owns-the-stamping-die',
    group: 'Stamping & manufacturing',
    h1: 'Who owns the die? Custom tooling explained',
    metaTitle: 'Who Owns the Stamping Die? You Do | Mel-Co-Ed Tooling Policy',
    metaDescription:
      'At Mel-Co-Ed in Pawtucket, RI, you own the die you pay for. We store it free, indefinitely, use it only for your orders, and you can take it anywhere.',
    answer:
      'You do. At Mel-Co-Ed in Pawtucket, Rhode Island, where we have built dies since 1948, the customer owns the die they pay for, we store it free indefinitely, and you can take it anywhere.',
    body: [
      'A custom die is a precision tool cut for one part, and it is often the largest up-front cost of a stamping program. So who owns it matters: tooling held by a supplier can tie your part to that shop.',
      'Our policy is simple. You pay for the die, it is yours. While it is here it is stored free with no time limit, maintained in our tool room and run only for your orders. If you move the work, the die goes with you.',
    ],
    list: {
      heading: 'What ownership means in practice',
      items: [
        'No storage fees, however long between orders',
        'Your die is used only for your orders',
        'Reorders start from the same tool, years later',
        'If you move the work, the die goes with you',
        'Tooling can be paid up front or built into the piece price',
      ],
    },
    specs: [
      { label: 'Ownership', value: tooling.ownership },
      { label: 'Storage', value: tooling.storage },
      R.toolingCost,
      R.leadTime,
      R.confidential,
      { label: 'Tool room', value: 'Dies designed, built and maintained in-house' },
      R.yourDies,
    ],
    steps: [
      { title: 'Quote', body: 'Tooling and piece price, billed separately or combined, your choice.' },
      { title: 'Build', body: 'The die is designed and built in our own tool room.' },
      { title: 'Run', body: 'It strikes or stamps only your parts.' },
      { title: 'Store or move', body: 'Stored free, indefinitely, and yours to take anywhere.' },
    ],
    faqs: [
      { q: 'Do you charge to store my die?', a: `No. ${tooling.storage}` },
      { q: 'Can I take my die to another shop?', a: `Yes. ${tooling.ownership}` },
      { q: 'Will you use my die for anyone else?', a: confidential.body },
      { q: 'Do I have to pay for tooling up front?', a: `No. ${tooling.billing}` },
    ],
    links: [
      { label: 'Tooling', href: '/capabilities/#tooling' },
      { label: 'Product Development', href: '/capabilities/product-development/' },
    ],
    quoteType: 'custom',
    confidential: true,
  },

  {
    slug: 'custom-stamping-die-cost',
    group: 'Stamping & manufacturing',
    h1: 'How much does a custom stamping die cost?',
    metaTitle: 'How Much Does a Custom Stamping Die Cost? Cost Drivers Explained',
    metaDescription:
      'What drives the cost of a custom stamping die: size, operations, material, tolerances and volume. Mel-Co-Ed, Pawtucket RI since 1948, quotes every die to your print.',
    answer:
      'It depends on the part, so Mel-Co-Ed quotes every die to your print rather than from a price list. We have built dies in Pawtucket, Rhode Island since 1948, and the cost comes down to the part’s size, operations, material, tolerances and the volume you need.',
    body: [
      'A die is a one-off precision tool, so two parts that look alike can carry very different tooling costs. The biggest factors are how many operations the part needs and how tightly it is held.',
      'You have options that change the up-front number: low-cost short-run tooling, tooling built into the piece price, or a stock part from our Open Line with no tooling cost at all.',
    ],
    list: {
      heading: 'What drives die cost',
      items: [
        'Part size: larger blanks need larger die sets and presses',
        'Operations: each hole, form or stage adds work to the die',
        'Material and thickness: harder or thicker stock needs heavier tooling',
        'Tolerances: tighter callouts take more die work to hold',
        'Volume: tooling built for long production runs costs more than short-run tooling',
        'Relief: coining and die-striking dies are engraved, not just cut',
      ],
    },
    specs: [R.toolingCost, R.shortRun, R.openLine, R.die, R.thickness, R.tolerance, R.leadTime],
    steps: [
      { title: 'Read the print', body: 'Operations, material, thickness and the tolerances that matter.' },
      { title: 'Pick an approach', body: 'Short-run tooling, production tooling or an Open Line part.' },
      { title: 'Quote both numbers', body: 'Tooling and piece price, separately or combined, your choice.' },
      { title: 'Build and keep', body: 'The die is built in-house, it is yours, and we store it free.' },
    ],
    faqs: [
      {
        q: 'Why don’t you publish die prices?',
        a: 'Because every die is different. A simple blank and a multi-stage formed part can differ several times over in tooling. Send a print and quantities and we will quote it.',
      },
      {
        q: 'How can I lower my tooling cost?',
        a: 'Ask for low-cost short-run tooling, loosen tolerances that don’t affect function, or check whether an Open Line part already fits. Open Line parts carry no tooling cost.',
      },
      {
        q: 'Do reorders need a new die?',
        a: `No. Reorders run on the die you already own. ${tooling.storage}`,
      },
    ],
    links: [
      { label: 'Tooling', href: '/capabilities/#tooling' },
      { label: 'Metal Stamping', href: '/metal-stamping/' },
    ],
    quoteType: 'stamping',
    custom: true,
  },

  {
    slug: 'second-source-stamped-parts-tooling-transfer',
    group: 'Stamping & manufacturing',
    h1: 'Second source for stamped parts and tooling transfer',
    metaTitle: 'Second Source for Stamped Parts & Tooling Transfer | Made in USA',
    metaDescription:
      'Move existing stamping dies to Mel-Co-Ed in Pawtucket, RI. We run your dies on 20+ presses from 5 to 250 tons, store them free, and use them only for your orders.',
    answer:
      'Mel-Co-Ed takes on second-source and transferred stamping work in Pawtucket, Rhode Island, where we have stamped parts since 1948. Have dies or metal already? We will run yours, on 20+ presses from 5 to 250 tons.',
    body: [
      'Buyers add a second source when one supplier becomes a risk: capacity, lead times, quality or a shop closing. Moving existing tooling is often the fastest route, because the die already makes a proven part.',
      'Once your die is here it is stored free, indefinitely, and run only for your orders. You still own it, so it can move again if you need it to.',
    ],
    list: {
      heading: 'Why buyers come to us',
      items: [
        'A current supplier is closing or retiring',
        'Lead times have stretched too far',
        'You want a domestic, made-in-USA source',
        'You want two sources for a critical part',
        'You are bringing offshore work back to the U.S.',
      ],
    },
    specs: [R.yourDies, R.presses, R.thickness, R.tolerance, R.die, R.metals, R.leadTime, R.origin],
    steps: [
      { title: 'Tell us about it', body: 'The part print, the die type, the material and your past run quantities.' },
      { title: 'Bring the die in', body: 'Your tooling comes to Pawtucket and is stored free.' },
      { title: 'Run the part', body: 'Production runs in our automatic or secondary department.' },
      { title: 'Repeat', body: 'Your die is used only for your orders, ready for every reorder.' },
    ],
    faqs: [
      {
        q: 'Can you run a die another shop built?',
        a: "Yes. Have dies already? We'll run yours. Send the die details and part print so we can match it to the right press.",
      },
      {
        q: 'What if my old supplier won’t release the tooling?',
        a: `Ownership depends on your agreement with that supplier. If the die can’t move, we can build a new one from your print or a sample part. Lead time is typically ${ordering.leadTime}, including the new die.`,
      },
      {
        q: 'Will my parts be made in the USA?',
        a: 'Yes. Every part is made at our shop in Pawtucket, Rhode Island.',
      },
    ],
    links: [
      { label: 'Metal Stamping', href: '/metal-stamping/' },
      { label: 'Industrial Components', href: '/industrial-components/' },
    ],
    quoteType: 'stamping',
    custom: true,
  },

  // ============ Die striking & coining ============
  {
    slug: 'what-is-die-striking',
    group: 'Die striking & coining',
    h1: 'What is die striking? Die struck vs. cast vs. stamped',
    metaTitle: 'What Is Die Striking? Die Struck vs Cast vs Stamped Explained',
    metaDescription:
      'Die striking presses a blank between engraved steel dies for sharp relief. How it compares with casting and stamping, from Mel-Co-Ed, die striking in Pawtucket, RI since 1948.',
    answer:
      'Die striking presses a metal blank between two engraved steel dies under heavy pressure, forcing the metal into every detail of the design. Mel-Co-Ed has die struck badges, medallions, emblems and findings in Pawtucket, Rhode Island since 1948, up to 3.5″ across and .250″ thick.',
    body: [
      'Die striking is a form of coining: the metal flows to fill the dies, so lettering is sharp, relief is crisp and the piece is dense and heavy. Stamping, more broadly, cuts and bends sheet metal into shape by blanking, piercing and forming.',
      'Casting pours molten metal into a mold. It handles deep undercuts and fully three-dimensional shapes, but detail is usually softer and the metal less dense than a struck piece.',
    ],
    list: {
      heading: 'Which method fits',
      items: [
        'Die struck: sharp relief and fine lettering in dense metal, for badges, coins, medallions and emblems',
        'Stamped: flat and formed parts made fast and consistently, for findings and industrial parts',
        'Cast: deep 3D shapes and undercuts, for sculptural pieces',
        'Stamped, then struck: a blank is cut out, then struck for relief',
      ],
    },
    specs: [R.dieStrike, R.presses, R.metals, R.finishing, R.minimum, R.leadTime, R.origin],
    steps: strikeSteps(
      'Your logo, seal or design is prepared for the dies, front and back.',
      'Pieces are trimmed, then plated, polished or enamel-filled by outside finishers, or shipped raw.',
    ),
    faqs: [
      {
        q: 'Is die struck better than cast?',
        a: 'For crisp lettering and fine detail, usually yes: a struck piece is denser and sharper. Casting is the better choice for deep, sculptural shapes with undercuts.',
      },
      {
        q: 'What is the largest piece you can die strike?',
        a: 'Up to 3.5″ in diameter and .250″ thick.',
      },
      {
        q: 'Are die struck and coined the same thing?',
        a: 'They are closely related. Coining is die striking under enough pressure to fill fine detail on both faces, which is how coins and medallions are made.',
      },
    ],
    links: [
      { label: 'Die Striking & Coining', href: '/capabilities/#die-striking' },
      { label: 'Medallions', href: '/medallions/' },
    ],
    quoteType: 'medallions',
    image: { slot: 'badges', index: 6 },
  },

  {
    slug: 'custom-coins-struck-usa',
    group: 'Die striking & coining',
    h1: 'Custom coining and coins struck in the USA',
    metaTitle: 'Custom Coins Struck in the USA | Coining by Mel-Co-Ed, Pawtucket RI',
    metaDescription:
      'Custom coins struck in Pawtucket, Rhode Island since 1948: up to 3.5″ diameter, dies built in-house, numbering in-house, soft or hard enamel, no minimum on sterling or gold.',
    answer:
      'Mel-Co-Ed has coined and struck metal in Pawtucket, Rhode Island since 1948, and strikes custom coins today from dies built in our own tool room. Coins are struck up to 3.5″ in diameter, in brass, copper, nickel silver, sterling, fine silver, gold and more.',
    body: [
      'Coining squeezes a blank between two dies so hard that the metal flows into every line of both faces. The result is crisp relief, sharp lettering and the solid, heavy feel people expect from a coin.',
      'Numbering and engraving are done in-house, so limited editions can carry a number on every coin. Color comes from soft or hard enamel, applied by outside finishers.',
    ],
    list: {
      heading: 'What customers strike as coins',
      items: [
        'Commemorative and anniversary coins',
        'Challenge coins for units and organizations',
        'Event and program coins',
        'Numbered limited editions',
      ],
    },
    specs: [R.struck, R.metals, R.enamel, R.plating, R.engraving, R.edges, R.minimum, R.leadTime],
    steps: strikeSteps(
      'Front and back artwork is prepared for the dies.',
      'Coins are numbered in-house if needed, then plated, polished or enamel-filled by outside finishers and shipped.',
    ),
    faqs: [
      { q: 'How big can a custom coin be?', a: 'Up to 3.5″ in diameter.' },
      { q: 'Can coins be individually numbered?', a: 'Yes. Engraving and numbering are done in-house.' },
      {
        q: 'Can I order coins in sterling silver or gold?',
        a: `Yes. ${ordering.noMinimum} ${ordering.pricing}`,
      },
    ],
    links: [
      { label: 'Medallions', href: '/medallions/' },
      { label: 'Die Striking & Coining', href: '/capabilities/#die-striking' },
    ],
    quoteType: 'medallions',
    custom: true,
  },

  {
    slug: 'custom-die-struck-medallions',
    group: 'Die striking & coining',
    h1: 'Custom die struck medallions and award medallions',
    metaTitle: 'Custom Die Struck Medallions & Award Medallions | Made in USA',
    metaDescription:
      'Custom die struck medallions, award medallions and recognition pins from Pawtucket, RI since 1948. Struck up to 3.5″, dies built in-house and stored free for every reorder.',
    answer:
      'Mel-Co-Ed strikes custom medallions and award medallions in Pawtucket, Rhode Island, where we have die struck metal since 1948. Medallions are struck up to 3.5″ across from dies built in our own tool room, in any metal on our list or yours.',
    body: [
      'A struck medallion gets its relief from steel dies, not a mold, so lettering and portraits stay sharp and the piece has real weight in the hand. That makes it the standard for awards meant to be kept.',
      'For recognition programs, the same die strikes every piece in the series. You own the die and we store it free, so next year’s medallions match this year’s.',
    ],
    list: {
      heading: 'Medallions and awards we strike',
      items: [
        'Award and recognition medallions',
        'Commemorative and anniversary medallions',
        'Presentation pieces for retirees, donors and honorees',
        'Recognition pins struck from the same artwork',
      ],
    },
    specs: [R.struck, R.metals, R.finishing, R.enamel, R.engraving, R.edges, R.minimum, R.leadTime, R.die],
    steps: strikeSteps(
      'Obverse and reverse artwork is prepared for the dies.',
      'Medallions are engraved or numbered in-house if needed, finished by outside finishers, and shipped.',
    ),
    faqs: [
      {
        q: 'Can you match medallions from an earlier year?',
        a: `If we struck them, yes: the die is still here. ${tooling.storage}`,
      },
      {
        q: 'Can each medallion be engraved with a name?',
        a: 'Engraving and numbering are done in-house. Tell us what each piece needs.',
      },
      {
        q: 'What is the difference between an award medallion and a recognition pin?',
        a: 'A medallion is a larger presentation piece, often kept on display. A recognition pin is worn. Both can be struck from the same artwork on their own dies.',
      },
    ],
    links: [
      { label: 'Medallions', href: '/medallions/' },
      { label: 'Awards', href: '/awards/' },
    ],
    quoteType: 'medallions',
    custom: true,
    image: { slot: 'industries-fraternal', index: 1 },
  },

  {
    slug: 'challenge-coins-made-in-usa',
    group: 'Die striking & coining',
    h1: 'Challenge coins made in the USA',
    metaTitle: 'Challenge Coins Made in the USA | Struck in Rhode Island',
    metaDescription:
      'Challenge coins struck in Pawtucket, Rhode Island since 1948. Up to 3.5″, soft or hard enamel, in-house numbering, dies built in-house and stored free.',
    answer:
      'Mel-Co-Ed strikes challenge coins in Pawtucket, Rhode Island, from dies built in our own tool room; we have struck metal here since 1948. Every coin is made in the USA, up to 3.5″ across, with soft or hard enamel, numbering and edge finishes available.',
    body: [
      'If “made in USA” matters to your unit, department or organization, ask any supplier where the coins are actually struck. Ours are struck in Rhode Island, from a die you own.',
      'Soft enamel sits slightly below the raised metal lines; hard enamel is filled and polished level for a smooth face. Both are applied by outside finishers. Numbering is done in-house.',
    ],
    list: {
      heading: 'Who orders challenge coins',
      items: ['Military and veteran units', 'Police and fire departments', 'Companies and programs', 'Clubs, teams and events'],
    },
    specs: [R.struck, R.enamel, R.engraving, R.edges, R.metals, R.minimum, R.leadTime, R.origin],
    steps: strikeSteps(
      'Front and back artwork is prepared, with your enamel colors marked.',
      'Coins are numbered in-house if needed, enamel-filled and plated by outside finishers, and shipped.',
    ),
    faqs: [
      {
        q: 'Are your challenge coins really made in the USA?',
        a: 'Yes. They are struck at our shop in Pawtucket, Rhode Island, from dies built in our own tool room.',
      },
      {
        q: 'Soft enamel or hard enamel: which should I choose?',
        a: 'Soft enamel leaves a textured face with raised metal lines and costs less. Hard enamel is polished flat for a smooth, durable face. We offer both.',
      },
      { q: 'What is the minimum order for challenge coins?', a: minimumLine },
    ],
    links: [{ label: 'Medallions', href: '/medallions/' }],
    quoteType: 'medallions',
    custom: true,
    image: { slot: 'industries-fraternal', index: 4 },
  },

  {
    slug: 'custom-die-struck-emblems-nameplates',
    group: 'Die striking & coining',
    h1: 'Custom die struck emblems and nameplates',
    metaTitle: 'Custom Die Struck Emblems & Nameplates | Mel-Co-Ed, Made in USA',
    metaDescription:
      'Custom die struck emblems and nameplates from Pawtucket, RI since 1948. Struck up to 3.5″, numbering in-house, soft or hard enamel, dies built in-house.',
    answer:
      'Mel-Co-Ed makes custom die struck emblems and nameplates in Pawtucket, Rhode Island, where we have struck and stamped metal since 1948. Emblems are struck up to 3.5″ across, and nameplates can be stamped flat or struck with raised lettering and logos.',
    body: [
      'A die-struck emblem carries a logo in real relief, the kind you can feel. It is the classic choice for products, equipment and regalia where a printed label would wear off.',
      'Engraving and numbering are done in-house, so nameplates can carry serial or model numbers. Plating, polishing and enamel fill are done by outside finishers.',
    ],
    list: {
      heading: 'Emblems and nameplates we make',
      items: [
        'Product and equipment nameplates',
        'Brand emblems for goods and packaging',
        'Regalia and uniform emblems',
        'Serial-numbered plates for limited editions',
      ],
    },
    specs: [R.dieStrike, R.thickness, R.metals, R.finishing, R.enamel, R.engraving, R.minimum, R.leadTime],
    steps: strikeSteps(
      'Your logo or lettering is prepared for the dies.',
      'Plates are numbered in-house if needed, finished by outside finishers, and shipped.',
    ),
    faqs: [
      { q: 'Can nameplates carry serial numbers?', a: 'Yes. Engraving and numbering are done in-house.' },
      {
        q: 'Which metal is best for a nameplate?',
        a: 'Brass and nickel silver strike crisply and plate well. Stainless steel and aluminum suit plates that face weather or hard wear. We work in all four, and more.',
      },
      {
        q: 'Can an emblem be made in our brand colors?',
        a: 'Yes. Color is added with soft or hard enamel by outside finishers. Tell us your colors with the artwork.',
      },
    ],
    links: [
      { label: 'Die Striking & Coining', href: '/capabilities/#die-striking' },
      { label: 'Metal Stamping', href: '/metal-stamping/' },
    ],
    quoteType: 'other',
    custom: true,
    image: { slot: 'industries-fraternal', index: 2 },
  },

  {
    slug: 'belt-buckle-manufacturer-usa',
    group: 'Die striking & coining',
    h1: 'Belt buckle manufacturer in the USA',
    metaTitle: 'Belt Buckle Manufacturer in the USA | Die Struck in Rhode Island',
    metaDescription:
      'Custom belt buckles die struck and stamped in Pawtucket, RI since 1948. Dies built in-house, soldering and assembly in-house, numbering in-house, no minimum on sterling.',
    answer:
      'Mel-Co-Ed makes custom belt buckles in Pawtucket, Rhode Island, where we have stamped and die struck metal since 1948. Buckles are struck or stamped from dies built in our own tool room, with soldering and assembly done in-house.',
    body: [
      'A die-struck buckle face carries a logo or design in raised relief, the same way a coin or badge does. Soldering and assembly are done in-house, and numbering too, so a limited run can be numbered on the back.',
      'Sterling silver carries no minimum order, and brass and nickel silver give a solid, classic buckle at a lower metal cost. Plating, polishing and enamel are done by outside finishers.',
    ],
    list: {
      heading: 'Buckles we make',
      items: ['Brand and company buckles', 'Award and event buckles', 'Club and organization buckles', 'Numbered limited editions'],
    },
    specs: [R.dieStrike, R.metals, R.assembly, R.engraving, R.finishing, R.minimum, R.leadTime, R.origin],
    steps: strikeSteps(
      'Your design is prepared for the dies.',
      'Buckles are soldered and assembled in-house, finished by outside finishers, and shipped.',
    ),
    faqs: [
      { q: 'How large can a die-struck buckle face be?', a: 'Up to 3.5″ across and .250″ thick.' },
      { q: 'Can belt buckles be made in sterling silver?', a: `Yes. ${ordering.noMinimum}` },
      { q: 'Can each buckle be numbered?', a: 'Yes. Engraving and numbering are done in-house.' },
      {
        q: 'Which metals can a buckle be made in?',
        a: `${materialsLine} Brass and nickel silver are the usual choice for a solid buckle at a lower metal cost.`,
      },
    ],
    links: [
      { label: 'Die Striking & Coining', href: '/capabilities/#die-striking' },
      { label: 'Products', href: '/products/' },
    ],
    quoteType: 'other',
    custom: true,
  },

  // ============ Jewelry & findings ============
  {
    slug: 'wholesale-jewelry-findings-manufacturer-usa',
    group: 'Jewelry & findings',
    h1: 'Wholesale jewelry findings manufacturer in the USA (not an importer)',
    metaTitle: 'Wholesale Jewelry Findings Manufacturer in the USA, Not an Importer',
    metaDescription:
      'Mel-Co-Ed manufactures jewelry findings in Pawtucket, RI since 1948. Every finding is made here, nothing imported. 30,000+ stock findings, no tooling cost.',
    answer:
      'Mel-Co-Ed manufactures jewelry findings in Pawtucket, Rhode Island, and has since 1948. Every finding we sell is made in Pawtucket; nothing is imported.',
    body: [
      'Plenty of wholesale findings are imported and resold. We strike and stamp ours from dies built in our own tool room, which means consistent parts, known metals and reorders from the same tool years later.',
      `Our Open Line has more than 30,000 stock findings, stampings and pattern stock, with no tooling cost. ${whoWeSellTo}`,
    ],
    list: {
      heading: 'On the Open Line',
      items: [
        'Novelty charms and pendants',
        'Men’s accessories: tie bars, tie tacks, cufflinks, collar clips, money clips',
        'Women’s cuffs, earrings, necklaces and pendants',
        'Ad specialty pieces: divot tools, key tags, money clips',
        'Functional stampings: letter openers, bookmarks, bottle openers',
      ],
    },
    specs: [R.madeHere, R.openLine, R.metals, R.minimum, R.sellTo, R.finishing, R.leadTime],
    steps: [
      { title: 'Find the part', body: 'Pick a part number from our Findings & Stampings catalog, or send your own design.' },
      { title: 'Choose the metal', body: 'Any metal on our list, or send us yours.' },
      { title: 'Strike or stamp', body: 'Findings are struck and stamped in Pawtucket from our own dies.' },
      { title: 'Ship raw or finished', body: 'Plating and polishing go to outside finishers, or parts ship raw.' },
    ],
    faqs: [
      { q: 'Are your findings made in the USA or imported?', a: madeHere },
      { q: 'Do you sell findings to small designers?', a: whoWeSellTo },
      {
        q: 'How do I order from your findings catalog?',
        a: 'Call or email with the part number, the metal and the quantity.',
      },
      { q: 'Is there a tooling charge on stock findings?', a: 'No. Open Line findings carry no tooling cost.' },
    ],
    links: [
      { label: 'Findings', href: '/findings/' },
      { label: 'Pattern Stock & Banding', href: '/pattern-stock/' },
    ],
    quoteType: 'findings',
  },

  {
    slug: 'sterling-silver-findings-manufacturer',
    group: 'Jewelry & findings',
    h1: 'Sterling silver findings manufacturer',
    metaTitle: 'Sterling Silver Findings Manufacturer | No Minimum | Made in USA',
    metaDescription:
      'Sterling silver findings made in Pawtucket, RI since 1948, with no minimum order on sterling. Priced at order on current metal prices; send us your own silver.',
    answer:
      'Mel-Co-Ed makes sterling silver findings in Pawtucket, Rhode Island, where we have made findings since 1948. There is no minimum order on sterling silver, and every finding is made here, not imported.',
    body: [
      'Sterling, 92.5% silver, is the standard for fine silver jewelry. Because it moves with the metal market, sterling is priced at the time of order, based on current metal prices.',
      "We also work in fine silver, and you can supply your own metal: have metal already? We'll run yours. Your design can go on its own exclusive die, run only for you.",
    ],
    list: {
      heading: 'Sterling findings we make',
      items: ['Charms and pendants', 'Earrings', 'Cuffs and bracelet components', 'Tie bars and cufflinks', 'Your own design, on your own die'],
    },
    specs: [
      { label: 'Silver', value: 'Sterling silver and fine silver, or your own metal' },
      R.noMinimum,
      R.pricing,
      R.madeHere,
      R.finishing,
      R.leadTime,
      R.die,
    ],
    steps: [
      { title: 'Design or part number', body: 'Send your design, or pick a finding from our catalog.' },
      { title: 'Metal', body: 'Sterling or fine silver, priced at order, or silver you supply.' },
      { title: 'Strike or stamp', body: 'Struck and stamped in Pawtucket from dies built in-house.' },
      { title: 'Finish & ship', body: 'Polishing and plating go to outside finishers, or parts ship raw.' },
    ],
    faqs: [
      { q: 'Is there a minimum order for sterling silver findings?', a: `No. ${ordering.noMinimum}` },
      { q: 'How is sterling silver priced?', a: ordering.pricing },
      { q: 'Can I supply my own silver?', a: "Yes. Have metal already? We'll run yours." },
      {
        q: 'Do you make findings in fine silver as well as sterling?',
        a: 'Yes. We work in fine silver and sterling, and in every other metal on our list: brass, copper, nickel silver, gold and gold filled, stainless steel, aluminum, cold-rolled steel and zinc.',
      },
      {
        q: 'Can sterling findings be finished before they ship?',
        a: `Yes, or they can ship raw. ${outsourcedLine}`,
      },
    ],
    links: [{ label: 'Findings', href: '/findings/' }],
    quoteType: 'findings',
    custom: true,
  },

  {
    slug: 'gold-filled-karat-gold-findings',
    group: 'Jewelry & findings',
    h1: 'Gold-filled and karat gold findings',
    metaTitle: 'Gold-Filled & Solid 10K, 14K, 18K Gold Findings | Made in USA',
    metaDescription:
      'Gold-filled, solid 10K/14K/18K and karat-plated findings made in Pawtucket, RI since 1948. No minimum on gold; customer-supplied gold welcome.',
    answer:
      'Mel-Co-Ed makes gold-filled and solid gold findings in Pawtucket, Rhode Island, where we have made findings since 1948. We work in gold filled, solid 10K, 14K and 18K gold, karat gold plating and customer-supplied gold, with no minimum order on gold.',
    body: [
      'Gold filled carries a thick layer of karat gold bonded to a base metal, so it wears far longer than plating at a fraction of the cost of solid gold. Solid gold findings are karat gold all the way through.',
      'Karat gold plating gives gold color over brass or another base metal, applied by outside finishers. Gold is priced at the time of order, and if you supply your own, we will strike it.',
    ],
    list: {
      heading: 'Gold findings we make',
      items: [
        'Findings for fine jewelry lines in 10K, 14K or 18K',
        'Gold-filled findings for longer-wearing pieces',
        'Karat-plated findings for gold color at a lower cost',
        'Your gold, struck into your design',
      ],
    },
    specs: [R.gold, R.noMinimum, R.pricing, R.plating, R.madeHere, R.leadTime, R.die],
    steps: [
      { title: 'Choose the gold', body: 'Gold filled, 10K, 14K, 18K, karat plating, or gold you supply.' },
      { title: 'Build the die', body: 'Your design on its own die, built in our tool room, or a catalog finding.' },
      { title: 'Strike or stamp', body: 'Findings are struck and stamped in Pawtucket.' },
      { title: 'Finish & ship', body: 'Plating and polishing go to outside finishers, then parts ship.' },
    ],
    faqs: [
      {
        q: 'What is the difference between gold filled and gold plated?',
        a: 'Gold filled has a much thicker layer of karat gold, mechanically bonded to the base metal, so it lasts far longer. Plating is a thin layer applied by electroplating.',
      },
      { q: 'Can I send you my own gold?', a: 'Yes. We work with customer-supplied gold.' },
      { q: 'Do you have a minimum on gold findings?', a: `No. ${ordering.noMinimum}` },
    ],
    links: [{ label: 'Findings', href: '/findings/' }],
    quoteType: 'findings',
    custom: true,
  },

  {
    slug: 'custom-findings-for-jewelry-brands',
    group: 'Jewelry & findings',
    h1: 'Custom findings for jewelry brands',
    metaTitle: 'Custom Jewelry Findings for Brands | Your Own Exclusive Die',
    metaDescription:
      'Custom findings for jewelry brands, made in Pawtucket, RI since 1948. Your design on your own exclusive die, run only for you. You own the die; we store it free.',
    answer:
      'Mel-Co-Ed makes custom findings for jewelry brands in Pawtucket, Rhode Island, where we have made findings since 1948. Your design goes on your own exclusive die, run only for you, and you own the die.',
    body: [
      'A custom finding sets your line apart: a branded charm, a signature connector, a component no competitor can buy. We build the die in our own tool room from your sketch, drawing or sample.',
      'Confined designs never join our Open Line. Customer dies are used only for that customer’s orders, and we will sign an NDA on request.',
    ],
    list: {
      heading: 'What brands have us make',
      items: [
        'Branded charms and tags',
        'Signature connectors and components',
        'Textured pieces cut from our embossed pattern stock',
        'Your design in sterling or gold, with no minimum',
      ],
    },
    specs: [R.exclusive, R.die, R.metals, R.minimum, R.toolingCost, R.leadTime, R.madeHere],
    steps: [
      { title: 'Send your design', body: 'A sketch, drawing or sample, with metal and quantity.' },
      { title: 'Engineer it', body: 'We work out how the finding is struck, blanked and formed.' },
      { title: 'Build your die', body: 'Built in our tool room, exclusive to you, stored free.' },
      { title: 'Produce', body: 'Findings are struck in Pawtucket and shipped raw or finished.' },
    ],
    faqs: [
      {
        q: 'Will my custom finding be sold to other brands?',
        a: 'No. Confined designs are run only for you and never added to our Open Line.',
      },
      {
        q: 'What do I need to start a custom finding?',
        a: 'A sketch, drawing or sample, the metal you want and an idea of quantity. That is enough to quote.',
      },
      {
        q: 'Can a custom finding use one of your embossed patterns?',
        a: 'Yes. Every pattern can be made into pendants, bracelets, earrings or any other shape, including your own design.',
      },
    ],
    links: [
      { label: 'Findings', href: '/findings/' },
      { label: 'Product Development', href: '/capabilities/product-development/' },
    ],
    quoteType: 'custom',
    custom: true,
    confidential: true,
  },

  {
    slug: 'embossed-pattern-stock-banding-jewelry',
    group: 'Jewelry & findings',
    h1: 'Embossed pattern stock and banding for jewelry',
    metaTitle: 'Embossed Pattern Stock & Banding for Jewelry | Several Hundred Patterns',
    metaDescription:
      'Embossed pattern stock and banding from Pawtucket, RI since 1948. Several hundred patterns, from floral and hammered to stone, on the Open Line with no tooling cost.',
    answer:
      'Mel-Co-Ed embosses pattern stock and banding for jewelry makers in Pawtucket, Rhode Island, where we have made findings since 1948. Several hundred patterns, from floral and hammered to stone, are on our Open Line with no tooling cost.',
    body: [
      'Pattern stock is flat metal with a design pressed into its surface. Blank it, form it and finish it, and every piece carries the same texture without engraving each one. Banding is the same idea in a narrow strip.',
      `Bring your own flat stock and we will emboss it, or put a new pattern on your own exclusive die. ${bandingWidths}`,
    ],
    list: {
      heading: 'Made from pattern stock',
      items: [
        'Cuff bracelets and bracelets',
        'Tie bars, lapel pins and collar stays',
        'Bookmarks, ornaments, money clips and card cases',
        'Pendants, rounds, tags and bars in any size',
        'Architectural and lighting applications',
      ],
    },
    specs: [R.patterns, R.widths, R.metals, R.openLine, { label: 'Your stock', value: 'Bring your flat stock and we’ll emboss it' }, R.minimum, R.leadTime],
    steps: [
      { title: 'Pick a pattern', body: 'Choose from our Pattern & Banding catalog, or design your own.' },
      { title: 'Choose the metal', body: 'Any metal on our list, or your own flat stock.' },
      { title: 'Emboss', body: 'The pattern is pressed into the stock from our dies.' },
      { title: 'Blank & form', body: 'Cut into rounds, tags, bars or your shape, or shipped as stock.' },
    ],
    faqs: [
      {
        q: 'What do I need to order banding?',
        a: `The part number from our Pattern & Banding catalog, the metal and the quantity. ${bandingWidths}`,
      },
      {
        q: 'Can I have a pattern no one else uses?',
        a: 'Yes. A custom pattern is cut on your own exclusive die and run only for you.',
      },
      {
        q: 'Can pattern stock be cut into any shape?',
        a: 'Yes: rounds in any size, with or without a hole, tags, bars or your own design.',
      },
    ],
    links: [
      { label: 'Pattern Stock & Banding', href: '/pattern-stock/' },
      { label: 'Findings', href: '/findings/' },
    ],
    quoteType: 'pattern',
    custom: true,
  },

  {
    slug: 'cufflinks-tie-bars-money-clips-manufacturer',
    group: 'Jewelry & findings',
    h1: 'Cufflinks, tie bars and money clips manufacturer',
    metaTitle: 'Cufflinks, Tie Bars & Money Clips Manufacturer | Made in USA',
    metaDescription:
      'Cufflinks, tie bars and money clips made in Pawtucket, RI since 1948. Open Line pieces with no tooling cost, or your design on your own die. Soldering and engraving in-house.',
    answer:
      'Mel-Co-Ed makes cufflinks, tie bars and money clips in Pawtucket, Rhode Island, where we have stamped metal since 1948. Choose from our Open Line or put your design on its own exclusive die, with soldering, assembly and engraving done in-house.',
    body: [
      'Men’s accessories are part of our Open Line: tie bars, tie tacks, cufflinks, collar clips and money clips, with no tooling cost. Custom pieces are struck from your own die.',
      'Embossed pattern stock adds texture, and engraving is done in-house for initials, logos or numbers. Plating and polishing are done by outside finishers.',
    ],
    list: {
      heading: 'What customers order',
      items: ['Corporate gifts with a struck logo', 'Wedding and event sets', 'Brand lines for retailers', 'Award and recognition pieces'],
    },
    specs: [R.openLine, R.exclusive, R.metals, R.assembly, R.engraving, R.finishing, R.minimum, R.leadTime],
    steps: [
      { title: 'Stock or custom', body: 'Pick an Open Line piece, or send your design.' },
      { title: 'Strike', body: 'Faces are struck or stamped from steel dies built in-house.' },
      { title: 'Assemble', body: 'Soldering, assembly and engraving are done in-house.' },
      { title: 'Finish & ship', body: 'Plating and polishing by outside finishers, then shipped.' },
    ],
    faqs: [
      {
        q: 'Can you put our logo on cufflinks or tie bars?',
        a: 'Yes. Your logo can be struck from your own die, or engraved in-house.',
      },
      { q: 'Can I order these in sterling silver?', a: `Yes. ${ordering.noMinimum}` },
      { q: 'Are stock cufflinks and tie bars free of tooling cost?', a: 'Yes. Open Line pieces carry no tooling cost.' },
      {
        q: 'Can tie bars and money clips carry a textured pattern?',
        a: 'Yes. Several hundred embossed patterns, from floral and hammered to stone, can be blanked into tie bars, money clips and cufflinks.',
      },
      {
        q: 'Can cufflinks be engraved with initials?',
        a: 'Yes. Engraving is done in-house, so initials, dates or numbers can be added to each piece.',
      },
    ],
    links: [{ label: 'Findings', href: '/findings/' }],
    quoteType: 'findings',
    custom: true,
  },

  // ============ Emblems, awards & organizations ============
  {
    slug: 'police-fire-badge-manufacturer',
    group: 'Emblems, awards & organizations',
    h1: 'Custom police and fire badge manufacturer',
    metaTitle: 'Custom Police & Fire Badge Manufacturer | Die Struck in Rhode Island',
    metaDescription:
      'Mel-Co-Ed in Pawtucket, RI does secondary badge work and can take on full badge production: die struck up to 3.5″, soft or hard enamel, numbering in-house. Authorization verified.',
    answer: `Mel-Co-Ed does secondary badge work in Pawtucket, Rhode Island, where we have die struck metal since 1948, and our presses and tool room can take on full badge production. ${badgeAuthorization}`,
    body: [
      'Die striking is how quality badges are made: a blank is struck between engraved steel dies, so the lettering, seal and border come out sharp and the badge stands up to daily wear.',
      `Our shop already handles secondary badge work, and the same equipment, ${presses.total} presses, an in-house tool room and die striking up to 3.5″, can produce complete badges. Numbering is done in-house. ${pinPosts}`,
    ],
    list: {
      heading: 'Badge work we can take on',
      items: ['Police and sheriff badges', 'Fire and EMS badges', 'Security and corporate badges', 'Secondary operations on badges'],
    },
    specs: [R.auth, R.dieStrike, R.presses, R.enamel, R.engraving, R.pinPosts, R.metals, R.minimum, R.leadTime],
    steps: strikeSteps(
      'Your badge design is prepared for the dies, with the issuing agency’s authorization verified for law-enforcement badges.',
      'Badges are numbered in-house if needed, enamel-filled and plated by outside finishers, and shipped.',
    ),
    faqs: [
      {
        q: 'How do you handle authorization for a law-enforcement badge?',
        a: `${badgeAuthorization} Name the issuing agency when you request a quote.`,
      },
      { q: 'Are badge pin posts soldered on?', a: `No. ${pinPosts}` },
      { q: 'Can badges be numbered?', a: 'Yes. Engraving and numbering are done in-house.' },
      { q: 'Do you offer hard enamel on badges?', a: 'Yes. We offer soft and hard enamel, applied by outside finishers.' },
    ],
    links: [{ label: 'Badges', href: '/badges/' }],
    quoteType: 'badges',
    custom: true,
    confidential: true,
    image: { slot: 'badges', index: 0 },
  },

  {
    slug: 'fraternal-lodge-emblems-pins-jewels',
    group: 'Emblems, awards & organizations',
    h1: 'Fraternal and lodge emblems, pins and jewels',
    metaTitle: 'Fraternal & Lodge Emblems, Pins and Past Master Jewels | Made in USA',
    metaDescription:
      'Lodge emblems, lapel pins, Past Master and officer jewels die struck in Pawtucket, RI since 1948. The lodge owns its die; we store it free for every reorder.',
    answer:
      'Mel-Co-Ed strikes lodge emblems, lapel pins and Past Master and officer jewels in Pawtucket, Rhode Island, where we have die struck metal since 1948. Every piece comes from steel dies built in our own tool room.',
    body: [
      'Fraternal pieces are worn for decades and handed down, so detail matters: the square and compasses, the lodge number, the founding date. Die striking keeps that detail sharp at lapel size.',
      `The lodge owns the die it pays for, and we store it free, indefinitely, so pins for new members and jewels for new officers start from the same tool. ${pinPosts}`,
    ],
    list: {
      heading: 'What lodges order',
      items: ['Past Master jewels', 'Officer jewels', 'Lapel pins with lodge name and number', 'Emblems for regalia', 'Anniversary medallions'],
    },
    specs: [R.dieStrike, R.metals, R.noMinimum, R.enamel, R.pinPosts, R.finishing, R.minimum, R.die, R.leadTime],
    steps: strikeSteps(
      'Your lodge seal, an old pin or a sketch is prepared for the dies, with lodge name, number and dates.',
      'Pieces are enamel-filled and plated by outside finishers, fitted, and shipped to the lodge or your supplier.',
    ),
    faqs: [
      { q: 'Do you make Past Master jewels?', a: 'Yes. We strike Past Master and officer jewels for lodges.' },
      {
        q: 'Can pins for new members match the ones we ordered years ago?',
        a: `Yes, if we struck the originals. ${tooling.storage}`,
      },
      { q: 'Can jewels be made in sterling or gold?', a: `Yes. ${ordering.noMinimum}` },
    ],
    links: [{ label: 'Fraternal & Lodge', href: '/industries/fraternal-lodge/' }],
    quoteType: 'fraternal',
    custom: true,
    confidential: true,
    image: { slot: 'industries-fraternal', index: 0 },
  },

  {
    slug: 'corporate-logo-pins-emblems-usa',
    group: 'Emblems, awards & organizations',
    h1: 'Corporate logo pins and emblems made in the USA',
    metaTitle: 'Corporate Logo Pins & Emblems Made in the USA | Die Struck',
    metaDescription:
      'Corporate logo pins and emblems die struck in Pawtucket, RI since 1948. Soft or hard enamel, pin posts fused never soldered, dies you own and we store free.',
    answer: `Mel-Co-Ed strikes corporate logo pins and emblems in Pawtucket, Rhode Island, where we have die struck metal since 1948. Every pin is made in the USA from a die built in our own tool room. ${pinPosts}`,
    body: [
      'A struck pin carries your logo in real metal relief, which reads as quality on a lapel. Color comes from soft or hard enamel, and plating in gold, karat gold, silver or imitation rhodium, both applied by outside finishers.',
      'For service and recognition programs, the same die strikes every year’s pins. You own it, and we store it free, so this year’s pin matches last year’s.',
    ],
    list: {
      heading: 'What companies order',
      items: ['Logo lapel pins for employees and teams', 'Years-of-service and recognition pins', 'Event and trade-show pins', 'Emblems for products and packaging'],
    },
    specs: [R.pinPosts, R.enamel, R.plating, R.metals, R.dieStrike, R.minimum, R.leadTime, R.origin, R.die],
    steps: strikeSteps(
      'Your logo is prepared for the dies, with brand colors marked.',
      'Pins are enamel-filled and plated by outside finishers, posts fused, and shipped.',
    ),
    faqs: [
      { q: 'How are pin posts attached?', a: pinPosts },
      {
        q: 'Can you match our brand colors?',
        a: 'Color is added with soft or hard enamel by outside finishers. Send your brand colors with the artwork.',
      },
      { q: 'Are your logo pins made overseas?', a: 'No. They are struck at our shop in Pawtucket, Rhode Island, USA.' },
    ],
    links: [
      { label: 'Awards', href: '/awards/' },
      { label: 'Medallions', href: '/medallions/' },
    ],
    quoteType: 'awards',
    custom: true,
    confidential: true,
  },

  {
    slug: 'religious-medals-emblems-manufacturer',
    group: 'Emblems, awards & organizations',
    h1: 'Religious medals and emblems manufacturer',
    metaTitle: 'Religious Medals & Emblems Manufacturer | Die Struck in USA',
    metaDescription:
      'Religious medals and emblems die struck in Pawtucket, RI since 1948. Up to 3.5″, sterling and gold with no minimum, engraving in-house, dies built in-house.',
    answer:
      'Mel-Co-Ed makes religious medals and emblems in Pawtucket, Rhode Island, where we have die struck metal since 1948. Medals are struck up to 3.5″ across from dies built in our own tool room, in sterling, gold, brass, nickel silver and more.',
    body: [
      'Die striking gives a medal the fine detail it needs: faces, lettering and borders that stay crisp, on a piece dense enough to wear every day.',
      `${ordering.noMinimum} Engraving and numbering are done in-house; plating, polishing and enamel fill are done by outside finishers.`,
    ],
    list: {
      heading: 'What we strike',
      items: ['Devotional medals', 'Emblems for religious goods suppliers', 'Commemorative medals for anniversaries and dedications', 'Custom designs on your own exclusive die'],
    },
    specs: [R.struck, R.metals, R.noMinimum, R.gold, R.engraving, R.finishing, R.leadTime, R.die],
    steps: strikeSteps(
      'Your design or an existing medal is prepared for the dies.',
      'Medals are engraved in-house if needed, finished by outside finishers, and shipped.',
    ),
    faqs: [
      { q: 'Can religious medals be made in sterling or gold?', a: `Yes, with no minimum order. ${ordering.pricing}` },
      { q: 'Who can order religious medals from you?', a: whoWeSellTo },
      { q: 'Can a medal be engraved on the back?', a: 'Yes. Engraving and numbering are done in-house.' },
    ],
    links: [
      { label: 'Medallions', href: '/medallions/' },
      { label: 'Products', href: '/products/' },
    ],
    quoteType: 'medallions',
    custom: true,
  },
];

export const resourceGroups: ResourceGroup[] = ['Stamping & manufacturing', 'Die striking & coining', 'Jewelry & findings', 'Emblems, awards & organizations'];

export const resourceHref = (r: Resource) => `/resources/${r.slug}/`;
export const dieOwnership = resources.find((r) => r.slug === 'who-owns-the-stamping-die')!;

/** Guides that link to a given page (hash ignored), for "Buyer guides" lists on service/product pages. */
export function guidesFor(path: string): Resource[] {
  return resources.filter((r) => r.links.some((l) => l.href.split('#')[0] === path));
}

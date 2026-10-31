// Confirmed business facts from the 2026 Mel-Co-Ed sell sheet. Pages read from here
// so each fact is stated once and identically everywhere (copy, specs, FAQ schema).

export const tagline = 'Coined. Die struck. Stamped. Finished in-house.';

export const materials = [
  'Brass (230/260)',
  'Copper',
  'Nickel silver',
  'Sterling silver',
  'Fine silver',
  'Gold & gold filled',
  'Stainless steel',
  'Aluminum',
  'Cold-rolled steel',
  'Zinc',
];
export const materialsNote = 'All metals available, or send us yours.';
export const materialsLine = `${materials.join(', ')}. ${materialsNote}`;

export const finishes = ['High polish', 'Satin', 'Sandblast', 'Antique', 'Color fill'];
export const plating = ['Gold', 'Karat gold', 'Silver', 'Imitation rhodium'];
export const finishesLine = `${finishes.join(', ')}. Plating: ${plating.map((p) => p.toLowerCase()).join(', ')}.`;

export const dieStriking = { maxDiameter: '3.5″', maxThickness: '.250″' };
export const dieStrikingLine = `Die striking up to ${dieStriking.maxDiameter} diameter and up to ${dieStriking.maxThickness} thick`;

export const ordering = {
  minimum: '3 gross (432 pieces) per item',
  smallRuns: 'Smaller runs are available at a higher price.',
  noMinimum: 'No minimums on sterling silver or gold.',
  leadTime: '3–8 weeks',
  pricing: 'Pricing is quoted at the time of order, based on current metal prices.',
  custom: 'Custom work is quoted per job.',
};
export const minimumLine = `${ordering.minimum}. ${ordering.smallRuns} ${ordering.noMinimum}`;
export const leadTimeLine = `Typically ${ordering.leadTime}`;

export const waysToBuy = [
  {
    name: 'Open Line',
    summary: 'More than 30,000 stock findings, stampings and pattern stock, ready to run. No tooling cost.',
  },
  {
    name: 'Confined & Custom',
    summary: 'Your design on your own exclusive die, run only for you. Have dies or metal already? We’ll run yours.',
  },
];

export const process = [
  { n: '01', title: 'Design', body: 'Your artwork, print or sample, prepared for tooling.' },
  { n: '02', title: 'Tool & Die', body: 'Dies built and maintained in our own tool room.' },
  {
    n: '03',
    title: 'Coin, Strike & Stamp',
    body: 'Coining, die striking, and progressive, transfer and automatic stamping.',
  },
  { n: '04', title: 'Finish & Ship', body: 'Polished, plated, assembled, packed and shipped from Pawtucket.' },
];

export const processesLine =
  'Coining, die striking, and progressive, transfer and automatic stamping, with dies built and maintained in our own tool room';

// ---- Owner-confirmed shop facts (2026 Q&A) ----

export const presses = {
  automatic: '25 to 250 tons',
  secondary: '5 to 25 tons',
  total: '20+',
};
export const pressesLine = `${presses.total} presses: automatic department ${presses.automatic}, secondary department ${presses.secondary}`;

export const stampingThickness = '.010″ to .250″';
export const stampingThicknessLine = `Stamping stock ${stampingThickness} thick`;
export const tolerance = '±.002″';
export const toleranceLine = `${tolerance} typical`;

export const inHouse = ['Tool and die', 'Stamping', 'Die striking', 'Coining', 'Soldering and assembly', 'Engraving and numbering'];
export const outsourced = ['Plating', 'Polishing', 'Enamel and epoxy fill'];
export const inHouseLine = `In-house: ${inHouse.join(', ').toLowerCase()}.`;
export const outsourcedLine = 'Plating, polishing and enamel or epoxy fill are done by outside finishers.';
export const pinPosts = 'Pin posts are fused, never soldered.';
export const enamel = 'Soft and hard enamel';

export const madeHere = 'Every finding is made in Pawtucket. Nothing is imported.';
export const whoWeSellTo = 'We sell to businesses and small designers. Minimums apply.';
export const gold = ['Gold filled', 'Solid 10K, 14K and 18K gold', 'Karat gold plating', 'Customer-supplied gold'];
export const goldLine = `${gold.join('; ')}.`;

export const tooling = {
  ownership: 'You own the die you pay for, and you can take it anywhere.',
  storage: 'We store your die free, indefinitely.',
  billing: 'Tooling is billed separately or built into the piece price, your choice.',
  leadTime: 'The 3–8 week lead time includes building a new die.',
  shortRun: 'Prototypes and low-cost short-run tooling are available.',
};

export const edgeFinishes = 'Ask us about edge finishes.';
export const bandingWidths = 'Ask us about widths for your project.';
export const badgeAuthorization = 'Authorization is verified before any law-enforcement badge order.';

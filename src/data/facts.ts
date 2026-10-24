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

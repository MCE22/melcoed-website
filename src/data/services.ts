// Services: what the shop does, independent of product or industry. Drives the
// Services menu and the Home "Services" tiles. Metal Stamping is the lead service.

import type { PhotoSlotName } from './photos';

export type Service = {
  label: string;
  href: string;
  summary: string;
  /** Photo for the Home tile: first photo of this slot, or a specific index. */
  photo: { slot: PhotoSlotName; index?: number };
  /** Show as a Home tile (Home shows six). */
  home?: boolean;
};

export const services: Service[] = [
  {
    label: 'Metal Stamping',
    href: '/metal-stamping/',
    summary: 'Progressive, transfer and automatic stamping, blanking and forming, built to print.',
    photo: { slot: 'metal-stamping' },
  },
  {
    label: 'Die Striking & Coining',
    href: '/capabilities/#die-striking',
    summary: 'Sharp relief struck between engraved steel dies, up to 3.5″ across.',
    photo: { slot: 'die-striking' },
  },
  {
    label: 'Tooling',
    href: '/capabilities/#tooling',
    summary: 'Dies designed, built and maintained in our own tool room.',
    photo: { slot: 'tooling' },
  },
  {
    label: 'Finishing',
    href: '/capabilities/#finishing',
    summary: 'High polish to antique, plating and enamel fill through outside finishers, or shipped raw.',
    photo: { slot: 'industries' },
  },
  {
    label: 'CNC Milling',
    href: '/capabilities/#milling',
    summary: 'CNC machining for die work and secondary operations.',
    photo: { slot: 'cnc-milling' },
  },
  {
    label: 'Product Development',
    href: '/capabilities/product-development/',
    summary: 'Sketch, drawing or sample to a production die that is yours alone.',
    photo: { slot: 'product-development' },
  },
  {
    label: 'Packaging & Drop Shipping',
    href: '/capabilities/#packaging',
    summary: 'Packaging and assembly, UPC and RFID tagging, and drop shipping to your customers.',
    photo: { slot: 'packaging' },
    home: false,
  },
];

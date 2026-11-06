// Customer testimonials: three slots. The section stays hidden until at least one is filled.
// First name, industry and city only (no company names: customer work is confidential).
// TODO: add up to three testimonials (with the customer's OK to publish).

export type Testimonial = { quote: string; firstName: string; industry: string; city: string };

export const testimonials: Testimonial[] = [
  { quote: '', firstName: '', industry: '', city: '' },
  { quote: '', firstName: '', industry: '', city: '' },
  { quote: '', firstName: '', industry: '', city: '' },
];

export const publishedTestimonials = testimonials.filter((t) => t.quote.trim() && t.firstName.trim());

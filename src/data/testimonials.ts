export interface Testimonial {
    name: string;
    role: string;
    text: string;
    // e.g. the person's LinkedIn profile or the LinkedIn recommendation itself
    link?: string;
}

// The Testimonials section stays hidden while this list is empty.
// Only add quotes from real, named people who agreed to be quoted.
export const testimonialsData: Testimonial[] = [];

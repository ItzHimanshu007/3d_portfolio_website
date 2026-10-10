import { getLenis } from './lenis';

/**
 * Smooth-scrolls to a section by id, using Lenis when it is running. Returns false if the section is missing.
 * The navbar offset comes from `scroll-margin-top` on sections (index.css), which Lenis and scrollIntoView both honour.
 */
export const scrollToSection = (id: string): boolean => {
    const element = document.getElementById(id);
    if (!element) return false;

    const lenis = getLenis();
    if (lenis) {
        lenis.scrollTo(element);
    } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    return true;
};

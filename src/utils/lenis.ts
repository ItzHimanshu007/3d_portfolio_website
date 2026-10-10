import type Lenis from 'lenis';

// The app-wide smooth-scroll instance, created in Layout.
// Kept here rather than on `window.lenis`, which Lenis itself uses for version metadata.
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
    instance = lenis;
};

export const getLenis = () => instance;

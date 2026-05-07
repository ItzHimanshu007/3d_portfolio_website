import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const location = useLocation();
    const { pathname, state } = location;

    useEffect(() => {
        // If we have a target section to scroll to, let the page handle it
        if ((state as any)?.scrollTo) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const lenis = (window as any).lenis;
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }

        // Handle native scroll as fallback
        window.scrollTo(0, 0);
    }, [pathname, state]);

    return null;
};

export default ScrollToTop;

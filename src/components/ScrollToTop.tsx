import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLenis } from '../utils/lenis';

const ScrollToTop = () => {
    const location = useLocation();
    const { pathname, state } = location;

    useEffect(() => {
        // If we have a target section to scroll to, let the page handle it
        if ((state as { scrollTo?: string } | null)?.scrollTo) return;

        getLenis()?.scrollTo(0, { immediate: true });

        // Handle native scroll as fallback
        window.scrollTo(0, 0);
    }, [pathname, state]);

    return null;
};

export default ScrollToTop;

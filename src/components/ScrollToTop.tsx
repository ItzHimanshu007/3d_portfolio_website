import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Handle Lenis scroll
        if ((window as any).lenis) {
            (window as any).lenis.scrollTo(0, { immediate: true });
        }

        // Handle native scroll as fallback
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;

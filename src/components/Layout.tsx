import React, { useEffect } from 'react';
import Lenis from 'lenis';
import '../types/global.d.ts';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 2.0,
            infinite: false,
        });
        (window as any).lenis = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            (window as any).lenis = undefined;
        };
    }, []);

    return <div>{children}</div>;
};

export default Layout;


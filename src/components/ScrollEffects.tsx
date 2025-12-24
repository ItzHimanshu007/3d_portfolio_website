import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import './ScrollEffects.css';

const ScrollEffects = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Add smooth scroll behavior
    useEffect(() => {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const href = anchor.getAttribute('href');
                if (href && href !== '#') {
                    const element = document.querySelector(href);
                    if (element) {
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }, []);

    return (
        <motion.div
            className="scroll-progress"
            style={{ scaleX }}
        />
    );
};

export default ScrollEffects;

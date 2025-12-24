import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './SectionTransitions.css';

const SectionTransitions = () => {
    const { scrollYProgress } = useScroll();

    // Add reveal animations on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section-revealed');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '-50px'
            }
        );

        const sections = document.querySelectorAll('section');
        sections.forEach((section) => {
            section.classList.add('section-reveal');
            observer.observe(section);
        });

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    return (
        <>
            {/* Transition overlay effects */}
            <motion.div
                className="transition-line transition-line-1"
                style={{
                    scaleY: useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 1, 0, 1, 0, 1])
                }}
            />
            <motion.div
                className="transition-line transition-line-2"
                style={{
                    scaleY: useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 0.9, 1], [0, 1, 0, 1, 0, 1])
                }}
            />
        </>
    );
};

export default SectionTransitions;

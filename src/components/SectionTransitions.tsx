import { useEffect } from 'react';
import './SectionTransitions.css';

const SectionTransitions = () => {

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

    return null;
};

export default SectionTransitions;

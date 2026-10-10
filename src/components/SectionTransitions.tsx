import { useEffect } from 'react';
import './SectionTransitions.css';

const SectionTransitions = () => {

    // Fade sections in as they enter the viewport. Triggers on the first visible pixel (threshold 0):
    // a ratio threshold can be skipped entirely on very tall sections (e.g. 4000px+ on phones),
    // which would leave them invisible.
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section-revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0,
                rootMargin: '0px 0px -10% 0px'
            }
        );

        const sections = document.querySelectorAll('section');
        sections.forEach((section) => {
            section.classList.add('section-reveal');
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return null;
};

export default SectionTransitions;

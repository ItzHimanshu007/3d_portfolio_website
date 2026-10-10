import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonialsData } from '../data/testimonials';
import './Testimonials.css';

const Testimonials: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    if (testimonialsData.length === 0) return null;

    return (
        <section className="testimonials-section" ref={sectionRef} id="testimonials">
            <div className="container">
                <motion.div
                    className="testimonials-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <div className="premium-badge">
                        <Quote size={16} />
                        <span>Testimonials</span>
                    </div>
                    <h2 className="premium-main-title">
                        What People <br /><span>Say</span>
                    </h2>
                </motion.div>

                <div className="testimonials-grid">
                    {testimonialsData.map((t, idx) => (
                        <motion.figure
                            key={t.name}
                            className="testimonial-card"
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 + idx * 0.15, duration: 0.6 }}
                        >
                            <blockquote className="testimonial-text">"{t.text}"</blockquote>
                            <figcaption className="testimonial-author">
                                <div className="testimonial-avatar" aria-hidden="true">
                                    {t.name.charAt(0)}
                                </div>
                                <div className="testimonial-info">
                                    {t.link ? (
                                        <a href={t.link} target="_blank" rel="noopener noreferrer" className="testimonial-name">{t.name}</a>
                                    ) : (
                                        <span className="testimonial-name">{t.name}</span>
                                    )}
                                    <span className="testimonial-role">{t.role}</span>
                                </div>
                            </figcaption>
                        </motion.figure>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

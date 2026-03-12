import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import './Testimonials.css';

interface Testimonial {
    name: string;
    role: string;
    text: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        name: 'Team Lead',
        role: 'Cognifyz Technologies',
        text: 'Himanshu demonstrated exceptional skills in ML model development. His ability to translate complex requirements into working solutions is remarkable.',
        rating: 5,
    },
    {
        name: 'Hackathon Judge',
        role: 'HackTheVerse',
        text: 'The Neuronest project showed incredible innovation — combining AI with VR for mental health is exactly the kind of impactful thinking we look for.',
        rating: 5,
    },
    {
        name: 'Project Collaborator',
        role: 'Open Source Contributor',
        text: 'Working with Himanshu on full-stack projects was a great experience. He brings energy, clean code, and a deep understanding of modern web technologies.',
        rating: 5,
    },
];

const Testimonials: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

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
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={idx}
                            className="testimonial-card"
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 + idx * 0.15, duration: 0.6 }}
                        >
                            <div className="testimonial-stars">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} size={14} fill="#ff3333" color="#ff3333" />
                                ))}
                            </div>
                            <p className="testimonial-text">"{t.text}"</p>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar">
                                    {t.name.charAt(0)}
                                </div>
                                <div className="testimonial-info">
                                    <span className="testimonial-name">{t.name}</span>
                                    <span className="testimonial-role">{t.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

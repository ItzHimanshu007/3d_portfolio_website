import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ExternalLink, Calendar, ShieldCheck, Sparkles } from 'lucide-react';
import './Certificates.css';

const Certificates: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    const certificateData = [
        {
            id: 1,
            title: "Machine Learning Masterclass",
            issuer: "Google Cloud",
            date: "Dec 2024",
            description: "Advanced certification covering deep learning, neural networks, and production ML pipelines.",
            skills: ["TensorFlow", "PyTorch", "GCP"],
            link: "#"
        },
        {
            id: 2,
            title: "Full Stack Development",
            issuer: "Meta",
            date: "Nov 2024",
            description: "Comprehensive program focused on modern web architecture and scalable cloud solutions.",
            skills: ["React", "Node.js", "System Design"],
            link: "#"
        }
    ];

    return (
        <section className="certificates-stunning-section" id="certificates" ref={sectionRef}>
            <div className="section-background-elements">
                <div className="gradient-sphere-1"></div>
                <div className="gradient-sphere-2"></div>
            </div>

            <div className="container">
                <motion.div
                    className="certificates-header-premium"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="premium-badge">
                        <Sparkles size={16} />
                        <span>Achievements</span>
                    </div>
                    <h2 className="premium-main-title">
                        Professional <br /><span>Certifications</span>
                    </h2>
                    <p className="section-subtitle-premium">
                        Validated expertise across multiple tech domains and innovation fields.
                    </p>

                    <div className="cert-mascot-container">
                        <img src="/mascot-cert.png" alt="Mascot" className="cert-mascot-img" loading="lazy" decoding="async" />
                    </div>
                </motion.div>

                <div className="certificates-grid-premium">
                    {certificateData.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            className="premium-cert-card-wrapper"
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <div className="premium-cert-card">
                                <div className="holographic-overlay"></div>
                                <div className="card-inner-glow"></div>

                                <div className="cert-top-row">
                                    <div className="cert-icon-box-stunning">
                                        <Award size={32} />
                                    </div>
                                    <div className="cert-badge-stunning">
                                        <ShieldCheck size={14} />
                                        <span>Verified</span>
                                    </div>
                                </div>

                                <div className="cert-content-stunning">
                                    <div className="cert-meta-info">
                                        <div className="meta-item-stunning">
                                            <Calendar size={14} />
                                            <span>{cert.date}</span>
                                        </div>
                                    </div>
                                    <h3 className="cert-title-premium-text">{cert.title}</h3>
                                    <h4 className="cert-issuer-premium-text">{cert.issuer}</h4>
                                    <p className="cert-description-premium-text">{cert.description}</p>

                                    <div className="cert-skills-row">
                                        {cert.skills.map((skill, i) => (
                                            <span key={i} className="cert-skill-tag">{skill}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="cert-footer-stunning">
                                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-primary-btn">
                                        <span>View Certificate</span>
                                        <ExternalLink size={18} />
                                    </a>
                                    <button className="cert-secondary-btn">
                                        <Sparkles size={18} />
                                    </button>
                                </div>

                                <div className="card-decoration-lines">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certificates;

import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { experienceData } from '../data/experience';
import './Experience.css';

export default function Experience() {
    return (
        <section className="experience-section" id="experience">
            <div className="container">
                <motion.div
                    className="experience-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="premium-badge">
                        <Briefcase size={16} />
                        <span>Experience</span>
                    </div>
                    <h2 className="premium-main-title">
                        Experience & <br /><span>Leadership</span>
                    </h2>
                </motion.div>

                <ol className="experience-list">
                    {experienceData.map((entry, idx) => (
                        <motion.li
                            key={entry.role}
                            className="experience-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: idx * 0.08 }}
                        >
                            <div className="experience-card-top">
                                <div>
                                    <h3 className="experience-role">{entry.role}</h3>
                                    <p className="experience-org">{entry.organization}</p>
                                </div>
                                {entry.period && (
                                    <span className={`experience-period ${entry.current ? 'current' : ''}`}>
                                        {entry.period}
                                    </span>
                                )}
                            </div>
                            <p className="experience-desc">{entry.description}</p>
                            {entry.highlights.length > 0 && (
                                <ul className="experience-highlights">
                                    {entry.highlights.map((h) => (
                                        <li key={h}>{h}</li>
                                    ))}
                                </ul>
                            )}
                        </motion.li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

import { motion, type Variants } from 'framer-motion';
import { Compass } from 'lucide-react';
import './Values.css';

const valuesData = [
    {
        title: 'INNOVATION',
        desc: 'Turning hackathon prototypes into working products, from VR exposure therapy to flood prediction.',
        badge: '01 / R&D'
    },
    {
        title: 'PRECISION',
        desc: 'Careful engineering: reliable data pipelines, race-condition-safe systems, and clean interfaces.',
        badge: '02 / DEV'
    },
    {
        title: 'PASSION',
        desc: 'Building technology for real problems in mental health, civic resilience, and healthcare access.',
        badge: '03 / IMPACT'
    },
    {
        title: 'FUTURE',
        desc: 'Always learning, currently going deep on agentic AI, geospatial ML, and modern full-stack tooling.',
        badge: '04 / GROWTH'
    }
];

const titleVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04 } }
};

const charVariants: Variants = {
    hidden: { opacity: 0, y: 24, rotateX: -60 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

export default function Values() {
    return (
        <section className="values-kinetic-section" id="philosophy">
            <div className="kinetic-background-grid" aria-hidden="true"></div>
            <div className="outer-glow-vignette" aria-hidden="true"></div>

            <div className="container values-container">
                <motion.div
                    className="values-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="premium-badge">
                        <Compass size={16} />
                        <span>How I Work</span>
                    </div>
                    <h2 className="premium-main-title">
                        What Drives <br /><span>My Work</span>
                    </h2>
                </motion.div>

                <div className="values-grid">
                    {valuesData.map((value, idx) => (
                        <motion.article
                            key={value.title}
                            className="value-card"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                        >
                            <span className="value-badge-kinetic">{value.badge}</span>
                            <motion.h3
                                className="kinetic-title-wrapper"
                                aria-label={value.title}
                                variants={titleVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.6 }}
                            >
                                {value.title.split('').map((char, i) => (
                                    <motion.span key={i} className="kinetic-char" variants={charVariants} aria-hidden="true">
                                        {char}
                                    </motion.span>
                                ))}
                            </motion.h3>
                            <p className="desc-content">{value.desc}</p>
                            <span className="desc-progress-line" aria-hidden="true" />
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}

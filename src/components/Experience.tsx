import { useRef } from 'react';
import { motion, useInView, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';
import { Briefcase, MapPin, Sparkles } from 'lucide-react';
import './Experience.css';

const experiences = [
    {
        id: 1,
        year: '2024',
        role: 'Founder',
        company: 'Neuronest',
        location: 'India',
        description: 'Leading development of an AI + VR adaptive therapy platform targeting PTSD, phobias, and anxiety disorders using biofeedback-driven personalization.',
        achievements: [
            'Winner of HACKSTORM \'25 among 250+ teams',
            'Winner of IDEA-THON \'25 among 160+ teams',
            'Validated prototype with mental health professionals; exploring pilot deployment'
        ],
        current: true
    }
];

export default function Experience() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start end", "end end"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section className="experience-premium-section" id="experience" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="experience-header-premium"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="premium-badge">
                        <Sparkles size={16} />
                        <span>Professional Journey</span>
                    </div>
                    <h2 className="premium-main-title">
                        Career <br /><span>Journey</span>
                    </h2>
                </motion.div>

                <div className="experience-timeline-premium" ref={timelineRef}>
                    <div className="timeline-line-bg"></div>
                    <motion.div
                        className="timeline-line-active"
                        style={{ scaleY, transformOrigin: "top" }}
                    />

                    {/* Floating Glow Head */}
                    <motion.div
                        className="timeline-progress-head"
                        style={{
                            top: useTransform(scaleY, [0, 1], ["0%", "100%"]),
                            opacity: useTransform(scaleY, [0, 0.05], [0, 1])
                        }}
                    />

                    {experiences.map((exp, idx) => (
                        <ExperienceItem key={exp.id} exp={exp} index={idx} total={experiences.length} progress={scrollYProgress} />
                    ))}
                </div>
            </div>
        </section>
    );
}

const ExperienceItem = ({ exp, index, total, progress }: { exp: typeof experiences[0], index: number, total: number, progress: MotionValue<number> }) => {
    const itemRef = useRef<HTMLDivElement>(null);
    // Calculate when this specific dot should light up based on its index
    const threshold = index / (total - 0.5);
    const isIgnited = useTransform(progress, [threshold - 0.05, threshold], [0, 1]);
    const dotOpacity = useSpring(isIgnited, { stiffness: 100, damping: 20 });

    return (
        <motion.div
            ref={itemRef}
            className={`experience-item-premium ${index % 2 === 0 ? 'left' : 'right'}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            <div className="timeline-dot-wrapper">
                <motion.div
                    className="timeline-dot-active"
                    style={{ opacity: dotOpacity, scale: dotOpacity }}
                />
                <div className="timeline-dot-bg"></div>
            </div>

            <div className="experience-card-premium">
                <div className="card-glass-bg"></div>
                <div className="card-glowing-border"></div>

                {/* Tech Corners */}
                <div className="tech-corner tl"></div>
                <div className="tech-corner tr"></div>
                <div className="tech-corner bl"></div>
                <div className="tech-corner br"></div>

                <div className="card-content-relative">
                    <div className="card-top-row">
                        <div className="card-year-badge">{exp.year}</div>
                        <div className="card-company-meta">
                            <div className="meta-item">
                                <MapPin size={14} />
                                <span>{exp.location}</span>
                            </div>
                        </div>
                    </div>

                    <h3 className="card-role">{exp.role}</h3>

                    <div className="card-company-display">
                        <Briefcase size={16} className="company-icon" />
                        <span className="company-name">{exp.company}</span>
                    </div>

                    <p className="card-desc">{exp.description}</p>

                    <ul className="card-achievements">
                        {exp.achievements.map((ach, aIdx) => (
                            <li key={aIdx}>{ach}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
};

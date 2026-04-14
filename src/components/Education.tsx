import { useRef } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import { GraduationCap, Book, MapPin, Library, Zap } from 'lucide-react';
import './Education.css';

const educationData = [
    {
        id: 1,
        degree: 'Bachelor of Technology in Artificial Intelligence and Data Science',
        school: 'Arya College of Engineering and IT, Jaipur',
        type: 'Rajasthan Technical University',
        year: 'Aug 2024 - May 2028',
        location: 'Jaipur, Rajasthan',
        grade: 'CGPA: 9.2/10',
        courses: ['Artificial Intelligence', 'Data Science', 'Machine Learning', 'Neural Networks'],
        icon: <Zap size={24} />,
        image: '/character-college.png'
    },
    {
        id: 2,
        degree: 'Senior Secondary (Class 12)',
        school: 'Vadanta International School, Jaipur',
        type: 'CBSE Board',
        year: '2022 - 2024',
        location: 'Jaipur, Rajasthan',
        grade: 'Excellence',
        courses: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
        icon: <Book size={24} />,
        image: '/character-high-school.png'
    },
    {
        id: 3,
        degree: 'Secondary Education',
        school: 'Vadanta International School, Jaipur',
        type: 'CBSE Board',
        year: '2020 - 2022',
        location: 'Jaipur, Rajasthan',
        grade: 'Distinction',
        courses: ['Science', 'Mathematics', 'English', 'Social Science'],
        icon: <Library size={24} />,
        image: '/character-middle-school.png'
    }
];

const KnowledgeMilestone = ({ edu, index }: { edu: typeof educationData[0], index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <div ref={ref} className={`edu-milestone ${index % 2 === 0 ? 'left' : 'right'}`}>
            <motion.div
                className="milestone-content"
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60, scale: 0.9 }}
                animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="edu-card-glass">
                    <div className="edu-card-header">
                        <div className="milestone-icon-wrap">
                            {edu.icon}
                        </div>
                        <div className="milestone-meta">
                            <span className="milestone-year">{edu.year}</span>
                            <span className="milestone-type">{edu.type}</span>
                        </div>
                    </div>

                    <div className="milestone-body">
                        <h3 className="milestone-degree">{edu.degree}</h3>
                        <p className="milestone-school">{edu.school}</p>

                        <div className="milestone-footer">
                            <div className="footer-item">
                                <MapPin size={12} />
                                <span>{edu.location}</span>
                            </div>
                            <div className="footer-item grade-badge">
                                <span>{edu.grade}</span>
                            </div>
                        </div>

                        <div className="milestone-courses">
                            {edu.courses.map((course, idx) => (
                                <span key={idx} className="milestone-tag">{course}</span>
                            ))}
                        </div>
                    </div>

                    <div className="card-hud-lines"></div>
                </div>

                {/* Academic Mascot */}
                <motion.div
                    className="milestone-mascot-container"
                    initial={{ opacity: 0, scale: 0.8, x: index % 2 === 0 ? 50 : -50 }}
                    animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    <img src={edu.image} alt="Student Mascot" className="milestone-mascot-img" />
                    <div className="mascot-platform-glow"></div>
                </motion.div>
            </motion.div>

            <div className="milestone-connector">
                <motion.div
                    className="connector-dot"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                >
                    <div className="dot-pulse"></div>
                </motion.div>
            </div>
        </div>
    );
};

export default function Education() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section className="education-premium-section" id="education" ref={containerRef}>
            <div className="edu-journey-bg">
                <div className="journey-grid"></div>
                <div className="journey-glow"></div>
            </div>

            <div className="container">
                <div className="education-header-main">
                    <motion.div
                        className="premium-badge"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <GraduationCap size={16} />
                        <span>Ascending Knowledge Path</span>
                    </motion.div>
                    <motion.h2
                        className="premium-main-title"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Academic <br /><span>Journey</span>
                    </motion.h2>
                </div>

                <div className="edu-journey-timeline">
                    {/* The Path Line */}
                    <div className="knowledge-path-track">
                        <motion.div
                            className="knowledge-path-fill"
                            style={{ scaleY, transformOrigin: "top" }}
                        />
                    </div>

                    <div className="milestones-container">
                        {educationData.map((edu, idx) => (
                            <KnowledgeMilestone
                                key={edu.id}
                                edu={edu}
                                index={idx}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

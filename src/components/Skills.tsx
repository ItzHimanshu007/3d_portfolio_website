import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Database, Terminal, Cpu, Layout, Sparkles, Layers } from 'lucide-react';
import './Skills.css';

const skillsData = [
    {
        icon: Code2,
        title: 'Frontend Engineering',
        desc: 'Architecting pixel-perfect, responsive interfaces with state-of-the-art libraries.',
        tags: ['React', 'Next.js', 'Three.js', 'Tailwind CSS', 'Framer Motion']
    },
    {
        icon: Terminal,
        title: 'Backend Systems',
        desc: 'Building robust, scalable server-side solutions and API ecosystems.',
        tags: ['Node.js', 'Express', 'Python', 'Go', 'GraphQL']
    },
    {
        icon: Cpu,
        title: 'Machine Learning',
        desc: 'Training predictive models and deploying intelligent agents.',
        tags: ['TensorFlow', 'PyTorch', 'Computer Vision', 'NLP', 'Scikit-learn']
    },
    {
        icon: Database,
        title: 'Data Infrastructure',
        desc: 'Optimizing data storage, retrieval, and complex query performance.',
        tags: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma ORM']
    },
    {
        icon: Layout,
        title: 'UI/UX Design',
        desc: 'Crafting intuitive user journeys and high-fidelity prototypes.',
        tags: ['Figma', 'User Research', 'Prototyping', 'Design Systems']
    },
    {
        icon: Layers,
        title: 'DevOps & Tools',
        desc: 'Streamlining deployment pipelines and ensuring system reliability.',
        tags: ['Docker', 'AWS', 'Git', 'CI/CD', 'Linux']
    }
];

const SkillCard = ({ skill, index }: { skill: typeof skillsData[0], index: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="skill-card-tech"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="tech-card-bg"></div>
            <div className={`tech-card-glow ${isHovered ? 'active' : ''}`}></div>

            <div className="tech-card-header">
                <div className={`tech-icon-box ${isHovered ? 'active' : ''}`}>
                    <skill.icon size={26} strokeWidth={1.5} />
                </div>
                <div className="tech-header-line"></div>
            </div>

            <h3 className="tech-title">{skill.title}</h3>
            <p className="tech-desc">{skill.desc}</p>

            <div className="tech-tags-grid">
                {skill.tags.map((tag, idx) => (
                    <motion.span
                        key={idx}
                        className="tech-tag-pill"
                        animate={{
                            backgroundColor: isHovered ? 'rgba(255, 51, 51, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                            borderColor: isHovered ? 'rgba(255, 51, 51, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        }}
                    >
                        {tag}
                    </motion.span>
                ))}
            </div>

            {/* Decorative circuit lines */}
            <div className="circuit-lines">
                <div className="c-line l1"></div>
                <div className="c-line l2"></div>
            </div>
        </motion.div>
    );
};

const Skills: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    return (
        <section className="skills-tech-section" ref={sectionRef} id="skills">
            <div className="tech-grid-bg"></div>

            <div className="container">
                <motion.div
                    className="skills-header-premium"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="premium-badge">
                        <Sparkles size={16} />
                        <span>Command Center</span>
                    </div>
                    <h2 className="premium-main-title">
                        My Creative <br /><span>Tech Stack</span>
                    </h2>

                    {/* Mascot relocated to header */}
                    <motion.div
                        className="skills-mascot-container"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <img src="/character-peace-laptop.png" alt="Skills Mascot" className="skills-mascot-img" />
                        <div className="skills-badge-float">
                            <span>READY TO BUILD</span>
                        </div>
                    </motion.div>
                </motion.div>

                <div className="tech-grid-layout">
                    {skillsData.map((skill, index) => (
                        <SkillCard key={index} skill={skill} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;

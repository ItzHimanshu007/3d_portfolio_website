import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Database, Terminal, Cpu, Sparkles, Layers } from 'lucide-react';
import './Skills.css';

const skillsData = [
    {
        icon: Terminal,
        title: 'Languages',
        desc: 'Proficient in a wide range of programming languages for various paradigms.',
        tags: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'SQL']
    },
    {
        icon: Cpu,
        title: 'Machine Learning & AI',
        desc: 'Building and deploying intelligent systems using state-of-the-art frameworks.',
        tags: ['Scikit-learn', 'Pandas', 'NumPy', 'TensorFlow', 'Computer Vision']
    },
    {
        icon: Sparkles,
        title: 'Agentic AI',
        desc: 'Designing autonomous workflows and multi-agent systems using LLMs.',
        tags: ['LLM-based Agents', 'Prompt Engineering', 'Multi-Agent Systems', 'Autonomous Workflows']
    },
    {
        icon: Code2,
        title: 'Web Development',
        desc: 'Crafting responsive and scalable full-stack web applications.',
        tags: ['React.js', 'Node.js', 'Express.js', 'REST APIs']
    },
    {
        icon: Database,
        title: 'Databases',
        desc: 'Optimizing data storage and management across various database systems.',
        tags: ['MySQL', 'PostgreSQL', 'MongoDB']
    },
    {
        icon: Layers,
        title: 'Tools & Platforms',
        desc: 'Utilizing modern tools and platforms for efficient development and collaboration.',
        tags: ['Git', 'GitHub', 'Linux', 'Jupyter Notebook']
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

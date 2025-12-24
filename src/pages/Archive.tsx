import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { projectsData } from '../data/projects';
import './Archive.css';

const TimelineItem = ({ project, index, mouseX, mouseY }: { project: any, index: number, mouseX: any, mouseY: any }) => {
    const navigate = useNavigate();
    const isLeft = index % 2 === 0;
    const itemRef = useRef(null);

    // Character rotation based on mouse
    const rotateX = useTransform(mouseY, [0, 800], [10, -10]);
    const rotateY = useTransform(mouseX, [0, 1200], [-15, 15]);

    const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
    const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });

    return (
        <div className={`timeline-item ${isLeft ? 'left' : 'right'}`} ref={itemRef}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                mouseX.set(e.clientX - rect.left);
                mouseY.set(e.clientY - rect.top);
            }}
        >
            <div className="timeline-dot-wrapper">
                <div className="timeline-dot">
                    <div className="timeline-dot-inner" />
                    <div className="timeline-dot-glow" />
                </div>
                <div className="timeline-year">{project.year}</div>
            </div>

            <div className="timeline-content-grid">
                {/* Project Card */}
                <motion.div
                    className="timeline-card-wrapper"
                    initial={{ opacity: 0, x: isLeft ? -100 : 100, rotateY: isLeft ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                        type: "spring",
                        stiffness: 50,
                        damping: 20,
                        duration: 0.8
                    }}
                >
                    <div className="project-card-premium" onClick={() => navigate(`/project/${project.id}`)}>
                        <div className="card-image-container">
                            <img src={project.image} alt={project.title} className="card-image" />
                            <div className="card-overlay" />
                            <div className="card-category">{project.category}</div>
                        </div>

                        <div className="card-content">
                            <h3 className="card-title">{project.title}</h3>
                            <p className="card-subtitle">{project.subtitle}</p>
                            <p className="card-description">{project.description}</p>

                            <div className="card-tech-stack">
                                {project.tech.slice(0, 3).map((t: string) => (
                                    <span key={t} className="tech-tag">{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Character Mascot */}
                <motion.div
                    className="timeline-vinyl-toy"
                    style={{
                        rotateX: springRotateX,
                        rotateY: springRotateY,
                    }}
                    animate={{
                        y: [0, -15, 0],
                        rotateZ: [-1, 1, -1]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <img src="/character-vinyl.png" alt="Mascot" className="toy-image" />
                    <div className="toy-shadow" />
                </motion.div>
            </div>
        </div>
    );
};

const Archive = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const mouseX = useMotionValue(600);
    const mouseY = useMotionValue(400);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const spineScaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="archive-container" ref={containerRef}>
            <div className="archive-header">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="header-content"
                >
                    <span className="archive-label">MISSION LOGS</span>
                    <h1 className="archive-title">Project Archive</h1>
                    <p className="archive-description">
                        A chronological collection of digital artifacts, prototypes, and full-scale deployments.
                    </p>
                </motion.div>
            </div>

            <div className="timeline-journey">
                <div className="timeline-spine-track">
                    <motion.div
                        className="timeline-spine-progress"
                        style={{ scaleY: spineScaleY }}
                    />
                </div>

                <div className="timeline-items">
                    {projectsData.map((project, index) => (
                        <TimelineItem
                            key={project.id}
                            project={project}
                            index={index}
                            mouseX={mouseX}
                            mouseY={mouseY}
                        />
                    ))}
                </div>
            </div>

            <div className="archive-footer-simple">
                <div className="footer-line" />
                <button className="back-home-btn" onClick={() => navigate('/', { state: { scrollTo: 'projects' } })}>
                    RETURN TO HEADQUARTERS
                </button>
            </div>
        </div>
    );
};

export default Archive;

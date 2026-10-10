import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ExternalLink, Github, Sparkles, ChevronRight } from 'lucide-react';
import './Projects.css';

import { projectsData } from '../data/projects';
import { responsiveSrcSet, thumbnail } from '../utils/images';

const featuredProjects = projectsData.slice(0, 4);
const MotionLink = motion.create(Link);

export default function Projects() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <section id="projects" className="projects-premium-section" ref={sectionRef}>
            <div className="section-glow-top"></div>

            <div className="projects-container">
                {/* Header */}
                <motion.div
                    className="projects-header-premium"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <div className="premium-badge">
                        <Sparkles size={16} />
                        <span>Featured Work</span>
                    </div>
                    <h2 className="premium-main-title">Crafting Digital <br /><span>Excellence</span></h2>
                    <p className="premium-desc">
                        A selection of high-impact projects where design meets cutting-edge technology.
                    </p>
                </motion.div>

                {/* Interactive Cards Grid */}
                <motion.div
                    className="premium-projects-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {featuredProjects.map((project) => {
                        const Icon = project.IconComponent;
                        const isHovered = hoveredId === project.id;
                        const externalUrl = project.links.live ?? project.links.repo;

                        return (
                            <motion.div
                                key={project.id}
                                className="premium-project-card"
                                variants={cardVariants}
                                onHoverStart={() => setHoveredId(project.id)}
                                onHoverEnd={() => setHoveredId(null)}
                                whileHover={{
                                    y: -15,
                                    transition: { duration: 0.4, ease: "easeOut" }
                                }}
                            >
                                {/* card border glow effect */}
                                <div className={`card-border-animation ${isHovered ? 'active' : ''}`}></div>

                                <div className="project-card-inner">
                                    {/* Image Section */}
                                    <div className="project-media">
                                        <div className="image-wrapper">
                                            <motion.img
                                                src={thumbnail(project.image)}
                                                srcSet={responsiveSrcSet(project.image)}
                                                sizes="(max-width: 900px) 100vw, 50vw"
                                                alt={`${project.title} screenshot`}
                                                loading="lazy"
                                                decoding="async"
                                                animate={{
                                                    scale: isHovered ? 1.1 : 1,
                                                    filter: isHovered ? 'brightness(1.1)' : 'brightness(0.7)'
                                                }}
                                                transition={{ duration: 0.6 }}
                                            />
                                            <div className="image-overlay-gradient"></div>
                                        </div>

                                        <AnimatePresence>
                                            {isHovered && (
                                                <motion.div
                                                    className="icon-overlay"
                                                    initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                                    exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                                                    transition={{ duration: 0.4 }}
                                                >
                                                    <Icon size={48} strokeWidth={1.5} />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Content Section */}
                                    <div className="project-details-premium">
                                        <div className="project-title-row">
                                            <h3 className="project-name-premium">{project.title}</h3>
                                            <motion.div
                                                className="project-type-tag"
                                                animate={{
                                                    backgroundColor: isHovered ? '#e01e1e' : 'rgba(255, 51, 51, 0.1)',
                                                    color: isHovered ? '#fff' : '#ff3333'
                                                }}
                                            >
                                                {project.category}
                                            </motion.div>
                                        </div>

                                        <p className="project-description-premium">{project.description}</p>

                                        {/* Tech Stack */}
                                        <div className="tech-stack-premium">
                                            {project.tech.map((tech, idx) => (
                                                <motion.span
                                                    key={tech}
                                                    className="tech-pill"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                                    transition={{ delay: 0.5 + idx * 0.1 }}
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </div>

                                        <div className="project-footer-actions">
                                            <MotionLink
                                                to={`/project/${project.id}`}
                                                className="project-link-btn"
                                                whileHover={{ gap: '12px' }}
                                                aria-label={`View ${project.title} case study`}
                                            >
                                                <span>View Case Study</span>
                                                <ChevronRight size={18} />
                                            </MotionLink>
                                            {externalUrl && (
                                                <motion.a
                                                    href={externalUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="project-icon-btn"
                                                    aria-label={project.links.live ? `${project.title} live demo (opens in new tab)` : `${project.title} source code (opens in new tab)`}
                                                    whileHover={{ scale: 1.1, backgroundColor: '#e01e1e', color: '#fff' }}
                                                >
                                                    {project.links.live ? <ExternalLink size={18} /> : <Github size={18} />}
                                                </motion.a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Final CTA */}
                <motion.div
                    className="projects-cta-footer"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                >
                    <div className="cta-divider"></div>
                    <p>Curious to see more of my creative workspace?</p>
                    <MotionLink
                        to="/archive"
                        className="premium-view-all"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 51, 51, 0.6)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Browse Archive
                        <span className="btn-glow"></span>
                    </MotionLink>
                </motion.div>
            </div>

            <div className="section-glow-bottom"></div>
        </section>
    );
}

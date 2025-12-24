import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Calendar, Tag, Target, Lightbulb, ShieldCheck } from 'lucide-react';
import { projectsData } from '../data/projects';
import './ProjectDetail.css';

const ProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const project = projectsData.find(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="not-found-container">
                <h2>MISSION_ID_INVALID</h2>
                <p>The requested mission data could not be retrieved from the encrypted database.</p>
                <button onClick={() => navigate('/archive')}>RETURN TO ARCHIVE</button>
            </div>
        );
    }

    return (
        <div className="project-detail-page">
            <div className="detail-bg-accent" style={{ background: project.color + '10' }}></div>

            <motion.header
                className="detail-header"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {/* Background Image - Same as Hackathon Detail */}
                <div className="hero-visual-depth">
                    <img src={project.gallery[0]} alt={project.title} className="hero-main-img" />
                    <div className="hero-overlay-gradient"></div>
                </div>

                <div className="header-nav">
                    <button onClick={() => navigate(-1)} className="back-link">
                        <ArrowLeft size={18} />
                        <span>Return</span>
                    </button>
                    <div className="mission-status">
                        <span className="pulse-dot"></span>
                        MISSION_ESTABLISHED
                    </div>
                </div>

                <div className="header-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="detail-category">{project.category}</div>
                        <h1 className="detail-title">{project.title}</h1>
                        <p className="detail-subtitle">{project.subtitle}</p>
                    </motion.div>

                    <motion.div
                        className="header-meta"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="meta-item">
                            <Calendar size={16} />
                            <span>DEPLOYED: {project.year}</span>
                        </div>
                        <div className="meta-item">
                            <Tag size={16} />
                            <span>PHASE: COMPLETED</span>
                        </div>
                    </motion.div>
                </div>
            </motion.header>

            <main className="detail-content">
                <section className="briefing-section">
                    <div className="section-label">
                        <Target size={20} />
                        <span>TACTICAL BRIEFING</span>
                    </div>
                    <div className="briefing-grid">
                        <div className="brief-box main">
                            <h3>Overview</h3>
                            <p>{project.briefing}</p>
                        </div>
                        <div className="brief-box">
                            <div className="box-icon"><Lightbulb size={24} /></div>
                            <h3>The Challenge</h3>
                            <p>{project.challenge}</p>
                        </div>
                        <div className="brief-box">
                            <div className="box-icon"><ShieldCheck size={24} /></div>
                            <h3>The Solution</h3>
                            <p>{project.solution}</p>
                        </div>
                    </div>
                </section>

                <section className="tech-deployment">
                    <div className="section-label">
                        <span>TECH_STACK_DEPLOYED</span>
                    </div>
                    <div className="tech-tags-large">
                        {project.tech.map((t, idx) => (
                            <motion.span
                                key={t}
                                className="tech-tag-detailed"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + idx * 0.1 }}
                            >
                                {t}
                            </motion.span>
                        ))}
                    </div>
                </section>

                <section className="visual-recon">
                    <div className="section-label">
                        <span>VISUAL_RECONNAISSANCE</span>
                    </div>
                    <div className="gallery-grid">
                        {project.gallery.map((img, idx) => (
                            <motion.div
                                key={idx}
                                className="gallery-item"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <img src={img} alt={`${project.title} screenshot ${idx + 1}`} />
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="mission-actions">
                    <h3>ESTABLISH EXTERNAL LINK?</h3>
                    <div className="action-btns">
                        {project.links.github && (
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="action-btn github">
                                <Github size={20} />
                                <span>SOURCE_CODE</span>
                            </a>
                        )}
                        {project.links.live && (
                            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="action-btn live">
                                <ExternalLink size={20} />
                                <span>LIVE_OPERATION</span>
                            </a>
                        )}
                    </div>
                </section>
            </main>

            <footer className="detail-footer">
                <button onClick={() => navigate('/archive')} className="footer-nav-btn">
                    <ArrowLeft size={16} />
                    EXPLORE OTHER MISSIONS
                </button>
            </footer>
        </div>
    );
};

export default ProjectDetail;

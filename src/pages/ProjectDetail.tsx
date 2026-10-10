import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Calendar, Tag, Target, Lightbulb, ShieldCheck, Maximize2 } from 'lucide-react';
import { projectsData } from '../data/projects';
import { responsiveSrcSet, thumbnail } from '../utils/images';
import NotFound from './NotFound';
import Lightbox from '../components/Lightbox';
import './ProjectDetail.css';

const ProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const project = projectsData.find(p => p.id === id);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <NotFound
                title="Project not found"
                message="This project doesn't exist or has been renamed."
                backTo="/archive"
                backLabel="Browse all projects"
            />
        );
    }

    const { repo, live } = project.links;
    const status = project.status ?? (live ? 'Live demo' : undefined);
    const galleryImages = project.gallery.map((src, idx) => ({ src, alt: `${project.title} screenshot ${idx + 1}` }));

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
                    <img
                        src={project.gallery[0]}
                        srcSet={responsiveSrcSet(project.gallery[0])}
                        sizes="100vw"
                        alt=""
                        className="hero-main-img"
                        fetchPriority="high"
                    />
                    <div className="hero-overlay-gradient"></div>
                </div>

                <div className="header-nav">
                    <button onClick={() => navigate('/', { state: { scrollTo: 'projects' } })} className="back-link">
                        <ArrowLeft size={18} />
                        <span>Back to projects</span>
                    </button>
                    {status && (
                        <div className="mission-status">
                            <span className="pulse-dot"></span>
                            {status.toUpperCase()}
                        </div>
                    )}
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
                            <span>YEAR: {project.year}</span>
                        </div>
                        <div className="meta-item">
                            <Tag size={16} />
                            <span>{project.category.toUpperCase()}</span>
                        </div>
                    </motion.div>
                </div>
            </motion.header>

            <main className="detail-content">
                <section className="briefing-section">
                    <div className="section-label">
                        <Target size={20} />
                        <h2 className="section-label-text">PROJECT OVERVIEW</h2>
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
                        <h2 className="section-label-text">TECH STACK</h2>
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
                        <h2 className="section-label-text">SCREENSHOTS</h2>
                    </div>
                    <div className="gallery-grid">
                        {galleryImages.map((img, idx) => (
                            <motion.button
                                key={img.src}
                                type="button"
                                className="gallery-item"
                                onClick={() => setLightboxIndex(idx)}
                                aria-label={`Enlarge ${img.alt}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <img
                                    src={thumbnail(img.src)}
                                    srcSet={responsiveSrcSet(img.src)}
                                    sizes="(max-width: 900px) 100vw, 50vw"
                                    alt={img.alt}
                                    loading="lazy"
                                    decoding="async"
                                />
                                <span className="gallery-zoom-hint" aria-hidden="true"><Maximize2 size={18} /></span>
                            </motion.button>
                        ))}
                    </div>
                </section>

                {(repo || live) && (
                    <section className="mission-actions">
                        <h2>SEE IT IN ACTION</h2>
                        <div className="action-btns">
                            {repo && (
                                <a href={repo} target="_blank" rel="noopener noreferrer" className="action-btn github">
                                    <Github size={20} />
                                    <span>Source Code</span>
                                </a>
                            )}
                            {live && (
                                <a href={live} target="_blank" rel="noopener noreferrer" className="action-btn live">
                                    <ExternalLink size={20} />
                                    <span>Live Demo</span>
                                </a>
                            )}
                        </div>
                    </section>
                )}
            </main>

            <div className="detail-footer">
                <button onClick={() => navigate('/', { state: { scrollTo: 'projects' } })} className="footer-nav-btn">
                    <ArrowLeft size={16} />
                    Explore other projects
                </button>
            </div>

            <Lightbox
                images={galleryImages}
                index={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
                onIndexChange={setLightboxIndex}
            />
        </div>
    );
};

export default ProjectDetail;

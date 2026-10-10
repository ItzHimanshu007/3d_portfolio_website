import { useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Trophy, Target, Lightbulb, Zap, Rocket, ExternalLink, ShieldCheck } from 'lucide-react';
import { hackathonsData } from '../data/hackathons';
import { projectsData } from '../data/projects';
import { responsiveSrcSet, thumbnail } from '../utils/images';
import NotFound from './NotFound';
import './HackathonDetail.css';

const HackathonDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const hack = hackathonsData.find(h => h.id === id);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    if (!hack) {
        return (
            <NotFound
                title="Hackathon not found"
                message="This hackathon entry doesn't exist or has been renamed."
                backTo="/hackathons-archive"
                backLabel="Browse all hackathons"
            />
        );
    }

    const relatedProject = projectsData.find(p => p.id === hack.projectId);
    const hasActions = Boolean(hack.link || hack.certificateUrl || relatedProject);

    return (
        <div className="hackathon-detail-page" ref={containerRef}>
            <button className="back-btn-premium" onClick={() => navigate('/', { state: { scrollTo: 'hackathons' } })}>
                <ArrowLeft size={20} />
                <span>BACK TO MISSION</span>
            </button>

            {/* Hero Section */}
            <section className="hack-detail-hero">
                <motion.div
                    className="hero-header-content"
                    style={{ scale: headerScale, opacity: headerOpacity }}
                >
                    <div className="award-badge-huge">
                        <Trophy size={24} />
                        <span>{hack.award}</span>
                    </div>
                    <h1 className="hack-main-title">{hack.title}</h1>
                    <p className="hack-event-subtitle">{hack.event} • {hack.date}</p>
                </motion.div>

                <div className="hero-visual-depth">
                    <img
                        src={hack.mainImage}
                        srcSet={responsiveSrcSet(hack.mainImage)}
                        sizes="100vw"
                        alt=""
                        className="hero-main-img"
                        fetchPriority="high"
                    />
                    <div className="hero-overlay-gradient"></div>
                </div>
            </section>

            {/* Content Grid */}
            <div className="hack-detail-container">
                <div className="hack-main-grid">
                    {/* Left: Deep Dive */}
                    <div className="hack-content-column">
                        <section className="detail-section">
                            <div className="section-label">
                                <Target size={18} />
                                <span>PROBLEM STATEMENT</span>
                            </div>
                            <p className="section-text">{hack.description}</p>
                        </section>

                        <section className="detail-section">
                            <div className="section-label">
                                <Lightbulb size={18} />
                                <span>THE SOLUTION</span>
                            </div>
                            <div className="learnings-list">
                                {hack.learnings.map((learning, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="learning-item"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <div className="learning-dot"></div>
                                        <span>{learning}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        <section className="detail-section">
                            <div className="section-label">
                                <Zap size={18} />
                                <span>KEY ACHIEVEMENTS</span>
                            </div>
                            <div className="achievements-grid">
                                {hack.achievements.map((achievement, idx) => (
                                    <div key={idx} className="achievement-pill">
                                        <ShieldCheck size={14} className="text-red" />
                                        <span>{achievement}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right: Technical Toolkit & Links */}
                    <div className="hack-sidebar-column">
                        <div className="sidebar-box sticky-card">
                            <h3 className="sidebar-title">Tech Toolkit</h3>
                            <div className="tech-pills-row">
                                {hack.tech.map(t => (
                                    <span key={t} className="tech-pill-detail">{t}</span>
                                ))}
                            </div>

                            {hasActions && (
                                <>
                                    <div className="sidebar-divider"></div>

                                    <div className="sidebar-actions">
                                        {relatedProject && (
                                            <Link to={`/project/${relatedProject.id}`} className="action-btn-primary">
                                                <span>VIEW PROJECT CASE STUDY</span>
                                                <ArrowRight size={18} />
                                            </Link>
                                        )}
                                        {hack.link && (
                                            <a href={hack.link} target="_blank" rel="noopener noreferrer" className="action-btn-primary">
                                                <span>PROJECT DEMO</span>
                                                <Rocket size={18} />
                                            </a>
                                        )}
                                        {hack.certificateUrl && (
                                            <a href={hack.certificateUrl} target="_blank" rel="noopener noreferrer" className="action-btn-secondary">
                                                <span>VIEW CERTIFICATE</span>
                                                <ExternalLink size={16} />
                                            </a>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Immersive Gallery Section */}
                {hack.gallery.length > 0 && (
                    <section className="hack-moments-full">
                        <div className="section-label">
                            <Zap size={18} />
                            <span>MISSION MOMENTS</span>
                        </div>
                        <div className="moments-grid-premium">
                            {hack.gallery.map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    className="moment-card-large"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <img
                                        src={thumbnail(img)}
                                        srcSet={responsiveSrcSet(img)}
                                        sizes="(max-width: 900px) 100vw, 50vw"
                                        alt={`${hack.event}: photo ${idx + 1}`}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className="moment-overlay"></div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <div className="detail-page-glow"></div>
        </div>
    );
};

export default HackathonDetail;

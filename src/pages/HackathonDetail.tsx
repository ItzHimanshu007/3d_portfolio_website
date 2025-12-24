import { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Trophy, Target, Lightbulb, Zap, Rocket, ExternalLink, ShieldCheck } from 'lucide-react';
import { hackathonsData } from '../data/hackathons';
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

    if (!hack) return <div>Hackathon not found</div>;

    return (
        <div className="hackathon-detail-page" ref={containerRef}>
            <button className="back-btn-premium" onClick={() => navigate(-1)}>
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
                    <img src={hack.mainImage} alt={hack.title} className="hero-main-img" />
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

                            <div className="sidebar-divider"></div>

                            <div className="sidebar-actions">
                                <button className="action-btn-primary" onClick={() => window.open(hack.link, '_blank')}>
                                    <span>PROJECT DEMO</span>
                                    <Rocket size={18} />
                                </button>
                                <button className="action-btn-secondary" onClick={() => window.open('https://www.linkedin.com/in/himanshu-jasoriya-1548a0215/', '_blank')}>
                                    <span>VIEW CERTIFICATE</span>
                                    <ExternalLink size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Gallery Preview */}
                        <div className="gallery-sidebar-preview">
                            <h3 className="sidebar-title">Moments</h3>
                            <div className="gallery-mini-grid">
                                {hack.gallery.map((img, idx) => (
                                    <div key={idx} className="mini-gallery-card">
                                        <img src={img} alt="Moment" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="detail-page-glow"></div>
        </div>
    );
};

export default HackathonDetail;

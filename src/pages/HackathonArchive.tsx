import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { hackathonsData } from '../data/hackathons';
import './HackathonArchive.css';

const MissionCard = ({ hack, index }: { hack: any, index: number }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            className="mission-slide"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6 }}
        >
            <div className="mission-number">0{index + 1}</div>

            <div className="mission-card-premium" onClick={() => navigate(`/hackathon/${hack.id}`)}>
                <div className="mission-image-wrapper">
                    <img src={hack.mainImage} alt={hack.title} />
                    <div className="mission-image-overlay"></div>
                    <div className="mission-award-badge">
                        <Trophy size={14} />
                        <span>{hack.award}</span>
                    </div>
                </div>

                <div className="mission-content-premium">
                    <div className="mission-meta-top">
                        <span className="mission-event-name">{hack.event}</span>
                        <div className="mission-date-tag">
                            <Calendar size={12} />
                            <span>{hack.date}</span>
                        </div>
                    </div>

                    <h3 className="mission-title-premium">{hack.title}</h3>
                    <p className="mission-description-brief">{hack.description}</p>

                    <div className="mission-toolkit">
                        {hack.tech.slice(0, 3).map((t: string) => (
                            <span key={t} className="tool-pill">{t}</span>
                        ))}
                        {hack.tech.length > 3 && <span className="tool-pill">+{hack.tech.length - 3}</span>}
                    </div>

                    <div className="mission-action-footer">
                        <div className="action-label">ACCESS_DEEP_DIVE</div>
                        <div className="action-icon-circle">
                            <ArrowRight size={18} />
                        </div>
                    </div>
                </div>

                {/* Cyber Brackets */}
                <div className="mission-bracket top-l"></div>
                <div className="mission-bracket bottom-r"></div>
            </div>
        </motion.div>
    );
};

const HackathonArchive = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Calculate x based on track width
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-85%"]);


    return (
        <div className="creative-archive-wrapper" ref={containerRef}>

            <div className="sticky-horizontal-container">
                <motion.div
                    className="horizontal-scroll-track"
                    ref={trackRef}
                    style={{ x }}
                >
                    {/* Intro Slide */}
                    <div className="intro-mission-slide">
                        <motion.div
                            className="intro-content"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            <div className="cyber-label-group">
                                <div className="red-square"></div>
                                <span className="label-text">DATABASE_ARCHIVE_SECURED</span>
                            </div>
                            <h1 className="archive-hero-title">
                                MISSION <br /><span>HISTORY</span>
                            </h1>
                            <p className="archive-hero-desc">
                                Deployment records of competitive engineering protocols,
                                rapid innovation sprints, and high-velocity success.
                            </p>
                            <div className="scroll-indicator-mission">
                                <div className="mouse-icon">
                                    <div className="wheel"></div>
                                </div>
                                <span>SCROLL_TO_EXPLORE</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Mission Gallery */}
                    <div className="mission-gallery-track">
                        {hackathonsData.map((hack, index) => (
                            <MissionCard key={hack.id} hack={hack} index={index} />
                        ))}
                    </div>

                    {/* Outro Slide */}
                    <div className="outro-mission-slide">
                        <div className="outro-content-centered">
                            <h2 className="outro-title">ALL_MISSIONS_RETRIEVED</h2>
                            <button
                                className="return-hq-btn-premium"
                                onClick={() => navigate('/', { state: { scrollTo: 'hackathons' } })}
                            >
                                <ArrowLeft size={18} />
                                <span>RETURN_TO_BASE</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Progress Indicator */}
            <motion.div
                className="scroll-progress-bar"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Global HUD Overlays */}
            <div className="archive-global-overlays">
                <div className="corner-data-box tl">SYS_READY: v.07.24</div>
                <div className="corner-data-box tr">CONNECTION: ENCRYPTED</div>
                <div className="corner-data-box bl">LATENCY: 12ms</div>
                <div className="corner-data-box br">SYNC_STATUS: STABLE</div>
            </div>
        </div>
    );
};

export default HackathonArchive;

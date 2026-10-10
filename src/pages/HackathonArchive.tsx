import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { hackathonsData, type Hackathon } from '../data/hackathons';
import { responsiveSrcSet, thumbnail } from '../utils/images';
import './HackathonArchive.css';

const MissionCard = ({ hack, index }: { hack: Hackathon, index: number }) => {
    return (
        <motion.div
            className="mission-slide"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6 }}
        >
            <div className="mission-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>

            <Link to={`/hackathon/${hack.id}`} className="mission-card-premium">
                <div className="mission-image-wrapper">
                    <img
                        src={thumbnail(hack.mainImage)}
                        srcSet={responsiveSrcSet(hack.mainImage)}
                        sizes="(max-width: 768px) 90vw, 500px"
                        alt={`${hack.title} at ${hack.event}`}
                        loading="lazy"
                        decoding="async"
                    />
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

                    <h2 className="mission-title-premium">{hack.title}</h2>
                    <p className="mission-description-brief">{hack.description}</p>

                    <div className="mission-toolkit">
                        {hack.tech.slice(0, 3).map((t) => (
                            <span key={t} className="tool-pill">{t}</span>
                        ))}
                        {hack.tech.length > 3 && <span className="tool-pill">+{hack.tech.length - 3}</span>}
                    </div>

                    <div className="mission-action-footer">
                        <div className="action-label">VIEW DETAILS</div>
                        <div className="action-icon-circle">
                            <ArrowRight size={18} />
                        </div>
                    </div>
                </div>

                {/* Cyber Brackets */}
                <div className="mission-bracket top-l"></div>
                <div className="mission-bracket bottom-r"></div>
            </Link>
        </motion.div>
    );
};

const HackathonArchive = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Horizontal travel = how far the track overflows the viewport. The wrapper is made exactly that much
    // taller than the viewport, so vertical scrolling maps 1:1 onto the track and always reaches the end.
    const scrollRangeRef = useRef(0);
    const [wrapperHeight, setWrapperHeight] = useState<number | undefined>(undefined);
    const x = useTransform(scrollYProgress, (progress) => -progress * scrollRangeRef.current);

    useLayoutEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const measure = () => {
            scrollRangeRef.current = Math.max(0, track.scrollWidth - window.innerWidth);
            setWrapperHeight(scrollRangeRef.current + window.innerHeight);
        };
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(track);
        window.addEventListener('resize', measure);
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, []);


    return (
        <main className="creative-archive-wrapper" ref={containerRef} style={{ height: wrapperHeight }}>

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
                                <span className="label-text">ALL HACKATHONS</span>
                            </div>
                            <h1 className="archive-hero-title">
                                HACKATHON <br /><span>HISTORY</span>
                            </h1>
                            <p className="archive-hero-desc">
                                Every hackathon I've competed in: what we built, how we placed,
                                and what I learned along the way.
                            </p>
                            <div className="scroll-indicator-mission">
                                <div className="mouse-icon">
                                    <div className="wheel"></div>
                                </div>
                                <span>SCROLL TO EXPLORE</span>
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
                            <h2 className="outro-title">THAT'S ALL FOR NOW</h2>
                            <button
                                className="return-hq-btn-premium"
                                onClick={() => navigate('/', { state: { scrollTo: 'hackathons' } })}
                            >
                                <ArrowLeft size={18} />
                                <span>BACK TO HOME</span>
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
            <div className="archive-global-overlays" aria-hidden="true">
                <div className="corner-data-box tl">HACKATHONS: {hackathonsData.length}</div>
                <div className="corner-data-box tr">WINS: {hackathonsData.filter(h => h.award === 'Winner').length}</div>
                <div className="corner-data-box bl">TOP 10 · INDIA INNOVATES '26</div>
                <div className="corner-data-box br">BASE: JAIPUR, IN</div>
            </div>
        </main>
    );
};

export default HackathonArchive;

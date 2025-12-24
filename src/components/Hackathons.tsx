import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Calendar, Sparkles, BookOpen, Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { hackathonsData } from '../data/hackathons';
import './Hackathons.css';

const HackathonCard = ({ hack, index }: { hack: any, index: number }) => {
    const navigate = useNavigate();
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.2 });
    const Icon = hack.icon;

    return (
        <motion.div
            ref={cardRef}
            className="hack-card-premium"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{ y: -15, rotateY: index % 2 === 0 ? 5 : -5 }}
            style={{ perspective: 1000 }}
        >
            <div className="hack-card-glass"></div>
            <div className="hack-card-glow"></div>

            <div className="hack-card-header">
                <div className="hack-icon-wrapper">
                    <Icon size={24} />
                </div>
                <div className="hack-badge-award">
                    <Trophy size={14} />
                    <span>{hack.award}</span>
                </div>
            </div>

            <div className="hack-card-content">
                <div className="hack-meta">
                    <span className="hack-event">{hack.event}</span>
                    <div className="hack-date">
                        <Calendar size={12} />
                        <span>{hack.date}</span>
                    </div>
                </div>

                <h3 className="hack-title">{hack.title}</h3>
                <p className="hack-description">{hack.description}</p>

                <div className="hack-tech-stack">
                    {hack.tech.map((t: string) => (
                        <span key={t} className="hack-tech-tag">{t}</span>
                    ))}
                </div>
            </div>

            <div className="hack-card-footer">
                <motion.button
                    className="hack-link-btn-premium"
                    whileHover={{ scale: 1.05, backgroundColor: '#ff3333', color: '#fff' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/hackathon/${hack.id}`)}
                >
                    <BookOpen size={16} />
                    <span>DEEP DIVE MISSION</span>
                </motion.button>
            </div>
        </motion.div>
    );
};

export default function Hackathons() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section className="hackathons-premium-section" id="hackathons" ref={sectionRef}>
            <div className="section-background-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>

            <div className="container">
                <motion.div
                    className="hackathons-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                >
                    <div className="premium-badge">
                        <Sparkles size={16} />
                        <span>Elite Competitive Engineering</span>
                    </div>
                    <h2 className="premium-main-title">
                        Winning <br /><span>The Future</span>
                    </h2>
                    <p className="premium-desc">
                        A gallery of digital warfare victory, technical supremacy, and rapid innovation.
                    </p>
                </motion.div>

                {/* Immersive Gallery Section */}
                <div className="hackathon-creative-gallery">
                    <motion.div
                        className="gallery-track"
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    >
                        <div className="gallery-card-3d tilt-left">
                            <img src="/hackathon-win-standing.png" alt="Win 1" />
                            <div className="gallery-label">THE TRIUMPH</div>
                        </div>
                        <div className="gallery-card-3d centerpiece">
                            <img src="/hackathon-win-trophy.png" alt="Win 2" />
                            <div className="gallery-label">CODE VELOCITY</div>
                        </div>
                        <div className="gallery-card-3d tilt-right">
                            <img src="/hackathon-win-coding.png" alt="Win 3" />
                            <div className="gallery-label">ARCHITECTS OF XR</div>
                        </div>
                    </motion.div>
                </div>

                <div className="hack-grid-premium">
                    {hackathonsData.map((hack, index) => (
                        <HackathonCard key={hack.id} hack={hack} index={index} />
                    ))}
                </div>

                <motion.div
                    className="character-peeking-container-premium"
                    initial={{ opacity: 0, y: 100 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 1 }}
                >
                    <div className="creative-mascot-group">
                        <img src="/character-shouting.png" alt="Mascot" className="peeking-toy-premium" />
                        <div className="creative-chat-bubble">
                            <Quote size={12} className="quote-icon-chat" />
                            <span>"We don't just participate. We dominate."</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

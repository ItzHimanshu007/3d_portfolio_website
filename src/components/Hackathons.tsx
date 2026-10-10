import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Calendar, Sparkles, BookOpen, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { hackathonsData, type Hackathon } from '../data/hackathons';
import { responsiveSrcSet, thumbnail } from '../utils/images';
import './Hackathons.css';

const MotionLink = motion.create(Link);

const featuredHackathons = hackathonsData.filter((h) => h.featured);
const isPodium = (award: string) => /2nd|3rd|runner/i.test(award);
const stats = [
    { value: hackathonsData.length, label: 'Hackathons' },
    { value: hackathonsData.filter((h) => h.award === 'Winner').length, label: 'Wins' },
    { value: hackathonsData.filter((h) => isPodium(h.award)).length, label: 'Podium finishes' },
    { value: 'Top 10', label: "India Innovates '26" }
];

const HackathonCard = ({ hack, index }: { hack: Hackathon, index: number }) => {
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
            whileHover={{ y: -10 }}
        >
            <div className="hack-card-glass"></div>
            <div className="hack-card-glow"></div>

            <div className="hack-card-photo">
                <img
                    src={thumbnail(hack.mainImage)}
                    srcSet={responsiveSrcSet(hack.mainImage)}
                    sizes="(max-width: 900px) 100vw, 33vw"
                    alt={`Team photo from ${hack.event}`}
                    loading="lazy"
                    decoding="async"
                />
            </div>

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

                <div className="hack-key-achievements">
                    {hack.achievements.slice(0, 2).map((achievement, i) => (
                        <div key={i} className="hack-achievement-item">
                            <div className="achievement-dot"></div>
                            <span>{achievement}</span>
                        </div>
                    ))}
                </div>

                <div className="hack-tech-stack">
                    {hack.tech.map((t) => (
                        <span key={t} className="hack-tech-tag">{t}</span>
                    ))}
                </div>
            </div>

            <div className="hack-card-footer">
                <MotionLink
                    to={`/hackathon/${hack.id}`}
                    className="hack-link-btn-premium"
                    aria-label={`View details: ${hack.title} at ${hack.event}`}
                    whileHover={{ scale: 1.05, backgroundColor: '#e01e1e', color: '#fff' }}
                    whileTap={{ scale: 0.95 }}
                >
                    <BookOpen size={16} />
                    <span>VIEW DETAILS</span>
                </MotionLink>
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
                        <span>Hackathons</span>
                    </div>
                    <h2 className="premium-main-title">
                        Winning <br /><span>The Future</span>
                    </h2>
                    <p className="premium-desc">
                        Building working products under pressure, with real teams and real judges.
                    </p>
                </motion.div>

                <motion.dl
                    className="hack-stats-row"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {stats.map((stat) => (
                        <div key={stat.label} className="hack-stat">
                            <dt className="hack-stat-label">{stat.label}</dt>
                            <dd className="hack-stat-value">{stat.value}</dd>
                        </div>
                    ))}
                </motion.dl>

                <div className="hack-grid-premium">
                    {featuredHackathons.map((hack, index) => (
                        <HackathonCard key={hack.id} hack={hack} index={index} />
                    ))}
                </div>

                {/* Final CTA */}
                <motion.div
                    className="projects-cta-footer h-cta"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    style={{ marginTop: '0px' }}
                >
                    <div className="cta-divider"></div>
                    <p>See all {hackathonsData.length} hackathons, with photos and what I learned from each.</p>
                    <MotionLink
                        to="/hackathons-archive"
                        className="premium-view-all"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 51, 51, 0.6)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Browse All Hackathons
                        <span className="btn-glow"></span>
                    </MotionLink>
                </motion.div>

                <motion.div
                    className="character-peeking-container-premium"
                    initial={{ opacity: 0, y: 100 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 1 }}
                >
                    <div className="creative-mascot-group">
                        <img src="/character-shouting.webp" width={682} height={1024} alt="" className="peeking-toy-premium" loading="lazy" decoding="async" />
                        <div className="creative-chat-bubble">
                            <Quote size={12} className="quote-icon-chat" />
                            <span>"Build fast, test with real users, ship real impact."</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

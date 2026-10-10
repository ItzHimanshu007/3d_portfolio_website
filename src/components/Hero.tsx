import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, MotionValue } from 'framer-motion';
import { Mouse, ArrowDown, MapPin, Activity, Trophy } from 'lucide-react';
import { SITE } from '../config/site';
import { scrollToSection } from '../utils/scroll';
import { COMPANION_MEDIA_QUERY, popProgress } from '../utils/scrollCompanion';
import './Hero.css';

// Sub-component for individual geometric shards to maintain clean state
const GeometricShard: React.FC<{
    x: MotionValue<number>,
    y: MotionValue<number>,
    index: number,
    velocity: MotionValue<number>,
    isLoaded: boolean
}> = ({ x, y, index, velocity, isLoaded }) => {
    // Dynamic scaling based on velocity (stretching effect)
    const scaleX = useTransform(velocity, [-3000, 3000], [0.5, 2.5]);
    const opacity = 1 - (index * 0.15);
    const size = 20 - (index * 2);

    return (
        <motion.div
            className="geometric-echo-shard"
            style={{
                left: x,
                top: y,
                opacity: isLoaded ? opacity : 0,
                scaleX: scaleX,
                width: size,
                height: size,
                zIndex: 10000 - index
            }}
        >
            <div className="shard-inner-wireframe" />
            <div className="shard-core-glow" />
        </motion.div>
    );
};

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax & Opacity
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const charYOffset = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const opacity = useTransform(scrollYProgress, [0, 0.95], [1, 0]);

    // Mouse Tracking for Parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Global Mouse Coords
    const rawMouseX = useMotionValue(0);
    const rawMouseY = useMotionValue(0);

    // Velocity tracking for stretching effect
    const velX = useVelocity(rawMouseX);

    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Dynamic Parallax Scales
    const bgX = useTransform(springX, [-500, 500], [20, -20]);
    const bgY = useTransform(springY, [-500, 500], [20, -20]);
    const hudX = useTransform(springX, [-500, 500], [-30, 30]);
    const hudY = useTransform(springY, [-500, 500], [-30, 30]);
    const hudXInverse = useTransform(springX, [-500, 500], [30, -30]);
    const hudYInverse = useTransform(springY, [-500, 500], [30, -30]);
    const glowX = useTransform(springX, [-500, 500], [-150, 150]);
    const glowY = useTransform(springY, [-500, 500], [-150, 150]);
    const calloutLeftX = bgX;
    const calloutRightX = useTransform(springX, [-500, 500], [-20, 20]);

    // On wide screens the hero image hands over to the floating ScrollModel companion as you scroll
    const companionEnabled = useRef(window.matchMedia(COMPANION_MEDIA_QUERY).matches);
    const { scrollY: pageScrollY } = useScroll();
    const heroImageOpacity = useTransform(pageScrollY, (latest) =>
        companionEnabled.current ? 1 - popProgress(latest, window.innerHeight) : 1
    );

    const [isLoaded, setIsLoaded] = useState(false);

    // Staggered Springs for Geometric Echoes
    const echo1X = useSpring(rawMouseX, { damping: 20, stiffness: 400 });
    const echo1Y = useSpring(rawMouseY, { damping: 20, stiffness: 400 });
    const echo2X = useSpring(rawMouseX, { damping: 25, stiffness: 350 });
    const echo2Y = useSpring(rawMouseY, { damping: 25, stiffness: 350 });
    const echo3X = useSpring(rawMouseX, { damping: 30, stiffness: 300 });
    const echo3Y = useSpring(rawMouseY, { damping: 30, stiffness: 300 });
    const echo4X = useSpring(rawMouseX, { damping: 35, stiffness: 250 });
    const echo4Y = useSpring(rawMouseY, { damping: 35, stiffness: 250 });
    const echo5X = useSpring(rawMouseX, { damping: 40, stiffness: 200 });
    const echo5Y = useSpring(rawMouseY, { damping: 40, stiffness: 200 });
    const echo6X = useSpring(rawMouseX, { damping: 45, stiffness: 150 });
    const echo6Y = useSpring(rawMouseY, { damping: 45, stiffness: 150 });

    const echoes = [
        { x: echo1X, y: echo1Y },
        { x: echo2X, y: echo2Y },
        { x: echo3X, y: echo3Y },
        { x: echo4X, y: echo4Y },
        { x: echo5X, y: echo5Y },
        { x: echo6X, y: echo6Y },
    ];

    useEffect(() => {
        const query = window.matchMedia(COMPANION_MEDIA_QUERY);
        const onChange = (e: MediaQueryListEvent) => { companionEnabled.current = e.matches; };
        query.addEventListener('change', onChange);
        return () => query.removeEventListener('change', onChange);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - window.innerWidth / 2);
            mouseY.set(e.clientY - window.innerHeight / 2);
            rawMouseX.set(e.clientX);
            rawMouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        const timer = setTimeout(() => setIsLoaded(true), 500);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(timer);
        };
    }, [mouseX, mouseY, rawMouseX, rawMouseY]);

    return (
        <section className="hero-cyber-section" id="hero" ref={containerRef}>
            {/* 1. Deep Background Grid */}
            <motion.div
                className="hero-grid-depth"
                style={{ x: bgX, y: bgY }}
            />

            {/* 2. Cyber HUD Brackets */}
            <div className="hud-brackets-container">
                <motion.div className="hud-corner top-left" style={{ x: hudX, y: hudY }} />
                <motion.div className="hud-corner top-right" style={{ x: hudXInverse, y: hudY }} />
                <motion.div className="hud-corner bottom-left" style={{ x: hudX, y: hudYInverse }} />
                <motion.div className="hud-corner bottom-right" style={{ x: hudXInverse, y: hudYInverse }} />
            </div>

            {/* 3. Floating Data Readouts */}
            <div className="hud-data-overlays" aria-hidden="true">
                <motion.div className="data-box system-status" initial={{ opacity: 0, x: -50 }} animate={isLoaded ? { opacity: 1, x: 0 } : {}} transition={{ delay: 1 }}>
                    <Activity size={12} className="text-red" />
                    <span>STATUS: OPEN TO WORK</span>
                </motion.div>
                <motion.div className="data-box core-temp" initial={{ opacity: 0, x: 50 }} animate={isLoaded ? { opacity: 1, x: 0 } : {}} transition={{ delay: 1.2 }}>
                    <MapPin size={12} className="text-red" />
                    <span>BASE: JAIPUR, IN</span>
                </motion.div>
                <motion.div className="data-box shield-status" initial={{ opacity: 0, y: 50 }} animate={isLoaded ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.4 }}>
                    <Trophy size={12} className="text-red" />
                    <span>4× HACKATHON WINNER</span>
                </motion.div>
            </div>

            <div className="hero-content-container">
                <motion.div
                    className="hero-main-layout"
                    style={{ y, opacity }}
                >
                    <div className="hero-identity-group">
                        <motion.h1
                            className="hero-main-title"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="title-first">HIMANSHU</span>{' '}
                            <span className="title-last">JASORIYA</span>
                        </motion.h1>

                        <motion.div 
                            className="hero-summary-block"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <div className="summary-accent-line" />
                            <div className="summary-content">
                                <span className="hero-availability">
                                    <span className="availability-dot" aria-hidden="true" />
                                    {SITE.availability}
                                </span>
                                <span className="hero-role-tag">{SITE.role}</span>
                                <p className="hero-bio-text">{SITE.summary}</p>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        className="hero-cyber-actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.8 }}
                    >
                        <button
                            className="cyber-btn primary"
                            onClick={() => scrollToSection('projects')}
                        >
                            <ArrowDown size={18} />
                            <span>VIEW PROJECTS</span>
                        </button>
                        <button
                            className="cyber-btn secondary"
                            onClick={() => scrollToSection('contact')}
                        >
                            <span>CONTACT ME</span>
                        </button>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-visual-center"
                    style={{ y: charYOffset }}
                >
                    <motion.div
                        className="hero-interactive-glow"
                        style={{ x: glowX, y: glowY }}
                    />
                    <div className="visual-scanner-ring" />
                    
                    {/* Floating Tactical Data Callouts */}
                    <motion.div className="tactical-callout tc-1" style={{ x: calloutLeftX }} aria-hidden="true">
                        <div className="callout-line" />
                        <div className="callout-content">
                            <span className="callout-label">LAT_COORD</span>
                            <span className="callout-value">26.9124° N</span>
                        </div>
                    </motion.div>
                    
                    <motion.div className="tactical-callout tc-2" style={{ x: calloutRightX }} aria-hidden="true">
                        <div className="callout-line" />
                        <div className="callout-content">
                            <span className="callout-label">LONG_COORD</span>
                            <span className="callout-value">75.7873° E</span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="cyber-character-wrap"
                        initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                        animate={isLoaded ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                        transition={{ duration: 1.2, type: "spring" }}
                    >
                        <motion.img
                            src="/character-hero.webp"
                            width={583}
                            height={1024}
                            alt="Himanshu's 3D avatar"
                            className="cyber-character-img"
                            fetchPriority="high"
                            style={{ opacity: heroImageOpacity }}
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* Geometric Particle Echoes */}
            {isLoaded && echoes.map((echo, index) => (
                <GeometricShard
                    key={index}
                    x={echo.x}
                    y={echo.y}
                    index={index}
                    velocity={velX}
                    isLoaded={isLoaded}
                />
            ))}

            {/* Scroll Anchor */}
            <motion.div
                aria-hidden="true"
                className="cyber-scroll-anchor"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <Mouse size={20} className="text-red" />
                <div className="anchor-line" />
            </motion.div>
        </section>
    );
};

export default Hero;

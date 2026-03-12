import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, MotionValue } from 'framer-motion';
import { Mouse, Terminal, Cpu, Activity, Shield, Sparkles } from 'lucide-react';
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

    const [isLoaded, setIsLoaded] = useState(false);
    const [isIgniting, setIsIgniting] = useState(false);

    const handleExecuteProject = () => {
        setIsIgniting(true);
        // Cinematic ignition sequence duration - social/visual effect only
        setTimeout(() => {
            setIsIgniting(false);
        }, 3000);
    };

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
                <motion.div className="hud-corner top-right" style={{ x: useTransform(springX, [-500, 500], [30, -30]), y: hudY }} />
                <motion.div className="hud-corner bottom-left" style={{ x: hudX, y: useTransform(springY, [-500, 500], [30, -30]) }} />
                <motion.div className="hud-corner bottom-right" style={{ x: useTransform(springX, [-500, 500], [30, -30]), y: useTransform(springY, [-500, 500], [30, -30]) }} />
            </div>

            {/* 3. Floating Data Readouts */}
            <div className="hud-data-overlays">
                <motion.div className="data-box system-status" initial={{ opacity: 0, x: -50 }} animate={isLoaded ? { opacity: 1, x: 0 } : {}} transition={{ delay: 1 }}>
                    <Activity size={12} className="text-red" />
                    <span>SYSTEM: {isIgniting ? 'OVERDRIVE' : 'OPTIMIZED'}</span>
                </motion.div>
                <motion.div className="data-box core-temp" initial={{ opacity: 0, x: 50 }} animate={isLoaded ? { opacity: 1, x: 0 } : {}} transition={{ delay: 1.2 }}>
                    <Cpu size={12} className="text-red" />
                    <span>CORE: {isIgniting ? '98°C' : '32°C'}</span>
                </motion.div>
                <motion.div className="data-box shield-status" initial={{ opacity: 0, y: 50 }} animate={isLoaded ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.4 }}>
                    <Shield size={12} className="text-red" />
                    <span>{isIgniting ? 'BREACH DETECTED' : 'SECURE CONTEXT'}</span>
                </motion.div>
            </div>

            <div className="hero-content-container">
                <motion.div
                    className={`hero-main-layout ${isIgniting ? 'igniting' : ''}`}
                    style={{ y, opacity: isIgniting ? 1 : opacity }}
                >
                    {/* Badge */}
                    <motion.div
                        className="cyber-badge-premium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                    >
                        <Sparkles size={14} />
                        <span>{isIgniting ? 'OVERRIDE INITIATED' : 'PROTOCOL ACTIVE v2.0'}</span>
                    </motion.div>

                    {/* Main Title with Glitch Effect */}
                    <div className="title-glitch-wrapper">
                        <motion.h1
                            className={`hero-cyber-title ${isIgniting ? 'title-overdrive' : ''}`}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="name-prefix">HIMANSHU JASORIYA</span>
                            <span className="main-reveal">
                                ARCHITECTING <br />
                                <span className="text-red">DIGITAL</span>
                                FUTURES
                            </span>
                        </motion.h1>
                    </div>

                    <motion.p
                        className="hero-cyber-desc"
                        initial={{ opacity: 0 }}
                        animate={isLoaded && !isIgniting ? { opacity: 1 } : { opacity: isIgniting ? 0.2 : 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        Merging bleeding-edge technology with high-end aesthetics
                        to build immersive digital ecosystems.
                    </motion.p>

                    <motion.div
                        className="hero-cyber-actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.9 }}
                    >
                        <button
                            className={`cyber-btn primary ${isIgniting ? 'btn-ignited' : ''}`}
                            onClick={handleExecuteProject}
                            disabled={isIgniting}
                        >
                            <Terminal size={18} />
                            <span>{isIgniting ? 'INTERNALIZING...' : 'EXECUTE PROJECTS'}</span>
                        </button>
                        <button
                            className="cyber-btn secondary"
                            onClick={() => {
                                const el = document.getElementById('contact');
                                if (el) {
                                    window.lenis ? window.lenis.scrollTo(el, { offset: -50 }) : el.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                        >
                            <span>CONTACT_NODE</span>
                        </button>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-visual-center"
                    style={{ y: charYOffset }}
                >
                    <motion.div
                        className={`hero-interactive-glow ${isIgniting ? 'glow-overdrive' : ''}`}
                        style={{
                            x: useTransform(springX, [-500, 500], [-150, 150]),
                            y: useTransform(springY, [-500, 500], [-150, 150]),
                        }}
                    />
                    <div className={`visual-scanner-ring ${isIgniting ? 'ring-overdrive' : ''}`} />
                    <motion.img
                        src="/character-hero.png"
                        alt="Cyber Hero"
                        className="cyber-character-img"
                        initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                        animate={isLoaded ? { opacity: 1, scale: isIgniting ? 1.1 : 1, rotateY: 0 } : {}}
                        transition={{ duration: 1.2, type: "spring" }}
                    />
                </motion.div>
            </div>

            {/* Alpha-Strike Ignition Overlay */}
            {isIgniting && (
                <motion.div
                    className="alpha-strike-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="decryption-sequence">
                        <div className="glitch-line">DECRYPTING_CORE...</div>
                        <div className="glitch-line">PROJECT_DATA_XFER_INIT...</div>
                        <div className="glitch-line">ALPHA_STRIKE_CONFIRMED...</div>
                    </div>
                </motion.div>
            )}

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

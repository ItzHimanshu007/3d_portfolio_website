import React, { useRef } from 'react';
import { motion, useInView, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { MapPin, Code2, Award, Zap, Sparkles, Download } from 'lucide-react';
import './About.css';

const About: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    const skills = [
        { icon: Code2, title: 'Full-Stack Dev', color: '#ff3333' },
        { icon: Award, title: 'AI/ML Expert', color: '#ff3333' },
        { icon: Zap, title: 'Fast Learner', color: '#ff3333' }
    ];

    // Right Side - 3D Tilt & Nexus Effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section className="about-premium-section" ref={sectionRef} id="about">
            <div className="section-blur-bg"></div>

            <div className="container">
                <div className="about-grid-stunning">
                    {/* Left Side - Content */}
                    <motion.div
                        className="about-content-premium"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="premium-badge">
                            <Sparkles size={16} />
                            <span>About Me</span>
                        </div>

                        <h2 className="premium-main-title">
                            Get to Know <br /><span>Me</span>
                        </h2>

                        <div className="about-location-badge">
                            <MapPin size={18} />
                            <span>Jaipur, Rajasthan, India</span>
                        </div>

                        <p className="about-bio-premium">
                            I am a <span className="highlight-red">Freelance Full-Stack & AI/ML Developer</span> and the <span className="highlight-red">Founder of Neuronest</span>,
                            an innovative AI + VR mental health therapy platform. My mission is to build intelligent solutions
                            that matter.
                        </p>

                        <motion.button
                            className="about-resume-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.open('/resume.pdf', '_blank')}
                        >
                            <Download size={18} />
                            <span>GET_RESUME</span>
                        </motion.button>

                        <div className="about-stats-grid">
                            {skills.map((skill, idx) => {
                                const Icon = skill.icon;
                                return (
                                    <motion.div
                                        key={idx}
                                        className="about-stat-card"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.4 + idx * 0.1 }}
                                    >
                                        <div className="stat-icon-box">
                                            <Icon size={24} />
                                        </div>
                                        <span className="stat-title">{skill.title}</span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Right Side - Cyber Character Media */}
                    <motion.div
                        className="about-media-premium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <motion.div
                            className="media-visual-stack"
                            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        >
                            {/* Decorative HUD Elements */}
                            <div className="media-hud-brackets">
                                <div className="bracket tl" />
                                <div className="bracket tr" />
                                <div className="bracket bl" />
                                <div className="bracket br" />
                            </div>

                            <motion.img
                                src="/character-thinking.png"
                                alt="About Character"
                                className="main-character-img"
                                style={{ translateZ: "50px" }}
                            />

                            <div className="overlay-glow" />

                            <div className="character-base-glow"></div>

                            {/* Floating Cyber Particles */}
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="nexus-particle"
                                    animate={{
                                        y: [-20, -100],
                                        opacity: [0, 0.8, 0],
                                        x: Math.sin(i) * 30
                                    }}
                                    transition={{
                                        duration: 2 + (i % 3) * 0.5, // Stable duration based on index
                                        repeat: Infinity,
                                        delay: i * 0.4
                                    }}
                                />
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;

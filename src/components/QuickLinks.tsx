import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Code, User, Mail, ArrowRight, Sparkles } from 'lucide-react';
import './QuickLinks.css';

const links = [
    {
        id: 'projects',
        title: 'Projects',
        subtitle: 'View detailed work',
        icon: Code,
        href: '#projects',
        image: '/character-peace-laptop.png',
        scale: 1.2
    },
    {
        id: 'about',
        title: 'About',
        subtitle: 'Know my story',
        icon: User,
        href: '#about',
        image: '/character-thinking.png',
        scale: 1.3
    },
    {
        id: 'contact',
        title: 'Contact',
        subtitle: 'Drop a message',
        icon: Mail,
        href: '#contact',
        image: '/character-glasses-phone.png',
        scale: 1.3
    }
];

const QuickLinks = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    // Smooth parallax for the entire section content
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <section className="quick-links-premium-section" ref={sectionRef} id="quick-links">
            <div className="section-transition-mask"></div>

            <div className="container">
                <motion.div
                    className="quick-links-header-premium"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="premium-badge">
                        <Sparkles size={16} />
                        <span>Quick Access</span>
                    </div>
                    <h2 className="premium-main-title">
                        Ready for <br /><span>Results?</span>
                    </h2>
                </motion.div>

                <motion.div
                    className="quick-links-premium-grid"
                    style={{ y: contentY }}
                >
                    {links.map((link, index) => {
                        const Icon = link.icon;
                        return (
                            <motion.a
                                key={link.id}
                                href={link.href}
                                className="premium-link-card"
                                initial={{ opacity: 0, y: 60 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.2 + index * 0.15,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                whileHover={{ y: -15 }}
                            >
                                <div className="card-glass-bg"></div>
                                <div className="card-red-glow"></div>

                                <div className="card-top">
                                    <div className="icon-wrapper-premium">
                                        <Icon size={20} />
                                    </div>
                                    <div className="card-text-group">
                                        <h3 className="card-title-premium">{link.title}</h3>
                                        <p className="card-subtitle-premium">{link.subtitle}</p>
                                    </div>
                                </div>

                                <div className="card-media-premium">
                                    <motion.img
                                        src={link.image}
                                        alt={link.title}
                                        className="card-character-asset"
                                        style={{ scale: link.scale }}
                                        animate={{
                                            y: [0, -12, 0],
                                            rotate: [-1, 1, -1]
                                        }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: index * 0.4
                                        }}
                                    />
                                    <div className="asset-shadow-premium"></div>
                                </div>

                                <div className="card-footer-premium">
                                    <span className="visit-text">Navigate Now</span>
                                    <motion.div
                                        className="arrow-box"
                                        whileHover={{ x: 5 }}
                                    >
                                        <ArrowRight size={18} />
                                    </motion.div>
                                </div>
                            </motion.a>
                        );
                    })}
                </motion.div>
            </div>

            <div className="bg-text-watermark">NAVIGATION</div>
        </section>
    );
};

export default QuickLinks;

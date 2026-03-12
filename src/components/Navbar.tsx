import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const navItems = [
    { name: 'Home', href: 'hero' },
    { name: 'About', href: 'about' },
    { name: 'Skills', href: 'skills' },
    { name: 'Projects', href: 'projects' },
    { name: 'Hackathons', href: 'hackathons' },
    { name: 'Experience', href: 'experience' }
];

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = scrollY.on('change', (latest) => {
            setIsScrolled(latest > 50);
        });
        return () => unsubscribe();
    }, [scrollY]);

    const handleNavClick = (href: string) => {
        setMobileMenuOpen(false);
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: href } });
        } else {
            const element = document.getElementById(href);
            if (element) {
                window.lenis ? window.lenis.scrollTo(element, { offset: -50 }) : element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            <motion.nav
                className={`navbar-stunning ${isScrolled ? 'scrolled' : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="nav-container">
                    {/* Logo area */}
                    <button onClick={() => handleNavClick('hero')} className="nav-logo-group" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <span className="nav-logo-text">
                            PORTFOLIO<span className="text-red">.</span>
                        </span>
                    </button>

                    {/* Desktop Links */}
                    <ul className="nav-links-desktop">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <button
                                    onClick={() => handleNavClick(item.href)}
                                    className="nav-link-item"
                                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                                >
                                    <span className="nav-link-text">{item.name}</span>
                                    <span className="nav-link-dot" />
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* CTA & Mobile Toggle */}
                    <div className="nav-actions">
                        <motion.button
                            className="nav-cta-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleNavClick('contact')}
                        >
                            Let's Talk
                        </motion.button>

                        <button
                            className="mobile-menu-toggle"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="mobile-menu-overlay"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mobile-menu-content">
                            {navItems.map((item, idx) => (
                                <motion.button
                                    key={item.name}
                                    className="mobile-nav-link"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + idx * 0.1 }}
                                    onClick={() => handleNavClick(item.href)}
                                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                                >
                                    {item.name}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;

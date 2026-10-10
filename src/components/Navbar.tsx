import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToSection } from '../utils/scroll';
import { getLenis } from '../utils/lenis';
import './Navbar.css';

const navItems = [
    { name: 'Home', href: 'hero' },
    { name: 'About', href: 'about' },
    { name: 'Experience', href: 'experience' },
    { name: 'Skills', href: 'skills' },
    { name: 'Projects', href: 'projects' },
    { name: 'Hackathons', href: 'hackathons' }
];

const mobileNavItems = [...navItems, { name: 'Contact', href: 'contact' }];

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const navigate = useNavigate();
    const location = useLocation();
    const toggleRef = useRef<HTMLButtonElement>(null);
    const firstLinkRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const unsubscribe = scrollY.on('change', (latest) => {
            setIsScrolled(latest > 50);
        });
        return () => unsubscribe();
    }, [scrollY]);

    // While the mobile menu is open: lock page scroll, move focus into the menu, close on Escape.
    useEffect(() => {
        if (!mobileMenuOpen) return;

        getLenis()?.stop();
        document.body.style.overflow = 'hidden';
        firstLinkRef.current?.focus();

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMobileMenuOpen(false);
                toggleRef.current?.focus();
            }
        };
        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            getLenis()?.start();
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    const handleNavClick = (href: string) => {
        if (mobileMenuOpen) {
            // Undo the menu's scroll lock now; Lenis ignores scrollTo() while stopped.
            getLenis()?.start();
            document.body.style.overflow = '';
        }
        setMobileMenuOpen(false);
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: href } });
        } else {
            scrollToSection(href);
        }
    };

    return (
        <>
            <motion.nav
                className={`navbar-stunning ${isScrolled ? 'scrolled' : ''}`}
                aria-label="Main"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="nav-container">
                    {/* Logo area */}
                    <button onClick={() => handleNavClick('hero')} className="nav-logo-group" aria-label="Himanshu Jasoriya, back to top of home page" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <span className="nav-logo-text">
                            HIMANSHU<span className="text-red">.</span>
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
                            ref={toggleRef}
                            className="mobile-menu-toggle"
                            onClick={() => setMobileMenuOpen((open) => !open)}
                            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay. Sits below the navbar (z-index) so the close button stays clickable. */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            key="backdrop"
                            className="mobile-menu-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.nav
                            key="menu"
                            id="mobile-menu"
                            aria-label="Mobile"
                            className="mobile-menu-overlay"
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mobile-menu-content">
                                {mobileNavItems.map((item, idx) => (
                                    <motion.button
                                        key={item.name}
                                        ref={idx === 0 ? firstLinkRef : undefined}
                                        className="mobile-nav-link"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.05 }}
                                        onClick={() => handleNavClick(item.href)}
                                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                                    >
                                        {item.name}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;

import React from 'react';
import { motion } from 'framer-motion';
import { Home, FolderOpen, User, Mail } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
    const navItems = [
        { icon: Home, label: 'Home', href: '#home' },
        { icon: FolderOpen, label: 'Projects', href: '#projects' },
        { icon: User, label: 'About', href: '#about' },
        { icon: Mail, label: 'Contact', href: '#contact' }
    ];

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            window.lenis ? window.lenis.scrollTo(element as HTMLElement, { offset: -50 }) : element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="container footer-container">
                    <div className="footer-info">
                        <motion.img
                            src="/character-vinyl.png"
                            alt="Character Icon"
                            className="footer-character"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <div className="footer-text">
                            <h3 className="footer-name">Himanshu Jasoriya</h3>
                            <p className="footer-tagline">AI/ML Engineer & Tech Innovator</p>
                        </div>
                    </div>

                    <nav className="footer-nav">
                        {navItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.button
                                    key={item.label}
                                    onClick={() => scrollToSection(item.href)}
                                    className="footer-nav-item"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Icon size={20} />
                                    <span>{item.label}</span>
                                </motion.button>
                            );
                        })}
                    </nav>

                    <div className="footer-bottom">
                        <p className="footer-copyright">
                            © {new Date().getFullYear()} Himanshu Jasoriya. Crafted with passion & innovation.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

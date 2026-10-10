import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, FolderOpen, Trophy, Mail, Linkedin, Github, Twitter, FileText } from 'lucide-react';
import { SITE } from '../config/site';
import { useSectionNavigation } from '../hooks/useSectionNavigation';
import './Footer.css';

const navItems = [
    { icon: Home, label: 'Home', section: 'hero' },
    { icon: User, label: 'About', section: 'about' },
    { icon: Briefcase, label: 'Experience', section: 'experience' },
    { icon: FolderOpen, label: 'Projects', section: 'projects' },
    { icon: Trophy, label: 'Hackathons', section: 'hackathons' },
    { icon: Mail, label: 'Contact', section: 'contact' }
];

const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', url: SITE.socials.linkedin },
    { icon: Github, label: 'GitHub', url: SITE.socials.github },
    { icon: Twitter, label: 'X (Twitter)', url: SITE.socials.twitter }
];

const Footer: React.FC = () => {
    const goToSection = useSectionNavigation();

    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-top">
                    <div className="footer-info">
                        <motion.img
                            src="/character-vinyl.webp"
                            width={583}
                            height={1024}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="footer-character"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <div className="footer-text">
                            <p className="footer-name">{SITE.name}</p>
                            <p className="footer-tagline">{SITE.role}</p>
                            <p className="footer-availability">{SITE.availability}</p>
                        </div>
                    </div>

                    <div className="footer-contact">
                        <a href={`mailto:${SITE.email}`} className="footer-email">
                            <Mail size={16} aria-hidden="true" />
                            <span>{SITE.email}</span>
                        </a>
                        <div className="footer-socials">
                            <a href={SITE.resumeUrl} download className="footer-social-link" aria-label="Download résumé (PDF)">
                                <FileText size={18} aria-hidden="true" />
                            </a>
                            {socialLinks.map(({ icon: Icon, label, url }) => (
                                <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label={`${label} (opens in new tab)`}>
                                    <Icon size={18} aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <nav className="footer-nav" aria-label="Footer">
                    {navItems.map(({ icon: Icon, label, section }) => (
                        <button
                            key={label}
                            onClick={() => goToSection(section)}
                            className="footer-nav-item"
                        >
                            <Icon size={18} aria-hidden="true" />
                            <span>{label}</span>
                        </button>
                    ))}
                </nav>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {new Date().getFullYear()} {SITE.name}. Built with React, TypeScript & Framer Motion.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

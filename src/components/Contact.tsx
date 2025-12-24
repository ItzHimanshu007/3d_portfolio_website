import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Sparkles, Send } from 'lucide-react';
import './Contact.css';

const Contact: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    const contactInfo = [
        { icon: Mail, label: 'Email', value: 'hjasoriya007@gmail.com', link: 'mailto:hjasoriya007@gmail.com' },
        { icon: Phone, label: 'Phone', value: '+91 6375884386', link: 'tel:+916375884386' },
        { icon: MapPin, label: 'Location', value: 'Jaipur, Rajasthan, India', link: null }
    ];

    const socialLinks = [
        { icon: Linkedin, name: 'LinkedIn', url: 'https://www.linkedin.com/in/himanshu-jasoriya-23b77331a' },
        { icon: Github, name: 'GitHub', url: 'https://github.com/ItzHimanshu007' },
        { icon: Twitter, name: 'Twitter', url: 'https://x.com/itzhimanshu_07' }
    ];

    return (
        <section className="contact-premium-section" ref={sectionRef} id="contact">
            <div className="container">
                <div className="contact-grid-stunning">
                    {/* Left Column - Info */}
                    <motion.div
                        className="contact-info-premium"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="premium-badge">
                            <Sparkles size={16} />
                            <span>Let's Create Together</span>
                        </div>

                        <h2 className="premium-main-title">
                            Let's Create <br /><span>Together</span>
                        </h2>

                        <p className="contact-desc-premium">
                            Have a vision you want to bring to life? I'm always open to discussing
                            innovative projects and creative partnerships.
                        </p>

                        <div className="contact-methods-premium">
                            {contactInfo.map((info, idx) => {
                                const Icon = info.icon;
                                return (
                                    <div key={idx} className="method-item-premium">
                                        <div className="method-icon">
                                            <Icon size={20} />
                                        </div>
                                        <div className="method-text">
                                            <span className="method-label">{info.label}</span>
                                            {info.link ? (
                                                <a href={info.link} className="method-value">{info.value}</a>
                                            ) : (
                                                <span className="method-value">{info.value}</span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Right Column - Form/CTA */}
                    <motion.div
                        className="contact-actions-premium"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="social-connect-premium">
                            <h3>Connect Verbally</h3>
                            <div className="social-grid-premium">
                                {socialLinks.map((social, idx) => {
                                    const Icon = social.icon;
                                    return (
                                        <motion.a
                                            key={idx}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-btn-premium"
                                            whileHover={{ y: -5, backgroundColor: '#ff3333', color: '#fff' }}
                                        >
                                            <Icon size={22} />
                                            <span>{social.name}</span>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="contact-footer-cta">
                            <motion.button
                                className="direct-message-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.href = 'mailto:hjasoriya007@gmail.com'}
                            >
                                <span>Send Direct Message</span>
                                <Send size={18} />
                            </motion.button>
                        </div>

                        <div className="contact-mascot-peek">
                            <img src="/character-glasses-phone.png" alt="Contact Mascot" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

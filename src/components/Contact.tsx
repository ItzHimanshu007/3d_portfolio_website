import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Sparkles, Send } from 'lucide-react';
import { SITE } from '../config/site';
import './Contact.css';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
    const [formState, setFormState] = React.useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = React.useState<FormStatus>('idle');

    const contactInfo = [
        { icon: Mail, label: 'Email', value: SITE.email, link: `mailto:${SITE.email}` },
        { icon: Phone, label: 'Phone', value: SITE.phone, link: `tel:${SITE.phone.replace(/\s/g, '')}` },
        { icon: MapPin, label: 'Location', value: SITE.location, link: null }
    ];

    const socialLinks = [
        { icon: Linkedin, name: 'LinkedIn', url: SITE.socials.linkedin },
        { icon: Github, name: 'GitHub', url: SITE.socials.github },
        { icon: Twitter, name: 'X (Twitter)', url: SITE.socials.twitter }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
        if (status === 'error') setStatus('idle');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const formData = new FormData(e.currentTarget);
            // Web3Forms: simple form backend for static sites
            formData.append('access_key', SITE.web3formsKey);
            formData.append('subject', `Portfolio message from ${formState.name}`);

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            const data = await response.json().catch(() => null);

            if (response.ok && data?.success) {
                setStatus('success');
                setFormState({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 6000);
            } else {
                console.error('Contact form submission failed', data);
                setStatus('error');
            }
        } catch (error) {
            console.error('Contact form submission failed', error);
            setStatus('error');
        }
    };

    const mailtoFallback = `mailto:${SITE.email}?subject=${encodeURIComponent(`Portfolio message from ${formState.name || 'a visitor'}`)}&body=${encodeURIComponent(formState.message)}`;

    const buttonLabel = {
        idle: 'Send Message',
        submitting: 'Sending…',
        success: 'Message Sent',
        error: 'Try Again',
    }[status];

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
                            <span>Get in Touch</span>
                        </div>

                        <h2 className="premium-main-title">
                            Let's Create <br /><span>Together</span>
                        </h2>

                        <p className="contact-desc-premium">
                            Hiring for an internship, or have a project in mind? I'm always open to discussing
                            new opportunities and collaborations.
                        </p>

                        <div className="contact-methods-premium">
                            {contactInfo.map((info) => {
                                const Icon = info.icon;
                                return (
                                    <div key={info.label} className="method-item-premium">
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

                    {/* Right Column - Form */}
                    <motion.div
                        className="contact-actions-premium"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <form className="contact-form-cyber" onSubmit={handleSubmit}>
                            {/* Honeypot for spam protection */}
                            <input type="checkbox" name="botcheck" className="sr-only" style={{ display: "none" }} tabIndex={-1} aria-hidden="true" />

                            <div className="form-group-cyber">
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    autoComplete="name"
                                    value={formState.name}
                                    onChange={handleInputChange}
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div className="form-group-cyber">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    value={formState.email}
                                    onChange={handleInputChange}
                                    placeholder="you@company.com"
                                    required
                                />
                            </div>
                            <div className="form-group-cyber">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formState.message}
                                    onChange={handleInputChange}
                                    placeholder="Tell me about the role or project"
                                    rows={4}
                                    required
                                />
                            </div>
                            <motion.button
                                type="submit"
                                className={`cyber-contact-btn ${status === 'success' ? 'success' : ''}`}
                                disabled={status === 'submitting'}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Send size={18} aria-hidden="true" />
                                <span>{buttonLabel}</span>
                            </motion.button>

                            <div className="contact-form-status" role="status" aria-live="polite">
                                {status === 'success' && (
                                    <p className="form-status-success">Thanks! Your message was sent. I'll get back to you soon.</p>
                                )}
                                {status === 'error' && (
                                    <p className="form-status-error">
                                        Sorry, your message couldn't be sent. Please try again, or{' '}
                                        <a href={mailtoFallback}>email me directly at {SITE.email}</a>.
                                    </p>
                                )}
                            </div>
                        </form>

                        <div className="social-connect-premium">
                            <div className="social-grid-premium">
                                {socialLinks.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <motion.a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-btn-premium"
                                            aria-label={`${social.name} (opens in new tab)`}
                                            whileHover={{ y: -5, backgroundColor: '#e01e1e', color: '#fff' }}
                                        >
                                            <Icon size={18} aria-hidden="true" />
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="contact-mascot-peek">
                            <img src="/character-glasses-phone.webp" width={512} height={804} alt="" loading="lazy" decoding="async" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

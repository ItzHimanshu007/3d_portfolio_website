import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Sparkles, Send } from 'lucide-react';
import './Contact.css';

const Contact: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
    const [formState, setFormState] = React.useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.target as HTMLFormElement);
            // Using Web3Forms - simple and reliable for static sites
            formData.append("access_key", "d5145b4c-9786-4f7f-8c34-8c888e2c0e2a"); // Public demo key or replace with real one

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setSubmitted(true);
                setFormState({ name: '', email: '', message: '' });
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                console.error("Submission Error", data);
            }
        } catch (error) {
            console.error("Transmission Failed", error);
        } finally {
            setIsSubmitting(false);
        }
    };

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

                    {/* Right Column - Form */}
                    <motion.div
                        className="contact-actions-premium"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <form className="contact-form-cyber" onSubmit={handleSubmit}>
                            {/* Honeypot for spam protection */}
                            <input type="checkbox" name="botcheck" className="sr-only" style={{ display: "none" }} />

                            <div className="form-group-cyber">
                                <label htmlFor="name">IDENTIFIER_NAME</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formState.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div className="form-group-cyber">
                                <label htmlFor="email">CONTACT_NODE_EMAIL</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formState.email}
                                    onChange={handleInputChange}
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <div className="form-group-cyber">
                                <label htmlFor="message">TRANSMISSION_DATA</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formState.message}
                                    onChange={handleInputChange}
                                    placeholder="What's your vision?"
                                    rows={4}
                                    required
                                />
                            </div>
                            <motion.button
                                type="submit"
                                className={`cyber-contact-btn ${submitted ? 'success' : ''}`}
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Send size={18} />
                                <span>{isSubmitting ? 'ENCRYPTING...' : submitted ? 'TRANSMITTED' : 'EXECUTE_SEND'}</span>
                            </motion.button>
                        </form>

                        <div className="social-connect-premium">
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
                                            <Icon size={18} />
                                        </motion.a>
                                    );
                                })}
                            </div>
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

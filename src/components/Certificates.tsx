import { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Award, ExternalLink, Sparkles, ShieldCheck, Download, Calendar } from 'lucide-react';
import './Certificates.css';

const certificatesData = [
    {
        id: 1,
        title: 'Machine Learning Internship',
        issuer: 'Cognifyz Technologies',
        year: '2025',
        type: 'Internship',
        description: 'Hands-on experience in data preprocessing, model building, evaluation, and deployment on real-world ML projects.',
        skills: ['Machine Learning', 'Data Preprocessing', 'Model Deployment']
    },
    {
        id: 2,
        title: 'Python for Data Science',
        issuer: 'IBM SkillsBuild / Coursera',
        year: '2024',
        type: 'Professional Certificate',
        description: 'Mastered Python fundamentals, NumPy, Pandas, and visualization for data analytics and ML workflows.',
        skills: ['Python', 'NumPy', 'Pandas', 'Data Visualization']
    },
    {
        id: 3,
        title: 'Introduction to Deep Learning',
        issuer: 'DeepLearning.AI / Coursera',
        year: '2024',
        type: 'Specialization',
        description: 'Learned neural network architectures, backpropagation, and optimization techniques using TensorFlow.',
        skills: ['Deep Learning', 'Neural Networks', 'TensorFlow']
    },
    {
        id: 4,
        title: 'Data Visualization with Power BI',
        issuer: 'Microsoft Learn',
        year: '2024',
        type: 'Certification',
        description: 'Built interactive dashboards and data stories for better business insights and decision-making.',
        skills: ['Power BI', 'Data Visualization', 'Business Intelligence']
    },
    {
        id: 5,
        title: 'Artificial Intelligence Fundamentals',
        issuer: 'Google AI / Kaggle Learn',
        year: '2023',
        type: 'Fundamental',
        description: 'Gained understanding of AI pipelines, supervised & unsupervised learning, and model interpretation.',
        skills: ['AI Pipelines', 'Supervised Learning', 'Model Interpretation']
    },
    {
        id: 6,
        title: 'Generative AI & Prompt Engineering',
        issuer: 'OpenAI Community Certification',
        year: '2025',
        type: 'Advanced',
        description: 'Explored LLM-based applications, prompt design, and responsible AI usage in real-world systems.',
        skills: ['Generative AI', 'Prompt Engineering', 'LLMs']
    },
    {
        id: 7,
        title: 'Git & GitHub for Developers',
        issuer: 'Udemy / GitHub Training Labs',
        year: '2023',
        type: 'Developer Tools',
        description: 'Learned version control, branching, pull requests, and collaborative development workflows.',
        skills: ['Git', 'GitHub', 'Version Control']
    }
];

const CertCard = ({ cert, index, isInView }: { cert: typeof certificatesData[0], index: number, isInView: boolean }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className="premium-cert-card-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
        >
            <div className="premium-cert-card">
                <div className="holographic-overlay"></div>
                <div className="card-inner-glow"></div>

                <div className="cert-top-row">
                    <div className="cert-icon-box-stunning">
                        <Award size={28} />
                    </div>
                    <div className="cert-badge-stunning">
                        <ShieldCheck size={14} />
                        <span>{cert.type}</span>
                    </div>
                </div>

                <div className="cert-content-stunning">
                    <div className="cert-meta-info">
                        <div className="meta-item-stunning">
                            <Calendar size={14} />
                            <span>{cert.year}</span>
                        </div>
                    </div>
                    <h3 className="cert-title-premium-text">{cert.title}</h3>
                    <p className="cert-issuer-premium-text">{cert.issuer}</p>
                    <p className="cert-description-premium-text">{cert.description}</p>

                    <div className="cert-skills-row">
                        {cert.skills.map((skill, sIdx) => (
                            <span key={sIdx} className="cert-skill-tag">{skill}</span>
                        ))}
                    </div>
                </div>

                <div className="cert-footer-stunning">
                    <motion.button
                        className="cert-primary-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open('https://github.com/ItzHimanshu007', '_blank')}
                    >
                        <span>View Credential</span>
                        <ExternalLink size={16} />
                    </motion.button>
                    <motion.button
                        className="cert-secondary-btn"
                        whileHover={{ scale: 1.1 }}
                        onClick={() => window.open('https://www.linkedin.com/in/himanshu-jasoriya-1548a0215/', '_blank')}
                    >
                        <Download size={18} />
                    </motion.button>
                </div>

                <div className="card-decoration-lines">
                    <span></span><span></span><span></span>
                </div>
            </div>
        </motion.div>
    );
};

export default function Certificates() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section className="certificates-stunning-section" id="certificates" ref={sectionRef}>
            <div className="section-background-elements">
                <div className="gradient-sphere-1"></div>
                <div className="gradient-sphere-2"></div>
            </div>

            <div className="container">
                <motion.div
                    className="certificates-header-premium"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="premium-badge">
                        <Sparkles size={16} />
                        <span>Verified Credentials</span>
                    </div>
                    <h2 className="premium-main-title">
                        Certifications <br /><span>& Learning</span>
                    </h2>

                    {/* Character Mascot next to heading */}
                    <motion.div
                        className="cert-mascot-container"
                        initial={{ opacity: 0, x: 50, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        <img src="/character-certificate.png" alt="Certifications Mascot" className="cert-mascot-img" />
                    </motion.div>

                    <p className="section-subtitle-premium">
                        Continuous learning and technical validation from world-class institutions.
                    </p>
                </motion.div>

                <div className="certificates-grid-premium">
                    {certificatesData.map((cert, index) => (
                        <CertCard key={cert.id} cert={cert} index={index} isInView={isInView} />
                    ))}
                </div>
            </div>
        </section>
    );
}

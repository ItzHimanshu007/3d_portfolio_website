import { Monitor, Activity, Globe, Zap, Layers } from 'lucide-react';

export interface ProjectMission {
    id: string;
    year: string;
    title: string;
    subtitle: string;
    category: string;
    description: string;
    briefing: string;
    challenge: string;
    solution: string;
    tech: string[];
    features: string[];
    impact: string[];
    futureScope: string[];
    image: string;
    gallery: string[];
    IconComponent: any;
    color: string;
    links: {
        github?: string;
        live?: string;
    };
}

export const projectsData: ProjectMission[] = [
    {
        id: 'sungrid-protocol',
        year: '2025',
        title: 'SunGrid Protocol',
        subtitle: 'Decentralizing Energy Through Blockchain, AI & Smart Grids',
        category: 'Web3 / CleanTech',
        description: 'A next-generation decentralized energy ecosystem designed to transform how renewable energy is generated, shared, traded, and optimized.',
        briefing: 'SunGrid Protocol is an intelligent energy ecosystem designed to decentralize renewable energy trading.\n\n• DECENTRALIZED MARKETPLACE: Enables prosumers to sell excess solar energy directly to neighbors via Ethereum smart contracts.\n• AI OPTIMIZATION: Predictive load balancing models forecast demand fluctuations to minimize grid dependency.\n• IOT VERIFICATION: Real-time energy generation and consumption tracked through secure, tamper-proof smart meters.\n• SUSTAINABILITY ECONOMY: Users earn green rewards for contributing renewable energy to the community grid.',
        challenge: 'Centralized energy systems face massive dependencies, high costs, and significant wastage. Small-scale solar producers lack a transparent mechanism to monetize excess energy, leading to inefficient renewable adoption and poor distribution in both urban and rural settings.',
        solution: 'Developed a peer-to-peer smart energy marketplace where surplus solar energy is traded autonomously. Leveraging AI for grid optimization and load balancing, the platform tokenizes energy contributions into a sustainable incentive economy.',
        tech: ['Solidity', 'Ethereum', 'AI/ML (Prediction Models)', 'IoT Integration', 'Next.js', 'Smart Contracts', 'Chainlink'],
        features: [
            'Blockchain-Based Energy Trading',
            'AI Smart Grid Optimization',
            'Real-Time Monitoring Dashboard',
            'Sustainability Rewards',
            'Community Microgrids'
        ],
        impact: [
            'Reduce carbon emissions 🌱',
            'Increase renewable adoption ☀️',
            'Lower electricity costs ⚡',
            'Empower local communities 🏘️'
        ],
        futureScope: [
            'AI autonomous energy markets',
            'EV charging integration',
            'Carbon credit tokenization',
            'Smart city infrastructure'
        ],
        image: '/projects/sungridprotocol_img1 11.42.52 PM.png',
        gallery: [
            '/projects/sungridprotocol_img1 11.42.52 PM.png',
            '/projects/sungridprotocol_img2 11.42.52 PM.png',
            '/projects/sungridprotocol_img3 11.42.52 PM.png',
            '/projects/sungridprotocol_img4 11.42.52 PM.png'
        ],
        IconComponent: Zap,
        color: '#ff3333',
        links: {
            github: 'https://github.com/ItzHimanshu007',
            live: 'https://sungrid-mz6jsm8jr-aditya-gautams-projects-496c032b.vercel.app'
        }
    },
    {
        id: 'medinexus',
        year: '2025',
        title: 'MediNexus',
        subtitle: 'AI-Powered Smart Healthcare & Medical Intelligence Ecosystem',
        category: 'Health Tech',
        description: 'An advanced healthcare technology platform integrating AI, cloud computing, and medical data analytics for a connected healthcare network.',
        briefing: 'MediNexus is a multi-tenant healthcare intelligence platform designed to unify medical records and patient monitoring.\n\n• CENTRALIZED EHR: Secure cloud-native storage for prescriptions, medical reports, and comprehensive patient history.\n• AI DIAGNOSIS ENGINE: Evaluates symptoms against medical datasets to provide preliminary health insights.\n• REMOTE MONITORING: Real-time tracking of vitals like heart rate and BP, integrated with emergency alert systems.\n• DOCTOR CONNECTIVITY: Seamlessly bridges the gap between hospitals and patients through a unified digital interface.',
        challenge: 'Modern healthcare suffers from fragmented medical records, hospital overcrowding, and delayed diagnoses. Patients in rural areas often lack access to specialized guidance, while doctors struggle with managing patient history without centralized, real-time data.',
        solution: 'Developed an intelligent ecosystem offering AI symptom analysis, remote health monitoring (Vitals, Sleep, Activity), and a smart medicine recommendation engine.',
        tech: ['React / React Native', 'Node.js', 'FastAPI', 'Python', 'TensorFlow', 'PostgreSQL', 'Firebase', 'Real-time Analytics'],
        features: [
            'AI Symptom Analysis',
            'Digital Medical Records',
            'Smart Medicine Recommendation',
            'Remote Health Monitoring',
            'Healthcare Analytics Dashboard'
        ],
        impact: [
            'Improve healthcare accessibility 🌍',
            'Reduce diagnosis delays ⏱️',
            'Simplify medical data management 📂',
            'Support remote healthcare 🏥'
        ],
        futureScope: [
            'AI virtual doctors',
            'Smart wearable integration',
            'Blockchain-based medical records',
            'Predictive epidemic analytics'
        ],
        image: '/projects/medinexus-1.png',
        gallery: [
            '/projects/medinexus-1.png',
            '/projects/medinexus-2.png'
        ],
        IconComponent: Activity,
        color: '#ff3333',
        links: {
            github: 'https://github.com/ItzHimanshu007',
            live: '#'
        }
    },
    {
        id: 'jal-drishti',
        year: '2025',
        title: 'Jal Drishti',
        subtitle: 'AI-Powered Smart Water Intelligence & Conservation System',
        category: 'Civic Tech',
        description: 'An intelligent water monitoring and conservation platform designed to solve modern water management challenges using AI, IoT, and real-time analytics.',
        briefing: 'Jal Drishti is an AI-powered water management platform focused on data-driven conservation and quality monitoring.\n\n• DIGITAL INFRASTRUCTURE TWIN: Real-time IoT monitoring of water pressure, flow rates, and reservoir levels.\n• PREDICTIVE LEAK DETECTION: AI models identify flow anomalies to stop water wastage before it escalates.\n• QUALITY ASSURANCE: Constant monitoring of pH, TDS, and turbidity to ensure safe water distribution.\n• AGRICULTURAL EFFICIENCY: AI-optimized irrigation cycles based on soil moisture and weather data forecasting.',
        challenge: 'Global water scarcity is exacerbated by inefficient infrastructure, undetected pipeline leaks, and a lack of real-time quality monitoring. Millions of liters are lost daily due to manual inspection dependencies and outdated management systems.',
        solution: 'Developed an AI+IoT ecosystem capable of instant leak detection, contamination monitoring (pH, TDS, Turbidity), and predictive demand forecasting.',
        tech: ['AI/ML (Anomaly Detection)', 'IoT Sensors', 'Cloud Computing', 'FastAPI', 'Python', 'Data Analytics', 'GSM/WiFi Modules'],
        features: [
            'Smart Water Monitoring',
            'AI Leak Detection',
            'Water Quality Analysis',
            'Smart Irrigation System',
            'Predictive Analytics'
        ],
        impact: [
            'Reduce water wastage 💧',
            'Improve water conservation 🌍',
            'Prevent pipeline losses 🚰',
            'Enhance agricultural efficiency 🌾'
        ],
        futureScope: [
            'AI autonomous water management',
            'Satellite-based water analytics',
            'Blockchain-based water data transparency'
        ],
        image: '/projects/jaldrishti-1.png',
        gallery: [
            '/projects/jaldrishti-1.png',
            '/projects/jaldrishti-2.png',
            '/projects/jaldrishti-3.png'
        ],
        IconComponent: Globe,
        color: '#ff3333',
        links: {
            github: 'https://github.com/ItzHimanshu007',
            live: '#'
        }
    },
    {
        id: 'neuronest',
        year: '2024',
        title: 'Neuronest',
        subtitle: 'AI + VR Powered Mental Wellness Ecosystem',
        category: 'Health Tech',
        description: 'An advanced mental wellness platform combining AI, VR, and emotional analytics to create personalized and emotionally adaptive digital therapy.',
        briefing: 'Neuronest is an AI + VR mental wellness sanctuary designed to provide accessible, emotionally adaptive therapy.\n\n• EMPATHETIC AI COMPANION: Conversational assistant capable of understanding sentiment and providing emotional support.\n• VR IMMERSION: Calm virtual environments (Zen forests, beaches) that respond to the user\'s emotional state.\n• BEHAVIORAL INTELLIGENCE: Real-time mood and stress analytics to track wellness progress over time.\n• PERSONALIZED WELLNESS: Recommendation engine for meditation, focus sessions, and sleep therapy based on emotional data.',
        challenge: 'Rising workplace burnout and academic pressure are colliding with high therapy costs, long wait times, and social stigma. Many individuals avoid seeking help because traditional systems lack personalization and feel uncomfortable for discussing sensitive emotions openly.',
        solution: 'Developed an intelligent ecosystem featuring empathetic AI assistants for emotional conversations, real-time sentiment analysis, and immersive VR therapy environments (Zen forests, mountain peaks).',
        tech: ['React / React Native', 'Node.js', 'FastAPI', 'Three.js', 'Unity Engine', 'TensorFlow', 'Python', 'Sentiment Analysis'],
        features: [
            'AI Emotional Assistant',
            'VR Therapy Environments',
            'Mood & Emotion Analytics',
            'Guided Wellness Programs',
            'Smart Distress Detection'
        ],
        impact: [
            'Reduce mental health stigma 🧠',
            'Improve emotional awareness 🌍',
            'Make therapy more accessible 💙',
            'Support students & professionals 🎓'
        ],
        futureScope: [
            'AI therapist avatars',
            'Brain-computer interface integration',
            'Smart wearable integration',
            'Multiplayer mindfulness spaces'
        ],
        image: '/projects/neuronest-1.png',
        gallery: [
            '/projects/neuronest-1.png',
            '/projects/neuronest-2.png',
            '/projects/neuronest-3.png',
            '/projects/neuronest-4.png',
            '/projects/neuronest-5.png'
        ],
        IconComponent: Monitor,
        color: '#ff3333',
        links: {
            github: 'https://github.com/ItzHimanshu007',
            live: '#'
        }
    },
    {
        id: 'civic-pulse',
        year: '2024',
        title: 'Civic Pulse',
        subtitle: 'Advanced Frontend Architecture',
        category: 'Web Dev',
        description: 'A comprehensive React-based project showcasing the latest frontend technologies including Vite, Redux Toolkit, TailwindCSS, and D3.js.',
        briefing: 'Civic Pulse is a high-performance frontend blueprint for data-intensive web applications and real-time dashboards.\n\n• ADVANCED REACT 18 ARCHITECTURE: Utilizing concurrent rendering for a highly responsive user experience.\n• INTRICATE DATA VISUALIZATION: Complex mapping and charting integrated via D3.js for high-fidelity insights.\n• ROBUST STATE MANAGEMENT: Scalable global state control using Redux Toolkit for complex information streams.\n• STREAMLINED BUILD PIPELINE: Optimized with Vite and TailwindCSS for maximum development velocity and performance.',
        challenge: 'Setting up a cohesive development environment with disparate tools like D3.js, Redux, and Framer Motion often leads to configuration bloat and performance bottlenecks.',
        solution: 'Architected a streamlined starter using Vite for instant HMR, React 18 for concurrent rendering, and Tailwind CSS for rapid, scalable UI development.',
        tech: ['React 18', 'Vite', 'Redux', 'TailwindCSS', 'D3.js'],
        features: [
            'Real-time Data Visualization',
            'Redux State Management',
            'Responsive Architecture',
            'Streamlined Build Pipeline'
        ],
        impact: [
            'Improved development velocity',
            'Optimized runtime performance',
            'Scalable codebase foundation'
        ],
        futureScope: [
            'Micro-frontend integration',
            'Server-side rendering support',
            'Automated E2E testing'
        ],
        image: '/projects/civicpulse-3.png',
        gallery: [
            '/projects/civicpulse-1.png',
            '/projects/civicpulse-2.png',
            '/projects/civicpulse-3.png',
            '/projects/civicpulse-4.png'
        ],
        IconComponent: Layers,
        color: '#ff3333',
        links: {
            github: 'https://github.com/ItzHimanshu007',
            live: '#'
        }
    }
];

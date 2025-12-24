import { Monitor, Layers, Cpu, Zap, Rocket } from 'lucide-react';

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
        id: 'neuronest',
        year: '2024',
        title: 'Neuronest',
        subtitle: 'AI + VR Therapy Platform',
        category: 'Health Tech',
        description: 'An innovative mental health platform combining Artificial Intelligence and Virtual Reality to provide immersive therapy experiences.',
        briefing: 'Neuronest was designed to bridge the gap between traditional therapy and the digital age, utilizing VR environments to simulate exposure therapy and AI to track progress.',
        challenge: 'Synchronizing real-time biometric data with dynamic VR environments while maintaining clinical accuracy.',
        solution: 'Developed a custom WebSocket bridge that streams heart rate and stress levels into our ML model to adjust environmental variables instantly.',
        tech: ['React.js', 'TensorFlow', 'Unity', 'Python', 'WebRTC'],
        image: '/assets/uploaded_image_3_1766494380575.png',
        gallery: [
            '/assets/uploaded_image_3_1766494380575.png',
            '/assets/uploaded_image_3_1766494380575.png'
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
        subtitle: 'Smart City Governance',
        category: 'Gov Tech',
        description: 'Bridging the gap between citizens and local authorities through AI-driven insights and community participation analytics.',
        briefing: 'A centralized dashboard for city officials and a mobile app for citizens to report issues, track urban development, and vote on local initiatives.',
        challenge: 'Ensuring data veracity and preventing sybil attacks in community voting systems.',
        solution: 'Implemented a decentralized identity verification system using digital signatures and geographic fencing.',
        tech: ['React.js', 'Node.js', 'MongoDB', 'AI', 'Google Maps API'],
        image: '/assets/uploaded_image_3_1766494380575.png',
        gallery: [
            '/assets/uploaded_image_3_1766494380575.png'
        ],
        IconComponent: Layers,
        color: '#ff3333',
        links: {
            github: 'https://github.com/ItzHimanshu007',
            live: '#'
        }
    },
    {
        id: 'ai-loan-predictor',
        year: '2023',
        title: 'AI Loan Predictor',
        subtitle: 'Financial ML System',
        category: 'FinTech',
        description: 'Predictive machine learning system for financial institutions to assess loan eligibility with high accuracy.',
        briefing: 'Automation of the credit scoring process using ensemble learning models to reduce human bias and processing time.',
        challenge: 'Handling imbalanced datasets where approval cases vastly outnumbered rejections.',
        solution: 'Applied SMOTE (Synthetic Minority Over-sampling Technique) and tuned the XGBoost model to optimize for recall without sacrificing precision.',
        tech: ['Python', 'Scikit-learn', 'Pandas', 'XGBoost', 'Streamlit'],
        image: '/assets/uploaded_image_3_1766494380575.png',
        gallery: [
            '/assets/uploaded_image_3_1766494380575.png'
        ],
        IconComponent: Cpu,
        color: '#ff3333',
        links: {
            github: 'https://github.com/ItzHimanshu007',
            live: '#'
        }
    },
    {
        id: 'quantum-mesh',
        year: '2024',
        title: 'Quantum Mesh',
        subtitle: 'Distributed Computing',
        category: 'Infrastructure',
        description: 'A decentralized computing network leveraging idle GPU power for large-scale AI training and scientific research.',
        briefing: 'Building a marketplace for compute power where users could lease their hardware for cryptographic rewards.',
        challenge: 'Developing a robust verification system to ensure compute tasks were actually completed and not spoofed.',
        solution: 'Implemented Proof-of-Execution (PoE) consensus where results are cross-verified by multiple neutral nodes.',
        tech: ['Golang', 'Docker', 'Kubernetes', 'Web3', 'CUDA'],
        image: '/assets/uploaded_image_3_1766494380575.png',
        gallery: ['/assets/uploaded_image_3_1766494380575.png'],
        IconComponent: Zap,
        color: '#ff3333',
        links: {
            github: 'https://github.com/ItzHimanshu007',
            live: '#'
        }
    },
    {
        id: 'eco-tracker',
        year: '2023',
        title: 'Eco Tracker',
        subtitle: 'IOT Sustainability',
        category: 'Environment',
        description: 'Real-time carbon footprint monitoring system for manufacturing plants using multi-sensor IOT arrays.',
        briefing: 'Creating a transparency tool for stakeholders to monitor environmental compliance in real-time.',
        challenge: 'Filtering sensor noise in harsh industrial environments to provide accurate emission data.',
        solution: 'Developed a Kalman filter-based signal processing pipeline on the edge devices.',
        tech: ['C++', 'MQTT', 'InfluxDB', 'Grafana', 'ESP32'],
        image: '/assets/uploaded_image_3_1766494380575.png',
        gallery: ['/assets/uploaded_image_3_1766494380575.png'],
        IconComponent: Rocket,
        color: '#ff3333',
        links: {
            github: 'https://github.com/ItzHimanshu007',
            live: '#'
        }
    }
];

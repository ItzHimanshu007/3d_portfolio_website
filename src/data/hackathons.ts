import { Trophy, Globe, Cpu } from 'lucide-react';

export interface Hackathon {
    id: string;
    title: string;
    event: string;
    date: string;
    description: string;
    award: string;
    tech: string[];
    mainImage: string;
    gallery: string[];
    learnings: string[];
    achievements: string[];
    link?: string;
    icon: any;
}

export const hackathonsData: Hackathon[] = [
    {
        id: 'neural-nexus',
        title: 'Neural Nexus VR',
        event: 'Global AI & XR Hackathon',
        date: 'March 2025',
        description: 'Developed a brain-computer interface controlled VR environment for neuro-rehabilitation using specialized neural sensors.',
        award: '1st Runner Up',
        tech: ['React', 'Three.js', 'Python', 'TensorFlow'],
        mainImage: '/character-glasses-phone.png',
        gallery: ['/hackathon-win-trophy.png', '/hackathon-win-coding.png'],
        learnings: [
            'Integrating BCI sensors with real-time WebGL environments',
            'Optimizing neural data processing for low-latency VR feedback',
            'Designing accessible VR UIs for neuro-rehabilitation'
        ],
        achievements: [
            'Competed against 500+ global teams',
            'Successfully live-demoed BCI control',
            'Featured in TechCrunch Hackathon Special'
        ],
        icon: Cpu
    },
    {
        id: 'ecochain',
        title: 'EcoChain Protocol',
        event: 'Sustainability Block-Hack',
        date: 'January 2025',
        description: 'Built a decentralized carbon credit marketplace to incentivize manufacturing plants to reduce their carbon footprint.',
        award: 'Innovation Award',
        tech: ['Solidity', 'Web3.js', 'Next.js', 'Tailwind'],
        mainImage: '/character-globe.png',
        gallery: ['/hackathon-win-coding.png', '/hackathon-win-trophy.png'],
        learnings: [
            'Developing efficient Solidity contracts for carbon tokenization',
            'Implementing verifiable off-chain data via Oracles',
            'UX design for industrial-scale Web3 applications'
        ],
        achievements: [
            'Secured $10k in grant funding',
            'Zero-gas optimized contract architecture',
            'Winner of Best Use of Chainlink Oracle'
        ],
        icon: Globe
    },
    {
        id: 'medisync',
        title: 'MediSync AI',
        event: 'HealthTech Innovation Summit',
        date: 'November 2024',
        description: 'An AI-powered diagnostic tool for rural clinics that works offline and synchronizes data via satellite links.',
        award: 'Top 5 Finalist',
        tech: ['Flutter', 'Firebase', 'OpenCV', 'Pytorch'],
        mainImage: '/character-peace-laptop.png',
        gallery: ['/hackathon-win-trophy.png', '/hackathon-win-standing.png'],
        learnings: [
            'Optimizing Pytorch models for edge devices',
            'Building robust offline-first sync architectures',
            'Human-centric AI design for non-technical users'
        ],
        achievements: [
            'Reached Final Top 5 from 1200+ entries',
            '98% offline diagnostic accuracy',
            'Pilot program initiated in 3 rural clinics'
        ],
        icon: Trophy
    },
    {
        id: 'smartcity-vision',
        title: 'SmartCity Vision',
        event: 'Urban Tech Challenge',
        date: 'August 2024',
        description: 'Real-time traffic optimization system using computer vision and edge computing for smart intersections.',
        award: 'Best Technical Implementation',
        tech: ['Python', 'YOLO', 'Raspberry Pi', 'MQTT'],
        mainImage: '/character-tablet.png',
        gallery: ['/hackathon-win-trophy.png', '/hackathon-win-coding.png'],
        learnings: [
            'Deploying ML models on edge devices',
            'Real-time video processing optimization',
            'IoT communication protocols'
        ],
        achievements: [
            'Reduced traffic wait time by 35% in simulation',
            'Sub-100ms inference latency',
            'Collaboration with city planning officials'
        ],
        icon: Cpu
    },
    {
        id: 'agribot',
        title: 'AgriBot Autonomous',
        event: 'AgTech Innovation Sprint',
        date: 'June 2024',
        description: 'Autonomous drone system for precision agriculture with AI-powered crop disease detection.',
        award: '2nd Place',
        tech: ['ROS', 'TensorFlow Lite', 'React Native', 'AWS'],
        mainImage: '/character-drone.png',
        gallery: ['/hackathon-win-standing.png', '/hackathon-win-trophy.png'],
        learnings: [
            'ROS integration for drone control',
            'Mobile-first agricultural interfaces',
            'Cloud-based crop analytics'
        ],
        achievements: [
            '94% disease detection accuracy',
            'Covered 50 acres in pilot test',
            'Partnership offer from AgriTech startup'
        ],
        icon: Globe
    },
    {
        id: 'eduverse',
        title: 'EduVerse XR',
        event: 'EdTech Global Hackathon',
        date: 'April 2024',
        description: 'Immersive VR classroom platform enabling interactive 3D learning experiences for remote students.',
        award: 'Grand Prize Winner',
        tech: ['Unity', 'WebXR', 'Node.js', 'MongoDB'],
        mainImage: '/character-hero.png',
        gallery: ['/hackathon-win-trophy.png', '/hackathon-win-coding.png'],
        learnings: [
            'Multi-user VR synchronization',
            'Optimizing WebXR for low-end devices',
            'Gamification in educational contexts'
        ],
        achievements: [
            'Won $25k grand prize',
            'Featured on EdTech Weekly',
            '1000+ beta signups in first week'
        ],
        icon: Trophy
    }
];

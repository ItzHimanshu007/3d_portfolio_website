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
    }
];

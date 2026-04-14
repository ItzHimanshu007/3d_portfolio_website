import { Trophy, Globe, Award, Sparkles, Cpu, Zap, Target, Hexagon } from 'lucide-react';

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
        id: 'hackstorm-25',
        title: 'Neuronest VR Therapy',
        event: 'HACKSTORM \'25',
        date: '2025',
        description: 'Built an AI-powered VR adaptive therapy platform for PTSD, phobias, and anxiety using real-time biofeedback.',
        award: 'Winner',
        tech: ['Python', 'TensorFlow', 'Unity'],
        mainImage: '/character-glasses-phone.png',
        gallery: ['/hackathon-win-trophy.png', '/hackathon-win-coding.png'],
        learnings: [
            'Real-time biofeedback integration',
            'VR exposure therapy design',
            'Neural data processing'
        ],
        achievements: [
            'Won among 250+ competing teams',
            'Adaptive biofeedback loop validated with mental health professionals',
            'Exploring pilot deployment in clinical settings'
        ],
        icon: Trophy
    },
    {
        id: 'geospatial-hack-26',
        title: 'Jal Drishti Flood Engine',
        event: 'Geospatial Intelligence Hack \'26',
        date: '2026',
        description: 'Developed an ML-based urban flood prediction system using geospatial and meteorological data pipelines.',
        award: 'Winner',
        tech: ['Python', 'Geospatial Analysis', 'React.js'],
        mainImage: '/character-globe.png',
        gallery: ['/hackathon-win-coding.png', '/hackathon-win-trophy.png'],
        learnings: [
            'Geospatial data interpolation',
            'Satellite imagery processing',
            'Real-time risk visualization'
        ],
        achievements: [
            'Won among 180+ competing teams',
            'Real-time flood risk visualization using satellite + GIS data',
            'Selected for India Innovates 2026 at Bharat Mandapam'
        ],
        icon: Globe
    },
    {
        id: 'india-innovates-26',
        title: 'Jal Drishti — Civic Tech',
        event: 'India Innovates \'26',
        date: '2026',
        description: 'Presented civic-tech flood prediction solution to government officials, VCs, and international delegates at Bharat Mandapam, New Delhi.',
        award: 'Top 10',
        tech: ['Python', 'Geospatial Analysis', 'React.js'],
        mainImage: '/character-hero.png',
        gallery: ['/hackathon-win-standing.png', '/hackathon-win-trophy.png'],
        learnings: [
            'High-stakes stakeholder pitching',
            'Civic-tech policy integration',
            'Scalable urban risk models'
        ],
        achievements: [
            'Top 10 among 26,000+ participants',
            'One of India\'s largest civic-tech hackathons',
            'Presented to government officials and international delegates'
        ],
        icon: Award
    },
    {
        id: 'ideathon-25',
        title: 'Neuronest Exposure Therapy',
        event: 'IDEA-THON \'25',
        date: '2025',
        description: 'Developed an innovative VR exposure therapy system for PTSD and phobias, focusing on psychological immersion.',
        award: 'Winner',
        tech: ['Python', 'TensorFlow', 'Unity'],
        mainImage: '/character-thinking.png',
        gallery: ['/hackathon-win-trophy.png'],
        learnings: [
            'User immersion psychology',
            'Prototype validation methodologies',
            'Healthcare UI/UX'
        ],
        achievements: [
            'Won among 160+ teams',
            'VR exposure therapy for PTSD and phobias',
            'Recognized for innovative health solution'
        ],
        icon: Sparkles
    },
    {
        id: 'hackjklu-5',
        title: 'HackJKLU 5.0',
        event: 'JKLU Hackathon',
        date: '2025',
        description: 'Developed a technical solution for solving urban challenges using real-time data integration.',
        award: '2nd Place',
        tech: ['React', 'Node.js', 'Python'],
        mainImage: '/character-tablet.png',
        gallery: ['/hackathon-win-coding.png'],
        learnings: [
            'Real-time data visualization',
            'Agile hackathon development',
            'Rapid prototyping'
        ],
        achievements: [
            '2nd place among 250+ teams',
            'Successful live demonstration',
            'Positive judge feedback'
        ],
        icon: Cpu
    },
    {
        id: 'genisys-1',
        title: 'Genisys 1.0',
        event: 'MNIT Jaipur',
        date: '2025',
        description: 'Built a specialized AI solution for optimizing resource allocation in local ecosystems.',
        award: '2nd Place',
        tech: ['Python', 'ML', 'React'],
        mainImage: '/character-peace-laptop.png',
        gallery: ['/hackathon-win-standing.png'],
        learnings: [
            'Resource optimization algorithms',
            'Local ecosystem analysis',
            'Full-stack AI integration'
        ],
        achievements: [
            '2nd place among 150+ teams',
            'Technical excellence award candidate',
            'Recognized at MNIT Jaipur'
        ],
        icon: Zap
    },
    {
        id: 'acehack',
        title: 'AceHack',
        event: 'AceHack Hackathon',
        date: '2025',
        description: 'Participated in a high-intensity coding challenge focused on rapid product development.',
        award: '3rd Place',
        tech: ['React Native', 'Firebase', 'Express'],
        mainImage: '/character-drone.png',
        gallery: ['/hackathon-win-coding.png', '/hackathon-win-trophy.png'],
        learnings: [
            'Mobile-first development',
            'Backend scalability',
            'Team collaboration under pressure'
        ],
        achievements: [
            '3rd place among 200+ teams',
            'Developed working mobile prototype',
            'Winner of Best UI Design'
        ],
        icon: Target
    },
    {
        id: 'unstoppable-hack',
        title: 'Web3 Energy Marketplace',
        event: 'Unstoppable Hackathon, LNMIIT',
        date: '2025',
        description: 'Built a decentralized energy trading marketplace leveraging blockchain technology for transparent P2P energy exchange.',
        award: 'Winner',
        tech: ['Web3', 'Solidity', 'React'],
        mainImage: '/character-globe.png',
        gallery: ['/hackathon-win-trophy.png'],
        learnings: [
            'Blockchain-based P2P trading',
            'Smart contract security',
            'Decentralized identity'
        ],
        achievements: [
            'Won among 200+ teams',
            'Built a working decentralized energy trading marketplace',
            'Zero-knowledge proof integration concept'
        ],
        icon: Hexagon
    }
];

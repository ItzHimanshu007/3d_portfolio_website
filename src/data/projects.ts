import { Monitor, Activity, Globe } from 'lucide-react';

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
        subtitle: 'Adaptive VR Therapy System',
        category: 'Health Tech',
        description: 'An AI + VR adaptive therapy platform targeting PTSD, phobias, and anxiety disorders using biofeedback-driven personalization with GSR and HRV signals.',
        briefing: 'Neuronest bridges the gap between traditional therapy and emerging technology by creating immersive, personalized VR environments that adapt in real-time to patient biofeedback.',
        challenge: 'Synchronizing real-time biometric signals (GSR, HRV) with dynamic VR therapy environments while maintaining clinical reliability and low latency.',
        solution: 'Developed an adaptive biofeedback-driven system leveraging GSR and HRV signals to personalize therapy in real-time; validated with mental health professionals.',
        tech: ['Python', 'TensorFlow', 'Unity', 'WebRTC'],
        image: '/projects/neuronest.png',
        gallery: ['/projects/neuronest.png'],
        IconComponent: Monitor,
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
        subtitle: 'Urban Flood Prediction Engine',
        category: 'Civic Tech',
        description: 'A scalable flood prediction system integrating satellite imagery, GIS data, and meteorological datasets for real-time urban flood risk assessment.',
        briefing: 'Jal Drishti was built to give city planners and citizens actionable, real-time flood risk intelligence using geospatial AI — winner of multiple hackathons including India Innovates 2026.',
        challenge: 'Integrating heterogeneous geospatial data sources — satellite imagery, GIS layers, and live meteorological feeds — into a unified, low-latency prediction pipeline.',
        solution: 'Developed a scalable data pipeline leveraging spatial interpolation and geospatial analytics, with a React.js frontend for real-time risk visualization.',
        tech: ['Python', 'Geospatial Analysis', 'React.js'],
        image: '/projects/jal-drishti.png',
        gallery: ['/projects/jal-drishti.png'],
        IconComponent: Globe,
        color: '#ff3333',
        links: {
            github: 'https://github.com/ItzHimanshu007',
            live: '#'
        }
    },
    {
        id: 'medinexus',
        year: '2025',
        title: 'MediNexus',
        subtitle: 'Hospital Management Platform',
        category: 'Health Tech',
        description: 'A multi-tenant healthcare SaaS platform supporting patients, doctors, and admins with EHR management, billing, appointment scheduling, and inventory tracking.',
        briefing: 'MediNexus was designed to modernize hospital operations through a unified, role-based platform that handles everything from patient records to concurrent appointment booking.',
        challenge: 'Building a concurrent appointment booking system with slot locking and race condition prevention while maintaining performance under multi-user loads.',
        solution: 'Implemented Supabase Auth for role-based access control, PostgreSQL indexing for query optimization, and a Health Passport system for unified patient records across hospitals.',
        tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Supabase'],
        image: '/projects/medinexus.png',
        gallery: ['/projects/medinexus.png'],
        IconComponent: Activity,
        color: '#ff3333',
        links: {
            github: 'https://github.com/ItzHimanshu007',
            live: '#'
        }
    }
];

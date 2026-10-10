import { Monitor, Activity, Globe, Zap, Layers, type LucideIcon } from 'lucide-react';

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
    IconComponent: LucideIcon;
    color: string;
    // Only add real URLs: buttons are rendered only for links that exist.
    links: {
        repo?: string;
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
        image: '/projects/sungrid-1.webp',
        gallery: [
            '/projects/sungrid-1.webp',
            '/projects/sungrid-2.webp',
            '/projects/sungrid-3.webp',
            '/projects/sungrid-4.webp'
        ],
        IconComponent: Zap,
        color: '#ff3333',
        links: {
            live: 'https://sungrid-mz6jsm8jr-aditya-gautams-projects-496c032b.vercel.app'
        }
    },
    {
        id: 'medinexus',
        year: '2025',
        title: 'MediNexus',
        subtitle: 'Multi-Tenant Hospital Management Platform',
        category: 'Health Tech',
        description: 'A multi-tenant healthcare SaaS for patients, doctors, and admins with EHR management, appointment scheduling, billing, and inventory tracking.',
        briefing: 'MediNexus modernizes hospital operations through a unified, role-based platform that handles everything from patient records to concurrent appointment booking.\n\n• ROLE-BASED PORTALS: Separate patient, doctor, and admin experiences secured by Supabase Auth with granular permissions.\n• HEALTH PASSPORT: Unified patient records that follow the patient across hospitals, with cross-hospital access control and referrals.\n• CONCURRENT SCHEDULING: Appointment booking with slot locking that prevents double-booking under multi-user load.\n• OPERATIONS SUITE: EHR management, billing, and inventory tracking in one place.',
        challenge: 'Building a concurrent appointment booking system with slot locking and race-condition prevention while keeping performance stable under multi-user load.',
        solution: 'Implemented Supabase Auth for role-based access control, PostgreSQL indexing for query optimization, and a Health Passport system for unified patient records across hospitals.',
        tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Supabase'],
        features: [
            'Role-Based Access Control',
            'Health Passport (Unified Records)',
            'Appointment Scheduling with Slot Locking',
            'EHR, Billing & Inventory Management',
            'Referral System'
        ],
        impact: [
            'Unified patient records across hospitals',
            'Reliable scheduling without double-booked slots',
            'One platform for patients, doctors & admins'
        ],
        futureScope: [
            'Smart wearable integration',
            'Analytics dashboards for hospital operations'
        ],
        image: '/projects/medinexus-1.webp',
        gallery: [
            '/projects/medinexus-1.webp',
            '/projects/medinexus-2.webp'
        ],
        IconComponent: Activity,
        color: '#ff3333',
        links: {
            live: 'https://client-xi-blond-54.vercel.app/'
        }
    },
    {
        id: 'jal-drishti',
        year: '2025',
        title: 'Jal Drishti',
        subtitle: 'Urban Flood Prediction Engine',
        category: 'Civic Tech',
        description: 'A flood prediction system that combines satellite imagery, GIS layers, and meteorological data for real-time urban flood risk assessment.',
        briefing: 'Jal Drishti gives city planners and citizens actionable, real-time flood-risk intelligence using geospatial AI. It won the Geospatial Intelligence Hack \'26 and reached the Top 10 at India Innovates \'26.\n\n• FLOOD RISK MAPS: Grid-level risk heatmaps over satellite terrain, with flood type, impact zone, and model confidence.\n• RAINFALL SCENARIOS: Adjust the rainfall input to see how flood risk spreads across an area.\n• SAFE ROUTES: Suggests routes to nearby safe zones.\n• RESOURCE ALLOCATION: Prioritizes relief resources for the highest-risk areas.',
        challenge: 'Integrating heterogeneous geospatial data sources (satellite imagery, GIS layers, and live meteorological feeds) into a unified, low-latency prediction pipeline.',
        solution: 'Developed a scalable data pipeline using spatial interpolation and geospatial analytics, with an XGBoost model scoring flood risk and a React.js frontend for real-time risk visualization.',
        tech: ['Python', 'XGBoost', 'Geospatial Analysis', 'Satellite & GIS Data', 'React.js'],
        features: [
            'Flood Risk Heatmaps',
            'Rainfall Scenario Simulation',
            'Safe Route Suggestions',
            'Resource Allocation Planning'
        ],
        impact: [
            'Earlier flood warnings for vulnerable areas 🌊',
            'Data-driven evacuation planning 🚨',
            'Better allocation of relief resources 🏘️'
        ],
        futureScope: [
            'Live sensor and weather feed integration',
            'City-wide deployment with local authorities'
        ],
        image: '/projects/jaldrishti-1.webp',
        gallery: [
            '/projects/jaldrishti-1.webp',
            '/projects/jaldrishti-2.webp',
            '/projects/jaldrishti-3.webp'
        ],
        IconComponent: Globe,
        color: '#ff3333',
        links: {
            repo: 'https://github.com/ItzHimanshu007/jaldhristhi_jklu',
            live: 'https://jaldhristhi-mission-control-6emdfpu7s.vercel.app/'
        }
    },
    {
        id: 'neuronest',
        year: '2024',
        title: 'Neuronest',
        subtitle: 'Adaptive VR Exposure Therapy System',
        category: 'Health Tech',
        description: 'An AI + VR exposure therapy platform for PTSD, phobias, and anxiety disorders that personalizes each session using biofeedback (GSR and HRV signals).',
        briefing: 'Neuronest bridges traditional therapy and emerging technology with immersive VR environments that adapt in real time to patient biofeedback. It won HACKSTORM \'25 and IDEA-THON \'25.\n\n• VR EXPOSURE SCENES: Graded scenarios such as high-rise buildings, suspension bridges, and mountain cliffs for acrophobia treatment.\n• BIOFEEDBACK ADAPTATION: GSR and HRV signals adjust session intensity in real time.\n• PATIENT & THERAPIST DASHBOARDS: Patients track sessions, goals, and progress; therapists monitor and guide treatment.\n• CLINICAL VALIDATION: Validated with mental health professionals, with a pilot deployment being explored.',
        challenge: 'Synchronizing real-time biometric signals (GSR, HRV) with dynamic VR therapy environments while maintaining clinical reliability and low latency.',
        solution: 'Developed an adaptive, biofeedback-driven system that uses GSR and HRV signals to personalize therapy in real time, validated with mental health professionals.',
        tech: ['Python', 'TensorFlow', 'Unity', 'WebRTC'],
        features: [
            'VR Exposure Therapy Scenes',
            'GSR & HRV Biofeedback',
            'Adaptive Session Intensity',
            'Patient & Therapist Dashboards'
        ],
        impact: [
            'More accessible exposure therapy 💙',
            'Personalized, data-driven sessions 🧠',
            'Progress tracking for therapists 📈'
        ],
        futureScope: [
            'Clinical pilot deployment',
            'Additional phobia and PTSD scenarios'
        ],
        image: '/projects/neuronest-1.webp',
        gallery: [
            '/projects/neuronest-1.webp',
            '/projects/neuronest-2.webp',
            '/projects/neuronest-3.webp',
            '/projects/neuronest-4.webp',
            '/projects/neuronest-5.webp'
        ],
        IconComponent: Monitor,
        color: '#ff3333',
        links: {}
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
        image: '/projects/civicpulse-3.webp',
        gallery: [
            '/projects/civicpulse-1.webp',
            '/projects/civicpulse-2.webp',
            '/projects/civicpulse-3.webp',
            '/projects/civicpulse-4.webp'
        ],
        IconComponent: Layers,
        color: '#ff3333',
        links: {}
    }
];

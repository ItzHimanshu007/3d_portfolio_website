export interface ExperienceEntry {
    role: string;
    organization: string;
    period?: string;
    description: string;
    highlights: string[];
    current?: boolean;
}

export const experienceData: ExperienceEntry[] = [
    {
        role: 'Founder',
        organization: 'Neuronest',
        period: '2024 – Present',
        current: true,
        description: 'Leading development of an AI + VR adaptive therapy platform for PTSD, phobias, and anxiety disorders, personalized with biofeedback (GSR and HRV signals).',
        highlights: [
            'Winner of HACKSTORM \'25 (250+ teams) and IDEA-THON \'25 (160+ teams)',
            'Prototype validated with mental health professionals; exploring pilot deployment'
        ]
    },
    {
        role: 'Hackathon Team Lead',
        organization: 'Competitive Hackathons',
        description: 'Led teams through idea validation, rapid prototyping, and final pitching.',
        highlights: [
            '4 hackathon wins and a Top 10 finish at India Innovates \'26 (26,000+ participants)',
            'Presented to government officials, VCs, and international delegates at Bharat Mandapam'
        ]
    },
    {
        role: 'Technical Workshop Facilitator',
        organization: 'Git & REST API Workshops',
        description: 'Conducted 3 workshops on Git workflows and REST API design.',
        highlights: ['Reached 100+ aspiring developers']
    },
    {
        role: 'Open Source Contributor',
        organization: 'scikit-learn & pandas',
        description: 'Submitted bug fixes and documentation improvements to the scikit-learn and pandas repositories.',
        highlights: []
    }
];

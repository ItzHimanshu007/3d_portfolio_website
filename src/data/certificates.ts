export interface Certificate {
    title: string;
    issuer: string;
    date: string;
    description: string;
    skills: string[];
    // Public verification URL (Credly, Coursera, Google, ...). The "Verified" badge only shows when this is set.
    credentialUrl?: string;
}

// The Certificates section stays hidden while this list is empty. Only add certificates you have earned.
export const certificatesData: Certificate[] = [];

import { Code, Briefcase, Users } from 'lucide-react';

export const useCases = [
    {
        icon: Code,
        title: "Developers & Engineers",
        items: [
        "Share API keys and access tokens",
        "Distribute database credentials",
        "Send SSH keys and certificates",
        "Avoid credential leaks in Slack",
        "Secure CI/CD secrets delivery"
        ],
    },
    {
        icon: Briefcase,
        title: "Business & Legal",
        items: [
        "Share contract details with clients",
        "Distribute investor information",
        "Send compliance documents",
        "Secure M&A communications",
        "GDPR-compliant data sharing"
        ],
    },
    {
        icon: Users,
        title: "Teams & Agencies",
        items: [
        "Client login credentials",
        "Campaign access codes",
        "Partner portal passwords",
        "Vendor payment details",
        "Temporary access provisioning"
        ],
    },
];

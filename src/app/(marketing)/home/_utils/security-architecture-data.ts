import { Shield, Server, Flame, Eye } from "lucide-react";

export const securityArchitectureDetails = [
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description:
      "All messages, files, and secrets are encrypted on your device before being sent. The encryption key stays with the link and is never sent to our servers.",
    example: "https://cipheronce.com/s/abc123"
  },
  {
    icon: Server,
    title: "Zero-Knowledge Storage",
    description:
      "CipherOnce servers only store encrypted data. We do not have access to the encryption keys and cannot read, decrypt, or recover your content."
  },
  {
    icon: Flame,
    title: "Automatic & Permanent Deletion",
    description:
      "Once content is viewed or expires, it is permanently deleted. There are no backups, archives, or recovery options."
  },
  {
    icon: Eye,
    title: "Privacy by Default",
    description:
      "We do not read your content or track your activity. CipherOnce avoids unnecessary data collection and does not sell or analyze your private information."
  }
];

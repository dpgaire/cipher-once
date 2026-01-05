import { Lock, Key, Flame, Shield, Server, Trash2, Link, Smartphone } from "lucide-react";

export const howItWorksSteps = [
  {
    step: "1",
    icon: Lock,
    title: "Encrypt on your device",
    desc: "Messages, files, and secrets are encrypted on your device before being sent. CipherOnce never sees your data."
  },
  {
    step: "2",
    icon: Link,
    title: "Share securely",
    desc: "Share a secure link or message with full control, including expiration and download permissions."
  },
  {
    step: "3",
    icon: Flame,
    title: "Access expires",
    desc: "Once viewed or expired, the content is permanently deleted and cannot be accessed again."
  },
];

export const technicalDetails = [
  {
    icon: Shield,
    title: "End-to-End Encryption",
    desc: "Your data is encrypted before it leaves your device and stays protected at all times."
  },
  {
    icon: Key,
    title: "Keys Stay With You",
    desc: "Encryption keys are never stored on our servers or written to logs."
  },
  {
    icon: Server,
    title: "Zero-Knowledge Design",
    desc: "CipherOnce cannot read, recover, or access your messages or files."
  },
  {
    icon: Trash2,
    title: "Automatic Deletion",
    desc: "Content is permanently erased after access or when it expires."
  },
  {
    icon: Smartphone,
    title: "Device-Based Security",
    desc: "Modern authentication methods like QR login and passkeys reduce password risk."
  }
];

import { Shield, Lock, Flame, Eye, Clock, FileText, QrCode, Trash2, Globe } from 'lucide-react';

export const features = [
  { icon: Shield, title: "True Zero-Knowledge", desc: "We cannot decrypt your secrets. Period. The encryption key never leaves your device." },
  { icon: Lock, title: "Client-Side Encryption", desc: "All encryption happens in your browser using the Web Crypto API. We never see plaintext." },
  { icon: Flame, title: "Self-Destruct by Design", desc: "Secrets are deleted immediately after viewing. No grace period, no 'trash bin', no recovery." },
  { icon: Eye, title: "One-Time Access", desc: "Each secret can only be viewed once. Multiple access attempts are automatically blocked." },
  { icon: Clock, title: "Time-Based Expiration", desc: "Set custom expiration times from 5 minutes to 7 days. Unread secrets auto-delete." },
  { icon: FileText, title: "File Sharing", desc: "Share documents, images, and files up to 20MB with the same encryption standards." },
  { icon: QrCode, title: "QR Code Generation", desc: "Perfect for offline or in-person sharing. Scan and access securely." },
  { icon: Trash2, title: "No Content Logging", desc: "We don't log IP addresses, user agents, or any identifying information." },
  { icon: Globe, title: "No Account Required", desc: "Start sharing immediately. No registration, no tracking, no data collection." },
];

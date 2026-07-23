"use client";

import { Key, Database, Terminal, FileJson, Shield, Globe, Server, Wifi } from "lucide-react";

export interface SecretTemplate {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  exampleContent: string;
  suggestedExpiration: number;
  suggestedViews: number;
  suggestPassphrase: boolean;
  suggestAuth: boolean;
}

export const SECRET_TEMPLATES: SecretTemplate[] = [
  {
    id: "api-key",
    label: "API Key",
    icon: Key,
    description: "Share an API key securely",
    exampleContent: `sk-proj-9xK7mR3vL2pQ5wY8nB4cF6hJ1kM0zA7eD4gH2jS5`,
    suggestedExpiration: 1,
    suggestedViews: 1,
    suggestPassphrase: true,
    suggestAuth: false,
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    description: "Database credentials or URL",
    exampleContent: `postgresql://admin:password@db.example.com:5432/production_db
Username: admin
Password: p@ssw0rd_2024_secret
Host: db.example.com
Port: 5432`,
    suggestedExpiration: 1,
    suggestedViews: 1,
    suggestPassphrase: true,
    suggestAuth: false,
  },
  {
    id: "ssh-key",
    label: "SSH Key",
    icon: Terminal,
    description: "Private SSH key",
    exampleContent: `-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn
NhAAAAAwEAAQAAAQEA6NF1lW7gNjF6kG7yJ8LBjLMNqJqYmzVN8Q2vMx3q
-----END OPENSSH PRIVATE KEY-----`,
    suggestedExpiration: 24,
    suggestedViews: 1,
    suggestPassphrase: true,
    suggestAuth: false,
  },
  {
    id: "jwt",
    label: "JWT Token",
    icon: FileJson,
    description: "JSON Web Token",
    exampleContent: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIFVzZXIiLCJpYXQiOjE3MjAwMDAwMDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
    suggestedExpiration: 1,
    suggestedViews: 1,
    suggestPassphrase: false,
    suggestAuth: false,
  },
  {
    id: "recovery-code",
    label: "Recovery Code",
    icon: Shield,
    description: "Account recovery codes",
    exampleContent: `Recovery Codes for user@example.com
━━━━━━━━━━━━━━━━━━━━━
1. A7B2-C9D3-E4F5-G6H1
2. J8K2-L3M4-N5O6-P7Q8
3. R1S2-T3U4-V5W6-X7Y8
4. Z9A1-B2C3-D4E5-F6G7
5. H8I2-J3K4-L5M6-N7O8
━━━━━━━━━━━━━━━━━━━━━
Store these in a safe place.`,
    suggestedExpiration: 168,
    suggestedViews: 1,
    suggestPassphrase: true,
    suggestAuth: true,
  },
  {
    id: "env",
    label: ".env File",
    icon: FileJson,
    description: "Environment variables",
    exampleContent: `DATABASE_URL=postgresql://user:pass@localhost:5432/app_db
REDIS_URL=redis://:password@localhost:6379
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
STRIPE_API_KEY=sk_live_4eC39HqLyjWDarjtT1zdp7dc
JWT_SECRET=super-secret-jwt-key-change-in-production`,
    suggestedExpiration: 6,
    suggestedViews: 1,
    suggestPassphrase: true,
    suggestAuth: false,
  },
  {
    id: "vpn-config",
    label: "VPN Config",
    icon: Globe,
    description: "VPN configuration file",
    exampleContent: `client
dev tun
proto udp
remote vpn.example.com 1194
resolv-retry infinite
nobind
persist-key
persist-tun
ca ca.crt
cert client.crt
key client.key
remote-cert-tls server
tls-auth ta.key 1
cipher AES-256-CBC
verb 3`,
    suggestedExpiration: 24,
    suggestedViews: 2,
    suggestPassphrase: true,
    suggestAuth: false,
  },
  {
    id: "server-access",
    label: "Server Access",
    icon: Server,
    description: "Server credentials",
    exampleContent: `Server: prod-web-01.example.com
IP: 203.0.113.42
User: deploy
Password: d3pl0y_p@ss_2024!
Port: 22
SSH Key: ~/.ssh/prod_rsa`,
    suggestedExpiration: 1,
    suggestedViews: 1,
    suggestPassphrase: true,
    suggestAuth: false,
  },
  {
    id: "wifi-password",
    label: "WiFi Password",
    icon: Wifi,
    description: "Network credentials",
    exampleContent: `Network: Office_Guest_5G
Password: W1Fi@ccess2024!
Security: WPA2-PSK`,
    suggestedExpiration: 168,
    suggestedViews: 5,
    suggestPassphrase: false,
    suggestAuth: false,
  },
];

interface SecretTemplatesProps {
  onSelect: (template: SecretTemplate) => void;
}

const ICON_BG: Record<string, string> = {
  "api-key": "border-blue-500/15 bg-blue-500/5 group-hover:border-blue-400/25 group-hover:bg-blue-400/10",
  database: "border-emerald-500/15 bg-emerald-500/5 group-hover:border-emerald-400/25 group-hover:bg-emerald-400/10",
  "ssh-key": "border-orange-500/15 bg-orange-500/5 group-hover:border-orange-400/25 group-hover:bg-orange-400/10",
  jwt: "border-purple-500/15 bg-purple-500/5 group-hover:border-purple-400/25 group-hover:bg-purple-400/10",
  "recovery-code": "border-rose-500/15 bg-rose-500/5 group-hover:border-rose-400/25 group-hover:bg-rose-400/10",
  env: "border-cyan-500/15 bg-cyan-500/5 group-hover:border-cyan-400/25 group-hover:bg-cyan-400/10",
  "vpn-config": "border-violet-500/15 bg-violet-500/5 group-hover:border-violet-400/25 group-hover:bg-violet-400/10",
  "server-access": "border-amber-500/15 bg-amber-500/5 group-hover:border-amber-400/25 group-hover:bg-amber-400/10",
  "wifi-password": "border-sky-500/15 bg-sky-500/5 group-hover:border-sky-400/25 group-hover:bg-sky-400/10",
};

export function SecretTemplates({ onSelect }: SecretTemplatesProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        <p className="text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">
          Quick Start
        </p>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {SECRET_TEMPLATES.map((template) => {
          const Icon = template.icon;
          const colorClasses = ICON_BG[template.id] ?? "border-white/10 bg-white/5 group-hover:border-white/20 group-hover:bg-white/10";
          return (
            <button
              key={template.id}
              onClick={() => onSelect(template)}
              className="group relative overflow-hidden rounded-xl border border-white/[0.04] bg-gradient-to-b from-white/[0.02] to-transparent p-4 text-center transition-all duration-200 hover:border-[#C9A84C]/20 hover:bg-[#C9A84C]/[0.03] hover:shadow-[0_0_24px_rgba(201,168,76,0.06)]"
            >
              <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              <div
                className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 group-hover:scale-105 ${colorClasses}`}
              >
                <Icon className="h-4 w-4 text-[#6a6a7a] transition-colors duration-200 group-hover:text-[#C9A84C]" />
              </div>
              <p className="text-xs font-semibold text-white transition-colors duration-200 group-hover:text-[#C9A84C]">
                {template.label}
              </p>
              <p className="mt-0.5 text-[10px] leading-relaxed text-[#4a4a5a]">{template.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

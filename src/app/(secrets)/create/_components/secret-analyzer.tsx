"use client";

import { AlertTriangle, Key, Shield, FileJson, Terminal } from "lucide-react";
import { useMemo } from "react";

interface AnalyzerResult {
  type: string;
  icon: React.ElementType;
  severity: "low" | "medium" | "high" | "critical";
  label: string;
  suggestOneView: boolean;
  suggestPassword: boolean;
  suggestShortExpiration: boolean;
  suggestAuth: boolean;
}

const PATTERNS: { regex: RegExp; result: Omit<AnalyzerResult, "icon"> }[] = [
  {
    regex: /AKIA[0-9A-Z]{16}/,
    result: {
      type: "aws",
      severity: "critical",
      label: "AWS Access Key",
      suggestOneView: true,
      suggestPassword: true,
      suggestShortExpiration: true,
      suggestAuth: true,
    },
  },
  {
    regex: /gh[pousr]_[A-Za-z0-9_]{36,}/,
    result: {
      type: "github",
      severity: "critical",
      label: "GitHub Token",
      suggestOneView: true,
      suggestPassword: true,
      suggestShortExpiration: true,
      suggestAuth: true,
    },
  },
  {
    regex: /sk_live_[0-9a-zA-Z]{24,}/,
    result: {
      type: "stripe",
      severity: "critical",
      label: "Stripe Live Key",
      suggestOneView: true,
      suggestPassword: true,
      suggestShortExpiration: true,
      suggestAuth: true,
    },
  },
  {
    regex: /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/,
    result: {
      type: "jwt",
      severity: "high",
      label: "JWT Token",
      suggestOneView: true,
      suggestPassword: false,
      suggestShortExpiration: true,
      suggestAuth: false,
    },
  },
  {
    regex: /sk-[a-zA-Z0-9]{20,}/,
    result: {
      type: "openai",
      severity: "high",
      label: "OpenAI API Key",
      suggestOneView: true,
      suggestPassword: true,
      suggestShortExpiration: true,
      suggestAuth: true,
    },
  },
  {
    regex: /-----BEGIN (RSA |EC )?PRIVATE KEY-----/,
    result: {
      type: "private-key",
      severity: "critical",
      label: "Private Key",
      suggestOneView: true,
      suggestPassword: true,
      suggestShortExpiration: true,
      suggestAuth: true,
    },
  },
  {
    regex: /ssh-(rsa|ed25519|ecdsa) AAAA[0-9A-Za-z+/]+/,
    result: {
      type: "ssh",
      severity: "high",
      label: "SSH Public Key",
      suggestOneView: true,
      suggestPassword: false,
      suggestShortExpiration: false,
      suggestAuth: false,
    },
  },
  {
    regex: /(postgres|mysql|mongodb):\/\/[^\s]+/,
    result: {
      type: "database-url",
      severity: "high",
      label: "Database URL",
      suggestOneView: true,
      suggestPassword: true,
      suggestShortExpiration: true,
      suggestAuth: true,
    },
  },
];

function getIcon(type: string): React.ElementType {
  switch (type) {
    case "aws":
    case "github":
    case "stripe":
    case "openai":
      return Key;
    case "private-key":
    case "ssh":
      return Terminal;
    case "jwt":
      return FileJson;
    default:
      return Shield;
  }
}

interface SecretAnalyzerProps {
  content: string;
  onApplySuggestion?: (suggestion: {
    maxViews: number;
    requirePassphrase: boolean;
    expirationHours: number;
    requireAuth: boolean;
  }) => void;
}

export function SecretAnalyzer({ content, onApplySuggestion }: SecretAnalyzerProps) {
  const results = useMemo(() => {
    if (!content) return [];
    const found: AnalyzerResult[] = [];
    for (const pattern of PATTERNS) {
      if (pattern.regex.test(content)) {
        found.push({
          ...pattern.result,
          icon: getIcon(pattern.result.type),
        });
      }
    }
    return found;
  }, [content]);

  if (results.length === 0) return null;

  const mostSevere = results.reduce((prev, current) => {
    const severityOrder = { low: 0, medium: 1, high: 2, critical: 3 };
    return severityOrder[prev.severity] > severityOrder[current.severity]
      ? prev
      : current;
  });

  const severityColors = {
    low: "border-blue-500/15 bg-blue-500/[0.04] text-blue-400",
    medium: "border-yellow-500/15 bg-yellow-500/[0.04] text-yellow-400",
    high: "border-orange-500/15 bg-orange-500/[0.04] text-orange-400",
    critical: "border-red-500/15 bg-red-500/[0.04] text-red-400",
  };

  return (
    <div className={`rounded-xl border p-4 space-y-3 ${severityColors[mostSevere.severity]}`}>
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        <div className="space-y-1">
          <p className="text-xs font-bold">
            Sensitive Content Detected
          </p>
          <p className="text-xs opacity-80">
            We detected{" "}
            <span className="font-semibold">{results.length === 1 ? "a" : results.length}</span>{" "}
            {results.length === 1 ? "secret" : "secrets"} in your content:
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {results.map((result, index) => {
              const Icon = result.icon;
              return (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 rounded-full border border-current/20 bg-current/5 px-2.5 py-1 text-[10px] font-medium"
                >
                  <Icon className="h-3 w-3" />
                  {result.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {onApplySuggestion && (
        <button
          onClick={() =>
            onApplySuggestion({
              maxViews: mostSevere.suggestOneView ? 1 : 5,
              requirePassphrase: mostSevere.suggestPassword,
              expirationHours: mostSevere.suggestShortExpiration ? 1 : 24,
              requireAuth: mostSevere.suggestAuth,
            })
          }
          className="w-full rounded-lg bg-current/10 py-2 text-xs font-semibold transition-all hover:bg-current/20"
        >
          Apply Recommended Security Settings
        </button>
      )}
    </div>
  );
}

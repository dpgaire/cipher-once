/**
 * Utility functions for secret management
 */

export interface SecretConfig {
  maxViews: number
  expirationHours: number
  requirePassphrase: boolean
}

export const SECRET_EXPIRATION_OPTIONS = [
  { label: "10 seconds", value: 10 / 3600 }, // 10s
  { label: "30 seconds", value: 30 / 3600 }, // 30s
  { label: "45 seconds", value: 45 / 3600 }, // 45s
  { label: "1 minute", value: 1 / 60 },     // 1m
  { label: "2 minutes", value: 2 / 60 },    // 2m
  { label: "5 minutes", value: 5 / 60 },    // 5m
  { label: "10 minutes", value: 10 / 60 },  // 10m
  { label: "20 minutes", value: 20 / 60 },  // 20m
  { label: "30 minutes", value: 30 / 60 },  // 30m
  { label: "40 minutes", value: 40 / 60 },  // 40m
  { label: "50 minutes", value: 50 / 60 },  // 50m
  { label: "1 hour", value: 1 },
  { label: "2 hours", value: 2 },
  { label: "3 hours", value: 3 },
  { label: "4 hours", value: 4 },
  { label: "12 hours", value: 12 },
  { label: "1 day", value: 24 },
  { label: "3 days", value: 72 },
  { label: "7 days", value: 168 },
] as const

export const MAX_VIEW_OPTIONS = [
  { label: "One time", value: 1 },
  { label: "2 views", value: 2 },
  { label: "3 views", value: 3 },
  { label: "5 views", value: 5 },
  { label: "10 views", value: 10 },
  { label: "15 views", value: 15 },
  { label: "20 views", value: 20 },
  { label: "25 views", value: 25 },
  { label: "50 views", value: 50 },
  { label: "100 views", value: 100 },
  { label: "Unlimited", value: -1 },
] as const

export function calculateExpirationDate(hours: number): Date {
  const now = new Date()
  return new Date(now.getTime() + hours * 60 * 60 * 1000)
}

export function formatTimeRemaining(expiresAt: string | Date): string {
  const now = new Date()
  const expiry = new Date(expiresAt)
  const diffMs = expiry.getTime() - now.getTime()

  if (diffMs <= 0) return "Expired"

  const diffSeconds = Math.floor(diffMs / 1000)
  const days = Math.floor(diffSeconds / (3600 * 24))
  const hours = Math.floor((diffSeconds % (3600 * 24)) / 3600)
  const minutes = Math.floor((diffSeconds % 3600) / 60)
  const seconds = diffSeconds % 60

  if (days > 0) {
    return `${days}d ${hours}h`
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`
  }
  return `${seconds}s`
}

export function getSecretUrl(shortId: string, baseUrl?: string): string {
  const base = baseUrl || (typeof window !== "undefined" ? window.location.origin : "")
  return `${base}/s/${shortId}`
}

export interface SecretMetadata {
  createdBy?: string
  createdByEmail?: string
  ipAddress?: string
  userAgent?: string
  customNote?: string
}

export function sanitizeContent(content: string): string {
  return content.trim()
}

export function validateSecretContent(content: string): { valid: boolean; error?: string } {
  if (!content || content.trim().length === 0) {
    return { valid: false, error: "Secret content cannot be empty" }
  }

  if (content.length > 100000) {
    return { valid: false, error: "Secret content is too large (max 100KB)" }
  }

  return { valid: true }
}

export function validatePassphrase(passphrase: string): { valid: boolean; error?: string } {
  if (!passphrase || passphrase.length < 4) {
    return { valid: false, error: "Passphrase must be at least 4 characters" }
  }

  if (passphrase.length > 100) {
    return { valid: false, error: "Passphrase is too long (max 100 characters)" }
  }

  return { valid: true }
}
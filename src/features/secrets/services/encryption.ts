/**
 * Client-side encryption utilities using Web Crypto API
 * All encryption happens in the browser before sending to server
 */

const ALGORITHM = "AES-GCM"
const KEY_LENGTH = 256
const IV_LENGTH = 12 // 96 bits for GCM

/**
 * Generate a random encryption key
 */
export async function generateKey(): Promise<CryptoKey> {
  return await crypto.subtle.generateKey(
    {
      name: ALGORITHM,
      length: KEY_LENGTH,
    },
    true, // extractable
    ["encrypt", "decrypt"],
  )
}

/**
 * Export a CryptoKey to a base64 string
 */
export async function exportKey(key: CryptoKey): Promise<string> {
  const exported = await crypto.subtle.exportKey("raw", key)
  return bufferToBase64(exported)
}

/**
 * Import a base64 key string back to CryptoKey
 */
export async function importKey(keyString: string): Promise<CryptoKey> {
  const keyBuffer = base64ToBuffer(keyString)
  return await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    {
      name: ALGORITHM,
      length: KEY_LENGTH,
    },
    true,
    ["encrypt", "decrypt"],
  )
}

/**
 * Encrypt plaintext with a key
 * Returns {ciphertext, iv} both as base64 strings
 */
export async function encrypt(plaintext: string, key: CryptoKey): Promise<{ ciphertext: string; iv: string }> {
  const encoder = new TextEncoder()
  const data = encoder.encode(plaintext)

  // Generate random IV
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH))

  const encrypted = await crypto.subtle.encrypt(
    {
      name: ALGORITHM,
      iv: iv,
    },
    key,
    data,
  )

  return {
    ciphertext: bufferToBase64(encrypted),
    iv: bufferToBase64(iv.buffer),
  }
}

/**
 * Decrypt ciphertext with a key and iv
 */
export async function decrypt(ciphertext: string, iv: string, key: CryptoKey): Promise<string> {
  const ciphertextBuffer = base64ToBuffer(ciphertext)
  const ivBuffer = base64ToBuffer(iv)

  const decrypted = await crypto.subtle.decrypt(
    {
      name: ALGORITHM,
      iv: ivBuffer,
    },
    key,
    ciphertextBuffer,
  )

  const decoder = new TextDecoder()
  return decoder.decode(decrypted)
}

/**
 * Hash a passphrase to store/verify (using SHA-256)
 */
export async function hashPassphrase(passphrase: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(passphrase)
  const hash = await crypto.subtle.digest("SHA-256", data)
  return bufferToBase64(hash)
}

/**
 * Derive an encryption key from a passphrase using PBKDF2
 */
export async function deriveKeyFromPassphrase(passphrase: string, salt: string): Promise<CryptoKey> {
  const encoder = new TextEncoder()
  const passphraseKey = await crypto.subtle.importKey("raw", encoder.encode(passphrase), "PBKDF2", false, [
    "deriveBits",
    "deriveKey",
  ])

  const saltBuffer = base64ToBuffer(salt)

  return await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: saltBuffer,
      iterations: 100000,
      hash: "SHA-256",
    },
    passphraseKey,
    { name: ALGORITHM, length: KEY_LENGTH },
    true,
    ["encrypt", "decrypt"],
  )
}

/**
 * Generate a random salt for PBKDF2
 */
export function generateSalt(): string {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  return bufferToBase64(salt.buffer)
}

/**
 * Generate a short ID for the secret URL
 */
export function generateShortId(length = 12): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  const randomValues = crypto.getRandomValues(new Uint8Array(length))

  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length]
  }

  return result
}

// Helper functions for base64 encoding/decoding
function bufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ""
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

function base64ToBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}

/**
 * Constants for secret creation
 */

export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB in bytes

export const ACCEPTED_FILE_TYPES = [
  "image/*",
  "audio/*",
  "video/*",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "application/zip",
  "application/x-zip-compressed",
  ".zip",
].join(",");

export const DEFAULT_WATERMARK_TEXT = "cipheronce.com";

export const DEFAULT_EXPIRATION_HOURS = 24;

export const DEFAULT_MAX_VIEWS = 1;

export const ACCORDION_ITEMS = {
  FILE_OPTIONS: "file-options",
  LIMITS: "limits",
  PASSPHRASE: "passphrase",
  ACCESS: "access",
} as const;
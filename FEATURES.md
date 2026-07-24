# CIPHERONCE_V2_FEATURES.md

# CipherOnce v2 — Feature Enhancement Specification

> This document defines the next evolution of CipherOnce.
>
> Goal:
> Improve trust, usability, developer workflow, and recipient experience without changing the core encryption architecture.

---

# Design Principle

Do NOT add features just because competitors have them.

Every feature must satisfy at least one of:

* Reduce user mistakes
* Increase recipient trust
* Improve developer workflow
* Improve enterprise adoption
* Improve accessibility
* Improve transparency

---

# Priority 1 — Recipient Experience

Current

Recipient opens link.

Reads secret.

Done.

New Flow

Secret Received

↓

Security Information

↓

Verify Password (optional)

↓

Decrypting...

↓

View Secret

↓

Actions

↓

Destroy Confirmation

Recipient should immediately understand:

✓ This secret was encrypted before upload.

✓ The server cannot read it.

✓ This secret will be permanently destroyed.

---

# Secure Preview Mode

Problem

Users accidentally expose secrets while screen sharing.

Add

Reveal Secret button.

Default

---

Hold to Reveal

or

Click to Reveal

Auto-hide after 15 seconds.

Configurable.

---

# Secure Copy

Instead of

Copy

Add

Copy

↓

Clipboard timer

↓

Automatically clear clipboard after

30 seconds

60 seconds

2 minutes

(Where browser capabilities allow; otherwise explain limitations.)

---

# Secure File Viewer

Supported

PDF

Images

Text

JSON

Markdown

Log files

Display inside a secure viewer.

Requirements

No download by default.

No browser context menu (where feasible).

No drag-and-drop.

No open in new tab.

Disable text selection when appropriate.

Add

Destroy After Close

When recipient closes viewer

↓

Destroy Secret

---

# Image Viewer

Interactive

Zoom

Pan

Fullscreen

Rotate

Blur Sensitive Areas (optional future)

Watermark

Viewed Securely via CipherOnce

---

# PDF Viewer

Canvas rendering

No native browser PDF viewer.

Features

Zoom

Search

Page navigation

Fullscreen

Dark mode

Optional

Print disabled

Download disabled

Text copy disabled (best-effort only)

Watermark

Recipient email/IP (optional enterprise feature)

---

# Text Viewer

Syntax highlighting

JSON

YAML

.env

SSH Keys

Certificates

Markdown

Logs

Line numbers

Copy selected block

Collapse long files

---

# Secret Journey

Visual timeline

Created

↓

Encrypted

↓

Uploaded

↓

Waiting

↓

Opened

↓

Viewed

↓

Destroyed

Always visible.

---

# Security Panel

Display

Encryption

AES-256-GCM

Key stored in URL fragment

Client-side encryption

Zero Knowledge

Secret Size

Expires

Maximum Views

Passphrase

Authentication Required

---

# Recipient Checklist

Before revealing

✓ Private location

✓ Correct recipient

✓ Ready to copy

↓

Reveal Secret

---

# Priority 2 — Sender Experience

Templates

API Key

Database

SSH Key

JWT

Recovery Code

.env

VPN Config

Server Access

WiFi Password

Each template suggests

Expiration

View count

Passphrase

---

# Secret Analyzer

Detect

AWS

GitHub Token

Stripe

JWT

OpenAI

Azure

Google

Private Key

SSH

Database URL

Suggest

One View

Password

15 Minute Expiration

Authentication

---

# Package Sharing

Instead of

One Secret

Support

Deployment Package

Contains

SSH Key

Database

Redis

.env

Instructions

Recipient unlocks package.

Each item tracked individually.

---

# Favorite Templates

Save frequently used configurations.

Example

Production Credentials

↓

One View

↓

30 Minutes

↓

Password

↓

Authentication Required

---

# Priority 3 — Viewer Security

Screen Blur Mode

When window loses focus

Blur content.

Return

↓

Require Reveal again.

---

# Idle Protection

No interaction

↓

Auto Blur

↓

Countdown

↓

Destroy (optional)

---

# Screenshot Warning

Best effort only.

Warn users:

"This browser cannot reliably detect screenshots."

Never claim screenshots are blocked.

---

# Fullscreen Reading

Focus mode.

Hide UI.

Hide navigation.

Show only content.

---

# Watermark

Optional

Recipient

Timestamp

IP hash

Organization

Displayed over

PDF

Images

Text

---

# Priority 4 — Developer Features

Share Formats

Markdown

Slack

Discord

Teams

HTML

QR Code

Email

CLI

---

# CLI

cipheronce share .env

↓

Encrypted

↓

Returns Secure Link

---

# VS Code Extension

Right click

↓

Share via CipherOnce

---

# Browser Extension

Highlight text

↓

Encrypt

↓

Copy Link

---

# GitHub Action

Upload deployment secrets securely.

Return temporary links.

---

# Priority 5 — Enterprise

Organization

Team Workspaces

Audit Logs

Secret Policies

SSO

SCIM

Custom Branding

---

# UX Improvements

Progress animation

While encrypting

Show

Generating Key

↓

Encrypting

↓

Uploading

↓

Creating Link

↓

Done

---

# Better Success Screen

Instead of

Copy Link

Show

✓ Secret Created

Expiration

Views

Password Protected

Authentication Required

QR Code

Copy Link

Copy Markdown

Share

Create Another

---

# Documentation Improvements

New pages

How Encryption Works

Threat Model

Browser Security

Why URL Fragment

Architecture

FAQ

Security Comparison

---

# Accessibility

Keyboard shortcuts

Reduced motion

Screen readers

Focus trap

ARIA

Contrast

---

# Performance

Streaming uploads

Chunk uploads

Image optimization

Lazy loading

Virtual rendering

Minimal JavaScript

---

# Future Features

Burn After Download

Burn After Close

Scheduled Reveal

Secret Recall (before viewed)

Recipient Verification

Magic Link Authentication

Device Approval

Encrypted Comments

Encrypted Conversations

Secret Versioning

---

# Technical Notes

PDF Viewer

Use PDF.js rendered into HTML Canvas.

Never use the browser's native PDF renderer.

Image Viewer

Canvas rendering.

Support zoom/pan.

Markdown Viewer

Render locally.

Syntax Highlight

Shiki.

Large Files

Virtualized rendering.

Clipboard

Use Clipboard API.

Fallback gracefully.

All viewer logic must respect the existing zero-knowledge architecture.

No plaintext may ever be transmitted back to the server.

All decryption must continue to occur exclusively in the browser.

---

# Non-Goals

Do NOT claim:

* Screenshot blocking
* Impossible copying
* Impossible recording
* Impossible browser inspection

Browser security limitations must be communicated honestly.

CipherOnce improves confidentiality and reduces exposure, but cannot override operating system or browser capabilities.

---

# Definition of Success

A user should finish viewing a secret with complete confidence that:

* The server never saw the plaintext.
* The decryption key never left their browser.
* The secret lifecycle was transparent.
* The secret has been irreversibly destroyed according to its configured policy.
* The experience felt professional, trustworthy, and effortless.

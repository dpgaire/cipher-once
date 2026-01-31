"use client"

import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

interface CopyButtonProps {
  text: string
  label?: string
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost"
}

export function CopyButton({ text, label = "Copy", className, variant = "outline" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  return (
    <Button variant={variant} size="sm" onClick={handleCopy} className={className}>
      {copied ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Copied
        </>
      ) : (
        <>
          <Copy className="mr-2 h-4 w-4" />
          {label}
        </>
      )}
    </Button>
  )
}

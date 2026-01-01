"use client"

import { useEffect, useRef } from "react"

export default function ImageCanvasPreview({
  url,
}: {
  url: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!url || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let cancelled = false
    const img = new Image()

    img.onload = () => {
      if (cancelled) return

      // Set canvas size
      canvas.width = img.width
      canvas.height = img.height

      // Draw image
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)

      /* ===============================
         Watermark configuration
      =============================== */
      const watermarkText = "cipheronce.com"

      // Dynamic sizing based on image
      const fontSize = Math.max(16, canvas.width * 0.025)
      const padding = fontSize * 0.8

      ctx.font = `${fontSize}px Inter, Arial, sans-serif`
      ctx.textBaseline = "bottom"
      ctx.textAlign = "right"

      // Soft shadow for contrast
      ctx.shadowColor = "rgba(0, 0, 0, 0.35)"
      ctx.shadowBlur = 4
      ctx.shadowOffsetX = 1
      ctx.shadowOffsetY = 1

      // Watermark color
      ctx.fillStyle = "rgba(255, 255, 255, 0.45)"

      // Draw watermark bottom-right
      ctx.fillText(
        watermarkText,
        canvas.width - padding,
        canvas.height - padding
      )

      // Reset shadow
      ctx.shadowColor = "transparent"
    }

    img.onerror = () => {
      if (!cancelled) {
        console.error("Failed to load image preview:", url)
      }
    }

    // Important for cross-origin images (Supabase, S3, etc.)
    img.crossOrigin = "anonymous"
    img.src = url

    return () => {
      cancelled = true
      img.onload = null
      img.onerror = null
      img.src = ""
    }
  }, [url])

  return (
    <canvas
      ref={canvasRef}
      className="max-h-[500px] mx-auto rounded-md select-none pointer-events-none"
    />
  )
}

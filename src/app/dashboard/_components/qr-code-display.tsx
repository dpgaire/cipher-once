"use client"

import React, { useRef } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

const WATERMARK = "cipheronce.com"

interface QRCodeDisplayProps {
  value: string
  size: number // Add size to props
}

export function QRCodeDisplay({ value, size }: QRCodeDisplayProps) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  // Dynamic card dimensions based on QR code size
  const CARD_PADDING = 64; // Padding around the QR code within the card
  const CARD_WIDTH = size + CARD_PADDING;
  const CARD_HEIGHT = size + CARD_PADDING + 24; // Additional height for watermark

  /* ---------------- PNG EXPORT ---------------- */
  const downloadPNG = () => {
    if (!svgRef.current) return

    const canvas = document.createElement("canvas")
    const scale = 2 // retina quality
    canvas.width = CARD_WIDTH * scale
    canvas.height = CARD_HEIGHT * scale

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.scale(scale, scale)

    // Background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT)

    const img = new Image()
    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(svgBlob)

    img.onload = () => {
      // Draw QR code centered
      ctx.drawImage(img, (CARD_WIDTH - size) / 2, (CARD_HEIGHT - size - 24) / 2, size, size) // Adjusted Y position for watermark

      // Watermark
      ctx.fillStyle = "#9ca3af"
      ctx.font = "14px Inter, system-ui"
      ctx.textAlign = "center"
      ctx.fillText(WATERMARK, CARD_WIDTH / 2, CARD_HEIGHT - 24)

      const pngUrl = canvas.toDataURL("image/png")
      triggerDownload(pngUrl, "qr-cipher-once.png")
      URL.revokeObjectURL(url)
      toast.success("PNG downloaded")
    }

    img.src = url
  }

  /* ---------------- SVG EXPORT ---------------- */
  const downloadSVG = () => {
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_WIDTH}" height="${CARD_HEIGHT}">
  <rect width="100%" height="100%" fill="white"/>
  <g transform="translate(${(CARD_WIDTH - size) / 2}, ${(CARD_HEIGHT - size - 24) / 2})">
    ${svgRef.current?.innerHTML}
  </g>
  <text
    x="50%"
    y="${CARD_HEIGHT - 24}"
    font-size="14"
    text-anchor="middle"
    fill="#9ca3af"
    font-family="Inter, system-ui"
  >
    ${WATERMARK}
  </text>
</svg>
`
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    triggerDownload(url, "qr-cipher-once.svg")
    URL.revokeObjectURL(url)
    toast.success("SVG downloaded")
  }

  const triggerDownload = (href: string, filename: string) => {
    const a = document.createElement("a")
    a.href = href
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* CARD */}
      <div
        className="rounded-xl border bg-white shadow-sm flex flex-col items-center"
        style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
      >
        <div className="mt-6"> {/* Adjust margin-top based on card_padding / 2 */}
          <QRCodeSVG
            ref={svgRef}
            value={value}
            size={size} // Use the prop size
            level="H"
            fgColor="#000000"
            bgColor="#ffffff"
          />
        </div>
        <div className="mt-auto mb-6 text-sm text-muted-foreground">
          {WATERMARK}
        </div>
      </div>

      {/* DOWNLOAD */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download QR
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={downloadPNG}>Download PNG</DropdownMenuItem>
          <DropdownMenuItem onClick={downloadSVG}>Download SVG</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

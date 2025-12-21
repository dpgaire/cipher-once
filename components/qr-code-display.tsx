"use client"

import React, { useRef, useState, useEffect } from "react"
import { QRCodeSVG } from "qrcode.react" // Changed import
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

interface QRCodeDisplayProps {
  value: string // The URL or text to encode in the QR code
  size?: number
  level?: "L" | "M" | "Q" | "H"
  fgColor?: string
  bgColor?: string
  className?: string
}

export function QRCodeDisplay({
  value,
  size = 256,
  level = "H",
  fgColor = "#000000",
  bgColor = "#ffffff",
  className,
}: QRCodeDisplayProps) {
  const qrRef = useRef<HTMLDivElement>(null)
  const [canDownload, setCanDownload] = useState(false)

  useEffect(() => {
    setCanDownload(true) // Enable download after component mounts client-side
  }, [])

  const downloadQRCode = (format: "png" | "svg") => {
    if (!qrRef.current) return

    const canvas = qrRef.current.querySelector("canvas")
    const svg = qrRef.current.querySelector("svg")

    if (format === "png" && canvas) {
      const pngFile = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.href = pngFile
      downloadLink.download = "qrcode.png"
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
      toast.success("QR Code downloaded as PNG")
    } else if (format === "svg" && svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
      const svgUrl = URL.createObjectURL(svgBlob)
      const downloadLink = document.createElement("a")
      downloadLink.href = svgUrl
      downloadLink.download = "qrcode.svg"
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
      URL.revokeObjectURL(svgUrl)
      toast.success("QR Code downloaded as SVG")
    } else {
      toast.error("Failed to download QR Code. Format not supported or QR not rendered.")
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div ref={qrRef} className="rounded-lg border p-2">
        {value ? (
          <QRCodeSVG value={value} size={size} level={level} fgColor={fgColor} bgColor={bgColor} />
        ) : (
          <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: bgColor }}>
            <span className="text-muted-foreground text-sm">No value</span>
          </div>
        )}
      </div>
      {canDownload && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full max-w-[256px]">
              <Download className="mr-2 h-4 w-4" />
              Download QR
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => downloadQRCode("png")}>Download PNG</DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadQRCode("svg")}>Download SVG</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

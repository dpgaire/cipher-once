"use client"

import { Button } from "@/components/ui/button"
import { Mail, Share2 } from "lucide-react"
import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaTelegramPlane,
} from "react-icons/fa"
import { SiX } from "react-icons/si"

interface SocialShareButtonsProps {
  secretUrl: string
  title: string
  text: string
}

export function SocialShareButtons({
  secretUrl,
  title,
  text,
}: SocialShareButtonsProps) {
  // Ensure URL starts with https:// for reliable previews
  const fullUrl = secretUrl.startsWith("http") ? secretUrl : `https://${secretUrl}`
  const encodedUrl = encodeURIComponent(fullUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedText = encodeURIComponent(text)

  // Message with text + URL on new line (for platforms that support it)
  const fullMessage = `${text}\n\n${fullUrl}`
  const encodedFullMessage = encodeURIComponent(fullMessage)

  const shareOnX = () => {
    // Only URL → X shows full card preview
    window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}`, "_blank")
  }

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank")
  }

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedText}`,
      "_blank"
    )
  }

  const shareOnWhatsApp = () => {
    // Only URL → WhatsApp generates rich preview card reliably
    window.open(`https://api.whatsapp.com/send?text=${encodedUrl}`, "_blank")
  }

  const shareOnTelegram = () => {
    // URL first, then optional text → Shows preview
    window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`, "_blank")
  }

  const shareViaEmail = () => {
    window.open(
      `mailto:?subject=${encodedTitle}&body=${encodedFullMessage}`,
      "_blank"
    )
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: fullMessage, // Text + URL for clickability + preview
          url: "",
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    }
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center p-6">
      {/* X */}
      <Button
        onClick={shareOnX}
        className="h-14 w-14 rounded-full bg-black hover:bg-gray-800 text-white shadow-lg transition-transform hover:scale-105"
      >
        <SiX className="h-7 w-7" />
      </Button>

      {/* Facebook */}
      <Button
        onClick={shareOnFacebook}
        className="h-14 w-14 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white shadow-lg transition-transform hover:scale-105"
      >
        <FaFacebookF className="h-7 w-7" />
      </Button>

      {/* LinkedIn */}
      <Button
        onClick={shareOnLinkedIn}
        className="h-14 w-14 rounded-full bg-[#0A66C2] hover:bg-[#0a5bb1] text-white shadow-lg transition-transform hover:scale-105"
      >
        <FaLinkedinIn className="h-7 w-7" />
      </Button>

      {/* WhatsApp */}
      <Button
        onClick={shareOnWhatsApp}
        className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg transition-transform hover:scale-105"
      >
        <FaWhatsapp className="h-7 w-7" />
      </Button>

      {/* Telegram */}
      <Button
        onClick={shareOnTelegram}
        className="h-14 w-14 rounded-full bg-[#229ED9] hover:bg-[#1c8ac9] text-white shadow-lg transition-transform hover:scale-105"
      >
        <FaTelegramPlane className="h-7 w-7" />
      </Button>

      {/* Email */}
      <Button
        onClick={shareViaEmail}
        className="h-14 w-14 rounded-full bg-white hover:bg-gray-50 border border-gray-300 shadow-lg transition-transform hover:scale-105"
      >
        <Mail className="h-7 w-7 text-gray-700" />
      </Button>

      {/* Native Share */}
      {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
        <Button
          onClick={handleNativeShare}
          className="h-14 w-14 rounded-full bg-gray-800 hover:bg-gray-900 text-white shadow-lg transition-transform hover:scale-105"
        >
          <Share2 className="h-7 w-7" />
        </Button>
      )}
    </div>
  )
}
"use client";

import { useEffect, useRef } from "react";

const MAX_PREVIEW_HEIGHT = 500;

type ImageCanvasPreviewProps = {
  url: string;
  watermarkText: string;
};

export default function ImageCanvasPreview({
  url,
  watermarkText ='cipheronce.com',
}: ImageCanvasPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!url || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;
    const img = new Image();

    img.onload = () => {
      if (cancelled) return;

      const containerWidth = canvas.parentElement?.clientWidth || img.width;

      // 🔑 Calculate scale (fit inside box)
      const scale = Math.min(
        containerWidth / img.width,
        MAX_PREVIEW_HEIGHT / img.height,
        1 // never upscale
      );

      const drawWidth = Math.floor(img.width * scale);
      const drawHeight = Math.floor(img.height * scale);

      // Set canvas buffer size to draw size
      canvas.width = drawWidth;
      canvas.height = drawHeight;

      // Clear & draw scaled image
      ctx.clearRect(0, 0, drawWidth, drawHeight);
      ctx.drawImage(img, 0, 0, drawWidth, drawHeight);

      /* ===============================
         Watermark
      =============================== */
      const fontSize = Math.max(14, drawWidth * 0.03);
      const padding = fontSize * 0.8;

      ctx.save();
      ctx.font = `600 ${fontSize}px Inter, Arial, sans-serif`;
      ctx.textAlign = "right";
      ctx.textBaseline = "bottom";

      // Shadow for contrast
      ctx.shadowColor = "rgba(0,0,0,0.4)";
      ctx.shadowBlur = 4;

      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fillText(watermarkText, drawWidth - padding, drawHeight - padding);

      ctx.restore();
    };

    img.onerror = () => {
      if (!cancelled) {
        console.error("Failed to load image preview:", url);
      }
    };

    img.crossOrigin = "anonymous";
    img.src = url;

    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
      img.src = "";
    };
  }, [url]);

  return (
    <div className="w-full overflow-hidden flex justify-center">
      <canvas
        ref={canvasRef}
        className="rounded-md select-none pointer-events-none"
      />
    </div>
  );
}

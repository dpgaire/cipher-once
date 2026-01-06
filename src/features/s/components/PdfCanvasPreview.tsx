"use client";

import { useEffect, useRef } from "react";
import * as pdfjs from "pdfjs-dist";
import type { PDFDocumentProxy } from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

type PdfCanvasPreviewProps = {
  url: string;
  watermarkText: string;
};

export default function PdfCanvasPreview({
  url,
  watermarkText,
}: PdfCanvasPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!url || !containerRef.current) return;

    const container = containerRef.current;
    let pdfDoc: PDFDocumentProxy | null = null;
    let cancelled = false;

    container.innerHTML = "";

    const loadingTask = pdfjs.getDocument({
      url,
      withCredentials: false,
    });

    loadingTask.promise
      .then(async (doc) => {
        if (cancelled) {
          doc.destroy();
          return;
        }

        pdfDoc = doc;

        for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
          if (cancelled) break;

          const page = await doc.getPage(pageNum);
          const scale = 1.5;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.maxWidth = "100%";
          canvas.style.height = "auto";
          canvas.className = "rounded-md border mb-2 select-none";

          const ctx = canvas.getContext("2d");
          if (!ctx) continue;

          container.appendChild(canvas);

          // Render page
          await page.render({
            canvasContext: ctx,
            viewport,
          }).promise;

          const fontSize = Math.max(16, viewport.width * 0.022);
          const padding = fontSize * 0.9;

          ctx.save();

          ctx.font = `600 ${fontSize}px Inter, Arial, sans-serif`;
          ctx.textAlign = "right";
          ctx.textBaseline = "bottom";

          // Stroke (white outline)
          ctx.lineWidth = Math.max(2, fontSize * 0.08);
          ctx.strokeStyle = "rgba(255,255,255,0.85)";
          ctx.strokeText(
            watermarkText,
            canvas.width - padding,
            canvas.height - padding
          );

          // Fill (dark text)
          ctx.fillStyle = "rgba(0,0,0,0.45)";
          ctx.fillText(
            watermarkText,
            canvas.width - padding,
            canvas.height - padding
          );

          ctx.restore();
        }
      })
      .catch((error) => {
        if (!cancelled && error?.name !== "CancelledException") {
          console.error("Error rendering PDF:", error);
        }
      });

    return () => {
      cancelled = true;
      if (pdfDoc) {
        pdfDoc.destroy();
      }
    };
  }, [url]);

  return <div ref={containerRef} className="w-full space-y-2" />;
}

"use client"

import { useEffect, useRef } from "react"
import * as pdfjs from "pdfjs-dist"
import type { PDFDocumentProxy } from "pdfjs-dist"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString()

export default function PdfCanvasPreview({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!url || !containerRef.current) return;

    const container = containerRef.current;
    let pdfDoc: PDFDocumentProxy | null = null;
    let cancelled = false;

    const loadingTask = pdfjs.getDocument(url);
    
    loadingTask.promise.then(async (doc) => {
      if (cancelled) {
        doc.destroy();
        return;
      }
      pdfDoc = doc;
      
      // Clear previous canvases
      container.innerHTML = '';

      for (let i = 1; i <= doc.numPages; i++) {
        if (cancelled) break;

        const page = await doc.getPage(i);
        
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        canvas.style.maxWidth = '100%';
        canvas.style.height = 'auto';
        canvas.style.marginBottom = '8px';
        const context = canvas.getContext('2d');
        if(!context) continue;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        container.appendChild(canvas);
        
        page.render({
          canvasContext: context,
          viewport,
        });
      }
    }).catch(error => {
      if (error.name !== 'CancelledException' && !cancelled) {
        console.error('Error rendering PDF:', error);
      }
    });

    return () => {
      cancelled = true;
      if (pdfDoc) {
        pdfDoc.destroy();
      }
      // loadingTask is not destroyed to prevent worker errors
    };
  }, [url]);

  return <div ref={containerRef} className="w-full" />;
}

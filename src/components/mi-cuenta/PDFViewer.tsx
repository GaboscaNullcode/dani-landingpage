'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Loader2, AlertCircle } from 'lucide-react';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  pdfUrl: string;
  productName: string;
}

export default function PDFViewer({ pdfUrl, productName }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const measureContainer = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('resize', measureContainer);
    };
  }, [measureContainer]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    measureContainer();
    window.addEventListener('resize', measureContainer);
  };

  const onDocumentLoadError = () => {
    setError(true);
    setLoading(false);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white p-12 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
        <AlertCircle className="h-12 w-12 text-coral" />
        <p className="text-center font-[var(--font-headline)] text-lg font-bold text-black-deep">
          No se pudo cargar el documento
        </p>
        <p className="text-center text-sm text-gray-carbon">
          Intenta recargar la página. Si el problema persiste, contáctanos.
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center"
      onContextMenu={(e) => e.preventDefault()}
      style={{ userSelect: 'none' }}
    >
      {/* PDF container */}
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (node) {
            setContainerWidth(node.clientWidth);
          }
        }}
        className="w-full max-w-3xl"
      >
        {loading && (
          <div className="flex items-center justify-center rounded-2xl bg-white py-32 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <Loader2 className="h-8 w-8 animate-spin text-coral" />
            <span className="ml-3 text-sm text-gray-carbon">
              Cargando {productName}...
            </span>
          </div>
        )}

        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={null}
        >
          {numPages > 0 &&
            Array.from({ length: numPages }, (_, i) => (
              <div
                key={i}
                className="mb-4 overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
              >
                <Page
                  pageNumber={i + 1}
                  width={containerWidth > 0 ? containerWidth : undefined}
                  loading={
                    <div className="flex items-center justify-center py-32">
                      <Loader2 className="h-6 w-6 animate-spin text-coral" />
                    </div>
                  }
                />
              </div>
            ))}
        </Document>
      </div>

      {/* Page count indicator */}
      {numPages > 0 && (
        <div className="sticky bottom-6 mt-4 rounded-full bg-white/90 px-5 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm">
          <span className="text-sm font-semibold text-black-deep">
            {numPages} páginas
          </span>
        </div>
      )}
    </div>
  );
}

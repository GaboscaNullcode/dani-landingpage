'use client';

import dynamic from 'next/dynamic';

const PDFViewer = dynamic(
  () => import('./PDFViewer'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center rounded-2xl bg-white py-32 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-coral border-t-transparent" />
        <span className="ml-3 text-sm text-gray-carbon">
          Cargando documento...
        </span>
      </div>
    ),
  },
);

export default PDFViewer;

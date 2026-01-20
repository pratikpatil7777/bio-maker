'use client';

import React, { useState } from 'react';
import { translations, Language } from '@/lib/translations';

interface PDFExportButtonProps {
  language: Language;
  targetRef: React.RefObject<HTMLDivElement | null>;
  fileName?: string;
}

export default function PDFExportButton({
  language,
  targetRef,
  fileName = 'Pratik_Ravindra_Patil_Biodata',
}: PDFExportButtonProps) {
  const t = translations[language];
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExport = async () => {
    if (!targetRef.current) return;

    setIsGenerating(true);

    try {
      // Dynamically import html2pdf to avoid SSR issues
      const html2pdf = (await import('html2pdf.js')).default;

      const element = targetRef.current;

      const opt = {
        margin: 0,
        filename: `${fileName}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: {
          scale: 3,
          useCORS: true,
          allowTaint: true,
          letterRendering: true,
          logging: false,
          imageTimeout: 0,
        },
        jsPDF: {
          unit: 'mm' as const,
          format: 'a4' as const,
          orientation: 'portrait' as const,
          compress: true,
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (html2pdf() as any)
        .set(opt)
        .from(element)
        .toPdf()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .get('pdf')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((pdfDoc: any) => {
          // Remove any extra blank pages
          const totalPages = pdfDoc.internal.pages.length - 1;
          if (totalPages > 1) {
            for (let i = totalPages; i > 1; i--) {
              pdfDoc.deletePage(i);
            }
          }
          return pdfDoc;
        })
        .save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isGenerating}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all ${
        isGenerating
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-[#800020] text-white hover:bg-[#600018] shadow-md hover:shadow-lg cursor-pointer'
      }`}
    >
      {isGenerating ? (
        <>
          <svg
            className="animate-spin w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Generating...</span>
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <span>{t.downloadPDF}</span>
        </>
      )}
    </button>
  );
}

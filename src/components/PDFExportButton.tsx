'use client';

import React, { useState, useCallback } from 'react';
import { translations, Language } from '@/lib/translations';
import { useAlert } from './AlertDialog';

interface PDFExportButtonProps {
  language: Language;
  targetRef: React.RefObject<HTMLDivElement | null>;
  fileName?: string;
  pageCount?: number;
}

// A4 dimensions
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

// Helper to wait for all images in an element to load
const waitForImages = (element: HTMLElement): Promise<void> => {
  const images = element.querySelectorAll('img');
  const imagePromises = Array.from(images).map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.onerror = () => resolve();
      // Timeout fallback
      setTimeout(resolve, 2000);
    });
  });
  return Promise.all(imagePromises).then(() => {});
};

export default function PDFExportButton({
  language,
  targetRef,
  fileName = 'Marriage_Biodata',
  pageCount = 1,
}: PDFExportButtonProps) {
  const t = translations[language];
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<string>('');
  const { showError } = useAlert();

  const handleExport = useCallback(async () => {
    if (!targetRef.current) return;

    setIsGenerating(true);
    setProgress(language === 'mr' ? 'तयारी करत आहे...' : 'Preparing...');

    try {
      const [html2canvasModule, jsPDFModule] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);
      const html2canvas = html2canvasModule.default;
      const { jsPDF } = jsPDFModule;

      const container = targetRef.current;

      // Find all pages in the paged view
      const pages = container.querySelectorAll('.biodata-page');

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      if (pages.length > 0) {
        // Wait for all images to be loaded first
        await waitForImages(container);

        // Small delay to ensure rendering is complete
        await new Promise(resolve => setTimeout(resolve, 300));

        // PAGED VIEW: Capture each page separately
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i] as HTMLElement;

          setProgress(
            language === 'mr'
              ? `पृष्ठ ${i + 1}/${pages.length} कॅप्चर करत आहे...`
              : `Capturing page ${i + 1} of ${pages.length}...`
          );

          if (i > 0) {
            pdf.addPage('a4', 'portrait');
          }

          // Scroll page into view to ensure it's rendered
          page.scrollIntoView({ behavior: 'instant', block: 'start' });
          await new Promise(resolve => setTimeout(resolve, 100));

          // Capture using element's actual dimensions
          const canvas = await html2canvas(page, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false,
            backgroundColor: '#FFFEF0', // Explicit background color
            imageTimeout: 5000,
            removeContainer: true,
          });

          const imgData = canvas.toDataURL('image/jpeg', 0.95);
          pdf.addImage(imgData, 'JPEG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);
        }

        // Scroll back to top
        window.scrollTo(0, 0);
      } else {
        // EDIT MODE or single container: Capture entire element
        setProgress(language === 'mr' ? 'कॅप्चर करत आहे...' : 'Capturing...');

        const canvas = await html2canvas(container, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: null,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const imgWidth = A4_WIDTH_MM;
        const imgHeight = (canvas.height * A4_WIDTH_MM) / canvas.width;

        // Add image, cropping to A4 if needed
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, Math.min(imgHeight, A4_HEIGHT_MM));
      }

      setProgress(language === 'mr' ? 'सेव्ह करत आहे...' : 'Saving...');
      pdf.save(`${fileName}.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
      await showError(
        language === 'mr'
          ? 'PDF तयार करण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.'
          : 'Failed to generate PDF. Please try again.',
        language === 'mr' ? 'त्रुटी' : 'Error'
      );
    } finally {
      setIsGenerating(false);
      setProgress('');
    }
  }, [targetRef, fileName, language, showError]);

  return (
    <button
      onClick={handleExport}
      disabled={isGenerating}
      className={`h-9 flex items-center gap-1.5 px-4 rounded-lg font-semibold text-xs transition-all duration-300 ${
        isGenerating
          ? 'bg-gray-300 dark:bg-slate-600 text-gray-500 dark:text-slate-400 cursor-not-allowed'
          : 'golden-btn text-white hover:scale-[1.02] cursor-pointer'
      }`}
      style={!isGenerating ? {
        background: 'linear-gradient(to right, #D4AF37, #B8860B)',
        boxShadow: '0 4px 16px rgba(212, 175, 55, 0.5)',
      } : undefined}
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
          <span className="max-w-[120px] truncate">
            {progress || (language === 'mr' ? 'तयार करत आहे...' : 'Generating...')}
          </span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <span>{t.downloadPDF}</span>
          {pageCount > 1 && (
            <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded text-[10px]">
              {pageCount} {language === 'mr' ? 'पाने' : 'pages'}
            </span>
          )}
        </>
      )}
    </button>
  );
}

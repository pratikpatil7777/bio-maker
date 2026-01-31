'use client';

import React, { useState, useCallback } from 'react';
import { Language } from '@/lib/translations';
import { useAlert } from './AlertDialog';

interface DownloadButtonProps {
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
      setTimeout(resolve, 2000);
    });
  });
  return Promise.all(imagePromises).then(() => {});
};

export default function DownloadButton({
  language,
  targetRef,
  fileName = 'Marriage_Biodata',
  pageCount = 1,
}: DownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [progress, setProgress] = useState<string>('');
  const { showSuccess, showError } = useAlert();

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  const getText = (en: string, hi: string, mr: string) => {
    if (isHindi) return hi;
    if (isMarathi) return mr;
    return en;
  };

  const handleDownloadPDF = useCallback(async () => {
    if (!targetRef.current) return;

    setIsGenerating(true);
    setShowOptions(false);
    setProgress(getText('Preparing...', 'तैयारी हो रही है...', 'तयारी करत आहे...'));

    try {
      const [html2canvasModule, jsPDFModule] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);
      const html2canvas = html2canvasModule.default;
      const { jsPDF } = jsPDFModule;

      const container = targetRef.current;
      const pages = container.querySelectorAll('.biodata-page');

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      if (pages.length > 0) {
        await waitForImages(container);
        await new Promise(resolve => setTimeout(resolve, 300));

        for (let i = 0; i < pages.length; i++) {
          const page = pages[i] as HTMLElement;

          setProgress(
            getText(
              `Capturing page ${i + 1} of ${pages.length}...`,
              `पृष्ठ ${i + 1}/${pages.length} कैप्चर हो रहा है...`,
              `पृष्ठ ${i + 1}/${pages.length} कॅप्चर करत आहे...`
            )
          );

          if (i > 0) {
            pdf.addPage('a4', 'portrait');
          }

          page.scrollIntoView({ behavior: 'instant', block: 'start' });
          await new Promise(resolve => setTimeout(resolve, 100));

          const canvas = await html2canvas(page, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false,
            backgroundColor: '#FFFEF0',
            imageTimeout: 5000,
            removeContainer: true,
          });

          const imgData = canvas.toDataURL('image/jpeg', 0.95);
          pdf.addImage(imgData, 'JPEG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);
        }

        window.scrollTo(0, 0);
      } else {
        setProgress(getText('Capturing...', 'कैप्चर हो रहा है...', 'कॅप्चर करत आहे...'));

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

        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, Math.min(imgHeight, A4_HEIGHT_MM));
      }

      setProgress(getText('Saving...', 'सेव हो रहा है...', 'सेव्ह करत आहे...'));
      pdf.save(`${fileName}.pdf`);

      await showSuccess(
        getText('PDF downloaded successfully!', 'PDF डाउनलोड हो गई!', 'PDF डाउनलोड झाली!'),
        getText('Download Complete', 'डाउनलोड पूर्ण', 'डाउनलोड पूर्ण')
      );
    } catch (error) {
      console.error('Error generating PDF:', error);
      await showError(
        getText('Failed to generate PDF.', 'PDF बनाने में विफल।', 'PDF तयार करण्यात अयशस्वी.'),
        getText('Error', 'त्रुटि', 'त्रुटी')
      );
    } finally {
      setIsGenerating(false);
      setProgress('');
    }
  }, [targetRef, fileName, language, showSuccess, showError]);

  const handleDownloadImage = useCallback(async () => {
    if (!targetRef.current) return;

    setIsGenerating(true);
    setShowOptions(false);
    setProgress(getText('Preparing...', 'तैयारी हो रही है...', 'तयारी करत आहे...'));

    try {
      const html2canvas = (await import('html2canvas')).default;
      const container = targetRef.current;

      await waitForImages(container);

      // Find all biodata pages
      const pages = container.querySelectorAll('.biodata-page');

      if (pages.length > 1) {
        // Multiple pages - download each as separate image
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i] as HTMLElement;

          setProgress(
            getText(
              `Capturing page ${i + 1} of ${pages.length}...`,
              `पृष्ठ ${i + 1}/${pages.length} कैप्चर हो रहा है...`,
              `पृष्ठ ${i + 1}/${pages.length} कॅप्चर करत आहे...`
            )
          );

          page.scrollIntoView({ behavior: 'instant', block: 'start' });
          await new Promise(resolve => setTimeout(resolve, 100));

          const canvas = await html2canvas(page, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false,
            backgroundColor: '#FFFEF0',
            imageTimeout: 5000,
          });

          const blob = await new Promise<Blob | null>((resolve) => {
            canvas.toBlob((b) => resolve(b), 'image/png', 1.0);
          });

          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}_page${i + 1}.png`;
            a.click();
            URL.revokeObjectURL(url);
          }

          // Small delay between downloads
          if (i < pages.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 300));
          }
        }

        window.scrollTo(0, 0);

        await showSuccess(
          getText(`${pages.length} images downloaded!`, `${pages.length} इमेज डाउनलोड हो गईं!`, `${pages.length} इमेज डाउनलोड झाल्या!`),
          getText('Download Complete', 'डाउनलोड पूर्ण', 'डाउनलोड पूर्ण')
        );
      } else {
        // Single page
        const page = (pages[0] as HTMLElement) || container;

        setProgress(getText('Capturing...', 'कैप्चर हो रहा है...', 'कॅप्चर करत आहे...'));

        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: '#FFFEF0',
          imageTimeout: 5000,
        });

        setProgress(getText('Saving...', 'सेव हो रहा है...', 'सेव्ह करत आहे...'));

        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob((b) => resolve(b), 'image/png', 1.0);
        });

        if (!blob) throw new Error('Failed to generate image');

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.png`;
        a.click();
        URL.revokeObjectURL(url);

        await showSuccess(
          getText('Image downloaded successfully!', 'इमेज डाउनलोड हो गई!', 'इमेज डाउनलोड झाली!'),
          getText('Download Complete', 'डाउनलोड पूर्ण', 'डाउनलोड पूर्ण')
        );
      }
    } catch (error) {
      console.error('Error downloading image:', error);
      await showError(
        getText('Failed to generate image.', 'इमेज बनाने में विफल।', 'इमेज तयार करण्यात अयशस्वी.'),
        getText('Error', 'त्रुटि', 'त्रुटी')
      );
    } finally {
      setIsGenerating(false);
      setProgress('');
    }
  }, [targetRef, fileName, language, showSuccess, showError]);

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
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
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="max-w-[120px] truncate">{progress || getText('Generating...', 'तयार हो रहा है...', 'तयार करत आहे...')}</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>{getText('Download', 'डाउनलोड', 'डाउनलोड')}</span>
            {pageCount > 1 && (
              <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded text-[10px]">
                {pageCount} {getText('pages', 'पृष्ठ', 'पाने')}
              </span>
            )}
            <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>

      {/* Dropdown Options */}
      {showOptions && !isGenerating && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[1000]"
            onClick={() => setShowOptions(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 top-full mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden z-[1001] min-w-[180px]">
            {/* PDF */}
            <button
              onClick={handleDownloadPDF}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#333] dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zm-3 9v6h2v-2h1a2 2 0 000-4h-3zm2 2h1v-0h-1v0zm-5 4v-6h3a2 2 0 010 4h-1v2H7zm2-4h1v0H9v0z" />
                </svg>
              </div>
              <div className="flex flex-col items-start">
                <span>{getText('PDF', 'PDF', 'PDF')}</span>
                <span className="text-[10px] text-gray-400">
                  {getText('Best for printing', 'प्रिंट के लिए', 'प्रिंटसाठी उत्तम')}
                </span>
              </div>
            </button>

            {/* Image */}
            <button
              onClick={handleDownloadImage}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#333] dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer border-t border-gray-100 dark:border-slate-700"
            >
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex flex-col items-start">
                <span>{getText('Image', 'इमेज', 'इमेज')}</span>
                <span className="text-[10px] text-gray-400">
                  {getText('PNG format', 'PNG फॉर्मेट', 'PNG फॉरमॅट')}
                </span>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

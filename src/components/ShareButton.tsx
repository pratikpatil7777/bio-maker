'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/translations';

interface ShareButtonProps {
  language: Language;
  targetRef: React.RefObject<HTMLDivElement | null>;
  fileName?: string;
}

export default function ShareButton({
  language,
  targetRef,
  fileName = 'Pratik_Ravindra_Patil_Biodata',
}: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const generatePDFBlob = async (): Promise<Blob | null> => {
    if (!targetRef.current) return null;

    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = targetRef.current;

      const opt = {
        margin: 0,
        filename: `${fileName}.pdf`,
        image: { type: 'jpeg' as const, quality: 1 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
        },
        jsPDF: {
          unit: 'mm' as const,
          format: 'a4' as const,
          orientation: 'portrait' as const,
        },
      };

      // Generate PDF as blob
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfBlob = await (html2pdf() as any)
        .set(opt)
        .from(element)
        .toPdf()
        .get('pdf')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((pdf: any) => {
          // Remove extra pages
          const totalPages = pdf.internal.pages.length - 1;
          if (totalPages > 1) {
            for (let i = totalPages; i > 1; i--) {
              pdf.deletePage(i);
            }
          }
          return pdf.output('blob');
        });

      return pdfBlob;
    } catch (error) {
      console.error('Error generating PDF:', error);
      return null;
    }
  };

  const handleWebShare = async () => {
    setIsSharing(true);
    setShowOptions(false);

    try {
      const pdfBlob = await generatePDFBlob();
      if (!pdfBlob) {
        throw new Error('Failed to generate PDF');
      }

      const file = new File([pdfBlob], `${fileName}.pdf`, { type: 'application/pdf' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Marriage Biodata',
          text: 'Please find the marriage biodata attached.',
          files: [file],
        });
      } else {
        // Fallback: Download and show instructions
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
        alert('PDF downloaded! You can now share it via WhatsApp or any other app.');
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error);
        alert('Failed to share. Please try downloading the PDF instead.');
      }
    } finally {
      setIsSharing(false);
    }
  };

  const handleWhatsAppShare = async () => {
    setIsSharing(true);
    setShowOptions(false);

    try {
      const pdfBlob = await generatePDFBlob();
      if (!pdfBlob) {
        throw new Error('Failed to generate PDF');
      }

      // Download PDF first
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      // Small delay then open WhatsApp
      setTimeout(() => {
        const message = encodeURIComponent(
          '🙏 Namaste!\n\nPlease find the marriage biodata attached.\n\nRegards'
        );
        window.open(`https://wa.me/?text=${message}`, '_blank');
      }, 500);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to prepare for sharing. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        disabled={isSharing}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all ${
          isSharing
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-[#25D366] text-white hover:bg-[#1fb855] shadow-md hover:shadow-lg cursor-pointer'
        }`}
      >
        {isSharing ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Sharing...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
            </svg>
            <span>Share</span>
          </>
        )}
      </button>

      {/* Dropdown Options */}
      {showOptions && !isSharing && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowOptions(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 min-w-[180px]">
            {/* Web Share (if supported) or General Share */}
            <button
              onClick={handleWebShare}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#333] hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <span>Share PDF</span>
            </button>

            {/* WhatsApp */}
            <button
              onClick={handleWhatsAppShare}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#333] hover:bg-gray-50 transition-colors cursor-pointer border-t border-gray-100"
            >
              <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <span>WhatsApp</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/translations';
import { DynamicBiodataData } from '@/lib/types';
import { encodeShareLink } from '@/lib/shareLink';
import { createRedactedBiodata } from '@/lib/privacyUtils';
import { useAlert } from './AlertDialog';
import PrivacyConsentModal from './PrivacyConsentModal';

type ShareAction = 'image' | 'webshare' | 'whatsapp' | 'link' | 'shareableLink' | null;

interface ShareButtonProps {
  language: Language;
  targetRef: React.RefObject<HTMLDivElement | null>;
  fileName?: string;
  biodataData?: DynamicBiodataData;
  onPrivateShare?: (redactedData: DynamicBiodataData) => void;
}

export default function ShareButton({
  language,
  targetRef,
  fileName = 'Marriage_Biodata',
  biodataData,
  onPrivateShare,
}: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<ShareAction>(null);
  const { showSuccess, showError } = useAlert();

  const isDevanagari = language === 'mr' || language === 'hi';
  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  // Trilingual text helper
  const getText = (en: string, hi: string, mr: string) => {
    if (isHindi) return hi;
    if (isMarathi) return mr;
    return en;
  };

  const generateImageBlob = async (): Promise<Blob | null> => {
    if (!targetRef.current) return null;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const container = targetRef.current;

      // Find the first biodata page for capture
      const page = container.querySelector('.biodata-page') as HTMLElement || container;

      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#FFFEF0',
        imageTimeout: 5000,
      });

      return new Promise<Blob | null>((resolve) => {
        canvas.toBlob(
          (blob) => resolve(blob),
          'image/png',
          1.0
        );
      });
    } catch (error) {
      console.error('Error generating image:', error);
      return null;
    }
  };

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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfBlob = await (html2pdf() as any)
        .set(opt)
        .from(element)
        .toPdf()
        .get('pdf')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((pdf: any) => {
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

  // Initiate share with privacy modal
  const initiateShare = (action: ShareAction) => {
    setShowOptions(false);
    setPendingAction(action);
    setShowPrivacyModal(true);
  };

  // Handle privacy modal confirmation
  const handlePrivacyConfirm = async (sharePrivately: boolean) => {
    setShowPrivacyModal(false);

    if (sharePrivately && biodataData && onPrivateShare) {
      // Create redacted data and trigger callback
      const redactedData = createRedactedBiodata(biodataData);
      onPrivateShare(redactedData);

      // Small delay to allow UI to update with redacted data
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Execute the pending action
    switch (pendingAction) {
      case 'image':
        await executeDownloadImage();
        break;
      case 'webshare':
        await executeWebShare();
        break;
      case 'whatsapp':
        await executeWhatsAppShare();
        break;
      case 'shareableLink':
        await executeCopyShareableLink(sharePrivately);
        break;
    }

    setPendingAction(null);
  };

  const executeDownloadImage = async () => {
    setIsSharing(true);

    try {
      const imageBlob = await generateImageBlob();
      if (!imageBlob) {
        throw new Error('Failed to generate image');
      }

      const url = URL.createObjectURL(imageBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.png`;
      a.click();
      URL.revokeObjectURL(url);
      await showSuccess(
        getText('Image downloaded successfully!', 'इमेज डाउनलोड हो गई!', 'इमेज डाउनलोड झाली!'),
        getText('Download Complete', 'डाउनलोड पूर्ण', 'डाउनलोड पूर्ण')
      );
    } catch (error) {
      console.error('Error downloading image:', error);
      await showError(
        getText('Failed to generate image.', 'इमेज बनाने में विफल।', 'इमेज तयार करण्यात अयशस्वी.'),
        getText('Error', 'त्रुटि', 'त्रुटी')
      );
    } finally {
      setIsSharing(false);
    }
  };

  const executeWebShare = async () => {
    setIsSharing(true);

    try {
      // Try sharing image first (more universally supported on mobile)
      const imageBlob = await generateImageBlob();
      if (imageBlob) {
        const imageFile = new File([imageBlob], `${fileName}.png`, { type: 'image/png' });

        if (navigator.share && navigator.canShare({ files: [imageFile] })) {
          await navigator.share({
            title: getText('Marriage Biodata', 'विवाह बायोडाटा', 'विवाह बायोडाटा'),
            text: getText('Please find the marriage biodata attached.', 'कृपया बायोडाटा देखें।', 'कृपया बायोडाटा पहा.'),
            files: [imageFile],
          });
          return;
        }
      }

      // Fallback to PDF share
      const pdfBlob = await generatePDFBlob();
      if (!pdfBlob) {
        throw new Error('Failed to generate file');
      }

      const pdfFile = new File([pdfBlob], `${fileName}.pdf`, { type: 'application/pdf' });

      if (navigator.share && navigator.canShare({ files: [pdfFile] })) {
        await navigator.share({
          title: getText('Marriage Biodata', 'विवाह बायोडाटा', 'विवाह बायोडाटा'),
          text: getText('Please find the marriage biodata attached.', 'कृपया बायोडाटा देखें।', 'कृपया बायोडाटा पहा.'),
          files: [pdfFile],
        });
      } else {
        // Desktop fallback: download PDF
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
        await showSuccess(
          getText('PDF downloaded! You can now share it via WhatsApp or any other app.', 'PDF डाउनलोड हो गई! अब आप इसे WhatsApp या किसी भी ऐप से शेयर कर सकते हैं।', 'PDF डाउनलोड झाली! आता WhatsApp वर शेअर करा.'),
          getText('Download Complete', 'डाउनलोड पूर्ण', 'डाउनलोड पूर्ण')
        );
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error);
        await showError(
          getText('Failed to share. Please try downloading instead.', 'शेयर करने में विफल। कृपया डाउनलोड करें।', 'शेअर करण्यात अयशस्वी.'),
          getText('Share Failed', 'शेयर विफल', 'शेअर अयशस्वी')
        );
      }
    } finally {
      setIsSharing(false);
    }
  };

  const executeWhatsAppShare = async () => {
    setIsSharing(true);

    try {
      // On mobile, try Web Share API with image for WhatsApp
      const imageBlob = await generateImageBlob();
      if (imageBlob) {
        const imageFile = new File([imageBlob], `${fileName}.png`, { type: 'image/png' });

        if (navigator.share && navigator.canShare({ files: [imageFile] })) {
          await navigator.share({
            title: getText('Marriage Biodata', 'विवाह बायोडाटा', 'विवाह बायोडाटा'),
            files: [imageFile],
          });
          return;
        }
      }

      // Desktop fallback: download image + open WhatsApp
      if (imageBlob) {
        const url = URL.createObjectURL(imageBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }

      setTimeout(() => {
        const message = encodeURIComponent(
          getText(
            '\u{1F64F} Namaste!\n\nPlease find the marriage biodata attached.\n\nRegards',
            '\u{1F64F} नमस्ते!\n\nकृपया बायोडाटा देखें।\n\nधन्यवाद',
            '\u{1F64F} नमस्कार!\n\nकृपया बायोडाटा पहा.\n\nधन्यवाद'
          )
        );
        window.open(`https://wa.me/?text=${message}`, '_blank');
      }, 500);
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error:', error);
        await showError(
          getText('Failed to prepare for sharing. Please try again.', 'शेयर करने में विफल। कृपया पुनः प्रयास करें।', 'शेअर करण्यात अयशस्वी.'),
          getText('Error', 'त्रुटि', 'त्रुटी')
        );
      }
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyLink = async () => {
    setShowOptions(false);

    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      await showSuccess(
        getText('Link copied to clipboard!', 'लिंक कॉपी हो गई!', 'लिंक कॉपी झाली!'),
        getText('Copied', 'कॉपी सम्पन्न', 'कॉपी पूर्ण')
      );
    } catch {
      await showError(
        getText('Failed to copy link.', 'लिंक कॉपी नहीं हो सकी।', 'लिंक कॉपी करता आली नाही.'),
        getText('Error', 'त्रुटि', 'त्रुटी')
      );
    }
  };

  const executeCopyShareableLink = async (isPrivate: boolean) => {
    if (!biodataData) {
      await showError(
        getText('Biodata data not available.', 'बायोडाटा डेटा उपलब्ध नहीं है।', 'बायोडाटा डेटा उपलब्ध नाही.'),
        getText('Error', 'त्रुटि', 'त्रुटी')
      );
      return;
    }

    try {
      const baseUrl = window.location.origin + window.location.pathname;
      const dataToShare = isPrivate ? createRedactedBiodata(biodataData) : biodataData;
      const shareUrl = encodeShareLink(dataToShare, baseUrl);

      await navigator.clipboard.writeText(shareUrl);

      const message = isPrivate
        ? getText(
            'Private link copied! Sensitive info (contact, address, income) is hidden.',
            'निजी लिंक कॉपी हो गई! संवेदनशील जानकारी (संपर्क, पता, आय) छुपी है।',
            'खाजगी लिंक कॉपी झाली! संवेदनशील माहिती (संपर्क, पत्ता, उत्पन्न) लपवली आहे.'
          )
        : getText(
            'Shareable link copied! Anyone with this link can view your biodata.',
            'शेयर करने योग्य लिंक कॉपी हो गई! इस लिंक से कोई भी आपका बायोडाटा देख सकता है।',
            'शेअर करण्यायोग्य लिंक कॉपी झाली! या लिंकवरून कोणीही तुमचा बायोडाटा पाहू शकतो.'
          );

      await showSuccess(
        message,
        getText('Link Ready!', 'लिंक तैयार!', 'लिंक तयार!')
      );
    } catch (error) {
      console.error('Error creating shareable link:', error);
      await showError(
        getText('Failed to create shareable link.', 'लिंक बनाने में विफल।', 'लिंक तयार करण्यात अयशस्वी.'),
        getText('Error', 'त्रुटि', 'त्रुटी')
      );
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        disabled={isSharing}
        className={`h-9 flex items-center gap-1.5 px-4 rounded-lg font-semibold text-xs transition-all duration-300 ${
          isSharing
            ? 'bg-gray-300 dark:bg-slate-600 text-gray-500 dark:text-slate-400 cursor-not-allowed'
            : 'golden-btn text-white hover:scale-[1.02] cursor-pointer'
        }`}
        style={!isSharing ? {
          background: 'linear-gradient(to right, #D4AF37, #B8860B)',
          boxShadow: '0 4px 16px rgba(212, 175, 55, 0.5)',
        } : undefined}
      >
        {isSharing ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>{isHindi ? 'शेयर हो रहा है...' : isMarathi ? 'शेअर करत आहे...' : 'Sharing...'}</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
            </svg>
            <span>{isHindi ? 'शेयर करें' : isMarathi ? 'शेअर करा' : 'Share'}</span>
          </>
        )}
      </button>

      {/* Dropdown Options */}
      {showOptions && !isSharing && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[1000]"
            onClick={() => setShowOptions(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 top-full mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden z-[1001] min-w-[200px]">
            {/* Download as Image */}
            <button
              onClick={() => initiateShare('image')}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#333] dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span>{isHindi ? 'इमेज डाउनलोड (PNG)' : isMarathi ? 'इमेज डाउनलोड (PNG)' : 'Download Image (PNG)'}</span>
            </button>

            {/* Share via Web Share API */}
            <button
              onClick={() => initiateShare('webshare')}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#333] dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer border-t border-gray-100 dark:border-slate-700"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <span>{isHindi ? 'शेयर करें' : isMarathi ? 'शेअर करा' : 'Share'}</span>
            </button>

            {/* WhatsApp */}
            <button
              onClick={() => initiateShare('whatsapp')}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#333] dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer border-t border-gray-100 dark:border-slate-700"
            >
              <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <span>WhatsApp</span>
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#333] dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer border-t border-gray-100 dark:border-slate-700"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <span>{isHindi ? 'लिंक कॉपी करें' : isMarathi ? 'लिंक कॉपी करा' : 'Copy Link'}</span>
            </button>

            {/* Copy Shareable Link (with embedded data) */}
            {biodataData && (
              <button
                onClick={() => initiateShare('shareableLink')}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#333] dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer border-t border-gray-100 dark:border-slate-700"
              >
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex flex-col items-start">
                  <span>{isHindi ? 'शेयर योग्य लिंक' : isMarathi ? 'शेअर करण्यायोग्य लिंक' : 'Shareable Link'}</span>
                  <span className="text-[10px] text-gray-400">
                    {isHindi ? 'डेटा लिंक में है' : isMarathi ? 'डेटा लिंकमध्ये' : 'Data in link'}
                  </span>
                </div>
              </button>
            )}
          </div>
        </>
      )}

      {/* Privacy Consent Modal */}
      <PrivacyConsentModal
        isOpen={showPrivacyModal}
        onClose={() => {
          setShowPrivacyModal(false);
          setPendingAction(null);
        }}
        onConfirm={handlePrivacyConfirm}
        language={language}
      />
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/translations';

interface PrivacyConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (sharePrivately: boolean) => void;
  language: Language;
}

export default function PrivacyConsentModal({
  isOpen,
  onClose,
  onConfirm,
  language,
}: PrivacyConsentModalProps) {
  const [understood, setUnderstood] = useState(false);

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  const getText = (en: string, hi: string, mr: string) => {
    if (isHindi) return hi;
    if (isMarathi) return mr;
    return en;
  };

  if (!isOpen) return null;

  const handleShareNormally = () => {
    if (understood) {
      onConfirm(false);
      setUnderstood(false);
    }
  };

  const handleSharePrivately = () => {
    onConfirm(true);
    setUnderstood(false);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-amber-50 dark:bg-amber-900/30 px-6 py-4 border-b border-amber-100 dark:border-amber-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200">
                {getText('Privacy Notice', 'गोपनीयता सूचना', 'गोपनीयता सूचना')}
              </h3>
              <p className="text-xs text-amber-600 dark:text-amber-400">
                {getText('Before you share', 'शेयर करने से पहले', 'शेअर करण्यापूर्वी')}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <p className="text-sm text-gray-600 dark:text-slate-300 mb-4">
            {getText(
              'Your biodata contains personal information. Once shared, it can be forwarded, saved, or misused by others.',
              'आपके बायोडाटा में व्यक्तिगत जानकारी है। एक बार शेयर करने के बाद, इसे दूसरे लोग फॉरवर्ड, सेव या दुरुपयोग कर सकते हैं।',
              'तुमच्या बायोडाटामध्ये वैयक्तिक माहिती आहे. एकदा शेअर केल्यावर, इतर लोक ते फॉरवर्ड, सेव्ह किंवा गैरवापर करू शकतात.'
            )}
          </p>

          {/* Safety Tips */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mb-4">
            <h4 className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {getText('Safety Tips', 'सुरक्षा सुझाव', 'सुरक्षा टिप्स')}
            </h4>
            <ul className="text-xs text-red-600 dark:text-red-300 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>{getText("Don't share sensitive details (income, address) too early", 'संवेदनशील जानकारी (आय, पता) जल्दी शेयर न करें', 'संवेदनशील माहिती (उत्पन्न, पत्ता) लवकर शेअर करू नका')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>{getText('Verify the recipient before sharing', 'शेयर करने से पहले प्राप्तकर्ता की पुष्टि करें', 'शेअर करण्यापूर्वी प्राप्तकर्त्याची पडताळणी करा')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>{getText('Be cautious of matrimonial/romance scams', 'वैवाहिक/रोमांस घोटालों से सावधान रहें', 'वैवाहिक/रोमान्स घोटाळ्यांपासून सावध राहा')}</span>
              </li>
            </ul>
          </div>

          {/* Consent Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer group mb-4">
            <input
              type="checkbox"
              checked={understood}
              onChange={(e) => setUnderstood(e.target.checked)}
              className="mt-1 w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
            />
            <span className="text-sm text-gray-700 dark:text-slate-300 group-hover:text-gray-900 dark:group-hover:text-white">
              {getText(
                'I understand the risks and want to proceed with sharing',
                'मैं जोखिमों को समझता/समझती हूं और शेयर करना चाहता/चाहती हूं',
                'मला धोके समजले आहेत आणि मला शेअर करायचे आहे'
              )}
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-700">
          {/* Share Privately Option */}
          <button
            onClick={handleSharePrivately}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 mb-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            {getText('Share Privately (Hide Sensitive Info)', 'निजी रूप से शेयर करें (संवेदनशील जानकारी छुपाएं)', 'खाजगीपणे शेअर करा (संवेदनशील माहिती लपवा)')}
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-lg font-medium text-sm hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              {getText('Cancel', 'रद्द करें', 'रद्द करा')}
            </button>
            <button
              onClick={handleShareNormally}
              disabled={!understood}
              className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                understood
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed'
              }`}
            >
              {getText('Share Full Biodata', 'पूरा बायोडाटा शेयर करें', 'पूर्ण बायोडाटा शेअर करा')}
            </button>
          </div>

          <p className="text-[10px] text-center text-gray-400 dark:text-slate-500 mt-3">
            {getText(
              '"Share Privately" hides contact details, income & address',
              '"निजी शेयर" संपर्क विवरण, आय और पता छुपाता है',
              '"खाजगी शेअर" संपर्क तपशील, उत्पन्न आणि पत्ता लपवतो'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

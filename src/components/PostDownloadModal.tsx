'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '@/lib/types';
import FeedbackModal from './FeedbackModal';

interface PostDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAnother: () => void;
  language: Language;
}

export default function PostDownloadModal({
  isOpen,
  onClose,
  onCreateAnother,
  language,
}: PostDownloadModalProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const getText = (en: string, hi: string, mr: string) => {
    if (language === 'hi') return hi;
    if (language === 'mr') return mr;
    return en;
  };

  const handleCreateAnother = () => {
    onCreateAnother();
    onClose();
  };

  const handleRecommend = (platform: 'whatsapp' | 'copy') => {
    const shareText = getText(
      'I just created my marriage biodata using Bio Maker - free, no signup, beautiful designs! Try it: ',
      'मैंने Bio Maker से अपना बायोडाटा बनाया - मुफ्त, बिना साइनअप, सुंदर डिज़ाइन! आप भी बनाएं: ',
      'मी Bio Maker वापरून माझा बायोडाटा बनवला - मोफत, साइनअप नाही, सुंदर डिझाइन! तुम्हीही बनवा: '
    );
    const url = 'https://bio-maker-in.vercel.app';

    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText + url)}`, '_blank');
      onClose();
    } else {
      navigator.clipboard.writeText(shareText + url);
      setLinkCopied(true);
      setTimeout(() => {
        setLinkCopied(false);
        onClose();
      }, 1500);
    }
  };

  const handleFeedbackClose = () => {
    setShowFeedback(false);
    onClose();
  };

  if (!isOpen) return null;

  // If showing feedback modal, render it instead
  if (showFeedback) {
    return (
      <FeedbackModal
        isOpen={true}
        onClose={handleFeedbackClose}
        language={language}
      />
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-sm w-full rounded-2xl shadow-2xl overflow-hidden bg-white dark:bg-slate-800"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-6">
            {/* Success Header */}
            <div className="text-center mb-6">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
              >
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                {getText('Biodata Ready!', 'बायोडाटा तैयार!', 'बायोडाटा तयार!')}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {getText('What would you like to do next?', 'आगे क्या करना चाहेंगे?', 'पुढे काय करायला आवडेल?')}
              </p>
            </div>

            {/* Action Cards */}
            <div className="space-y-3">
              {/* Create Another Biodata */}
              <motion.button
                onClick={handleCreateAnother}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-700/50 hover:border-amber-300 dark:hover:border-amber-600 transition-all cursor-pointer group"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {getText('Create for Family Member', 'परिवार के लिए बनाएं', 'कुटुंबासाठी बनवा')}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {getText('Start a new biodata', 'नया बायोडाटा शुरू करें', 'नवीन बायोडाटा सुरू करा')}
                  </p>
                </div>
                <svg className="w-5 h-5 text-amber-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>

              {/* Recommend Bio Maker */}
              <motion.div
                className="w-full p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-gray-800 dark:text-white text-sm">
                      {getText('Know someone who needs a biodata?', 'किसी को बायोडाटा चाहिए?', 'कोणाला बायोडाटा हवा आहे?')}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {getText('Recommend Bio Maker', 'Bio Maker की सिफारिश करें', 'Bio Maker सुचवा')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => handleRecommend('whatsapp')}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </motion.button>
                  <motion.button
                    onClick={() => handleRecommend('copy')}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {linkCopied ? (
                      <>
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {getText('Copied!', 'कॉपी हुआ!', 'कॉपी झाले!')}
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {getText('Copy Link', 'लिंक कॉपी', 'लिंक कॉपी')}
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* Give Feedback */}
              <motion.button
                onClick={() => setShowFeedback(true)}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                whileHover={{ scale: 1.01 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                {getText('Rate your experience', 'अनुभव रेट करें', 'अनुभव रेट करा')}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Hook to manage post-download modal state
export function usePostDownloadModal() {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    // Don't show if user has already seen this in current session
    const hasSeenThisSession = sessionStorage.getItem('bio-maker-post-download-shown');
    if (!hasSeenThisSession) {
      setIsOpen(true);
      sessionStorage.setItem('bio-maker-post-download-shown', 'true');
    }
  };

  const closeModal = () => setIsOpen(false);

  return { isOpen, showModal, closeModal };
}

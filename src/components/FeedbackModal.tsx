'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '@/lib/types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

// Formspree endpoint - Replace with your own form ID from formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xbdpgdaj';

export default function FeedbackModal({ isOpen, onClose, language }: FeedbackModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSharePrompt, setShowSharePrompt] = useState(false);

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  const getText = (en: string, hi: string, mr: string) => {
    if (isHindi) return hi;
    if (isMarathi) return mr;
    return en;
  };

  const getRatingLabel = (r: number) => {
    const labels = {
      5: getText('Excellent!', 'उत्कृष्ट!', 'उत्कृष्ट!'),
      4: getText('Very Good', 'बहुत अच्छा', 'खूप छान'),
      3: getText('Good', 'अच्छा', 'चांगले'),
      2: getText('Fair', 'ठीक है', 'बरे'),
      1: getText('Poor', 'खराब', 'खराब'),
    };
    return labels[r as keyof typeof labels] || '';
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const feedbackData = {
      rating,
      feedback,
      language,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };

    try {
      // Send to Formspree
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        // Also save locally as backup
        const existingFeedback = JSON.parse(localStorage.getItem('bio-maker-feedback') || '[]');
        existingFeedback.push(feedbackData);
        localStorage.setItem('bio-maker-feedback', JSON.stringify(existingFeedback));
        localStorage.setItem('bio-maker-feedback-given', 'true');

        setSubmitted(true);

        // Show share prompt for high ratings
        if (rating >= 4) {
          setTimeout(() => setShowSharePrompt(true), 800);
        } else {
          setTimeout(onClose, 2000);
        }
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Still mark as submitted to not annoy user
      setSubmitted(true);
      setTimeout(onClose, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = (platform: 'whatsapp' | 'copy') => {
    const shareText = getText(
      'I just created my marriage biodata using Bio Maker - it\'s free and beautiful! Try it: ',
      'मैंने Bio Maker से अपना बायोडाटा बनाया - मुफ्त और सुंदर! आप भी बनाएं: ',
      'मी Bio Maker वापरून माझा बायोडाटा बनवला - मोफत आणि सुंदर! तुम्हीही बनवा: '
    );
    const url = 'https://bio-maker-in.vercel.app';

    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText + url)}`, '_blank');
    } else {
      navigator.clipboard.writeText(shareText + url);
    }

    setTimeout(onClose, 500);
  };

  const handleSkip = () => {
    sessionStorage.setItem('bio-maker-feedback-skipped', 'true');
    onClose();
  };

  const resetAndClose = () => {
    setRating(0);
    setFeedback('');
    setSubmitted(false);
    setShowSharePrompt(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleSkip}
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
            onClick={resetAndClose}
            className="absolute top-3 right-3 z-10 p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-6">
            {!submitted ? (
              <>
                {/* Header */}
                <div className="text-center mb-5">
                  <motion.div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 mb-3"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1 }}
                  >
                    <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                    {getText('Biodata Downloaded!', 'बायोडाटा डाउनलोड हुआ!', 'बायोडाटा डाउनलोड झाला!')}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {getText('Quick feedback?', 'त्वरित प्रतिक्रिया?', 'द्रुत अभिप्राय?')}
                  </p>
                </div>

                {/* Star Rating */}
                <div className="flex justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-0.5"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        className={`w-9 h-9 transition-all duration-150 ${
                          star <= (hoveredRating || rating)
                            ? 'text-amber-400'
                            : 'text-gray-200 dark:text-gray-600'
                        }`}
                        viewBox="0 0 24 24"
                        fill={star <= (hoveredRating || rating) ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    </motion.button>
                  ))}
                </div>

                {/* Rating label */}
                <div className="h-6 mb-4">
                  <AnimatePresence mode="wait">
                    {rating > 0 && (
                      <motion.p
                        key={rating}
                        className="text-center text-sm font-medium text-amber-600 dark:text-amber-400"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                      >
                        {getRatingLabel(rating)}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Feedback textarea - show for all ratings */}
                <AnimatePresence>
                  {rating > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4"
                    >
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder={
                          rating >= 4
                            ? getText('What did you like most? (optional)', 'आपको सबसे ज्यादा क्या पसंद आया? (वैकल्पिक)', 'तुम्हाला सर्वात जास्त काय आवडले? (ऐच्छिक)')
                            : getText('How can we improve? (optional)', 'हम कैसे सुधार करें? (वैकल्पिक)', 'आम्ही कसे सुधारू? (ऐच्छिक)')
                        }
                        className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 text-gray-800 dark:text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"
                        rows={2}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <motion.button
                  onClick={handleSubmit}
                  disabled={rating === 0 || isSubmitting}
                  className={`w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                    rating > 0
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md hover:shadow-lg cursor-pointer'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  }`}
                  whileHover={rating > 0 ? { scale: 1.01 } : {}}
                  whileTap={rating > 0 ? { scale: 0.99 } : {}}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {getText('Sending...', 'भेज रहे हैं...', 'पाठवत आहे...')}
                    </span>
                  ) : (
                    getText('Submit Feedback', 'फीडबैक भेजें', 'अभिप्राय पाठवा')
                  )}
                </motion.button>

                {/* Skip link */}
                <button
                  onClick={handleSkip}
                  className="w-full mt-2 py-2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
                >
                  {getText('Skip', 'छोड़ें', 'वगळा')}
                </button>
              </>
            ) : showSharePrompt ? (
              /* Share prompt for happy users */
              <motion.div
                className="text-center py-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-pink-50 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 mb-3">
                  <svg className="w-7 h-7 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                  {getText('Thank you!', 'धन्यवाद!', 'धन्यवाद!')}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                  {getText(
                    'Share Bio Maker with someone who needs it',
                    'Bio Maker को किसी जरूरतमंद के साथ शेयर करें',
                    'Bio Maker कोणाला तरी शेअर करा'
                  )}
                </p>

                <div className="flex gap-3 mb-3">
                  {/* WhatsApp */}
                  <motion.button
                    onClick={() => handleShare('whatsapp')}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-medium cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </motion.button>

                  {/* Copy Link */}
                  <motion.button
                    onClick={() => handleShare('copy')}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 rounded-xl text-sm font-medium cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {getText('Copy', 'कॉपी', 'कॉपी')}
                  </motion.button>
                </div>

                <button
                  onClick={resetAndClose}
                  className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                >
                  {getText('Maybe later', 'बाद में', 'नंतर')}
                </button>
              </motion.div>
            ) : (
              /* Thank you message for lower ratings */
              <motion.div
                className="text-center py-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 mb-3">
                  <svg className="w-7 h-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                  {getText('Thank you!', 'धन्यवाद!', 'धन्यवाद!')}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {getText(
                    'Your feedback helps us improve.',
                    'आपकी प्रतिक्रिया हमें बेहतर बनाती है।',
                    'तुमचा अभिप्राय आम्हाला सुधारण्यास मदत करतो.'
                  )}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Hook to manage feedback modal state
export function useFeedbackModal() {
  const [isOpen, setIsOpen] = useState(false);

  const showFeedback = () => {
    // Don't show if already given feedback or skipped in this session
    const hasGivenFeedback = localStorage.getItem('bio-maker-feedback-given');
    const hasSkipped = sessionStorage.getItem('bio-maker-feedback-skipped');

    if (!hasGivenFeedback && !hasSkipped) {
      setIsOpen(true);
    }
  };

  const closeFeedback = () => setIsOpen(false);

  return { isOpen, showFeedback, closeFeedback };
}

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '@/lib/types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export default function FeedbackModal({ isOpen, onClose, language }: FeedbackModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showSharePrompt, setShowSharePrompt] = useState(false);

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  const getText = (en: string, hi: string, mr: string) => {
    if (isHindi) return hi;
    if (isMarathi) return mr;
    return en;
  };

  const handleSubmit = () => {
    // Store feedback locally (for future use when you add backend)
    const feedbackData = {
      rating,
      feedback,
      timestamp: new Date().toISOString(),
      language,
    };

    // Save to localStorage for now
    const existingFeedback = JSON.parse(localStorage.getItem('bio-maker-feedback') || '[]');
    existingFeedback.push(feedbackData);
    localStorage.setItem('bio-maker-feedback', JSON.stringify(existingFeedback));

    // Mark that user has given feedback
    localStorage.setItem('bio-maker-feedback-given', 'true');

    setSubmitted(true);

    // Show share prompt for high ratings
    if (rating >= 4) {
      setTimeout(() => setShowSharePrompt(true), 1000);
    } else {
      setTimeout(onClose, 2000);
    }
  };

  const handleShare = (platform: 'whatsapp' | 'twitter' | 'copy') => {
    const shareText = getText(
      '✨ I just created my marriage biodata using Bio Maker - it\'s free and beautiful! Try it: ',
      '✨ मैंने Bio Maker से अपना बायोडाटा बनाया - मुफ्त और सुंदर! आप भी बनाएं: ',
      '✨ मी Bio Maker वापरून माझा बायोडाटा बनवला - मोफत आणि सुंदर! तुम्हीही बनवा: '
    );
    const url = 'https://bio-maker-in.vercel.app';

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(shareText + url);
        break;
    }

    setTimeout(onClose, 500);
  };

  const handleSkip = () => {
    // Mark as skipped but allow showing again later
    sessionStorage.setItem('bio-maker-feedback-skipped', 'true');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleSkip}
      >
        <motion.div
          className="relative max-w-md w-full rounded-3xl shadow-2xl overflow-hidden bg-white dark:bg-slate-800"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header gradient */}
          <div className="h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400" />

          <div className="p-6">
            {!submitted ? (
              <>
                {/* Title */}
                <div className="text-center mb-6">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                  >
                    <span className="text-3xl">🎉</span>
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {getText(
                      'Your biodata is ready!',
                      'आपका बायोडाटा तैयार है!',
                      'तुमचा बायोडाटा तयार आहे!'
                    )}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {getText(
                      'How was your experience with Bio Maker?',
                      'Bio Maker का अनुभव कैसा रहा?',
                      'Bio Maker चा अनुभव कसा होता?'
                    )}
                  </p>
                </div>

                {/* Star Rating */}
                <div className="flex justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1 cursor-pointer transition-transform"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        className={`w-10 h-10 transition-colors ${
                          star <= (hoveredRating || rating)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill={star <= (hoveredRating || rating) ? 'currentColor' : 'none'}
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

                {/* Rating labels */}
                {rating > 0 && (
                  <motion.p
                    className="text-center text-sm font-medium text-amber-600 dark:text-amber-400 mb-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {rating === 5 && getText('Amazing! 🌟', 'शानदार! 🌟', 'अप्रतिम! 🌟')}
                    {rating === 4 && getText('Great!', 'बहुत अच्छा!', 'खूप छान!')}
                    {rating === 3 && getText('Good', 'अच्छा', 'चांगले')}
                    {rating === 2 && getText('Could be better', 'बेहतर हो सकता है', 'आणखी चांगले होऊ शकते')}
                    {rating === 1 && getText('Needs improvement', 'सुधार की जरूरत', 'सुधारणा आवश्यक')}
                  </motion.p>
                )}

                {/* Optional feedback text */}
                {rating > 0 && rating < 4 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-4"
                  >
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder={getText(
                        'Tell us how we can improve...',
                        'हमें बताएं कैसे सुधार करें...',
                        'आम्हाला सांगा कसे सुधारावे...'
                      )}
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
                      rows={3}
                    />
                  </motion.div>
                )}

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleSkip}
                    className="flex-1 py-3 px-4 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    {getText('Maybe later', 'बाद में', 'नंतर')}
                  </button>
                  <motion.button
                    onClick={handleSubmit}
                    disabled={rating === 0}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold text-white transition-all cursor-pointer ${
                      rating > 0
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg'
                        : 'bg-gray-300 dark:bg-slate-600 cursor-not-allowed'
                    }`}
                    whileHover={rating > 0 ? { scale: 1.02 } : {}}
                    whileTap={rating > 0 ? { scale: 0.98 } : {}}
                  >
                    {getText('Submit', 'भेजें', 'पाठवा')}
                  </motion.button>
                </div>
              </>
            ) : showSharePrompt ? (
              /* Share prompt for happy users */
              <motion.div
                className="text-center py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-4xl mb-4">💝</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {getText(
                    'Thanks for the love!',
                    'प्यार के लिए धन्यवाद!',
                    'प्रेमाबद्दल धन्यवाद!'
                  )}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  {getText(
                    'Would you like to share Bio Maker with others?',
                    'क्या आप Bio Maker को दूसरों के साथ शेयर करेंगे?',
                    'Bio Maker इतरांसोबत शेअर कराल का?'
                  )}
                </p>

                <div className="flex justify-center gap-3 mb-4">
                  {/* WhatsApp */}
                  <motion.button
                    onClick={() => handleShare('whatsapp')}
                    className="flex items-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </motion.button>

                  {/* Copy Link */}
                  <motion.button
                    onClick={() => handleShare('copy')}
                    className="flex items-center gap-2 px-5 py-3 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 rounded-xl font-medium cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    {getText('Copy Link', 'लिंक कॉपी', 'लिंक कॉपी')}
                  </motion.button>
                </div>

                <button
                  onClick={onClose}
                  className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                >
                  {getText('No thanks', 'नहीं धन्यवाद', 'नाही धन्यवाद')}
                </button>
              </motion.div>
            ) : (
              /* Thank you message */
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div
                  className="text-5xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  🙏
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {getText(
                    'Thank you for your feedback!',
                    'आपकी प्रतिक्रिया के लिए धन्यवाद!',
                    'तुमच्या अभिप्रायाबद्दल धन्यवाद!'
                  )}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {getText(
                    'We appreciate you taking the time.',
                    'आपका समय देने के लिए धन्यवाद।',
                    'तुमचा वेळ दिल्याबद्दल आभार.'
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

'use client';

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { Language } from '@/lib/types';

// Types for different alert configurations
type AlertType = 'info' | 'success' | 'warning' | 'error' | 'confirm';
type ToastType = 'success' | 'error' | 'info' | 'warning';

interface AlertConfig {
  type: AlertType;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ToastConfig {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface AlertContextType {
  showAlert: (config: AlertConfig) => Promise<boolean>;
  showConfirm: (message: string, options?: { title?: string; confirmText?: string; cancelText?: string }) => Promise<boolean>;
  showInfo: (message: string, title?: string) => Promise<boolean>;
  showSuccess: (message: string, title?: string) => Promise<boolean>;
  showWarning: (message: string, title?: string) => Promise<boolean>;
  showError: (message: string, title?: string) => Promise<boolean>;
  // Toast - auto-dismissing, no clicks needed
  toast: {
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
  };
  setLanguage: (lang: Language) => void;
}

const AlertContext = createContext<AlertContextType | null>(null);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};


interface DialogState extends AlertConfig {
  isOpen: boolean;
  resolve: (value: boolean) => void;
}

// Trilingual text helper
const getLocalizedText = (lang: Language, en: string, hi: string, mr: string) => {
  if (lang === 'hi') return hi;
  if (lang === 'mr') return mr;
  return en;
};

// Default button texts
const getDefaultTexts = (lang: Language) => ({
  ok: getLocalizedText(lang, 'OK', 'ठीक है', 'ठीक आहे'),
  confirm: getLocalizedText(lang, 'Confirm', 'पुष्टि करें', 'पुष्टी करा'),
  cancel: getLocalizedText(lang, 'Cancel', 'रद्द करें', 'रद्द करा'),
  information: getLocalizedText(lang, 'Information', 'जानकारी', 'माहिती'),
  success: getLocalizedText(lang, 'Success', 'सफलता', 'यशस्वी'),
  warning: getLocalizedText(lang, 'Warning', 'चेतावनी', 'चेतावणी'),
  error: getLocalizedText(lang, 'Error', 'त्रुटि', 'त्रुटी'),
});

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const [toasts, setToasts] = useState<ToastConfig[]>([]);
  const [language, setLanguageState] = useState<Language>('en');
  const dialogRef = useRef<HTMLDivElement>(null);
  const toastIdRef = useRef(0);

  // Memoized localized texts
  const texts = getDefaultTexts(language);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dialog) {
        handleClose(false);
      } else if (e.key === 'Enter' && dialog && dialog.type !== 'confirm') {
        handleClose(true);
      }
    };

    if (dialog) {
      document.addEventListener('keydown', handleKeyDown);
      dialogRef.current?.focus();
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dialog]);

  const showAlert = useCallback((config: AlertConfig): Promise<boolean> => {
    return new Promise((resolve) => {
      setDialog({
        ...config,
        isOpen: true,
        resolve,
      });
    });
  }, []);

  const showConfirm = useCallback((message: string, options?: { title?: string; confirmText?: string; cancelText?: string }): Promise<boolean> => {
    const currentTexts = getDefaultTexts(language);
    return showAlert({
      type: 'confirm',
      message,
      title: options?.title,
      confirmText: options?.confirmText || currentTexts.confirm,
      cancelText: options?.cancelText || currentTexts.cancel,
    });
  }, [showAlert, language]);

  const showInfo = useCallback((message: string, title?: string): Promise<boolean> => {
    const currentTexts = getDefaultTexts(language);
    return showAlert({ type: 'info', message, title: title || currentTexts.information });
  }, [showAlert, language]);

  const showSuccess = useCallback((message: string, title?: string): Promise<boolean> => {
    const currentTexts = getDefaultTexts(language);
    return showAlert({ type: 'success', message, title: title || currentTexts.success });
  }, [showAlert, language]);

  const showWarning = useCallback((message: string, title?: string): Promise<boolean> => {
    const currentTexts = getDefaultTexts(language);
    return showAlert({ type: 'warning', message, title: title || currentTexts.warning });
  }, [showAlert, language]);

  const showError = useCallback((message: string, title?: string): Promise<boolean> => {
    const currentTexts = getDefaultTexts(language);
    return showAlert({ type: 'error', message, title: title || currentTexts.error });
  }, [showAlert, language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  // Toast functions - auto-dismissing notifications
  const addToast = useCallback((type: ToastType, message: string, duration = 3000) => {
    const id = `toast-${++toastIdRef.current}`;
    setToasts(prev => [...prev, { id, type, message, duration }]);

    // Auto-remove after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = {
    success: (message: string, duration?: number) => addToast('success', message, duration),
    error: (message: string, duration?: number) => addToast('error', message, duration),
    info: (message: string, duration?: number) => addToast('info', message, duration),
    warning: (message: string, duration?: number) => addToast('warning', message, duration),
  };

  const handleClose = (result: boolean) => {
    if (dialog) {
      dialog.resolve(result);
      dialog.onConfirm && result && dialog.onConfirm();
      dialog.onCancel && !result && dialog.onCancel();
      setDialog(null);
    }
  };

  return (
    <AlertContext.Provider value={{ showAlert, showConfirm, showInfo, showSuccess, showWarning, showError, toast, setLanguage }}>
      {children}

      {/* Toast Container - Top center, auto-dismiss */}
      {/* Uses softer, more sophisticated colors matching the app's premium aesthetic */}
      {toasts.length > 0 && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[10000] flex flex-col gap-2 pointer-events-none">
          {toasts.map((t) => (
            <div
              key={t.id}
              className="pointer-events-auto animate-slide-down rounded-xl shadow-xl backdrop-blur-md flex items-center gap-3 min-w-[200px] max-w-[90vw] border"
              style={{
                // Premium toast styling with softer colors
                ...(t.type === 'success' && {
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.95) 0%, rgba(184, 134, 11, 0.95) 100%)',
                  borderColor: 'rgba(212, 175, 55, 0.3)',
                  color: '#FFFFFF',
                  boxShadow: '0 10px 40px rgba(212, 175, 55, 0.3), 0 4px 12px rgba(0,0,0,0.1)',
                }),
                ...(t.type === 'error' && {
                  background: 'linear-gradient(135deg, rgba(185, 28, 28, 0.95) 0%, rgba(153, 27, 27, 0.95) 100%)',
                  borderColor: 'rgba(185, 28, 28, 0.3)',
                  color: '#FFFFFF',
                  boxShadow: '0 10px 40px rgba(185, 28, 28, 0.2), 0 4px 12px rgba(0,0,0,0.1)',
                }),
                ...(t.type === 'info' && {
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(37, 99, 235, 0.95) 100%)',
                  borderColor: 'rgba(59, 130, 246, 0.3)',
                  color: '#FFFFFF',
                  boxShadow: '0 10px 40px rgba(59, 130, 246, 0.2), 0 4px 12px rgba(0,0,0,0.1)',
                }),
                ...(t.type === 'warning' && {
                  background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.95) 0%, rgba(180, 83, 9, 0.95) 100%)',
                  borderColor: 'rgba(217, 119, 6, 0.3)',
                  color: '#FFFFFF',
                  boxShadow: '0 10px 40px rgba(217, 119, 6, 0.2), 0 4px 12px rgba(0,0,0,0.1)',
                }),
                padding: '12px 16px',
              }}
            >
              {/* Icon with subtle background */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.2)' }}
              >
                {t.type === 'success' && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {t.type === 'error' && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                {t.type === 'info' && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {t.type === 'warning' && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
              </div>
              {/* Message */}
              <span className="text-sm font-medium">{t.message}</span>
              {/* Close button */}
              <button
                onClick={() => removeToast(t.id)}
                className="ml-auto p-1.5 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Dialog Overlay */}
      {dialog && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop with subtle pattern */}
          {/* Backdrop - does NOT close on click, use buttons instead */}
          <div
            className="absolute inset-0 animate-fade-in"
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Dialog Box - Classic Parchment Style */}
          <div
            ref={dialogRef}
            tabIndex={-1}
            className="relative w-full max-w-sm animate-scale-in"
          >
            {/* Outer decorative frame */}
            <div
              className="absolute inset-0 rounded-lg"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #D4AF37 100%)',
                padding: '3px',
              }}
            />

            {/* Inner container */}
            <div
              className="relative rounded-lg overflow-hidden bg-gradient-to-b from-[#FFFEF8] to-[#FFF9E6] dark:from-slate-800 dark:to-slate-900"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.8)',
              }}
            >
              {/* Top decorative border with lotus pattern */}
              <div className="relative h-2 bg-gradient-to-r from-[#D4AF37] via-[#F4C430] to-[#D4AF37]">
                <div className="absolute inset-x-0 top-0 flex justify-center">
                  <svg width="40" height="12" viewBox="0 0 40 12" className="text-[#D4AF37]">
                    <path d="M20 0 C22 4 26 6 30 6 C26 6 22 8 20 12 C18 8 14 6 10 6 C14 6 18 4 20 0" className="fill-[#FFFEF8] dark:fill-slate-800" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pt-5 pb-5">
                {/* Title */}
                <div className="text-center mb-4">
                  {dialog.title && (
                    <h3 className="text-lg font-semibold mb-1 text-[#800020] dark:text-[#D4AF37]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {dialog.title}
                    </h3>
                  )}

                  {/* Decorative divider */}
                  <div className="flex items-center justify-center gap-2 my-3">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                    <svg width="16" height="8" viewBox="0 0 16 8" className="text-[#D4AF37]">
                      <path d="M8 0 C9 2 11 3 13 3 L16 3 L16 5 L13 5 C11 5 9 6 8 8 C7 6 5 5 3 5 L0 5 L0 3 L3 3 C5 3 7 2 8 0" fill="currentColor" opacity="0.6"/>
                    </svg>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                  </div>
                </div>

                {/* Message */}
                <p
                  className="text-center text-sm leading-relaxed whitespace-pre-line mb-5 text-[#555] dark:text-slate-300"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {dialog.message}
                </p>

                {/* Buttons */}
                <div className={`flex gap-3 ${dialog.type === 'confirm' ? 'justify-center' : 'justify-center'}`}>
                  {dialog.type === 'confirm' && (
                    <button
                      onClick={() => handleClose(false)}
                      className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer bg-gradient-to-b from-gray-100 to-gray-200 dark:from-slate-600 dark:to-slate-700 text-gray-600 dark:text-slate-200 border border-gray-300 dark:border-slate-500 shadow-sm hover:shadow-md hover:from-gray-200 hover:to-gray-300 dark:hover:from-slate-500 dark:hover:to-slate-600"
                      style={{ fontFamily: language !== 'en' ? "'Noto Sans Devanagari', 'Poppins', sans-serif" : "'Poppins', sans-serif" }}
                    >
                      {dialog.cancelText || texts.cancel}
                    </button>
                  )}
                  <button
                    onClick={() => handleClose(true)}
                    autoFocus
                    className="px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
                    style={{
                      fontFamily: language !== 'en' ? "'Noto Sans Devanagari', 'Poppins', sans-serif" : "'Poppins', sans-serif",
                      background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                      color: '#fff',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(212,175,55,0.4)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #C9A227 0%, #A67B00 100%)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(212,175,55,0.5)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(212,175,55,0.4)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {dialog.type === 'confirm' ? (dialog.confirmText || texts.confirm) : texts.ok}
                  </button>
                </div>
              </div>

              {/* Bottom decorative border */}
              <div className="relative h-2 bg-gradient-to-r from-[#D4AF37] via-[#F4C430] to-[#D4AF37]">
                <div className="absolute inset-x-0 bottom-0 flex justify-center">
                  <svg width="40" height="12" viewBox="0 0 40 12" className="text-[#D4AF37] rotate-180">
                    <path d="M20 0 C22 4 26 6 30 6 C26 6 22 8 20 12 C18 8 14 6 10 6 C14 6 18 4 20 0" className="fill-[#FFFEF8] dark:fill-slate-900" />
                  </svg>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
}

export default AlertProvider;

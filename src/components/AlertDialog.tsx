'use client';

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

// Types for different alert configurations
type AlertType = 'info' | 'success' | 'warning' | 'error' | 'confirm';

interface AlertConfig {
  type: AlertType;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface AlertContextType {
  showAlert: (config: AlertConfig) => Promise<boolean>;
  showConfirm: (message: string, options?: { title?: string; confirmText?: string; cancelText?: string }) => Promise<boolean>;
  showInfo: (message: string, title?: string) => Promise<boolean>;
  showSuccess: (message: string, title?: string) => Promise<boolean>;
  showWarning: (message: string, title?: string) => Promise<boolean>;
  showError: (message: string, title?: string) => Promise<boolean>;
}

const AlertContext = createContext<AlertContextType | null>(null);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

// Icon components for different alert types
const AlertIcons = {
  info: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  success: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  error: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  confirm: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

// Color schemes for different alert types
const AlertColors = {
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-700',
    icon: 'text-blue-500 dark:text-blue-400',
    title: 'text-blue-800 dark:text-blue-200',
    button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
  },
  success: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-700',
    icon: 'text-emerald-500 dark:text-emerald-400',
    title: 'text-emerald-800 dark:text-emerald-200',
    button: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500',
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-700',
    icon: 'text-amber-500 dark:text-amber-400',
    title: 'text-amber-800 dark:text-amber-200',
    button: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-700',
    icon: 'text-red-500 dark:text-red-400',
    title: 'text-red-800 dark:text-red-200',
    button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
  },
  confirm: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-700',
    icon: 'text-purple-500 dark:text-purple-400',
    title: 'text-purple-800 dark:text-purple-200',
    button: 'bg-[#D4AF37] hover:bg-[#B8860B] focus:ring-[#D4AF37]',
  },
};

interface DialogState extends AlertConfig {
  isOpen: boolean;
  resolve: (value: boolean) => void;
}

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

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
      // Focus the dialog
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
    return showAlert({
      type: 'confirm',
      message,
      title: options?.title,
      confirmText: options?.confirmText || 'Confirm',
      cancelText: options?.cancelText || 'Cancel',
    });
  }, [showAlert]);

  const showInfo = useCallback((message: string, title?: string): Promise<boolean> => {
    return showAlert({ type: 'info', message, title: title || 'Information' });
  }, [showAlert]);

  const showSuccess = useCallback((message: string, title?: string): Promise<boolean> => {
    return showAlert({ type: 'success', message, title: title || 'Success' });
  }, [showAlert]);

  const showWarning = useCallback((message: string, title?: string): Promise<boolean> => {
    return showAlert({ type: 'warning', message, title: title || 'Warning' });
  }, [showAlert]);

  const showError = useCallback((message: string, title?: string): Promise<boolean> => {
    return showAlert({ type: 'error', message, title: title || 'Error' });
  }, [showAlert]);

  const handleClose = (result: boolean) => {
    if (dialog) {
      dialog.resolve(result);
      dialog.onConfirm && result && dialog.onConfirm();
      dialog.onCancel && !result && dialog.onCancel();
      setDialog(null);
    }
  };

  const colors = dialog ? AlertColors[dialog.type] : AlertColors.info;

  return (
    <AlertContext.Provider value={{ showAlert, showConfirm, showInfo, showSuccess, showWarning, showError }}>
      {children}

      {/* Dialog Overlay */}
      {dialog && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => dialog.type === 'confirm' ? handleClose(false) : handleClose(true)}
          />

          {/* Dialog Box */}
          <div
            ref={dialogRef}
            tabIndex={-1}
            className={`
              relative w-full max-w-md transform transition-all animate-scale-in
              bg-white dark:bg-slate-800 rounded-2xl shadow-2xl
              border-2 ${colors.border}
              overflow-hidden
            `}
          >
            {/* Decorative top border */}
            <div className="h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#F4C430] to-[#D4AF37]" />

            {/* Content */}
            <div className="p-6">
              {/* Header with Icon */}
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 p-2 rounded-full ${colors.bg} ${colors.icon}`}>
                  {AlertIcons[dialog.type]}
                </div>
                <div className="flex-1 min-w-0">
                  {dialog.title && (
                    <h3 className={`text-lg font-semibold ${colors.title} mb-1`}>
                      {dialog.title}
                    </h3>
                  )}
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                    {dialog.message}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className={`mt-6 flex gap-3 ${dialog.type === 'confirm' ? 'justify-end' : 'justify-center'}`}>
                {dialog.type === 'confirm' && (
                  <button
                    onClick={() => handleClose(false)}
                    className="
                      px-5 py-2.5 rounded-xl text-sm font-medium
                      bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300
                      hover:bg-gray-200 dark:hover:bg-slate-600
                      border border-gray-200 dark:border-slate-600
                      transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                    "
                  >
                    {dialog.cancelText || 'Cancel'}
                  </button>
                )}
                <button
                  onClick={() => handleClose(true)}
                  autoFocus
                  className={`
                    px-5 py-2.5 rounded-xl text-sm font-medium text-white
                    ${colors.button}
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    shadow-md hover:shadow-lg
                  `}
                >
                  {dialog.type === 'confirm' ? (dialog.confirmText || 'Confirm') : 'OK'}
                </button>
              </div>
            </div>

            {/* Decorative lotus corner */}
            <div className="absolute -bottom-4 -right-4 w-16 h-16 opacity-10 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37]">
                <path
                  fill="currentColor"
                  d="M50 10 C60 30 80 40 90 50 C80 60 60 70 50 90 C40 70 20 60 10 50 C20 40 40 30 50 10Z"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
}

export default AlertProvider;

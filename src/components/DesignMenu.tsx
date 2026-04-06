'use client';

import React, { useState, useRef } from 'react';
import { Language } from '@/lib/types';
import { Theme, themes } from '@/lib/themes';
import { BorderDesign, borderDesigns } from '@/lib/borders';
import { GodSymbolId } from '@/lib/types';
import { useAlert } from './AlertDialog';

interface DesignMenuProps {
  language: Language;
  currentTheme: Theme;
  currentBorder: BorderDesign;
  currentSymbolId: GodSymbolId;
  customSymbol?: string;
  onThemeChange: (theme: Theme) => void;
  onBorderChange: (border: BorderDesign) => void;
  onSymbolChange: (symbolId: GodSymbolId, customImage?: string) => void;
}

// God symbol definitions
const godSymbols: { id: GodSymbolId; name: { en: string; hi: string; mr: string } }[] = [
  { id: 'krishna', name: { en: 'Krishna Bansuri', hi: 'कृष्ण बांसुरी', mr: 'कृष्ण बासरी' } },
  { id: 'ganesh', name: { en: 'Ganesh', hi: 'गणेश', mr: 'गणेश' } },
  { id: 'om', name: { en: 'Om', hi: 'ॐ', mr: 'ॐ' } },
  { id: 'swastik', name: { en: 'Swastik', hi: 'स्वस्तिक', mr: 'स्वस्तिक' } },
  { id: 'shiv', name: { en: 'Shiv Trishul', hi: 'शिव त्रिशूल', mr: 'शिव त्रिशूल' } },
  { id: 'durga', name: { en: 'Durga', hi: 'दुर्गा', mr: 'दुर्गा' } },
  { id: 'custom', name: { en: 'Custom', hi: 'कस्टम', mr: 'कस्टम' } },
  { id: 'none', name: { en: 'None', hi: 'कोई नहीं', mr: 'नाही' } },
];

export default function DesignMenu({
  language,
  currentTheme,
  currentBorder,
  currentSymbolId,
  customSymbol,
  onThemeChange,
  onBorderChange,
  onSymbolChange,
}: DesignMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'theme' | 'border' | 'symbol'>('theme');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showWarning } = useAlert();

  const getText = (en: string, hi: string, mr: string) => {
    if (language === 'hi') return hi;
    if (language === 'mr') return mr;
    return en;
  };

  const handleCustomUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        await showWarning(
          getText('Image size should be less than 1MB', 'छवि का आकार 1MB से कम होना चाहिए', 'प्रतिमेचा आकार 1MB पेक्षा कमी असावा'),
          getText('File Too Large', 'फ़ाइल बहुत बड़ी', 'फाइल खूप मोठी')
        );
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onSymbolChange('custom', reader.result as string);
        setIsOpen(false);
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 sm:h-9 px-3 flex items-center gap-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:border-amber-400 dark:hover:border-amber-500"
      >
        {/* Color swatch preview */}
        <div
          className="w-4 h-4 rounded-full border-2"
          style={{
            backgroundColor: currentTheme.colors.background,
            borderColor: currentTheme.colors.primary,
          }}
        />
        <span className="text-gray-700 dark:text-gray-200">
          {getText('Design', 'डिज़ाइन', 'डिझाइन')}
        </span>
        <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[100]" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 top-full mt-2 z-[101] bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-600 overflow-hidden w-[320px]">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-slate-700">
              {[
                { id: 'theme', label: getText('Colors', 'रंग', 'रंग') },
                { id: 'border', label: getText('Border', 'बॉर्डर', 'बॉर्डर') },
                { id: 'symbol', label: getText('Symbol', 'प्रतीक', 'प्रतीक') },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'theme' | 'border' | 'symbol')}
                  className={`flex-1 px-4 py-2.5 text-xs font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-amber-600 dark:text-amber-400 border-b-2 border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-3 max-h-[300px] overflow-y-auto">
              {/* Theme Tab */}
              {activeTab === 'theme' && (
                <div className="grid grid-cols-2 gap-2">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => {
                        onThemeChange(theme);
                        setIsOpen(false);
                      }}
                      className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
                        currentTheme.id === theme.id
                          ? 'bg-amber-100 dark:bg-amber-900/30 ring-2 ring-amber-400'
                          : 'hover:bg-gray-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-full border-2 flex-shrink-0"
                        style={{
                          backgroundColor: theme.colors.background,
                          borderColor: theme.colors.primary,
                        }}
                      />
                      <span className="text-xs text-gray-700 dark:text-gray-300 truncate">
                        {language === 'mr' ? theme.nameMarathi : language === 'hi' ? (theme.nameHindi || theme.name) : theme.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Border Tab */}
              {activeTab === 'border' && (
                <div className="grid grid-cols-2 gap-2">
                  {borderDesigns.map((border) => (
                    <button
                      key={border.id}
                      onClick={() => {
                        onBorderChange(border);
                        setIsOpen(false);
                      }}
                      className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
                        currentBorder.id === border.id
                          ? 'bg-amber-100 dark:bg-amber-900/30 ring-2 ring-amber-400'
                          : 'hover:bg-gray-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div className="w-6 h-6 rounded border-2 border-amber-400 flex-shrink-0 flex items-center justify-center">
                        <div className="w-3 h-3 border border-amber-300 rounded-sm" />
                      </div>
                      <span className="text-xs text-gray-700 dark:text-gray-300 truncate">
                        {language === 'mr' ? border.nameMarathi : language === 'hi' ? (border.nameHindi || border.name) : border.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Symbol Tab */}
              {activeTab === 'symbol' && (
                <div className="grid grid-cols-2 gap-2">
                  {godSymbols.map((symbol) => (
                    <button
                      key={symbol.id}
                      onClick={() => {
                        if (symbol.id === 'custom') {
                          handleCustomUpload();
                        } else {
                          onSymbolChange(symbol.id);
                          setIsOpen(false);
                        }
                      }}
                      className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
                        currentSymbolId === symbol.id
                          ? 'bg-amber-100 dark:bg-amber-900/30 ring-2 ring-amber-400'
                          : 'hover:bg-gray-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                        <SymbolIcon symbolId={symbol.id} customSymbol={customSymbol} />
                      </div>
                      <span className="text-xs text-gray-700 dark:text-gray-300 truncate">
                        {symbol.name[language]}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

// Mini symbol icons for the menu
function SymbolIcon({ symbolId, customSymbol }: { symbolId: GodSymbolId; customSymbol?: string }) {
  const color = '#D4AF37';

  switch (symbolId) {
    case 'krishna':
      return (
        <svg width="18" height="18" viewBox="0 0 60 50" fill="none">
          <rect x="5" y="22" width="50" height="6" rx="3" fill={color} />
          <ellipse cx="30" cy="12" rx="6" ry="8" fill="#1e3a5f" />
          <ellipse cx="30" cy="10" rx="2" ry="3" fill={color} />
        </svg>
      );
    case 'ganesh':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill={color}>
          <circle cx="12" cy="8" r="5" />
          <ellipse cx="12" cy="18" rx="5" ry="4" />
        </svg>
      );
    case 'om':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24">
          <text x="12" y="18" textAnchor="middle" fill={color} fontSize="16" fontWeight="bold">ॐ</text>
        </svg>
      );
    case 'swastik':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" stroke={color} strokeWidth="2" fill="none">
          <path d="M12 4V20M4 12H20M12 4H18M12 20H6M4 12V6M20 12V18" />
        </svg>
      );
    case 'shiv':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill={color}>
          <path d="M12 22V8M12 8L8 2M12 8L16 2M12 4L12 2" stroke={color} strokeWidth="1.5" fill="none" />
        </svg>
      );
    case 'durga':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill={color}>
          <ellipse cx="12" cy="12" rx="3" ry="6" />
          <ellipse cx="8" cy="12" rx="2" ry="5" transform="rotate(-20 8 12)" opacity="0.7" />
          <ellipse cx="16" cy="12" rx="2" ry="5" transform="rotate(20 16 12)" opacity="0.7" />
        </svg>
      );
    case 'custom':
      if (customSymbol) {
        return <img src={customSymbol} alt="" className="w-4 h-4 object-contain" />;
      }
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
          <path d="M12 4v16m8-8H4" />
        </svg>
      );
    case 'none':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M6 6l12 12" />
        </svg>
      );
    default:
      return null;
  }
}

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
  const [showCustomGuidelines, setShowCustomGuidelines] = useState(false);
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
      {/* Trigger Button - Touch-friendly */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 xs:h-9 sm:h-9 px-2 xs:px-3 flex items-center gap-1.5 xs:gap-2 rounded-lg text-[10px] xs:text-xs font-medium transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:border-amber-400 dark:hover:border-amber-500 touch-target"
      >
        {/* Color swatch preview */}
        <div
          className="w-3.5 h-3.5 xs:w-4 xs:h-4 rounded-full border-2 flex-shrink-0"
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

      {/* Dropdown Panel - Responsive positioning */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[100]" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 sm:left-0 right-auto top-full mt-2 z-[101] bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-600 overflow-hidden w-[calc(100vw-16px)] sm:w-[320px] max-w-[320px]">
            {/* Tabs - Touch-friendly */}
            <div className="flex border-b border-gray-200 dark:border-slate-700">
              {[
                { id: 'theme', label: getText('Colors', 'रंग', 'रंग') },
                { id: 'border', label: getText('Border', 'बॉर्डर', 'बॉर्डर') },
                { id: 'symbol', label: getText('Symbol', 'प्रतीक', 'प्रतीक') },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'theme' | 'border' | 'symbol')}
                  className={`flex-1 px-4 py-3 sm:py-2.5 text-xs font-medium transition-colors active:scale-95 ${
                    activeTab === tab.id
                      ? 'text-amber-600 dark:text-amber-400 border-b-2 border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content - Touch-friendly items */}
            <div className="p-3 max-h-[60vh] sm:max-h-[300px] overflow-y-auto">
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
                      className={`flex items-center gap-2 p-3 sm:p-2 rounded-lg transition-all active:scale-95 ${
                        currentTheme.id === theme.id
                          ? 'bg-amber-100 dark:bg-amber-900/30 ring-2 ring-amber-400'
                          : 'hover:bg-gray-100 dark:hover:bg-slate-700 active:bg-gray-200'
                      }`}
                    >
                      <div
                        className="w-7 h-7 sm:w-6 sm:h-6 rounded-full border-2 flex-shrink-0"
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
                      className={`flex items-center gap-2 p-3 sm:p-2 rounded-lg transition-all active:scale-95 ${
                        currentBorder.id === border.id
                          ? 'bg-amber-100 dark:bg-amber-900/30 ring-2 ring-amber-400'
                          : 'hover:bg-gray-100 dark:hover:bg-slate-700 active:bg-gray-200'
                      }`}
                    >
                      <div className="w-8 h-10 sm:w-7 sm:h-9 flex-shrink-0 flex items-center justify-center">
                        <BorderPreviewIcon borderId={border.id} />
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
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    {godSymbols.map((symbol) => (
                      <div key={symbol.id} className="relative">
                        <button
                          onClick={() => {
                            if (symbol.id === 'custom') {
                              handleCustomUpload();
                            } else {
                              onSymbolChange(symbol.id);
                              setIsOpen(false);
                            }
                          }}
                          className={`w-full flex items-center gap-2 p-3 sm:p-2 rounded-lg transition-all active:scale-95 ${
                            currentSymbolId === symbol.id
                              ? 'bg-amber-100 dark:bg-amber-900/30 ring-2 ring-amber-400'
                              : 'hover:bg-gray-100 dark:hover:bg-slate-700 active:bg-gray-200'
                          }`}
                        >
                          <div className="w-7 h-7 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                            <SymbolIcon symbolId={symbol.id} customSymbol={customSymbol} />
                          </div>
                          <span className="text-xs text-gray-700 dark:text-gray-300 truncate">
                            {symbol.name[language]}
                          </span>
                        </button>
                        {/* Info button for custom symbol */}
                        {symbol.id === 'custom' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowCustomGuidelines(!showCustomGuidelines);
                            }}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm transition-colors"
                            title={getText('Upload guidelines', 'अपलोड दिशानिर्देश', 'अपलोड मार्गदर्शक')}
                          >
                            i
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Custom Symbol Guidelines */}
                  {showCustomGuidelines && (
                    <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div className="text-[11px] text-blue-800 dark:text-blue-200">
                          <p className="font-semibold mb-1">
                            {getText('Custom Symbol Guidelines:', 'कस्टम प्रतीक दिशानिर्देश:', 'कस्टम प्रतीक मार्गदर्शक:')}
                          </p>
                          <ul className="space-y-0.5 list-disc list-inside text-blue-700 dark:text-blue-300">
                            <li>{getText('Max file size: 1MB', 'अधिकतम फ़ाइल आकार: 1MB', 'कमाल फाइल आकार: 1MB')}</li>
                            <li>{getText('Recommended: 200×200 pixels', 'अनुशंसित: 200×200 पिक्सेल', 'शिफारस: 200×200 पिक्सेल')}</li>
                            <li>{getText('Formats: JPG, PNG, WebP', 'फॉर्मेट: JPG, PNG, WebP', 'फॉरमॅट: JPG, PNG, WebP')}</li>
                            <li>{getText('Square image works best', 'वर्गाकार छवि सबसे अच्छी', 'चौकोनी प्रतिमा उत्तम')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
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

// Border preview icons - Shows a mini preview of each border style
function BorderPreviewIcon({ borderId }: { borderId: string }) {
  const color = '#D4AF37';
  const bgColor = '#FFFEF0';

  switch (borderId) {
    case 'classic':
      // Classic Double - Two nested rectangles
      return (
        <svg width="28" height="36" viewBox="0 0 28 36" fill={bgColor}>
          <rect x="1" y="1" width="26" height="34" fill={bgColor} stroke={color} strokeWidth="1.5" />
          <rect x="3" y="3" width="22" height="30" fill="none" stroke={color} strokeWidth="0.75" opacity="0.6" />
        </svg>
      );

    case 'paisley':
      // Paisley - Curved patterns at corners
      return (
        <svg width="28" height="36" viewBox="0 0 28 36" fill={bgColor}>
          <rect x="1" y="1" width="26" height="34" fill={bgColor} stroke={color} strokeWidth="1" />
          {/* Corner paisley shapes */}
          <path d="M3 5 Q5 3 7 5 Q5 7 3 5" fill={color} opacity="0.8" />
          <path d="M25 5 Q23 3 21 5 Q23 7 25 5" fill={color} opacity="0.8" />
          <path d="M3 31 Q5 33 7 31 Q5 29 3 31" fill={color} opacity="0.8" />
          <path d="M25 31 Q23 33 21 31 Q23 29 25 31" fill={color} opacity="0.8" />
          <rect x="3" y="3" width="22" height="30" fill="none" stroke={color} strokeWidth="0.5" strokeDasharray="2 1" opacity="0.4" />
        </svg>
      );

    case 'mandala':
      // Mandala - Circular patterns at corners
      return (
        <svg width="28" height="36" viewBox="0 0 28 36" fill={bgColor}>
          <rect x="1" y="1" width="26" height="34" fill={bgColor} stroke={color} strokeWidth="1" />
          {/* Corner mandala circles */}
          <circle cx="4" cy="4" r="2.5" fill="none" stroke={color} strokeWidth="0.75" />
          <circle cx="4" cy="4" r="1.5" fill={color} opacity="0.5" />
          <circle cx="24" cy="4" r="2.5" fill="none" stroke={color} strokeWidth="0.75" />
          <circle cx="24" cy="4" r="1.5" fill={color} opacity="0.5" />
          <circle cx="4" cy="32" r="2.5" fill="none" stroke={color} strokeWidth="0.75" />
          <circle cx="4" cy="32" r="1.5" fill={color} opacity="0.5" />
          <circle cx="24" cy="32" r="2.5" fill="none" stroke={color} strokeWidth="0.75" />
          <circle cx="24" cy="32" r="1.5" fill={color} opacity="0.5" />
        </svg>
      );

    case 'peacock':
      // Peacock - Feather-like patterns
      return (
        <svg width="28" height="36" viewBox="0 0 28 36" fill={bgColor}>
          <rect x="1" y="1" width="26" height="34" fill={bgColor} stroke={color} strokeWidth="1" />
          {/* Corner peacock feather patterns */}
          <ellipse cx="5" cy="5" rx="3" ry="4" fill="none" stroke={color} strokeWidth="0.75" transform="rotate(-45 5 5)" />
          <circle cx="5" cy="5" r="1" fill="#1e3a5f" />
          <ellipse cx="23" cy="5" rx="3" ry="4" fill="none" stroke={color} strokeWidth="0.75" transform="rotate(45 23 5)" />
          <circle cx="23" cy="5" r="1" fill="#1e3a5f" />
          <ellipse cx="5" cy="31" rx="3" ry="4" fill="none" stroke={color} strokeWidth="0.75" transform="rotate(45 5 31)" />
          <circle cx="5" cy="31" r="1" fill="#1e3a5f" />
          <ellipse cx="23" cy="31" rx="3" ry="4" fill="none" stroke={color} strokeWidth="0.75" transform="rotate(-45 23 31)" />
          <circle cx="23" cy="31" r="1" fill="#1e3a5f" />
        </svg>
      );

    case 'artdeco':
      // Art Deco - Geometric angular patterns
      return (
        <svg width="28" height="36" viewBox="0 0 28 36" fill={bgColor}>
          <rect x="1" y="1" width="26" height="34" fill={bgColor} stroke={color} strokeWidth="1" />
          {/* Art deco corner lines */}
          <path d="M1 8 L8 1" stroke={color} strokeWidth="1" />
          <path d="M1 5 L5 1" stroke={color} strokeWidth="0.75" opacity="0.6" />
          <path d="M27 8 L20 1" stroke={color} strokeWidth="1" />
          <path d="M27 5 L23 1" stroke={color} strokeWidth="0.75" opacity="0.6" />
          <path d="M1 28 L8 35" stroke={color} strokeWidth="1" />
          <path d="M1 31 L5 35" stroke={color} strokeWidth="0.75" opacity="0.6" />
          <path d="M27 28 L20 35" stroke={color} strokeWidth="1" />
          <path d="M27 31 L23 35" stroke={color} strokeWidth="0.75" opacity="0.6" />
        </svg>
      );

    default:
      // Fallback generic border
      return (
        <svg width="28" height="36" viewBox="0 0 28 36" fill={bgColor}>
          <rect x="1" y="1" width="26" height="34" fill={bgColor} stroke={color} strokeWidth="1.5" />
        </svg>
      );
  }
}

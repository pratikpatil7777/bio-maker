'use client';

import React, { useRef, useState } from 'react';
import { GodSymbolId, Language } from '@/lib/types';
import { useAlert } from './AlertDialog';

// God symbol definitions with names and icons
const godSymbols: {
  id: GodSymbolId;
  name: { en: string; hi: string; mr: string };
}[] = [
  { id: 'krishna', name: { en: 'Krishna Bansuri', hi: 'कृष्ण बांसुरी', mr: 'कृष्ण बासरी' } },
  { id: 'ganesh', name: { en: 'Ganesh', hi: 'गणेश', mr: 'गणेश' } },
  { id: 'om', name: { en: 'Om', hi: 'ॐ', mr: 'ॐ' } },
  { id: 'swastik', name: { en: 'Swastik', hi: 'स्वस्तिक', mr: 'स्वस्तिक' } },
  { id: 'shiv', name: { en: 'Shiv Trishul', hi: 'शिव त्रिशूल', mr: 'शिव त्रिशूल' } },
  { id: 'durga', name: { en: 'Durga', hi: 'दुर्गा', mr: 'दुर्गा' } },
  { id: 'custom', name: { en: 'Custom Upload', hi: 'कस्टम अपलोड', mr: 'कस्टम अपलोड' } },
  { id: 'none', name: { en: 'No Symbol', hi: 'कोई प्रतीक नहीं', mr: 'कोणताही प्रतीक नाही' } },
];

interface GodSymbolSelectorProps {
  language: Language;
  currentSymbolId: GodSymbolId;
  customSymbol?: string;
  onSymbolChange: (symbolId: GodSymbolId, customImage?: string) => void;
  primaryColor?: string;
}

export default function GodSymbolSelector({
  language,
  currentSymbolId,
  customSymbol,
  onSymbolChange,
  primaryColor = '#D4AF37',
}: GodSymbolSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showWarning } = useAlert();

  const getText = (en: string, hi: string, mr: string) => {
    if (language === 'hi') return hi;
    if (language === 'mr') return mr;
    return en;
  };

  const currentSymbol = godSymbols.find(s => s.id === currentSymbolId) || godSymbols[0];

  const handleSymbolSelect = (symbolId: GodSymbolId) => {
    if (symbolId === 'custom') {
      fileInputRef.current?.click();
    } else {
      onSymbolChange(symbolId);
      setIsOpen(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 1MB for symbol)
      if (file.size > 1 * 1024 * 1024) {
        await showWarning(
          getText('Image size should be less than 1MB', 'छवि का आकार 1MB से कम होना चाहिए', 'प्रतिमेचा आकार 1MB पेक्षा कमी असावा'),
          getText('File Too Large', 'फ़ाइल बहुत बड़ी', 'फाइल खूप मोठी')
        );
        return;
      }

      // Read file
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onSymbolChange('custom', result);
        setIsOpen(false);
      };
      reader.readAsDataURL(file);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="relative">
      {/* Current selection button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="biodata-btn h-8 sm:h-9 px-2 sm:px-3 flex items-center gap-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.02] bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600"
        title={getText('Change God Symbol', 'देवता प्रतीक बदलें', 'देवता प्रतीक बदला')}
      >
        {/* Mini preview */}
        <div
          className="w-5 h-5 rounded overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: currentSymbolId === 'none' ? '#f3f4f6' : 'transparent' }}
        >
          {currentSymbolId === 'krishna' && <KrishnaMiniIcon color={primaryColor} />}
          {currentSymbolId === 'ganesh' && <GaneshMiniIcon color={primaryColor} />}
          {currentSymbolId === 'om' && <OmMiniIcon color={primaryColor} />}
          {currentSymbolId === 'swastik' && <SwastikMiniIcon color={primaryColor} />}
          {currentSymbolId === 'shiv' && <ShivMiniIcon color={primaryColor} />}
          {currentSymbolId === 'durga' && <DurgaMiniIcon color={primaryColor} />}
          {currentSymbolId === 'custom' && customSymbol && (
            <img src={customSymbol} alt="Custom" className="w-5 h-5 object-contain" />
          )}
          {currentSymbolId === 'none' && (
            <span className="text-gray-400 text-[10px]">-</span>
          )}
        </div>
        <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full mt-2 left-0 z-50 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-600 p-2 min-w-[200px]">
            <div className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 px-2 pb-1 mb-1 border-b border-gray-100 dark:border-slate-700 font-semibold">
              {getText('God Symbol', 'देवता प्रतीक', 'देवता प्रतीक')}
            </div>
            <div className="grid grid-cols-2 gap-1">
              {godSymbols.map((symbol) => (
                <button
                  key={symbol.id}
                  onClick={() => handleSymbolSelect(symbol.id)}
                  className={`biodata-btn flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all duration-150 ${
                    currentSymbolId === symbol.id
                      ? 'bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700'
                      : 'hover:bg-gray-100 dark:hover:bg-slate-700 border border-transparent'
                  }`}
                >
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                    {symbol.id === 'krishna' && <KrishnaMiniIcon color={primaryColor} />}
                    {symbol.id === 'ganesh' && <GaneshMiniIcon color={primaryColor} />}
                    {symbol.id === 'om' && <OmMiniIcon color={primaryColor} />}
                    {symbol.id === 'swastik' && <SwastikMiniIcon color={primaryColor} />}
                    {symbol.id === 'shiv' && <ShivMiniIcon color={primaryColor} />}
                    {symbol.id === 'durga' && <DurgaMiniIcon color={primaryColor} />}
                    {symbol.id === 'custom' && (
                      customSymbol ? (
                        <img src={customSymbol} alt="Custom" className="w-5 h-5 object-contain" />
                      ) : (
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )
                    )}
                    {symbol.id === 'none' && (
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] sm:text-xs text-gray-700 dark:text-gray-300 truncate block">
                      {symbol.name[language]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t border-gray-100 dark:border-slate-700">
              <p className="text-[9px] text-gray-500 dark:text-gray-400 px-2">
                {getText(
                  'Custom: Upload PNG/JPG (100x80px recommended)',
                  'कस्टम: PNG/JPG अपलोड करें (100x80px अनुशंसित)',
                  'कस्टम: PNG/JPG अपलोड करा (100x80px शिफारस)'
                )}
              </p>
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

// Mini icon components for selector preview
function KrishnaMiniIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 60 50" fill="none">
      {/* Simplified flute */}
      <rect x="5" y="22" width="50" height="6" rx="3" fill={color} />
      <circle cx="15" cy="25" r="1.5" fill="white" opacity="0.8" />
      <circle cx="25" cy="25" r="1.5" fill="white" opacity="0.8" />
      <circle cx="35" cy="25" r="1.5" fill="white" opacity="0.8" />
      <circle cx="45" cy="25" r="1.5" fill="white" opacity="0.8" />
      {/* Peacock feather */}
      <ellipse cx="30" cy="12" rx="6" ry="8" fill="#1e3a5f" />
      <ellipse cx="30" cy="11" rx="4" ry="5" fill="#2d5a87" />
      <ellipse cx="30" cy="10" rx="2" ry="3" fill={color} />
    </svg>
  );
}

function GaneshMiniIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
      {/* Head */}
      <circle cx="12" cy="8" r="5" />
      {/* Trunk */}
      <path d="M12 10 Q10 14 8 16 Q9 17 10 16 Q11 14 12 12" />
      {/* Body */}
      <ellipse cx="12" cy="18" rx="5" ry="4" />
      {/* Ears */}
      <ellipse cx="6" cy="8" rx="2" ry="3" opacity="0.8" />
      <ellipse cx="18" cy="8" rx="2" ry="3" opacity="0.8" />
    </svg>
  );
}

function OmMiniIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <text x="12" y="18" textAnchor="middle" fill={color} fontSize="18" fontFamily="serif" fontWeight="bold">ॐ</text>
    </svg>
  );
}

function SwastikMiniIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      {/* Swastik */}
      <path d="M12 4 V20 M4 12 H20" />
      <path d="M12 4 H18 M12 20 H6 M4 12 V6 M20 12 V18" />
    </svg>
  );
}

function ShivMiniIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
      {/* Trishul */}
      <path d="M12 22 V6 M12 6 L8 2 M12 6 L16 2 M12 3 L12 2" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="8" cy="2" r="1.5" />
      <circle cx="16" cy="2" r="1.5" />
      <circle cx="12" cy="2" r="1.5" />
    </svg>
  );
}

function DurgaMiniIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
      {/* Lotus/Padma symbol */}
      <ellipse cx="12" cy="14" rx="3" ry="1.5" />
      <ellipse cx="12" cy="8" rx="2" ry="4" />
      <ellipse cx="8" cy="10" rx="2" ry="3.5" transform="rotate(-30 8 10)" opacity="0.8" />
      <ellipse cx="16" cy="10" rx="2" ry="3.5" transform="rotate(30 16 10)" opacity="0.8" />
      <ellipse cx="6" cy="13" rx="1.5" ry="3" transform="rotate(-60 6 13)" opacity="0.6" />
      <ellipse cx="18" cy="13" rx="1.5" ry="3" transform="rotate(60 18 13)" opacity="0.6" />
    </svg>
  );
}

// Export full-size icons for header rendering
export function GaneshIcon({ color, className }: { color: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill={color}>
      {/* Ears - Large elephant ears */}
      <ellipse cx="15" cy="35" rx="12" ry="20" opacity="0.85" />
      <ellipse cx="85" cy="35" rx="12" ry="20" opacity="0.85" />
      {/* Head */}
      <circle cx="50" cy="35" r="25" />
      {/* Trunk curling to right */}
      <path d="M50 45 Q45 55 40 65 Q38 70 42 72 Q46 74 48 70 Q52 62 55 55 Q58 50 55 48" strokeWidth="8" stroke={color} fill="none" />
      {/* Eyes */}
      <ellipse cx="40" cy="30" rx="3" ry="4" fill="white" />
      <ellipse cx="60" cy="30" rx="3" ry="4" fill="white" />
      <circle cx="40" cy="31" r="1.5" fill="#333" />
      <circle cx="60" cy="31" r="1.5" fill="#333" />
      {/* Crown/Mukut */}
      <path d="M30 20 L35 8 L42 18 L50 5 L58 18 L65 8 L70 20" fill={color} stroke={color} strokeWidth="2" />
      {/* Body */}
      <ellipse cx="50" cy="75" rx="20" ry="15" />
      {/* Hands suggesting blessing */}
      <ellipse cx="25" cy="70" rx="6" ry="10" transform="rotate(-20 25 70)" opacity="0.85" />
      <ellipse cx="75" cy="70" rx="6" ry="10" transform="rotate(20 75 70)" opacity="0.85" />
    </svg>
  );
}

export function OmIcon({ color, className }: { color: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 80" fill="none">
      <text x="50" y="65" textAnchor="middle" fill={color} fontSize="70" fontFamily="'Noto Serif Devanagari', serif" fontWeight="bold">ॐ</text>
    </svg>
  );
}

export function SwastikIcon({ color, className }: { color: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round">
      {/* Main cross */}
      <path d="M50 15 V85 M15 50 H85" />
      {/* Arms */}
      <path d="M50 15 H70 M50 85 H30 M15 50 V30 M85 50 V70" />
      {/* Decorative dots */}
      <circle cx="35" cy="35" r="4" fill={color} stroke="none" />
      <circle cx="65" cy="35" r="4" fill={color} stroke="none" />
      <circle cx="35" cy="65" r="4" fill={color} stroke="none" />
      <circle cx="65" cy="65" r="4" fill={color} stroke="none" />
    </svg>
  );
}

export function ShivIcon({ color, className }: { color: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      {/* Trishul handle */}
      <rect x="47" y="35" width="6" height="60" rx="2" fill={color} />
      {/* Center prong */}
      <path d="M50 35 L50 10 L45 5 L50 0 L55 5 L50 10" fill={color} />
      {/* Left prong */}
      <path d="M50 30 Q35 20 25 10 L20 5 L25 2 L30 8 Q40 18 47 28" fill={color} />
      {/* Right prong */}
      <path d="M50 30 Q65 20 75 10 L80 5 L75 2 L70 8 Q60 18 53 28" fill={color} />
      {/* Damru (drum) */}
      <ellipse cx="35" cy="55" rx="8" ry="5" fill={color} />
      <ellipse cx="35" cy="65" rx="8" ry="5" fill={color} />
      <rect x="30" y="55" width="10" height="10" fill={color} />
    </svg>
  );
}

export function DurgaIcon({ color, className }: { color: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 80" fill={color}>
      {/* Lotus flower */}
      <ellipse cx="50" cy="65" rx="15" ry="6" />
      {/* Center petal */}
      <ellipse cx="50" cy="35" rx="8" ry="20" />
      {/* Side petals */}
      <ellipse cx="35" cy="40" rx="7" ry="18" transform="rotate(-25 35 40)" opacity="0.9" />
      <ellipse cx="65" cy="40" rx="7" ry="18" transform="rotate(25 65 40)" opacity="0.9" />
      {/* Outer petals */}
      <ellipse cx="22" cy="50" rx="6" ry="15" transform="rotate(-50 22 50)" opacity="0.8" />
      <ellipse cx="78" cy="50" rx="6" ry="15" transform="rotate(50 78 50)" opacity="0.8" />
      {/* Far outer petals */}
      <ellipse cx="15" cy="58" rx="5" ry="12" transform="rotate(-70 15 58)" opacity="0.6" />
      <ellipse cx="85" cy="58" rx="5" ry="12" transform="rotate(70 85 58)" opacity="0.6" />
    </svg>
  );
}

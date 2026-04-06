'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  DynamicBiodataData,
  BiodataSection,
  createEmptyBiodata,
  createSection,
  Language,
} from '@/lib/types';
import { loadTemplateData } from '@/lib/templateData';
import { useLocalStorage, clearLocalStorage } from '@/lib/useLocalStorage';
import { Theme, getThemeById } from '@/lib/themes';
import { BorderDesign, getBorderById } from '@/lib/borders';

import Image from 'next/image';
import Header from './Header';
import PhotoSection from './PhotoSection';
import SectionBuilder from './SectionBuilder';
import PhotoGallerySection from './PhotoGallerySection';
import Footer from './Footer';
import LanguageToggle from './LanguageToggle';
import DownloadButton from './DownloadButton';
import ShareButton from './ShareButton';
import BorderRenderer from './borders';
import EmptyState from './EmptyState';
import BiodataPagedView from './BiodataPagedView';
import AIBioWriter from './AIBioWriter';
import TransliterateInput from './TransliterateInput';
import EditActionsSidebar from './EditActionsSidebar';
import DesignMenu from './DesignMenu';
import SettingsMenu from './SettingsMenu';
import { GaneshIcon, OmIcon, SwastikIcon, ShivIcon, DurgaIcon } from './GodSymbolSelector';
import KrishnaIcon from './KrishnaIcon';
import { useDarkMode } from '@/lib/DarkModeContext';
import { useAlert } from './AlertDialog';
import { hasShareData, getSharedData, clearShareFromUrl } from '@/lib/shareLink';
import { GodSymbolId } from '@/lib/types';

// Edit mode god symbol display component
function EditModeGodSymbol({
  symbolId,
  customSymbol,
  primaryColor,
}: {
  symbolId: GodSymbolId;
  customSymbol?: string;
  primaryColor: string;
}) {
  switch (symbolId) {
    case 'krishna':
      return <KrishnaIcon className="w-28 h-auto" />;
    case 'ganesh':
      return <GaneshIcon color={primaryColor} className="w-20 h-20" />;
    case 'om':
      return <OmIcon color={primaryColor} className="w-20 h-16" />;
    case 'swastik':
      return <SwastikIcon color={primaryColor} className="w-16 h-16" />;
    case 'shiv':
      return <ShivIcon color={primaryColor} className="w-16 h-20" />;
    case 'durga':
      return <DurgaIcon color={primaryColor} className="w-20 h-16" />;
    case 'custom':
      if (customSymbol) {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={customSymbol}
            alt="Custom Symbol"
            className="w-auto h-20 object-contain"
            style={{ maxWidth: '100px' }}
          />
        );
      }
      return null;
    case 'none':
      return null;
    default:
      return <KrishnaIcon className="w-28 h-auto" />;
  }
}

const STORAGE_KEY = 'biodata-builder-data';
const MAX_HISTORY = 50;

export default function BiodataBuilder() {
  const searchParams = useSearchParams();
  const biodataRef = useRef<HTMLDivElement>(null);
  const pagedViewRef = useRef<HTMLDivElement>(null);
  const { isDark } = useDarkMode();
  const { showConfirm, setLanguage: setAlertLanguage } = useAlert();

  const [language, setLanguageState] = useState<Language>('en');

  // Wrapper to sync language with AlertDialog
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    setAlertLanguage(lang);
  }, [setAlertLanguage]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPhoto, setShowPhoto] = useState(true);
  const [data, setData] = useLocalStorage<DynamicBiodataData>(STORAGE_KEY, createEmptyBiodata());
  const [isClient, setIsClient] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [showAIWriter, setShowAIWriter] = useState(false);

  // History for Undo/Redo
  const [history, setHistory] = useState<DynamicBiodataData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isUndoRedoAction = useRef(false);

  const currentTheme = getThemeById(data.themeId);
  const currentBorder = getBorderById(data.borderId);

  // Track data changes for history
  useEffect(() => {
    if (isClient && !isUndoRedoAction.current) {
      setHistory(prev => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push(data);
        if (newHistory.length > MAX_HISTORY) {
          newHistory.shift();
          return newHistory;
        }
        return newHistory;
      });
      setHistoryIndex(prev => Math.min(prev + 1, MAX_HISTORY - 1));
    }
    isUndoRedoAction.current = false;
  }, [data, isClient]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handleUndo = useCallback(() => {
    if (canUndo) {
      isUndoRedoAction.current = true;
      setHistoryIndex(prev => prev - 1);
      setData(history[historyIndex - 1]);
    }
  }, [canUndo, history, historyIndex, setData]);

  const handleRedo = useCallback(() => {
    if (canRedo) {
      isUndoRedoAction.current = true;
      setHistoryIndex(prev => prev + 1);
      setData(history[historyIndex + 1]);
    }
  }, [canRedo, history, historyIndex, setData]);

  // Keyboard shortcuts for Undo/Redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  // Trilingual text helper
  const getText = (en: string, hi: string, mr: string) => {
    if (language === 'hi') return hi;
    if (language === 'mr') return mr;
    return en;
  };

  // Back to home function - navigates to marketing landing page
  const handleBackToHome = async () => {
    if (hasChanges) {
      const confirmMessage = getText(
        'You have unsaved changes. Are you sure you want to go back?',
        'आपके पास सहेजे नहीं गए परिवर्तन हैं। क्या आप वाकई वापस जाना चाहते हैं?',
        'तुमच्याकडे जतन न केलेले बदल आहेत. तुम्हाला खात्री आहे का?'
      );
      const confirmed = await showConfirm(confirmMessage, {
        title: getText('Go Back?', 'वापस जाएं?', 'परत जा?'),
        confirmText: getText('Yes, Go Back', 'हाँ, वापस जाएं', 'होय, परत जा'),
        cancelText: getText('Stay', 'रहें', 'रहा'),
      });
      if (!confirmed) return;
    }
    // Navigate to landing page
    window.location.href = '/';
  };

  // Handle client-side initialization
  useEffect(() => {
    setIsClient(true);
    const editParam = searchParams.get('edit');
    if (editParam === 'true') {
      setIsEditMode(true);
    }

    // Load shared biodata from URL if present
    if (hasShareData()) {
      const sharedData = getSharedData();
      if (sharedData) {
        setData(sharedData);
        // Clear the URL parameter without reloading
        clearShareFromUrl();
        // Show preview mode for shared biodata
        setIsEditMode(false);
      }
    }

    // Check if coming from home page with template flag
    const loadTemplate = localStorage.getItem('bio-maker-load-template');
    if (loadTemplate === 'true') {
      // Clear the flag
      localStorage.removeItem('bio-maker-load-template');

      // Load template data with selected theme/border
      const savedTheme = localStorage.getItem('bio-maker-theme');
      const savedBorder = localStorage.getItem('bio-maker-border');
      const savedLanguage = localStorage.getItem('bio-maker-language') as Language;

      const templateData = loadTemplateData();
      if (savedTheme) templateData.themeId = savedTheme;
      if (savedBorder) templateData.borderId = savedBorder;

      setData(templateData);
      if (savedLanguage) setLanguage(savedLanguage);
      setIsEditMode(true);
    }
  }, [searchParams, setData, setLanguage]);

  const handleThemeChange = (theme: Theme) => {
    setData((prev) => ({ ...prev, themeId: theme.id, updatedAt: new Date().toISOString() }));
  };

  const handleBorderChange = (border: BorderDesign) => {
    setData((prev) => ({ ...prev, borderId: border.id, updatedAt: new Date().toISOString() }));
  };

  const handleNameChange = (name: string, isMarathi: boolean) => {
    setData((prev) => ({
      ...prev,
      ...(isMarathi ? { nameMarathi: name } : { name: name }),
      updatedAt: new Date().toISOString(),
    }));
  };

  const handlePhotoChange = (photo: string) => {
    setData((prev) => ({ ...prev, photo, updatedAt: new Date().toISOString() }));
  };

  const handlePhotoGalleryUpdate = (field: 'url' | 'showQR', value: string | boolean) => {
    setData((prev) => ({
      ...prev,
      ...(field === 'url'
        ? { photoGalleryUrl: value as string }
        : { showPhotoGalleryQR: value as boolean }),
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleGodSymbolChange = (symbolId: GodSymbolId, customImage?: string) => {
    setData((prev) => ({
      ...prev,
      godSymbolId: symbolId,
      ...(customImage ? { customGodSymbol: customImage } : {}),
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleToggleThankYou = () => {
    setData((prev) => ({
      ...prev,
      showThankYou: !prev.showThankYou,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleSectionUpdate = (index: number, updated: BiodataSection) => {
    setData((prev) => {
      const newSections = [...prev.sections];
      newSections[index] = updated;
      return { ...prev, sections: newSections, updatedAt: new Date().toISOString() };
    });
  };

  const handleSectionDelete = (index: number) => {
    setData((prev) => {
      const newSections = prev.sections.filter((_, i) => i !== index);
      return { ...prev, sections: newSections, updatedAt: new Date().toISOString() };
    });
  };

  const handleAddSection = (afterIndex?: number) => {
    setData((prev) => {
      const newSection = createSection('');
      const newSections = [...prev.sections];
      if (afterIndex !== undefined) {
        newSections.splice(afterIndex + 1, 0, newSection);
      } else {
        newSections.push(newSection);
      }
      return { ...prev, sections: newSections, updatedAt: new Date().toISOString() };
    });
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    setData((prev) => {
      const newSections = [...prev.sections];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= newSections.length) return prev;
      [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
      return { ...prev, sections: newSections, updatedAt: new Date().toISOString() };
    });
  };

  const handleDataRestore = (restoredData: DynamicBiodataData) => {
    setData(restoredData);
  };

  const handleReset = async () => {
    const confirmed = await showConfirm(
      getText(
        'All data will be cleared. This action cannot be undone.',
        'सारा डेटा हटा दिया जाएगा। यह क्रिया पूर्ववत नहीं की जा सकती।',
        'सर्व डेटा हटवला जाईल. ही क्रिया पूर्ववत करता येणार नाही.'
      ),
      {
        title: getText('Reset Everything?', 'सब कुछ रीसेट करें?', 'सर्व रीसेट करायचे?'),
        confirmText: getText('Yes, Reset', 'हाँ, रीसेट करें', 'होय, रीसेट करा'),
        cancelText: getText('Cancel', 'रद्द करें', 'रद्द करा'),
      }
    );
    if (confirmed) {
      clearLocalStorage(STORAGE_KEY);
      setData(createEmptyBiodata());
    }
  };

  const handleStartBuilding = () => {
    setIsEditMode(true);
    handleAddSection();
  };

  const handleUseTemplate = () => {
    const templateData = loadTemplateData();
    templateData.themeId = data.themeId;
    templateData.borderId = data.borderId;
    setData(templateData);
    setIsEditMode(true);
  };

  const handlePageCountChange = (count: number) => {
    setPageCount(count);
  };

  // Handle AI-generated bio sections
  const handleAIBioGenerated = (sections: Array<{
    title: string;
    titleMarathi: string;
    fields: Array<{
      label: string;
      labelMarathi: string;
      value: string;
      valueMarathi: string;
    }>;
  }>) => {
    // Convert AI sections to biodata sections format
    const newSections: BiodataSection[] = sections.map((section, sectionIdx) => {
      // Create section with custom title (AI-generated titles are custom)
      const biodataSection = createSection('custom');
      biodataSection.customTitle = section.title;
      biodataSection.customTitleMarathi = section.titleMarathi;

      // Convert fields to attributes
      biodataSection.attributes = section.fields.map((field, fieldIdx) => ({
        id: `ai-attr-${Date.now()}-${sectionIdx}-${fieldIdx}`,
        attributeId: 'custom',
        value: field.value,
        valueMarathi: field.valueMarathi,
        customLabel: field.label,
        customLabelMarathi: field.labelMarathi,
      }));

      return biodataSection;
    });

    // Extract name from the first section if available
    const personalSection = sections.find(s => s.title.toLowerCase().includes('personal'));
    const nameField = personalSection?.fields.find(f => f.label.toLowerCase() === 'name');

    setData((prev) => ({
      ...prev,
      name: nameField?.value?.replace(/^(Mr\.|Ms\.|Mrs\.|Shri|Smt\.?)\s*/i, '') || prev.name,
      nameMarathi: nameField?.valueMarathi?.replace(/^(श्री|श्रीमती|सौ\.|कु\.)\s*/i, '') || prev.nameMarathi,
      sections: newSections,
      updatedAt: new Date().toISOString(),
    }));

    setShowAIWriter(false);
    setIsEditMode(true);
  };

  const isEmpty = !data.name && data.sections.length === 0;
  const hasChanges = JSON.stringify(data) !== JSON.stringify(createEmptyBiodata());

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--ui-bg)]">
        <div className="text-[#D4AF37] text-xl">Loading...</div>
      </div>
    );
  }

  // In app zone, always start in edit mode if empty
  // EmptyState is now shown on the marketing landing page (/)
  if (isEmpty && !isEditMode) {
    // Auto-enable edit mode in app zone
    setIsEditMode(true);
  }

  const isMarathi = language === 'mr';

  return (
    <main
      className="min-h-screen py-4 px-2 md:py-8 md:px-4 transition-colors duration-300 relative"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, #0a0a15 0%, #0f172a 30%, #1a1a2e 60%, #0f172a 100%)'
          : 'linear-gradient(180deg, #FFFEF8 0%, #FFF9E8 50%, #FFFEF8 100%)',
      }}
    >
      {/* Subtle ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.04) 0%, transparent 40%), radial-gradient(ellipse at 80% 80%, rgba(139, 92, 246, 0.03) 0%, transparent 40%)'
            : 'radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
          zIndex: 0,
        }}
      />

      {/* Dark mode: subtle star-like dots (static, no animation) */}
      {isDark && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 20px 30px, rgba(212, 175, 55, 0.15), transparent),
                              radial-gradient(1px 1px at 40px 70px, rgba(212, 175, 55, 0.1), transparent),
                              radial-gradient(1px 1px at 50px 160px, rgba(212, 175, 55, 0.12), transparent),
                              radial-gradient(1px 1px at 90px 40px, rgba(212, 175, 55, 0.08), transparent),
                              radial-gradient(1px 1px at 130px 80px, rgba(212, 175, 55, 0.14), transparent),
                              radial-gradient(1px 1px at 160px 120px, rgba(212, 175, 55, 0.1), transparent)`,
            backgroundSize: '200px 200px',
            zIndex: 0,
          }}
        />
      )}
      {/* Control Panel - Floating Golden Parchment Design */}
      <div className="no-print max-w-5xl mx-auto mb-6 px-2 sm:px-4 relative z-[100]">
        {/* Main Floating Toolbar */}
        <div className="relative">
          {/* Main Container with golden gradient border */}
          <div
            className="relative rounded-xl p-[1px]"
            style={{
              background: 'linear-gradient(180deg, #D4AF37 0%, rgba(212, 175, 55, 0.4) 10%, rgba(212, 175, 55, 0.4) 90%, #D4AF37 100%)',
              boxShadow: isDark
                ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                : '0 4px 20px rgba(0, 0, 0, 0.08)',
            }}
          >
            {/* Inner container */}
            <div
              className="rounded-[11px]"
              style={{
                background: isDark
                  ? 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)'
                  : 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
              }}
            >
              {/* Toolbar Content - Clean organized layout */}
              <div className="relative px-2 py-2 sm:px-4 sm:py-3">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {/* Logo as Home Button */}
                <button
                  onClick={handleBackToHome}
                  className="group h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center rounded-lg bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:border-[#D4AF37]/50 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 cursor-pointer overflow-hidden"
                  title={getText('Home', 'होम', 'मुख्यपृष्ठ')}
                >
                  <Image
                    src="/logo.png"
                    alt="Shubh Vivah"
                    width={24}
                    height={24}
                    className="rounded transition-transform duration-300 group-hover:scale-110 sm:w-7 sm:h-7"
                  />
                </button>

                {/* Divider */}
                <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-slate-600" />

                {/* Design Menu (Theme + Border + Symbol) */}
                <DesignMenu
                  language={language}
                  currentTheme={currentTheme}
                  currentBorder={currentBorder}
                  currentSymbolId={data.godSymbolId || 'krishna'}
                  customSymbol={data.customGodSymbol}
                  onThemeChange={handleThemeChange}
                  onBorderChange={handleBorderChange}
                  onSymbolChange={handleGodSymbolChange}
                />

                {/* Language Toggle */}
                <LanguageToggle language={language} onLanguageChange={setLanguage} />

                {/* Divider */}
                <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-slate-600" />

                {/* AI Bio Writer Button - Redesigned */}
                <button
                  onClick={() => setShowAIWriter(true)}
                  className="h-8 sm:h-9 px-3 sm:px-4 flex items-center gap-2 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.02] text-white"
                  style={{
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #EC4899 100%)',
                  }}
                  title={getText('AI Bio Writer', 'AI बायो लेखक', 'AI बायो लेखक')}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="hidden sm:inline">{getText('AI Writer', 'AI लेखक', 'AI लेखक')}</span>
                </button>

                {/* Download Button */}
                <DownloadButton
                  language={language}
                  targetRef={isEditMode ? biodataRef : pagedViewRef}
                  fileName={data.name ? data.name.replace(/\s+/g, '_') + '_Biodata' : 'Marriage_Biodata'}
                  pageCount={pageCount}
                  biodataData={data}
                  onCreateAnother={() => {
                    clearLocalStorage(STORAGE_KEY);
                    setData(createEmptyBiodata());
                    setIsEditMode(true);
                  }}
                />

                {/* Share Button */}
                <ShareButton
                  language={language}
                  targetRef={isEditMode ? biodataRef : pagedViewRef}
                  fileName={data.name ? data.name.replace(/\s+/g, '_') + '_Biodata' : 'Marriage_Biodata'}
                  biodataData={data}
                />

                {/* Divider */}
                <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-slate-600" />

                {/* Settings Menu (Dark mode + Backup + Reset) */}
                <SettingsMenu
                  language={language}
                  data={data}
                  onRestore={handleDataRestore}
                  onReset={handleReset}
                />
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery URL Editor - Edit mode only */}
        {isEditMode && (
          <div className="mt-2 sm:mt-3 relative flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 bg-gradient-to-r from-[#FFFEF8] to-[#FFF9E6] dark:from-slate-800 dark:to-slate-700 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 border border-[#E8DFC4] dark:border-slate-600 shadow-sm">
            <div className="flex items-center gap-2 w-full sm:flex-1">
              <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center shadow-sm">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <label className="block text-[9px] sm:text-[10px] uppercase tracking-wider text-[#998866] dark:text-slate-400 font-semibold mb-0.5">
                  {getText('Photo Gallery Link', 'फोटो गैलरी लिंक', 'फोटो गॅलरी लिंक')}
                </label>
                <input
                  type="url"
                  value={data.photoGalleryUrl || ''}
                  onChange={(e) => handlePhotoGalleryUpdate('url', e.target.value)}
                  placeholder={getText('Paste Google Drive or album link...', 'Google Drive या एल्बम लिंक पेस्ट करें...', 'Google Drive किंवा अल्बम लिंक पेस्ट करा...')}
                  className="w-full bg-transparent text-[11px] sm:text-xs text-[#333] dark:text-slate-200 placeholder-[#AAA] dark:placeholder-slate-500 focus:outline-none border-b border-transparent focus:border-[#D4AF37] transition-colors pb-0.5"
                />
              </div>
            </div>
            {data.photoGalleryUrl && (
              <label className="flex items-center gap-1.5 cursor-pointer ml-9 sm:ml-0 flex-shrink-0">
                <div className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${data.showPhotoGalleryQR ? 'bg-[#D4AF37]' : 'bg-gray-300 dark:bg-slate-600'}`}>
                  <input
                    type="checkbox"
                    checked={data.showPhotoGalleryQR}
                    onChange={(e) => handlePhotoGalleryUpdate('showQR', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200 ${data.showPhotoGalleryQR ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
                <span className="text-[10px] uppercase tracking-wide font-semibold text-[#777] dark:text-slate-400">QR</span>
              </label>
            )}
          </div>
        )}
      </div>

      {/* EDIT MODE: Continuous scrollable container */}
      {isEditMode && (
        <div className="overflow-x-auto pb-4">
        <div
          ref={biodataRef}
          className="biodata-container shadow-xl golden-glow mx-auto relative z-[10]"
          style={{
            backgroundColor: currentTheme.colors.background,
            '--theme-primary': currentTheme.colors.primary,
            '--theme-primary-dark': currentTheme.colors.primaryDark,
            '--theme-secondary': currentTheme.colors.secondary,
            '--theme-background': currentTheme.colors.background,
            '--theme-background-alt': currentTheme.colors.backgroundAlt,
            '--theme-text': currentTheme.colors.text,
            '--theme-text-muted': currentTheme.colors.textMuted,
            '--theme-border': currentTheme.colors.border,
            '--theme-header-text': currentTheme.colors.headerText,
          } as React.CSSProperties}
        >
          <div className="relative min-h-[inherit]">
            <BorderRenderer
              borderId={currentBorder.id}
              primaryColor={currentTheme.colors.primary}
              secondaryColor={currentTheme.colors.secondary}
            />

            <div className="biodata-inner-content relative z-10">
              {/* Editable Header with God Symbol */}
              <div className="text-center pt-2">
                {/* God Symbol - using Header component's logic */}
                {(data.godSymbolId || 'krishna') !== 'none' && (
                  <div className="flex justify-center mb-2">
                    <EditModeGodSymbol
                      symbolId={data.godSymbolId || 'krishna'}
                      customSymbol={data.customGodSymbol}
                      primaryColor={currentTheme.colors.primary}
                    />
                  </div>
                )}
                <TransliterateInput
                  type="text"
                  value={isMarathi ? data.nameMarathi : data.name}
                  onChange={(val) => handleNameChange(val, isMarathi)}
                  enabled={isMarathi}
                  placeholder={isMarathi ? 'तुमचे नाव येथे टाइप करा' : 'Type your name here'}
                  className={`biodata-name text-center w-full bg-transparent border-b-2 border-dashed border-amber-300 focus:border-amber-500 focus:outline-none px-4 py-1 ${isMarathi ? 'marathi-header' : ''}`}
                  style={{
                    color: 'var(--theme-header-text, #800020)',
                    fontFamily: isMarathi ? "'Noto Serif Devanagari', serif" : "'Playfair Display', serif",
                  }}
                />
              </div>

              {/* Photo and Sections */}
              <div className="relative mt-2">
                {/* Photo floated right - biodata is at fixed A4 width */}
                <div className="absolute right-0 top-0 z-10">
                  <PhotoSection
                    mainPhoto={data.photo}
                    isEditMode={true}
                    onPhotoChange={handlePhotoChange}
                    primaryColor={currentTheme.colors.primary}
                    secondaryColor={currentTheme.colors.secondary}
                    backgroundColor={currentTheme.colors.background}
                    language={language}
                    showPhoto={showPhoto}
                    onTogglePhoto={() => setShowPhoto(!showPhoto)}
                  />
                </div>

                <div className={showPhoto ? 'pr-48' : ''}>
                  {data.sections.map((section, index) => (
                    <SectionBuilder
                      key={section.id}
                      section={section}
                      language={language}
                      isEditMode={true}
                      onUpdate={(updated) => handleSectionUpdate(index, updated)}
                      onDelete={() => handleSectionDelete(index)}
                      onAddSectionBelow={() => handleAddSection(index)}
                      onMoveUp={() => handleMoveSection(index, 'up')}
                      onMoveDown={() => handleMoveSection(index, 'down')}
                      isFirst={index === 0}
                      isLast={index === data.sections.length - 1}
                    />
                  ))}

                  {data.sections.length === 0 && (
                    <button
                      onClick={() => handleAddSection()}
                      className="biodata-btn w-full py-8 border-2 border-dashed border-amber-300 rounded-xl hover:border-amber-400 hover:bg-amber-50/50 transition-colors flex flex-col items-center justify-center gap-2 text-amber-600"
                    >
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="text-sm font-medium">
                        {isMarathi ? 'पहिला विभाग जोडा' : 'Add your first section'}
                      </span>
                    </button>
                  )}

                  {data.sections.length > 0 && (
                    <button
                      onClick={() => handleAddSection()}
                      className="biodata-btn w-full mt-4 py-3 border-2 border-dashed border-amber-200 rounded-lg hover:border-amber-300 hover:bg-amber-50/30 transition-colors flex items-center justify-center gap-2 text-amber-500 hover:text-amber-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="text-sm">
                        {isMarathi ? 'नवीन विभाग जोडा' : 'Add new section'}
                      </span>
                    </button>
                  )}
                </div>
              </div>

              <Footer
                  language={language}
                  showThankYou={data.showThankYou !== false}
                  isEditMode={true}
                  onToggleThankYou={handleToggleThankYou}
                />
            </div>
          </div>
        </div>
        </div>
      )}

      {/* VIEW MODE: Discrete A4 pages - WYSIWYG */}
      {!isEditMode && (
        <div className="overflow-x-auto pb-4">
          <div className="w-fit mx-auto">
            <BiodataPagedView
              data={data}
              language={language}
              theme={currentTheme}
              border={currentBorder}
              showPhoto={showPhoto}
              pagesRef={pagedViewRef}
              onPageCountChange={handlePageCountChange}
            />
          </div>
        </div>
      )}

      {/* Copyright */}
      <div className="no-print text-center mt-4 text-sm text-[#777] dark:text-slate-500">
        &copy; {new Date().getFullYear()} Shubh Vivah - Marriage Biodata Builder. All rights reserved.
      </div>

      {/* AI Bio Writer Modal */}
      {showAIWriter && (
        <AIBioWriter
          language={language}
          currentName={data.name}
          onBioGenerated={handleAIBioGenerated}
          onClose={() => setShowAIWriter(false)}
        />
      )}

      {/* Edit Actions Sidebar - Vertical bar on right side */}
      <EditActionsSidebar
        language={language}
        isEditMode={isEditMode}
        onToggleEditMode={() => setIsEditMode(!isEditMode)}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onReset={handleReset}
        hasChanges={hasChanges}
      />
    </main>
  );
}

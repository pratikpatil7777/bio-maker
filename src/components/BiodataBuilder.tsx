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

import Header from './Header';
import PhotoSection from './PhotoSection';
import SectionBuilder from './SectionBuilder';
import PhotoGallerySection from './PhotoGallerySection';
import Footer from './Footer';
import LanguageToggle from './LanguageToggle';
import EditModeToggle from './EditModeToggle';
import PDFExportButton from './PDFExportButton';
import ShareButton from './ShareButton';
import ThemeSelector from './ThemeSelector';
import BorderSelector from './BorderSelector';
import BorderRenderer from './borders';
import DataBackupNew from './DataBackupNew';
import EmptyState from './EmptyState';
import BiodataPagedView from './BiodataPagedView';
import { DarkModeToggleCompact } from './DarkModeToggle';
import { useDarkMode } from '@/lib/DarkModeContext';
import { useAlert } from './AlertDialog';

const STORAGE_KEY = 'biodata-builder-data';
const MAX_HISTORY = 50;

export default function BiodataBuilder() {
  const searchParams = useSearchParams();
  const biodataRef = useRef<HTMLDivElement>(null);
  const pagedViewRef = useRef<HTMLDivElement>(null);
  const { isDark } = useDarkMode();
  const { showConfirm } = useAlert();

  const [language, setLanguage] = useState<Language>('en');
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPhoto, setShowPhoto] = useState(true);
  const [data, setData] = useLocalStorage<DynamicBiodataData>(STORAGE_KEY, createEmptyBiodata());
  const [isClient, setIsClient] = useState(false);
  const [pageCount, setPageCount] = useState(1);

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

  // Back to home function
  const handleBackToHome = async () => {
    if (hasChanges) {
      const confirmMessage = language === 'mr'
        ? 'तुमच्याकडे जतन न केलेले बदल आहेत. तुम्हाला खात्री आहे का?'
        : 'You have unsaved changes. Are you sure you want to go back?';
      const confirmed = await showConfirm(confirmMessage, {
        title: language === 'mr' ? 'परत जा?' : 'Go Back?',
        confirmText: language === 'mr' ? 'होय, परत जा' : 'Yes, Go Back',
        cancelText: language === 'mr' ? 'रहा' : 'Stay',
      });
      if (!confirmed) return;
    }
    clearLocalStorage(STORAGE_KEY);
    setData(createEmptyBiodata());
    setIsEditMode(false);
  };

  // Handle client-side initialization
  useEffect(() => {
    setIsClient(true);
    const editParam = searchParams.get('edit');
    if (editParam === 'true') {
      setIsEditMode(true);
    }
  }, [searchParams]);

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
      language === 'mr'
        ? 'सर्व डेटा हटवला जाईल. ही क्रिया पूर्ववत करता येणार नाही.'
        : 'All data will be cleared. This action cannot be undone.',
      {
        title: language === 'mr' ? 'सर्व रीसेट करायचे?' : 'Reset Everything?',
        confirmText: language === 'mr' ? 'होय, रीसेट करा' : 'Yes, Reset',
        cancelText: language === 'mr' ? 'रद्द करा' : 'Cancel',
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

  const isEmpty = !data.name && data.sections.length === 0;
  const hasChanges = JSON.stringify(data) !== JSON.stringify(createEmptyBiodata());

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--ui-bg)]">
        <div className="text-[#D4AF37] text-xl">Loading...</div>
      </div>
    );
  }

  if (isEmpty && !isEditMode) {
    return (
      <EmptyState
        language={language}
        onLanguageChange={setLanguage}
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        currentBorder={currentBorder}
        onBorderChange={handleBorderChange}
        onStartBuilding={handleStartBuilding}
        onUseTemplate={handleUseTemplate}
      />
    );
  }

  const isMarathi = language === 'mr';

  return (
    <main className="min-h-screen py-4 px-2 md:py-8 md:px-4 transition-colors duration-300" style={{ backgroundColor: 'var(--ui-bg)' }}>
      {/* Control Panel - Floating Golden Parchment Design */}
      <div className="no-print max-w-5xl mx-auto mb-6 px-2 sm:px-4 relative z-[100]">
        {/* Main Floating Toolbar */}
        <div className="relative">
          {/* Outer glow effect */}
          <div
            className="absolute inset-0 rounded-2xl blur-xl opacity-30"
            style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #D4AF37 100%)' }}
          />

          {/* Main Container with decorative border */}
          <div
            className="relative rounded-2xl"
            style={{
              background: isDark
                ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
                : 'linear-gradient(135deg, #FFFDF5 0%, #FFF8E7 100%)',
              boxShadow: isDark
                ? '0 4px 30px rgba(212, 175, 55, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)'
                : '0 4px 30px rgba(212, 175, 55, 0.25), inset 0 1px 0 rgba(255,255,255,0.8)',
            }}
          >
            {/* Top golden accent line */}
            <div className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-t-2xl" />

            {/* Decorative corner ornaments */}
            <svg className="absolute top-1 left-1 w-8 h-8 text-[#D4AF37] opacity-40" viewBox="0 0 32 32">
              <path d="M4 4 Q4 16 16 16 Q4 16 4 28" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="4" cy="4" r="2" fill="currentColor"/>
            </svg>
            <svg className="absolute top-1 right-1 w-8 h-8 text-[#D4AF37] opacity-40" viewBox="0 0 32 32">
              <path d="M28 4 Q28 16 16 16 Q28 16 28 28" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="28" cy="4" r="2" fill="currentColor"/>
            </svg>

            {/* Toolbar Content */}
            <div className="relative z-10 px-3 py-2.5 sm:px-5 sm:py-3">
              {/* Unified Button Bar */}
              <div className="flex items-center justify-between gap-3 flex-wrap">

                {/* Left Section: Back + Mode Toggles */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Back Button */}
                  <button
                    onClick={handleBackToHome}
                    className="h-9 w-9 flex items-center justify-center rounded-lg bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-slate-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                    title={isMarathi ? 'मागे जा' : 'Back to Home'}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>

                  <div className="w-px h-6 bg-gray-200 dark:bg-slate-600 hidden sm:block" />

                  <DarkModeToggleCompact />
                  <LanguageToggle language={language} onLanguageChange={setLanguage} />
                </div>

                {/* Center Section: Design Controls */}
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
                  <ThemeSelector language={language} currentTheme={currentTheme} onThemeChange={handleThemeChange} />
                  <BorderSelector language={language} currentBorder={currentBorder} primaryColor={currentTheme.colors.primary} onBorderChange={handleBorderChange} />

                  {/* Photo Toggle */}
                  <button
                    onClick={() => setShowPhoto(!showPhoto)}
                    className={`h-9 px-3 flex items-center gap-1.5 rounded-lg text-xs font-medium transition-all duration-300 cursor-pointer shadow-sm ${
                      showPhoto
                        ? 'bg-white dark:bg-slate-700 text-[#D4AF37] border border-[#D4AF37]/40 hover:shadow-md'
                        : 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 border border-gray-200 dark:border-slate-700 hover:border-gray-300'
                    }`}
                    title={showPhoto ? (isMarathi ? 'फोटो लपवा' : 'Hide photo') : (isMarathi ? 'फोटो दाखवा' : 'Show photo')}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showPhoto ? (
                        <>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </>
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      )}
                    </svg>
                    <span className="hidden sm:inline">{showPhoto ? (isMarathi ? 'फोटो' : 'Photo') : (isMarathi ? 'बंद' : 'Off')}</span>
                  </button>

                  <DataBackupNew language={language} data={data} onRestore={handleDataRestore} />

                  {/* Undo/Redo Buttons */}
                  <div className="flex items-center">
                    <button
                      onClick={handleUndo}
                      disabled={!canUndo}
                      className={`h-9 w-9 flex items-center justify-center rounded-l-lg border transition-all duration-300 ${
                        canUndo
                          ? 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-slate-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 cursor-pointer shadow-sm hover:shadow-md'
                          : 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-300 dark:text-slate-600 cursor-not-allowed'
                      }`}
                      title={isMarathi ? 'पूर्ववत करा (Ctrl+Z)' : 'Undo (Ctrl+Z)'}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                    </button>
                    <button
                      onClick={handleRedo}
                      disabled={!canRedo}
                      className={`h-9 w-9 flex items-center justify-center rounded-r-lg border-t border-r border-b transition-all duration-300 ${
                        canRedo
                          ? 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-slate-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 cursor-pointer shadow-sm hover:shadow-md'
                          : 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-300 dark:text-slate-600 cursor-not-allowed'
                      }`}
                      title={isMarathi ? 'पुन्हा करा (Ctrl+Y)' : 'Redo (Ctrl+Y)'}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Right Section: Edit & Actions */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <EditModeToggle
                    language={language}
                    isEditMode={isEditMode}
                    onToggle={setIsEditMode}
                    onReset={handleReset}
                    hasChanges={hasChanges}
                  />

                  {/* Action Buttons Group */}
                  <div className="flex items-center gap-1.5">
                    <PDFExportButton
                      language={language}
                      targetRef={isEditMode ? biodataRef : pagedViewRef}
                      fileName={data.name ? data.name.replace(/\s+/g, '_') + '_Biodata' : 'Marriage_Biodata'}
                      pageCount={pageCount}
                    />
                    <ShareButton language={language} targetRef={isEditMode ? biodataRef : pagedViewRef} />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom golden accent line */}
            <div className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>
        </div>

        {/* Photo Gallery URL Editor - Edit mode only */}
        {isEditMode && (
          <div className="mt-3 relative flex items-center gap-3 bg-gradient-to-r from-[#FFFEF8] to-[#FFF9E6] dark:from-slate-800 dark:to-slate-700 rounded-xl px-4 py-2.5 border border-[#E8DFC4] dark:border-slate-600 shadow-sm">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] uppercase tracking-wider text-[#998866] dark:text-slate-400 font-semibold mb-0.5">
                {isMarathi ? 'फोटो गॅलरी लिंक' : 'Photo Gallery Link'}
              </label>
              <input
                type="url"
                value={data.photoGalleryUrl || ''}
                onChange={(e) => handlePhotoGalleryUpdate('url', e.target.value)}
                placeholder={isMarathi ? 'Google Drive किंवा अल्बम लिंक पेस्ट करा...' : 'Paste Google Drive or album link here...'}
                className="w-full bg-transparent text-xs text-[#333] dark:text-slate-200 placeholder-[#AAA] dark:placeholder-slate-500 focus:outline-none border-b border-transparent focus:border-[#D4AF37] transition-colors pb-0.5"
              />
            </div>
            {data.photoGalleryUrl && (
              <label className="flex items-center gap-1.5 cursor-pointer">
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
              {/* Editable Header */}
              <div className="text-center pt-2">
                <div className="flex justify-center mb-2">
                  <svg width="40" height="40" viewBox="0 0 100 100" className="text-[var(--theme-primary)]">
                    <circle cx="50" cy="35" r="15" fill="currentColor" opacity="0.9" />
                    <ellipse cx="50" cy="72" rx="20" ry="25" fill="currentColor" opacity="0.8" />
                    <path d="M30 30 Q50 5 70 30" stroke="currentColor" strokeWidth="3" fill="none" />
                    <circle cx="35" cy="20" r="4" fill="currentColor" />
                    <circle cx="65" cy="20" r="4" fill="currentColor" />
                    <path d="M25 60 Q15 50 20 40" stroke="currentColor" strokeWidth="2.5" fill="none" />
                    <path d="M75 60 Q85 50 80 40" stroke="currentColor" strokeWidth="2.5" fill="none" />
                    <ellipse cx="20" cy="38" rx="4" ry="6" fill="currentColor" opacity="0.6" />
                    <ellipse cx="80" cy="38" rx="4" ry="6" fill="currentColor" opacity="0.6" />
                    <path d="M70 55 Q90 55 95 35 Q90 30 85 35 Q87 45 70 50" fill="currentColor" opacity="0.7" />
                    <circle cx="92" cy="32" r="2" fill="currentColor" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={isMarathi ? data.nameMarathi : data.name}
                  onChange={(e) => handleNameChange(e.target.value, isMarathi)}
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
                {showPhoto && (
                  <div className="absolute right-0 top-0 z-10">
                    <PhotoSection
                      mainPhoto={data.photo}
                      isEditMode={true}
                      onPhotoChange={handlePhotoChange}
                      primaryColor={currentTheme.colors.primary}
                      secondaryColor={currentTheme.colors.secondary}
                      backgroundColor={currentTheme.colors.background}
                    />
                  </div>
                )}

                <div className={showPhoto ? 'pr-44 md:pr-48' : ''}>
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
                      className="w-full py-8 border-2 border-dashed border-amber-300 rounded-xl hover:border-amber-400 hover:bg-amber-50/50 transition-colors flex flex-col items-center justify-center gap-2 text-amber-600"
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
                      className="w-full mt-4 py-3 border-2 border-dashed border-amber-200 rounded-lg hover:border-amber-300 hover:bg-amber-50/30 transition-colors flex items-center justify-center gap-2 text-amber-500 hover:text-amber-600"
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

              <Footer language={language} />
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE: Discrete A4 pages - WYSIWYG */}
      {!isEditMode && (
        <div className="flex justify-center relative z-[10]">
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
      )}

      {/* Copyright */}
      <div className="no-print text-center mt-4 text-sm text-[#777]">
        &copy; {new Date().getFullYear()} Marriage Biodata Builder. All rights reserved.
      </div>
    </main>
  );
}

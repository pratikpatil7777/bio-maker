'use client';

import React, { useRef, useEffect, useState } from 'react';
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

const STORAGE_KEY = 'biodata-builder-data';

export default function BiodataBuilder() {
  const searchParams = useSearchParams();
  const biodataRef = useRef<HTMLDivElement>(null);
  const pagedViewRef = useRef<HTMLDivElement>(null);
  const { isDark } = useDarkMode();

  const [language, setLanguage] = useState<Language>('en');
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPhoto, setShowPhoto] = useState(true);
  const [data, setData] = useLocalStorage<DynamicBiodataData>(STORAGE_KEY, createEmptyBiodata());
  const [isClient, setIsClient] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  const currentTheme = getThemeById(data.themeId);
  const currentBorder = getBorderById(data.borderId);

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

  const handleReset = () => {
    if (confirm(language === 'mr'
      ? 'तुम्हाला खात्री आहे का? सर्व डेटा हटवला जाईल.'
      : 'Are you sure you want to reset? All data will be cleared.')) {
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
      {/* Control Panel */}
      <div className="no-print max-w-4xl mx-auto mb-4 px-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <DarkModeToggleCompact />
          <LanguageToggle language={language} onLanguageChange={setLanguage} />
          <ThemeSelector language={language} currentTheme={currentTheme} onThemeChange={handleThemeChange} />
          <BorderSelector language={language} currentBorder={currentBorder} primaryColor={currentTheme.colors.primary} onBorderChange={handleBorderChange} />

          {/* Photo Toggle */}
          <button
            onClick={() => setShowPhoto(!showPhoto)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 cursor-pointer ${
              showPhoto
                ? 'bg-white border border-gray-200 text-[#555] shadow-sm'
                : 'bg-gray-100 text-[#999] border border-gray-200'
            }`}
            title={showPhoto ? 'Hide profile photo' : 'Show profile photo'}
          >
            {showPhoto ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            )}
            <span className="hidden sm:inline">Photo</span>
          </button>

          <DataBackupNew language={language} data={data} onRestore={handleDataRestore} />
          <EditModeToggle
            language={language}
            isEditMode={isEditMode}
            onToggle={setIsEditMode}
            onReset={handleReset}
            hasChanges={hasChanges}
          />

          {/* PDF Export - uses pagedViewRef in view mode */}
          <PDFExportButton
            language={language}
            targetRef={isEditMode ? biodataRef : pagedViewRef}
            fileName={data.name ? data.name.replace(/\s+/g, '_') + '_Biodata' : 'Marriage_Biodata'}
            pageCount={pageCount}
          />
          <ShareButton language={language} targetRef={isEditMode ? biodataRef : pagedViewRef} />
        </div>

        {/* Photo Gallery URL Editor - Edit mode only */}
        {isEditMode && (
          <div className="mt-3 relative flex items-center gap-3 bg-gradient-to-r from-[#FFFEF8] to-[#FFF9E6] rounded-xl px-4 py-2.5 border border-[#E8DFC4] shadow-sm">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] uppercase tracking-wider text-[#998866] font-semibold mb-0.5">
                {isMarathi ? 'फोटो गॅलरी लिंक' : 'Photo Gallery Link'}
              </label>
              <input
                type="url"
                value={data.photoGalleryUrl || ''}
                onChange={(e) => handlePhotoGalleryUpdate('url', e.target.value)}
                placeholder={isMarathi ? 'Google Drive किंवा अल्बम लिंक पेस्ट करा...' : 'Paste Google Drive or album link here...'}
                className="w-full bg-transparent text-xs text-[#333] placeholder-[#AAA] focus:outline-none border-b border-transparent focus:border-[#D4AF37] transition-colors pb-0.5"
              />
            </div>
            {data.photoGalleryUrl && (
              <label className="flex items-center gap-1.5 cursor-pointer">
                <div className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${data.showPhotoGalleryQR ? 'bg-[#D4AF37]' : 'bg-gray-300'}`}>
                  <input
                    type="checkbox"
                    checked={data.showPhotoGalleryQR}
                    onChange={(e) => handlePhotoGalleryUpdate('showQR', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200 ${data.showPhotoGalleryQR ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
                <span className="text-[10px] uppercase tracking-wide font-semibold text-[#777]">QR</span>
              </label>
            )}
          </div>
        )}
      </div>

      {/* EDIT MODE: Continuous scrollable container */}
      {isEditMode && (
        <div
          ref={biodataRef}
          className="biodata-container shadow-xl golden-glow mx-auto"
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
        <div className="flex justify-center">
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

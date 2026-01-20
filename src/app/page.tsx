'use client';

import React, { useRef, useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Language } from '@/lib/translations';
import { BiodataData, defaultData } from '@/lib/defaultData';
import { useLocalStorage, clearLocalStorage } from '@/lib/useLocalStorage';
import { Theme, themes, getThemeById } from '@/lib/themes';
import { BorderDesign, getBorderById } from '@/lib/borders';

import Header from '@/components/Header';
import PhotoSection from '@/components/PhotoSection';
import PersonalDetails from '@/components/PersonalDetails';
import EducationCareerSection from '@/components/EducationCareerSection';
import FamilyDetails from '@/components/FamilyDetails';
import AssetsSection from '@/components/AssetsSection';
import PhotoGallerySection from '@/components/PhotoGallerySection';
import Footer from '@/components/Footer';
import LanguageToggle from '@/components/LanguageToggle';
import EditModeToggle from '@/components/EditModeToggle';
import PDFExportButton from '@/components/PDFExportButton';
import ShareButton from '@/components/ShareButton';
import ThemeSelector from '@/components/ThemeSelector';
import BorderSelector from '@/components/BorderSelector';
import BorderRenderer from '@/components/borders';
import DataBackup from '@/components/DataBackup';

const STORAGE_KEY = 'pratik-biodata-data';
const THEME_STORAGE_KEY = 'pratik-biodata-theme';
const BORDER_STORAGE_KEY = 'pratik-biodata-border';

function BiodataContent() {
  const searchParams = useSearchParams();
  const biodataRef = useRef<HTMLDivElement>(null);

  const [language, setLanguage] = useState<Language>('en');
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPhoto, setShowPhoto] = useState(true);
  const [data, setData] = useLocalStorage<BiodataData>(STORAGE_KEY, defaultData);
  const [themeId, setThemeId] = useLocalStorage<string>(THEME_STORAGE_KEY, 'gold');
  const [borderId, setBorderId] = useLocalStorage<string>(BORDER_STORAGE_KEY, 'classic');
  const [isClient, setIsClient] = useState(false);

  const currentTheme = getThemeById(themeId);
  const currentBorder = getBorderById(borderId);

  const handleThemeChange = (theme: Theme) => {
    setThemeId(theme.id);
  };

  const handleBorderChange = (border: BorderDesign) => {
    setBorderId(border.id);
  };

  const handleDataRestore = (restoredData: BiodataData, restoredThemeId?: string, restoredBorderId?: string) => {
    setData(restoredData);
    if (restoredThemeId) {
      setThemeId(restoredThemeId);
    }
    if (restoredBorderId) {
      setBorderId(restoredBorderId);
    }
  };

  // Handle client-side initialization
  useEffect(() => {
    setIsClient(true);

    // Check for edit mode in URL params
    const editParam = searchParams.get('edit');
    if (editParam === 'true') {
      setIsEditMode(true);
    }
  }, [searchParams]);

  // Update functions for each section
  const updatePersonal = (field: keyof BiodataData['personal'], value: string) => {
    setData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  };

  const updateProfessional = (field: keyof BiodataData['professional'], value: string) => {
    setData((prev) => ({
      ...prev,
      professional: { ...prev.professional, [field]: value },
    }));
  };

  const updateFamily = (field: keyof BiodataData['family'], value: string) => {
    setData((prev) => ({
      ...prev,
      family: { ...prev.family, [field]: value },
    }));
  };

  const updateExtendedFamily = (field: keyof BiodataData['extendedFamily'], value: string) => {
    setData((prev) => ({
      ...prev,
      extendedFamily: { ...prev.extendedFamily, [field]: value },
    }));
  };

  const updateAssets = (field: keyof BiodataData['assets'], value: string) => {
    setData((prev) => ({
      ...prev,
      assets: { ...prev.assets, [field]: value },
    }));
  };

  const updateMainPhoto = (photo: string) => {
    setData((prev) => ({
      ...prev,
      photos: { ...prev.photos, mainPhoto: photo },
    }));
  };

  const updatePhotoGallery = (field: keyof BiodataData['photoGallery'], value: string | boolean) => {
    setData((prev) => ({
      ...prev,
      photoGallery: { ...prev.photoGallery, [field]: value },
    }));
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data to default? This cannot be undone.')) {
      clearLocalStorage(STORAGE_KEY);
      setData(defaultData);
    }
  };

  // Check if data has changed from default
  const hasChanges = JSON.stringify(data) !== JSON.stringify(defaultData);

  // Prevent hydration mismatch by not rendering until client-side
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFEF0]">
        <div className="text-[#D4AF37] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFEF0] py-4 px-2 md:py-8 md:px-4">
      {/* Control Panel - Hidden in print */}
      <div className="no-print max-w-4xl mx-auto mb-4 px-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* Appearance Group */}
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

          {/* Data & Edit */}
          <DataBackup language={language} data={data} themeId={themeId} borderId={borderId} onRestore={handleDataRestore} />
          <EditModeToggle
            language={language}
            isEditMode={isEditMode}
            onToggle={setIsEditMode}
            onReset={handleReset}
            hasChanges={hasChanges}
          />

          {/* Primary Actions */}
          <PDFExportButton language={language} targetRef={biodataRef} />
          <ShareButton language={language} targetRef={biodataRef} />
        </div>

        {/* Photo Gallery URL Editor - Only visible in edit mode */}
        {isEditMode && (
          <div className="relative flex items-center gap-3 bg-gradient-to-r from-[#FFFEF8] to-[#FFF9E6] rounded-xl px-4 py-2.5 border border-[#E8DFC4] shadow-sm">
            {/* Icon */}
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Input with label */}
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] uppercase tracking-wider text-[#998866] font-semibold mb-0.5">
                Photo Gallery Link
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={data.photoGallery?.url || ''}
                  onChange={(e) => updatePhotoGallery('url', e.target.value)}
                  placeholder="Paste Google Drive or album link here..."
                  className="w-full bg-transparent text-xs text-[#333] placeholder-[#AAA] focus:outline-none border-b border-transparent focus:border-[#D4AF37] transition-colors pb-0.5 pr-6"
                />
                {data.photoGallery?.url && (
                  <button
                    onClick={() => updatePhotoGallery('url', '')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-[#999] hover:text-[#800020] hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                    title="Clear link"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {data.photoGallery?.url && (
                <>
                  <button
                    onClick={() => window.open(data.photoGallery.url, '_blank')}
                    className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#D4AF37] hover:text-[#B8860B] border border-[#D4AF37] hover:border-[#B8860B] rounded-md transition-colors cursor-pointer"
                  >
                    Preview
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                  <label className="flex items-center gap-1.5 cursor-pointer group">
                    <div className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${data.photoGallery?.showQR ? 'bg-[#D4AF37]' : 'bg-gray-300'}`}>
                      <input
                        type="checkbox"
                        checked={data.photoGallery?.showQR ?? true}
                        onChange={(e) => updatePhotoGallery('showQR', e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200 ${data.photoGallery?.showQR ? 'translate-x-4' : 'translate-x-0'}`}
                      />
                    </div>
                    <span className="text-[10px] uppercase tracking-wide font-semibold text-[#777] group-hover:text-[#555]">QR</span>
                  </label>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Biodata Container */}
      <div
        ref={biodataRef}
        className="biodata-container shadow-xl golden-glow relative"
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
        {/* Dynamic Border */}
        <BorderRenderer
          borderId={currentBorder.id}
          primaryColor={currentTheme.colors.primary}
          secondaryColor={currentTheme.colors.secondary}
        />
        <div className="biodata-inner-content">
          {/* Header with Krishna Icon and Name */}
          <Header
            language={language}
            name={data.personal.name}
            nameMarathi={data.personal.nameMarathi}
          />

          {/* Photo and Personal Details Row */}
          <div className="relative mt-2">
            {/* Photo - Absolute positioned (conditionally rendered) */}
            {showPhoto && (
              <div className="absolute right-0 top-0 z-10">
                <PhotoSection
                  mainPhoto={data.photos.mainPhoto}
                  isEditMode={isEditMode}
                  onPhotoChange={updateMainPhoto}
                  primaryColor={currentTheme.colors.primary}
                  secondaryColor={currentTheme.colors.secondary}
                  backgroundColor={currentTheme.colors.background}
                />
              </div>
            )}

            {/* Personal Details - adjust padding based on photo visibility */}
            <div className={showPhoto ? 'pr-44 md:pr-48' : ''}>
              <PersonalDetails
                language={language}
                data={data.personal}
                isEditMode={isEditMode}
                onUpdate={updatePersonal}
              />
            </div>
          </div>

          {/* Education & Career Section (Combined) */}
          <EducationCareerSection
            language={language}
            educationData={data.education}
            professionalData={data.professional}
            isEditMode={isEditMode}
            onUpdateProfessional={updateProfessional}
          />

          {/* Family Details (includes Siblings, Extended Family, and Maternal) */}
          <FamilyDetails
            language={language}
            familyData={data.family}
            siblingsData={data.siblings}
            extendedFamilyData={data.extendedFamily}
            maternalData={data.maternal}
            isEditMode={isEditMode}
            onUpdateFamily={updateFamily}
            onUpdateExtendedFamily={updateExtendedFamily}
          />

          {/* Family Assets */}
          <AssetsSection
            language={language}
            data={data.assets}
            isEditMode={isEditMode}
            onUpdate={updateAssets}
          />

          {/* Photo Gallery Link */}
          <PhotoGallerySection
            language={language}
            data={data.photoGallery}
            isEditMode={isEditMode}
            onUpdate={updatePhotoGallery}
          />

          {/* Footer */}
          <Footer language={language} />
        </div>
      </div>

      {/* Copyright - Hidden in print */}
      <div className="no-print text-center mt-4 text-sm text-[#777]">
        &copy; {new Date().getFullYear()} Pratik Ravindra Patil. All rights reserved.
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FFFEF0]">
        <div className="text-[#D4AF37] text-xl">Loading...</div>
      </div>
    }>
      <BiodataContent />
    </Suspense>
  );
}

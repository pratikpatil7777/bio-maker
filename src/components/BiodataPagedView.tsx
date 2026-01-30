'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { DynamicBiodataData, BiodataSection, Language } from '@/lib/types';
import { Theme } from '@/lib/themes';
import { BorderDesign } from '@/lib/borders';
import { A4_HEIGHT_PX, PAGE_PADDING, distributeContent, ContentBlock } from '@/lib/pageLayout';
import { getTitleById, getAttributeById } from '@/lib/collections';

import BiodataPage from './BiodataPage';
import Header from './Header';
import PhotoSection from './PhotoSection';
import PhotoGallerySection from './PhotoGallerySection';
import Footer from './Footer';

interface BiodataPagedViewProps {
  data: DynamicBiodataData;
  language: Language;
  theme: Theme;
  border: BorderDesign;
  showPhoto: boolean;
  pagesRef?: React.RefObject<HTMLDivElement | null>;
  onPageCountChange?: (count: number) => void;
}

/**
 * BiodataPagedView - Renders biodata across discrete A4 pages
 *
 * This component ensures WYSIWYG: each page is exactly 210mm × 297mm
 * with its own border, matching exactly what the PDF will look like.
 */
export default function BiodataPagedView({
  data,
  language,
  theme,
  border,
  showPhoto,
  pagesRef,
  onPageCountChange,
}: BiodataPagedViewProps) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [pageAssignments, setPageAssignments] = useState<{ pageNumber: number; sectionIndices: number[]; includePhotoGallery: boolean; includeFooter: boolean }[]>([]);
  const [measured, setMeasured] = useState(false);

  const isMarathi = language === 'mr';
  const isHindi = language === 'hi';

  // Usable height for content on each page
  const HEADER_HEIGHT = 85; // Header with icon and name
  const PHOTO_HEIGHT = showPhoto ? 180 : 0; // Photo section height
  const FOOTER_HEIGHT = 50; // Footer height
  const PAGE_NUMBER_HEIGHT = 25;
  const PHOTO_GALLERY_HEIGHT = 80;

  // Calculate usable content area per page
  const firstPageUsableHeight = A4_HEIGHT_PX - PAGE_PADDING.top - PAGE_PADDING.bottom - HEADER_HEIGHT;
  const otherPageUsableHeight = A4_HEIGHT_PX - PAGE_PADDING.top - PAGE_PADDING.bottom - PAGE_NUMBER_HEIGHT;

  // Measure and distribute content
  useEffect(() => {
    if (!measureRef.current) return;

    // Give DOM time to render
    const measureTimer = setTimeout(() => {
      if (!measureRef.current) return;

      const blocks: { height: number; sectionIndex: number }[] = [];

      // Measure each section
      const sectionElements = measureRef.current.querySelectorAll('[data-section-index]');
      sectionElements.forEach((el) => {
        const sectionIndex = parseInt(el.getAttribute('data-section-index') || '0', 10);
        blocks.push({
          height: (el as HTMLElement).offsetHeight,
          sectionIndex,
        });
      });

      // Distribute sections across pages
      const pages: { pageNumber: number; sectionIndices: number[]; usedHeight: number; includePhotoGallery: boolean; includeFooter: boolean }[] = [];

      let currentPage = {
        pageNumber: 1,
        sectionIndices: [] as number[],
        usedHeight: PHOTO_HEIGHT, // First page starts with photo area reserved
        includePhotoGallery: false,
        includeFooter: false,
      };

      // Available height for first page (accounting for photo)
      let availableHeight = firstPageUsableHeight - PHOTO_HEIGHT;

      for (const block of blocks) {
        if (block.height <= availableHeight - currentPage.usedHeight + PHOTO_HEIGHT) {
          // Section fits on current page
          currentPage.sectionIndices.push(block.sectionIndex);
          currentPage.usedHeight += block.height;
        } else {
          // Section doesn't fit, start new page
          pages.push({ ...currentPage });

          currentPage = {
            pageNumber: pages.length + 1,
            sectionIndices: [block.sectionIndex],
            usedHeight: block.height,
            includePhotoGallery: false,
            includeFooter: false,
          };
          availableHeight = otherPageUsableHeight;
        }
      }

      // Add photo gallery and footer to last page
      const photoGalleryHeight = data.photoGalleryUrl && data.showPhotoGalleryQR ? PHOTO_GALLERY_HEIGHT : 0;
      const remainingOnCurrentPage = (currentPage.pageNumber === 1 ? firstPageUsableHeight : otherPageUsableHeight) - currentPage.usedHeight;

      if (photoGalleryHeight + FOOTER_HEIGHT <= remainingOnCurrentPage) {
        currentPage.includePhotoGallery = photoGalleryHeight > 0;
        currentPage.includeFooter = true;
        pages.push(currentPage);
      } else if (FOOTER_HEIGHT <= remainingOnCurrentPage) {
        currentPage.includeFooter = true;
        pages.push(currentPage);

        // Photo gallery on new page if needed
        if (photoGalleryHeight > 0) {
          pages.push({
            pageNumber: pages.length + 1,
            sectionIndices: [],
            usedHeight: photoGalleryHeight,
            includePhotoGallery: true,
            includeFooter: false,
          });
        }
      } else {
        pages.push(currentPage);

        // New page for photo gallery and/or footer
        pages.push({
          pageNumber: pages.length + 1,
          sectionIndices: [],
          usedHeight: photoGalleryHeight + FOOTER_HEIGHT,
          includePhotoGallery: photoGalleryHeight > 0,
          includeFooter: true,
        });
      }

      setPageAssignments(pages);
      setMeasured(true);

      if (onPageCountChange) {
        onPageCountChange(pages.length);
      }
    }, 100);

    return () => clearTimeout(measureTimer);
  }, [data, language, showPhoto, firstPageUsableHeight, otherPageUsableHeight, onPageCountChange, PHOTO_HEIGHT]);

  // Render a section
  const renderSection = (section: BiodataSection, index: number) => {
    const title = getTitleById(section.titleId);
    const displayTitle = section.customTitle || (isMarathi ? title?.labelMarathi : title?.label) || 'Section';

    return (
      <div key={section.id} className="section-compact" data-section-index={index}>
        <h3 className="section-title" style={{ color: theme.colors.headerText }}>
          {displayTitle}
        </h3>
        <div className="space-y-0.5">
          {section.attributes.map((attr) => {
            // Get proper label from collection, fallback to custom label or attributeId
            const attrOption = getAttributeById(attr.attributeId);
            const displayLabel =
              (isHindi && attr.customLabelHindi) ? attr.customLabelHindi
              : (isMarathi && attr.customLabelMarathi) ? attr.customLabelMarathi
              : attr.customLabel ? attr.customLabel
              : isHindi ? (attrOption?.labelHindi || attrOption?.label)
              : isMarathi ? (attrOption?.labelMarathi || attrOption?.label)
              : attrOption?.label
              || attr.attributeId;
            const displayValue = isHindi
              ? (attr.valueHindi || attr.value)
              : isMarathi
                ? (attr.valueMarathi || attr.value)
                : attr.value;

            if (!displayValue) return null;

            return (
              <div key={attr.id} className="flex text-sm">
                <span
                  className="row-label font-medium"
                  style={{ color: theme.colors.text }}
                >
                  {displayLabel}
                </span>
                <span className="mx-2" style={{ color: theme.colors.primary }}>:</span>
                <span style={{ color: theme.colors.text }}>{displayValue}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // If not measured yet, show hidden measurement container
  if (!measured) {
    return (
      <>
        {/* Hidden measurement container */}
        <div
          ref={measureRef}
          style={{
            position: 'absolute',
            left: '-9999px',
            top: 0,
            width: '210mm',
            padding: `${PAGE_PADDING.top}px ${PAGE_PADDING.right}px`,
            visibility: 'hidden',
          }}
        >
          {data.sections.map((section, index) => renderSection(section, index))}
        </div>

        {/* Loading placeholder */}
        <div
          style={{
            width: '210mm',
            height: '297mm',
            backgroundColor: theme.colors.background,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: theme.colors.textMuted }}>
            {isMarathi ? 'पृष्ठ तयार करत आहे...' : 'Preparing pages...'}
          </span>
        </div>
      </>
    );
  }

  const totalPages = pageAssignments.length;

  return (
    <div ref={pagesRef} className="biodata-pages-container flex flex-col gap-8">
      {pageAssignments.map((page, pageIdx) => (
        <BiodataPage
          key={page.pageNumber}
          pageNumber={page.pageNumber}
          totalPages={totalPages}
          theme={theme}
          border={border}
          language={language}
        >
          {/* First page has header and photo */}
          {page.pageNumber === 1 && (
            <>
              <Header
                language={language}
                name={data.name}
                nameMarathi={data.nameMarathi}
                nameHindi={data.nameHindi}
              />

              <div className="relative" style={{ marginTop: '8px' }}>
                {/* Photo - Absolute positioned on first page */}
                {showPhoto && (
                  <div className="absolute right-0 top-0 z-10">
                    <PhotoSection
                      mainPhoto={data.photo}
                      isEditMode={false}
                      onPhotoChange={() => {}}
                      primaryColor={theme.colors.primary}
                      secondaryColor={theme.colors.secondary}
                      backgroundColor={theme.colors.background}
                    />
                  </div>
                )}

                {/* Sections for this page */}
                <div className={showPhoto ? 'pr-48' : ''}>
                  {page.sectionIndices.map((sectionIndex) =>
                    renderSection(data.sections[sectionIndex], sectionIndex)
                  )}
                </div>
              </div>
            </>
          )}

          {/* Other pages - just sections */}
          {page.pageNumber > 1 && (
            <div>
              {page.sectionIndices.map((sectionIndex) =>
                renderSection(data.sections[sectionIndex], sectionIndex)
              )}
            </div>
          )}

          {/* Photo Gallery */}
          {page.includePhotoGallery && data.photoGalleryUrl && (
            <PhotoGallerySection
              language={language}
              data={{ url: data.photoGalleryUrl, showQR: data.showPhotoGalleryQR }}
              isEditMode={false}
              onUpdate={() => {}}
            />
          )}

          {/* Footer */}
          {page.includeFooter && (
            <div style={{ marginTop: 'auto' }}>
              <Footer language={language} />
            </div>
          )}
        </BiodataPage>
      ))}
    </div>
  );
}

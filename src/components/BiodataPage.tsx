'use client';

import React from 'react';
import { Theme } from '@/lib/themes';
import { BorderDesign } from '@/lib/borders';
import { Language } from '@/lib/translations';
import BorderRenderer from './borders';

interface BiodataPageProps {
  pageNumber: number;
  totalPages: number;
  theme: Theme;
  border: BorderDesign;
  children: React.ReactNode;
  language: Language;
}

/**
 * BiodataPage - Renders a single A4 page (210mm × 297mm) with border
 *
 * This component ensures WYSIWYG: what you see on website = what you get in PDF
 * Each page is exactly A4 dimensions with its own decorative border.
 */
export default function BiodataPage({
  pageNumber,
  totalPages,
  theme,
  border,
  children,
  language,
}: BiodataPageProps) {

  return (
    <div
      className="biodata-page"
      data-page={pageNumber}
      style={{
        width: '210mm',
        height: '297mm',
        backgroundColor: theme.colors.background,
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden',
        // CSS variables for theme
        '--theme-primary': theme.colors.primary,
        '--theme-primary-dark': theme.colors.primaryDark,
        '--theme-secondary': theme.colors.secondary,
        '--theme-background': theme.colors.background,
        '--theme-background-alt': theme.colors.backgroundAlt,
        '--theme-text': theme.colors.text,
        '--theme-text-muted': theme.colors.textMuted,
        '--theme-border': theme.colors.border,
        '--theme-header-text': theme.colors.headerText,
      } as React.CSSProperties}
    >
      {/* Border - Each page has its own border */}
      <BorderRenderer
        borderId={border.id}
        primaryColor={theme.colors.primary}
        secondaryColor={theme.colors.secondary}
      />

      {/* Content Area */}
      <div
        className="biodata-page-content"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
          padding: '15px 37px 10px 37px',
          boxSizing: 'border-box',
        }}
      >
        {children}
      </div>
    </div>
  );
}

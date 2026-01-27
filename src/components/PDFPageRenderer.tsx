'use client';

import React, { forwardRef } from 'react';
import { Theme } from '@/lib/themes';
import { BorderDesign } from '@/lib/borders';
import BorderRenderer from './borders';
import { A4_WIDTH_PX, A4_HEIGHT_PX } from '@/lib/pageLayout';

interface PDFPageRendererProps {
  pageNumber: number;
  totalPages: number;
  isFirstPage: boolean;
  theme: Theme;
  border: BorderDesign;
  children: React.ReactNode;
  language: 'en' | 'mr';
}

/**
 * Renders a single A4 page for PDF export with:
 * - Consistent border on each page
 * - Page number (except on first page with header)
 * - Content area that fills the remaining space
 */
const PDFPageRenderer = forwardRef<HTMLDivElement, PDFPageRendererProps>(
  ({ pageNumber, totalPages, isFirstPage, theme, border, children, language }, ref) => {
    const isMarathi = language === 'mr';

    return (
      <div
        ref={ref}
        className="pdf-page"
        style={{
          width: `${A4_WIDTH_PX}px`,
          height: `${A4_HEIGHT_PX}px`,
          backgroundColor: theme.colors.background,
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box',
          pageBreakAfter: 'always',
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
        {/* Border - Renders on every page */}
        <BorderRenderer
          borderId={border.id}
          primaryColor={theme.colors.primary}
          secondaryColor={theme.colors.secondary}
        />

        {/* Content Area */}
        <div
          className="pdf-page-content"
          style={{
            position: 'relative',
            zIndex: 10,
            padding: '10px 37px',
            height: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Main Content */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {children}
          </div>

          {/* Page Number - Only show on pages after the first */}
          {!isFirstPage && totalPages > 1 && (
            <div
              style={{
                textAlign: 'center',
                fontSize: '10px',
                color: theme.colors.textMuted,
                paddingTop: '8px',
                borderTop: `1px solid ${theme.colors.primary}33`,
                marginTop: 'auto',
              }}
            >
              {isMarathi ? `पृष्ठ ${pageNumber} / ${totalPages}` : `Page ${pageNumber} of ${totalPages}`}
            </div>
          )}
        </div>
      </div>
    );
  }
);

PDFPageRenderer.displayName = 'PDFPageRenderer';

export default PDFPageRenderer;

/**
 * Container for rendering multiple PDF pages (used during export)
 */
export function PDFPagesContainer({
  children,
  visible = false,
}: {
  children: React.ReactNode;
  visible?: boolean;
}) {
  return (
    <div
      className="pdf-pages-container"
      style={{
        position: visible ? 'relative' : 'fixed',
        left: visible ? 0 : '-9999px',
        top: visible ? 0 : '-9999px',
        width: `${A4_WIDTH_PX}px`,
        backgroundColor: '#fff',
        zIndex: visible ? 1 : -1,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {children}
    </div>
  );
}

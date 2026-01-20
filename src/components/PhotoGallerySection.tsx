'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { translations, Language } from '@/lib/translations';
import { BiodataData } from '@/lib/defaultData';
import EditableField from './EditableField';

interface PhotoGallerySectionProps {
  language: Language;
  data: BiodataData['photoGallery'];
  isEditMode: boolean;
  onUpdate: (field: keyof BiodataData['photoGallery'], value: string | boolean) => void;
}

// Helper function to truncate URL for display
function truncateUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const host = urlObj.host.replace('www.', '');

    if (url.includes('drive.google.com')) {
      return `${host}/...`;
    }

    // For other URLs, show host + truncated path
    const path = urlObj.pathname;
    if (path.length > 20) {
      return `${host}/...${path.slice(-15)}`;
    }
    return `${host}${path}`;
  } catch {
    // If URL parsing fails, just truncate
    if (url.length > 40) {
      return url.slice(0, 25) + '...' + url.slice(-10);
    }
    return url;
  }
}

// Helper function to validate URL
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export default function PhotoGallerySection({
  language,
  data,
  isEditMode,
  onUpdate,
}: PhotoGallerySectionProps) {
  const t = translations[language];
  const isMarathi = language === 'mr';

  // Handle undefined data (for existing localStorage without this field)
  const safeData = data || { url: '', showQR: true };

  const hasValidUrl = safeData.url && isValidUrl(safeData.url);

  // In edit mode, don't render inside biodata (controls moved to control panel)
  // In display mode, only render if there's a valid URL
  if (isEditMode || !hasValidUrl) return null;

  return (
    <section style={{ marginTop: '24px' }}>
      {/* Divider line */}
      <div
        style={{
          borderTop: '1px dashed var(--theme-primary, #D4AF37)',
          marginBottom: '12px'
        }}
      />
      {/* Compact horizontal layout - Display mode only */}
      <div className="flex items-center justify-center gap-3">
        {/* QR Code - Left side */}
        {safeData.showQR && (
          <div className="flex-shrink-0">
            <QRCodeSVG
              value={safeData.url}
              size={55}
              level="M"
              bgColor="transparent"
              fgColor="#333333"
            />
          </div>
        )}

        {/* Content - Right side */}
        <div>
          <a
            href={safeData.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              color: '#800020',
              fontSize: '12px',
              fontWeight: '600',
              display: 'inline-block',
              padding: '6px 8px 2px 8px',
              margin: '-6px -8px -2px -8px',
            }}
          >
            {isMarathi ? 'फोटो गॅलरी' : 'Photo Gallery'}
            <span style={{ marginLeft: '4px', fontSize: '13px' }}>&#8599;</span>
          </a>
          {safeData.showQR && (
            <p style={{ fontSize: '9px', color: '#555', marginTop: '3px' }}>
              {isMarathi ? 'QR स्कॅन करा' : 'Scan QR Code'}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

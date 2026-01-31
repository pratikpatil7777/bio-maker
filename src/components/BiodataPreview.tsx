'use client';

import React from 'react';
import { Language } from '@/lib/types';
import { Theme } from '@/lib/themes';
import { BorderDesign } from '@/lib/borders';
import BorderRenderer from './borders';

interface BiodataPreviewProps {
  theme: Theme;
  border: BorderDesign;
  language: Language;
}

/**
 * BiodataPreview - A scaled-down preview of a biodata page
 * Used in the EmptyState landing page to show theme/border selection in real-time
 */
export default function BiodataPreview({
  theme,
  border,
  language,
}: BiodataPreviewProps) {
  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';
  const isDevanagari = isHindi || isMarathi;

  // Sample data for preview
  const sampleName = isMarathi
    ? 'श्री रमेश कुमार शर्मा'
    : isHindi
    ? 'श्री रमेश कुमार शर्मा'
    : 'Shri Ramesh Kumar Sharma';

  const getText = (en: string, hi: string, mr: string) => {
    if (isHindi) return hi;
    if (isMarathi) return mr;
    return en;
  };

  return (
    <div
      className="biodata-preview relative"
      style={{
        width: '210mm',
        height: '297mm',
        backgroundColor: theme.colors.background,
        boxSizing: 'border-box',
        overflow: 'hidden',
        transform: 'scale(var(--preview-scale, 0.3))',
        transformOrigin: 'top left',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
      }}
    >
      {/* Border */}
      <BorderRenderer
        borderId={border.id}
        primaryColor={theme.colors.primary}
        secondaryColor={theme.colors.secondary}
      />

      {/* Content Area */}
      <div
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
        {/* Header with Om Symbol */}
        <div className="text-center mb-4">
          <div
            className="inline-block text-5xl mb-1"
            style={{ color: theme.colors.primary }}
          >
            ॐ
          </div>
          <div
            className="text-xl font-semibold"
            style={{
              color: theme.colors.secondary,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            || श्री गणेशाय नमः ||
          </div>
        </div>

        {/* Shubh Vivah Title */}
        <div className="text-center mb-4">
          <h1
            className="text-3xl font-bold"
            style={{
              color: theme.colors.secondary,
              fontFamily: isDevanagari ? "'Noto Sans Devanagari', sans-serif" : "'Playfair Display', serif",
            }}
          >
            {getText('MARRIAGE BIODATA', 'विवाह बायोडाटा', 'विवाह बायोडाटा')}
          </h1>
        </div>

        {/* Photo Placeholder */}
        <div className="flex justify-center mb-4">
          <div
            className="flex items-center justify-center"
            style={{
              width: 140,
              height: 175,
              border: `3px solid ${theme.colors.primary}`,
              backgroundColor: theme.colors.backgroundAlt || '#f5f5f5',
            }}
          >
            <svg
              className="w-12 h-12"
              fill={theme.colors.primary}
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>

        {/* Name */}
        <div className="text-center mb-6">
          <h2
            className="text-2xl font-bold"
            style={{
              color: theme.colors.text,
              fontFamily: isDevanagari ? "'Noto Sans Devanagari', sans-serif" : "'Playfair Display', serif",
            }}
          >
            {sampleName}
          </h2>
        </div>

        {/* Sample Section - Personal Details */}
        <div className="mb-4">
          <div
            className="flex items-center gap-2 pb-2 mb-3"
            style={{ borderBottom: `2px solid ${theme.colors.primary}` }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: theme.colors.secondary }}
            />
            <h3
              className="text-lg font-semibold"
              style={{
                color: theme.colors.headerText || theme.colors.primary,
                fontFamily: isDevanagari ? "'Noto Sans Devanagari', sans-serif" : "'Poppins', sans-serif",
              }}
            >
              {getText('Personal Details', 'व्यक्तिगत विवरण', 'वैयक्तिक तपशील')}
            </h3>
          </div>

          {/* Sample Attributes */}
          <div className="space-y-2">
            {[
              { key: getText('Date of Birth', 'जन्म तिथि', 'जन्म तारीख'), value: getText('15 August 1995', '१५ अगस्त १९९५', '१५ ऑगस्ट १९९५') },
              { key: getText('Height', 'ऊंचाई', 'उंची'), value: getText('5 feet 10 inches', '५ फुट १० इंच', '५ फूट १० इंच') },
              { key: getText('Place of Birth', 'जन्म स्थान', 'जन्म स्थान'), value: getText('Pune, Maharashtra', 'पुणे, महाराष्ट्र', 'पुणे, महाराष्ट्र') },
            ].map((item, index) => (
              <div key={index} className="flex">
                <div
                  className="w-1/3 text-sm font-medium"
                  style={{
                    color: theme.colors.textMuted,
                    fontFamily: isDevanagari ? "'Noto Sans Devanagari', sans-serif" : "'Poppins', sans-serif",
                  }}
                >
                  {item.key}
                </div>
                <div
                  className="w-2/3 text-sm"
                  style={{
                    color: theme.colors.text,
                    fontFamily: isDevanagari ? "'Noto Sans Devanagari', sans-serif" : "'Poppins', sans-serif",
                  }}
                >
                  : {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Section - Education */}
        <div className="mb-4">
          <div
            className="flex items-center gap-2 pb-2 mb-3"
            style={{ borderBottom: `2px solid ${theme.colors.primary}` }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: theme.colors.secondary }}
            />
            <h3
              className="text-lg font-semibold"
              style={{
                color: theme.colors.headerText || theme.colors.primary,
                fontFamily: isDevanagari ? "'Noto Sans Devanagari', sans-serif" : "'Poppins', sans-serif",
              }}
            >
              {getText('Education & Career', 'शिक्षा और करियर', 'शिक्षण आणि करिअर')}
            </h3>
          </div>

          <div className="space-y-2">
            {[
              { key: getText('Education', 'शिक्षा', 'शिक्षण'), value: getText('B.Tech - IIT Bombay', 'बी.टेक - आईआईटी बॉम्बे', 'बी.टेक - आयआयटी मुंबई') },
              { key: getText('Occupation', 'व्यवसाय', 'व्यवसाय'), value: getText('Senior Manager', 'वरिष्ठ प्रबंधक', 'वरिष्ठ व्यवस्थापक') },
            ].map((item, index) => (
              <div key={index} className="flex">
                <div
                  className="w-1/3 text-sm font-medium"
                  style={{
                    color: theme.colors.textMuted,
                    fontFamily: isDevanagari ? "'Noto Sans Devanagari', sans-serif" : "'Poppins', sans-serif",
                  }}
                >
                  {item.key}
                </div>
                <div
                  className="w-2/3 text-sm"
                  style={{
                    color: theme.colors.text,
                    fontFamily: isDevanagari ? "'Noto Sans Devanagari', sans-serif" : "'Poppins', sans-serif",
                  }}
                >
                  : {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Section - Family Details */}
        <div className="mb-4">
          <div
            className="flex items-center gap-2 pb-2 mb-3"
            style={{ borderBottom: `2px solid ${theme.colors.primary}` }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: theme.colors.secondary }}
            />
            <h3
              className="text-lg font-semibold"
              style={{
                color: theme.colors.headerText || theme.colors.primary,
                fontFamily: isDevanagari ? "'Noto Sans Devanagari', sans-serif" : "'Poppins', sans-serif",
              }}
            >
              {getText('Family Details', 'पारिवारिक विवरण', 'कौटुंबिक तपशील')}
            </h3>
          </div>

          <div className="space-y-2">
            {[
              { key: getText('Father Name', 'पिता का नाम', 'वडिलांचे नाव'), value: getText('Mr. Suresh Sharma', 'श्री सुरेश शर्मा', 'श्री सुरेश शर्मा') },
              { key: getText('Mother Name', 'माता का नाम', 'आईचे नाव'), value: getText('Mrs. Sunita Sharma', 'श्रीमती सुनीता शर्मा', 'श्रीमती सुनीता शर्मा') },
            ].map((item, index) => (
              <div key={index} className="flex">
                <div
                  className="w-1/3 text-sm font-medium"
                  style={{
                    color: theme.colors.textMuted,
                    fontFamily: isDevanagari ? "'Noto Sans Devanagari', sans-serif" : "'Poppins', sans-serif",
                  }}
                >
                  {item.key}
                </div>
                <div
                  className="w-2/3 text-sm"
                  style={{
                    color: theme.colors.text,
                    fontFamily: isDevanagari ? "'Noto Sans Devanagari', sans-serif" : "'Poppins', sans-serif",
                  }}
                >
                  : {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

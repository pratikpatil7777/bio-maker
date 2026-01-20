'use client';

import React from 'react';
import { translations, Language } from '@/lib/translations';
import { BiodataData } from '@/lib/defaultData';
import EditableField from './EditableField';

interface ExtendedFamilyProps {
  language: Language;
  data: BiodataData['extendedFamily'];
  isEditMode: boolean;
  onUpdate: (field: keyof BiodataData['extendedFamily'], value: string) => void;
}

export default function ExtendedFamily({
  language,
  data,
  isEditMode,
  onUpdate,
}: ExtendedFamilyProps) {
  const t = translations[language];
  const isMarathi = language === 'mr';

  const uncleName = isMarathi ? data.uncleNameMarathi || data.uncleName : data.uncleName;
  const uncleLocation = isMarathi ? data.uncleLocationMarathi || data.uncleLocation : data.uncleLocation;

  if (!isEditMode && !uncleName) return null;

  return (
    <section className="mb-6">
      <h3 className="section-title">{t.extendedFamily}</h3>

      <div className="flex flex-wrap">
        <span
          className={`font-medium text-[#555] min-w-[140px] ${isMarathi ? 'marathi-text' : ''}`}
          style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
        >
          {t.uncleName}:
        </span>
        <div className="flex-1">
          <EditableField
            value={uncleName}
            isEditMode={isEditMode}
            onChange={(val) => onUpdate(isMarathi ? 'uncleNameMarathi' : 'uncleName', val)}
            isMarathi={isMarathi}
            className="text-[#333]"
          />
          {uncleLocation && (
            <span
              className={`text-[#555] ${isMarathi ? 'marathi-text' : ''}`}
              style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
            >
              , {uncleLocation}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

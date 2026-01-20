'use client';

import React from 'react';
import { translations, Language } from '@/lib/translations';
import { BiodataData } from '@/lib/defaultData';
import EditableField from './EditableField';

interface ContactDetailsProps {
  language: Language;
  data: BiodataData['contact'];
  isEditMode: boolean;
  onUpdate: (field: keyof BiodataData['contact'], value: string) => void;
}

export default function ContactDetails({
  language,
  data,
  isEditMode,
  onUpdate,
}: ContactDetailsProps) {
  const t = translations[language];
  const isMarathi = language === 'mr';

  const currentResidence = isMarathi
    ? data.currentResidenceMarathi || data.currentResidence
    : data.currentResidence;

  return (
    <section className="mb-6">
      <h3 className="section-title">{t.contactDetails}</h3>

      <div className="grid grid-cols-1 gap-y-2">
        {(isEditMode || data.fatherMobile) && (
          <div className="flex flex-wrap">
            <span
              className={`font-medium text-[#555] min-w-[140px] ${isMarathi ? 'marathi-text' : ''}`}
              style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
            >
              {t.mobile}:
            </span>
            <EditableField
              value={data.fatherMobile}
              isEditMode={isEditMode}
              onChange={(val) => onUpdate('fatherMobile', val)}
              placeholder={isEditMode ? 'Enter mobile number' : ''}
              className="text-[#333]"
            />
          </div>
        )}

        {(isEditMode || data.email) && (
          <div className="flex flex-wrap">
            <span
              className={`font-medium text-[#555] min-w-[140px] ${isMarathi ? 'marathi-text' : ''}`}
              style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
            >
              {t.email}:
            </span>
            <EditableField
              value={data.email}
              isEditMode={isEditMode}
              onChange={(val) => onUpdate('email', val)}
              placeholder={isEditMode ? 'Enter email address' : ''}
              className="text-[#333]"
            />
          </div>
        )}

        {(isEditMode || currentResidence) && (
          <div className="flex flex-wrap">
            <span
              className={`font-medium text-[#555] min-w-[140px] ${isMarathi ? 'marathi-text' : ''}`}
              style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
            >
              {t.currentResidence}:
            </span>
            <EditableField
              value={currentResidence}
              isEditMode={isEditMode}
              onChange={(val) =>
                onUpdate(isMarathi ? 'currentResidenceMarathi' : 'currentResidence', val)
              }
              isMarathi={isMarathi}
              placeholder={isEditMode ? 'Enter current residence' : ''}
              className="text-[#333] flex-1"
            />
          </div>
        )}
      </div>
    </section>
  );
}

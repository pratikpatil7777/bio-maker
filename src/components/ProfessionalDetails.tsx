'use client';

import React from 'react';
import { translations, Language } from '@/lib/translations';
import { BiodataData } from '@/lib/defaultData';
import EditableField from './EditableField';

interface ProfessionalDetailsProps {
  language: Language;
  data: BiodataData['professional'];
  isEditMode: boolean;
  onUpdate: (field: keyof BiodataData['professional'], value: string) => void;
}

export default function ProfessionalDetails({
  language,
  data,
  isEditMode,
  onUpdate,
}: ProfessionalDetailsProps) {
  const t = translations[language];
  const isMarathi = language === 'mr';

  const getValue = (enField: keyof BiodataData['professional'], mrField: keyof BiodataData['professional']) => {
    return isMarathi ? data[mrField] || data[enField] : data[enField];
  };

  const getField = (enField: keyof BiodataData['professional'], mrField: keyof BiodataData['professional']) => {
    return isMarathi ? mrField : enField;
  };

  const fields = [
    { label: t.occupation, enField: 'occupation' as const, mrField: 'occupationMarathi' as const },
    { label: t.visaStatus, enField: 'visaStatus' as const, mrField: 'visaStatusMarathi' as const },
    { label: t.annualIncome, enField: 'annualIncome' as const, mrField: 'annualIncomeMarathi' as const },
  ];

  return (
    <section className="mb-4">
      <h3 className="section-title">{t.professionalDetails}</h3>

      <div className="grid grid-cols-1 gap-y-0">
        {fields.map((field) => {
          const value = getValue(field.enField, field.mrField);
          const shouldShow = isEditMode || value;

          if (!shouldShow) return null;

          return (
            <div key={field.enField} className="flex items-start">
              <span
                className={`font-medium text-[#555] w-[190px] shrink-0 ${isMarathi ? 'marathi-text' : ''}`}
                style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
              >
                {field.label}
              </span>
              <span className="w-[20px] shrink-0 text-center text-[#555]">:</span>
              <EditableField
                value={getValue(field.enField, field.mrField)}
                isEditMode={isEditMode}
                onChange={(val) => onUpdate(getField(field.enField, field.mrField), val)}
                isMarathi={isMarathi}
                placeholder={isEditMode ? `Enter ${field.label.toLowerCase()}` : ''}
                className="text-[#333] flex-1"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { translations, Language } from '@/lib/translations';
import { BiodataData } from '@/lib/defaultData';
import EditableField from './EditableField';

interface EducationCareerSectionProps {
  language: Language;
  educationData: BiodataData['education'];
  professionalData: BiodataData['professional'];
  isEditMode: boolean;
  onUpdateProfessional: (field: keyof BiodataData['professional'], value: string) => void;
}

export default function EducationCareerSection({
  language,
  educationData,
  professionalData,
  isEditMode,
  onUpdateProfessional,
}: EducationCareerSectionProps) {
  const t = translations[language];
  const isMarathi = language === 'mr';

  const getProfValue = (enField: keyof BiodataData['professional'], mrField: keyof BiodataData['professional']) => {
    return isMarathi ? professionalData[mrField] || professionalData[enField] : professionalData[enField];
  };

  const getProfField = (enField: keyof BiodataData['professional'], mrField: keyof BiodataData['professional']) => {
    return isMarathi ? mrField : enField;
  };

  const professionalFields = [
    { label: t.occupation, enField: 'occupation' as const, mrField: 'occupationMarathi' as const },
    { label: t.visaStatus, enField: 'visaStatus' as const, mrField: 'visaStatusMarathi' as const },
    { label: t.annualIncome, enField: 'annualIncome' as const, mrField: 'annualIncomeMarathi' as const },
  ];

  return (
    <section className="mb-4">
      <h3 className="section-title">{t.educationAndCareer}</h3>

      <div className="grid grid-cols-1 gap-y-0">
        {/* Education entries */}
        {educationData.map((edu, index) => {
          const degree = isMarathi ? edu.degreeMarathi || edu.degree : edu.degree;
          const institution = isMarathi ? edu.institutionMarathi || edu.institution : edu.institution;

          return (
            <div key={index} className="flex items-start">
              <span
                className={`font-medium text-[#555] w-[190px] shrink-0 ${isMarathi ? 'marathi-text' : ''}`}
                style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
              >
                {degree}
              </span>
              <span className="w-[20px] shrink-0 text-center text-[#555]">:</span>
              <span
                className={`text-[#333] flex-1 ${isMarathi ? 'marathi-text' : ''}`}
                style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
              >
                {institution}
              </span>
            </div>
          );
        })}

        {/* Professional fields */}
        {professionalFields.map((field) => {
          const value = getProfValue(field.enField, field.mrField);
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
                value={getProfValue(field.enField, field.mrField)}
                isEditMode={isEditMode}
                onChange={(val) => onUpdateProfessional(getProfField(field.enField, field.mrField), val)}
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

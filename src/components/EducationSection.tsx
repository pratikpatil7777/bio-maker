'use client';

import React from 'react';
import { translations, Language } from '@/lib/translations';
import { BiodataData } from '@/lib/defaultData';

interface EducationSectionProps {
  language: Language;
  data: BiodataData['education'];
  isEditMode: boolean;
}

export default function EducationSection({
  language,
  data,
  isEditMode,
}: EducationSectionProps) {
  const t = translations[language];
  const isMarathi = language === 'mr';

  return (
    <section className="mb-4">
      <h3 className="section-title">{t.education}</h3>

      <div className="grid grid-cols-1 gap-y-0">
        {data.map((edu, index) => {
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
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { translations, Language } from '@/lib/translations';
import { BiodataData } from '@/lib/defaultData';

interface SiblingsSectionProps {
  language: Language;
  data: BiodataData['siblings'];
  isEditMode: boolean;
}

export default function SiblingsSection({
  language,
  data,
  isEditMode,
}: SiblingsSectionProps) {
  const t = translations[language];
  const isMarathi = language === 'mr';

  if (data.length === 0) return null;

  return (
    <section className="mb-6">
      <h3 className="section-title">{t.siblings}</h3>

      <div className="space-y-4">
        {data.map((sibling, index) => {
          const relation = isMarathi ? sibling.relationMarathi || sibling.relation : sibling.relation;
          const name = isMarathi ? sibling.nameMarathi || sibling.name : sibling.name;
          const occupation = isMarathi ? sibling.occupationMarathi || sibling.occupation : sibling.occupation;
          const spouseName = isMarathi ? sibling.spouseNameMarathi || sibling.spouseName : sibling.spouseName;
          const spouseOccupation = isMarathi
            ? sibling.spouseOccupationMarathi || sibling.spouseOccupation
            : sibling.spouseOccupation;

          return (
            <div key={index} className="pl-2 border-l-2 border-[#D4AF37] ml-2">
              <div
                className={`font-semibold text-[#800020] mb-1 ${isMarathi ? 'marathi-text' : ''}`}
                style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : "'Playfair Display', serif" }}
              >
                {relation}
              </div>

              <div className="grid grid-cols-1 gap-y-1 pl-2 text-sm">
                <div className="flex">
                  <span
                    className={`font-medium text-[#555] min-w-[100px] ${isMarathi ? 'marathi-text' : ''}`}
                    style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
                  >
                    {t.siblingName}:
                  </span>
                  <span
                    className={`text-[#333] ${isMarathi ? 'marathi-text' : ''}`}
                    style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
                  >
                    {name}
                  </span>
                </div>

                {occupation && (
                  <div className="flex">
                    <span
                      className={`font-medium text-[#555] min-w-[100px] ${isMarathi ? 'marathi-text' : ''}`}
                      style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
                    >
                      {t.siblingOccupation}:
                    </span>
                    <span
                      className={`text-[#333] ${isMarathi ? 'marathi-text' : ''}`}
                      style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
                    >
                      {occupation}
                    </span>
                  </div>
                )}

                {spouseName && (
                  <div className="flex">
                    <span
                      className={`font-medium text-[#555] min-w-[100px] ${isMarathi ? 'marathi-text' : ''}`}
                      style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
                    >
                      {t.spouseName}:
                    </span>
                    <span
                      className={`text-[#333] ${isMarathi ? 'marathi-text' : ''}`}
                      style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
                    >
                      {spouseName}
                    </span>
                  </div>
                )}

                {spouseOccupation && (
                  <div className="flex">
                    <span
                      className={`font-medium text-[#555] min-w-[100px] ${isMarathi ? 'marathi-text' : ''}`}
                      style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
                    >
                      {t.spouseOccupation}:
                    </span>
                    <span
                      className={`text-[#333] ${isMarathi ? 'marathi-text' : ''}`}
                      style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
                    >
                      {spouseOccupation}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

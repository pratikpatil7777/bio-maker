'use client';

import React from 'react';
import { translations, Language } from '@/lib/translations';
import { BiodataData } from '@/lib/defaultData';

interface MaternalDetailsProps {
  language: Language;
  data: BiodataData['maternal'];
  isEditMode: boolean;
}

export default function MaternalDetails({
  language,
  data,
  isEditMode,
}: MaternalDetailsProps) {
  const t = translations[language];
  const isMarathi = language === 'mr';

  const nativePlace = isMarathi ? data.nativePlaceMarathi || data.nativePlace : data.nativePlace;
  const grandfatherName = isMarathi
    ? data.grandfatherNameMarathi || data.grandfatherName
    : data.grandfatherName;

  return (
    <section className="mb-6">
      <h3 className="section-title">{t.maternalDetails}</h3>

      <div className="grid grid-cols-1 gap-y-2">
        <div className="flex flex-wrap">
          <span
            className={`font-medium text-[#555] min-w-[190px] ${isMarathi ? 'marathi-text' : ''}`}
            style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
          >
            {t.maternalNativePlace}:
          </span>
          <span
            className={`text-[#333] ${isMarathi ? 'marathi-text' : ''}`}
            style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
          >
            {nativePlace}
          </span>
        </div>

        <div className="flex flex-wrap">
          <span
            className={`font-medium text-[#555] min-w-[190px] ${isMarathi ? 'marathi-text' : ''}`}
            style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
          >
            {t.maternalGrandfatherName}:
          </span>
          <span
            className={`text-[#333] ${isMarathi ? 'marathi-text' : ''}`}
            style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
          >
            {grandfatherName}
          </span>
        </div>

        {data.uncles.length > 0 && (
          <div className="flex flex-wrap">
            <span
              className={`font-medium text-[#555] min-w-[190px] ${isMarathi ? 'marathi-text' : ''}`}
              style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
            >
              {t.maternalUncleName}:
            </span>
            <div className="flex-1">
              {data.uncles.map((uncle, index) => {
                const name = isMarathi ? uncle.nameMarathi || uncle.name : uncle.name;
                const location = isMarathi ? uncle.locationMarathi || uncle.location : uncle.location;

                return (
                  <div
                    key={index}
                    className={`text-[#333] ${isMarathi ? 'marathi-text' : ''}`}
                    style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
                  >
                    • {name}, {location}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

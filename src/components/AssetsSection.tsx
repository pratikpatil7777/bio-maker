'use client';

import React from 'react';
import { translations, Language } from '@/lib/translations';
import { BiodataData } from '@/lib/defaultData';
import EditableField from './EditableField';

interface AssetsSectionProps {
  language: Language;
  data: BiodataData['assets'];
  isEditMode: boolean;
  onUpdate: (field: keyof BiodataData['assets'], value: string) => void;
}

export default function AssetsSection({
  language,
  data,
  isEditMode,
  onUpdate,
}: AssetsSectionProps) {
  const t = translations[language];
  const isMarathi = language === 'mr';

  const farmLand = isMarathi ? data.farmLandMarathi || data.farmLand : data.farmLand;
  const additionalAssets = isMarathi
    ? data.additionalAssetsMarathi || data.additionalAssets
    : data.additionalAssets;

  if (!isEditMode && !farmLand && !additionalAssets) return null;

  return (
    <section className="mb-4">
      <h3 className="section-title">{t.familyAssets}</h3>

      <div className="grid grid-cols-1 gap-y-0">
        {(isEditMode || farmLand) && (
          <div className="flex items-start">
            <span
              className={`font-medium text-[#555] w-[190px] shrink-0 ${isMarathi ? 'marathi-text' : ''}`}
              style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
            >
              {t.farmLand}
            </span>
            <span className="w-[20px] shrink-0 text-center text-[#555]">:</span>
            <EditableField
              value={farmLand}
              isEditMode={isEditMode}
              onChange={(val) =>
                onUpdate(isMarathi ? 'farmLandMarathi' : 'farmLand', val)
              }
              isMarathi={isMarathi}
              placeholder={isEditMode ? 'Enter farm land details' : ''}
              className="text-[#333] flex-1"
            />
          </div>
        )}

        {(isEditMode || additionalAssets) && (
          <div className="flex items-start">
            <span
              className={`font-medium text-[#555] w-[190px] shrink-0 ${isMarathi ? 'marathi-text' : ''}`}
              style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
            >
              {t.realEstate}
            </span>
            <span className="w-[20px] shrink-0 text-center text-[#555]">:</span>
            <EditableField
              value={additionalAssets}
              isEditMode={isEditMode}
              onChange={(val) =>
                onUpdate(isMarathi ? 'additionalAssetsMarathi' : 'additionalAssets', val)
              }
              isMarathi={isMarathi}
              placeholder={isEditMode ? 'Enter additional assets' : ''}
              className="text-[#333] flex-1"
              multiline
            />
          </div>
        )}
      </div>
    </section>
  );
}

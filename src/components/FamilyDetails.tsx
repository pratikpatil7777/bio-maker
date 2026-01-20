'use client';

import React from 'react';
import { translations, Language } from '@/lib/translations';
import { BiodataData } from '@/lib/defaultData';
import EditableField from './EditableField';

interface FamilyDetailsProps {
  language: Language;
  familyData: BiodataData['family'];
  siblingsData: BiodataData['siblings'];
  extendedFamilyData: BiodataData['extendedFamily'];
  maternalData: BiodataData['maternal'];
  isEditMode: boolean;
  onUpdateFamily: (field: keyof BiodataData['family'], value: string) => void;
  onUpdateExtendedFamily: (field: keyof BiodataData['extendedFamily'], value: string) => void;
}

export default function FamilyDetails({
  language,
  familyData,
  siblingsData,
  extendedFamilyData,
  maternalData,
  isEditMode,
  onUpdateFamily,
  onUpdateExtendedFamily,
}: FamilyDetailsProps) {
  const t = translations[language];
  const isMarathi = language === 'mr';

  const getValue = (enField: keyof BiodataData['family'], mrField: keyof BiodataData['family']) => {
    return isMarathi ? familyData[mrField] || familyData[enField] : familyData[enField];
  };

  const getField = (enField: keyof BiodataData['family'], mrField: keyof BiodataData['family']) => {
    return isMarathi ? mrField : enField;
  };

  const fields = [
    { label: t.nativePlace, enField: 'nativePlace' as const, mrField: 'nativePlaceMarathi' as const },
    { label: t.fatherName, enField: 'fatherName' as const, mrField: 'fatherNameMarathi' as const },
    { label: t.fatherOccupation, enField: 'fatherOccupation' as const, mrField: 'fatherOccupationMarathi' as const },
    { label: t.motherName, enField: 'motherName' as const, mrField: 'motherNameMarathi' as const, includeOccupation: true },
  ];

  // Grandfather's name (displayed just above Uncle's Name)
  const grandfatherName = isMarathi
    ? familyData.grandfatherNameMarathi || familyData.grandfatherName
    : familyData.grandfatherName;

  // Extended family values
  const uncleName = isMarathi
    ? extendedFamilyData.uncleNameMarathi || extendedFamilyData.uncleName
    : extendedFamilyData.uncleName;
  const uncleLocation = isMarathi
    ? extendedFamilyData.uncleLocationMarathi || extendedFamilyData.uncleLocation
    : extendedFamilyData.uncleLocation;

  // Maternal family values
  const maternalNativePlace = isMarathi
    ? maternalData.nativePlaceMarathi || maternalData.nativePlace
    : maternalData.nativePlace;
  const maternalGrandfatherName = isMarathi
    ? maternalData.grandfatherNameMarathi || maternalData.grandfatherName
    : maternalData.grandfatherName;

  return (
    <section className="mb-4">
      <h3 className="section-title">{t.familyDetails}</h3>

      {/* Parent details */}
      <div className="grid grid-cols-1 gap-y-0">
        {fields.map((field) => {
          const value = getValue(field.enField, field.mrField);
          const shouldShow = isEditMode || value;

          if (!shouldShow) return null;

          const isFatherName = field.enField === 'fatherName';
          const isMotherName = field.enField === 'motherName';
          const fatherContact = familyData.fatherContact;
          const motherOccupation = isMarathi
            ? familyData.motherOccupationMarathi || familyData.motherOccupation
            : familyData.motherOccupation;

          return (
            <div key={field.enField}>
              <div className="flex items-start">
                <span
                  className={`font-medium text-[#555] w-[190px] shrink-0 ${isMarathi ? 'marathi-text' : ''}`}
                  style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
                >
                  {field.label}
                </span>
                <span className="w-[20px] shrink-0 text-center text-[#555]">:</span>
                {isMotherName && !isEditMode ? (
                  <span
                    className={`text-[#333] flex-1 ${isMarathi ? 'marathi-text' : ''}`}
                    style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
                  >
                    {value}{motherOccupation && `, ${motherOccupation}`}
                  </span>
                ) : (
                  <EditableField
                    value={getValue(field.enField, field.mrField)}
                    isEditMode={isEditMode}
                    onChange={(val) => onUpdateFamily(getField(field.enField, field.mrField), val)}
                    isMarathi={isMarathi}
                    placeholder={isEditMode ? `Enter ${field.label.toLowerCase()}` : ''}
                    className="text-[#333] flex-1"
                  />
                )}
              </div>
              {/* Mother's Occupation editable field in edit mode */}
              {isMotherName && isEditMode && (
                <div className="flex items-start">
                  <span
                    className={`font-medium text-[#555] w-[190px] shrink-0 ${isMarathi ? 'marathi-text' : ''}`}
                    style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
                  >
                    {t.motherOccupation}
                  </span>
                  <span className="w-[20px] shrink-0 text-center text-[#555]">:</span>
                  <EditableField
                    value={motherOccupation}
                    isEditMode={isEditMode}
                    onChange={(val) => onUpdateFamily(isMarathi ? 'motherOccupationMarathi' : 'motherOccupation', val)}
                    isMarathi={isMarathi}
                    placeholder="Enter mother's occupation"
                    className="text-[#333] flex-1"
                  />
                </div>
              )}
              {/* Mobile number under Father's Name */}
              {isFatherName && (isEditMode || fatherContact) && (
                <div className="flex items-start">
                  <span className="w-[190px] shrink-0"></span>
                  <span className="w-[20px] shrink-0"></span>
                  <div className="text-[#333] flex-1">
                    <span className="font-medium text-[#555]">{t.mobile}:</span>{' '}
                    {isEditMode ? (
                      <EditableField
                        value={fatherContact}
                        isEditMode={isEditMode}
                        onChange={(val) => onUpdateFamily('fatherContact', val)}
                        isMarathi={false}
                        placeholder="Enter mobile"
                        className="inline"
                      />
                    ) : (
                      fatherContact
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Siblings Section */}
      {siblingsData.length > 0 && (
        <div className="mt-2">
          <h4
            className={`font-semibold text-[#800020] mb-1 ${isMarathi ? 'marathi-header' : ''}`}
            style={{ fontFamily: isMarathi ? "'Noto Serif Devanagari', serif" : "'Playfair Display', serif" }}
          >
            {t.siblings}
          </h4>
          <div className="space-y-1">
            {siblingsData.map((sibling, index) => {
              const relation = isMarathi ? sibling.relationMarathi || sibling.relation : sibling.relation;
              const name = isMarathi ? sibling.nameMarathi || sibling.name : sibling.name;
              const occupation = isMarathi ? sibling.occupationMarathi || sibling.occupation : sibling.occupation;
              const spouseName = isMarathi ? sibling.spouseNameMarathi || sibling.spouseName : sibling.spouseName;
              const spouseOccupation = isMarathi
                ? sibling.spouseOccupationMarathi || sibling.spouseOccupation
                : sibling.spouseOccupation;

              return (
                <div key={index}>
                  {/* Sibling row */}
                  <div className="flex items-start">
                    <span
                      className={`font-medium text-[#555] w-[190px] shrink-0 ${isMarathi ? 'marathi-text' : ''}`}
                      style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
                    >
                      {relation}
                    </span>
                    <span className="w-[20px] shrink-0 text-center text-[#555]">:</span>
                    <span
                      className={`text-[#333] flex-1 ${isMarathi ? 'marathi-text' : ''}`}
                      style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
                    >
                      {name}
                      {occupation && <span className="text-[#555]">, {occupation}</span>}
                    </span>
                  </div>
                  {/* Spouse as sub-value - aligned with value column */}
                  {spouseName && (
                    <div className="flex items-start">
                      <span className="w-[190px] shrink-0"></span>
                      <span className="w-[20px] shrink-0"></span>
                      <div
                        className={`text-[#333] flex-1 ${isMarathi ? 'marathi-text' : ''}`}
                        style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
                      >
                        <span className="font-medium text-[#555]">{t.spouseName}:</span> {spouseName}
                        {spouseOccupation && (
                          <div className="text-[#555]">{spouseOccupation}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Grandfather's Name */}
      {(isEditMode || grandfatherName) && (
        <div className="mt-2 flex items-start">
          <span
            className={`font-medium text-[#555] w-[190px] shrink-0 ${isMarathi ? 'marathi-text' : ''}`}
            style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
          >
            {t.grandfatherName}
          </span>
          <span className="w-[20px] shrink-0 text-center text-[#555]">:</span>
          <EditableField
            value={grandfatherName}
            isEditMode={isEditMode}
            onChange={(val) => onUpdateFamily(isMarathi ? 'grandfatherNameMarathi' : 'grandfatherName', val)}
            isMarathi={isMarathi}
            placeholder={isEditMode ? 'Enter grandfather\'s name' : ''}
            className="text-[#333] flex-1"
          />
        </div>
      )}

      {/* Uncle (Extended Family) */}
      {(isEditMode || uncleName) && (
        <div className="flex items-start">
          <span
            className={`font-medium text-[#555] w-[190px] shrink-0 ${isMarathi ? 'marathi-text' : ''}`}
            style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
          >
            {t.uncleName}
          </span>
          <span className="w-[20px] shrink-0 text-center text-[#555]">:</span>
          <div className="flex-1">
            <EditableField
              value={uncleName}
              isEditMode={isEditMode}
              onChange={(val) => onUpdateExtendedFamily(isMarathi ? 'uncleNameMarathi' : 'uncleName', val)}
              isMarathi={isMarathi}
              className="text-[#333]"
            />
            {uncleLocation && (
              <span
                className={`text-[#333] ${isMarathi ? 'marathi-text' : ''}`}
                style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
              >
                , {uncleLocation}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Maternal Details Section */}
      <div className="mt-2">
        <h4
          className={`font-semibold text-[#800020] mb-1 ${isMarathi ? 'marathi-header' : ''}`}
          style={{ fontFamily: isMarathi ? "'Noto Serif Devanagari', serif" : "'Playfair Display', serif" }}
        >
          {t.maternalDetails}
        </h4>
        <div className="grid grid-cols-1 gap-y-0">
          {/* Maternal Native Place */}
          <div className="flex items-start">
            <span
              className={`font-medium text-[#555] w-[190px] shrink-0 ${isMarathi ? 'marathi-text' : ''}`}
              style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
            >
              {t.maternalNativePlace}
            </span>
            <span className="w-[20px] shrink-0 text-center text-[#555]">:</span>
            <span
              className={`text-[#333] flex-1 ${isMarathi ? 'marathi-text' : ''}`}
              style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
            >
              {maternalNativePlace}
            </span>
          </div>

          {/* Maternal Grandfather */}
          <div className="flex items-start">
            <span
              className={`font-medium text-[#555] w-[190px] shrink-0 ${isMarathi ? 'marathi-text' : ''}`}
              style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
            >
              {t.maternalGrandfatherName}
            </span>
            <span className="w-[20px] shrink-0 text-center text-[#555]">:</span>
            <span
              className={`text-[#333] flex-1 ${isMarathi ? 'marathi-text' : ''}`}
              style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
            >
              {maternalGrandfatherName}
            </span>
          </div>

          {/* Maternal Uncles */}
          {maternalData.uncles.length > 0 && (
            <div className="flex items-start">
              <span
                className={`font-medium text-[#555] w-[190px] shrink-0 ${isMarathi ? 'marathi-text' : ''}`}
                style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
              >
                {t.maternalUncleName}
              </span>
              <span className="w-[20px] shrink-0 text-center text-[#555]">:</span>
              <div className="flex-1">
                {maternalData.uncles.map((uncle, index) => {
                  const name = isMarathi ? uncle.nameMarathi || uncle.name : uncle.name;
                  const location = isMarathi ? uncle.locationMarathi || uncle.location : uncle.location;

                  return (
                    <div
                      key={index}
                      className={`text-[#333] ${isMarathi ? 'marathi-text' : ''}`}
                      style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
                    >
                      {name}, {location}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

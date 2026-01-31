'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BiodataSection, BiodataAttribute, createAttribute, Language } from '@/lib/types';
import { titleCollection, getTitleById, TitleOption } from '@/lib/collections';
import AttributeRow from './AttributeRow';

interface SectionBuilderProps {
  section: BiodataSection;
  language: Language;
  isEditMode: boolean;
  onUpdate: (updated: BiodataSection) => void;
  onDelete: () => void;
  onAddSectionBelow: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function SectionBuilder({
  section,
  language,
  isEditMode,
  onUpdate,
  onDelete,
  onAddSectionBelow,
  onMoveUp,
  onMoveDown,
  isFirst = false,
  isLast = false,
}: SectionBuilderProps) {
  const [isSelectingTitle, setIsSelectingTitle] = useState(!section.titleId);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedTitle = getTitleById(section.titleId);
  const isDevanagari = language === 'mr' || language === 'hi';
  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter titles based on search
  const filteredTitles = titleCollection.filter(title => {
    const searchLower = searchQuery.toLowerCase();
    return (
      title.label.toLowerCase().includes(searchLower) ||
      title.labelMarathi.includes(searchQuery)
    );
  });

  const handleSelectTitle = (titleOption: TitleOption) => {
    onUpdate({
      ...section,
      titleId: titleOption.id,
      customTitle: undefined,
      customTitleMarathi: undefined,
    });
    setIsSelectingTitle(false);
    setShowDropdown(false);
    setSearchQuery('');
  };

  const handleUseCustomTitle = () => {
    if (searchQuery.trim()) {
      onUpdate({
        ...section,
        titleId: 'other',
        customTitle: searchQuery.trim(),
        customTitleMarathi: searchQuery.trim(),
      });
      setIsSelectingTitle(false);
      setShowDropdown(false);
      setSearchQuery('');
    }
  };

  const handleAttributeUpdate = (index: number, updated: BiodataAttribute) => {
    const newAttributes = [...section.attributes];
    newAttributes[index] = updated;
    onUpdate({ ...section, attributes: newAttributes });
  };

  const handleAttributeDelete = (index: number) => {
    const newAttributes = section.attributes.filter((_, i) => i !== index);
    onUpdate({ ...section, attributes: newAttributes });
  };

  const handleAddAttribute = (afterIndex?: number) => {
    const newAttribute = createAttribute('');
    const newAttributes = [...section.attributes];
    if (afterIndex !== undefined) {
      newAttributes.splice(afterIndex + 1, 0, newAttribute);
    } else {
      newAttributes.push(newAttribute);
    }
    onUpdate({ ...section, attributes: newAttributes });
  };

  // Get display title
  const getTitle = () => {
    if (section.customTitle) {
      if (isHindi) return section.customTitleHindi || section.customTitle;
      if (isMarathi) return section.customTitleMarathi || section.customTitle;
      return section.customTitle;
    }
    if (selectedTitle) {
      if (isHindi) return selectedTitle.labelHindi || selectedTitle.labelMarathi;
      if (isMarathi) return selectedTitle.labelMarathi;
      return selectedTitle.label;
    }
    if (isHindi) return 'शीर्षक चुनें';
    if (isMarathi) return 'शीर्षक निवडा';
    return 'Select Title';
  };

  // Toggle section visibility
  const handleToggleSectionVisibility = () => {
    onUpdate({ ...section, hidden: !section.hidden });
  };

  // VIEW MODE
  if (!isEditMode) {
    // Hide if section is hidden
    if (section.hidden) return null;

    // Don't render empty sections
    if (section.attributes.length === 0) return null;

    // Filter visible attributes and check if any have content
    const visibleAttributes = section.attributes.filter(attr => !attr.hidden);
    const hasContent = visibleAttributes.some(attr => {
      if (isHindi) return attr.valueHindi || attr.valueMarathi || attr.value;
      if (isMarathi) return attr.valueMarathi || attr.value;
      return attr.value;
    });
    if (!hasContent) return null;

    return (
      <section className="section-compact">
        <h3
          className="section-title"
          style={{
            color: 'var(--theme-header-text, #800020)',
            fontFamily: isDevanagari ? "'Noto Serif Devanagari', serif" : "'Playfair Display', serif",
          }}
        >
          {getTitle()}
        </h3>
        <div className="space-y-0.5">
          {visibleAttributes.map((attr) => (
            <AttributeRow
              key={attr.id}
              attribute={attr}
              language={language}
              isEditMode={false}
              onUpdate={() => {}}
              onDelete={() => {}}
              onAddBelow={() => {}}
              showAddButton={false}
            />
          ))}
        </div>
      </section>
    );
  }

  // EDIT MODE
  return (
    <section className={`group/section relative mb-4 p-3 border border-dashed rounded-lg transition-colors ${
      section.hidden
        ? 'border-gray-300 bg-gray-100/50 dark:bg-slate-700/30'
        : 'border-amber-200 hover:border-amber-300 bg-white/50'
    }`}>
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-3 px-2">
        {/* Hide/View Toggle for Section */}
        <button
          onClick={handleToggleSectionVisibility}
          className={`biodata-btn p-1.5 rounded transition-colors flex-shrink-0 ${
            section.hidden
              ? 'text-gray-400 hover:text-gray-600 bg-gray-200'
              : 'text-amber-500 hover:text-amber-700 bg-amber-50'
          }`}
          title={section.hidden
            ? (isHindi ? 'सेक्शन दिखाएं' : isMarathi ? 'सेक्शन दाखवा' : 'Show Section')
            : (isHindi ? 'सेक्शन छुपाएं' : isMarathi ? 'सेक्शन लपवा' : 'Hide Section')
          }
        >
          {section.hidden ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>

        {/* Title Selector */}
        <div className="flex-1 relative" ref={dropdownRef}>
          {isSelectingTitle || !section.titleId ? (
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                disabled={section.hidden}
                placeholder={isHindi ? 'शीर्षक खोजें...' : isMarathi ? 'शीर्षक शोधा...' : 'Search section title...'}
                className={`w-full text-sm font-semibold px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                  section.hidden
                    ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                    : 'bg-white border-amber-300'
                }`}
                style={{
                  color: section.hidden ? undefined : 'var(--theme-header-text, #800020)',
                  fontFamily: isDevanagari ? "'Noto Serif Devanagari', serif" : "'Playfair Display', serif",
                }}
              />

              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute z-50 top-full left-0 mt-1 w-72 max-h-64 overflow-y-auto bg-white border border-amber-200 rounded-lg shadow-lg">
                  {/* Custom option */}
                  {searchQuery.trim() && (
                    <button
                      onClick={handleUseCustomTitle}
                      className="w-full px-3 py-2 text-left text-sm bg-amber-50 hover:bg-amber-100 border-b border-amber-200 flex items-center gap-2"
                    >
                      <span className="text-amber-600">+</span>
                      <span>Use &quot;{searchQuery}&quot; as custom title</span>
                    </button>
                  )}

                  {/* Title options */}
                  {filteredTitles.map((title) => (
                    <button
                      key={title.id}
                      onClick={() => handleSelectTitle(title)}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-amber-50 flex items-center gap-2"
                    >
                      <span className="text-lg">{title.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium">{isHindi ? (title.labelHindi || title.labelMarathi) : isMarathi ? title.labelMarathi : title.label}</div>
                        <div className="text-xs text-gray-400">{isDevanagari ? title.label : title.labelMarathi}</div>
                      </div>
                    </button>
                  ))}

                  {filteredTitles.length === 0 && !searchQuery.trim() && (
                    <div className="px-3 py-4 text-sm text-gray-500 text-center">
                      {isHindi ? 'शीर्षक खोजने के लिए टाइप करें' : isMarathi ? 'शीर्षक शोधण्यासाठी टाइप करा' : 'Type to search titles'}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => !section.hidden && setIsSelectingTitle(true)}
              disabled={section.hidden}
              className={`w-full text-left text-sm font-semibold px-3 py-2 border border-dashed rounded flex items-center gap-2 ${
                section.hidden
                  ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'border-amber-300 hover:bg-amber-50'
              }`}
              style={{
                color: section.hidden ? undefined : 'var(--theme-header-text, #800020)',
                fontFamily: isDevanagari ? "'Noto Serif Devanagari', serif" : "'Playfair Display', serif",
              }}
              title={section.hidden ? '' : (isHindi ? 'बदलने के लिए क्लिक करें' : isMarathi ? 'क्लिक करून बदला' : 'Click to change')}
            >
              {selectedTitle?.icon && <span className={`text-lg ${section.hidden ? 'opacity-50' : ''}`}>{selectedTitle.icon}</span>}
              <span>{getTitle()}</span>
            </button>
          )}
        </div>

        {/* Section Actions - disabled when section is hidden */}
        <div className={`flex items-center gap-0.5 transition-opacity ${
          section.hidden ? 'opacity-30 pointer-events-none' : 'opacity-0 group-hover/section:opacity-100'
        }`}>
          {/* Move Up */}
          {!isFirst && onMoveUp && (
            <button
              onClick={onMoveUp}
              disabled={section.hidden}
              className={`biodata-btn p-1.5 rounded transition-colors ${
                section.hidden ? 'text-gray-300 cursor-not-allowed' : 'text-amber-500 hover:text-amber-700 hover:bg-amber-50'
              }`}
              title={section.hidden ? '' : (isHindi ? 'ऊपर ले जाएं' : isMarathi ? 'वर हलवा' : 'Move up')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          )}

          {/* Move Down */}
          {!isLast && onMoveDown && (
            <button
              onClick={onMoveDown}
              disabled={section.hidden}
              className={`biodata-btn p-1.5 rounded transition-colors ${
                section.hidden ? 'text-gray-300 cursor-not-allowed' : 'text-amber-500 hover:text-amber-700 hover:bg-amber-50'
              }`}
              title={section.hidden ? '' : (isHindi ? 'नीचे ले जाएं' : isMarathi ? 'खाली हलवा' : 'Move down')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}

          {/* Add Section Below */}
          <button
            onClick={onAddSectionBelow}
            disabled={section.hidden}
            className={`biodata-btn p-1.5 rounded transition-colors ${
              section.hidden ? 'text-gray-300 cursor-not-allowed' : 'text-[#D4AF37] hover:text-[#B8860B] hover:bg-amber-50'
            }`}
            title={section.hidden ? '' : (isHindi ? 'नीचे अनुभाग जोड़ें' : isMarathi ? 'खाली विभाग जोडा' : 'Add section below')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>

          {/* Delete Section */}
          <button
            onClick={onDelete}
            disabled={section.hidden}
            className={`biodata-btn p-1.5 rounded transition-colors ${
              section.hidden ? 'text-gray-300 cursor-not-allowed' : 'text-red-400 hover:text-red-600 hover:bg-red-50'
            }`}
            title={section.hidden ? '' : (isHindi ? 'अनुभाग हटाएं' : isMarathi ? 'विभाग काढून टाका' : 'Remove section')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Attributes List */}
      <div className={`space-y-1 pl-4 pr-2 border-l-2 ${section.hidden ? 'border-gray-200' : 'border-amber-100'}`}>
        {section.attributes.map((attr, index) => (
          <AttributeRow
            key={attr.id}
            attribute={attr}
            language={language}
            isEditMode={true}
            onUpdate={(updated) => handleAttributeUpdate(index, updated)}
            onDelete={() => handleAttributeDelete(index)}
            onAddBelow={() => handleAddAttribute(index)}
            showAddButton={true}
            isFirst={index === 0}
            isLast={index === section.attributes.length - 1}
            disabled={section.hidden}
          />
        ))}
      </div>

      {/* Add First Attribute Button (when empty) */}
      {section.attributes.length === 0 && (
        <button
          onClick={() => handleAddAttribute()}
          disabled={section.hidden}
          className={`biodata-btn w-full mt-2 py-2.5 text-sm border border-dashed rounded-lg flex items-center justify-center gap-2 transition-colors ${
            section.hidden
              ? 'border-gray-300 text-gray-400 cursor-not-allowed'
              : 'border-amber-300 text-[#D4AF37] hover:text-[#B8860B] hover:bg-amber-50'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>{isHindi ? 'विशेषता जोड़ें' : isMarathi ? 'विशेषता जोडा' : 'Add attribute'}</span>
        </button>
      )}

      {/* Add Attribute Button (when has attributes) */}
      {section.attributes.length > 0 && !section.hidden && (
        <button
          onClick={() => handleAddAttribute()}
          className="biodata-btn w-full mt-2 py-1.5 text-xs text-[#D4AF37] hover:text-[#B8860B] hover:bg-amber-50 rounded-lg flex items-center justify-center gap-1.5 transition-colors opacity-0 group-hover/section:opacity-100"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>{isHindi ? 'और विशेषता जोड़ें' : isMarathi ? 'आणखी विशेषता जोडा' : 'Add more attributes'}</span>
        </button>
      )}
    </section>
  );
}

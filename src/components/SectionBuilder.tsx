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
      return isMarathi ? (section.customTitleMarathi || section.customTitle) : section.customTitle;
    }
    if (selectedTitle) {
      return isMarathi ? selectedTitle.labelMarathi : selectedTitle.label;
    }
    return isMarathi ? 'शीर्षक निवडा' : 'Select Title';
  };

  // VIEW MODE
  if (!isEditMode) {
    // Don't render empty sections
    if (section.attributes.length === 0) return null;

    // Check if all attributes are empty
    const hasContent = section.attributes.some(attr =>
      (isMarathi ? attr.valueMarathi : attr.value) || attr.value
    );
    if (!hasContent) return null;

    return (
      <section className="section-compact">
        <h3
          className="section-title"
          style={{
            color: 'var(--theme-header-text, #800020)',
            fontFamily: isMarathi ? "'Noto Serif Devanagari', serif" : "'Playfair Display', serif",
          }}
        >
          {getTitle()}
        </h3>
        <div className="space-y-0.5">
          {section.attributes.map((attr, index) => (
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
    <section className="group/section relative mb-4 p-3 border border-dashed border-amber-200 rounded-lg hover:border-amber-300 transition-colors bg-white/50">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-3">
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
                placeholder={isMarathi ? 'शीर्षक शोधा...' : 'Search section title...'}
                className="w-full text-sm font-semibold px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                style={{
                  color: 'var(--theme-header-text, #800020)',
                  fontFamily: isMarathi ? "'Noto Serif Devanagari', serif" : "'Playfair Display', serif",
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
                        <div className="font-medium">{isMarathi ? title.labelMarathi : title.label}</div>
                        <div className="text-xs text-gray-400">{isMarathi ? title.label : title.labelMarathi}</div>
                      </div>
                    </button>
                  ))}

                  {filteredTitles.length === 0 && !searchQuery.trim() && (
                    <div className="px-3 py-4 text-sm text-gray-500 text-center">
                      {isMarathi ? 'शीर्षक शोधण्यासाठी टाइप करा' : 'Type to search titles'}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsSelectingTitle(true)}
              className="w-full text-left text-sm font-semibold px-3 py-2 border border-dashed border-amber-300 rounded hover:bg-amber-50 flex items-center gap-2"
              style={{
                color: 'var(--theme-header-text, #800020)',
                fontFamily: isMarathi ? "'Noto Serif Devanagari', serif" : "'Playfair Display', serif",
              }}
              title={isMarathi ? 'क्लिक करून बदला' : 'Click to change'}
            >
              {selectedTitle?.icon && <span className="text-lg">{selectedTitle.icon}</span>}
              <span>{getTitle()}</span>
            </button>
          )}
        </div>

        {/* Section Actions */}
        <div className="flex items-center gap-0.5 opacity-0 group-hover/section:opacity-100 transition-opacity">
          {/* Move Up */}
          {!isFirst && onMoveUp && (
            <button
              onClick={onMoveUp}
              className="biodata-btn p-1.5 text-amber-500 hover:text-amber-700 hover:bg-amber-50 rounded transition-colors"
              title={isMarathi ? 'वर हलवा' : 'Move up'}
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
              className="biodata-btn p-1.5 text-amber-500 hover:text-amber-700 hover:bg-amber-50 rounded transition-colors"
              title={isMarathi ? 'खाली हलवा' : 'Move down'}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}

          {/* Add Section Below */}
          <button
            onClick={onAddSectionBelow}
            className="biodata-btn p-1.5 text-[#D4AF37] hover:text-[#B8860B] hover:bg-amber-50 rounded transition-colors"
            title={isMarathi ? 'खाली विभाग जोडा' : 'Add section below'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>

          {/* Delete Section */}
          <button
            onClick={onDelete}
            className="biodata-btn p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title={isMarathi ? 'विभाग काढून टाका' : 'Remove section'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Attributes List */}
      <div className="space-y-1 pl-2 border-l-2 border-amber-100">
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
          />
        ))}
      </div>

      {/* Add First Attribute Button (when empty) */}
      {section.attributes.length === 0 && (
        <button
          onClick={() => handleAddAttribute()}
          className="biodata-btn w-full mt-2 py-2.5 text-sm text-[#D4AF37] hover:text-[#B8860B] hover:bg-amber-50 border border-dashed border-amber-300 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>{isMarathi ? 'विशेषता जोडा' : 'Add attribute'}</span>
        </button>
      )}

      {/* Add Attribute Button (when has attributes) */}
      {section.attributes.length > 0 && (
        <button
          onClick={() => handleAddAttribute()}
          className="biodata-btn w-full mt-2 py-1.5 text-xs text-[#D4AF37] hover:text-[#B8860B] hover:bg-amber-50 rounded-lg flex items-center justify-center gap-1.5 transition-colors opacity-0 group-hover/section:opacity-100"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>{isMarathi ? 'आणखी विशेषता जोडा' : 'Add more attributes'}</span>
        </button>
      )}
    </section>
  );
}

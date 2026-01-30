'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BiodataAttribute, Language } from '@/lib/types';
import { attributeCollection, getAttributeById, categoryLabels, getCategories, AttributeOption } from '@/lib/collections';
import TransliterateInput from './TransliterateInput';

interface AttributeRowProps {
  attribute: BiodataAttribute;
  language: Language;
  isEditMode: boolean;
  onUpdate: (updated: BiodataAttribute) => void;
  onDelete: () => void;
  onAddBelow: () => void;
  showAddButton?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function AttributeRow({
  attribute,
  language,
  isEditMode,
  onUpdate,
  onDelete,
  onAddBelow,
  showAddButton = true,
  isFirst = false,
  isLast = false,
}: AttributeRowProps) {
  const [isSelectingAttribute, setIsSelectingAttribute] = useState(!attribute.attributeId);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedAttribute = getAttributeById(attribute.attributeId);
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

  // Filter attributes based on search
  const filteredAttributes = attributeCollection.filter(attr => {
    const searchLower = searchQuery.toLowerCase();
    return (
      attr.label.toLowerCase().includes(searchLower) ||
      attr.labelMarathi.includes(searchQuery) ||
      (attr.category && categoryLabels[attr.category]?.en.toLowerCase().includes(searchLower))
    );
  });

  // Group filtered attributes by category
  const groupedAttributes = filteredAttributes.reduce((acc, attr) => {
    const category = attr.category || 'misc';
    if (!acc[category]) acc[category] = [];
    acc[category].push(attr);
    return acc;
  }, {} as Record<string, AttributeOption[]>);

  const handleSelectAttribute = (attrOption: AttributeOption) => {
    onUpdate({
      ...attribute,
      attributeId: attrOption.id,
      customLabel: undefined,
      customLabelMarathi: undefined,
    });
    setIsSelectingAttribute(false);
    setShowDropdown(false);
    setSearchQuery('');
  };

  const handleUseCustomLabel = () => {
    if (searchQuery.trim()) {
      onUpdate({
        ...attribute,
        attributeId: 'custom_field',
        customLabel: searchQuery.trim(),
        customLabelMarathi: searchQuery.trim(),
      });
      setIsSelectingAttribute(false);
      setShowDropdown(false);
      setSearchQuery('');
    }
  };

  const handleValueChange = (value: string) => {
    if (isHindi) {
      onUpdate({ ...attribute, valueHindi: value });
    } else if (isMarathi) {
      onUpdate({ ...attribute, valueMarathi: value });
    } else {
      onUpdate({ ...attribute, value: value });
    }
  };

  // Get display label
  const getLabel = () => {
    if (attribute.customLabel) {
      if (isHindi) return attribute.customLabelHindi || attribute.customLabel;
      if (isMarathi) return attribute.customLabelMarathi || attribute.customLabel;
      return attribute.customLabel;
    }
    if (selectedAttribute) {
      if (isHindi) return selectedAttribute.labelHindi || selectedAttribute.labelMarathi;
      if (isMarathi) return selectedAttribute.labelMarathi;
      return selectedAttribute.label;
    }
    return '';
  };

  const getPlaceholder = () => {
    if (selectedAttribute) {
      if (isHindi) return selectedAttribute.placeholderHindi || selectedAttribute.placeholderMarathi || 'मान दर्ज करें';
      if (isMarathi) return selectedAttribute.placeholderMarathi || 'मूल्य प्रविष्ट करा';
      return selectedAttribute.placeholder || 'Enter value';
    }
    if (isHindi) return 'मान दर्ज करें';
    if (isMarathi) return 'मूल्य प्रविष्ट करा';
    return 'Enter value';
  };

  // VIEW MODE
  if (!isEditMode) {
    let displayValue = attribute.value;
    if (isHindi) displayValue = attribute.valueHindi || attribute.valueMarathi || attribute.value;
    else if (isMarathi) displayValue = attribute.valueMarathi || attribute.value;
    if (!displayValue) return null;

    return (
      <div className="flex items-start gap-2 py-0.5">
        <span
          className={`row-label text-[11px] font-medium ${isDevanagari ? 'marathi-text' : ''}`}
          style={{
            color: 'var(--theme-header-text, #800020)',
            fontFamily: isDevanagari ? "'Noto Sans Devanagari', sans-serif" : "'Poppins', sans-serif",
          }}
        >
          {getLabel()}:
        </span>
        <span
          className={`flex-1 text-[11px] ${isDevanagari ? 'marathi-text' : ''}`}
          style={{
            color: 'var(--theme-text, #333)',
            fontFamily: isDevanagari ? "'Noto Sans Devanagari', sans-serif" : "'Poppins', sans-serif",
          }}
        >
          {displayValue}
        </span>
      </div>
    );
  }

  // EDIT MODE
  return (
    <div className="group relative flex items-start gap-2 py-1 hover:bg-amber-50/50 rounded transition-colors">
      {/* Attribute Label Selector */}
      <div className="row-label relative" ref={dropdownRef}>
        {isSelectingAttribute || !attribute.attributeId ? (
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder={isHindi ? 'विशेषता खोजें...' : isMarathi ? 'विशेषता शोधा...' : 'Search attribute...'}
              className="w-full text-[11px] px-2 py-1 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
              style={{ fontFamily: isDevanagari ? "'Noto Sans Devanagari', sans-serif" : "'Poppins', sans-serif" }}
            />

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute z-50 top-full left-0 mt-1 w-64 max-h-64 overflow-y-auto bg-white border border-amber-200 rounded-lg shadow-lg">
                {/* Custom option */}
                {searchQuery.trim() && (
                  <button
                    onClick={handleUseCustomLabel}
                    className="w-full px-3 py-2 text-left text-[11px] bg-amber-50 hover:bg-amber-100 border-b border-amber-200 flex items-center gap-2"
                  >
                    <span className="text-amber-600">+</span>
                    <span>Use &quot;{searchQuery}&quot; as custom label</span>
                  </button>
                )}

                {/* Grouped attributes */}
                {Object.entries(groupedAttributes).map(([category, attrs]) => (
                  <div key={category}>
                    <div className="px-3 py-1 text-[10px] font-semibold text-amber-700 bg-amber-50 sticky top-0">
                      {categoryLabels[category]?.[isHindi ? 'hi' : isMarathi ? 'mr' : 'en'] || category}
                    </div>
                    {attrs.map((attr) => (
                      <button
                        key={attr.id}
                        onClick={() => handleSelectAttribute(attr)}
                        className="w-full px-3 py-1.5 text-left text-[11px] hover:bg-amber-50 flex justify-between items-center"
                      >
                        <span>{isHindi ? (attr.labelHindi || attr.labelMarathi) : isMarathi ? attr.labelMarathi : attr.label}</span>
                        <span className="text-[9px] text-gray-400">
                          {isDevanagari ? attr.label : attr.labelMarathi}
                        </span>
                      </button>
                    ))}
                  </div>
                ))}

                {filteredAttributes.length === 0 && !searchQuery.trim() && (
                  <div className="px-3 py-4 text-[11px] text-gray-500 text-center">
                    {isHindi ? 'विशेषता खोजने के लिए टाइप करें' : isMarathi ? 'विशेषता शोधण्यासाठी टाइप करा' : 'Type to search attributes'}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setIsSelectingAttribute(true)}
            className="w-full text-left text-[11px] px-2 py-1 border border-dashed border-amber-300 rounded hover:bg-amber-50 truncate"
            style={{
              color: 'var(--theme-header-text, #800020)',
              fontFamily: isDevanagari ? "'Noto Sans Devanagari', sans-serif" : "'Poppins', sans-serif",
            }}
            title={isHindi ? 'बदलने के लिए क्लिक करें' : isMarathi ? 'क्लिक करून बदला' : 'Click to change'}
          >
            {getLabel()}:
          </button>
        )}
      </div>

      {/* Value Input */}
      <div className="flex-1">
        <TransliterateInput
          type={selectedAttribute?.inputType === 'email' ? 'email' : selectedAttribute?.inputType === 'phone' ? 'tel' : 'text'}
          value={isHindi ? (attribute.valueHindi || '') : isMarathi ? attribute.valueMarathi : attribute.value}
          onChange={handleValueChange}
          enabled={isDevanagari}
          lang={isHindi ? 'hi' : 'mr'}
          placeholder={getPlaceholder()}
          className={`w-full text-[11px] px-2 py-1 border-b border-dashed border-amber-300 bg-transparent focus:outline-none focus:border-amber-500 ${isDevanagari ? 'marathi-text' : ''}`}
          style={{ fontFamily: isDevanagari ? "'Noto Sans Devanagari', sans-serif" : "'Poppins', sans-serif" }}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        {showAddButton && (
          <button
            onClick={onAddBelow}
            className="biodata-btn p-1.5 text-[#D4AF37] hover:text-[#B8860B] hover:bg-amber-50 rounded transition-colors"
            title={isHindi ? 'नीचे जोड़ें' : isMarathi ? 'खाली जोडा' : 'Add below'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
        <button
          onClick={onDelete}
          className="biodata-btn p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
          title={isHindi ? 'हटाएं' : isMarathi ? 'काढून टाका' : 'Remove'}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

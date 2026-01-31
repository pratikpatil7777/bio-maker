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
  disabled?: boolean; // When parent section is hidden
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
  disabled = false,
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

  // Toggle visibility
  const handleToggleVisibility = () => {
    onUpdate({ ...attribute, hidden: !attribute.hidden });
  };

  // VIEW MODE - hide if hidden
  if (!isEditMode) {
    if (attribute.hidden) return null;

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

  // Determine if this field should appear disabled
  // When parent section is hidden (disabled=true), everything is disabled including toggle
  // When only this field is hidden, inputs are disabled but toggle remains active
  const isDisabled = disabled || attribute.hidden;
  const showAsHidden = disabled || attribute.hidden; // Visual state for the eye icon

  // EDIT MODE
  return (
    <div className={`group relative flex items-start gap-2 py-1 rounded transition-colors ${
      isDisabled ? '' : 'hover:bg-amber-50/50'
    }`}>
      {/* Hide/View Toggle - disabled when parent section is hidden */}
      <button
        onClick={handleToggleVisibility}
        disabled={disabled}
        className={`biodata-btn p-1 rounded transition-colors flex-shrink-0 ${
          disabled
            ? 'text-gray-300 cursor-not-allowed'
            : showAsHidden
              ? 'text-gray-400 hover:text-gray-600'
              : 'text-amber-500 hover:text-amber-700'
        }`}
        title={disabled
          ? ''
          : showAsHidden
            ? (isHindi ? 'दिखाएं' : isMarathi ? 'दाखवा' : 'Show')
            : (isHindi ? 'छुपाएं' : isMarathi ? 'लपवा' : 'Hide')
        }
      >
        {/* Always show eye-slash when disabled by parent or self-hidden */}
        {showAsHidden ? (
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
              disabled={isDisabled}
              placeholder={isHindi ? 'विशेषता खोजें...' : isMarathi ? 'विशेषता शोधा...' : 'Search attribute...'}
              className={`w-full text-[11px] px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                isDisabled
                  ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-amber-300'
              }`}
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
            onClick={() => !isDisabled && setIsSelectingAttribute(true)}
            disabled={isDisabled}
            className={`w-full text-left text-[11px] px-2 py-1 border border-dashed rounded truncate ${
              isDisabled
                ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'border-amber-300 hover:bg-amber-50'
            }`}
            style={{
              color: isDisabled ? undefined : 'var(--theme-header-text, #800020)',
              fontFamily: isDevanagari ? "'Noto Sans Devanagari', sans-serif" : "'Poppins', sans-serif",
            }}
            title={isDisabled ? '' : (isHindi ? 'बदलने के लिए क्लिक करें' : isMarathi ? 'क्लिक करून बदला' : 'Click to change')}
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
          disabled={isDisabled}
          className={`w-full text-[11px] px-2 py-1 border-b border-dashed focus:outline-none ${
            isDisabled
              ? 'border-gray-300 text-gray-400 cursor-not-allowed'
              : 'bg-transparent border-amber-300 focus:border-amber-500'
          } ${isDevanagari ? 'marathi-text' : ''}`}
          style={{
            fontFamily: isDevanagari ? "'Noto Sans Devanagari', sans-serif" : "'Poppins', sans-serif",
            backgroundColor: isDisabled ? '#f3f4f6' : 'transparent'
          }}
        />
      </div>

      {/* Action Buttons - disabled when section is disabled */}
      <div className={`flex items-center gap-0.5 transition-opacity ${
        disabled ? 'opacity-30 pointer-events-none' : 'opacity-0 group-hover:opacity-100'
      }`}>
        {showAddButton && (
          <button
            onClick={onAddBelow}
            disabled={disabled}
            className={`biodata-btn p-1.5 rounded transition-colors ${
              disabled ? 'text-gray-300 cursor-not-allowed' : 'text-[#D4AF37] hover:text-[#B8860B] hover:bg-amber-50'
            }`}
            title={disabled ? '' : (isHindi ? 'नीचे जोड़ें' : isMarathi ? 'खाली जोडा' : 'Add below')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
        <button
          onClick={onDelete}
          disabled={disabled}
          className={`biodata-btn p-1.5 rounded transition-colors ${
            disabled ? 'text-gray-300 cursor-not-allowed' : 'text-red-400 hover:text-red-600 hover:bg-red-50'
          }`}
          title={disabled ? '' : (isHindi ? 'हटाएं' : isMarathi ? 'काढून टाका' : 'Remove')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

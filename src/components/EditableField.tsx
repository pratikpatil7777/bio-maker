'use client';

import React, { useState, useEffect } from 'react';

interface EditableFieldProps {
  value: string;
  isEditMode: boolean;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  isMarathi?: boolean;
  multiline?: boolean;
}

export default function EditableField({
  value,
  isEditMode,
  onChange,
  className = '',
  placeholder = '',
  isMarathi = false,
  multiline = false,
}: EditableFieldProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleBlur = () => {
    onChange(localValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      (e.target as HTMLElement).blur();
    }
  };

  if (isEditMode) {
    if (multiline) {
      return (
        <textarea
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`editable-field bg-transparent border-b border-dashed border-[#D4AF37] px-1 py-0.5 min-w-[100px] resize-none ${
            isMarathi ? 'marathi-text' : ''
          } ${className}`}
          rows={2}
          style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
        />
      );
    }

    return (
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`editable-field bg-transparent border-b border-dashed border-[#D4AF37] px-1 py-0.5 min-w-[100px] ${
          isMarathi ? 'marathi-text' : ''
        } ${className}`}
        style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
      />
    );
  }

  if (!value && !placeholder) {
    return null;
  }

  return (
    <span
      className={`${isMarathi ? 'marathi-text' : ''} ${className} ${multiline ? 'whitespace-pre-line' : ''}`}
      style={{ fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit' }}
    >
      {value || placeholder}
    </span>
  );
}

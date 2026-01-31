'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { getTransliterateSuggestions } from '@/lib/transliterate';

interface TransliterateInputProps {
  value: string;
  onChange: (value: string) => void;
  enabled: boolean;
  lang?: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  type?: string;
  maxSuggestions?: number;
  disabled?: boolean;
}

/**
 * TransliterateInput - Input component with AI-powered transliteration.
 *
 * When enabled=true (Marathi mode):
 *   - User types English phonetically (e.g., "pratik")
 *   - On Space/Enter, the API returns Devanagari suggestions
 *   - A dropdown shows suggestions for selection
 *   - First suggestion is auto-applied, user can pick alternatives
 *
 * When enabled=false (English mode):
 *   - Behaves as a normal input field
 */
export default function TransliterateInput({
  value,
  onChange,
  enabled,
  lang = 'mr',
  placeholder,
  className = '',
  style,
  type = 'text',
  maxSuggestions = 5,
  disabled = false,
}: TransliterateInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  // The current word being typed (English, before transliteration)
  const [currentWord, setCurrentWord] = useState('');
  const [matchStart, setMatchStart] = useState(0);
  const [matchEnd, setMatchEnd] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions from API with debounce
  const fetchSuggestions = useCallback(
    async (word: string) => {
      if (!word || word.length < 1) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const results = await getTransliterateSuggestions(word, lang, maxSuggestions);
        if (results.length > 0) {
          setSuggestions(results);
          setActiveSuggestion(0);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    },
    [lang, maxSuggestions]
  );

  // Extract the current word being typed at cursor position
  const extractCurrentWord = useCallback(
    (text: string, cursorPos: number): { word: string; start: number; end: number } => {
      // Find word boundaries around cursor
      let start = cursorPos;
      let end = cursorPos;

      // Walk backwards to find start of current word
      while (start > 0 && text[start - 1] !== ' ') {
        start--;
      }

      // Walk forwards to find end of current word
      while (end < text.length && text[end] !== ' ') {
        end++;
      }

      const word = text.substring(start, end);
      return { word, start, end };
    },
    []
  );

  // Check if a word is Latin (needs transliteration)
  const isLatinWord = (word: string): boolean => {
    return /^[a-zA-Z]+$/.test(word);
  };

  // Apply a selected suggestion
  const applySuggestion = useCallback(
    (suggestion: string) => {
      const before = value.substring(0, matchStart);
      const after = value.substring(matchEnd);
      const newValue = before + suggestion + after;
      onChange(newValue);
      setSuggestions([]);
      setShowSuggestions(false);
      setCurrentWord('');

      // Focus back to input and place cursor after the inserted word
      setTimeout(() => {
        if (inputRef.current) {
          const newCursorPos = (before + suggestion).length;
          inputRef.current.focus();
          inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
        }
      }, 0);
    },
    [value, matchStart, matchEnd, onChange]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onChange(newValue);

      if (!enabled) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      const cursorPos = e.target.selectionStart || newValue.length;
      const { word, start, end } = extractCurrentWord(newValue, cursorPos);

      if (word && isLatinWord(word)) {
        setCurrentWord(word);
        setMatchStart(start);
        setMatchEnd(end);

        // Debounce API call
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
          fetchSuggestions(word);
        }, 200);
      } else {
        setCurrentWord('');
        setSuggestions([]);
        setShowSuggestions(false);
      }
    },
    [enabled, onChange, extractCurrentWord, fetchSuggestions]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!enabled || !showSuggestions || suggestions.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestion((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestion((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        if (suggestions.length > 0) {
          e.preventDefault();
          applySuggestion(suggestions[activeSuggestion]);
        }
      } else if (e.key === ' ') {
        // Space: apply first suggestion and add space
        if (suggestions.length > 0 && currentWord) {
          e.preventDefault();
          const before = value.substring(0, matchStart);
          const after = value.substring(matchEnd);
          const newValue = before + suggestions[activeSuggestion] + ' ' + after;
          onChange(newValue);
          setSuggestions([]);
          setShowSuggestions(false);
          setCurrentWord('');

          // Place cursor after the inserted word + space
          setTimeout(() => {
            if (inputRef.current) {
              const pos = (before + suggestions[activeSuggestion] + ' ').length;
              inputRef.current.focus();
              inputRef.current.setSelectionRange(pos, pos);
            }
          }, 0);
        }
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    },
    [
      enabled,
      showSuggestions,
      suggestions,
      activeSuggestion,
      applySuggestion,
      currentWord,
      value,
      matchStart,
      matchEnd,
      onChange,
    ]
  );

  // Calculate suggestion dropdown position
  const getDropdownPosition = () => {
    if (!inputRef.current) return {};
    const rect = inputRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;

    // Show above if not enough space below
    if (spaceBelow < 160) {
      return { bottom: '100%', left: 0, marginBottom: '2px' };
    }
    return { top: '100%', left: 0, marginTop: '2px' };
  };

  // When not enabled, render a simple input
  if (!enabled) {
    return (
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${className} ${disabled ? '!bg-gray-100' : ''}`}
        style={{
          ...style,
          ...(disabled ? { backgroundColor: '#f3f4f6' } : {})
        }}
        disabled={disabled}
      />
    );
  }

  return (
    <div className={`relative w-full ${disabled ? 'bg-gray-100 rounded' : ''}`}>
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          // Delay hiding to allow click on suggestion
          setTimeout(() => setShowSuggestions(false), 150);
        }}
        placeholder={placeholder}
        className={`${className} ${disabled ? '!bg-gray-100' : ''}`}
        style={{
          ...style,
          ...(disabled ? { backgroundColor: '#f3f4f6' } : {})
        }}
        disabled={disabled}
      />

      {/* Transliteration badge */}
      {enabled && (
        <span
          className="absolute right-0.5 top-1/2 -translate-y-1/2 h-4 px-1 flex items-center justify-center rounded text-[7px] font-bold bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800 pointer-events-none select-none"
          title={lang === 'hi' ? "Transliteration active - Type English, get Hindi" : "Transliteration active - Type English, get Marathi"}
        >
          {lang === 'hi' ? 'हि' : 'मा'}
        </span>
      )}

      {/* Suggestion Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-[2000] min-w-[180px] max-w-[280px] bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-600 rounded-lg shadow-xl overflow-hidden"
          style={getDropdownPosition()}
        >
          {/* Header */}
          <div className="px-2.5 py-1.5 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-slate-700 dark:to-slate-700 border-b border-amber-100 dark:border-slate-600">
            <span className="text-[9px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              {currentWord}
            </span>
          </div>

          {/* Suggestions */}
          <div className="py-0.5">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                className={`w-full text-left px-3 py-1.5 text-sm transition-colors cursor-pointer flex items-center gap-2 ${
                  index === activeSuggestion
                    ? 'bg-amber-50 dark:bg-slate-700 text-amber-900 dark:text-amber-300'
                    : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                }`}
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent input blur
                  applySuggestion(suggestion);
                }}
                onMouseEnter={() => setActiveSuggestion(index)}
                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
              >
                <span className="flex-1">{suggestion}</span>
                {index === 0 && (
                  <span className="text-[8px] px-1 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 font-medium">
                    Space
                  </span>
                )}
                {index < 9 && (
                  <span className="text-[9px] text-gray-400 dark:text-slate-500 font-mono">
                    {index + 1}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Hint */}
          <div className="px-2.5 py-1 bg-gray-50 dark:bg-slate-700/50 border-t border-gray-100 dark:border-slate-600">
            <span className="text-[8px] text-gray-400 dark:text-slate-500">
              Space to accept · ↑↓ to navigate · Esc to dismiss
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

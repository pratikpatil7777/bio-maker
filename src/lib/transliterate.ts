/**
 * Transliteration API utility with dual-provider support:
 *
 * 1. Primary: AI4Bharat IndicXlit API (AI-powered, best quality for Indic languages)
 * 2. Fallback: Google Input Tools API (battle-tested, powers Google Keyboard)
 *
 * Features:
 * - Automatic fallback if primary API fails
 * - localStorage + in-memory caching (up to 5000 words)
 * - Debounce-friendly (200ms recommended)
 */

// API endpoints
const AI4BHARAT_API = 'https://xlit-api.ai4bharat.org/tl';
const GOOGLE_API = 'https://inputtools.google.com/request';

// Google Input Tools language code for Marathi
const GOOGLE_LANG_MAP: Record<string, string> = {
  mr: 'mr-t-i0-und',
  hi: 'hi-t-i0-und',
  bn: 'bn-t-i0-und',
  gu: 'gu-t-i0-und',
  kn: 'kn-t-i0-und',
  ml: 'ml-t-i0-und',
  ta: 'ta-t-i0-und',
  te: 'te-t-i0-und',
  pa: 'pa-t-i0-und',
  ur: 'ur-t-i0-und',
  ne: 'ne-t-i0-und',
  sa: 'sa-t-i0-und',
};

const CACHE_KEY = 'transliterate-cache-mr';
const MAX_CACHE_SIZE = 5000;

// In-memory cache for current session
const memoryCache = new Map<string, string[]>();

// Track which API is working
let useGoogleFallback = false;

/**
 * Load persisted cache from localStorage
 */
function loadCache(): Map<string, string[]> {
  try {
    if (typeof window === 'undefined') return new Map();
    const stored = localStorage.getItem(CACHE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return new Map(Object.entries(parsed));
    }
  } catch {
    // Ignore parse errors
  }
  return new Map();
}

/**
 * Save cache to localStorage
 */
function saveCache(cache: Map<string, string[]>): void {
  try {
    if (typeof window === 'undefined') return;
    const entries = Array.from(cache.entries());
    if (entries.length > MAX_CACHE_SIZE) {
      entries.splice(0, entries.length - MAX_CACHE_SIZE);
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(Object.fromEntries(entries)));
  } catch {
    // Ignore storage errors
  }
}

let persistedCache: Map<string, string[]> | null = null;

function getCache(): Map<string, string[]> {
  if (!persistedCache) {
    persistedCache = loadCache();
    for (const [key, value] of persistedCache) {
      memoryCache.set(key, value);
    }
  }
  return memoryCache;
}

/**
 * Fetch from AI4Bharat IndicXlit API
 */
async function fetchFromAI4Bharat(
  word: string,
  lang: string,
  numSuggestions: number
): Promise<string[]> {
  let encodedWord: string;
  if (word === '.' || word === '..') {
    encodedWord = ' ' + word.replace(/\./g, '%2E');
  } else {
    encodedWord = encodeURIComponent(word).replace(/\./g, '%2E');
  }

  const url = `${AI4BHARAT_API}/${lang}/${encodedWord}?num_suggestions=${numSuggestions}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    if (data.result && Array.isArray(data.result)) {
      return data.result;
    }
    if (data.output && Array.isArray(data.output)) {
      return data.output.flatMap(
        (item: { target?: string[] }) => item.target || []
      );
    }

    return [];
  } catch {
    clearTimeout(timeout);
    throw new Error('AI4Bharat API failed');
  }
}

/**
 * Fetch from Google Input Tools API (fallback)
 */
async function fetchFromGoogle(
  word: string,
  lang: string,
  numSuggestions: number
): Promise<string[]> {
  const langCode = GOOGLE_LANG_MAP[lang] || `${lang}-t-i0-und`;

  const params = new URLSearchParams({
    text: word,
    itc: langCode,
    num: String(numSuggestions),
    cp: '0',
    cs: '1',
    ie: 'utf-8',
    oe: 'utf-8',
    app: 'demopage',
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch(`${GOOGLE_API}?${params.toString()}`, {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    // Google response format: ["SUCCESS", [["word", ["suggestion1", "suggestion2", ...]]]]
    if (data[0] === 'SUCCESS' && data[1] && data[1][0] && data[1][0][1]) {
      return data[1][0][1];
    }

    return [];
  } catch {
    clearTimeout(timeout);
    throw new Error('Google Input Tools API failed');
  }
}

/**
 * Fetch transliteration suggestions with automatic fallback.
 *
 * @param word - English phonetic word to transliterate
 * @param lang - Target language code (default: 'mr' for Marathi)
 * @param numSuggestions - Max number of suggestions (default: 5)
 * @returns Array of transliteration suggestions, or empty array on error
 */
export async function getTransliterateSuggestions(
  word: string,
  lang: string = 'mr',
  numSuggestions: number = 5
): Promise<string[]> {
  if (!word || !word.trim()) return [];

  const trimmed = word.trim().toLowerCase();
  const cacheKey = `${lang}:${trimmed}`;
  const cache = getCache();

  // Check cache first
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  let suggestions: string[] = [];

  try {
    if (!useGoogleFallback) {
      // Try AI4Bharat first
      suggestions = await fetchFromAI4Bharat(trimmed, lang, numSuggestions);
    } else {
      // Already know AI4Bharat is down, go straight to Google
      suggestions = await fetchFromGoogle(trimmed, lang, numSuggestions);
    }
  } catch {
    // Primary failed, try fallback
    try {
      if (!useGoogleFallback) {
        // AI4Bharat failed, switch to Google
        useGoogleFallback = true;
        suggestions = await fetchFromGoogle(trimmed, lang, numSuggestions);

        // Schedule retry of AI4Bharat after 5 minutes
        setTimeout(() => {
          useGoogleFallback = false;
        }, 5 * 60 * 1000);
      }
    } catch {
      // Both APIs failed
      console.warn('All transliteration APIs failed for:', trimmed);
      return [];
    }
  }

  // Cache results
  if (suggestions.length > 0) {
    cache.set(cacheKey, suggestions);
    saveCache(cache);
  }

  return suggestions;
}

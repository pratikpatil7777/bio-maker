// Biodata content validation
// Provides smart validation to warn users about incomplete biodatas

import { DynamicBiodataData, Language } from './types';

export interface ValidationResult {
  isComplete: boolean;
  score: number; // 0-100
  warnings: string[];
  suggestions: string[];
}

/**
 * Validates biodata content and returns a score with suggestions
 * @param data - The biodata data to validate
 * @param language - Current language for messages
 * @returns ValidationResult with score and messages
 */
export function validateBiodataContent(
  data: DynamicBiodataData,
  language: Language
): ValidationResult {
  const warnings: string[] = [];
  const suggestions: string[] = [];
  let score = 0;

  const getText = (en: string, hi: string, mr: string) => {
    if (language === 'hi') return hi;
    if (language === 'mr') return mr;
    return en;
  };

  // Check name (20 points)
  const hasName = data.name?.trim() || data.nameMarathi?.trim();
  if (hasName) {
    score += 20;
  } else {
    warnings.push(getText(
      'Name is missing',
      'नाम नहीं है',
      'नाव भरलेले नाही'
    ));
  }

  // Check photo (10 points)
  if (data.photo && data.showPhoto !== false) {
    score += 10;
  } else {
    suggestions.push(getText(
      'Adding a photo makes your biodata more personal',
      'फोटो जोड़ने से आपका बायोडाटा अधिक व्यक्तिगत बनता है',
      'फोटो जोडल्याने तुमचा बायोडाटा अधिक वैयक्तिक बनतो'
    ));
  }

  // Check sections (50 points max)
  const visibleSections = data.sections.filter(s => !s.hidden);
  const sectionsWithContent = visibleSections.filter(s => {
    const visibleAttrs = s.attributes.filter(a => !a.hidden);
    return visibleAttrs.some(a => a.value?.trim() || a.valueMarathi?.trim());
  });

  if (sectionsWithContent.length >= 3) {
    score += 50;
  } else if (sectionsWithContent.length === 2) {
    score += 35;
    suggestions.push(getText(
      'Consider adding more sections for a complete biodata',
      'पूर्ण बायोडाटा के लिए और अधिक अनुभाग जोड़ने पर विचार करें',
      'संपूर्ण बायोडाटासाठी अधिक विभाग जोडण्याचा विचार करा'
    ));
  } else if (sectionsWithContent.length === 1) {
    score += 20;
    warnings.push(getText(
      'Your biodata has very little content',
      'आपके बायोडाटा में बहुत कम सामग्री है',
      'तुमच्या बायोडाटामध्ये खूप कमी माहिती आहे'
    ));
  } else {
    warnings.push(getText(
      'Your biodata is empty',
      'आपका बायोडाटा खाली है',
      'तुमचा बायोडाटा रिकामा आहे'
    ));
  }

  // Check total attributes with values (20 points max)
  const totalFilledAttributes = visibleSections.reduce((count, section) => {
    const visibleAttrs = section.attributes.filter(a => !a.hidden);
    return count + visibleAttrs.filter(a => a.value?.trim() || a.valueMarathi?.trim()).length;
  }, 0);

  if (totalFilledAttributes >= 10) {
    score += 20;
  } else if (totalFilledAttributes >= 5) {
    score += 12;
  } else if (totalFilledAttributes >= 2) {
    score += 6;
  }

  // Determine if biodata is complete enough
  const isComplete: boolean = score >= 40 && !!hasName && sectionsWithContent.length > 0;

  return {
    isComplete,
    score: Math.min(score, 100),
    warnings,
    suggestions,
  };
}

/**
 * Gets validation message based on score
 */
export function getValidationMessage(
  result: ValidationResult,
  language: Language
): { title: string; message: string; type: 'warning' | 'info' } {
  const getText = (en: string, hi: string, mr: string) => {
    if (language === 'hi') return hi;
    if (language === 'mr') return mr;
    return en;
  };

  if (result.warnings.length > 0) {
    return {
      type: 'warning',
      title: getText('Incomplete Biodata', 'अपूर्ण बायोडाटा', 'अपूर्ण बायोडाटा'),
      message: result.warnings[0] + (result.warnings.length > 1
        ? getText(` (+${result.warnings.length - 1} more)`, ` (+${result.warnings.length - 1} और)`, ` (+${result.warnings.length - 1} अधिक)`)
        : ''),
    };
  }

  if (result.suggestions.length > 0) {
    return {
      type: 'info',
      title: getText('Tip', 'सुझाव', 'टिप'),
      message: result.suggestions[0],
    };
  }

  return {
    type: 'info',
    title: getText('Ready!', 'तैयार!', 'तयार!'),
    message: getText('Your biodata looks complete.', 'आपका बायोडाटा पूर्ण दिखता है।', 'तुमचा बायोडाटा संपूर्ण दिसतो.'),
  };
}

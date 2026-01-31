import { DynamicBiodataData, BiodataSection, BiodataAttribute } from './types';

// List of sensitive attribute IDs that should be redacted for private sharing
const SENSITIVE_ATTRIBUTE_IDS = [
  // Contact details
  'mobile_number',
  'alternate_mobile',
  'whatsapp_number',
  'email',
  'father_contact',
  'mother_contact',
  'reference_contact',
  // Address details
  'current_address',
  'permanent_address',
  'pincode',
  // Income details
  'annual_income',
  'monthly_income',
  'family_income',
];

// Section title IDs that typically contain sensitive info
const SENSITIVE_SECTION_TITLE_IDS = [
  'contact_details',
  'contact_address',
  'address',
];

/**
 * Creates a redacted version of biodata for private sharing
 * Removes sensitive fields like contact numbers, email, address, and income
 */
export function createRedactedBiodata(data: DynamicBiodataData): DynamicBiodataData {
  const redactedSections: BiodataSection[] = data.sections
    .filter(section => !SENSITIVE_SECTION_TITLE_IDS.includes(section.titleId))
    .map(section => ({
      ...section,
      attributes: section.attributes.filter(
        attr => !SENSITIVE_ATTRIBUTE_IDS.includes(attr.attributeId)
      ),
    }))
    .filter(section => section.attributes.length > 0); // Remove empty sections

  return {
    ...data,
    sections: redactedSections,
    // Also remove photo gallery URL for privacy
    photoGalleryUrl: '',
    showPhotoGalleryQR: false,
  };
}

/**
 * Get list of what will be hidden in private share mode
 */
export function getRedactedFieldNames(language: 'en' | 'hi' | 'mr' = 'en'): string[] {
  const fields = {
    en: ['Phone numbers', 'Email', 'Address', 'Pincode', 'Income details', 'Photo Gallery QR'],
    hi: ['फोन नंबर', 'ई-मेल', 'पता', 'पिनकोड', 'आय विवरण', 'फोटो गैलरी QR'],
    mr: ['फोन नंबर', 'ई-मेल', 'पत्ता', 'पिनकोड', 'उत्पन्न तपशील', 'फोटो गॅलरी QR'],
  };
  return fields[language];
}

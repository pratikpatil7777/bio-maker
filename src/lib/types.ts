// Dynamic Biodata Data Model
// This structure allows users to build their biodata from scratch
// by selecting titles (sections) and attributes (fields) dynamically

// Re-export Language from translations for type compatibility
export { type Language } from './translations';

// A single attribute within a section
export interface BiodataAttribute {
  id: string;           // Unique identifier for this attribute instance
  attributeId: string;  // Reference to attribute from collections (e.g., 'date_of_birth')
  value: string;        // English value
  valueMarathi: string; // Marathi value
  valueHindi?: string;  // Hindi value
  // For custom attributes (when user types their own label)
  customLabel?: string;
  customLabelMarathi?: string;
  customLabelHindi?: string;
  // Visibility control
  hidden?: boolean;     // If true, field is hidden in view/export mode
}

// A section in the biodata (e.g., "Personal Details", "Education")
export interface BiodataSection {
  id: string;           // Unique identifier for this section instance
  titleId: string;      // Reference to title from collections (e.g., 'personal_details')
  // For custom titles (when user types their own title)
  customTitle?: string;
  customTitleMarathi?: string;
  customTitleHindi?: string;
  attributes: BiodataAttribute[];
  // Visibility control
  hidden?: boolean;     // If true, entire section is hidden in view/export mode
}

// The main biodata structure
export interface DynamicBiodataData {
  // Profile
  name: string;
  nameMarathi: string;
  nameHindi?: string;

  // Photo
  photo: string;  // base64 encoded image
  showPhoto: boolean;

  // Photo Gallery (external link + QR)
  photoGalleryUrl: string;
  showPhotoGalleryQR: boolean;

  // Theme & Style
  themeId: string;
  borderId: string;

  // Dynamic sections - user can add/remove/reorder
  sections: BiodataSection[];

  // Metadata
  createdAt: string;
  updatedAt: string;
}

// Empty state for new biodata
export const createEmptyBiodata = (): DynamicBiodataData => ({
  name: '',
  nameMarathi: '',
  photo: '',
  showPhoto: true,
  photoGalleryUrl: '',
  showPhotoGalleryQR: false,
  themeId: 'gold',
  borderId: 'classic',
  sections: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

// Helper to generate unique IDs
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Helper to create a new section
export const createSection = (titleId: string): BiodataSection => ({
  id: generateId(),
  titleId,
  attributes: [],
});

// Helper to create a new attribute
export const createAttribute = (attributeId: string): BiodataAttribute => ({
  id: generateId(),
  attributeId,
  value: '',
  valueMarathi: '',
});

// Backup/Export format
export interface BiodataBackup {
  version: string;
  exportDate: string;
  data: DynamicBiodataData;
}

// For converting old format to new format (migration helper)
export interface LegacyBiodataData {
  personal: {
    name: string;
    nameMarathi: string;
    dateOfBirth: string;
    dateOfBirthMarathi: string;
    timeOfBirth: string;
    placeOfBirth: string;
    placeOfBirthMarathi: string;
    height: string;
    heightMarathi: string;
    complexion: string;
    complexionMarathi: string;
    bloodGroup: string;
    rashi: string;
    rashiMarathi: string;
    nakshatra: string;
    nakshatraMarathi: string;
    gotra: string;
    gotraMarathi: string;
  };
  education: Array<{
    degree: string;
    degreeMarathi: string;
    institution: string;
    institutionMarathi: string;
  }>;
  professional: {
    occupation: string;
    occupationMarathi: string;
    company: string;
    companyMarathi: string;
    workLocation: string;
    workLocationMarathi: string;
    visaStatus: string;
    visaStatusMarathi: string;
    annualIncome: string;
    annualIncomeMarathi: string;
  };
  family: {
    nativePlace: string;
    nativePlaceMarathi: string;
    grandfatherName: string;
    grandfatherNameMarathi: string;
    fatherName: string;
    fatherNameMarathi: string;
    fatherOccupation: string;
    fatherOccupationMarathi: string;
    fatherContact: string;
    motherName: string;
    motherNameMarathi: string;
    motherOccupation: string;
    motherOccupationMarathi: string;
  };
  siblings: Array<{
    relation: string;
    relationMarathi: string;
    name: string;
    nameMarathi: string;
    occupation: string;
    occupationMarathi: string;
    spouseName: string;
    spouseNameMarathi: string;
    spouseOccupation: string;
    spouseOccupationMarathi: string;
  }>;
  extendedFamily: {
    uncleName: string;
    uncleNameMarathi: string;
    uncleLocation: string;
    uncleLocationMarathi: string;
  };
  maternal: {
    nativePlace: string;
    nativePlaceMarathi: string;
    grandfatherName: string;
    grandfatherNameMarathi: string;
    uncles: Array<{
      name: string;
      nameMarathi: string;
      location: string;
      locationMarathi: string;
    }>;
  };
  assets: {
    farmLand: string;
    farmLandMarathi: string;
    additionalAssets: string;
    additionalAssetsMarathi: string;
  };
  contact: {
    fatherMobile: string;
    email: string;
    currentResidence: string;
    currentResidenceMarathi: string;
  };
  photos: {
    mainPhoto: string;
    galleryPhotos: string[];
  };
  photoGallery: {
    url: string;
    showQR: boolean;
  };
}

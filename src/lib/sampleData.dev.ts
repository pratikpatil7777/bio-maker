/**
 * DEVELOPER SAMPLE DATA
 * This file contains sample biodata for development and testing purposes.
 * This data belongs to Pratik Ravindra Patil and is used only for testing.
 *
 * In production, users will create their own biodata from scratch.
 * To use this data for testing, import and use the loadSampleData() function.
 */

import { DynamicBiodataData, generateId } from './types';

// Sample biodata in the new dynamic format
export const sampleBiodataData: DynamicBiodataData = {
  name: 'Pratik Ravindra Patil',
  nameMarathi: 'प्रतीक रविंद्र पाटील',
  photo: '', // Add base64 photo data if needed
  showPhoto: true,
  photoGalleryUrl: 'https://drive.google.com/drive/folders/1TA0MJt6jao4V4whHBg0A5ULpk8HWitXX?ths=true',
  showPhotoGalleryQR: true,
  themeId: 'gold',
  borderId: 'classic',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: new Date().toISOString(),

  sections: [
    // Personal Details Section
    {
      id: 'section-personal',
      titleId: 'personal_details',
      attributes: [
        {
          id: 'attr-dob',
          attributeId: 'date_of_birth',
          value: '28 May 1996',
          valueMarathi: '२८ मे १९९६',
        },
        {
          id: 'attr-tob',
          attributeId: 'time_of_birth',
          value: '12:25 PM',
          valueMarathi: 'दुपारी १२:२५',
        },
        {
          id: 'attr-pob',
          attributeId: 'place_of_birth',
          value: 'Dhule, Maharashtra',
          valueMarathi: 'धुळे, महाराष्ट्र',
        },
        {
          id: 'attr-height',
          attributeId: 'height',
          value: '5 feet 8 inches',
          valueMarathi: '५ फूट ८ इंच',
        },
        {
          id: 'attr-complexion',
          attributeId: 'complexion',
          value: 'Fair',
          valueMarathi: 'गोरा',
        },
      ],
    },

    // Education & Career Section
    {
      id: 'section-education',
      titleId: 'education_career',
      attributes: [
        {
          id: 'attr-edu-1',
          attributeId: 'degree',
          value: 'BE (Information Technology) - Sinhgad Institute of Technology, Pune (2018)',
          valueMarathi: 'बी.ई. (माहिती तंत्रज्ञान) - सिंहगड इन्स्टिट्यूट ऑफ टेक्नॉलॉजी, पुणे (२०१८)',
        },
        {
          id: 'attr-edu-2',
          attributeId: 'degree',
          value: 'MS (Computer Science) - Stevens Institute of Technology, NJ, USA (2022)',
          valueMarathi: 'एम.एस. (संगणक शास्त्र) - स्टीव्हन्स इन्स्टिट्यूट ऑफ टेक्नॉलॉजी, न्यू जर्सी, अमेरिका (२०२२)',
        },
        {
          id: 'attr-occupation',
          attributeId: 'occupation',
          value: 'Software Engineer, BDIPlus inc., NYC, New York, USA',
          valueMarathi: 'सॉफ्टवेअर इंजिनिअर, बीडीआयप्लस इंक., न्यूयॉर्क, अमेरिका',
        },
        {
          id: 'attr-visa',
          attributeId: 'visa_status',
          value: 'H-1B (USA)',
          valueMarathi: 'H-1B (अमेरिका)',
        },
        {
          id: 'attr-income',
          attributeId: 'annual_income',
          value: '₹95 Lakhs',
          valueMarathi: '₹९५ लाख',
        },
      ],
    },

    // Family Details Section
    {
      id: 'section-family',
      titleId: 'family_details',
      attributes: [
        {
          id: 'attr-native',
          attributeId: 'native_place',
          value: 'Vidyavihar, Mohide T.H., Shahada, Nandurbar',
          valueMarathi: 'विद्याविहार, मोहिदे त.ह., शहादा, नंदुरबार',
        },
        {
          id: 'attr-grandfather',
          attributeId: 'grandfather_name',
          value: 'Late Mr. Shamrao Bhau Patil',
          valueMarathi: 'कै. श्री शामराव भाऊ पाटील',
        },
        {
          id: 'attr-father',
          attributeId: 'father_name',
          value: 'Dr. Ravindra Shamrao Patil',
          valueMarathi: 'डॉ. रविंद्र शामराव पाटील',
        },
        {
          id: 'attr-father-contact',
          attributeId: 'father_contact',
          value: '+91 9422230857',
          valueMarathi: '+९१ ९४२२२३०८५७',
        },
        {
          id: 'attr-mother',
          attributeId: 'mother_name',
          value: 'Mrs. Kamal Ravindra Patil',
          valueMarathi: 'श्रीमती कमल रविंद्र पाटील',
        },
        {
          id: 'attr-mother-occ',
          attributeId: 'mother_occupation',
          value: 'Homemaker',
          valueMarathi: 'गृहिणी',
        },
      ],
    },

    // Siblings Section
    {
      id: 'section-siblings',
      titleId: 'siblings',
      attributes: [
        {
          id: 'attr-sis-1',
          attributeId: 'sibling_details',
          value: 'Elder Sister: Dr. Varsha Dinesh Patil (BAMS), Husband: Dr. Dinesh Badhu Patil (BDS)',
          valueMarathi: 'मोठी बहीण: डॉ. वर्षा दिनेश पाटील (बी.ए.एम.एस.), पती: डॉ. दिनेश बधु पाटील (बी.डी.एस.)',
        },
        {
          id: 'attr-sis-2',
          attributeId: 'sibling_details',
          value: 'Elder Sister: Mrs. Shraddha Suntosh Dalvi (Data Analyst, TCS), Husband: Mr. Suntosh Nandkumar Dalvi (Union Gen. Secretary, Tata Motors)',
          valueMarathi: 'मोठी बहीण: श्रीमती श्रद्धा संतोष दळवी (डेटा विश्लेषक, टी.सी.एस.), पती: श्री संतोष नंदकुमार दळवी (युनियन जन. सेक्रेटरी, टाटा मोटर्स)',
        },
      ],
    },

    // Extended Family Section
    {
      id: 'section-extended',
      titleId: 'extended_family',
      attributes: [
        {
          id: 'attr-uncle',
          attributeId: 'uncle_name',
          value: 'Mr. Anil Shamrao Patil',
          valueMarathi: 'श्री अनिल शामराव पाटील',
        },
        {
          id: 'attr-uncle-loc',
          attributeId: 'uncle_location',
          value: 'Ahmedabad',
          valueMarathi: 'अहमदाबाद',
        },
      ],
    },

    // Maternal Details Section
    {
      id: 'section-maternal',
      titleId: 'maternal_details',
      attributes: [
        {
          id: 'attr-mat-native',
          attributeId: 'maternal_native',
          value: 'Bharwade, Tal: Shirpur, Dist: Dhule',
          valueMarathi: 'भरवाडे, ता: शिरपूर, जि: धुळे',
        },
        {
          id: 'attr-mat-gf',
          attributeId: 'maternal_grandfather',
          value: 'Late Mr. Dattatray Nandram Patel',
          valueMarathi: 'कै. श्री दत्तात्रय नंदराम पटेल',
        },
        {
          id: 'attr-mama-1',
          attributeId: 'maternal_uncle_name',
          value: 'Mr. Ashok Dattatray Patel (Dhule)',
          valueMarathi: 'श्री अशोक दत्तात्रय पटेल (धुळे)',
        },
        {
          id: 'attr-mama-2',
          attributeId: 'maternal_uncle_name',
          value: 'Mr. Dilip Dattatray Patel (Nandurbar)',
          valueMarathi: 'श्री दिलीप दत्तात्रय पटेल (नंदुरबार)',
        },
      ],
    },

    // Assets Section
    {
      id: 'section-assets',
      titleId: 'assets_property',
      attributes: [
        {
          id: 'attr-farm',
          attributeId: 'farm_land',
          value: '8 Acres',
          valueMarathi: '८ एकर',
        },
        {
          id: 'attr-prop',
          attributeId: 'property_details',
          value: 'Residential plots in Shahada & Nandurbar, Maharashtra',
          valueMarathi: 'निवासी भूखंड शहादा आणि नंदुरबार, महाराष्ट्र',
        },
      ],
    },

    // Contact Section
    {
      id: 'section-contact',
      titleId: 'contact_details',
      attributes: [
        {
          id: 'attr-contact-mobile',
          attributeId: 'mobile_number',
          value: '+91 9422230857',
          valueMarathi: '+९१ ९४२२२३०८५७',
        },
        {
          id: 'attr-residence',
          attributeId: 'current_address',
          value: 'Jersey City, NJ, USA',
          valueMarathi: 'जर्सी सिटी, न्यू जर्सी, अमेरिका',
        },
      ],
    },
  ],
};

/**
 * Load sample data for development/testing
 * This creates a fresh copy with new IDs to avoid conflicts
 */
export const loadSampleData = (): DynamicBiodataData => {
  // Create a deep copy with fresh IDs
  const data: DynamicBiodataData = {
    ...sampleBiodataData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sections: sampleBiodataData.sections.map(section => ({
      ...section,
      id: generateId(),
      attributes: section.attributes.map(attr => ({
        ...attr,
        id: generateId(),
      })),
    })),
  };

  return data;
};

/**
 * Check if running in development mode
 */
export const isDev = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

/**
 * REFERENCE BIODATA TEMPLATE
 *
 * This is a sample biodata that users can use as a starting point.
 * Users can review this template and modify it to create their own biodata.
 *
 * All values are examples - users should replace with their own information.
 */

import { DynamicBiodataData, generateId } from './types';

// Reference template biodata
export const templateBiodata: DynamicBiodataData = {
  name: 'Shri Ramesh Kumar Sharma',
  nameMarathi: 'श्री रमेश कुमार शर्मा',
  nameHindi: 'श्री रमेश कुमार शर्मा',
  photo: '',
  showPhoto: true,
  photoGalleryUrl: '',
  showPhotoGalleryQR: false,
  themeId: 'gold',
  borderId: 'classic',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),

  sections: [
    // Personal Details Section
    {
      id: 'tpl-personal',
      titleId: 'personal_details',
      attributes: [
        {
          id: 'tpl-dob',
          attributeId: 'date_of_birth',
          value: '15 August 1995',
          valueMarathi: '१५ ऑगस्ट १९९५',
          valueHindi: '१५ अगस्त १९९५',
        },
        {
          id: 'tpl-tob',
          attributeId: 'time_of_birth',
          value: '10:30 AM',
          valueMarathi: 'सकाळी १०:३०',
          valueHindi: 'सुबह १०:३०',
        },
        {
          id: 'tpl-pob',
          attributeId: 'place_of_birth',
          value: 'Pune, Maharashtra',
          valueMarathi: 'पुणे, महाराष्ट्र',
          valueHindi: 'पुणे, महाराष्ट्र',
        },
        {
          id: 'tpl-height',
          attributeId: 'height',
          value: '5 feet 10 inches',
          valueMarathi: '५ फूट १० इंच',
          valueHindi: '५ फुट १० इंच',
        },
        {
          id: 'tpl-complexion',
          attributeId: 'complexion',
          value: 'Wheatish',
          valueMarathi: 'सावळा',
          valueHindi: 'गेहुआं',
        },
        {
          id: 'tpl-blood',
          attributeId: 'blood_group',
          value: 'B+',
          valueMarathi: 'B+',
          valueHindi: 'B+',
        },
      ],
    },

    // Astrological Details Section
    {
      id: 'tpl-astro',
      titleId: 'astrological_details',
      attributes: [
        {
          id: 'tpl-rashi',
          attributeId: 'rashi',
          value: 'Taurus (Vrishabh)',
          valueMarathi: 'वृषभ',
          valueHindi: 'वृषभ',
        },
        {
          id: 'tpl-nakshatra',
          attributeId: 'nakshatra',
          value: 'Rohini',
          valueMarathi: 'रोहिणी',
          valueHindi: 'रोहिणी',
        },
        {
          id: 'tpl-gotra',
          attributeId: 'gotra',
          value: 'Kashyap',
          valueMarathi: 'कश्यप',
          valueHindi: 'कश्यप',
        },
        {
          id: 'tpl-manglik',
          attributeId: 'manglik',
          value: 'No',
          valueMarathi: 'नाही',
          valueHindi: 'नहीं',
        },
      ],
    },

    // Education & Career Section
    {
      id: 'tpl-education',
      titleId: 'education_career',
      attributes: [
        {
          id: 'tpl-edu-1',
          attributeId: 'degree',
          value: 'B.Tech (Computer Science) - IIT Bombay (2017)',
          valueMarathi: 'बी.टेक (संगणक शास्त्र) - आयआयटी मुंबई (२०१७)',
          valueHindi: 'बी.टेक (कंप्यूटर साइंस) - आईआईटी बॉम्बे (२०१७)',
        },
        {
          id: 'tpl-edu-2',
          attributeId: 'degree',
          value: 'MBA (Finance) - IIM Ahmedabad (2019)',
          valueMarathi: 'एमबीए (वित्त) - आयआयएम अहमदाबाद (२०१९)',
          valueHindi: 'एमबीए (वित्त) - आईआईएम अहमदाबाद (२०१९)',
        },
        {
          id: 'tpl-occupation',
          attributeId: 'occupation',
          value: 'Senior Manager',
          valueMarathi: 'वरिष्ठ व्यवस्थापक',
          valueHindi: 'वरिष्ठ प्रबंधक',
        },
        {
          id: 'tpl-company',
          attributeId: 'company',
          value: 'Tata Consultancy Services, Mumbai',
          valueMarathi: 'टाटा कन्सल्टन्सी सर्व्हिसेस, मुंबई',
          valueHindi: 'टाटा कंसल्टेंसी सर्विसेज, मुंबई',
        },
        {
          id: 'tpl-income',
          attributeId: 'annual_income',
          value: '₹25 Lakhs',
          valueMarathi: '₹२५ लाख',
          valueHindi: '₹२५ लाख',
        },
      ],
    },

    // Family Details Section
    {
      id: 'tpl-family',
      titleId: 'family_details',
      attributes: [
        {
          id: 'tpl-native',
          attributeId: 'native_place',
          value: 'Satara, Maharashtra',
          valueMarathi: 'सातारा, महाराष्ट्र',
          valueHindi: 'सातारा, महाराष्ट्र',
        },
        {
          id: 'tpl-father',
          attributeId: 'father_name',
          value: 'Mr. Suresh Kumar Sharma',
          valueMarathi: 'श्री सुरेश कुमार शर्मा',
          valueHindi: 'श्री सुरेश कुमार शर्मा',
        },
        {
          id: 'tpl-father-occ',
          attributeId: 'father_occupation',
          value: 'Retired Government Officer',
          valueMarathi: 'निवृत्त सरकारी अधिकारी',
          valueHindi: 'सेवानिवृत्त सरकारी अधिकारी',
        },
        {
          id: 'tpl-mother',
          attributeId: 'mother_name',
          value: 'Mrs. Sunita Suresh Sharma',
          valueMarathi: 'श्रीमती सुनिता सुरेश शर्मा',
          valueHindi: 'श्रीमती सुनीता सुरेश शर्मा',
        },
        {
          id: 'tpl-mother-occ',
          attributeId: 'mother_occupation',
          value: 'Homemaker',
          valueMarathi: 'गृहिणी',
          valueHindi: 'गृहिणी',
        },
        {
          id: 'tpl-family-type',
          attributeId: 'family_type',
          value: 'Nuclear Family',
          valueMarathi: 'विभक्त कुटुंब',
          valueHindi: 'एकल परिवार',
        },
      ],
    },

    // Siblings Section
    {
      id: 'tpl-siblings',
      titleId: 'siblings',
      attributes: [
        {
          id: 'tpl-bro',
          attributeId: 'brother_name',
          value: 'Mr. Mahesh Sharma (Elder)',
          valueMarathi: 'श्री महेश शर्मा (मोठा)',
          valueHindi: 'श्री महेश शर्मा (बड़े)',
        },
        {
          id: 'tpl-bro-occ',
          attributeId: 'brother_occupation',
          value: 'Doctor, Pune',
          valueMarathi: 'डॉक्टर, पुणे',
          valueHindi: 'डॉक्टर, पुणे',
        },
        {
          id: 'tpl-sis',
          attributeId: 'sister_name',
          value: 'Mrs. Priya Deshmukh (Younger)',
          valueMarathi: 'श्रीमती प्रिया देशमुख (लहान)',
          valueHindi: 'श्रीमती प्रिया देशमुख (छोटी)',
        },
        {
          id: 'tpl-sis-occ',
          attributeId: 'sister_occupation',
          value: 'Teacher, Nashik (Married)',
          valueMarathi: 'शिक्षिका, नाशिक (विवाहित)',
          valueHindi: 'शिक्षिका, नासिक (विवाहित)',
        },
      ],
    },

    // Assets Section
    {
      id: 'tpl-assets',
      titleId: 'assets_property',
      attributes: [
        {
          id: 'tpl-house',
          attributeId: 'own_house',
          value: 'Yes - 3BHK Flat in Pune',
          valueMarathi: 'होय - ३बीएचके फ्लॅट पुण्यात',
          valueHindi: 'हाँ - ३बीएचके फ्लैट पुणे में',
        },
        {
          id: 'tpl-farm',
          attributeId: 'agricultural_land',
          value: '5 Acres in Satara',
          valueMarathi: '५ एकर सातारा येथे',
          valueHindi: '५ एकड़ सातारा में',
        },
        {
          id: 'tpl-vehicle',
          attributeId: 'vehicle',
          value: 'Car (Honda City)',
          valueMarathi: 'कार (होंडा सिटी)',
          valueHindi: 'कार (होंडा सिटी)',
        },
      ],
    },

    // Contact Section
    {
      id: 'tpl-contact',
      titleId: 'contact_details',
      attributes: [
        {
          id: 'tpl-mobile',
          attributeId: 'mobile_number',
          value: '+91 98765 43210',
          valueMarathi: '+९१ ९८७६५ ४३२१०',
          valueHindi: '+९१ ९८७६५ ४३२१०',
        },
        {
          id: 'tpl-email',
          attributeId: 'email',
          value: 'ramesh.sharma@email.com',
          valueMarathi: 'ramesh.sharma@email.com',
          valueHindi: 'ramesh.sharma@email.com',
        },
        {
          id: 'tpl-address',
          attributeId: 'current_address',
          value: 'Flat 401, Green Valley Apartments, Kothrud, Pune - 411038',
          valueMarathi: 'फ्लॅट ४०१, ग्रीन व्हॅली अपार्टमेंट्स, कोथरूड, पुणे - ४११०३८',
          valueHindi: 'फ्लैट ४०१, ग्रीन वैली अपार्टमेंट्स, कोथरूड, पुणे - ४११०३८',
        },
      ],
    },
  ],
};

/**
 * Load template data with fresh IDs
 * Creates a copy of the template with new unique IDs to avoid conflicts
 */
export const loadTemplateData = (): DynamicBiodataData => {
  const now = new Date().toISOString();

  return {
    ...templateBiodata,
    createdAt: now,
    updatedAt: now,
    sections: templateBiodata.sections.map(section => ({
      ...section,
      id: generateId(),
      attributes: section.attributes.map(attr => ({
        ...attr,
        id: generateId(),
      })),
    })),
  };
};

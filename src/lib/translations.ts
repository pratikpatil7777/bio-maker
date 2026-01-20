export const translations = {
  en: {
    // Header
    shriGaneshaya: "|| Shri Ganeshaya Namah ||",
    biodata: "BIODATA",

    // Section titles
    personalDetails: "Personal Details",
    familyDetails: "Family Details",
    education: "Education",
    professionalDetails: "Professional Details",
    educationAndCareer: "Education & Career",
    siblings: "Siblings",
    extendedFamily: "Extended Family",
    maternalDetails: "Maternal Details",
    familyAssets: "Family Assets",
    contactDetails: "Contact Details",

    // Personal details labels
    name: "Name",
    dateOfBirth: "Date of Birth",
    timeOfBirth: "Time of Birth",
    placeOfBirth: "Place of Birth",
    height: "Height",
    complexion: "Complexion",
    bloodGroup: "Blood Group",
    rashi: "Rashi (Moon Sign)",
    nakshatra: "Nakshatra",
    gotra: "Gotra",

    // Education labels
    degree: "Degree",
    institution: "Institution",

    // Professional labels
    occupation: "Occupation",
    company: "Company",
    workLocation: "Work Location",
    visaStatus: "Visa Status",
    annualIncome: "Annual Income",

    // Family labels
    nativePlace: "Native Place",
    grandfatherName: "Grandfather's Name",
    fatherName: "Father's Name",
    fatherOccupation: "Father's Occupation",
    fatherContact: "Father's Contact",
    motherName: "Mother's Name",
    motherOccupation: "Mother's Occupation",

    // Sibling labels
    elderSister: "Elder Sister",
    siblingName: "Name",
    siblingOccupation: "Occupation",
    spouseName: "Husband",
    spouseOccupation: "Spouse's Occupation",

    // Extended family
    uncleName: "Uncle's Name",

    // Maternal labels
    maternalNativePlace: "Native Place",
    maternalGrandfatherName: "Grandfather's Name",
    maternalUncleName: "Uncle's Name",

    // Assets
    farmLand: "Farm Land",
    realEstate: "Real Estate",

    // Contact
    mobile: "Mobile",
    email: "Email",
    currentResidence: "Current Residence",

    // Footer
    thankYou: "Thank You",
    krishnaFooter: "|| Shri Krishnarpanamastu ||",

    // Actions
    downloadPDF: "Download PDF",
    editMode: "Edit Mode",
    resetToDefault: "Reset to Default",

    // Language
    language: "Language",
    english: "English",
    marathi: "Marathi",
  },

  mr: {
    // Header
    shriGaneshaya: "|| श्री गणेशाय नमः ||",
    biodata: "बायोडाटा",

    // Section titles
    personalDetails: "वैयक्तिक माहिती",
    familyDetails: "कौटुंबिक माहिती",
    education: "शिक्षण",
    professionalDetails: "व्यावसायिक माहिती",
    educationAndCareer: "शिक्षण व व्यवसाय",
    siblings: "भावंडे",
    extendedFamily: "विस्तारित कुटुंब",
    maternalDetails: "मातृपक्ष माहिती",
    familyAssets: "कौटुंबिक मालमत्ता",
    contactDetails: "संपर्क माहिती",

    // Personal details labels
    name: "नाव",
    dateOfBirth: "जन्मतारीख",
    timeOfBirth: "जन्मवेळ",
    placeOfBirth: "जन्मस्थळ",
    height: "उंची",
    complexion: "वर्ण",
    bloodGroup: "रक्तगट",
    rashi: "राशी",
    nakshatra: "नक्षत्र",
    gotra: "गोत्र",

    // Education labels
    degree: "पदवी",
    institution: "संस्था",

    // Professional labels
    occupation: "व्यवसाय",
    company: "कंपनी",
    workLocation: "कार्यस्थळ",
    visaStatus: "व्हिसा स्थिती",
    annualIncome: "वार्षिक उत्पन्न",

    // Family labels
    nativePlace: "मूळ गाव",
    grandfatherName: "आजोबांचे नाव",
    fatherName: "वडिलांचे नाव",
    fatherOccupation: "वडिलांचा व्यवसाय",
    fatherContact: "वडिलांचा संपर्क",
    motherName: "आईचे नाव",
    motherOccupation: "आईचा व्यवसाय",

    // Sibling labels
    elderSister: "मोठी बहीण",
    siblingName: "नाव",
    siblingOccupation: "व्यवसाय",
    spouseName: "पती",
    spouseOccupation: "पती/पत्नी व्यवसाय",

    // Extended family
    uncleName: "काकांचे नाव",

    // Maternal labels
    maternalNativePlace: "मूळ गाव",
    maternalGrandfatherName: "आजोबांचे नाव",
    maternalUncleName: "मामांचे नाव",

    // Assets
    farmLand: "शेतजमीन",
    realEstate: "स्थावर मालमत्ता",

    // Contact
    mobile: "मोबाईल",
    email: "ईमेल",
    currentResidence: "सध्याचा पत्ता",

    // Footer
    thankYou: "धन्यवाद",
    krishnaFooter: "|| श्री कृष्णार्पणमस्तु ||",

    // Actions
    downloadPDF: "PDF डाउनलोड करा",
    editMode: "संपादन मोड",
    resetToDefault: "मूळ स्थितीत परत",

    // Language
    language: "भाषा",
    english: "इंग्रजी",
    marathi: "मराठी",
  }
};

export type Language = 'en' | 'mr';
export type TranslationKey = keyof typeof translations.en;

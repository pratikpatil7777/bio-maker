export interface BiodataData {
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

export const defaultData: BiodataData = {
  personal: {
    name: "Pratik Ravindra Patil",
    nameMarathi: "प्रतीक रविंद्र पाटील",
    dateOfBirth: "28 May 1996",
    dateOfBirthMarathi: "२८ मे १९९६",
    timeOfBirth: "12:25 PM",
    placeOfBirth: "Dhule, Maharashtra",
    placeOfBirthMarathi: "धुळे, महाराष्ट्र",
    height: "5 feet 8 inches",
    heightMarathi: "५ फूट ८ इंच",
    complexion: "Fair",
    complexionMarathi: "गोरा",
    bloodGroup: "",
    rashi: "",
    rashiMarathi: "",
    nakshatra: "",
    nakshatraMarathi: "",
    gotra: "",
    gotraMarathi: "",
  },
  education: [
    {
      degree: "BE (Information Technology)",
      degreeMarathi: "बी.ई. (माहिती तंत्रज्ञान)",
      institution: "Sinhgad Institute of Technology, Pune (2018)",
      institutionMarathi: "सिंहगड इन्स्टिट्यूट ऑफ टेक्नॉलॉजी, पुणे (२०१८)",
    },
    {
      degree: "MS (Computer Science)",
      degreeMarathi: "एम.एस. (संगणक शास्त्र)",
      institution: "Stevens Institute of Technology, NJ, USA (2022)",
      institutionMarathi: "स्टीव्हन्स इन्स्टिट्यूट ऑफ टेक्नॉलॉजी, न्यू जर्सी, अमेरिका (२०२२)",
    },
  ],
  professional: {
    occupation: "Software Engineer, BDIPlus inc., NYC, New York, USA",
    occupationMarathi: "सॉफ्टवेअर इंजिनिअर, बीडीआयप्लस इंक., न्यूयॉर्क, अमेरिका",
    company: "",
    companyMarathi: "",
    workLocation: "",
    workLocationMarathi: "",
    visaStatus: "H-1B (USA)",
    visaStatusMarathi: "H-1B (अमेरिका)",
    annualIncome: "₹95 Lakhs",
    annualIncomeMarathi: "₹९५ लाख",
  },
  family: {
    nativePlace: "Vidyavihar, Mohide T.H., Shahada, Nandurbar",
    nativePlaceMarathi: "विद्याविहार, मोहिदे त.ह., शहादा, नंदुरबार",
    grandfatherName: "Late Mr. Shamrao Bhau Patil",
    grandfatherNameMarathi: "कै. श्री शामराव भाऊ पाटील",
    fatherName: "Dr. Ravindra Shamrao Patil",
    fatherNameMarathi: "डॉ. रविंद्र शामराव पाटील",
    fatherOccupation: "",
    fatherOccupationMarathi: "",
    fatherContact: "+91 9422230857",
    motherName: "Mrs. Kamal Ravindra Patil",
    motherNameMarathi: "श्रीमती कमल रविंद्र पाटील",
    motherOccupation: "Homemaker",
    motherOccupationMarathi: "गृहिणी",
  },
  siblings: [
    {
      relation: "Elder Sister",
      relationMarathi: "मोठी बहीण",
      name: "Dr. Varsha Dinesh Patil (BAMS)",
      nameMarathi: "डॉ. वर्षा दिनेश पाटील (बी.ए.एम.एस.)",
      occupation: "",
      occupationMarathi: "",
      spouseName: "Dr. Dinesh Badhu Patil (BDS)",
      spouseNameMarathi: "डॉ. दिनेश बधु पाटील (बी.डी.एस.)",
      spouseOccupation: "",
      spouseOccupationMarathi: "",
    },
    {
      relation: "Elder Sister",
      relationMarathi: "मोठी बहीण",
      name: "Mrs. Shraddha Suntosh Dalvi",
      nameMarathi: "श्रीमती श्रद्धा संतोष दळवी",
      occupation: "Data Analyst (TCS)",
      occupationMarathi: "डेटा विश्लेषक (टी.सी.एस.)",
      spouseName: "Mr. Suntosh Nandkumar Dalvi, Union Gen. Secretary (Tata Motors)",
      spouseNameMarathi: "श्री संतोष नंदकुमार दळवी, युनियन जन. सेक्रेटरी (टाटा मोटर्स)",
      spouseOccupation: "",
      spouseOccupationMarathi: "",
    },
  ],
  extendedFamily: {
    uncleName: "Mr. Anil Shamrao Patil",
    uncleNameMarathi: "श्री अनिल शामराव पाटील",
    uncleLocation: "Ahmedabad",
    uncleLocationMarathi: "अहमदाबाद",
  },
  maternal: {
    nativePlace: "Bharwade, Tal: Shirpur, Dist: Dhule",
    nativePlaceMarathi: "भरवाडे, ता: शिरपूर, जि: धुळे",
    grandfatherName: "Late Mr. Dattatray Nandram Patel",
    grandfatherNameMarathi: "कै. श्री दत्तात्रय नंदराम पटेल",
    uncles: [
      {
        name: "Mr. Ashok Dattatray Patel",
        nameMarathi: "श्री अशोक दत्तात्रय पटेल",
        location: "Dhule",
        locationMarathi: "धुळे",
      },
      {
        name: "Mr. Dilip Dattatray Patel",
        nameMarathi: "श्री दिलीप दत्तात्रय पटेल",
        location: "Nandurbar",
        locationMarathi: "नंदुरबार",
      },
    ],
  },
  assets: {
    farmLand: "8 Acres",
    farmLandMarathi: "८ एकर",
    additionalAssets: "Residential plots in Shahada & Nandurbar, Maharashtra",
    additionalAssetsMarathi: "निवासी भूखंड शहादा आणि नंदुरबार, महाराष्ट्र",
  },
  contact: {
    fatherMobile: "+91 9422230857",
    email: "",
    currentResidence: "Jersey City, NJ, USA",
    currentResidenceMarathi: "जर्सी सिटी, न्यू जर्सी, अमेरिका",
  },
  photos: {
    mainPhoto: "",
    galleryPhotos: [],
  },
  photoGallery: {
    url: "https://drive.google.com/file/d/1K9Mn5bnkYyXDYoVKD9xHkVAY_baGV0qE/view?usp=sharing",
    showQR: true,
  },
};

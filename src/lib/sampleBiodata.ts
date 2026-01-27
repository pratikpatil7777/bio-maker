import { DynamicBiodataData } from './types';

/**
 * Sample biodata for Pratik Ravindra Patil
 * This can be loaded as a template or for testing
 */
export const sampleBiodataPratik: DynamicBiodataData = {
  name: "Pratik Ravindra Patil",
  nameMarathi: "प्रतीक रविंद्र पाटील",
  photo: "",
  showPhoto: true,
  photoGalleryUrl: "https://drive.google.com/drive/folders/1TA0MJt6jao4V4whHBg0A5ULpk8HWitXX?ths=true",
  showPhotoGalleryQR: true,
  themeId: "gold",
  borderId: "classic",
  sections: [
    // Personal Details
    {
      id: "section-1",
      titleId: "personal_details",
      attributes: [
        {
          id: "attr-1-1",
          attributeId: "date_of_birth",
          value: "28 May 1996",
          valueMarathi: "२८ मे १९९६"
        },
        {
          id: "attr-1-2",
          attributeId: "time_of_birth",
          value: "12:25 PM",
          valueMarathi: "दुपारी १२:२५"
        },
        {
          id: "attr-1-3",
          attributeId: "place_of_birth",
          value: "Dhule, Maharashtra",
          valueMarathi: "धुळे, महाराष्ट्र"
        },
        {
          id: "attr-1-4",
          attributeId: "height",
          value: "5 feet 8 inches",
          valueMarathi: "५ फूट ८ इंच"
        },
        {
          id: "attr-1-5",
          attributeId: "complexion",
          value: "Fair",
          valueMarathi: "गोरा"
        }
      ]
    },
    // Education
    {
      id: "section-2",
      titleId: "education",
      attributes: [
        {
          id: "attr-2-1",
          attributeId: "degree",
          value: "BE (Information Technology)",
          valueMarathi: "बी.ई. (माहिती तंत्रज्ञान)"
        },
        {
          id: "attr-2-2",
          attributeId: "college_university",
          value: "Sinhgad Institute of Technology, Pune (2018)",
          valueMarathi: "सिंहगड इन्स्टिट्यूट ऑफ टेक्नॉलॉजी, पुणे (२०१८)"
        },
        {
          id: "attr-2-3",
          attributeId: "highest_education",
          value: "MS (Computer Science)",
          valueMarathi: "एम.एस. (संगणक शास्त्र)"
        },
        {
          id: "attr-2-4",
          attributeId: "college_university",
          value: "Stevens Institute of Technology, NJ, USA (2022)",
          valueMarathi: "स्टीव्हन्स इन्स्टिट्यूट ऑफ टेक्नॉलॉजी, न्यू जर्सी, अमेरिका (२०२२)"
        }
      ]
    },
    // Professional Details
    {
      id: "section-3",
      titleId: "professional_details",
      attributes: [
        {
          id: "attr-3-1",
          attributeId: "occupation",
          value: "Software Engineer, BDIPlus inc., NYC, New York, USA",
          valueMarathi: "सॉफ्टवेअर इंजिनिअर, बीडीआयप्लस इंक., न्यूयॉर्क, अमेरिका"
        },
        {
          id: "attr-3-2",
          attributeId: "visa_status",
          value: "H-1B (USA)",
          valueMarathi: "H-1B (अमेरिका)"
        },
        {
          id: "attr-3-3",
          attributeId: "annual_income",
          value: "₹95 Lakhs",
          valueMarathi: "₹९५ लाख"
        }
      ]
    },
    // Family Details
    {
      id: "section-4",
      titleId: "family_details",
      attributes: [
        {
          id: "attr-4-1",
          attributeId: "native_place",
          value: "Vidyavihar, Mohide T.H., Shahada, Nandurbar",
          valueMarathi: "विद्याविहार, मोहिदे त.ह., शहादा, नंदुरबार"
        },
        {
          id: "attr-4-2",
          attributeId: "grandfather_name",
          value: "Late Mr. Shamrao Bhau Patil",
          valueMarathi: "कै. श्री शामराव भाऊ पाटील"
        },
        {
          id: "attr-4-3",
          attributeId: "father_name",
          value: "Dr. Ravindra Shamrao Patil",
          valueMarathi: "डॉ. रविंद्र शामराव पाटील"
        },
        {
          id: "attr-4-4",
          attributeId: "father_contact",
          value: "+91 9422230857",
          valueMarathi: "+९१ ९४२२२३०८५७"
        },
        {
          id: "attr-4-5",
          attributeId: "mother_name",
          value: "Mrs. Kamal Ravindra Patil",
          valueMarathi: "श्रीमती कमल रविंद्र पाटील"
        },
        {
          id: "attr-4-6",
          attributeId: "mother_occupation",
          value: "Homemaker",
          valueMarathi: "गृहिणी"
        }
      ]
    },
    // Siblings
    {
      id: "section-5",
      titleId: "siblings",
      attributes: [
        {
          id: "attr-5-1",
          attributeId: "sister_name",
          value: "Dr. Varsha Dinesh Patil (BAMS)",
          valueMarathi: "डॉ. वर्षा दिनेश पाटील (बी.ए.एम.एस.)",
          customLabel: "Elder Sister",
          customLabelMarathi: "मोठी बहीण"
        },
        {
          id: "attr-5-2",
          attributeId: "custom_field",
          value: "Dr. Dinesh Badhu Patil (BDS)",
          valueMarathi: "डॉ. दिनेश बधु पाटील (बी.डी.एस.)",
          customLabel: "Brother-in-law",
          customLabelMarathi: "जावई"
        },
        {
          id: "attr-5-3",
          attributeId: "sister_name",
          value: "Mrs. Shraddha Suntosh Dalvi, Data Analyst (TCS)",
          valueMarathi: "श्रीमती श्रद्धा संतोष दळवी, डेटा विश्लेषक (टी.सी.एस.)",
          customLabel: "Elder Sister",
          customLabelMarathi: "मोठी बहीण"
        },
        {
          id: "attr-5-4",
          attributeId: "custom_field",
          value: "Mr. Suntosh Nandkumar Dalvi, Union Gen. Secretary (Tata Motors)",
          valueMarathi: "श्री संतोष नंदकुमार दळवी, युनियन जन. सेक्रेटरी (टाटा मोटर्स)",
          customLabel: "Brother-in-law",
          customLabelMarathi: "जावई"
        }
      ]
    },
    // Extended Family (Paternal)
    {
      id: "section-6",
      titleId: "paternal_family",
      attributes: [
        {
          id: "attr-6-1",
          attributeId: "uncle_name",
          value: "Mr. Anil Shamrao Patil",
          valueMarathi: "श्री अनिल शामराव पाटील"
        },
        {
          id: "attr-6-2",
          attributeId: "uncle_location",
          value: "Ahmedabad",
          valueMarathi: "अहमदाबाद"
        }
      ]
    },
    // Maternal Family
    {
      id: "section-7",
      titleId: "maternal_family",
      attributes: [
        {
          id: "attr-7-1",
          attributeId: "maternal_native",
          value: "Bharwade, Tal: Shirpur, Dist: Dhule",
          valueMarathi: "भरवाडे, ता: शिरपूर, जि: धुळे"
        },
        {
          id: "attr-7-2",
          attributeId: "maternal_grandfather",
          value: "Late Mr. Dattatray Nandram Patel",
          valueMarathi: "कै. श्री दत्तात्रय नंदराम पटेल"
        },
        {
          id: "attr-7-3",
          attributeId: "maternal_uncle_name",
          value: "Mr. Ashok Dattatray Patel (Dhule)",
          valueMarathi: "श्री अशोक दत्तात्रय पटेल (धुळे)"
        },
        {
          id: "attr-7-4",
          attributeId: "maternal_uncle_name",
          value: "Mr. Dilip Dattatray Patel (Nandurbar)",
          valueMarathi: "श्री दिलीप दत्तात्रय पटेल (नंदुरबार)"
        }
      ]
    },
    // Assets & Property
    {
      id: "section-8",
      titleId: "property",
      attributes: [
        {
          id: "attr-8-1",
          attributeId: "farm_land",
          value: "8 Acres",
          valueMarathi: "८ एकर"
        },
        {
          id: "attr-8-2",
          attributeId: "residential_plot",
          value: "Residential plots in Shahada & Nandurbar, Maharashtra",
          valueMarathi: "निवासी भूखंड शहादा आणि नंदुरबार, महाराष्ट्र"
        }
      ]
    },
    // Contact Details
    {
      id: "section-9",
      titleId: "contact_details",
      attributes: [
        {
          id: "attr-9-1",
          attributeId: "father_contact",
          value: "+91 9422230857",
          valueMarathi: "+९१ ९४२२२३०८५७"
        },
        {
          id: "attr-9-2",
          attributeId: "current_address",
          value: "Jersey City, NJ, USA",
          valueMarathi: "जर्सी सिटी, न्यू जर्सी, अमेरिका"
        }
      ]
    }
  ],
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
};

export default sampleBiodataPratik;

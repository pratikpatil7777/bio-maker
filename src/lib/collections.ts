// Collections of Titles and Attributes for the Biodata Builder
// Users can select from these collections to build their custom biodata

export interface TitleOption {
  id: string;
  label: string;
  labelMarathi: string;
  icon?: string; // optional icon/emoji for visual distinction
}

export interface AttributeOption {
  id: string;
  label: string;
  labelMarathi: string;
  placeholder?: string;
  placeholderMarathi?: string;
  inputType?: 'text' | 'date' | 'time' | 'textarea' | 'number' | 'email' | 'phone' | 'url';
  category?: string; // helps with organization in the selector dropdown
}

// ============================================
// SECTION TITLES COLLECTION
// ============================================
export const titleCollection: TitleOption[] = [
  // Personal & Identity
  { id: 'personal_details', label: 'Personal Details', labelMarathi: 'वैयक्तिक माहिती', icon: '👤' },
  { id: 'birth_details', label: 'Birth Details', labelMarathi: 'जन्म माहिती', icon: '📅' },
  { id: 'physical_attributes', label: 'Physical Attributes', labelMarathi: 'शारीरिक वैशिष्ट्ये', icon: '📏' },
  { id: 'astrological_details', label: 'Astrological Details', labelMarathi: 'ज्योतिषशास्त्रीय माहिती', icon: '⭐' },
  { id: 'horoscope', label: 'Horoscope', labelMarathi: 'कुंडली', icon: '🔮' },

  // Education & Career
  { id: 'education', label: 'Education', labelMarathi: 'शिक्षण', icon: '🎓' },
  { id: 'education_career', label: 'Education & Career', labelMarathi: 'शिक्षण व करिअर', icon: '📚' },
  { id: 'professional_details', label: 'Professional Details', labelMarathi: 'व्यावसायिक माहिती', icon: '💼' },
  { id: 'career', label: 'Career', labelMarathi: 'करिअर', icon: '📈' },
  { id: 'work_experience', label: 'Work Experience', labelMarathi: 'कामाचा अनुभव', icon: '🏢' },

  // Family
  { id: 'family_details', label: 'Family Details', labelMarathi: 'कौटुंबिक माहिती', icon: '👨‍👩‍👧‍👦' },
  { id: 'parents_details', label: "Parent's Details", labelMarathi: 'पालकांची माहिती', icon: '👫' },
  { id: 'father_details', label: "Father's Details", labelMarathi: 'वडिलांची माहिती', icon: '👨' },
  { id: 'mother_details', label: "Mother's Details", labelMarathi: 'आईची माहिती', icon: '👩' },
  { id: 'siblings', label: 'Siblings', labelMarathi: 'भावंडे', icon: '👧👦' },
  { id: 'brothers_sisters', label: 'Brothers & Sisters', labelMarathi: 'भाऊ आणि बहिणी', icon: '👨‍👧‍👦' },
  { id: 'extended_family', label: 'Extended Family', labelMarathi: 'विस्तारित कुटुंब', icon: '👪' },
  { id: 'paternal_family', label: 'Paternal Family', labelMarathi: 'वडिलांचे कुटुंब', icon: '👴' },
  { id: 'maternal_family', label: 'Maternal Family', labelMarathi: 'मातृपक्ष', icon: '👵' },
  { id: 'maternal_details', label: 'Maternal Details', labelMarathi: 'मातृपक्षाची माहिती', icon: '🏠' },

  // Assets & Property
  { id: 'assets', label: 'Assets', labelMarathi: 'मालमत्ता', icon: '🏦' },
  { id: 'property', label: 'Property', labelMarathi: 'संपत्ती', icon: '🏡' },
  { id: 'assets_property', label: 'Assets & Property', labelMarathi: 'मालमत्ता व संपत्ती', icon: '💰' },
  { id: 'financial_details', label: 'Financial Details', labelMarathi: 'आर्थिक माहिती', icon: '💵' },

  // Contact
  { id: 'contact_details', label: 'Contact Details', labelMarathi: 'संपर्क माहिती', icon: '📞' },
  { id: 'contact_address', label: 'Contact & Address', labelMarathi: 'संपर्क व पत्ता', icon: '📍' },
  { id: 'address', label: 'Address', labelMarathi: 'पत्ता', icon: '🏠' },

  // Preferences & Expectations
  { id: 'partner_preferences', label: 'Partner Preferences', labelMarathi: 'जोडीदार अपेक्षा', icon: '💑' },
  { id: 'expectations', label: 'Expectations', labelMarathi: 'अपेक्षा', icon: '💭' },

  // Additional
  { id: 'lifestyle', label: 'Lifestyle', labelMarathi: 'जीवनशैली', icon: '🌟' },
  { id: 'hobbies_interests', label: 'Hobbies & Interests', labelMarathi: 'छंद व आवडी', icon: '🎯' },
  { id: 'about_me', label: 'About Me', labelMarathi: 'माझ्याबद्दल', icon: '✨' },
  { id: 'reference', label: 'Reference', labelMarathi: 'संदर्भ', icon: '📋' },
  { id: 'photo_gallery', label: 'Photo Gallery', labelMarathi: 'फोटो गॅलरी', icon: '📸' },
  { id: 'other', label: 'Other Details', labelMarathi: 'इतर माहिती', icon: '📝' },
];

// ============================================
// ATTRIBUTES COLLECTION
// ============================================
export const attributeCollection: AttributeOption[] = [
  // ---- Personal & Identity ----
  { id: 'full_name', label: 'Full Name', labelMarathi: 'पूर्ण नाव', placeholder: 'Enter full name', placeholderMarathi: 'पूर्ण नाव प्रविष्ट करा', category: 'personal' },
  { id: 'first_name', label: 'First Name', labelMarathi: 'पहिले नाव', placeholder: 'Enter first name', placeholderMarathi: 'पहिले नाव प्रविष्ट करा', category: 'personal' },
  { id: 'middle_name', label: 'Middle Name', labelMarathi: 'मधले नाव', placeholder: 'Enter middle name', placeholderMarathi: 'मधले नाव प्रविष्ट करा', category: 'personal' },
  { id: 'last_name', label: 'Last Name', labelMarathi: 'आडनाव', placeholder: 'Enter last name', placeholderMarathi: 'आडनाव प्रविष्ट करा', category: 'personal' },
  { id: 'surname', label: 'Surname', labelMarathi: 'आडनाव', placeholder: 'Enter surname', placeholderMarathi: 'आडनाव प्रविष्ट करा', category: 'personal' },
  { id: 'nickname', label: 'Nickname', labelMarathi: 'टोपणनाव', placeholder: 'Enter nickname', placeholderMarathi: 'टोपणनाव प्रविष्ट करा', category: 'personal' },
  { id: 'gender', label: 'Gender', labelMarathi: 'लिंग', placeholder: 'Male / Female', placeholderMarathi: 'पुरुष / स्त्री', category: 'personal' },
  { id: 'age', label: 'Age', labelMarathi: 'वय', placeholder: 'Enter age', placeholderMarathi: 'वय प्रविष्ट करा', inputType: 'number', category: 'personal' },
  { id: 'marital_status', label: 'Marital Status', labelMarathi: 'वैवाहिक स्थिती', placeholder: 'Unmarried / Divorced / Widowed', placeholderMarathi: 'अविवाहित / घटस्फोटित / विधवा/विधुर', category: 'personal' },

  // ---- Birth Details ----
  { id: 'date_of_birth', label: 'Date of Birth', labelMarathi: 'जन्म तारीख', placeholder: 'DD Month YYYY', placeholderMarathi: 'दिनांक महिना वर्ष', category: 'birth' },
  { id: 'time_of_birth', label: 'Time of Birth', labelMarathi: 'जन्म वेळ', placeholder: 'HH:MM AM/PM', placeholderMarathi: 'वेळ', inputType: 'time', category: 'birth' },
  { id: 'place_of_birth', label: 'Place of Birth', labelMarathi: 'जन्म स्थळ', placeholder: 'City, State', placeholderMarathi: 'शहर, राज्य', category: 'birth' },
  { id: 'birth_city', label: 'Birth City', labelMarathi: 'जन्म शहर', placeholder: 'Enter city', placeholderMarathi: 'शहर प्रविष्ट करा', category: 'birth' },
  { id: 'birth_state', label: 'Birth State', labelMarathi: 'जन्म राज्य', placeholder: 'Enter state', placeholderMarathi: 'राज्य प्रविष्ट करा', category: 'birth' },
  { id: 'birth_country', label: 'Birth Country', labelMarathi: 'जन्म देश', placeholder: 'Enter country', placeholderMarathi: 'देश प्रविष्ट करा', category: 'birth' },

  // ---- Physical Attributes ----
  { id: 'height', label: 'Height', labelMarathi: 'उंची', placeholder: "5'8\" or 173 cm", placeholderMarathi: '५ फूट ८ इंच', category: 'physical' },
  { id: 'weight', label: 'Weight', labelMarathi: 'वजन', placeholder: '70 kg', placeholderMarathi: '७० किलो', category: 'physical' },
  { id: 'complexion', label: 'Complexion', labelMarathi: 'वर्ण', placeholder: 'Fair / Wheatish / Dark', placeholderMarathi: 'गोरा / सावळा / काळा', category: 'physical' },
  { id: 'body_type', label: 'Body Type', labelMarathi: 'शरीर प्रकार', placeholder: 'Slim / Average / Athletic', placeholderMarathi: 'पातळ / सामान्य / खेळाडू', category: 'physical' },
  { id: 'blood_group', label: 'Blood Group', labelMarathi: 'रक्त गट', placeholder: 'A+ / B+ / O+ / AB+', placeholderMarathi: 'A+ / B+ / O+ / AB+', category: 'physical' },
  { id: 'eye_color', label: 'Eye Color', labelMarathi: 'डोळ्यांचा रंग', placeholder: 'Black / Brown', placeholderMarathi: 'काळा / तपकिरी', category: 'physical' },
  { id: 'hair_color', label: 'Hair Color', labelMarathi: 'केसांचा रंग', placeholder: 'Black / Brown', placeholderMarathi: 'काळा / तपकिरी', category: 'physical' },
  { id: 'physical_status', label: 'Physical Status', labelMarathi: 'शारीरिक स्थिती', placeholder: 'Normal / Physically Challenged', placeholderMarathi: 'सामान्य / अपंग', category: 'physical' },
  { id: 'spectacles', label: 'Spectacles', labelMarathi: 'चष्मा', placeholder: 'Yes / No', placeholderMarathi: 'हो / नाही', category: 'physical' },

  // ---- Astrological Details ----
  { id: 'rashi', label: 'Rashi (Moon Sign)', labelMarathi: 'राशी', placeholder: 'Enter rashi', placeholderMarathi: 'राशी प्रविष्ट करा', category: 'astrology' },
  { id: 'nakshatra', label: 'Nakshatra (Birth Star)', labelMarathi: 'नक्षत्र', placeholder: 'Enter nakshatra', placeholderMarathi: 'नक्षत्र प्रविष्ट करा', category: 'astrology' },
  { id: 'gotra', label: 'Gotra', labelMarathi: 'गोत्र', placeholder: 'Enter gotra', placeholderMarathi: 'गोत्र प्रविष्ट करा', category: 'astrology' },
  { id: 'gan', label: 'Gan', labelMarathi: 'गण', placeholder: 'Dev / Manushya / Rakshas', placeholderMarathi: 'देव / मनुष्य / राक्षस', category: 'astrology' },
  { id: 'nadi', label: 'Nadi', labelMarathi: 'नाडी', placeholder: 'Aadi / Madhya / Antya', placeholderMarathi: 'आदि / मध्य / अंत्य', category: 'astrology' },
  { id: 'charan', label: 'Charan', labelMarathi: 'चरण', placeholder: '1 / 2 / 3 / 4', placeholderMarathi: '१ / २ / ३ / ४', category: 'astrology' },
  { id: 'manglik', label: 'Manglik', labelMarathi: 'मंगळिक', placeholder: 'Yes / No / Partial', placeholderMarathi: 'हो / नाही / अंशतः', category: 'astrology' },
  { id: 'sun_sign', label: 'Sun Sign (Zodiac)', labelMarathi: 'सूर्य राशी', placeholder: 'Aries, Taurus, etc.', placeholderMarathi: 'मेष, वृषभ, इ.', category: 'astrology' },
  { id: 'devak', label: 'Devak', labelMarathi: 'देवक', placeholder: 'Enter devak', placeholderMarathi: 'देवक प्रविष्ट करा', category: 'astrology' },

  // ---- Religion & Caste ----
  { id: 'religion', label: 'Religion', labelMarathi: 'धर्म', placeholder: 'Hindu / Muslim / Christian', placeholderMarathi: 'हिंदू / मुस्लिम / ख्रिश्चन', category: 'religion' },
  { id: 'caste', label: 'Caste', labelMarathi: 'जात', placeholder: 'Enter caste', placeholderMarathi: 'जात प्रविष्ट करा', category: 'religion' },
  { id: 'sub_caste', label: 'Sub-Caste', labelMarathi: 'पोटजात', placeholder: 'Enter sub-caste', placeholderMarathi: 'पोटजात प्रविष्ट करा', category: 'religion' },
  { id: 'kul', label: 'Kul', labelMarathi: 'कूळ', placeholder: 'Enter kul', placeholderMarathi: 'कूळ प्रविष्ट करा', category: 'religion' },
  { id: 'kulswami', label: 'Kulswami', labelMarathi: 'कुलस्वामी', placeholder: 'Enter kulswami', placeholderMarathi: 'कुलस्वामी प्रविष्ट करा', category: 'religion' },
  { id: 'kuldevi', label: 'Kuldevi', labelMarathi: 'कुलदेवी', placeholder: 'Enter kuldevi', placeholderMarathi: 'कुलदेवी प्रविष्ट करा', category: 'religion' },
  { id: 'kuldevta', label: 'Kuldevta', labelMarathi: 'कुलदेवता', placeholder: 'Enter kuldevta', placeholderMarathi: 'कुलदेवता प्रविष्ट करा', category: 'religion' },

  // ---- Education ----
  { id: 'highest_education', label: 'Highest Education', labelMarathi: 'सर्वोच्च शिक्षण', placeholder: 'Degree name', placeholderMarathi: 'पदवीचे नाव', category: 'education' },
  { id: 'degree', label: 'Degree', labelMarathi: 'पदवी', placeholder: 'B.E. / B.Tech / MBA', placeholderMarathi: 'बी.ई. / बी.टेक / एम.बी.ए.', category: 'education' },
  { id: 'specialization', label: 'Specialization', labelMarathi: 'विशेषीकरण', placeholder: 'Computer Science', placeholderMarathi: 'संगणक शास्त्र', category: 'education' },
  { id: 'college_university', label: 'College/University', labelMarathi: 'महाविद्यालय/विद्यापीठ', placeholder: 'Institution name', placeholderMarathi: 'संस्थेचे नाव', category: 'education' },
  { id: 'year_of_passing', label: 'Year of Passing', labelMarathi: 'उत्तीर्ण वर्ष', placeholder: '2022', placeholderMarathi: '२०२२', category: 'education' },
  { id: 'school', label: 'School', labelMarathi: 'शाळा', placeholder: 'School name', placeholderMarathi: 'शाळेचे नाव', category: 'education' },
  { id: 'qualification', label: 'Qualification', labelMarathi: 'पात्रता', placeholder: 'Enter qualification', placeholderMarathi: 'पात्रता प्रविष्ट करा', category: 'education' },
  { id: 'additional_qualification', label: 'Additional Qualification', labelMarathi: 'अतिरिक्त पात्रता', placeholder: 'Certifications, courses', placeholderMarathi: 'प्रमाणपत्रे, अभ्यासक्रम', category: 'education' },

  // ---- Professional / Career ----
  { id: 'occupation', label: 'Occupation', labelMarathi: 'व्यवसाय', placeholder: 'Software Engineer', placeholderMarathi: 'सॉफ्टवेअर इंजिनिअर', category: 'career' },
  { id: 'designation', label: 'Designation', labelMarathi: 'पद', placeholder: 'Senior Developer', placeholderMarathi: 'वरिष्ठ विकासक', category: 'career' },
  { id: 'company', label: 'Company/Organization', labelMarathi: 'कंपनी/संस्था', placeholder: 'Company name', placeholderMarathi: 'कंपनीचे नाव', category: 'career' },
  { id: 'work_location', label: 'Work Location', labelMarathi: 'कामाचे ठिकाण', placeholder: 'City, Country', placeholderMarathi: 'शहर, देश', category: 'career' },
  { id: 'work_city', label: 'Work City', labelMarathi: 'कामाचे शहर', placeholder: 'Enter city', placeholderMarathi: 'शहर प्रविष्ट करा', category: 'career' },
  { id: 'work_country', label: 'Work Country', labelMarathi: 'कामाचा देश', placeholder: 'Enter country', placeholderMarathi: 'देश प्रविष्ट करा', category: 'career' },
  { id: 'annual_income', label: 'Annual Income', labelMarathi: 'वार्षिक उत्पन्न', placeholder: '₹10 Lakhs', placeholderMarathi: '₹१० लाख', category: 'career' },
  { id: 'monthly_income', label: 'Monthly Income', labelMarathi: 'मासिक उत्पन्न', placeholder: '₹1 Lakh', placeholderMarathi: '₹१ लाख', category: 'career' },
  { id: 'work_experience', label: 'Work Experience', labelMarathi: 'कामाचा अनुभव', placeholder: '5 years', placeholderMarathi: '५ वर्षे', category: 'career' },
  { id: 'job_type', label: 'Job Type', labelMarathi: 'नोकरी प्रकार', placeholder: 'Private / Government / Business', placeholderMarathi: 'खाजगी / सरकारी / व्यवसाय', category: 'career' },
  { id: 'sector', label: 'Sector', labelMarathi: 'क्षेत्र', placeholder: 'IT / Banking / Healthcare', placeholderMarathi: 'आयटी / बँकिंग / आरोग्य', category: 'career' },
  { id: 'visa_status', label: 'Visa Status', labelMarathi: 'व्हिसा स्थिती', placeholder: 'H-1B / Green Card / Citizen', placeholderMarathi: 'H-1B / ग्रीन कार्ड / नागरिक', category: 'career' },
  { id: 'abroad_status', label: 'Abroad Status', labelMarathi: 'परदेश स्थिती', placeholder: 'Working abroad / Planning', placeholderMarathi: 'परदेशात कार्यरत / नियोजन', category: 'career' },

  // ---- Family Members ----
  { id: 'father_name', label: "Father's Name", labelMarathi: 'वडिलांचे नाव', placeholder: 'Enter name', placeholderMarathi: 'नाव प्रविष्ट करा', category: 'family' },
  { id: 'father_occupation', label: "Father's Occupation", labelMarathi: 'वडिलांचा व्यवसाय', placeholder: 'Enter occupation', placeholderMarathi: 'व्यवसाय प्रविष्ट करा', category: 'family' },
  { id: 'father_contact', label: "Father's Contact", labelMarathi: 'वडिलांचा संपर्क', placeholder: '+91 9876543210', placeholderMarathi: '+९१ ९८७६५४३२१०', inputType: 'phone', category: 'family' },
  { id: 'mother_name', label: "Mother's Name", labelMarathi: 'आईचे नाव', placeholder: 'Enter name', placeholderMarathi: 'नाव प्रविष्ट करा', category: 'family' },
  { id: 'mother_occupation', label: "Mother's Occupation", labelMarathi: 'आईचा व्यवसाय', placeholder: 'Homemaker / Working', placeholderMarathi: 'गृहिणी / नोकरी', category: 'family' },
  { id: 'mother_contact', label: "Mother's Contact", labelMarathi: 'आईचा संपर्क', placeholder: '+91 9876543210', placeholderMarathi: '+९१ ९८७६५४३२१०', inputType: 'phone', category: 'family' },
  { id: 'grandfather_name', label: "Grandfather's Name", labelMarathi: 'आजोबांचे नाव', placeholder: 'Enter name', placeholderMarathi: 'नाव प्रविष्ट करा', category: 'family' },
  { id: 'grandmother_name', label: "Grandmother's Name", labelMarathi: 'आजीचे नाव', placeholder: 'Enter name', placeholderMarathi: 'नाव प्रविष्ट करा', category: 'family' },
  { id: 'native_place', label: 'Native Place', labelMarathi: 'मूळ गाव', placeholder: 'Village/Town, District', placeholderMarathi: 'गाव/शहर, जिल्हा', category: 'family' },
  { id: 'family_type', label: 'Family Type', labelMarathi: 'कुटुंब प्रकार', placeholder: 'Joint / Nuclear', placeholderMarathi: 'एकत्र / विभक्त', category: 'family' },
  { id: 'family_status', label: 'Family Status', labelMarathi: 'कुटुंब स्थिती', placeholder: 'Middle Class / Upper Middle', placeholderMarathi: 'मध्यमवर्गीय / उच्च मध्यमवर्गीय', category: 'family' },
  { id: 'family_values', label: 'Family Values', labelMarathi: 'कौटुंबिक मूल्ये', placeholder: 'Traditional / Moderate / Liberal', placeholderMarathi: 'पारंपारिक / मध्यम / उदारमतवादी', category: 'family' },
  { id: 'family_income', label: 'Family Income', labelMarathi: 'कौटुंबिक उत्पन्न', placeholder: 'Enter amount', placeholderMarathi: 'रक्कम प्रविष्ट करा', category: 'family' },
  { id: 'total_family_members', label: 'Total Family Members', labelMarathi: 'एकूण कुटुंब सदस्य', placeholder: 'Enter number', placeholderMarathi: 'संख्या प्रविष्ट करा', inputType: 'number', category: 'family' },

  // ---- Siblings ----
  { id: 'brothers', label: 'Brothers', labelMarathi: 'भाऊ', placeholder: 'Number of brothers', placeholderMarathi: 'भावांची संख्या', category: 'siblings' },
  { id: 'sisters', label: 'Sisters', labelMarathi: 'बहिणी', placeholder: 'Number of sisters', placeholderMarathi: 'बहिणींची संख्या', category: 'siblings' },
  { id: 'brother_name', label: "Brother's Name", labelMarathi: 'भावाचे नाव', placeholder: 'Enter name', placeholderMarathi: 'नाव प्रविष्ट करा', category: 'siblings' },
  { id: 'brother_occupation', label: "Brother's Occupation", labelMarathi: 'भावाचा व्यवसाय', placeholder: 'Enter occupation', placeholderMarathi: 'व्यवसाय प्रविष्ट करा', category: 'siblings' },
  { id: 'brother_married', label: "Brother's Marital Status", labelMarathi: 'भावाची वैवाहिक स्थिती', placeholder: 'Married / Unmarried', placeholderMarathi: 'विवाहित / अविवाहित', category: 'siblings' },
  { id: 'sister_name', label: "Sister's Name", labelMarathi: 'बहिणीचे नाव', placeholder: 'Enter name', placeholderMarathi: 'नाव प्रविष्ट करा', category: 'siblings' },
  { id: 'sister_occupation', label: "Sister's Occupation", labelMarathi: 'बहिणीचा व्यवसाय', placeholder: 'Enter occupation', placeholderMarathi: 'व्यवसाय प्रविष्ट करा', category: 'siblings' },
  { id: 'sister_married', label: "Sister's Marital Status", labelMarathi: 'बहिणीची वैवाहिक स्थिती', placeholder: 'Married / Unmarried', placeholderMarathi: 'विवाहित / अविवाहित', category: 'siblings' },
  { id: 'sibling_details', label: 'Sibling Details', labelMarathi: 'भावंडांची माहिती', placeholder: 'Name, occupation, etc.', placeholderMarathi: 'नाव, व्यवसाय, इ.', inputType: 'textarea', category: 'siblings' },

  // ---- Extended Family ----
  { id: 'uncle_name', label: "Uncle's Name", labelMarathi: 'काकांचे नाव', placeholder: 'Enter name', placeholderMarathi: 'नाव प्रविष्ट करा', category: 'extended' },
  { id: 'uncle_occupation', label: "Uncle's Occupation", labelMarathi: 'काकांचा व्यवसाय', placeholder: 'Enter occupation', placeholderMarathi: 'व्यवसाय प्रविष्ट करा', category: 'extended' },
  { id: 'uncle_location', label: "Uncle's Location", labelMarathi: 'काकांचे ठिकाण', placeholder: 'City, State', placeholderMarathi: 'शहर, राज्य', category: 'extended' },
  { id: 'aunt_name', label: "Aunt's Name", labelMarathi: 'काकूंचे नाव', placeholder: 'Enter name', placeholderMarathi: 'नाव प्रविष्ट करा', category: 'extended' },
  { id: 'maternal_grandfather', label: 'Maternal Grandfather', labelMarathi: 'आजोबा (मातृपक्ष)', placeholder: 'Enter name', placeholderMarathi: 'नाव प्रविष्ट करा', category: 'extended' },
  { id: 'maternal_grandmother', label: 'Maternal Grandmother', labelMarathi: 'आजी (मातृपक्ष)', placeholder: 'Enter name', placeholderMarathi: 'नाव प्रविष्ट करा', category: 'extended' },
  { id: 'maternal_uncle_name', label: "Maternal Uncle's Name", labelMarathi: 'मामांचे नाव', placeholder: 'Enter name', placeholderMarathi: 'नाव प्रविष्ट करा', category: 'extended' },
  { id: 'maternal_uncle_location', label: "Maternal Uncle's Location", labelMarathi: 'मामांचे ठिकाण', placeholder: 'City, State', placeholderMarathi: 'शहर, राज्य', category: 'extended' },
  { id: 'maternal_native', label: 'Maternal Native Place', labelMarathi: 'मातृपक्ष मूळ गाव', placeholder: 'Village, District', placeholderMarathi: 'गाव, जिल्हा', category: 'extended' },

  // ---- Assets & Property ----
  { id: 'own_house', label: 'Own House', labelMarathi: 'स्वतःचे घर', placeholder: 'Yes / No', placeholderMarathi: 'हो / नाही', category: 'assets' },
  { id: 'house_type', label: 'House Type', labelMarathi: 'घराचा प्रकार', placeholder: 'Flat / Bungalow / Villa', placeholderMarathi: 'फ्लॅट / बंगला / व्हिला', category: 'assets' },
  { id: 'house_location', label: 'House Location', labelMarathi: 'घराचे ठिकाण', placeholder: 'City, Area', placeholderMarathi: 'शहर, भाग', category: 'assets' },
  { id: 'farm_land', label: 'Farm Land', labelMarathi: 'शेत जमीन', placeholder: '10 Acres', placeholderMarathi: '१० एकर', category: 'assets' },
  { id: 'agricultural_land', label: 'Agricultural Land', labelMarathi: 'शेती जमीन', placeholder: 'Enter details', placeholderMarathi: 'तपशील प्रविष्ट करा', category: 'assets' },
  { id: 'property_details', label: 'Property Details', labelMarathi: 'मालमत्ता तपशील', placeholder: 'Describe properties', placeholderMarathi: 'मालमत्तेचे वर्णन', inputType: 'textarea', category: 'assets' },
  { id: 'residential_plot', label: 'Residential Plot', labelMarathi: 'निवासी भूखंड', placeholder: 'Location and size', placeholderMarathi: 'ठिकाण आणि आकार', category: 'assets' },
  { id: 'commercial_property', label: 'Commercial Property', labelMarathi: 'व्यावसायिक मालमत्ता', placeholder: 'Shop / Office', placeholderMarathi: 'दुकान / कार्यालय', category: 'assets' },
  { id: 'vehicle', label: 'Vehicle', labelMarathi: 'वाहन', placeholder: 'Car / Bike', placeholderMarathi: 'कार / बाईक', category: 'assets' },
  { id: 'other_assets', label: 'Other Assets', labelMarathi: 'इतर मालमत्ता', placeholder: 'Investments, etc.', placeholderMarathi: 'गुंतवणूक, इ.', inputType: 'textarea', category: 'assets' },

  // ---- Contact Details ----
  { id: 'mobile_number', label: 'Mobile Number', labelMarathi: 'मोबाइल नंबर', placeholder: '+91 9876543210', placeholderMarathi: '+९१ ९८७६५४३२१०', inputType: 'phone', category: 'contact' },
  { id: 'alternate_mobile', label: 'Alternate Mobile', labelMarathi: 'पर्यायी मोबाइल', placeholder: '+91 9876543210', placeholderMarathi: '+९१ ९८७६५४३२१०', inputType: 'phone', category: 'contact' },
  { id: 'whatsapp_number', label: 'WhatsApp Number', labelMarathi: 'व्हाट्सअॅप नंबर', placeholder: '+91 9876543210', placeholderMarathi: '+९१ ९८७६५४३२१०', inputType: 'phone', category: 'contact' },
  { id: 'email', label: 'Email', labelMarathi: 'ई-मेल', placeholder: 'example@email.com', placeholderMarathi: 'example@email.com', inputType: 'email', category: 'contact' },
  { id: 'current_address', label: 'Current Address', labelMarathi: 'सध्याचा पत्ता', placeholder: 'Full address', placeholderMarathi: 'पूर्ण पत्ता', inputType: 'textarea', category: 'contact' },
  { id: 'current_city', label: 'Current City', labelMarathi: 'सध्याचे शहर', placeholder: 'City name', placeholderMarathi: 'शहराचे नाव', category: 'contact' },
  { id: 'current_state', label: 'Current State', labelMarathi: 'सध्याचे राज्य', placeholder: 'State name', placeholderMarathi: 'राज्याचे नाव', category: 'contact' },
  { id: 'current_country', label: 'Current Country', labelMarathi: 'सध्याचा देश', placeholder: 'Country name', placeholderMarathi: 'देशाचे नाव', category: 'contact' },
  { id: 'pincode', label: 'Pincode', labelMarathi: 'पिनकोड', placeholder: '400001', placeholderMarathi: '४०००००', category: 'contact' },
  { id: 'permanent_address', label: 'Permanent Address', labelMarathi: 'कायमचा पत्ता', placeholder: 'Full address', placeholderMarathi: 'पूर्ण पत्ता', inputType: 'textarea', category: 'contact' },

  // ---- Lifestyle & Preferences ----
  { id: 'diet', label: 'Diet', labelMarathi: 'आहार', placeholder: 'Vegetarian / Non-Veg / Eggetarian', placeholderMarathi: 'शाकाहारी / मांसाहारी / अंडाहारी', category: 'lifestyle' },
  { id: 'smoking', label: 'Smoking', labelMarathi: 'धूम्रपान', placeholder: 'No / Occasionally / Yes', placeholderMarathi: 'नाही / कधीकधी / हो', category: 'lifestyle' },
  { id: 'drinking', label: 'Drinking', labelMarathi: 'मद्यपान', placeholder: 'No / Occasionally / Yes', placeholderMarathi: 'नाही / कधीकधी / हो', category: 'lifestyle' },
  { id: 'hobbies', label: 'Hobbies', labelMarathi: 'छंद', placeholder: 'Reading, Music, Travel', placeholderMarathi: 'वाचन, संगीत, प्रवास', inputType: 'textarea', category: 'lifestyle' },
  { id: 'interests', label: 'Interests', labelMarathi: 'आवडी', placeholder: 'Sports, Art, etc.', placeholderMarathi: 'खेळ, कला, इ.', inputType: 'textarea', category: 'lifestyle' },
  { id: 'languages_known', label: 'Languages Known', labelMarathi: 'ज्ञात भाषा', placeholder: 'Marathi, Hindi, English', placeholderMarathi: 'मराठी, हिंदी, इंग्रजी', category: 'lifestyle' },
  { id: 'mother_tongue', label: 'Mother Tongue', labelMarathi: 'मातृभाषा', placeholder: 'Marathi', placeholderMarathi: 'मराठी', category: 'lifestyle' },

  // ---- Partner Preferences ----
  { id: 'preferred_age', label: 'Preferred Age', labelMarathi: 'अपेक्षित वय', placeholder: '25-30 years', placeholderMarathi: '२५-३० वर्षे', category: 'preference' },
  { id: 'preferred_height', label: 'Preferred Height', labelMarathi: 'अपेक्षित उंची', placeholder: "5'2\" - 5'6\"", placeholderMarathi: '५\'२" - ५\'६"', category: 'preference' },
  { id: 'preferred_education', label: 'Preferred Education', labelMarathi: 'अपेक्षित शिक्षण', placeholder: 'Graduate or above', placeholderMarathi: 'पदवीधर किंवा त्यावरील', category: 'preference' },
  { id: 'preferred_occupation', label: 'Preferred Occupation', labelMarathi: 'अपेक्षित व्यवसाय', placeholder: 'Working / Homemaker', placeholderMarathi: 'नोकरी / गृहिणी', category: 'preference' },
  { id: 'preferred_location', label: 'Preferred Location', labelMarathi: 'अपेक्षित ठिकाण', placeholder: 'City, State', placeholderMarathi: 'शहर, राज्य', category: 'preference' },
  { id: 'preferred_caste', label: 'Preferred Caste', labelMarathi: 'अपेक्षित जात', placeholder: 'Same / Any', placeholderMarathi: 'समान / कोणतीही', category: 'preference' },
  { id: 'partner_expectations', label: 'Partner Expectations', labelMarathi: 'जोडीदार अपेक्षा', placeholder: 'Describe expectations', placeholderMarathi: 'अपेक्षांचे वर्णन', inputType: 'textarea', category: 'preference' },

  // ---- Miscellaneous ----
  { id: 'about_self', label: 'About Self', labelMarathi: 'स्वतःबद्दल', placeholder: 'Write about yourself', placeholderMarathi: 'स्वतःबद्दल लिहा', inputType: 'textarea', category: 'misc' },
  { id: 'photo_gallery_url', label: 'Photo Gallery URL', labelMarathi: 'फोटो गॅलरी URL', placeholder: 'Google Drive / Album link', placeholderMarathi: 'गुगल ड्राइव्ह / अल्बम लिंक', inputType: 'url', category: 'misc' },
  { id: 'reference_name', label: 'Reference Name', labelMarathi: 'संदर्भ नाव', placeholder: 'Name of reference person', placeholderMarathi: 'संदर्भ व्यक्तीचे नाव', category: 'misc' },
  { id: 'reference_contact', label: 'Reference Contact', labelMarathi: 'संदर्भ संपर्क', placeholder: '+91 9876543210', placeholderMarathi: '+९१ ९८७६५४३२१०', inputType: 'phone', category: 'misc' },
  { id: 'reference_relation', label: 'Reference Relation', labelMarathi: 'संदर्भ नाते', placeholder: 'Relation with reference', placeholderMarathi: 'संदर्भाशी नाते', category: 'misc' },
  { id: 'custom_field', label: 'Custom Field', labelMarathi: 'सानुकूल क्षेत्र', placeholder: 'Enter value', placeholderMarathi: 'मूल्य प्रविष्ट करा', category: 'misc' },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get title by ID
export const getTitleById = (id: string): TitleOption | undefined => {
  return titleCollection.find(title => title.id === id);
};

// Get attribute by ID
export const getAttributeById = (id: string): AttributeOption | undefined => {
  return attributeCollection.find(attr => attr.id === id);
};

// Get attributes by category
export const getAttributesByCategory = (category: string): AttributeOption[] => {
  return attributeCollection.filter(attr => attr.category === category);
};

// Get all unique categories
export const getCategories = (): string[] => {
  const categories = attributeCollection.map(attr => attr.category).filter(Boolean);
  return [...new Set(categories)] as string[];
};

// Category labels for display
export const categoryLabels: Record<string, { en: string; mr: string }> = {
  personal: { en: 'Personal', mr: 'वैयक्तिक' },
  birth: { en: 'Birth', mr: 'जन्म' },
  physical: { en: 'Physical', mr: 'शारीरिक' },
  astrology: { en: 'Astrology', mr: 'ज्योतिष' },
  religion: { en: 'Religion & Caste', mr: 'धर्म व जात' },
  education: { en: 'Education', mr: 'शिक्षण' },
  career: { en: 'Career', mr: 'करिअर' },
  family: { en: 'Family', mr: 'कुटुंब' },
  siblings: { en: 'Siblings', mr: 'भावंडे' },
  extended: { en: 'Extended Family', mr: 'विस्तारित कुटुंब' },
  assets: { en: 'Assets', mr: 'मालमत्ता' },
  contact: { en: 'Contact', mr: 'संपर्क' },
  lifestyle: { en: 'Lifestyle', mr: 'जीवनशैली' },
  preference: { en: 'Partner Preferences', mr: 'जोडीदार अपेक्षा' },
  misc: { en: 'Other', mr: 'इतर' },
};

// Collections of Titles and Attributes for the Biodata Builder
// Users can select from these collections to build their custom biodata

export interface TitleOption {
  id: string;
  label: string;
  labelMarathi: string;
  labelHindi?: string;
  icon?: string; // optional icon/emoji for visual distinction
}

export interface AttributeOption {
  id: string;
  label: string;
  labelMarathi: string;
  labelHindi?: string;
  placeholder?: string;
  placeholderMarathi?: string;
  placeholderHindi?: string;
  inputType?: 'text' | 'date' | 'time' | 'textarea' | 'number' | 'email' | 'phone' | 'url';
  category?: string; // helps with organization in the selector dropdown
}

// ============================================
// SECTION TITLES COLLECTION
// ============================================
export const titleCollection: TitleOption[] = [
  // Personal & Identity
  { id: 'personal_details', label: 'Personal Details', labelMarathi: 'वैयक्तिक माहिती', labelHindi: 'व्यक्तिगत विवरण', icon: '👤' },
  { id: 'birth_details', label: 'Birth Details', labelMarathi: 'जन्म माहिती', labelHindi: 'जन्म विवरण', icon: '📅' },
  { id: 'physical_attributes', label: 'Physical Attributes', labelMarathi: 'शारीरिक वैशिष्ट्ये', labelHindi: 'शारीरिक विशेषताएं', icon: '📏' },
  { id: 'astrological_details', label: 'Astrological Details', labelMarathi: 'ज्योतिषशास्त्रीय माहिती', labelHindi: 'ज्योतिषीय विवरण', icon: '⭐' },
  { id: 'horoscope', label: 'Horoscope', labelMarathi: 'कुंडली', labelHindi: 'कुंडली', icon: '🔮' },

  // Education & Career
  { id: 'education', label: 'Education', labelMarathi: 'शिक्षण', labelHindi: 'शिक्षा', icon: '🎓' },
  { id: 'education_career', label: 'Education & Career', labelMarathi: 'शिक्षण व करिअर', labelHindi: 'शिक्षा एवं करियर', icon: '📚' },
  { id: 'professional_details', label: 'Professional Details', labelMarathi: 'व्यावसायिक माहिती', labelHindi: 'व्यावसायिक विवरण', icon: '💼' },
  { id: 'career', label: 'Career', labelMarathi: 'करिअर', labelHindi: 'करियर', icon: '📈' },
  { id: 'work_experience', label: 'Work Experience', labelMarathi: 'कामाचा अनुभव', labelHindi: 'कार्य अनुभव', icon: '🏢' },

  // Family
  { id: 'family_details', label: 'Family Details', labelMarathi: 'कौटुंबिक माहिती', labelHindi: 'पारिवारिक विवरण', icon: '👨‍👩‍👧‍👦' },
  { id: 'parents_details', label: "Parent's Details", labelMarathi: 'पालकांची माहिती', labelHindi: 'माता-पिता का विवरण', icon: '👫' },
  { id: 'father_details', label: "Father's Details", labelMarathi: 'वडिलांची माहिती', labelHindi: 'पिताजी का विवरण', icon: '👨' },
  { id: 'mother_details', label: "Mother's Details", labelMarathi: 'आईची माहिती', labelHindi: 'माताजी का विवरण', icon: '👩' },
  { id: 'siblings', label: 'Siblings', labelMarathi: 'भावंडे', labelHindi: 'भाई-बहन', icon: '👧👦' },
  { id: 'brothers_sisters', label: 'Brothers & Sisters', labelMarathi: 'भाऊ आणि बहिणी', labelHindi: 'भाई और बहनें', icon: '👨‍👧‍👦' },
  { id: 'extended_family', label: 'Extended Family', labelMarathi: 'विस्तारित कुटुंब', labelHindi: 'विस्तारित परिवार', icon: '👪' },
  { id: 'paternal_family', label: 'Paternal Family', labelMarathi: 'वडिलांचे कुटुंब', labelHindi: 'पैतृक परिवार', icon: '👴' },
  { id: 'maternal_family', label: 'Maternal Family', labelMarathi: 'मातृपक्ष', labelHindi: 'ननिहाल', icon: '👵' },
  { id: 'maternal_details', label: 'Maternal Details', labelMarathi: 'मातृपक्षाची माहिती', labelHindi: 'ननिहाल विवरण', icon: '🏠' },

  // Assets & Property
  { id: 'assets', label: 'Assets', labelMarathi: 'मालमत्ता', labelHindi: 'संपत्ति', icon: '🏦' },
  { id: 'property', label: 'Property', labelMarathi: 'संपत्ती', labelHindi: 'संपत्ति', icon: '🏡' },
  { id: 'assets_property', label: 'Assets & Property', labelMarathi: 'मालमत्ता व संपत्ती', labelHindi: 'संपत्ति एवं जायदाद', icon: '💰' },
  { id: 'financial_details', label: 'Financial Details', labelMarathi: 'आर्थिक माहिती', labelHindi: 'आर्थिक विवरण', icon: '💵' },

  // Contact
  { id: 'contact_details', label: 'Contact Details', labelMarathi: 'संपर्क माहिती', labelHindi: 'संपर्क विवरण', icon: '📞' },
  { id: 'contact_address', label: 'Contact & Address', labelMarathi: 'संपर्क व पत्ता', labelHindi: 'संपर्क एवं पता', icon: '📍' },
  { id: 'address', label: 'Address', labelMarathi: 'पत्ता', labelHindi: 'पता', icon: '🏠' },

  // Preferences & Expectations
  { id: 'partner_preferences', label: 'Partner Preferences', labelMarathi: 'जोडीदार अपेक्षा', labelHindi: 'जीवनसाथी की अपेक्षाएं', icon: '💑' },
  { id: 'expectations', label: 'Expectations', labelMarathi: 'अपेक्षा', labelHindi: 'अपेक्षाएं', icon: '💭' },

  // Additional
  { id: 'lifestyle', label: 'Lifestyle', labelMarathi: 'जीवनशैली', labelHindi: 'जीवनशैली', icon: '🌟' },
  { id: 'hobbies_interests', label: 'Hobbies & Interests', labelMarathi: 'छंद व आवडी', labelHindi: 'शौक एवं रुचियां', icon: '🎯' },
  { id: 'about_me', label: 'About Me', labelMarathi: 'माझ्याबद्दल', labelHindi: 'मेरे बारे में', icon: '✨' },
  { id: 'reference', label: 'Reference', labelMarathi: 'संदर्भ', labelHindi: 'संदर्भ', icon: '📋' },
  { id: 'photo_gallery', label: 'Photo Gallery', labelMarathi: 'फोटो गॅलरी', labelHindi: 'फोटो गैलरी', icon: '📸' },
  { id: 'other', label: 'Other Details', labelMarathi: 'इतर माहिती', labelHindi: 'अन्य विवरण', icon: '📝' },
];

// ============================================
// ATTRIBUTES COLLECTION
// ============================================
export const attributeCollection: AttributeOption[] = [
  // ---- Personal & Identity ----
  { id: 'full_name', label: 'Full Name', labelMarathi: 'पूर्ण नाव', labelHindi: 'पूरा नाम', placeholder: 'Enter full name', placeholderMarathi: 'पूर्ण नाव प्रविष्ट करा', placeholderHindi: 'पूरा नाम दर्ज करें', category: 'personal' },
  { id: 'first_name', label: 'First Name', labelMarathi: 'पहिले नाव', labelHindi: 'पहला नाम', placeholder: 'Enter first name', placeholderMarathi: 'पहिले नाव प्रविष्ट करा', placeholderHindi: 'पहला नाम दर्ज करें', category: 'personal' },
  { id: 'middle_name', label: 'Middle Name', labelMarathi: 'मधले नाव', labelHindi: 'मध्य नाम', placeholder: 'Enter middle name', placeholderMarathi: 'मधले नाव प्रविष्ट करा', placeholderHindi: 'मध्य नाम दर्ज करें', category: 'personal' },
  { id: 'last_name', label: 'Last Name', labelMarathi: 'आडनाव', labelHindi: 'उपनाम', placeholder: 'Enter last name', placeholderMarathi: 'आडनाव प्रविष्ट करा', placeholderHindi: 'उपनाम दर्ज करें', category: 'personal' },
  { id: 'surname', label: 'Surname', labelMarathi: 'आडनाव', labelHindi: 'उपनाम', placeholder: 'Enter surname', placeholderMarathi: 'आडनाव प्रविष्ट करा', placeholderHindi: 'उपनाम दर्ज करें', category: 'personal' },
  { id: 'nickname', label: 'Nickname', labelMarathi: 'टोपणनाव', labelHindi: 'उपनाम', placeholder: 'Enter nickname', placeholderMarathi: 'टोपणनाव प्रविष्ट करा', placeholderHindi: 'उपनाम दर्ज करें', category: 'personal' },
  { id: 'gender', label: 'Gender', labelMarathi: 'लिंग', labelHindi: 'लिंग', placeholder: 'Male / Female', placeholderMarathi: 'पुरुष / स्त्री', placeholderHindi: 'पुरुष / महिला', category: 'personal' },
  { id: 'age', label: 'Age', labelMarathi: 'वय', labelHindi: 'आयु', placeholder: 'Enter age', placeholderMarathi: 'वय प्रविष्ट करा', placeholderHindi: 'आयु दर्ज करें', inputType: 'number', category: 'personal' },
  { id: 'marital_status', label: 'Marital Status', labelMarathi: 'वैवाहिक स्थिती', labelHindi: 'वैवाहिक स्थिति', placeholder: 'Unmarried / Divorced / Widowed', placeholderMarathi: 'अविवाहित / घटस्फोटित / विधवा/विधुर', placeholderHindi: 'अविवाहित / तलाकशुदा / विधवा/विधुर', category: 'personal' },

  // ---- Birth Details ----
  { id: 'date_of_birth', label: 'Date of Birth', labelMarathi: 'जन्म तारीख', labelHindi: 'जन्म तिथि', placeholder: 'DD Month YYYY', placeholderMarathi: 'दिनांक महिना वर्ष', placeholderHindi: 'दिनांक माह वर्ष', category: 'birth' },
  { id: 'time_of_birth', label: 'Time of Birth', labelMarathi: 'जन्म वेळ', labelHindi: 'जन्म समय', placeholder: 'HH:MM AM/PM', placeholderMarathi: 'वेळ', placeholderHindi: 'समय', inputType: 'time', category: 'birth' },
  { id: 'place_of_birth', label: 'Place of Birth', labelMarathi: 'जन्म स्थळ', labelHindi: 'जन्म स्थान', placeholder: 'City, State', placeholderMarathi: 'शहर, राज्य', placeholderHindi: 'शहर, राज्य', category: 'birth' },
  { id: 'birth_city', label: 'Birth City', labelMarathi: 'जन्म शहर', labelHindi: 'जन्म शहर', placeholder: 'Enter city', placeholderMarathi: 'शहर प्रविष्ट करा', placeholderHindi: 'शहर दर्ज करें', category: 'birth' },
  { id: 'birth_state', label: 'Birth State', labelMarathi: 'जन्म राज्य', labelHindi: 'जन्म राज्य', placeholder: 'Enter state', placeholderMarathi: 'राज्य प्रविष्ट करा', placeholderHindi: 'राज्य दर्ज करें', category: 'birth' },
  { id: 'birth_country', label: 'Birth Country', labelMarathi: 'जन्म देश', labelHindi: 'जन्म देश', placeholder: 'Enter country', placeholderMarathi: 'देश प्रविष्ट करा', placeholderHindi: 'देश दर्ज करें', category: 'birth' },

  // ---- Physical Attributes ----
  { id: 'height', label: 'Height', labelMarathi: 'उंची', labelHindi: 'ऊंचाई', placeholder: "5'8\" or 173 cm", placeholderMarathi: '५ फूट ८ इंच', placeholderHindi: '५ फुट ८ इंच', category: 'physical' },
  { id: 'weight', label: 'Weight', labelMarathi: 'वजन', labelHindi: 'वजन', placeholder: '70 kg', placeholderMarathi: '७० किलो', placeholderHindi: '७० किलो', category: 'physical' },
  { id: 'complexion', label: 'Complexion', labelMarathi: 'वर्ण', labelHindi: 'रंग', placeholder: 'Fair / Wheatish / Dark', placeholderMarathi: 'गोरा / सावळा / काळा', placeholderHindi: 'गोरा / सांवला / काला', category: 'physical' },
  { id: 'body_type', label: 'Body Type', labelMarathi: 'शरीर प्रकार', labelHindi: 'शरीर प्रकार', placeholder: 'Slim / Average / Athletic', placeholderMarathi: 'पातळ / सामान्य / खेळाडू', placeholderHindi: 'पतला / सामान्य / एथलेटिक', category: 'physical' },
  { id: 'blood_group', label: 'Blood Group', labelMarathi: 'रक्त गट', labelHindi: 'रक्त समूह', placeholder: 'A+ / B+ / O+ / AB+', placeholderMarathi: 'A+ / B+ / O+ / AB+', placeholderHindi: 'A+ / B+ / O+ / AB+', category: 'physical' },
  { id: 'eye_color', label: 'Eye Color', labelMarathi: 'डोळ्यांचा रंग', labelHindi: 'आंखों का रंग', placeholder: 'Black / Brown', placeholderMarathi: 'काळा / तपकिरी', placeholderHindi: 'काला / भूरा', category: 'physical' },
  { id: 'hair_color', label: 'Hair Color', labelMarathi: 'केसांचा रंग', labelHindi: 'बालों का रंग', placeholder: 'Black / Brown', placeholderMarathi: 'काळा / तपकिरी', placeholderHindi: 'काला / भूरा', category: 'physical' },
  { id: 'physical_status', label: 'Physical Status', labelMarathi: 'शारीरिक स्थिती', labelHindi: 'शारीरिक स्थिति', placeholder: 'Normal / Physically Challenged', placeholderMarathi: 'सामान्य / अपंग', placeholderHindi: 'सामान्य / विकलांग', category: 'physical' },
  { id: 'spectacles', label: 'Spectacles', labelMarathi: 'चष्मा', labelHindi: 'चश्मा', placeholder: 'Yes / No', placeholderMarathi: 'हो / नाही', placeholderHindi: 'हां / नहीं', category: 'physical' },

  // ---- Astrological Details ----
  { id: 'rashi', label: 'Rashi (Moon Sign)', labelMarathi: 'राशी', labelHindi: 'राशि', placeholder: 'Enter rashi', placeholderMarathi: 'राशी प्रविष्ट करा', placeholderHindi: 'राशि दर्ज करें', category: 'astrology' },
  { id: 'nakshatra', label: 'Nakshatra (Birth Star)', labelMarathi: 'नक्षत्र', labelHindi: 'नक्षत्र', placeholder: 'Enter nakshatra', placeholderMarathi: 'नक्षत्र प्रविष्ट करा', placeholderHindi: 'नक्षत्र दर्ज करें', category: 'astrology' },
  { id: 'gotra', label: 'Gotra', labelMarathi: 'गोत्र', labelHindi: 'गोत्र', placeholder: 'Enter gotra', placeholderMarathi: 'गोत्र प्रविष्ट करा', placeholderHindi: 'गोत्र दर्ज करें', category: 'astrology' },
  { id: 'gan', label: 'Gan', labelMarathi: 'गण', labelHindi: 'गण', placeholder: 'Dev / Manushya / Rakshas', placeholderMarathi: 'देव / मनुष्य / राक्षस', placeholderHindi: 'देव / मनुष्य / राक्षस', category: 'astrology' },
  { id: 'nadi', label: 'Nadi', labelMarathi: 'नाडी', labelHindi: 'नाड़ी', placeholder: 'Aadi / Madhya / Antya', placeholderMarathi: 'आदि / मध्य / अंत्य', placeholderHindi: 'आदि / मध्य / अंत्य', category: 'astrology' },
  { id: 'charan', label: 'Charan', labelMarathi: 'चरण', labelHindi: 'चरण', placeholder: '1 / 2 / 3 / 4', placeholderMarathi: '१ / २ / ३ / ४', placeholderHindi: '१ / २ / ३ / ४', category: 'astrology' },
  { id: 'manglik', label: 'Manglik', labelMarathi: 'मंगळिक', labelHindi: 'मांगलिक', placeholder: 'Yes / No / Partial', placeholderMarathi: 'हो / नाही / अंशतः', placeholderHindi: 'हां / नहीं / आंशिक', category: 'astrology' },
  { id: 'sun_sign', label: 'Sun Sign (Zodiac)', labelMarathi: 'सूर्य राशी', labelHindi: 'सूर्य राशि', placeholder: 'Aries, Taurus, etc.', placeholderMarathi: 'मेष, वृषभ, इ.', placeholderHindi: 'मेष, वृषभ, आदि', category: 'astrology' },
  { id: 'devak', label: 'Devak', labelMarathi: 'देवक', labelHindi: 'देवक', placeholder: 'Enter devak', placeholderMarathi: 'देवक प्रविष्ट करा', placeholderHindi: 'देवक दर्ज करें', category: 'astrology' },

  // ---- Religion & Caste ----
  { id: 'religion', label: 'Religion', labelMarathi: 'धर्म', labelHindi: 'धर्म', placeholder: 'Hindu / Muslim / Christian', placeholderMarathi: 'हिंदू / मुस्लिम / ख्रिश्चन', placeholderHindi: 'हिंदू / मुस्लिम / ईसाई', category: 'religion' },
  { id: 'caste', label: 'Caste', labelMarathi: 'जात', labelHindi: 'जाति', placeholder: 'Enter caste', placeholderMarathi: 'जात प्रविष्ट करा', placeholderHindi: 'जाति दर्ज करें', category: 'religion' },
  { id: 'sub_caste', label: 'Sub-Caste', labelMarathi: 'पोटजात', labelHindi: 'उप-जाति', placeholder: 'Enter sub-caste', placeholderMarathi: 'पोटजात प्रविष्ट करा', placeholderHindi: 'उप-जाति दर्ज करें', category: 'religion' },
  { id: 'kul', label: 'Kul', labelMarathi: 'कूळ', labelHindi: 'कुल', placeholder: 'Enter kul', placeholderMarathi: 'कूळ प्रविष्ट करा', placeholderHindi: 'कुल दर्ज करें', category: 'religion' },
  { id: 'kulswami', label: 'Kulswami', labelMarathi: 'कुलस्वामी', labelHindi: 'कुलस्वामी', placeholder: 'Enter kulswami', placeholderMarathi: 'कुलस्वामी प्रविष्ट करा', placeholderHindi: 'कुलस्वामी दर्ज करें', category: 'religion' },
  { id: 'kuldevi', label: 'Kuldevi', labelMarathi: 'कुलदेवी', labelHindi: 'कुलदेवी', placeholder: 'Enter kuldevi', placeholderMarathi: 'कुलदेवी प्रविष्ट करा', placeholderHindi: 'कुलदेवी दर्ज करें', category: 'religion' },
  { id: 'kuldevta', label: 'Kuldevta', labelMarathi: 'कुलदेवता', labelHindi: 'कुलदेवता', placeholder: 'Enter kuldevta', placeholderMarathi: 'कुलदेवता प्रविष्ट करा', placeholderHindi: 'कुलदेवता दर्ज करें', category: 'religion' },

  // ---- Education ----
  { id: 'highest_education', label: 'Highest Education', labelMarathi: 'सर्वोच्च शिक्षण', labelHindi: 'उच्चतम शिक्षा', placeholder: 'Degree name', placeholderMarathi: 'पदवीचे नाव', placeholderHindi: 'डिग्री का नाम', category: 'education' },
  { id: 'degree', label: 'Degree', labelMarathi: 'पदवी', labelHindi: 'डिग्री', placeholder: 'B.E. / B.Tech / MBA', placeholderMarathi: 'बी.ई. / बी.टेक / एम.बी.ए.', placeholderHindi: 'बी.ई. / बी.टेक / एम.बी.ए.', category: 'education' },
  { id: 'specialization', label: 'Specialization', labelMarathi: 'विशेषीकरण', labelHindi: 'विशेषज्ञता', placeholder: 'Computer Science', placeholderMarathi: 'संगणक शास्त्र', placeholderHindi: 'कंप्यूटर साइंस', category: 'education' },
  { id: 'college_university', label: 'College/University', labelMarathi: 'महाविद्यालय/विद्यापीठ', labelHindi: 'कॉलेज/विश्वविद्यालय', placeholder: 'Institution name', placeholderMarathi: 'संस्थेचे नाव', placeholderHindi: 'संस्था का नाम', category: 'education' },
  { id: 'year_of_passing', label: 'Year of Passing', labelMarathi: 'उत्तीर्ण वर्ष', labelHindi: 'उत्तीर्ण वर्ष', placeholder: '2022', placeholderMarathi: '२०२२', placeholderHindi: '२०२२', category: 'education' },
  { id: 'school', label: 'School', labelMarathi: 'शाळा', labelHindi: 'स्कूल', placeholder: 'School name', placeholderMarathi: 'शाळेचे नाव', placeholderHindi: 'स्कूल का नाम', category: 'education' },
  { id: 'qualification', label: 'Qualification', labelMarathi: 'पात्रता', labelHindi: 'योग्यता', placeholder: 'Enter qualification', placeholderMarathi: 'पात्रता प्रविष्ट करा', placeholderHindi: 'योग्यता दर्ज करें', category: 'education' },
  { id: 'additional_qualification', label: 'Additional Qualification', labelMarathi: 'अतिरिक्त पात्रता', labelHindi: 'अतिरिक्त योग्यता', placeholder: 'Certifications, courses', placeholderMarathi: 'प्रमाणपत्रे, अभ्यासक्रम', placeholderHindi: 'प्रमाणपत्र, कोर्स', category: 'education' },

  // ---- Professional / Career ----
  { id: 'occupation', label: 'Occupation', labelMarathi: 'व्यवसाय', labelHindi: 'व्यवसाय', placeholder: 'Software Engineer', placeholderMarathi: 'सॉफ्टवेअर इंजिनिअर', placeholderHindi: 'सॉफ्टवेयर इंजीनियर', category: 'career' },
  { id: 'designation', label: 'Designation', labelMarathi: 'पद', labelHindi: 'पद', placeholder: 'Senior Developer', placeholderMarathi: 'वरिष्ठ विकासक', placeholderHindi: 'वरिष्ठ डेवलपर', category: 'career' },
  { id: 'company', label: 'Company/Organization', labelMarathi: 'कंपनी/संस्था', labelHindi: 'कंपनी/संस्था', placeholder: 'Company name', placeholderMarathi: 'कंपनीचे नाव', placeholderHindi: 'कंपनी का नाम', category: 'career' },
  { id: 'work_location', label: 'Work Location', labelMarathi: 'कामाचे ठिकाण', labelHindi: 'कार्य स्थान', placeholder: 'City, Country', placeholderMarathi: 'शहर, देश', placeholderHindi: 'शहर, देश', category: 'career' },
  { id: 'work_city', label: 'Work City', labelMarathi: 'कामाचे शहर', labelHindi: 'कार्य शहर', placeholder: 'Enter city', placeholderMarathi: 'शहर प्रविष्ट करा', placeholderHindi: 'शहर दर्ज करें', category: 'career' },
  { id: 'work_country', label: 'Work Country', labelMarathi: 'कामाचा देश', labelHindi: 'कार्य देश', placeholder: 'Enter country', placeholderMarathi: 'देश प्रविष्ट करा', placeholderHindi: 'देश दर्ज करें', category: 'career' },
  { id: 'annual_income', label: 'Annual Income', labelMarathi: 'वार्षिक उत्पन्न', labelHindi: 'वार्षिक आय', placeholder: '₹10 Lakhs', placeholderMarathi: '₹१० लाख', placeholderHindi: '₹१० लाख', category: 'career' },
  { id: 'monthly_income', label: 'Monthly Income', labelMarathi: 'मासिक उत्पन्न', labelHindi: 'मासिक आय', placeholder: '₹1 Lakh', placeholderMarathi: '₹१ लाख', placeholderHindi: '₹१ लाख', category: 'career' },
  { id: 'work_experience', label: 'Work Experience', labelMarathi: 'कामाचा अनुभव', labelHindi: 'कार्य अनुभव', placeholder: '5 years', placeholderMarathi: '५ वर्षे', placeholderHindi: '५ वर्ष', category: 'career' },
  { id: 'job_type', label: 'Job Type', labelMarathi: 'नोकरी प्रकार', labelHindi: 'नौकरी प्रकार', placeholder: 'Private / Government / Business', placeholderMarathi: 'खाजगी / सरकारी / व्यवसाय', placeholderHindi: 'प्राइवेट / सरकारी / व्यापार', category: 'career' },
  { id: 'sector', label: 'Sector', labelMarathi: 'क्षेत्र', labelHindi: 'क्षेत्र', placeholder: 'IT / Banking / Healthcare', placeholderMarathi: 'आयटी / बँकिंग / आरोग्य', placeholderHindi: 'आईटी / बैंकिंग / स्वास्थ्य', category: 'career' },
  { id: 'visa_status', label: 'Visa Status', labelMarathi: 'व्हिसा स्थिती', labelHindi: 'वीजा स्थिति', placeholder: 'H-1B / Green Card / Citizen', placeholderMarathi: 'H-1B / ग्रीन कार्ड / नागरिक', placeholderHindi: 'H-1B / ग्रीन कार्ड / नागरिक', category: 'career' },
  { id: 'abroad_status', label: 'Abroad Status', labelMarathi: 'परदेश स्थिती', labelHindi: 'विदेश स्थिति', placeholder: 'Working abroad / Planning', placeholderMarathi: 'परदेशात कार्यरत / नियोजन', placeholderHindi: 'विदेश में कार्यरत / योजना', category: 'career' },

  // ---- Family Members ----
  { id: 'father_name', label: "Father's Name", labelMarathi: 'वडिलांचे नाव', labelHindi: 'पिताजी का नाम', placeholder: 'Enter name', placeholderMarathi: 'नाव प्रविष्ट करा', placeholderHindi: 'नाम दर्ज करें', category: 'family' },
  { id: 'father_occupation', label: "Father's Occupation", labelMarathi: 'वडिलांचा व्यवसाय', labelHindi: 'पिताजी का व्यवसाय', placeholder: 'Enter occupation', placeholderMarathi: 'व्यवसाय प्रविष्ट करा', placeholderHindi: 'व्यवसाय दर्ज करें', category: 'family' },
  { id: 'father_contact', label: "Father's Contact", labelMarathi: 'वडिलांचा संपर्क', labelHindi: 'पिताजी का संपर्क', placeholder: '+91 9876543210', placeholderMarathi: '+९१ ९८७६५४३२१०', placeholderHindi: '+९१ ९८७६५४३२१०', inputType: 'phone', category: 'family' },
  { id: 'mother_name', label: "Mother's Name", labelMarathi: 'आईचे नाव', labelHindi: 'माताजी का नाम', placeholder: 'Enter name', placeholderMarathi: 'नाव प्रविष्ट करा', placeholderHindi: 'नाम दर्ज करें', category: 'family' },
  { id: 'mother_occupation', label: "Mother's Occupation", labelMarathi: 'आईचा व्यवसाय', labelHindi: 'माताजी का व्यवसाय', placeholder: 'Homemaker / Working', placeholderMarathi: 'गृहिणी / नोकरी', placeholderHindi: 'गृहिणी / नौकरी', category: 'family' },
  { id: 'mother_contact', label: "Mother's Contact", labelMarathi: 'आईचा संपर्क', labelHindi: 'माताजी का संपर्क', placeholder: '+91 9876543210', placeholderMarathi: '+९१ ९८७६५४३२१०', placeholderHindi: '+९१ ९८७६५४३२१०', inputType: 'phone', category: 'family' },
  { id: 'grandfather_name', label: "Grandfather's Name", labelMarathi: 'आजोबांचे नाव', labelHindi: 'दादाजी का नाम', placeholder: 'Enter name', placeholderMarathi: 'नाव प्रविष्ट करा', placeholderHindi: 'नाम दर्ज करें', category: 'family' },
  { id: 'grandmother_name', label: "Grandmother's Name", labelMarathi: 'आजीचे नाव', labelHindi: 'दादीजी का नाम', placeholder: 'Enter name', placeholderMarathi: 'नाव प्रविष्ट करा', placeholderHindi: 'नाम दर्ज करें', category: 'family' },
  { id: 'native_place', label: 'Native Place', labelMarathi: 'मूळ गाव', labelHindi: 'मूल स्थान', placeholder: 'Village/Town, District', placeholderMarathi: 'गाव/शहर, जिल्हा', placeholderHindi: 'गांव/शहर, जिला', category: 'family' },
  { id: 'family_type', label: 'Family Type', labelMarathi: 'कुटुंब प्रकार', labelHindi: 'परिवार प्रकार', placeholder: 'Joint / Nuclear', placeholderMarathi: 'एकत्र / विभक्त', placeholderHindi: 'संयुक्त / एकल', category: 'family' },
  { id: 'family_status', label: 'Family Status', labelMarathi: 'कुटुंब स्थिती', labelHindi: 'परिवार स्थिति', placeholder: 'Middle Class / Upper Middle', placeholderMarathi: 'मध्यमवर्गीय / उच्च मध्यमवर्गीय', placeholderHindi: 'मध्यमवर्गीय / उच्च मध्यमवर्गीय', category: 'family' },
  { id: 'family_values', label: 'Family Values', labelMarathi: 'कौटुंबिक मूल्ये', labelHindi: 'पारिवारिक मूल्य', placeholder: 'Traditional / Moderate / Liberal', placeholderMarathi: 'पारंपारिक / मध्यम / उदारमतवादी', placeholderHindi: 'पारंपरिक / मध्यम / उदार', category: 'family' },
  { id: 'family_income', label: 'Family Income', labelMarathi: 'कौटुंबिक उत्पन्न', labelHindi: 'पारिवारिक आय', placeholder: 'Enter amount', placeholderMarathi: 'रक्कम प्रविष्ट करा', placeholderHindi: 'राशि दर्ज करें', category: 'family' },
  { id: 'total_family_members', label: 'Total Family Members', labelMarathi: 'एकूण कुटुंब सदस्य', labelHindi: 'कुल परिवार सदस्य', placeholder: 'Enter number', placeholderMarathi: 'संख्या प्रविष्ट करा', placeholderHindi: 'संख्या दर्ज करें', inputType: 'number', category: 'family' },

  // ---- Siblings ----
  { id: 'brothers', label: 'Brothers', labelMarathi: 'भाऊ', labelHindi: 'भाई', placeholder: 'Number of brothers', placeholderMarathi: 'भावांची संख्या', placeholderHindi: 'भाइयों की संख्या', category: 'siblings' },
  { id: 'sisters', label: 'Sisters', labelMarathi: 'बहिणी', labelHindi: 'बहनें', placeholder: 'Number of sisters', placeholderMarathi: 'बहिणींची संख्या', placeholderHindi: 'बहनों की संख्या', category: 'siblings' },
  { id: 'brother_name', label: "Brother's Name", labelMarathi: 'भावाचे नाव', labelHindi: 'भाई का नाम', placeholder: 'Enter name', placeholderMarathi: 'नाव प्रविष्ट करा', placeholderHindi: 'नाम दर्ज करें', category: 'siblings' },
  { id: 'brother_occupation', label: "Brother's Occupation", labelMarathi: 'भावाचा व्यवसाय', labelHindi: 'भाई का व्यवसाय', placeholder: 'Enter occupation', placeholderMarathi: 'व्यवसाय प्रविष्ट करा', placeholderHindi: 'व्यवसाय दर्ज करें', category: 'siblings' },
  { id: 'brother_married', label: "Brother's Marital Status", labelMarathi: 'भावाची वैवाहिक स्थिती', labelHindi: 'भाई की वैवाहिक स्थिति', placeholder: 'Married / Unmarried', placeholderMarathi: 'विवाहित / अविवाहित', placeholderHindi: 'विवाहित / अविवाहित', category: 'siblings' },
  { id: 'sister_name', label: "Sister's Name", labelMarathi: 'बहिणीचे नाव', labelHindi: 'बहन का नाम', placeholder: 'Enter name', placeholderMarathi: 'नाव प्रविष्ट करा', placeholderHindi: 'नाम दर्ज करें', category: 'siblings' },
  { id: 'sister_occupation', label: "Sister's Occupation", labelMarathi: 'बहिणीचा व्यवसाय', labelHindi: 'बहन का व्यवसाय', placeholder: 'Enter occupation', placeholderMarathi: 'व्यवसाय प्रविष्ट करा', placeholderHindi: 'व्यवसाय दर्ज करें', category: 'siblings' },
  { id: 'sister_married', label: "Sister's Marital Status", labelMarathi: 'बहिणीची वैवाहिक स्थिती', labelHindi: 'बहन की वैवाहिक स्थिति', placeholder: 'Married / Unmarried', placeholderMarathi: 'विवाहित / अविवाहित', placeholderHindi: 'विवाहित / अविवाहित', category: 'siblings' },
  { id: 'sibling_details', label: 'Sibling Details', labelMarathi: 'भावंडांची माहिती', labelHindi: 'भाई-बहन विवरण', placeholder: 'Name, occupation, etc.', placeholderMarathi: 'नाव, व्यवसाय, इ.', placeholderHindi: 'नाम, व्यवसाय, आदि', inputType: 'textarea', category: 'siblings' },

  // ---- Extended Family ----
  { id: 'uncle_name', label: "Uncle's Name", labelMarathi: 'काकांचे नाव', labelHindi: 'चाचाजी का नाम', placeholder: 'Enter name', placeholderMarathi: 'नाव प्रविष्ट करा', placeholderHindi: 'नाम दर्ज करें', category: 'extended' },
  { id: 'uncle_occupation', label: "Uncle's Occupation", labelMarathi: 'काकांचा व्यवसाय', labelHindi: 'चाचाजी का व्यवसाय', placeholder: 'Enter occupation', placeholderMarathi: 'व्यवसाय प्रविष्ट करा', placeholderHindi: 'व्यवसाय दर्ज करें', category: 'extended' },
  { id: 'uncle_location', label: "Uncle's Location", labelMarathi: 'काकांचे ठिकाण', labelHindi: 'चाचाजी का स्थान', placeholder: 'City, State', placeholderMarathi: 'शहर, राज्य', placeholderHindi: 'शहर, राज्य', category: 'extended' },
  { id: 'aunt_name', label: "Aunt's Name", labelMarathi: 'काकूंचे नाव', labelHindi: 'चाचीजी का नाम', placeholder: 'Enter name', placeholderMarathi: 'नाव प्रविष्ट करा', placeholderHindi: 'नाम दर्ज करें', category: 'extended' },
  { id: 'maternal_grandfather', label: 'Maternal Grandfather', labelMarathi: 'आजोबा (मातृपक्ष)', labelHindi: 'नानाजी', placeholder: 'Enter name', placeholderMarathi: 'नाव प्रविष्ट करा', placeholderHindi: 'नाम दर्ज करें', category: 'extended' },
  { id: 'maternal_grandmother', label: 'Maternal Grandmother', labelMarathi: 'आजी (मातृपक्ष)', labelHindi: 'नानीजी', placeholder: 'Enter name', placeholderMarathi: 'नाव प्रविष्ट करा', placeholderHindi: 'नाम दर्ज करें', category: 'extended' },
  { id: 'maternal_uncle_name', label: "Maternal Uncle's Name", labelMarathi: 'मामांचे नाव', labelHindi: 'मामाजी का नाम', placeholder: 'Enter name', placeholderMarathi: 'नाव प्रविष्ट करा', placeholderHindi: 'नाम दर्ज करें', category: 'extended' },
  { id: 'maternal_uncle_location', label: "Maternal Uncle's Location", labelMarathi: 'मामांचे ठिकाण', labelHindi: 'मामाजी का स्थान', placeholder: 'City, State', placeholderMarathi: 'शहर, राज्य', placeholderHindi: 'शहर, राज्य', category: 'extended' },
  { id: 'maternal_native', label: 'Maternal Native Place', labelMarathi: 'मातृपक्ष मूळ गाव', labelHindi: 'ननिहाल', placeholder: 'Village, District', placeholderMarathi: 'गाव, जिल्हा', placeholderHindi: 'गांव, जिला', category: 'extended' },

  // ---- Assets & Property ----
  { id: 'own_house', label: 'Own House', labelMarathi: 'स्वतःचे घर', labelHindi: 'अपना घर', placeholder: 'Yes / No', placeholderMarathi: 'हो / नाही', placeholderHindi: 'हां / नहीं', category: 'assets' },
  { id: 'house_type', label: 'House Type', labelMarathi: 'घराचा प्रकार', labelHindi: 'घर का प्रकार', placeholder: 'Flat / Bungalow / Villa', placeholderMarathi: 'फ्लॅट / बंगला / व्हिला', placeholderHindi: 'फ्लैट / बंगला / विला', category: 'assets' },
  { id: 'house_location', label: 'House Location', labelMarathi: 'घराचे ठिकाण', labelHindi: 'घर का स्थान', placeholder: 'City, Area', placeholderMarathi: 'शहर, भाग', placeholderHindi: 'शहर, क्षेत्र', category: 'assets' },
  { id: 'farm_land', label: 'Farm Land', labelMarathi: 'शेत जमीन', labelHindi: 'खेत', placeholder: '10 Acres', placeholderMarathi: '१० एकर', placeholderHindi: '१० एकड़', category: 'assets' },
  { id: 'agricultural_land', label: 'Agricultural Land', labelMarathi: 'शेती जमीन', labelHindi: 'कृषि भूमि', placeholder: 'Enter details', placeholderMarathi: 'तपशील प्रविष्ट करा', placeholderHindi: 'विवरण दर्ज करें', category: 'assets' },
  { id: 'property_details', label: 'Property Details', labelMarathi: 'मालमत्ता तपशील', labelHindi: 'संपत्ति विवरण', placeholder: 'Describe properties', placeholderMarathi: 'मालमत्तेचे वर्णन', placeholderHindi: 'संपत्ति का वर्णन', inputType: 'textarea', category: 'assets' },
  { id: 'residential_plot', label: 'Residential Plot', labelMarathi: 'निवासी भूखंड', labelHindi: 'आवासीय भूखंड', placeholder: 'Location and size', placeholderMarathi: 'ठिकाण आणि आकार', placeholderHindi: 'स्थान और आकार', category: 'assets' },
  { id: 'commercial_property', label: 'Commercial Property', labelMarathi: 'व्यावसायिक मालमत्ता', labelHindi: 'व्यावसायिक संपत्ति', placeholder: 'Shop / Office', placeholderMarathi: 'दुकान / कार्यालय', placeholderHindi: 'दुकान / कार्यालय', category: 'assets' },
  { id: 'vehicle', label: 'Vehicle', labelMarathi: 'वाहन', labelHindi: 'वाहन', placeholder: 'Car / Bike', placeholderMarathi: 'कार / बाईक', placeholderHindi: 'कार / बाइक', category: 'assets' },
  { id: 'other_assets', label: 'Other Assets', labelMarathi: 'इतर मालमत्ता', labelHindi: 'अन्य संपत्ति', placeholder: 'Investments, etc.', placeholderMarathi: 'गुंतवणूक, इ.', placeholderHindi: 'निवेश, आदि', inputType: 'textarea', category: 'assets' },

  // ---- Contact Details ----
  { id: 'mobile_number', label: 'Mobile Number', labelMarathi: 'मोबाइल नंबर', labelHindi: 'मोबाइल नंबर', placeholder: '+91 9876543210', placeholderMarathi: '+९१ ९८७६५४३२१०', placeholderHindi: '+९१ ९८७६५४३२१०', inputType: 'phone', category: 'contact' },
  { id: 'alternate_mobile', label: 'Alternate Mobile', labelMarathi: 'पर्यायी मोबाइल', labelHindi: 'वैकल्पिक मोबाइल', placeholder: '+91 9876543210', placeholderMarathi: '+९१ ९८७६५४३२१०', placeholderHindi: '+९१ ९८७६५४३२१०', inputType: 'phone', category: 'contact' },
  { id: 'whatsapp_number', label: 'WhatsApp Number', labelMarathi: 'व्हाट्सअॅप नंबर', labelHindi: 'व्हाट्सएप नंबर', placeholder: '+91 9876543210', placeholderMarathi: '+९१ ९८७६५४३२१०', placeholderHindi: '+९१ ९८७६५४३२१०', inputType: 'phone', category: 'contact' },
  { id: 'email', label: 'Email', labelMarathi: 'ई-मेल', labelHindi: 'ई-मेल', placeholder: 'example@email.com', placeholderMarathi: 'example@email.com', placeholderHindi: 'example@email.com', inputType: 'email', category: 'contact' },
  { id: 'current_address', label: 'Current Address', labelMarathi: 'सध्याचा पत्ता', labelHindi: 'वर्तमान पता', placeholder: 'Full address', placeholderMarathi: 'पूर्ण पत्ता', placeholderHindi: 'पूरा पता', inputType: 'textarea', category: 'contact' },
  { id: 'current_city', label: 'Current City', labelMarathi: 'सध्याचे शहर', labelHindi: 'वर्तमान शहर', placeholder: 'City name', placeholderMarathi: 'शहराचे नाव', placeholderHindi: 'शहर का नाम', category: 'contact' },
  { id: 'current_state', label: 'Current State', labelMarathi: 'सध्याचे राज्य', labelHindi: 'वर्तमान राज्य', placeholder: 'State name', placeholderMarathi: 'राज्याचे नाव', placeholderHindi: 'राज्य का नाम', category: 'contact' },
  { id: 'current_country', label: 'Current Country', labelMarathi: 'सध्याचा देश', labelHindi: 'वर्तमान देश', placeholder: 'Country name', placeholderMarathi: 'देशाचे नाव', placeholderHindi: 'देश का नाम', category: 'contact' },
  { id: 'pincode', label: 'Pincode', labelMarathi: 'पिनकोड', labelHindi: 'पिनकोड', placeholder: '400001', placeholderMarathi: '४०००००', placeholderHindi: '४०००००', category: 'contact' },
  { id: 'permanent_address', label: 'Permanent Address', labelMarathi: 'कायमचा पत्ता', labelHindi: 'स्थायी पता', placeholder: 'Full address', placeholderMarathi: 'पूर्ण पत्ता', placeholderHindi: 'पूरा पता', inputType: 'textarea', category: 'contact' },

  // ---- Lifestyle & Preferences ----
  { id: 'diet', label: 'Diet', labelMarathi: 'आहार', labelHindi: 'आहार', placeholder: 'Vegetarian / Non-Veg / Eggetarian', placeholderMarathi: 'शाकाहारी / मांसाहारी / अंडाहारी', placeholderHindi: 'शाकाहारी / मांसाहारी / एगेटेरियन', category: 'lifestyle' },
  { id: 'smoking', label: 'Smoking', labelMarathi: 'धूम्रपान', labelHindi: 'धूम्रपान', placeholder: 'No / Occasionally / Yes', placeholderMarathi: 'नाही / कधीकधी / हो', placeholderHindi: 'नहीं / कभी-कभी / हां', category: 'lifestyle' },
  { id: 'drinking', label: 'Drinking', labelMarathi: 'मद्यपान', labelHindi: 'मद्यपान', placeholder: 'No / Occasionally / Yes', placeholderMarathi: 'नाही / कधीकधी / हो', placeholderHindi: 'नहीं / कभी-कभी / हां', category: 'lifestyle' },
  { id: 'hobbies', label: 'Hobbies', labelMarathi: 'छंद', labelHindi: 'शौक', placeholder: 'Reading, Music, Travel', placeholderMarathi: 'वाचन, संगीत, प्रवास', placeholderHindi: 'पढ़ना, संगीत, यात्रा', inputType: 'textarea', category: 'lifestyle' },
  { id: 'interests', label: 'Interests', labelMarathi: 'आवडी', labelHindi: 'रुचियां', placeholder: 'Sports, Art, etc.', placeholderMarathi: 'खेळ, कला, इ.', placeholderHindi: 'खेल, कला, आदि', inputType: 'textarea', category: 'lifestyle' },
  { id: 'languages_known', label: 'Languages Known', labelMarathi: 'ज्ञात भाषा', labelHindi: 'ज्ञात भाषाएं', placeholder: 'Marathi, Hindi, English', placeholderMarathi: 'मराठी, हिंदी, इंग्रजी', placeholderHindi: 'मराठी, हिंदी, अंग्रेजी', category: 'lifestyle' },
  { id: 'mother_tongue', label: 'Mother Tongue', labelMarathi: 'मातृभाषा', labelHindi: 'मातृभाषा', placeholder: 'Marathi', placeholderMarathi: 'मराठी', placeholderHindi: 'हिंदी', category: 'lifestyle' },

  // ---- Partner Preferences ----
  { id: 'preferred_age', label: 'Preferred Age', labelMarathi: 'अपेक्षित वय', labelHindi: 'अपेक्षित आयु', placeholder: '25-30 years', placeholderMarathi: '२५-३० वर्षे', placeholderHindi: '२५-३० वर्ष', category: 'preference' },
  { id: 'preferred_height', label: 'Preferred Height', labelMarathi: 'अपेक्षित उंची', labelHindi: 'अपेक्षित ऊंचाई', placeholder: "5'2\" - 5'6\"", placeholderMarathi: '५\'२" - ५\'६"', placeholderHindi: '५\'२" - ५\'६"', category: 'preference' },
  { id: 'preferred_education', label: 'Preferred Education', labelMarathi: 'अपेक्षित शिक्षण', labelHindi: 'अपेक्षित शिक्षा', placeholder: 'Graduate or above', placeholderMarathi: 'पदवीधर किंवा त्यावरील', placeholderHindi: 'स्नातक या उससे ऊपर', category: 'preference' },
  { id: 'preferred_occupation', label: 'Preferred Occupation', labelMarathi: 'अपेक्षित व्यवसाय', labelHindi: 'अपेक्षित व्यवसाय', placeholder: 'Working / Homemaker', placeholderMarathi: 'नोकरी / गृहिणी', placeholderHindi: 'नौकरी / गृहिणी', category: 'preference' },
  { id: 'preferred_location', label: 'Preferred Location', labelMarathi: 'अपेक्षित ठिकाण', labelHindi: 'अपेक्षित स्थान', placeholder: 'City, State', placeholderMarathi: 'शहर, राज्य', placeholderHindi: 'शहर, राज्य', category: 'preference' },
  { id: 'preferred_caste', label: 'Preferred Caste', labelMarathi: 'अपेक्षित जात', labelHindi: 'अपेक्षित जाति', placeholder: 'Same / Any', placeholderMarathi: 'समान / कोणतीही', placeholderHindi: 'समान / कोई भी', category: 'preference' },
  { id: 'partner_expectations', label: 'Partner Expectations', labelMarathi: 'जोडीदार अपेक्षा', labelHindi: 'जीवनसाथी अपेक्षाएं', placeholder: 'Describe expectations', placeholderMarathi: 'अपेक्षांचे वर्णन', placeholderHindi: 'अपेक्षाओं का वर्णन', inputType: 'textarea', category: 'preference' },

  // ---- Miscellaneous ----
  { id: 'about_self', label: 'About Self', labelMarathi: 'स्वतःबद्दल', labelHindi: 'अपने बारे में', placeholder: 'Write about yourself', placeholderMarathi: 'स्वतःबद्दल लिहा', placeholderHindi: 'अपने बारे में लिखें', inputType: 'textarea', category: 'misc' },
  { id: 'photo_gallery_url', label: 'Photo Gallery URL', labelMarathi: 'फोटो गॅलरी URL', labelHindi: 'फोटो गैलरी URL', placeholder: 'Google Drive / Album link', placeholderMarathi: 'गुगल ड्राइव्ह / अल्बम लिंक', placeholderHindi: 'गूगल ड्राइव / एल्बम लिंक', inputType: 'url', category: 'misc' },
  { id: 'reference_name', label: 'Reference Name', labelMarathi: 'संदर्भ नाव', labelHindi: 'संदर्भ नाम', placeholder: 'Name of reference person', placeholderMarathi: 'संदर्भ व्यक्तीचे नाव', placeholderHindi: 'संदर्भ व्यक्ति का नाम', category: 'misc' },
  { id: 'reference_contact', label: 'Reference Contact', labelMarathi: 'संदर्भ संपर्क', labelHindi: 'संदर्भ संपर्क', placeholder: '+91 9876543210', placeholderMarathi: '+९१ ९८७६५४३२१०', placeholderHindi: '+९१ ९८७६५४३२१०', inputType: 'phone', category: 'misc' },
  { id: 'reference_relation', label: 'Reference Relation', labelMarathi: 'संदर्भ नाते', labelHindi: 'संदर्भ संबंध', placeholder: 'Relation with reference', placeholderMarathi: 'संदर्भाशी नाते', placeholderHindi: 'संदर्भ से संबंध', category: 'misc' },
  { id: 'custom_field', label: 'Custom Field', labelMarathi: 'सानुकूल क्षेत्र', labelHindi: 'कस्टम फील्ड', placeholder: 'Enter value', placeholderMarathi: 'मूल्य प्रविष्ट करा', placeholderHindi: 'मान दर्ज करें', category: 'misc' },
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
export const categoryLabels: Record<string, { en: string; mr: string; hi: string }> = {
  personal: { en: 'Personal', mr: 'वैयक्तिक', hi: 'व्यक्तिगत' },
  birth: { en: 'Birth', mr: 'जन्म', hi: 'जन्म' },
  physical: { en: 'Physical', mr: 'शारीरिक', hi: 'शारीरिक' },
  astrology: { en: 'Astrology', mr: 'ज्योतिष', hi: 'ज्योतिष' },
  religion: { en: 'Religion & Caste', mr: 'धर्म व जात', hi: 'धर्म एवं जाति' },
  education: { en: 'Education', mr: 'शिक्षण', hi: 'शिक्षा' },
  career: { en: 'Career', mr: 'करिअर', hi: 'करियर' },
  family: { en: 'Family', mr: 'कुटुंब', hi: 'परिवार' },
  siblings: { en: 'Siblings', mr: 'भावंडे', hi: 'भाई-बहन' },
  extended: { en: 'Extended Family', mr: 'विस्तारित कुटुंब', hi: 'विस्तारित परिवार' },
  assets: { en: 'Assets', mr: 'मालमत्ता', hi: 'संपत्ति' },
  contact: { en: 'Contact', mr: 'संपर्क', hi: 'संपर्क' },
  lifestyle: { en: 'Lifestyle', mr: 'जीवनशैली', hi: 'जीवनशैली' },
  preference: { en: 'Partner Preferences', mr: 'जोडीदार अपेक्षा', hi: 'जीवनसाथी अपेक्षाएं' },
  misc: { en: 'Other', mr: 'इतर', hi: 'अन्य' },
};

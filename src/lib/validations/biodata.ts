import { z } from 'zod';

// ============================================
// Personal Details Schema
// ============================================
export const personalDetailsSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required'),
  birthTime: z
    .string()
    .optional(),
  birthPlace: z
    .string()
    .max(100, 'Birth place must be less than 100 characters')
    .optional(),
  height: z
    .string()
    .optional(),
  weight: z
    .string()
    .optional(),
  complexion: z
    .string()
    .optional(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', ''])
    .optional(),
  maritalStatus: z
    .enum(['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce', ''])
    .default('Never Married'),
  diet: z
    .enum(['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Vegan', 'Jain', ''])
    .optional(),
  rashi: z
    .string()
    .optional(),
  nakshatra: z
    .string()
    .optional(),
  gotra: z
    .string()
    .max(50, 'Gotra must be less than 50 characters')
    .optional(),
  manglik: z
    .enum(['Yes', 'No', 'Partial', "Don't Know", ''])
    .optional(),
});

export type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;

// ============================================
// Family Details Schema
// ============================================
export const familyDetailsSchema = z.object({
  fatherName: z
    .string()
    .max(100, 'Father name must be less than 100 characters')
    .optional(),
  fatherOccupation: z
    .string()
    .max(100, 'Occupation must be less than 100 characters')
    .optional(),
  motherName: z
    .string()
    .max(100, 'Mother name must be less than 100 characters')
    .optional(),
  motherOccupation: z
    .string()
    .max(100, 'Occupation must be less than 100 characters')
    .optional(),
  siblings: z
    .string()
    .max(200, 'Siblings info must be less than 200 characters')
    .optional(),
  familyType: z
    .enum(['Joint', 'Nuclear', 'Extended', ''])
    .optional(),
  familyValues: z
    .enum(['Traditional', 'Moderate', 'Liberal', ''])
    .optional(),
  familyStatus: z
    .enum(['Middle Class', 'Upper Middle Class', 'Rich', 'Affluent', ''])
    .optional(),
});

export type FamilyDetailsFormData = z.infer<typeof familyDetailsSchema>;

// ============================================
// Education Details Schema
// ============================================
export const educationDetailsSchema = z.object({
  highestQualification: z
    .string()
    .max(100, 'Qualification must be less than 100 characters')
    .optional(),
  university: z
    .string()
    .max(150, 'University name must be less than 150 characters')
    .optional(),
  additionalQualifications: z
    .string()
    .max(300, 'Additional qualifications must be less than 300 characters')
    .optional(),
});

export type EducationDetailsFormData = z.infer<typeof educationDetailsSchema>;

// ============================================
// Career Details Schema
// ============================================
export const careerDetailsSchema = z.object({
  occupation: z
    .string()
    .max(100, 'Occupation must be less than 100 characters')
    .optional(),
  companyName: z
    .string()
    .max(150, 'Company name must be less than 150 characters')
    .optional(),
  designation: z
    .string()
    .max(100, 'Designation must be less than 100 characters')
    .optional(),
  workLocation: z
    .string()
    .max(100, 'Work location must be less than 100 characters')
    .optional(),
  annualIncome: z
    .string()
    .optional(),
});

export type CareerDetailsFormData = z.infer<typeof careerDetailsSchema>;

// ============================================
// Contact Details Schema
// ============================================
export const contactDetailsSchema = z.object({
  address: z
    .string()
    .max(300, 'Address must be less than 300 characters')
    .optional(),
  city: z
    .string()
    .max(50, 'City must be less than 50 characters')
    .optional(),
  state: z
    .string()
    .max(50, 'State must be less than 50 characters')
    .optional(),
  pincode: z
    .string()
    .regex(/^[0-9]{6}$/, 'Pincode must be 6 digits')
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, 'Phone must be 10 digits')
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .email('Please enter a valid email')
    .optional()
    .or(z.literal('')),
});

export type ContactDetailsFormData = z.infer<typeof contactDetailsSchema>;

// ============================================
// Partner Preferences Schema
// ============================================
export const partnerPreferencesSchema = z.object({
  ageRange: z
    .string()
    .max(50, 'Age range must be less than 50 characters')
    .optional(),
  heightRange: z
    .string()
    .max(50, 'Height range must be less than 50 characters')
    .optional(),
  education: z
    .string()
    .max(150, 'Education preference must be less than 150 characters')
    .optional(),
  occupation: z
    .string()
    .max(150, 'Occupation preference must be less than 150 characters')
    .optional(),
  location: z
    .string()
    .max(150, 'Location preference must be less than 150 characters')
    .optional(),
  otherPreferences: z
    .string()
    .max(500, 'Other preferences must be less than 500 characters')
    .optional(),
});

export type PartnerPreferencesFormData = z.infer<typeof partnerPreferencesSchema>;

// ============================================
// Complete Biodata Schema
// ============================================
export const biodataSchema = z.object({
  personal: personalDetailsSchema,
  family: familyDetailsSchema,
  education: educationDetailsSchema,
  career: careerDetailsSchema,
  contact: contactDetailsSchema,
  partnerPreferences: partnerPreferencesSchema,
  photoUrl: z.string().optional(),
  hobbies: z.array(z.string()).optional(),
});

export type BiodataFormData = z.infer<typeof biodataSchema>;

// ============================================
// Step-wise validation
// ============================================
export const stepSchemas = [
  personalDetailsSchema,      // Step 0
  familyDetailsSchema,        // Step 1
  educationDetailsSchema,     // Step 2
  careerDetailsSchema,        // Step 3
  contactDetailsSchema,       // Step 4
  partnerPreferencesSchema,   // Step 5
] as const;

export const stepNames = [
  'Personal Details',
  'Family Details',
  'Education',
  'Career',
  'Contact',
  'Partner Preferences',
] as const;

// ============================================
// Dropdown Options
// ============================================
export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;

export const maritalStatuses = ['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'] as const;

export const dietOptions = ['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Vegan', 'Jain'] as const;

export const manglikOptions = ['Yes', 'No', 'Partial', "Don't Know"] as const;

export const familyTypes = ['Joint', 'Nuclear', 'Extended'] as const;

export const familyValues = ['Traditional', 'Moderate', 'Liberal'] as const;

export const familyStatuses = ['Middle Class', 'Upper Middle Class', 'Rich', 'Affluent'] as const;

export const rashiOptions = [
  'Aries (Mesh)',
  'Taurus (Vrishabh)',
  'Gemini (Mithun)',
  'Cancer (Kark)',
  'Leo (Simha)',
  'Virgo (Kanya)',
  'Libra (Tula)',
  'Scorpio (Vrishchik)',
  'Sagittarius (Dhanu)',
  'Capricorn (Makar)',
  'Aquarius (Kumbh)',
  'Pisces (Meen)',
] as const;

export const complexionOptions = [
  'Very Fair',
  'Fair',
  'Wheatish',
  'Wheatish Brown',
  'Dark',
] as const;

export const heightOptions = [
  "4'6\" (137 cm)",
  "4'7\" (140 cm)",
  "4'8\" (142 cm)",
  "4'9\" (145 cm)",
  "4'10\" (147 cm)",
  "4'11\" (150 cm)",
  "5'0\" (152 cm)",
  "5'1\" (155 cm)",
  "5'2\" (157 cm)",
  "5'3\" (160 cm)",
  "5'4\" (163 cm)",
  "5'5\" (165 cm)",
  "5'6\" (168 cm)",
  "5'7\" (170 cm)",
  "5'8\" (173 cm)",
  "5'9\" (175 cm)",
  "5'10\" (178 cm)",
  "5'11\" (180 cm)",
  "6'0\" (183 cm)",
  "6'1\" (185 cm)",
  "6'2\" (188 cm)",
  "6'3\" (190 cm)",
  "6'4\" (193 cm)",
  "6'5\" (196 cm)",
  "6'6\" (198 cm)",
] as const;

export const incomeOptions = [
  'Not Disclosed',
  'Below 2 Lakhs',
  '2-4 Lakhs',
  '4-6 Lakhs',
  '6-8 Lakhs',
  '8-10 Lakhs',
  '10-15 Lakhs',
  '15-20 Lakhs',
  '20-30 Lakhs',
  '30-50 Lakhs',
  '50 Lakhs - 1 Crore',
  'Above 1 Crore',
] as const;

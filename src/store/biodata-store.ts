import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Language } from '@/lib/types';
import { Theme, themes } from '@/lib/themes';
import { BorderDesign, borderDesigns } from '@/lib/borders';

// Biodata form data types
export interface PersonalDetails {
  fullName: string;
  dateOfBirth: string;
  birthTime: string;
  birthPlace: string;
  height: string;
  weight: string;
  complexion: string;
  bloodGroup: string;
  maritalStatus: string;
  diet: string;
  rashi: string;
  nakshatra: string;
  gotra: string;
  manglik: string;
}

export interface FamilyDetails {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  siblings: string;
  familyType: string;
  familyValues: string;
  familyStatus: string;
}

export interface EducationDetails {
  highestQualification: string;
  university: string;
  additionalQualifications: string;
}

export interface CareerDetails {
  occupation: string;
  companyName: string;
  designation: string;
  workLocation: string;
  annualIncome: string;
}

export interface ContactDetails {
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
}

export interface PartnerPreferences {
  ageRange: string;
  heightRange: string;
  education: string;
  occupation: string;
  location: string;
  otherPreferences: string;
}

export interface BiodataFormData {
  personal: PersonalDetails;
  family: FamilyDetails;
  education: EducationDetails;
  career: CareerDetails;
  contact: ContactDetails;
  partnerPreferences: PartnerPreferences;
  photoUrl: string;
  hobbies: string[];
}

// Initial empty form data
const initialFormData: BiodataFormData = {
  personal: {
    fullName: '',
    dateOfBirth: '',
    birthTime: '',
    birthPlace: '',
    height: '',
    weight: '',
    complexion: '',
    bloodGroup: '',
    maritalStatus: 'Never Married',
    diet: '',
    rashi: '',
    nakshatra: '',
    gotra: '',
    manglik: '',
  },
  family: {
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    siblings: '',
    familyType: '',
    familyValues: '',
    familyStatus: '',
  },
  education: {
    highestQualification: '',
    university: '',
    additionalQualifications: '',
  },
  career: {
    occupation: '',
    companyName: '',
    designation: '',
    workLocation: '',
    annualIncome: '',
  },
  contact: {
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
  },
  partnerPreferences: {
    ageRange: '',
    heightRange: '',
    education: '',
    occupation: '',
    location: '',
    otherPreferences: '',
  },
  photoUrl: '',
  hobbies: [],
};

// Store state interface
interface BiodataState {
  // Form data
  formData: BiodataFormData;

  // UI State
  language: Language;
  currentTheme: Theme;
  currentBorder: BorderDesign;
  isEditing: boolean;
  currentStep: number;

  // Actions - Form Data
  updatePersonalDetails: (data: Partial<PersonalDetails>) => void;
  updateFamilyDetails: (data: Partial<FamilyDetails>) => void;
  updateEducationDetails: (data: Partial<EducationDetails>) => void;
  updateCareerDetails: (data: Partial<CareerDetails>) => void;
  updateContactDetails: (data: Partial<ContactDetails>) => void;
  updatePartnerPreferences: (data: Partial<PartnerPreferences>) => void;
  setPhotoUrl: (url: string) => void;
  setHobbies: (hobbies: string[]) => void;
  resetForm: () => void;

  // Actions - UI State
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  setBorder: (border: BorderDesign) => void;
  setIsEditing: (editing: boolean) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
}

// Create the store with persistence
export const useBiodataStore = create<BiodataState>()(
  persist(
    (set, get) => ({
      // Initial state
      formData: initialFormData,
      language: 'en',
      currentTheme: themes[0],
      currentBorder: borderDesigns[0],
      isEditing: false,
      currentStep: 0,

      // Form data actions
      updatePersonalDetails: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            personal: { ...state.formData.personal, ...data },
          },
        })),

      updateFamilyDetails: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            family: { ...state.formData.family, ...data },
          },
        })),

      updateEducationDetails: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            education: { ...state.formData.education, ...data },
          },
        })),

      updateCareerDetails: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            career: { ...state.formData.career, ...data },
          },
        })),

      updateContactDetails: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            contact: { ...state.formData.contact, ...data },
          },
        })),

      updatePartnerPreferences: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            partnerPreferences: { ...state.formData.partnerPreferences, ...data },
          },
        })),

      setPhotoUrl: (url) =>
        set((state) => ({
          formData: { ...state.formData, photoUrl: url },
        })),

      setHobbies: (hobbies) =>
        set((state) => ({
          formData: { ...state.formData, hobbies },
        })),

      resetForm: () =>
        set({ formData: initialFormData, currentStep: 0 }),

      // UI state actions
      setLanguage: (language) => set({ language }),

      setTheme: (currentTheme) => set({ currentTheme }),

      setBorder: (currentBorder) => set({ currentBorder }),

      setIsEditing: (isEditing) => set({ isEditing }),

      setCurrentStep: (currentStep) => set({ currentStep }),

      nextStep: () =>
        set((state) => ({ currentStep: Math.min(state.currentStep + 1, 5) })),

      prevStep: () =>
        set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),
    }),
    {
      name: 'bio-maker-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        formData: state.formData,
        language: state.language,
        currentTheme: state.currentTheme,
        currentBorder: state.currentBorder,
      }),
    }
  )
);

// Selector hooks for better performance
export const useFormData = () => useBiodataStore((state) => state.formData);
export const useLanguage = () => useBiodataStore((state) => state.language);
export const useTheme = () => useBiodataStore((state) => state.currentTheme);
export const useBorder = () => useBiodataStore((state) => state.currentBorder);
export const useCurrentStep = () => useBiodataStore((state) => state.currentStep);

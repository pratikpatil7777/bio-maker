'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Language } from '@/lib/types';
import { useDarkMode } from '@/lib/DarkModeContext';

interface AIBioWriterProps {
  language: Language;
  currentName?: string;
  onBioGenerated: (sections: GeneratedSection[]) => void;
  onClose: () => void;
}

interface GeneratedSection {
  title: string;
  titleMarathi: string;
  fields: Array<{
    label: string;
    labelMarathi: string;
    value: string;
    valueMarathi: string;
  }>;
}

interface FormData {
  // Personal
  name: string;
  age: string;
  gender: 'male' | 'female';
  height: string;
  complexion: string;
  birthPlace: string;
  currentCity: string;
  // Education & Career
  education: string;
  profession: string;
  company: string;
  income: string;
  // Family
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  siblings: string;
  familyType: string;
  caste: string;
  gotra: string;
  // Lifestyle
  hobbies: string;
  diet: string;
  // Settings
  tone: 'traditional' | 'modern' | 'professional';
  outputLanguage: 'english' | 'marathi' | 'both';
}

const initialFormData: FormData = {
  name: '',
  age: '',
  gender: 'male',
  height: '',
  complexion: '',
  birthPlace: '',
  currentCity: '',
  education: '',
  profession: '',
  company: '',
  income: '',
  fatherName: '',
  fatherOccupation: '',
  motherName: '',
  motherOccupation: '',
  siblings: '',
  familyType: '',
  caste: '',
  gotra: '',
  hobbies: '',
  diet: '',
  tone: 'modern',
  outputLanguage: 'both',
};

export default function AIBioWriter({ language, currentName, onBioGenerated, onClose }: AIBioWriterProps) {
  const { isDark } = useDarkMode();
  const [step, setStep] = useState<'form' | 'loading' | 'result'>('form');
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    name: currentName || '',
  });
  const [generatedSections, setGeneratedSections] = useState<GeneratedSection[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [remainingCredits, setRemainingCredits] = useState<number | null>(null);

  const isMarathi = language === 'mr';

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    setStep('loading');
    setError(null);

    try {
      const response = await fetch('/api/ai/generate-bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age) || 25,
          language: formData.outputLanguage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.errorMarathi || 'Failed to generate bio');
      }

      setGeneratedSections(data.bio.sections || []);
      setRemainingCredits(data.remainingCredits);
      setStep('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setStep('form');
    }
  };

  const handleUseBio = () => {
    onBioGenerated(generatedSections);
    onClose();
  };

  const totalSteps = 4;
  const canProceed = () => {
    switch (formStep) {
      case 1: return formData.name && formData.age && formData.education && formData.profession;
      case 2: return true; // Family details are optional
      case 3: return true; // Lifestyle is optional
      case 4: return true; // Settings
      default: return false;
    }
  };

  const renderFormStep = () => {
    switch (formStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {isMarathi ? 'मूलभूत माहिती' : 'Basic Information'}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {isMarathi ? 'तारांकित (*) फील्ड आवश्यक आहेत' : 'Fields marked with * are required'}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isMarathi ? 'पूर्ण नाव' : 'Full Name'} *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                  placeholder={isMarathi ? 'उदा. प्रतीक रविंद्र पाटील' : 'e.g., Pratik Ravindra Patil'}
                />
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isMarathi ? 'वय' : 'Age'} *
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                  placeholder="25"
                  min="18"
                  max="100"
                />
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isMarathi ? 'लिंग' : 'Gender'} *
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                >
                  <option value="male">{isMarathi ? 'पुरुष' : 'Male'}</option>
                  <option value="female">{isMarathi ? 'स्त्री' : 'Female'}</option>
                </select>
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isMarathi ? 'उंची' : 'Height'}
                </label>
                <input
                  type="text"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                  placeholder={isMarathi ? "उदा. 5'8\"" : "e.g., 5'8\""}
                />
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isMarathi ? 'वर्ण' : 'Complexion'}
                </label>
                <input
                  type="text"
                  value={formData.complexion}
                  onChange={(e) => handleInputChange('complexion', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                  placeholder={isMarathi ? 'उदा. गोरा' : 'e.g., Fair'}
                />
              </div>

              <div className="col-span-2">
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isMarathi ? 'शिक्षण' : 'Education'} *
                </label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                  placeholder={isMarathi ? 'उदा. B.Tech (Computer Science), IIT Mumbai' : 'e.g., B.Tech (Computer Science), IIT Mumbai'}
                />
              </div>

              <div className="col-span-2">
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isMarathi ? 'व्यवसाय' : 'Profession'} *
                </label>
                <input
                  type="text"
                  value={formData.profession}
                  onChange={(e) => handleInputChange('profession', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                  placeholder={isMarathi ? 'उदा. Software Engineer' : 'e.g., Software Engineer'}
                />
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isMarathi ? 'कंपनी' : 'Company'}
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                  placeholder={isMarathi ? 'उदा. Google' : 'e.g., Google'}
                />
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isMarathi ? 'वार्षिक उत्पन्न' : 'Annual Income'}
                </label>
                <input
                  type="text"
                  value={formData.income}
                  onChange={(e) => handleInputChange('income', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                  placeholder={isMarathi ? 'उदा. ₹15-20 LPA' : 'e.g., ₹15-20 LPA'}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {isMarathi ? 'कौटुंबिक माहिती' : 'Family Information'}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {isMarathi ? 'जे माहित आहे ते भरा' : 'Fill in what you know'}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isMarathi ? 'वडिलांचे नाव' : "Father's Name"}
                </label>
                <input
                  type="text"
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                />
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isMarathi ? 'वडिलांचा व्यवसाय' : "Father's Occupation"}
                </label>
                <input
                  type="text"
                  value={formData.fatherOccupation}
                  onChange={(e) => handleInputChange('fatherOccupation', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                />
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isMarathi ? 'आईचे नाव' : "Mother's Name"}
                </label>
                <input
                  type="text"
                  value={formData.motherName}
                  onChange={(e) => handleInputChange('motherName', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                />
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isMarathi ? 'आईचा व्यवसाय' : "Mother's Occupation"}
                </label>
                <input
                  type="text"
                  value={formData.motherOccupation}
                  onChange={(e) => handleInputChange('motherOccupation', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                />
              </div>

              <div className="col-span-2">
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isMarathi ? 'भावंडे' : 'Siblings'}
                </label>
                <input
                  type="text"
                  value={formData.siblings}
                  onChange={(e) => handleInputChange('siblings', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                  placeholder={isMarathi ? 'उदा. 1 भाऊ (विवाहित), 1 बहीण' : 'e.g., 1 elder brother (married), 1 younger sister'}
                />
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isMarathi ? 'जात/समाज' : 'Caste/Community'}
                </label>
                <input
                  type="text"
                  value={formData.caste}
                  onChange={(e) => handleInputChange('caste', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                  placeholder={isMarathi ? 'उदा. मराठा, ब्राह्मण' : 'e.g., Maratha, Brahmin'}
                />
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isMarathi ? 'गोत्र' : 'Gotra'}
                </label>
                <input
                  type="text"
                  value={formData.gotra}
                  onChange={(e) => handleInputChange('gotra', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                />
              </div>

              <div className="col-span-2">
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isMarathi ? 'कुटुंब प्रकार' : 'Family Type'}
                </label>
                <select
                  value={formData.familyType}
                  onChange={(e) => handleInputChange('familyType', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                >
                  <option value="">{isMarathi ? 'निवडा' : 'Select'}</option>
                  <option value="Nuclear">{isMarathi ? 'विभक्त कुटुंब' : 'Nuclear Family'}</option>
                  <option value="Joint">{isMarathi ? 'संयुक्त कुटुंब' : 'Joint Family'}</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {isMarathi ? 'जीवनशैली व आवडी' : 'Lifestyle & Interests'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isMarathi ? 'छंद व आवडी' : 'Hobbies & Interests'}
                </label>
                <textarea
                  value={formData.hobbies}
                  onChange={(e) => handleInputChange('hobbies', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                  rows={3}
                  placeholder={isMarathi ? 'उदा. वाचन, प्रवास, संगीत, खेळ, स्वयंपाक...' : 'e.g., Reading, Traveling, Music, Sports, Cooking...'}
                />
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isMarathi ? 'आहार' : 'Diet'}
                </label>
                <select
                  value={formData.diet}
                  onChange={(e) => handleInputChange('diet', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                >
                  <option value="">{isMarathi ? 'निवडा' : 'Select'}</option>
                  <option value="Vegetarian">{isMarathi ? 'शाकाहारी' : 'Vegetarian'}</option>
                  <option value="Non-Vegetarian">{isMarathi ? 'मांसाहारी' : 'Non-Vegetarian'}</option>
                  <option value="Eggetarian">{isMarathi ? 'अंडाहारी' : 'Eggetarian'}</option>
                  <option value="Vegan">{isMarathi ? 'वीगन' : 'Vegan'}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {isMarathi ? 'जन्मस्थान' : 'Birth Place'}
                  </label>
                  <input
                    type="text"
                    value={formData.birthPlace}
                    onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                    placeholder={isMarathi ? 'उदा. पुणे' : 'e.g., Pune'}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {isMarathi ? 'सध्याचे शहर' : 'Current City'}
                  </label>
                  <input
                    type="text"
                    value={formData.currentCity}
                    onChange={(e) => handleInputChange('currentCity', e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                    placeholder={isMarathi ? 'उदा. मुंबई' : 'e.g., Mumbai'}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {isMarathi ? 'लेखन शैली निवडा' : 'Choose Writing Style'}
            </h3>

            {/* Tone Selection */}
            <div className="space-y-3">
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {isMarathi ? 'टोन' : 'Tone'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'traditional', label: isMarathi ? 'पारंपरिक' : 'Traditional', icon: '🙏', desc: isMarathi ? 'औपचारिक, कुटुंब-केंद्रित' : 'Formal, family-focused' },
                  { value: 'modern', label: isMarathi ? 'आधुनिक' : 'Modern', icon: '✨', desc: isMarathi ? 'मैत्रीपूर्ण, व्यक्तिमत्व-केंद्रित' : 'Friendly, personality-focused' },
                  { value: 'professional', label: isMarathi ? 'व्यावसायिक' : 'Professional', icon: '💼', desc: isMarathi ? 'करिअर-केंद्रित' : 'Career-focused' },
                ].map((tone) => (
                  <button
                    key={tone.value}
                    onClick={() => handleInputChange('tone', tone.value)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      formData.tone === tone.value
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                        : isDark ? 'border-slate-600 hover:border-slate-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{tone.icon}</span>
                    <span className={`font-semibold block ${isDark ? 'text-white' : 'text-gray-800'}`}>{tone.label}</span>
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{tone.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div className="space-y-3">
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {isMarathi ? 'आउटपुट भाषा' : 'Output Language'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'english', label: 'English Only', icon: '🇬🇧' },
                  { value: 'marathi', label: 'मराठी Only', icon: '🇮🇳' },
                  { value: 'both', label: isMarathi ? 'दोन्ही' : 'Both', icon: '🌐' },
                ].map((lang) => (
                  <button
                    key={lang.value}
                    onClick={() => handleInputChange('outputLanguage', lang.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.outputLanguage === lang.value
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                        : isDark ? 'border-slate-600 hover:border-slate-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl mb-1 block">{lang.icon}</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
        {/* Header */}
        <div className={`sticky top-0 z-10 px-6 py-4 border-b ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <span className="text-2xl">✨</span>
              </div>
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {isMarathi ? 'AI बायो लेखक' : 'AI Bio Writer'}
                </h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {isMarathi ? 'तुमचा बायोडाटा आपोआप लिहा' : 'Auto-generate your biodata content'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`w-10 h-10 rounded-xl ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'} flex items-center justify-center transition-colors`}
            >
              <svg className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Steps */}
          {step === 'form' && (
            <div className="flex items-center gap-2 mt-4">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                      s === formStep
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                        : s < formStep
                        ? 'bg-green-500 text-white'
                        : isDark ? 'bg-slate-700 text-gray-400' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {s < formStep ? '✓' : s}
                  </div>
                  {s < 4 && (
                    <div className={`w-8 h-1 mx-1 rounded ${s < formStep ? 'bg-green-500' : isDark ? 'bg-slate-700' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {error && (
            <div className={`mb-4 p-4 rounded-xl ${isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-600'} text-sm`}>
              {error}
            </div>
          )}

          {step === 'form' && renderFormStep()}

          {step === 'loading' && (
            <div className="py-16 text-center">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 animate-spin" style={{ animationDuration: '3s' }}>
                  <div className={`absolute inset-1 rounded-full ${isDark ? 'bg-slate-800' : 'bg-white'}`} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl animate-pulse">✨</span>
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {isMarathi ? 'तुमचा बायो लिहित आहे...' : 'Writing your bio...'}
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {isMarathi ? 'AI तुमची माहिती समजून घेत आहे' : 'AI is understanding your information'}
              </p>
            </div>
          )}

          {step === 'result' && (
            <div className="space-y-4">
              <div className={`p-4 rounded-xl ${isDark ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold">
                    {isMarathi ? 'बायो यशस्वीरित्या तयार झाला!' : 'Bio generated successfully!'}
                  </span>
                </div>
              </div>

              {/* Preview Generated Sections */}
              <div className={`rounded-xl border ${isDark ? 'border-slate-700' : 'border-gray-200'} overflow-hidden`}>
                <div className={`px-4 py-3 ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {isMarathi ? 'पूर्वावलोकन' : 'Preview'}
                  </h4>
                </div>
                <div className="p-4 space-y-4 max-h-60 overflow-y-auto">
                  {generatedSections.map((section, idx) => (
                    <div key={idx}>
                      <h5 className={`font-semibold text-amber-600 dark:text-amber-400 mb-2`}>
                        {isMarathi ? section.titleMarathi : section.title}
                      </h5>
                      <div className="space-y-1">
                        {section.fields.map((field, fidx) => (
                          <div key={fidx} className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            <span className="font-medium">{isMarathi ? field.labelMarathi : field.label}:</span>{' '}
                            <span>{isMarathi ? field.valueMarathi : field.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {remainingCredits !== null && (
                <p className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {isMarathi ? `आज शिल्लक: ${remainingCredits} जनरेशन` : `Remaining today: ${remainingCredits} generations`}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`sticky bottom-0 px-6 py-4 border-t ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
          {step === 'form' && (
            <div className="flex items-center justify-between">
              <button
                onClick={() => setFormStep(Math.max(1, formStep - 1))}
                disabled={formStep === 1}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                  formStep === 1
                    ? 'opacity-50 cursor-not-allowed'
                    : isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
                } ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              >
                {isMarathi ? 'मागे' : 'Back'}
              </button>

              {formStep < totalSteps ? (
                <button
                  onClick={() => setFormStep(formStep + 1)}
                  disabled={!canProceed()}
                  className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                    canProceed()
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:scale-[1.02]'
                      : 'bg-gray-300 dark:bg-slate-600 text-gray-500 dark:text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isMarathi ? 'पुढे' : 'Next'}
                </button>
              ) : (
                <button
                  onClick={handleGenerate}
                  className="px-6 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                  <span>✨</span>
                  <span>{isMarathi ? 'बायो तयार करा' : 'Generate Bio'}</span>
                </button>
              )}
            </div>
          )}

          {step === 'result' && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setStep('form'); setFormStep(1); }}
                className={`flex-1 px-5 py-3 rounded-xl font-medium ${isDark ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-all`}
              >
                {isMarathi ? 'पुन्हा तयार करा' : 'Regenerate'}
              </button>
              <button
                onClick={handleUseBio}
                className="flex-1 px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                {isMarathi ? 'हा वापरा' : 'Use This Bio'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

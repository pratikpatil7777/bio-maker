# AI Bio Writer - Technical Implementation Guide

## Overview

The AI Bio Writer is a feature that automatically generates professional, well-written biodata content based on basic input from the user. This document outlines the complete implementation strategy.

---

## 1. Feature Specification

### 1.1 User Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER JOURNEY                              │
└─────────────────────────────────────────────────────────────────┘

1. User clicks "AI Write My Bio" button
                    │
                    ▼
2. Modal opens with simple form
   ┌─────────────────────────────┐
   │  Name: [_______________]    │
   │  Age: [__]  Gender: [▼]    │
   │  Education: [___________]   │
   │  Profession: [__________]   │
   │  About Family: [________]   │
   │  Hobbies: [_____________]   │
   │                             │
   │  Tone: ○ Traditional        │
   │        ● Modern             │
   │        ○ Professional       │
   │                             │
   │  Language: ○ English        │
   │            ● Both (EN + MR) │
   │                             │
   │  [Generate Bio ✨]          │
   └─────────────────────────────┘
                    │
                    ▼
3. Loading state with animation (2-5 seconds)
                    │
                    ▼
4. Generated bio displayed with options:
   ┌─────────────────────────────┐
   │  "Pratik is a dedicated     │
   │  software engineer with..." │
   │                             │
   │  [Use This] [Regenerate]    │
   │  [Edit Before Using]        │
   └─────────────────────────────┘
                    │
                    ▼
5. Bio inserted into biodata sections
```

### 1.2 Output Sections Generated

The AI will generate content for these biodata sections:

| Section | Generated Content |
|---------|-------------------|
| **About Me** | 2-3 sentence personal introduction |
| **Education** | Formatted education details |
| **Profession** | Career description with achievements |
| **Family** | Family background description |
| **Lifestyle** | Hobbies, interests, values |
| **Partner Preferences** | What they're looking for (optional) |

### 1.3 Tone Options

**Traditional:**
```
"Pratik belongs to a well-established Marathi family with strong
cultural values. He is a devoted son who respects elders and
believes in maintaining family traditions..."
```

**Modern:**
```
"Pratik is a tech enthusiast who loves building things that matter.
When not coding, you'll find him exploring new cuisines or planning
his next travel adventure..."
```

**Professional:**
```
"A results-driven software engineer with 5+ years of experience in
full-stack development. Pratik holds a B.Tech from IIT Bombay and
currently works at a leading tech company..."
```

---

## 2. Technical Architecture

### 2.1 System Design

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Frontend  │────▶│  API Route   │────▶│  AI Service │
│  (React)    │◀────│ (Next.js)    │◀────│  (Claude)   │
└─────────────┘     └──────────────┘     └─────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │    Cache     │
                    │   (Redis)    │
                    └──────────────┘
```

### 2.2 API Route Implementation

**File:** `src/app/api/ai/generate-bio/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// Rate limiting store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = {
  FREE_TIER: 3,      // 3 requests per day
  PREMIUM_TIER: 10,  // 10 requests per day
  PRO_TIER: 50,      // 50 requests per day
};

interface GenerateBioRequest {
  name: string;
  age: number;
  gender: 'male' | 'female';
  education: string;
  profession: string;
  familyDetails?: string;
  hobbies?: string;
  tone: 'traditional' | 'modern' | 'professional';
  language: 'english' | 'marathi' | 'both';
  includePartnerPreferences?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate user (get from session/token)
    const userId = await getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // 2. Check rate limit
    const userTier = await getUserTier(userId);
    const isAllowed = checkRateLimit(userId, userTier);
    if (!isAllowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again tomorrow or upgrade your plan.' },
        { status: 429 }
      );
    }

    // 3. Parse and validate input
    const body: GenerateBioRequest = await request.json();
    const validationError = validateInput(body);
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    // 4. Generate bio using Claude
    const generatedBio = await generateBioWithClaude(body);

    // 5. Log usage for analytics
    await logUsage(userId, 'bio_generation', body.tone, body.language);

    // 6. Return response
    return NextResponse.json({
      success: true,
      bio: generatedBio,
      remainingCredits: getRemainingCredits(userId, userTier),
    });

  } catch (error) {
    console.error('AI Bio Generation Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate bio. Please try again.' },
      { status: 500 }
    );
  }
}

async function generateBioWithClaude(input: GenerateBioRequest) {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const systemPrompt = buildSystemPrompt(input.tone, input.language);
  const userPrompt = buildUserPrompt(input);

  const response = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307', // Use Haiku for cost efficiency
    max_tokens: 1024,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
  });

  // Extract text from response
  const textContent = response.content.find(block => block.type === 'text');
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text content in response');
  }

  // Parse the structured response
  return parseGeneratedBio(textContent.text);
}

function buildSystemPrompt(tone: string, language: string): string {
  const toneInstructions = {
    traditional: `Write in a formal, respectful tone that emphasizes family values,
      cultural heritage, and traditional virtues. Use honorifics where appropriate.
      Mention respect for elders, religious/spiritual inclinations, and family bonds.`,

    modern: `Write in a warm, conversational tone that highlights personality,
      interests, and aspirations. Make it relatable and engaging. Focus on
      individual achievements while acknowledging family support.`,

    professional: `Write in a polished, achievement-focused tone. Highlight
      educational qualifications, career accomplishments, and professional growth.
      Be concise and impactful.`,
  };

  const languageInstructions = {
    english: 'Write entirely in English.',
    marathi: 'Write entirely in Marathi (Devanagari script).',
    both: `Write in both English and Marathi. Provide the English version first,
      then the Marathi translation. Separate them clearly with "---".`,
  };

  return `You are an expert marriage biodata writer for Indian families.
Your task is to create compelling, culturally appropriate biodata content.

TONE: ${toneInstructions[tone as keyof typeof toneInstructions]}

LANGUAGE: ${languageInstructions[language as keyof typeof languageInstructions]}

IMPORTANT GUIDELINES:
- Be respectful and positive
- Do not make up specific details not provided
- Keep each section concise (2-4 sentences)
- Use appropriate honorifics in Marathi (श्री, श्रीमती, etc.)
- Avoid clichés and generic phrases
- Make the person sound genuine and relatable

OUTPUT FORMAT:
Return a JSON object with these fields:
{
  "aboutMe": "...",
  "education": "...",
  "profession": "...",
  "family": "...",
  "lifestyle": "...",
  "partnerPreferences": "..." // if requested
}

For "both" language, each field should be:
{
  "aboutMe": {
    "english": "...",
    "marathi": "..."
  },
  ...
}`;
}

function buildUserPrompt(input: GenerateBioRequest): string {
  return `Please generate marriage biodata content for:

NAME: ${input.name}
AGE: ${input.age} years
GENDER: ${input.gender}
EDUCATION: ${input.education}
PROFESSION: ${input.profession}
FAMILY DETAILS: ${input.familyDetails || 'Not provided'}
HOBBIES/INTERESTS: ${input.hobbies || 'Not provided'}
INCLUDE PARTNER PREFERENCES: ${input.includePartnerPreferences ? 'Yes' : 'No'}

Generate appropriate content for each section based on the information provided.
Keep it authentic and avoid generic filler text.`;
}

function parseGeneratedBio(rawText: string): object {
  try {
    // Extract JSON from the response
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('No JSON found in response');
  } catch (error) {
    console.error('Failed to parse bio:', error);
    // Return raw text as fallback
    return { raw: rawText };
  }
}

// Helper functions (implement based on your auth system)
async function getUserIdFromRequest(request: NextRequest): Promise<string | null> {
  // Implement based on your auth (Clerk, NextAuth, etc.)
  return 'user_123'; // Placeholder
}

async function getUserTier(userId: string): Promise<string> {
  // Fetch from database
  return 'free'; // Placeholder
}

function checkRateLimit(userId: string, tier: string): boolean {
  const limit = RATE_LIMIT[`${tier.toUpperCase()}_TIER` as keyof typeof RATE_LIMIT] || RATE_LIMIT.FREE_TIER;
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  const userLimit = rateLimitStore.get(userId);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitStore.set(userId, { count: 1, resetTime: now + dayMs });
    return true;
  }

  if (userLimit.count >= limit) {
    return false;
  }

  userLimit.count++;
  return true;
}

function getRemainingCredits(userId: string, tier: string): number {
  const limit = RATE_LIMIT[`${tier.toUpperCase()}_TIER` as keyof typeof RATE_LIMIT] || RATE_LIMIT.FREE_TIER;
  const userLimit = rateLimitStore.get(userId);
  return userLimit ? limit - userLimit.count : limit;
}

async function logUsage(userId: string, action: string, tone: string, language: string) {
  // Log to analytics/database
  console.log(`Usage: ${userId} - ${action} - ${tone} - ${language}`);
}

function validateInput(body: GenerateBioRequest): string | null {
  if (!body.name || body.name.length < 2) {
    return 'Name is required';
  }
  if (!body.age || body.age < 18 || body.age > 100) {
    return 'Valid age (18-100) is required';
  }
  if (!['male', 'female'].includes(body.gender)) {
    return 'Valid gender is required';
  }
  if (!body.education) {
    return 'Education is required';
  }
  if (!body.profession) {
    return 'Profession is required';
  }
  if (!['traditional', 'modern', 'professional'].includes(body.tone)) {
    return 'Valid tone is required';
  }
  if (!['english', 'marathi', 'both'].includes(body.language)) {
    return 'Valid language is required';
  }
  return null;
}
```

### 2.3 Frontend Component

**File:** `src/components/AIBioWriter.tsx`

```typescript
'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/types';

interface AIBioWriterProps {
  language: Language;
  onBioGenerated: (bio: GeneratedBio) => void;
  onClose: () => void;
}

interface GeneratedBio {
  aboutMe: string | { english: string; marathi: string };
  education: string | { english: string; marathi: string };
  profession: string | { english: string; marathi: string };
  family: string | { english: string; marathi: string };
  lifestyle: string | { english: string; marathi: string };
  partnerPreferences?: string | { english: string; marathi: string };
}

interface FormData {
  name: string;
  age: string;
  gender: 'male' | 'female';
  education: string;
  profession: string;
  familyDetails: string;
  hobbies: string;
  tone: 'traditional' | 'modern' | 'professional';
  outputLanguage: 'english' | 'marathi' | 'both';
  includePartnerPreferences: boolean;
}

export default function AIBioWriter({ language, onBioGenerated, onClose }: AIBioWriterProps) {
  const [step, setStep] = useState<'form' | 'loading' | 'result'>('form');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    gender: 'male',
    education: '',
    profession: '',
    familyDetails: '',
    hobbies: '',
    tone: 'modern',
    outputLanguage: 'both',
    includePartnerPreferences: false,
  });
  const [generatedBio, setGeneratedBio] = useState<GeneratedBio | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [remainingCredits, setRemainingCredits] = useState<number | null>(null);

  const isMarathi = language === 'mr';

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
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
          age: parseInt(formData.age),
          language: formData.outputLanguage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate bio');
      }

      setGeneratedBio(data.bio);
      setRemainingCredits(data.remainingCredits);
      setStep('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setStep('form');
    }
  };

  const handleUseBio = () => {
    if (generatedBio) {
      onBioGenerated(generatedBio);
      onClose();
    }
  };

  const handleRegenerate = () => {
    setStep('form');
    setGeneratedBio(null);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-xl">✨</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {isMarathi ? 'AI बायो लेखक' : 'AI Bio Writer'}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isMarathi ? 'तुमचा बायो आपोआप लिहा' : 'Auto-generate your bio'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'form' && (
            <div className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Basic Info Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {isMarathi ? 'नाव' : 'Name'}*
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                    placeholder={isMarathi ? 'पूर्ण नाव' : 'Full name'}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {isMarathi ? 'वय' : 'Age'}*
                    </label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                      placeholder="25"
                      min="18"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {isMarathi ? 'लिंग' : 'Gender'}*
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                    >
                      <option value="male">{isMarathi ? 'पुरुष' : 'Male'}</option>
                      <option value="female">{isMarathi ? 'स्त्री' : 'Female'}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Education & Profession */}
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {isMarathi ? 'शिक्षण' : 'Education'}*
                </label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                  placeholder={isMarathi ? 'उदा. B.Tech, IIT Mumbai' : 'e.g., B.Tech, IIT Mumbai'}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {isMarathi ? 'व्यवसाय' : 'Profession'}*
                </label>
                <input
                  type="text"
                  value={formData.profession}
                  onChange={(e) => handleInputChange('profession', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                  placeholder={isMarathi ? 'उदा. Software Engineer at Google' : 'e.g., Software Engineer at Google'}
                />
              </div>

              {/* Optional Fields */}
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {isMarathi ? 'कुटुंब माहिती' : 'Family Details'} (Optional)
                </label>
                <textarea
                  value={formData.familyDetails}
                  onChange={(e) => handleInputChange('familyDetails', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                  rows={2}
                  placeholder={isMarathi ? 'वडील - व्यवसाय, आई - व्यवसाय, भावंडे...' : 'Father - occupation, Mother - occupation, siblings...'}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {isMarathi ? 'छंद आणि आवडी' : 'Hobbies & Interests'} (Optional)
                </label>
                <input
                  type="text"
                  value={formData.hobbies}
                  onChange={(e) => handleInputChange('hobbies', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                  placeholder={isMarathi ? 'वाचन, प्रवास, संगीत...' : 'Reading, traveling, music...'}
                />
              </div>

              {/* Tone Selection */}
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isMarathi ? 'लेखन शैली' : 'Writing Tone'}
                </label>
                <div className="flex gap-2">
                  {(['traditional', 'modern', 'professional'] as const).map((tone) => (
                    <button
                      key={tone}
                      onClick={() => handleInputChange('tone', tone)}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                        formData.tone === tone
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {tone === 'traditional' ? (isMarathi ? 'पारंपरिक' : 'Traditional') :
                       tone === 'modern' ? (isMarathi ? 'आधुनिक' : 'Modern') :
                       (isMarathi ? 'व्यावसायिक' : 'Professional')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Selection */}
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isMarathi ? 'आउटपुट भाषा' : 'Output Language'}
                </label>
                <div className="flex gap-2">
                  {(['english', 'marathi', 'both'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleInputChange('outputLanguage', lang)}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                        formData.outputLanguage === lang
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                          : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {lang === 'english' ? 'English' :
                       lang === 'marathi' ? 'मराठी' :
                       (isMarathi ? 'दोन्ही' : 'Both')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Partner Preferences Toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`relative w-10 h-5 rounded-full transition-colors ${
                  formData.includePartnerPreferences ? 'bg-purple-500' : 'bg-gray-300 dark:bg-slate-600'
                }`}>
                  <input
                    type="checkbox"
                    checked={formData.includePartnerPreferences}
                    onChange={(e) => handleInputChange('includePartnerPreferences', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                    formData.includePartnerPreferences ? 'translate-x-5' : ''
                  }`} />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {isMarathi ? 'जोडीदार अपेक्षा समाविष्ट करा' : 'Include partner preferences'}
                </span>
              </label>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!formData.name || !formData.age || !formData.education || !formData.profession}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <span>✨</span>
                <span>{isMarathi ? 'बायो तयार करा' : 'Generate Bio'}</span>
              </button>

              {remainingCredits !== null && (
                <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                  {isMarathi ? `आज शिल्लक: ${remainingCredits} जनरेशन` : `Remaining today: ${remainingCredits} generations`}
                </p>
              )}
            </div>
          )}

          {step === 'loading' && (
            <div className="py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
                <span className="text-3xl">✨</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                {isMarathi ? 'तुमचा बायो लिहित आहे...' : 'Writing your bio...'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {isMarathi ? 'कृपया काही सेकंद थांबा' : 'Please wait a few seconds'}
              </p>
            </div>
          )}

          {step === 'result' && generatedBio && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50 space-y-3">
                {Object.entries(generatedBio).map(([key, value]) => (
                  <div key={key}>
                    <h4 className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase mb-1">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {typeof value === 'string' ? value : value.english}
                    </p>
                    {typeof value === 'object' && value.marathi && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-[Noto_Sans_Devanagari]">
                        {value.marathi}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleUseBio}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:opacity-90 transition-all"
                >
                  {isMarathi ? 'हा वापरा' : 'Use This Bio'}
                </button>
                <button
                  onClick={handleRegenerate}
                  className="py-3 px-4 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-slate-600 transition-all"
                >
                  🔄
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## 3. Cost Analysis

### 3.1 AI API Costs

Using **Claude 3 Haiku** (most cost-effective):
- Input: $0.25 / 1M tokens
- Output: $1.25 / 1M tokens

**Per Request Estimate:**
- Input tokens: ~500 (prompt + user input)
- Output tokens: ~800 (generated bio)
- Cost per request: ~$0.001125 (₹0.09)

### 3.2 Monthly Cost Projections

| Users | Free (3/day) | Premium (10/day) | Total Requests | Monthly Cost |
|-------|--------------|------------------|----------------|--------------|
| 1,000 | 3,000 | 0 | 3,000 | ₹270 |
| 10,000 | 24,000 | 6,000 | 30,000 | ₹2,700 |
| 50,000 | 100,000 | 50,000 | 150,000 | ₹13,500 |
| 100,000 | 180,000 | 120,000 | 300,000 | ₹27,000 |

**Conclusion:** AI costs are very manageable, even at scale.

### 3.3 Cost Optimization Strategies

1. **Caching:** Cache common bio patterns
2. **Shorter Model:** Use Haiku instead of Sonnet/Opus
3. **Rate Limiting:** Enforce strict limits on free tier
4. **Batch Processing:** Process during off-peak hours

---

## 4. Integration Steps

### Step 1: Set Up API Key
```bash
# .env.local
ANTHROPIC_API_KEY=sk-ant-...
```

### Step 2: Install SDK
```bash
npm install @anthropic-ai/sdk
```

### Step 3: Create API Route
Create `src/app/api/ai/generate-bio/route.ts` with the code above.

### Step 4: Add Component
Create `src/components/AIBioWriter.tsx` with the code above.

### Step 5: Integrate in BiodataBuilder
```typescript
// In BiodataBuilder.tsx
const [showAIWriter, setShowAIWriter] = useState(false);

// Add button in toolbar
<button onClick={() => setShowAIWriter(true)}>
  ✨ AI Write Bio
</button>

// Add modal
{showAIWriter && (
  <AIBioWriter
    language={language}
    onBioGenerated={handleAIBioGenerated}
    onClose={() => setShowAIWriter(false)}
  />
)}

// Handle generated bio
const handleAIBioGenerated = (bio: GeneratedBio) => {
  // Convert bio sections to biodata sections
  // Update data state
};
```

---

## 5. Security Considerations

1. **Rate Limiting:** Prevent abuse and cost overruns
2. **Input Sanitization:** Clean user input before sending to AI
3. **Content Filtering:** Check output for inappropriate content
4. **Authentication:** Require login for AI features
5. **Logging:** Track usage for billing and abuse detection
6. **API Key Security:** Never expose API key to client

---

## 6. Future Enhancements

1. **Multiple Versions:** Generate 3 versions, let user pick
2. **Fine-tuning:** Train on successful biodatas
3. **Photo-Aware:** Analyze photo for physical description
4. **Voice Input:** Speak details, AI transcribes and writes
5. **Feedback Loop:** Learn from user edits to improve

---

*Document Version: 1.0*
*Last Updated: January 2025*

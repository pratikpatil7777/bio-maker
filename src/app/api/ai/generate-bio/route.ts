import { NextRequest, NextResponse } from 'next/server';

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const DAILY_LIMIT = 50;

export interface GenerateBioRequest {
  name: string;
  age: number;
  gender: 'male' | 'female';
  education: string;
  profession: string;
  company?: string;
  income?: string;
  fatherName?: string;
  fatherOccupation?: string;
  motherName?: string;
  motherOccupation?: string;
  siblings?: string;
  familyType?: string;
  familyValues?: string;
  caste?: string;
  gotra?: string;
  hobbies?: string;
  diet?: string;
  height?: string;
  complexion?: string;
  birthPlace?: string;
  currentCity?: string;
  tone: 'traditional' | 'modern' | 'professional';
  language: 'english' | 'marathi' | 'both';
}

export interface GeneratedBioSection {
  title: string;
  titleMarathi: string;
  fields: Array<{
    label: string;
    labelMarathi: string;
    value: string;
    valueMarathi: string;
  }>;
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  const userLimit = rateLimitStore.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + dayMs });
    return { allowed: true, remaining: DAILY_LIMIT - 1 };
  }

  if (userLimit.count >= DAILY_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  userLimit.count++;
  return { allowed: true, remaining: DAILY_LIMIT - userLimit.count };
}

function buildPrompt(input: GenerateBioRequest): string {
  const toneInstructions = {
    traditional: `Write in a formal, respectful tone emphasizing family values, cultural heritage, and traditional virtues.
Use honorific language. Mention respect for elders, religious inclinations, and strong family bonds.
Example style: "Shri Pratik comes from a well-respected family with deep-rooted cultural values..."`,

    modern: `Write in a warm, friendly, and contemporary tone. Highlight personality, ambitions, and individual achievements.
Make it relatable and engaging while respecting family.
Example style: "Pratik is a passionate software engineer who believes in balancing career growth with family values..."`,

    professional: `Write in a polished, achievement-focused tone. Emphasize qualifications, career growth, and professional accomplishments.
Be concise and impactful.
Example style: "A highly accomplished professional, Pratik holds a degree from..."`,
  };

  const genderHonorific = input.gender === 'male'
    ? { en: 'Mr.', mr: 'श्री' }
    : { en: 'Ms.', mr: 'सौ./कु.' };

  return `You are an expert Indian marriage biodata writer. Create a complete, professional biodata based on the following information.

## PERSON'S DETAILS:
- Name: ${input.name}
- Age: ${input.age} years
- Gender: ${input.gender}
- Education: ${input.education}
- Profession: ${input.profession}
${input.company ? `- Company: ${input.company}` : ''}
${input.income ? `- Income: ${input.income}` : ''}
${input.height ? `- Height: ${input.height}` : ''}
${input.complexion ? `- Complexion: ${input.complexion}` : ''}
${input.birthPlace ? `- Birth Place: ${input.birthPlace}` : ''}
${input.currentCity ? `- Current City: ${input.currentCity}` : ''}

## FAMILY DETAILS:
${input.fatherName ? `- Father: ${input.fatherName}${input.fatherOccupation ? ` (${input.fatherOccupation})` : ''}` : ''}
${input.motherName ? `- Mother: ${input.motherName}${input.motherOccupation ? ` (${input.motherOccupation})` : ''}` : ''}
${input.siblings ? `- Siblings: ${input.siblings}` : ''}
${input.familyType ? `- Family Type: ${input.familyType}` : ''}
${input.familyValues ? `- Family Values: ${input.familyValues}` : ''}
${input.caste ? `- Caste/Community: ${input.caste}` : ''}
${input.gotra ? `- Gotra: ${input.gotra}` : ''}

## LIFESTYLE:
${input.hobbies ? `- Hobbies: ${input.hobbies}` : ''}
${input.diet ? `- Diet: ${input.diet}` : ''}

## WRITING INSTRUCTIONS:
${toneInstructions[input.tone]}

## LANGUAGE: ${input.language === 'both' ? 'Provide BOTH English AND Marathi' : input.language === 'marathi' ? 'Marathi only' : 'English only'}

## OUTPUT FORMAT:
Return a valid JSON object with this exact structure:
{
  "sections": [
    {
      "title": "Personal Information",
      "titleMarathi": "वैयक्तिक माहिती",
      "fields": [
        {
          "label": "Name",
          "labelMarathi": "नाव",
          "value": "${genderHonorific.en} ${input.name}",
          "valueMarathi": "${genderHonorific.mr} [Name in context]"
        },
        // Add: Age, Height, Complexion, Birth Place, Current City
      ]
    },
    {
      "title": "Education & Career",
      "titleMarathi": "शिक्षण व व्यवसाय",
      "fields": [
        // Add: Education, Profession, Company, Income
      ]
    },
    {
      "title": "Family Details",
      "titleMarathi": "कौटुंबिक माहिती",
      "fields": [
        // Add: Father, Mother, Siblings, Family Type, Caste, Gotra
      ]
    },
    {
      "title": "About ${input.gender === 'male' ? 'Him' : 'Her'}",
      "titleMarathi": "${input.gender === 'male' ? 'त्याच्याबद्दल' : 'तिच्याबद्दल'}",
      "fields": [
        {
          "label": "About",
          "labelMarathi": "परिचय",
          "value": "[Write 2-3 engaging sentences about the person based on tone]",
          "valueMarathi": "[Same in Marathi]"
        }
      ]
    },
    {
      "title": "Lifestyle & Interests",
      "titleMarathi": "जीवनशैली व आवडी",
      "fields": [
        // Add: Hobbies, Diet, Lifestyle preferences
      ]
    }
  ]
}

IMPORTANT RULES:
1. Only include fields that have actual data provided
2. Make the "About" section genuinely interesting and personalized
3. Use proper Marathi with correct Devanagari script
4. Keep values concise but meaningful
5. Return ONLY valid JSON, no markdown or extra text
6. For Marathi values, transliterate names but translate descriptions`;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Check rate limit
    const { allowed, remaining } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        {
          error: 'Daily limit reached. Please try again tomorrow.',
          errorMarathi: 'दैनिक मर्यादा संपली. कृपया उद्या पुन्हा प्रयत्न करा.'
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body: GenerateBioRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.age || !body.education || !body.profession) {
      return NextResponse.json(
        { error: 'Missing required fields: name, age, education, profession' },
        { status: 400 }
      );
    }

    // Check for API key
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error('GROQ_API_KEY not configured');
      return NextResponse.json(
        { error: 'AI service not configured. Please contact support.' },
        { status: 503 }
      );
    }

    // Build the prompt
    const prompt = buildPrompt(body);

    // Call Groq API (OpenAI-compatible)
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are an expert Indian marriage biodata writer. You MUST respond with ONLY valid JSON. No markdown, no code blocks, no extra text. Just the raw JSON object.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2048,
        response_format: { type: 'json_object' },
      }),
    });

    if (!groqResponse.ok) {
      const errorData = await groqResponse.text();
      console.error('Groq API error:', groqResponse.status, errorData);

      if (groqResponse.status === 429) {
        return NextResponse.json(
          {
            error: 'AI service is busy. Please wait a moment and try again.',
            errorMarathi: 'AI सेवा व्यस्त आहे. कृपया थोडा वेळ थांबा आणि पुन्हा प्रयत्न करा.'
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to generate bio. Please try again.' },
        { status: 500 }
      );
    }

    const data = await groqResponse.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      console.error('Empty response from Groq');
      return NextResponse.json(
        { error: 'Failed to generate bio. Please try again.' },
        { status: 500 }
      );
    }

    // Parse JSON from response
    let parsedBio;
    try {
      // Try direct parse first (Groq json mode should give clean JSON)
      parsedBio = JSON.parse(text);
    } catch {
      // Fallback: extract JSON from response
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedBio = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found in response');
        }
      } catch (parseError) {
        console.error('Failed to parse AI response:', text);
        return NextResponse.json(
          { error: 'Failed to generate bio. Please try again.' },
          { status: 500 }
        );
      }
    }

    // Return success response
    return NextResponse.json({
      success: true,
      bio: parsedBio,
      remainingCredits: remaining,
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('AI Bio Generation Error:', errorMessage);

    return NextResponse.json(
      {
        error: 'Failed to generate bio. Please try again.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}

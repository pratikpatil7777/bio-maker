# Shubh Vivah - Market Research & Product Roadmap

## Executive Summary

**Product:** Shubh Vivah - AI-Powered Marriage Biodata Builder
**Target Market:** Indian families seeking matrimonial matches (India + NRI diaspora)
**Market Size:** 10M+ marriages annually in India, $1.5B online matrimony market
**Differentiator:** AI-powered bio writing, live digital profiles, privacy-first design

---

## 1. Market Analysis

### 1.1 Target Audience

| Segment | Description | Size | Priority |
|---------|-------------|------|----------|
| **Primary** | Urban middle-class families (25-35 age group) | 60% | High |
| **Secondary** | NRI families seeking matches in India | 20% | High |
| **Tertiary** | Rural/Semi-urban families going digital | 15% | Medium |
| **Niche** | Matchmakers & Marriage bureaus | 5% | Medium |

### 1.2 User Personas

#### Persona 1: Priya (The Modern Bride)
- **Age:** 27, Software Engineer
- **Location:** Bangalore
- **Pain Points:**
  - Wants modern, elegant biodata (not the old Word templates)
  - Privacy concerns - doesn't want phone number public
  - Needs bilingual (English + Kannada/Hindi)
- **Goals:** Create professional biodata she's proud to share

#### Persona 2: Sharma Uncle (The Parent)
- **Age:** 55, Retired Bank Manager
- **Location:** Delhi
- **Pain Points:**
  - Not tech-savvy, needs simple interface
  - Wants traditional format with kundli details
  - Needs to share easily on WhatsApp
- **Goals:** Find suitable match for son/daughter

#### Persona 3: Raj (NRI Groom)
- **Age:** 30, Doctor in USA
- **Location:** Chicago
- **Pain Points:**
  - Parents in India managing biodata
  - Needs collaborative editing
  - Wants video/photo gallery feature
- **Goals:** Stand out among other profiles

### 1.3 Competitor Analysis

| Competitor | Strengths | Weaknesses | Our Advantage |
|------------|-----------|------------|---------------|
| **Canva** | Great templates, Brand recognition | Not marriage-specific, No Indian formats | Specialized for biodata |
| **BioData Maker (Android)** | Simple, Free | Outdated UI, Limited customization, Ads | Modern UI, No ads |
| **Shaadi.com** | Large user base | Profile-only, Can't download | Downloadable PDF/Image |
| **Local Print Shops** | Personal touch | Manual, Expensive, Not digital | Digital-first, Instant |
| **Wedding Wishlist** | Wedding planning | No biodata feature | Focused on biodata |

### 1.4 Market Trends

1. **Digital Adoption:** COVID accelerated digital matrimony (40% growth)
2. **Privacy Awareness:** Users want control over personal information
3. **Visual-First:** Instagram generation wants aesthetic designs
4. **Video Content:** Short-form video biodatas gaining popularity
5. **AI Integration:** Users expect AI assistance in content creation
6. **Regional Languages:** Strong demand for vernacular content

---

## 2. Feature Roadmap

### Phase 1: Foundation (MVP+) - 4 Weeks
**Goal:** Solid foundation for user growth

| Feature | Priority | Effort | Impact |
|---------|----------|--------|--------|
| User Authentication (Google/Phone) | P0 | High | Critical |
| Cloud Save & Sync | P0 | High | Critical |
| Shareable Preview Link | P0 | Medium | High |
| WhatsApp Image Optimization | P1 | Low | High |
| 5 New Regional Templates | P1 | Medium | Medium |
| PWA / Installable App | P1 | Medium | Medium |

**Tech Stack:**
- Auth: Clerk or NextAuth.js
- Database: Supabase (PostgreSQL)
- Storage: Supabase Storage or Cloudflare R2
- Hosting: Vercel

### Phase 2: Differentiation - 6 Weeks
**Goal:** Create USP features that competitors don't have

| Feature | Priority | Effort | Impact |
|---------|----------|--------|--------|
| AI Bio Writer | P0 | High | Very High |
| Live Digital Profile Page | P0 | High | Very High |
| Smart Privacy Controls | P0 | Medium | High |
| Basic Analytics Dashboard | P1 | Medium | Medium |
| Image Gallery in Biodata | P1 | Medium | Medium |
| QR Code Generation | P1 | Low | Medium |

**AI Bio Writer Details:**
```
Input Fields:
- Name, Age, Education, Profession
- Family details (Father, Mother, Siblings)
- Hobbies, Interests
- Partner preferences

Output:
- Professional bio in selected tone (Traditional/Modern/Formal)
- Auto-generated in both English and regional language
```

### Phase 3: Growth Features - 8 Weeks
**Goal:** Features that drive viral growth and retention

| Feature | Priority | Effort | Impact |
|---------|----------|--------|--------|
| Video Biodata | P0 | High | Very High |
| Family Collaboration Mode | P0 | High | High |
| Kundli/Horoscope Integration | P1 | Medium | High |
| A/B Testing (Multiple Versions) | P1 | Medium | Medium |
| Email/SMS Notifications | P2 | Low | Medium |
| Referral Program | P2 | Medium | High |

### Phase 4: Monetization & Scale - 12 Weeks
**Goal:** Revenue generation and market expansion

| Feature | Priority | Effort | Impact |
|---------|----------|--------|--------|
| Premium Subscription Tiers | P0 | Medium | Critical |
| Payment Integration (Razorpay) | P0 | Medium | Critical |
| Verified Profile Badge | P1 | High | High |
| Matchmaker/Bureau Dashboard | P1 | High | Medium |
| API for Matrimony Sites | P2 | High | Medium |
| White-label Solution | P2 | High | Low |

---

## 3. Pricing Strategy

### 3.1 Freemium Model

| Tier | Price | Features |
|------|-------|----------|
| **Free** | ₹0 | 1 biodata, "Made with Shubh Vivah" watermark, PDF export only |
| **Premium** | ₹299/year | Unlimited biodatas, No watermark, All templates, PNG/JPG export |
| **Pro** | ₹799/year | Everything in Premium + Live profile URL, AI bio writer (10/month), Basic analytics |
| **Family** | ₹1,499/year | Everything in Pro + 5 profiles, Collaboration, Video biodata, Priority support |

### 3.2 Revenue Projections (Year 1)

| Month | Free Users | Paid Users | Conversion | MRR |
|-------|------------|------------|------------|-----|
| M1-3 | 5,000 | 100 | 2% | ₹25,000 |
| M4-6 | 20,000 | 600 | 3% | ₹1,50,000 |
| M7-9 | 50,000 | 2,000 | 4% | ₹5,00,000 |
| M10-12 | 100,000 | 5,000 | 5% | ₹12,50,000 |

**Year 1 Target:** ₹50L ARR (Annual Recurring Revenue)

---

## 4. Go-to-Market Strategy

### 4.1 Launch Channels

| Channel | Strategy | Budget | Expected CAC |
|---------|----------|--------|--------------|
| **Organic SEO** | Target "marriage biodata maker" keywords | ₹0 | ₹0 |
| **YouTube** | Tutorial videos, Before/After showcases | ₹10K/month | ₹50 |
| **Instagram/Reels** | Aesthetic biodata showcases | ₹20K/month | ₹30 |
| **WhatsApp Marketing** | Viral sharing mechanics | ₹0 | ₹0 |
| **Google Ads** | Target matrimony-related searches | ₹30K/month | ₹100 |
| **Influencer Partnerships** | Wedding/lifestyle creators | ₹50K/month | ₹80 |

### 4.2 Viral Mechanics

1. **Shareable Links:** Every biodata has unique URL for easy sharing
2. **WhatsApp Optimization:** One-click share with preview image
3. **"Made with Shubh Vivah":** Watermark on free tier drives discovery
4. **Referral Program:** ₹50 credit for each referral who subscribes
5. **Social Proof:** "Join 50,000+ families" messaging

### 4.3 SEO Keywords

**Primary Keywords:**
- marriage biodata maker
- biodata format for marriage
- biodata maker online free
- शादी के लिए बायोडाटा
- लग्नाचा बायोडाटा

**Long-tail Keywords:**
- marriage biodata format in marathi
- biodata for marriage boy/girl
- how to make biodata for marriage
- biodata maker app download

---

## 5. Technical Architecture

### 5.1 Current Stack
- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Export:** html2pdf.js, html2canvas
- **Storage:** LocalStorage (client-side only)

### 5.2 Proposed Stack (SaaS)

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                           │
│  Next.js 14 (App Router) + React + TypeScript          │
│  Tailwind CSS + Framer Motion                          │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    AUTHENTICATION                        │
│  Clerk (Google, Phone OTP, Email Magic Link)           │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                      BACKEND                            │
│  Next.js API Routes + Server Actions                   │
│  OR: Separate Node.js/Express API                      │
└─────────────────────────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│  DATABASE   │   │   STORAGE   │   │     AI      │
│  Supabase   │   │  Cloudflare │   │   Claude/   │
│ (PostgreSQL)│   │     R2      │   │   OpenAI    │
└─────────────┘   └─────────────┘   └─────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                     PAYMENTS                            │
│  Razorpay (India) + Stripe (International)             │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                     ANALYTICS                           │
│  PostHog (Product) + Google Analytics (Traffic)        │
└─────────────────────────────────────────────────────────┘
```

### 5.3 Database Schema (Core)

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(15) UNIQUE,
  name VARCHAR(255),
  subscription_tier VARCHAR(20) DEFAULT 'free',
  subscription_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Biodatas
CREATE TABLE biodatas (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR(255),
  name_regional VARCHAR(255),
  photo_url TEXT,
  theme_id VARCHAR(50),
  border_id VARCHAR(50),
  data JSONB, -- Flexible schema for sections
  is_public BOOLEAN DEFAULT false,
  slug VARCHAR(100) UNIQUE, -- For public URL
  views_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Analytics
CREATE TABLE biodata_views (
  id UUID PRIMARY KEY,
  biodata_id UUID REFERENCES biodatas(id),
  viewer_ip VARCHAR(45),
  viewer_location VARCHAR(100),
  referrer TEXT,
  viewed_at TIMESTAMP DEFAULT NOW()
);
```

---

## 6. Success Metrics (KPIs)

### 6.1 North Star Metric
**Biodatas Created per Week** (Activation + Engagement)

### 6.2 Key Metrics

| Metric | Target M3 | Target M6 | Target M12 |
|--------|-----------|-----------|------------|
| Weekly Active Users | 1,000 | 5,000 | 20,000 |
| Biodatas Created | 2,000 | 15,000 | 75,000 |
| Conversion Rate | 2% | 3% | 5% |
| Monthly Recurring Revenue | ₹50K | ₹2L | ₹10L |
| NPS Score | 40 | 50 | 60 |
| Share Rate (% who share) | 30% | 40% | 50% |

---

## 7. Risk Analysis

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Low conversion rate | Medium | High | A/B test pricing, add more free value |
| Competition from Canva | Medium | Medium | Double down on India-specific features |
| Privacy concerns | Low | High | SOC2 compliance, transparent policy |
| Tech scaling issues | Low | Medium | Use managed services (Supabase, Vercel) |
| AI costs too high | Medium | Medium | Cache common requests, rate limit |

---

## 8. Immediate Action Items

### This Week
- [ ] Set up Supabase project
- [ ] Implement user authentication with Clerk
- [ ] Create shareable preview link feature
- [ ] Add 3 new regional templates

### This Month
- [ ] Implement AI bio writer (MVP)
- [ ] Add live digital profile feature
- [ ] Set up basic analytics with PostHog
- [ ] Create landing page with waitlist

### This Quarter
- [ ] Launch premium subscription
- [ ] Implement video biodata feature
- [ ] Build family collaboration mode
- [ ] Reach 10,000 users milestone

---

## Appendix

### A. Competitor Screenshots
(Add screenshots of competitor apps for reference)

### B. User Interview Insights
(Document key findings from user research)

### C. Technical Specifications
(Detailed API specs, database diagrams)

---

*Document Version: 1.0*
*Last Updated: January 2025*
*Author: Shubh Vivah Team*

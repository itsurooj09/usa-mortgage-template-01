# Northstar Mortgage — USA Mortgage Website Template 01
## Premium American Mortgage Lending Website | Production-Ready UI/UX & Verified Calculation Engine

A complete, production-ready website template engineered for American mortgage lenders, loan officers, correspondent bankers, and mortgage brokerages. 

Designed with modern fintech aesthetics, generous editorial typography, restrained brass accents, and full regulatory compliance (NMLS, TILA, RESPA, Equal Housing Opportunity, and GLBA/CCPA privacy standards).

---

## ✦ Key Architecture & Highlights

### 1. All 42 Required Page Types Built & Verified
- **Core Website Pages (13)**: Home, About Us, Meet the Team, Buy a Home, Refinance, Loan Options Directory, Mortgage Rates, Reviews & Testimonials, FAQs, Blog/Resources, Blog Article Template, Contact Us, and Locations/Service Areas.
- **Loan Detail Pages (11 Unique Pages)**: Conventional, FHA, VA, USDA, Jumbo, First-Time Homebuyer, Fixed-Rate, ARM, Cash-Out Refinance, Rate-and-Term Refinance, and Reverse Mortgage (HECM).
- **Calculator Pages (8)**: Overview Directory + 7 dedicated interactive calculators (Mortgage Payment, Home Affordability, Refinance, FHA, VA, Closing Costs, and Debt-to-Income).
- **Lead Capture & Application (4)**: Multi-Step Borrower Survey (`/get-started`), Start Your Application (`/apply-now` URLA Form 1003 workflow), Advertising Landing Page (`/lp/[campaign]`), and Thank You / Confirmation (`/thank-you`).
- **Legal, Compliance & System (6)**: NMLS & Licensing Disclosures, Privacy Policy, Terms of Use, Accessibility Statement (WCAG 2.1 AA), Cookie Preferences, and 404 Not Found.

### 2. Verified Calculation Engine
Seven standalone, unit-tested financial calculation modules in `lib/calculations/`:
- **Mortgage Payment**: PITI calculation ($M = P \frac{r(1+r)^n}{(1+r)^n - 1}$), property tax, homeowners insurance, cancellable PMI (LTV > 80%), and full annual amortization schedule.
- **Home Affordability**: Solves for maximum purchase price across Conservative (28/36% DTI), Moderate (31/43% DTI), and Aggressive (36/48% DTI) underwriting bands.
- **Refinance**: Compares current loan terms against new rates; calculates monthly payment savings, lifetime interest reduction, and exact break-even recoup months.
- **FHA Loan**: Computes 1.75% Upfront MIP financed into loan balance, plus HUD Mortgagee Letter annual MIP tiers.
- **VA Loan**: Models 100% financing (0% down), VA Funding Fee tiers, disability fee waivers (0% fee), and $0 monthly PMI.
- **Closing Costs**: Itemized Loan Estimate sections A–H (lender fees, title, government recording, and prepaid escrow reserves).
- **Debt-to-Income (DTI)**: Evaluates Front-End (housing) and Back-End (total debt) ratios with real underwriting risk categorization.

### 3. Multi-Step Borrower Qualification Wizard
- 6-step guided wizard: Loan Purpose ➔ Property Status ➔ Location & Property Type ➔ Budget Details ➔ Borrower Info ➔ TCPA Consent & Submission.
- Real-time client-side and server-side Zod validation (`app/api/lead/route.ts`).
- Honeypot spam defense.
- Direct CRM webhook dispatch (`CRM_WEBHOOK_URL`).
- Zero SSN or banking login requests for maximum borrower trust and security.

### 4. Fully Configurable Brand Architecture
All company credentials, loan officer details, NMLS numbers, state licensing tables, contact telephone/emails, and CRM endpoints are managed in a single central file:
`lib/config/siteConfig.ts`

---

## 🎨 Color System & Design Tokens

- **Deep Midnight Navy**: `#10243A` (Primary header, footer, headings)
- **Dark Navy**: `#172F4D` (Cards, surfaces)
- **Warm Ivory**: `#F8F7F3` (Section backgrounds)
- **Pure White**: `#FFFFFF` (Surface contrast)
- **Restrained Brass Accent**: `#C5A46D` (Badges, accents, focal CTAs)
- **Muted Slate**: `#64748B` (Body text, helper text)
- **Subtle Border**: `#E2E8F0`

### Typography
- **Headings**: `Plus Jakarta Sans` / `Manrope`
- **Body & UI**: `Inter`
- **Accents**: `DM Serif Display`

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or 20+
- npm, pnpm, or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/usa-mortgage-template-01.git

# Navigate to project folder
cd "usa-mortgage-template-01"

# Install dependencies
npm install
```

### Running Tests
Run the comprehensive Vitest unit test suite covering all financial calculation formulas:
```bash
npm test
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

---

## 📁 Directory Structure

```
├── app/
│   ├── api/
│   │   ├── lead/route.ts            # Secure lead capture endpoint
│   │   └── contact/route.ts         # Contact form endpoint
│   ├── (all 42 page routes)
│   ├── layout.tsx                   # Root layout with fonts & accessibility
│   ├── page.tsx                     # Conversion-focused homepage
│   ├── sitemap.ts                   # Dynamic XML sitemap
│   └── robots.ts                    # Search engine crawling rules
├── components/
│   ├── calculators/                 # 7 interactive calculator interfaces
│   ├── forms/                       # Survey wizard, lead forms, form fields
│   ├── navigation/                  # Header, Mega Menu, Footer, Cookie Banner
│   └── ui/                          # Button, Container, SectionHeading, Badge
├── content/
│   ├── loans.ts                     # Detailed data for 11 loan products
│   ├── rates.ts                     # Dated benchmark rates & disclosures
│   ├── faqs.ts                      # FAQ database categorized
│   ├── blog.ts                      # Educational mortgage articles
│   ├── testimonials.ts              # Borrower reviews & demo stories
│   ├── team.ts                      # Loan officers & branch leadership
│   └── locations.ts                 # Branches & licensed states
├── lib/
│   ├── calculations/                # Tested financial algorithms
│   └── config/siteConfig.ts         # Centralized configuration layer
└── tests/
    └── calculations.test.ts         # Vitest unit test suite
```

---

## 🛡 Compliance & Statutory Standards
- **NMLS Consumer Access**: Direct links and mandatory disclosure text.
- **Equal Housing Opportunity**: Conforms with Fair Housing and ECOA regulations.
- **TILA / RESPA**: Rate disclaimers, APR explanations, and Loan Estimate itemization.
- **GLBA / CCPA**: Transparent non-public personal information disclosures.
- **TCPA**: Explicit opt-in consent checkboxes on all contact and survey forms.
- **WCAG 2.1 AA**: High-contrast ratios, keyboard focus indicators, and screen reader labels.

---

## 📄 License
Commercial template license for US mortgage lending clients and brokerages.
All rights reserved © Northstar Mortgage Capital, LLC.

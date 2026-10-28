# 📚 Master Templates Catalog: Calculators & Forms

This directory (`/templates`) contains modular, standalone, production-ready templates for all calculators and forms used across the platform. Each template can be imported and rendered independently anywhere in the project or in future template designs.

---

## 🧮 1. Calculator Templates (`templates/calculators/`)

| # | Template Name | Component File | Description & Use Case |
|---|---------------|----------------|------------------------|
| **1** | `MortgagePaymentCalculatorTemplate` | `templates/calculators/MortgagePaymentCalculatorTemplate.tsx` | Standard 30/15-year purchase payment calculator. Computes Principal, Interest, Property Taxes, Home Insurance, and cancellable PMI with full 360-month amortization schedule and PDF report export. |
| **2** | `HomeAffordabilityCalculatorTemplate` | `templates/calculators/HomeAffordabilityCalculatorTemplate.tsx` | Evaluates borrower income and recurring debts against 28/36 underwriting ratios to calculate maximum purchase price and safe budget ranges. |
| **3** | `RefinanceCalculatorTemplate` | `templates/calculators/RefinanceCalculatorTemplate.tsx` | Compares existing mortgage terms against new market rates. Calculates monthly savings, closing cost break-even recovery timeline, and cash-out equity limits. |
| **4** | `VaLoanCalculatorTemplate` | `templates/calculators/VaLoanCalculatorTemplate.tsx` | Tailored for military veterans. Models true 100% financing (0% down), disability funding fee exemptions, standard tiered fees, and the $0 monthly PMI benefit. |
| **5** | `FhaLoanCalculatorTemplate` | `templates/calculators/FhaLoanCalculatorTemplate.tsx` | Models FHA government-insured loans with 3.5% down, 1.75% Upfront Mortgage Insurance Premium (UFMIP), and ongoing monthly annual MIP. |
| **6** | `ClosingCostsCalculatorTemplate` | `templates/calculators/ClosingCostsCalculatorTemplate.tsx` | Itemizes CFPB TRID Loan Estimate settlement services (Sections A-H), lender fees, title insurance, transfer taxes, advance escrow prepaids, and cash-to-close. |
| **7** | `DtiCalculatorTemplate` | `templates/calculators/DtiCalculatorTemplate.tsx` | Analyzes Front-End (housing) and Back-End (total debt) Debt-to-Income ratios against conforming Fannie Mae, Freddie Mac, and FHA automated underwriting approval benchmarks. |
| **8** | `DscrInvestorCalculatorTemplate` | `templates/calculators/DscrInvestorCalculatorTemplate.tsx` | Designed for real estate investors evaluating Debt-Service Coverage Ratios. Models rental income, vacancy, operating expenses, and net operating income (NOI) against required lender coverage (e.g. 1.25x). |
| **9** | `RentVsBuyCalculatorTemplate` | `templates/calculators/RentVsBuyCalculatorTemplate.tsx` | 5 to 30-year long-term net wealth comparison between renting and purchasing, factoring in home appreciation, rent inflation, investment return, and maintenance costs. |
| **10** | `FixAndFlipCalculatorTemplate` | `templates/calculators/FixAndFlipCalculatorTemplate.tsx` | For real estate rehab investors. Models purchase price, rehab budget, After-Repair Value (ARV), monthly holding costs, hard money interest rate, financing points, and net projected ROI. |
| **11** | `MasterCalculatorSuiteTemplate` | `templates/calculators/MasterCalculatorSuiteTemplate.tsx` | Complete all-in-one responsive financial workstation combining all 8 interactive scenarios in a single tabbed suite. Supports `initialTab` prop (`"purchase"`, `"afford"`, `"refi"`, `"rentbuy"`, `"vapurchase"`, `"dscr"`, `"flip"`). |

---

## 📝 2. Form & Lead Capture Templates (`templates/forms/`)

| # | Template Name | Component File | Description & Use Case |
|---|---------------|----------------|------------------------|
| **1** | `InstantQuoteWizardTemplate` | `templates/forms/InstantQuoteWizardTemplate.tsx` | 17-Step interactive fintech rate and monthly payment questionnaire (modeled after Vonk Digital). Features auto-advancing cards, Purchase vs. Refinance branching, and instant live PITI breakdown upon submission with TCPA consent. |
| **2** | `Form1003SurveyWizardTemplate` | `templates/forms/Form1003SurveyWizardTemplate.tsx` | Official digital Uniform Residential Loan Application (URLA / Form 1003) qualification wizard with 4-stage multi-step borrower intake, income/asset verification, and Zod validation against `/api/lead`. |
| **3** | `QuickLeadCaptureFormTemplate` | `templates/forms/QuickLeadCaptureFormTemplate.tsx` | Compact, high-converting single-card pre-approval lead capture form. Perfect for landing pages, loan product sidebars, and promotional banners. |
| **4** | `ConsultationContactFormTemplate` | `templates/forms/ConsultationContactFormTemplate.tsx` | Direct consultation scheduling and branch inquiry form. Allows borrowers to select preferred contact channel (Phone, Email, In-Person) and preferred time of day. |

---

## 🚀 Quick Usage Example

You can import any template directly into any Next.js page or component:

```tsx
// Example: Importing into a new page or section
import { 
  InstantQuoteWizardTemplate, 
  MortgagePaymentCalculatorTemplate,
  DscrInvestorCalculatorTemplate 
} from "@/templates";

export default function MyCustomPage() {
  return (
    <div className="space-y-12">
      {/* Standalone Instant Quote Form */}
      <InstantQuoteWizardTemplate />

      {/* Standalone DSCR Investor Tool */}
      <DscrInvestorCalculatorTemplate />

      {/* Standalone Mortgage Payment Calculator */}
      <MortgagePaymentCalculatorTemplate defaultPrice={550000} defaultRate={6.25} />
    </div>
  );
}
```

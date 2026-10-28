"use client";

import React from "react";
import { MortgageSurveyWizard } from "@/components/forms/MortgageSurveyWizard";

export interface Form1003SurveyWizardTemplateProps {
  initialPurpose?: "buy" | "refinance" | "explore";
  className?: string;
}

/**
 * Form1003SurveyWizardTemplate
 * 
 * Comprehensive digital Uniform Residential Loan Application (URLA / Form 1003) qualification wizard.
 * Features:
 * - 4-stage multi-step borrower intake workflow
 * - Dynamic loan purpose switching (Buy, Refinance, Explore)
 * - Property status, occupancy, zip code, and real estate asset verification
 * - Credit scoring tiers & co-borrower inclusion
 * - Full Zod schema validation against /api/lead endpoint
 * - 256-bit bank-grade encryption notices and soft credit pull assurances
 */
export function Form1003SurveyWizardTemplate({
  initialPurpose = "buy",
  className = "",
}: Form1003SurveyWizardTemplateProps) {
  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      <MortgageSurveyWizard initialPurpose={initialPurpose} />
    </div>
  );
}

export default Form1003SurveyWizardTemplate;

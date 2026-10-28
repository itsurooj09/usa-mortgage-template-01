"use client";

import React from "react";
import { VonkQuoteWizard } from "@/components/forms/VonkQuoteWizard";

export interface InstantQuoteWizardTemplateProps {
  className?: string;
}

/**
 * InstantQuoteWizardTemplate
 * 
 * 17-Step interactive fintech rate and monthly payment questionnaire (modeled after Vonk Digital).
 * Features:
 * - Auto-advancing single-click selection cards
 * - Purchase vs. Refinance conditional branch logic
 * - Property type, timing, occupancy, military VA eligibility, and first-time buyer checks
 * - Down payment & existing balance sliders
 * - Employment, income tiers, and credit score ranges
 * - Instant live PITI monthly payment calculation & APR breakdown upon submission
 * - Built-in TCPA consent compliance and honeypot spam protection
 */
export function InstantQuoteWizardTemplate({
  className = "",
}: InstantQuoteWizardTemplateProps) {
  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      <VonkQuoteWizard />
    </div>
  );
}

export default InstantQuoteWizardTemplate;

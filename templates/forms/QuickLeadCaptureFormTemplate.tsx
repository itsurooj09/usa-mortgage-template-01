"use client";

import React from "react";
import { ContextualLeadForm } from "@/components/forms/ContextualLeadForm";

export interface QuickLeadCaptureFormTemplateProps {
  headline?: string;
  subheadline?: string;
  defaultLoanPurpose?: "buy" | "refinance" | "explore";
  defaultLoanProgram?: string;
  sourceCampaign?: string;
  className?: string;
}

/**
 * QuickLeadCaptureFormTemplate
 * 
 * High-converting single-card or sidebar lead generation form.
 * Ideal for landing pages, loan product sidebars, or quick contact sections.
 * Features:
 * - 2-minute soft-check pre-approval intake
 * - Instant input validation
 * - Direct submission to CRM / Lead API
 * - Compact footprint designed for sidebars and promotional banners
 */
export function QuickLeadCaptureFormTemplate({
  headline,
  subheadline,
  defaultLoanPurpose,
  defaultLoanProgram,
  sourceCampaign,
  className = "",
}: QuickLeadCaptureFormTemplateProps) {
  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <ContextualLeadForm
        headline={headline}
        subheadline={subheadline}
        defaultLoanPurpose={defaultLoanPurpose}
        defaultLoanProgram={defaultLoanProgram}
        sourceCampaign={sourceCampaign}
      />
    </div>
  );
}

export default QuickLeadCaptureFormTemplate;

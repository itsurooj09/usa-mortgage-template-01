"use client";

import React from "react";
import { ContactForm } from "@/components/forms/ContactForm";

export interface ConsultationContactFormTemplateProps {
  className?: string;
}

/**
 * ConsultationContactFormTemplate
 * 
 * Direct inquiry and consultation scheduling form.
 * Features:
 * - Preferred contact method (Phone, Email, In-person appointment)
 * - Preferred time of day selection (Morning, Afternoon, Evening)
 * - Loan officer / branch inquiry categorization
 * - Full field validation and spam protection
 */
export function ConsultationContactFormTemplate({
  className = "",
}: ConsultationContactFormTemplateProps) {
  return (
    <div className={`w-full max-w-xl mx-auto ${className}`}>
      <ContactForm />
    </div>
  );
}

export default ConsultationContactFormTemplate;

"use client";

import React from "react";
import { FhaLoanCalculator } from "@/components/calculators/FhaLoanCalculator";

export interface FhaLoanCalculatorTemplateProps {
  className?: string;
}

/**
 * FhaLoanCalculatorTemplate
 * 
 * Standalone template for modeling FHA government-insured loans with 3.5% down,
 * 1.75% Upfront Mortgage Insurance Premium (UFMIP), and monthly Annual MIP.
 */
export function FhaLoanCalculatorTemplate({
  className = "",
}: FhaLoanCalculatorTemplateProps) {
  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <FhaLoanCalculator />
    </div>
  );
}

export default FhaLoanCalculatorTemplate;

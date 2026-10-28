"use client";

import React from "react";
import { VaLoanCalculator } from "@/components/calculators/VaLoanCalculator";

export interface VaLoanCalculatorTemplateProps {
  className?: string;
}

/**
 * VaLoanCalculatorTemplate
 * 
 * Standalone template for modeling VA military residential financing
 * with 0% down payment, disability fee exemptions, funding fees, and $0 PMI.
 */
export function VaLoanCalculatorTemplate({
  className = "",
}: VaLoanCalculatorTemplateProps) {
  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <VaLoanCalculator />
    </div>
  );
}

export default VaLoanCalculatorTemplate;

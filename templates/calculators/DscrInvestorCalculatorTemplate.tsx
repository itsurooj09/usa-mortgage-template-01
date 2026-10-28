"use client";

import React from "react";
import { VonkMasterCalculatorSuite } from "@/components/calculators/VonkMasterCalculatorSuite";

export interface DscrInvestorCalculatorTemplateProps {
  className?: string;
}

/**
 * DscrInvestorCalculatorTemplate
 * 
 * Standalone template for real estate investors evaluating Debt-Service Coverage Ratios (DSCR).
 * Models gross rental income, vacancy rates, operating expenses (taxes, insurance, maintenance, utilities),
 * and net annual operating income (NOI) against required lender coverage benchmarks (e.g., 1.25x).
 */
export function DscrInvestorCalculatorTemplate({
  className = "",
}: DscrInvestorCalculatorTemplateProps) {
  return (
    <div className={`w-full ${className}`}>
      <VonkMasterCalculatorSuite initialTab="dscr" />
    </div>
  );
}

export default DscrInvestorCalculatorTemplate;

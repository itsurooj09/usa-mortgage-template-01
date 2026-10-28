"use client";

import React from "react";
import {
  VonkMasterCalculatorSuite,
  CalculatorTab,
} from "@/components/calculators/VonkMasterCalculatorSuite";

export interface MasterCalculatorSuiteTemplateProps {
  initialTab?: CalculatorTab;
  className?: string;
}

/**
 * MasterCalculatorSuiteTemplate
 * 
 * All-in-one multi-tab financial workstation featuring 8 interactive scenarios:
 * - Purchase PITI & Amortization
 * - Home Affordability & DTI
 * - Refinance Break-Even
 * - Rent vs. Buy Comparison
 * - VA Purchase & IRRRL
 * - DSCR Real Estate Investor Cash Flow
 * - Fix & Flip Rehab & Profit Modeler
 */
export function MasterCalculatorSuiteTemplate({
  initialTab = "purchase",
  className = "",
}: MasterCalculatorSuiteTemplateProps) {
  return (
    <div className={`w-full ${className}`}>
      <VonkMasterCalculatorSuite initialTab={initialTab} />
    </div>
  );
}

export default MasterCalculatorSuiteTemplate;

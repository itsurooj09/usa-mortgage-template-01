"use client";

import React from "react";
import { ClosingCostsCalculator } from "@/components/calculators/ClosingCostsCalculator";

export interface ClosingCostsCalculatorTemplateProps {
  className?: string;
}

/**
 * ClosingCostsCalculatorTemplate
 * 
 * Standalone template for itemizing TRID settlement services, lender fees,
 * title insurance, government recording taxes, prepaid escrow, and cash-to-close.
 */
export function ClosingCostsCalculatorTemplate({
  className = "",
}: ClosingCostsCalculatorTemplateProps) {
  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <ClosingCostsCalculator />
    </div>
  );
}

export default ClosingCostsCalculatorTemplate;

"use client";

import React from "react";
import { RefinanceCalculator } from "@/components/calculators/RefinanceCalculator";

export interface RefinanceCalculatorTemplateProps {
  className?: string;
}

/**
 * RefinanceCalculatorTemplate
 * 
 * Standalone template for modeling rate-and-term or cash-out refinancing,
 * monthly payment reduction, and closing cost break-even recovery timeline.
 */
export function RefinanceCalculatorTemplate({
  className = "",
}: RefinanceCalculatorTemplateProps) {
  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <RefinanceCalculator />
    </div>
  );
}

export default RefinanceCalculatorTemplate;

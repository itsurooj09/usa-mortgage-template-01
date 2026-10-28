"use client";

import React from "react";
import { DtiCalculator } from "@/components/calculators/DtiCalculator";

export interface DtiCalculatorTemplateProps {
  className?: string;
}

/**
 * DtiCalculatorTemplate
 * 
 * Standalone template for analyzing Front-End (housing) and Back-End (total debt)
 * Debt-to-Income ratios against Fannie Mae, Freddie Mac, and FHA benchmarks.
 */
export function DtiCalculatorTemplate({
  className = "",
}: DtiCalculatorTemplateProps) {
  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <DtiCalculator />
    </div>
  );
}

export default DtiCalculatorTemplate;

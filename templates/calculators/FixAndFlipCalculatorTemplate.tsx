"use client";

import React from "react";
import { VonkMasterCalculatorSuite } from "@/components/calculators/VonkMasterCalculatorSuite";

export interface FixAndFlipCalculatorTemplateProps {
  className?: string;
}

/**
 * FixAndFlipCalculatorTemplate
 * 
 * Standalone template for real estate rehab investors evaluating Fix & Flip projects.
 * Models purchase price, rehab budget, After-Repair Value (ARV), monthly holding/carrying costs,
 * hard money interest rate, financing points, and net projected ROI.
 */
export function FixAndFlipCalculatorTemplate({
  className = "",
}: FixAndFlipCalculatorTemplateProps) {
  return (
    <div className={`w-full ${className}`}>
      <VonkMasterCalculatorSuite initialTab="flip" />
    </div>
  );
}

export default FixAndFlipCalculatorTemplate;

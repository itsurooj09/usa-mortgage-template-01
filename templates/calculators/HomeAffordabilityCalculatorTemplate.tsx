"use client";

import React from "react";
import { HomeAffordabilityCalculator } from "@/components/calculators/HomeAffordabilityCalculator";

export interface HomeAffordabilityCalculatorTemplateProps {
  className?: string;
}

/**
 * HomeAffordabilityCalculatorTemplate
 * 
 * Standalone template for calculating maximum purchasing power using
 * 28/36 qualifying ratios, gross income, monthly debt, and down payment.
 */
export function HomeAffordabilityCalculatorTemplate({
  className = "",
}: HomeAffordabilityCalculatorTemplateProps) {
  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <HomeAffordabilityCalculator />
    </div>
  );
}

export default HomeAffordabilityCalculatorTemplate;

"use client";

import React from "react";
import { VonkMasterCalculatorSuite } from "@/components/calculators/VonkMasterCalculatorSuite";

export interface RentVsBuyCalculatorTemplateProps {
  className?: string;
}

/**
 * RentVsBuyCalculatorTemplate
 * 
 * Standalone template for comparing long-term net wealth accumulation between
 * renting and purchasing a home over a 5 to 30-year horizon.
 * Accounts for annual home appreciation, rent growth, investment opportunity cost,
 * and property maintenance.
 */
export function RentVsBuyCalculatorTemplate({
  className = "",
}: RentVsBuyCalculatorTemplateProps) {
  return (
    <div className={`w-full ${className}`}>
      <VonkMasterCalculatorSuite initialTab="rentbuy" />
    </div>
  );
}

export default RentVsBuyCalculatorTemplate;

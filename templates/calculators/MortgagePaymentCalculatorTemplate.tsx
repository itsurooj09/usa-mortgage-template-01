"use client";

import React from "react";
import { MortgagePaymentCalculator } from "@/components/calculators/MortgagePaymentCalculator";

export interface MortgagePaymentCalculatorTemplateProps {
  defaultPrice?: number;
  defaultDownPayment?: number;
  defaultRate?: number;
  defaultTerm?: number;
  className?: string;
}

/**
 * MortgagePaymentCalculatorTemplate
 * 
 * Standalone template for calculating monthly Principal, Interest, Taxes,
 * Insurance (PITI), Private Mortgage Insurance (PMI), and full 30-year amortization.
 */
export function MortgagePaymentCalculatorTemplate({
  defaultPrice = 450000,
  defaultDownPayment = 90000,
  defaultRate = 6.5,
  defaultTerm = 30,
  className = "",
}: MortgagePaymentCalculatorTemplateProps) {
  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <MortgagePaymentCalculator
        defaultPrice={defaultPrice}
        defaultDownPayment={defaultDownPayment}
        defaultRate={defaultRate}
        defaultTerm={defaultTerm}
      />
    </div>
  );
}

export default MortgagePaymentCalculatorTemplate;

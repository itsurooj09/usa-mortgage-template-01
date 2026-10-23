"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField, Input } from "./FormField";
import { CurrencyInput, Select, Checkbox } from "./SpecialInputs";
import { Button } from "../ui/Button";
import { siteConfig } from "@/lib/config/siteConfig";

interface ContextualLeadFormProps {
  defaultLoanPurpose?: "buy" | "refinance" | "explore";
  defaultLoanProgram?: string;
  sourceCampaign?: string;
  headline?: string;
  subheadline?: string;
}

export function ContextualLeadForm({
  defaultLoanPurpose = "buy",
  defaultLoanProgram,
  sourceCampaign,
  headline = "Check Your Custom Rate",
  subheadline = "Fast, transparent advisory with no impact on your credit score.",
}: ContextualLeadFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    loanPurpose: defaultLoanPurpose,
    propertyType: "Single-Family Home",
    occupancy: "Primary Residence",
    state: "NC",
    zipCode: "28202",
    propertyValue: 400000,
    downPayment: 40000,
    currentMortgageBalance: 250000,
    creditScoreRange: "720-739 (Very Good)",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredContact: "phone" as const,
    tcpaConsent: false,
    websiteCompanyField: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!formData.firstName.trim()) errs.firstName = "First name is required";
    if (!formData.lastName.trim()) errs.lastName = "Last name is required";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errs.email = "Valid email is required";
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      errs.phone = "10-digit telephone required";
    }
    if (!formData.tcpaConsent) {
      errs.tcpaConsent = "Consent is required to submit";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          sourceCampaign: sourceCampaign || defaultLoanProgram || "Contextual Form",
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Submission failed");
      }

      router.push(data.redirectUrl || `/thank-you?leadId=${data.leadId}`);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to process request. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-border-subtle p-6 sm:p-7 shadow-card">
      <div className="mb-5">
        <h3 className="text-xl font-bold font-heading text-navy-midnight">{headline}</h3>
        <p className="text-xs text-slate-500 mt-1">{subheadline}</p>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot */}
        <input
          type="text"
          name="websiteCompanyField"
          value={formData.websiteCompanyField}
          onChange={(e) => setFormData({ ...formData, websiteCompanyField: e.target.value })}
          style={{ display: "none" }}
          tabIndex={-1}
        />

        <div className="grid grid-cols-2 gap-3">
          <FormField label="First Name" required error={errors.firstName}>
            <Input
              placeholder="First"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </FormField>
          <FormField label="Last Name" required error={errors.lastName}>
            <Input
              placeholder="Last"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField label="Email" required error={errors.email}>
            <Input
              type="email"
              placeholder="name@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </FormField>
          <FormField label="Phone" required error={errors.phone}>
            <Input
              type="tel"
              placeholder="(800) 555-0199"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Estimated Home Price">
            <CurrencyInput
              value={formData.propertyValue}
              onChange={(val) => setFormData({ ...formData, propertyValue: val })}
            />
          </FormField>
          <FormField label={defaultLoanPurpose === "refinance" ? "Current Balance" : "Down Payment"}>
            <CurrencyInput
              value={
                defaultLoanPurpose === "refinance"
                  ? formData.currentMortgageBalance
                  : formData.downPayment
              }
              onChange={(val) =>
                setFormData({
                  ...formData,
                  [defaultLoanPurpose === "refinance"
                    ? "currentMortgageBalance"
                    : "downPayment"]: val,
                })
              }
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Credit Score">
            <Select
              value={formData.creditScoreRange}
              onChange={(e) => setFormData({ ...formData, creditScoreRange: e.target.value })}
              options={[
                { value: "740+ (Excellent)", label: "740+ (Excellent)" },
                { value: "700-739 (Very Good)", label: "700–739 (Very Good)" },
                { value: "660-699 (Good)", label: "660–699 (Good)" },
                { value: "620-659 (Fair)", label: "620–659 (Fair)" },
                { value: "580-619 (Building)", label: "580–619 (Building)" },
              ]}
            />
          </FormField>
          <FormField label="Property State">
            <Select
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              options={siteConfig.statesLicensed.map((s) => ({
                value: s.code,
                label: s.code,
              }))}
            />
          </FormField>
        </div>

        <Checkbox
          id="contextualTcpa"
          checked={formData.tcpaConsent}
          onChange={(e) => setFormData({ ...formData, tcpaConsent: e.target.checked })}
          error={errors.tcpaConsent}
          label={
            <span className="text-[11px] leading-tight text-slate-500">
              I consent to receive calls and texts from {siteConfig.brand.name} at this number. Message & data rates may apply. Not a requirement to buy.
            </span>
          }
        />

        <Button
          type="submit"
          variant="brass"
          size="md"
          className="w-full text-navy-midnight font-bold"
          isLoading={isSubmitting}
        >
          Request Personalized Quote
        </Button>
      </form>
    </div>
  );
}

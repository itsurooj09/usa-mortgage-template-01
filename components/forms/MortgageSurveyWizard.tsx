"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField, Input } from "./FormField";
import {
  CurrencyInput,
  Select,
  RadioCardGroup,
  Checkbox,
  ProgressBar,
} from "./SpecialInputs";
import { Button } from "../ui/Button";
import { siteConfig } from "@/lib/config/siteConfig";

export interface SurveyFormData {
  loanPurpose: "buy" | "refinance" | "explore" | "other";
  propertyStatus: string;
  propertyType: string;
  occupancy: string;
  state: string;
  zipCode: string;
  propertyValue: number;
  downPayment: number;
  currentMortgageBalance: number;
  cashOutAmount: number;
  creditScoreRange: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: "phone" | "email" | "text";
  preferredTime: string;
  tcpaConsent: boolean;
  marketingConsent: boolean;
  websiteCompanyField: string; // Honeypot
}

const initialData: SurveyFormData = {
  loanPurpose: "buy",
  propertyStatus: "shopping",
  propertyType: "Single-Family Home",
  occupancy: "Primary Residence",
  state: "NC",
  zipCode: "",
  propertyValue: 400000,
  downPayment: 40000,
  currentMortgageBalance: 280000,
  cashOutAmount: 0,
  creditScoreRange: "720-739 (Very Good)",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  preferredContact: "phone",
  preferredTime: "Morning (9am - 12pm EST)",
  tcpaConsent: false,
  marketingConsent: false,
  websiteCompanyField: "",
};

const STEP_LABELS = [
  "Loan Purpose",
  "Property Status",
  "Location & Type",
  "Financial Details",
  "Borrower Info",
  "Verification & Consent",
];

export function MortgageSurveyWizard({ initialPurpose }: { initialPurpose?: "buy" | "refinance" | "explore" }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SurveyFormData>({
    ...initialData,
    loanPurpose: initialPurpose || "buy",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateField = (field: keyof SurveyFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.loanPurpose) errs.loanPurpose = "Please select a loan purpose.";
    } else if (step === 2) {
      if (!formData.propertyStatus) errs.propertyStatus = "Please select your current timeline/status.";
    } else if (step === 3) {
      if (!formData.state) errs.state = "Select a state.";
      if (!formData.zipCode || formData.zipCode.trim().length < 5) {
        errs.zipCode = "Enter a valid 5-digit ZIP code.";
      }
      if (!formData.propertyType) errs.propertyType = "Select property type.";
      if (!formData.occupancy) errs.occupancy = "Select occupancy type.";
    } else if (step === 4) {
      if (formData.propertyValue <= 0) {
        errs.propertyValue = "Please enter an estimated value greater than $0.";
      }
      if (!formData.creditScoreRange) {
        errs.creditScoreRange = "Please estimate your credit rating.";
      }
    } else if (step === 5) {
      if (!formData.firstName.trim()) errs.firstName = "First name is required.";
      if (!formData.lastName.trim()) errs.lastName = "Last name is required.";
      if (!formData.email.trim() || !formData.email.includes("@")) {
        errs.email = "Enter a valid email address.";
      }
      const rawPhone = formData.phone.replace(/[^0-9]/g, "");
      if (rawPhone.length < 10) {
        errs.phone = "Enter a valid 10-digit telephone number.";
      }
    } else if (step === 6) {
      if (!formData.tcpaConsent) {
        errs.tcpaConsent = "You must accept the contact consent to submit your inquiry.";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(6)) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit your inquiry. Please check your entries.");
      }

      router.push(data.redirectUrl || `/thank-you?leadId=${data.leadId}`);
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-form mx-auto bg-white rounded-xl border border-border-subtle p-6 sm:p-8 shadow-card">
      <ProgressBar currentStep={currentStep} totalSteps={6} stepLabels={STEP_LABELS} />

      {submitError && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 flex items-start gap-3">
          <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-semibold">Submission Alert</p>
            <p className="mt-0.5">{submitError}</p>
          </div>
        </div>
      )}

      {/* Step 1: Purpose */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-navy-midnight">
              What type of loan do you need?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Select your primary goal to help us tailor accurate rates and guidelines.
            </p>
          </div>

          <RadioCardGroup
            name="loanPurpose"
            columns={2}
            value={formData.loanPurpose}
            onChange={(val) => updateField("loanPurpose", val)}
            options={[
              {
                value: "buy",
                title: "Buy a Home",
                description: "Purchase a primary home, secondary vacation residence, or investment property.",
              },
              {
                value: "refinance",
                title: "Refinance",
                description: "Lower your monthly rate, eliminate PMI, or pull equity out in cash.",
              },
              {
                value: "explore",
                title: "Explore Programs",
                description: "Compare conventional, FHA, VA, USDA, and Jumbo requirements.",
              },
              {
                value: "other",
                title: "Other / Not Sure",
                description: "Speak with a licensed advisor to determine your best financing strategy.",
              },
            ]}
          />
        </div>
      )}

      {/* Step 2: Property Status */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-navy-midnight">
              {formData.loanPurpose === "refinance"
                ? "How is this property currently occupied?"
                : "Where are you in the home buying journey?"}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              This helps us gauge your timeline and required underwriting speed.
            </p>
          </div>

          {formData.loanPurpose === "refinance" ? (
            <RadioCardGroup
              name="propertyStatus"
              columns={1}
              value={formData.propertyStatus}
              onChange={(val) => updateField("propertyStatus", val)}
              options={[
                {
                  value: "primary",
                  title: "Primary Residence",
                  description: "You live here full-time as your main home.",
                },
                {
                  value: "second_home",
                  title: "Second / Vacation Home",
                  description: "Occupied by you for part of the year for leisure.",
                },
                {
                  value: "investment",
                  title: "Investment Rental Property",
                  description: "Leased out to generate recurring rental income.",
                },
              ]}
            />
          ) : (
            <RadioCardGroup
              name="propertyStatus"
              columns={1}
              value={formData.propertyStatus}
              onChange={(val) => updateField("propertyStatus", val)}
              options={[
                {
                  value: "under_contract",
                  title: "Under Contract / Offer Accepted",
                  description: "You have an executed purchase contract and need fast closing.",
                },
                {
                  value: "shopping",
                  title: "Actively Shopping with an Agent",
                  description: "Viewing homes and ready to submit purchase offers with pre-approval.",
                },
                {
                  value: "researching",
                  title: "Researching / Planning Ahead (2-6 Months)",
                  description: "Reviewing budget, saving down payment, and exploring purchasing capacity.",
                },
              ]}
            />
          )}
        </div>
      )}

      {/* Step 3: Location & Type */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-navy-midnight">
              Property Location and Type
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Mortgage limits and property taxes depend on the specific county and state.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Property State" required error={errors.state}>
              <Select
                value={formData.state}
                onChange={(e) => updateField("state", e.target.value)}
                options={siteConfig.statesLicensed.map((s) => ({
                  value: s.code,
                  label: `${s.name} (${s.code})`,
                }))}
              />
            </FormField>

            <FormField label="Property ZIP Code" required error={errors.zipCode}>
              <Input
                placeholder="e.g. 28202"
                maxLength={5}
                value={formData.zipCode}
                onChange={(e) => updateField("zipCode", e.target.value.replace(/[^0-9]/g, ""))}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Property Structure" required error={errors.propertyType}>
              <Select
                value={formData.propertyType}
                onChange={(e) => updateField("propertyType", e.target.value)}
                options={[
                  { value: "Single-Family Home", label: "Single-Family Home" },
                  { value: "Condominium", label: "Condominium (Condo)" },
                  { value: "Townhouse", label: "Townhouse" },
                  { value: "Multi-Family (2-4 Units)", label: "Multi-Family (2-4 Units)" },
                  { value: "Manufactured / Modular", label: "Manufactured / Modular" },
                ]}
              />
            </FormField>

            <FormField label="Occupancy Plan" required error={errors.occupancy}>
              <Select
                value={formData.occupancy}
                onChange={(e) => updateField("occupancy", e.target.value)}
                options={[
                  { value: "Primary Residence", label: "Primary Residence" },
                  { value: "Second / Vacation Home", label: "Second / Vacation Home" },
                  { value: "Investment Property", label: "Investment Property" },
                ]}
              />
            </FormField>
          </div>
        </div>
      )}

      {/* Step 4: Purchase or Refinance Details */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-navy-midnight">
              {formData.loanPurpose === "refinance" ? "Refinance Details" : "Purchase Budget Details"}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Estimated numbers are completely acceptable at this preliminary stage.
            </p>
          </div>

          {formData.loanPurpose === "refinance" ? (
            <div className="space-y-4">
              <FormField
                label="Estimated Current Home Value"
                required
                error={errors.propertyValue}
                helperText="Approximate market valuation based on recent neighborhood comps."
              >
                <CurrencyInput
                  value={formData.propertyValue}
                  onChange={(val) => updateField("propertyValue", val)}
                />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Current Mortgage Balance"
                  helperText="Approximate principal remaining."
                >
                  <CurrencyInput
                    value={formData.currentMortgageBalance}
                    onChange={(val) => updateField("currentMortgageBalance", val)}
                  />
                </FormField>

                <FormField
                  label="Desired Cash-Out (Optional)"
                  optional
                  helperText="Cash in pocket for debts, remodel, etc."
                >
                  <CurrencyInput
                    value={formData.cashOutAmount}
                    onChange={(val) => updateField("cashOutAmount", val)}
                  />
                </FormField>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <FormField
                label="Estimated Target Purchase Price"
                required
                error={errors.propertyValue}
                helperText="Estimated price of homes you are viewing."
              >
                <CurrencyInput
                  value={formData.propertyValue}
                  onChange={(val) => updateField("propertyValue", val)}
                />
              </FormField>

              <FormField
                label="Estimated Down Payment Funds"
                helperText={`Approximately ${
                  formData.propertyValue > 0
                    ? Math.round((formData.downPayment / formData.propertyValue) * 100)
                    : 0
                }% of purchase price.`}
              >
                <CurrencyInput
                  value={formData.downPayment}
                  onChange={(val) => updateField("downPayment", val)}
                />
              </FormField>
            </div>
          )}

          <FormField
            label="Estimated Credit Profile"
            required
            error={errors.creditScoreRange}
            helperText="Soft check only; does not impact your credit score."
          >
            <Select
              value={formData.creditScoreRange}
              onChange={(e) => updateField("creditScoreRange", e.target.value)}
              options={[
                { value: "740+ (Excellent)", label: "740+ (Excellent - Best Conventional Pricing)" },
                { value: "700-739 (Very Good)", label: "700 – 739 (Very Good)" },
                { value: "660-699 (Good)", label: "660 – 699 (Good)" },
                { value: "620-659 (Fair)", label: "620 – 659 (Fair - Conforming Minimum)" },
                { value: "580-619 (Building)", label: "580 – 619 (Building - FHA Eligible)" },
                { value: "Below 580", label: "Below 580 (Need Credit Advisory)" },
              ]}
            />
          </FormField>
        </div>
      )}

      {/* Step 5: Borrower Information */}
      {currentStep === 5 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-navy-midnight">
              Where should we send your pre-approval options?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              We never sell your information. Your details are guarded with bank-level encryption.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="First Name" required error={errors.firstName}>
              <Input
                placeholder="e.g. John"
                value={formData.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
              />
            </FormField>

            <FormField label="Last Name" required error={errors.lastName}>
              <Input
                placeholder="e.g. Smith"
                value={formData.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Email Address" required error={errors.email}>
              <Input
                type="email"
                placeholder="john.smith@example.com"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </FormField>

            <FormField label="Phone Number" required error={errors.phone}>
              <Input
                type="tel"
                placeholder="(800) 555-0199"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Preferred Contact Method">
              <Select
                value={formData.preferredContact}
                onChange={(e) => updateField("preferredContact", e.target.value)}
                options={[
                  { value: "phone", label: "Phone Call" },
                  { value: "email", label: "Email Only" },
                  { value: "text", label: "SMS Text Message" },
                ]}
              />
            </FormField>

            <FormField label="Best Time to Connect">
              <Select
                value={formData.preferredTime}
                onChange={(e) => updateField("preferredTime", e.target.value)}
                options={[
                  { value: "Morning (9am - 12pm EST)", label: "Morning (9am - 12pm EST)" },
                  { value: "Afternoon (12pm - 4pm EST)", label: "Afternoon (12pm - 4pm EST)" },
                  { value: "Evening (4pm - 7pm EST)", label: "Evening (4pm - 7pm EST)" },
                ]}
              />
            </FormField>
          </div>
        </div>
      )}

      {/* Step 6: Consent and Submission */}
      {currentStep === 6 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-navy-midnight">
              Review and Submit Your Inquiry
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Confirm your contact permission below to connect with a licensed loan officer.
            </p>
          </div>

          {/* Hidden honeypot field */}
          <input
            type="text"
            name="websiteCompanyField"
            value={formData.websiteCompanyField}
            onChange={(e) => updateField("websiteCompanyField", e.target.value)}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="p-4 rounded-lg bg-ivory-warm border border-border-subtle text-xs text-slate-600 leading-relaxed space-y-2">
            <p className="font-semibold text-navy-midnight">
              Summary of Inquiry:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-slate-400">Purpose:</span>{" "}
                <span className="font-medium text-navy-midnight capitalize">{formData.loanPurpose}</span>
              </div>
              <div>
                <span className="text-slate-400">Target Value:</span>{" "}
                <span className="font-medium text-navy-midnight">${formData.propertyValue.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-400">Location:</span>{" "}
                <span className="font-medium text-navy-midnight">{formData.state} {formData.zipCode}</span>
              </div>
              <div>
                <span className="text-slate-400">Borrower:</span>{" "}
                <span className="font-medium text-navy-midnight">{formData.firstName} {formData.lastName}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Checkbox
              id="tcpaConsent"
              name="tcpaConsent"
              checked={formData.tcpaConsent}
              onChange={(e) => updateField("tcpaConsent", e.target.checked)}
              error={errors.tcpaConsent}
              label={
                <span>
                  <strong>TCPA & Communications Consent:</strong> By checking this box, I express consent for {siteConfig.brand.legalName} and its licensed loan officers (NMLS #{siteConfig.brand.nmlsId}) to contact me at the phone number and email provided regarding mortgage rates and loan qualification, including via automated phone technology, SMS, and pre-recorded messages. Consent is not a condition of purchase. Message and data rates may apply.
                </span>
              }
            />

            <Checkbox
              id="marketingConsent"
              name="marketingConsent"
              checked={formData.marketingConsent}
              onChange={(e) => updateField("marketingConsent", e.target.checked)}
              label={
                <span>
                  Send me complimentary weekly mortgage rate updates and market reports (Unsubscribe anytime).
                </span>
              }
            />
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-500">
            <strong>Security Notice:</strong> Northstar Mortgage does not solicit or store Social Security Numbers or online banking credentials through this preliminary qualification questionnaire.
          </div>
        </form>
      )}

      {/* Action Buttons */}
      <div className="mt-8 pt-4 border-t border-border-subtle flex items-center justify-between">
        {currentStep > 1 ? (
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleBack}
            disabled={isSubmitting}
          >
            ← Back
          </Button>
        ) : (
          <div />
        )}

        {currentStep < 6 ? (
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={handleNext}
          >
            Continue →
          </Button>
        ) : (
          <Button
            type="button"
            variant="brass"
            size="lg"
            isLoading={isSubmitting}
            onClick={handleSubmit}
          >
            Submit Loan Inquiry
          </Button>
        )}
      </div>
    </div>
  );
}

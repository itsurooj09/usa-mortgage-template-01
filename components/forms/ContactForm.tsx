"use client";

import React, { useState } from "react";
import { FormField, Input } from "./FormField";
import { Select, Checkbox } from "./SpecialInputs";
import { Button } from "../ui/Button";
import { siteConfig } from "@/lib/config/siteConfig";

export function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    loanType: "Buying a Home",
    message: "",
    contactMethod: "phone" as "phone" | "email",
    tcpaConsent: false,
    securityHoney: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.length < 2) {
      errs.fullName = "Full name is required (min 2 chars).";
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errs.email = "Valid email is required.";
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      errs.phone = "Valid 10-digit telephone required.";
    }
    if (!formData.message.trim() || formData.message.length < 5) {
      errs.message = "Please include a message or inquiry details.";
    }
    if (!formData.tcpaConsent) {
      errs.tcpaConsent = "Consent is required to be contacted.";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to deliver message.");
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl mx-auto">
          ✓
        </div>
        <h3 className="font-heading font-bold text-xl text-emerald-950">
          Message Received
        </h3>
        <p className="text-sm text-emerald-800 max-w-sm mx-auto">
          Thank you for reaching out. A licensed Northstar loan officer will contact you by your preferred method within 2 business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-border-subtle shadow-card">
      <h3 className="font-heading font-bold text-xl text-navy-midnight mb-1">
        Send Us a Direct Inquiry
      </h3>
      <p className="text-xs text-slate-500 mb-4">
        Our direct lending desk responds rapidly during standard business hours.
      </p>

      {/* Honeypot */}
      <input
        type="text"
        name="securityHoney"
        value={formData.securityHoney}
        onChange={(e) => setFormData({ ...formData, securityHoney: e.target.value })}
        style={{ display: "none" }}
        tabIndex={-1}
      />

      {errorMessage && (
        <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200">
          {errorMessage}
        </div>
      )}

      <FormField label="Full Name" required error={errors.fullName}>
        <Input
          placeholder="e.g. Eleanor Vance"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Email" required error={errors.email}>
          <Input
            type="email"
            placeholder="eleanor@example.com"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Topic / Loan Type">
          <Select
            value={formData.loanType}
            onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
            options={[
              { value: "Buying a Home", label: "Buying a Home (Purchase)" },
              { value: "Refinancing", label: "Refinancing Current Mortgage" },
              { value: "VA Loan Inquiry", label: "VA Military Home Loan" },
              { value: "First-Time Buyer", label: "First-Time Homebuyer Assistance" },
              { value: "Jumbo Luxury Loan", label: "Jumbo Portfolio Loan" },
              { value: "General Question", label: "General Inquiries" },
            ]}
          />
        </FormField>

        <FormField label="Preferred Contact Method">
          <Select
            value={formData.contactMethod}
            onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value as any })}
            options={[
              { value: "phone", label: "Phone Call" },
              { value: "email", label: "Email Reply" },
            ]}
          />
        </FormField>
      </div>

      <FormField label="How Can We Help?" required error={errors.message}>
        <textarea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your target purchase price, timing, or refinance questions..."
          className="w-full rounded-md border border-border-subtle bg-white px-3.5 py-2.5 text-sm text-navy-midnight placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-midnight/20"
        />
      </FormField>

      <Checkbox
        id="contactTcpa"
        checked={formData.tcpaConsent}
        onChange={(e) => setFormData({ ...formData, tcpaConsent: e.target.checked })}
        error={errors.tcpaConsent}
        label={
          <span className="text-[11px] leading-tight text-slate-500">
            I consent to be contacted by {siteConfig.brand.legalName} at this number and email regarding my mortgage inquiry. Standard rates apply.
          </span>
        }
      />

      <Button
        type="submit"
        variant="brass"
        size="md"
        isLoading={isSubmitting}
        className="w-full font-bold text-navy-deep"
      >
        Send Message to Loan Officer
      </Button>
    </form>
  );
}

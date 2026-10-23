import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/lib/config/siteConfig";

const LeadSchema = z.object({
  loanPurpose: z.enum(["buy", "refinance", "explore", "other"]),
  propertyStatus: z.string().optional(),
  propertyType: z.string().min(1, "Please select property type"),
  occupancy: z.string().min(1, "Please select occupancy type"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Enter a valid 5-digit ZIP code").max(10),
  propertyValue: z.number().positive("Property value must be greater than 0"),
  downPayment: z.number().nonnegative().optional(),
  currentMortgageBalance: z.number().nonnegative().optional(),
  cashOutAmount: z.number().nonnegative().optional(),
  creditScoreRange: z.string().min(1, "Credit rating is required"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid 10-digit telephone number"),
  preferredContact: z.enum(["phone", "email", "text"]).default("phone"),
  preferredTime: z.string().optional(),
  tcpaConsent: z.boolean().refine((val) => val === true, {
    message: "You must consent to be contacted to submit your request.",
  }),
  sourceCampaign: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  // Honeypot spam field
  websiteCompanyField: z.string().max(0, "Spam detected").optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Check honeypot
    if (body.websiteCompanyField && body.websiteCompanyField.length > 0) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    const validation = LeadSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation error",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const leadData = validation.data;
    const leadId = `NS-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;

    // Forward to CRM webhook if configured
    if (siteConfig.integrations.crmWebhookUrl) {
      try {
        await fetch(siteConfig.integrations.crmWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ leadId, ...leadData, submittedAt: new Date().toISOString() }),
        });
      } catch (crmError) {
        console.error("CRM webhook dispatch error:", crmError);
        // Do not crash client request, but record delivery warning
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Mortgage inquiry received successfully.",
        leadId,
        redirectUrl: `/thank-you?leadId=${leadId}&name=${encodeURIComponent(leadData.firstName)}`,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Server processing error. Please try again." },
      { status: 500 }
    );
  }
}

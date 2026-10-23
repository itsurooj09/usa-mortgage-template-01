import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/lib/config/siteConfig";

const ContactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  loanType: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters"),
  contactMethod: z.enum(["phone", "email"]).default("email"),
  tcpaConsent: z.boolean().refine((val) => val === true, {
    message: "Consent is required to be contacted.",
  }),
  securityHoney: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.securityHoney && body.securityHoney.length > 0) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    const result = ContactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const ticketId = `MSG-${Date.now().toString(36).toUpperCase()}`;

    if (siteConfig.integrations.crmWebhookUrl) {
      try {
        await fetch(siteConfig.integrations.crmWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ticketId, ...result.data, date: new Date().toISOString() }),
        });
      } catch (err) {
        console.error("CRM dispatch failure:", err);
      }
    }

    return NextResponse.json({
      success: true,
      ticketId,
      message: "Thank you. Your message has been routed to our lending team.",
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process message." }, { status: 500 });
  }
}

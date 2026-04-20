import { NextResponse } from "next/server";
import { deliverSubmission } from "@/lib/form-backend";
import { requireEmail, requireString } from "@/lib/form-request";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const organization = requireString(body.organization, "Organization name", 200);
    const contact = requireString(body.contact, "Contact name", 160);
    const email = requireEmail(body.email);
    const message = requireString(body.message, "Partnership details", 5000);

    await deliverSubmission({
      kind: "partner",
      name: contact,
      email,
      subject: `Partnership inquiry from ${organization}`,
      message,
      metadata: {
        organization
      }
    });

    return NextResponse.json({
      ok: true,
      message: "Thanks for your interest. We received your partnership inquiry."
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to submit the partnership inquiry.";
    const status = /required|valid email/i.test(message) ? 400 : 500;

    return NextResponse.json({ ok: false, error: message }, { status });
  }
}

import { NextResponse } from "next/server";
import { deliverSubmission } from "@/lib/form-backend";
import { cleanString, requireEmail, requirePositiveNumber, requireString } from "@/lib/form-request";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const firstName = requireString(body.firstName, "First name", 120);
    const lastName = requireString(body.lastName, "Last name", 120);
    const email = requireEmail(body.email);
    const amount = requirePositiveNumber(body.amount, "Donation amount");
    const monthly = Boolean(body.monthly);
    const note = cleanString(body.note, 5000);
    const fullName = `${firstName} ${lastName}`;

    await deliverSubmission({
      kind: "donation_intent",
      name: fullName,
      email,
      subject: `${monthly ? "Monthly" : "One-time"} donation intent for $${amount.toLocaleString("en-US")}`,
      message: note || `${fullName} submitted a ${monthly ? "monthly" : "one-time"} donation intent.`,
      metadata: {
        amount,
        cadence: monthly ? "monthly" : "one-time"
      }
    });

    return NextResponse.json({
      ok: true,
      message: `Thanks! We received your ${monthly ? "monthly " : ""}donation intent for $${amount.toLocaleString("en-US")}.`
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to submit the donation intent.";
    const status = /required|greater than 0|valid email/i.test(message) ? 400 : 500;

    return NextResponse.json({ ok: false, error: message }, { status });
  }
}

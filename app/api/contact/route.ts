import { NextResponse } from "next/server";
import { deliverSubmission } from "@/lib/form-backend";
import { cleanString, requireEmail, requireString } from "@/lib/form-request";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = requireString(body.name, "Name", 160);
    const email = requireEmail(body.email);
    const subject = requireString(body.subject ?? "General inquiry", "Subject", 200);
    const message = requireString(body.message, "Message", 5000);
    const source = cleanString(body.source, 120);

    await deliverSubmission({
      kind: "contact",
      name,
      email,
      subject,
      message,
      metadata: source ? { source } : undefined
    });

    return NextResponse.json({
      ok: true,
      message: "Thanks! We received your message and will be in touch soon."
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to submit the form right now.";
    const status = /required|valid email/i.test(message) ? 400 : 500;

    return NextResponse.json({ ok: false, error: message }, { status });
  }
}

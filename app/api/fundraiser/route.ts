import { NextResponse } from "next/server";
import { deliverSubmission } from "@/lib/form-backend";
import { requireEmail, requirePositiveNumber, requireString } from "@/lib/form-request";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = requireString(body.name, "Name", 160);
    const email = requireEmail(body.email);
    const goal = requirePositiveNumber(body.goal, "Fundraising goal");

    await deliverSubmission({
      kind: "fundraiser",
      name,
      email,
      subject: `Fundraiser goal: $${goal.toLocaleString("en-US")}`,
      message: `${name} wants to start a fundraiser with a goal of $${goal.toLocaleString("en-US")}.`,
      metadata: {
        goal
      }
    });

    return NextResponse.json({
      ok: true,
      message: "Thanks! We received your fundraiser request and will follow up soon."
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to submit the fundraiser request.";
    const status = /required|greater than 0|valid email/i.test(message) ? 400 : 500;

    return NextResponse.json({ ok: false, error: message }, { status });
  }
}

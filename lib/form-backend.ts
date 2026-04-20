import { site } from "@/data/site";

export type SubmissionKind = "contact" | "fundraiser" | "partner" | "donation_intent";

type SubmissionPayload = {
  kind: SubmissionKind;
  name: string;
  email: string;
  subject: string;
  message: string;
  metadata?: Record<string, unknown>;
};

type DeliveryResult = {
  storedInSupabase: boolean;
  emailed: boolean;
};

const submissionLabels: Record<SubmissionKind, string> = {
  contact: "Contact Inquiry",
  fundraiser: "Fundraiser Request",
  partner: "Partnership Inquiry",
  donation_intent: "Donation Intent"
};

function getEnv(name: string) {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : null;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function stringifyMetadata(metadata: Record<string, unknown> | undefined) {
  if (!metadata || Object.keys(metadata).length === 0) {
    return null;
  }

  return Object.entries(metadata)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join("\n");
}

async function insertIntoSupabase(payload: SubmissionPayload) {
  const supabaseUrl = getEnv("SUPABASE_URL");
  const serviceRoleKey = getEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return false;
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/form_submissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: "return=minimal"
    },
    body: JSON.stringify([
      {
        form_type: payload.kind,
        name: payload.name,
        email: payload.email,
        subject: payload.subject,
        message: payload.message,
        metadata: payload.metadata ?? {}
      }
    ]),
    cache: "no-store"
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase insert failed: ${text}`);
  }

  return true;
}

async function sendEmailViaResend(payload: SubmissionPayload) {
  const apiKey = getEnv("RESEND_API_KEY");
  const from = getEnv("RESEND_FROM_EMAIL");
  const notificationsTo = getEnv("NOTIFICATION_EMAIL") ?? site.email;

  if (!apiKey || !from) {
    return false;
  }

  const metadataText = stringifyMetadata(payload.metadata);
  const label = submissionLabels[payload.kind];
  const safeMessage = escapeHtml(payload.message).replaceAll("\n", "<br />");
  const safeMetadata = metadataText ? escapeHtml(metadataText).replaceAll("\n", "<br />") : null;

  const adminHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f2945;">
      <h2 style="margin-bottom: 16px;">${label}</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
      <p><strong>Message:</strong><br />${safeMessage}</p>
      ${safeMetadata ? `<p><strong>Details:</strong><br />${safeMetadata}</p>` : ""}
    </div>
  `;

  const adminText = [
    label,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Subject: ${payload.subject}`,
    `Message: ${payload.message}`,
    metadataText ? `Details:\n${metadataText}` : null
  ]
    .filter(Boolean)
    .join("\n\n");

  const adminResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      from,
      to: [notificationsTo],
      reply_to: payload.email,
      subject: `[Soccer-4-All] ${label}: ${payload.subject}`,
      html: adminHtml,
      text: adminText
    }),
    cache: "no-store"
  });

  if (!adminResponse.ok) {
    const text = await adminResponse.text();
    throw new Error(`Resend delivery failed: ${text}`);
  }

  const confirmationText = [
    `Hi ${payload.name},`,
    "",
    `Thanks for reaching out to ${site.name}. We received your ${label.toLowerCase()} and will follow up soon.`,
    "",
    `Subject: ${payload.subject}`,
    payload.kind === "donation_intent"
      ? "This is a donation intent submission only. Secure online checkout is still being finalized."
      : "We appreciate you taking the time to contact us.",
    "",
    `- ${site.name}`
  ].join("\n");

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      from,
      to: [payload.email],
      subject: `${site.name} received your message`,
      text: confirmationText
    }),
    cache: "no-store"
  });

  return true;
}

export function isSubmissionBackendConfigured() {
  const hasEmail = Boolean(getEnv("RESEND_API_KEY") && getEnv("RESEND_FROM_EMAIL"));
  const hasStorage = Boolean(getEnv("SUPABASE_URL") && getEnv("SUPABASE_SERVICE_ROLE_KEY"));

  return hasEmail || hasStorage;
}

export async function deliverSubmission(payload: SubmissionPayload): Promise<DeliveryResult> {
  if (!isSubmissionBackendConfigured()) {
    throw new Error("Submission backend is not configured.");
  }

  const [supabaseResult, emailResult] = await Promise.allSettled([
    insertIntoSupabase(payload),
    sendEmailViaResend(payload)
  ]);

  const storedInSupabase = supabaseResult.status === "fulfilled" ? supabaseResult.value : false;
  const emailed = emailResult.status === "fulfilled" ? emailResult.value : false;

  if (!storedInSupabase && !emailed) {
    const reasons = [
      supabaseResult.status === "rejected" ? supabaseResult.reason : null,
      emailResult.status === "rejected" ? emailResult.reason : null
    ]
      .filter(Boolean)
      .map((reason) => (reason instanceof Error ? reason.message : String(reason)));

    throw new Error(reasons[0] ?? "No delivery channel is configured.");
  }

  return {
    storedInSupabase,
    emailed
  };
}

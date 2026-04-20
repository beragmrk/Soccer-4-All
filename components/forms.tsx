"use client";

import clsx from "clsx";
import { ChevronDown, HeartHandshake, Send, ShieldCheck } from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  contactSubjectOptions,
  donationAmounts,
  donationFaqs,
  donationImpactText,
  donationProvides
} from "@/data/site";
import { ButtonLink, IconBadge } from "@/components/brand";

const inputClass =
  "focus-ring min-h-12 w-full rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm text-navy placeholder:text-ink/40";

const darkInputClass =
  "focus-ring min-h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40";

type NoticeTone = "success" | "error" | "info";

async function submitJson<T>(url: string, payload: T) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = (await response.json().catch(() => null)) as { error?: string; message?: string } | null;

  if (!response.ok) {
    throw new Error(data?.error ?? "Something went wrong. Please try again.");
  }

  return data;
}

function Notice({ children, tone = "success" }: { children: ReactNode; tone?: NoticeTone }) {
  return (
    <div
      className={clsx(
        "rounded-xl px-4 py-3 text-sm font-semibold",
        tone === "success" && "border border-primary/20 bg-primary/10 text-primary",
        tone === "error" && "border border-red-200 bg-red-50 text-red-700",
        tone === "info" && "border border-primary/15 bg-field text-navy"
      )}
    >
      {children}
    </div>
  );
}

export function MiniContactForm() {
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: NoticeTone; message: string } | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      setPending(true);
      setFeedback(null);
      const result = await submitJson("/api/contact", {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: "Homepage inquiry",
        message: formData.get("message"),
        source: "home-mini-contact"
      });

      setFeedback({ tone: "success", message: result?.message ?? "Thank you! We will be in touch soon." });
      form.reset();
    } catch (error) {
      setFeedback({
        tone: "error",
        message: error instanceof Error ? error.message : "We could not send your message just now."
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} data-reveal="zoom" className="brand-card bg-field p-6">
      <div className="space-y-5">
        {feedback ? <Notice tone={feedback.tone}>{feedback.message}</Notice> : null}
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-navy">Name</span>
          <input className={inputClass} name="name" placeholder="Your name" required disabled={pending} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-navy">Email</span>
          <input className={inputClass} name="email" type="email" placeholder="you@example.com" required disabled={pending} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-navy">Message</span>
          <textarea
            className={clsx(inputClass, "min-h-32 resize-none")}
            name="message"
            placeholder="How can we help?"
            required
            disabled={pending}
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="focus-ring shine-link inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-primary-dark"
        >
          {pending ? "Sending..." : "Send Message"} <Send aria-hidden className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: NoticeTone; message: string } | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      setPending(true);
      setFeedback(null);
      const result = await submitJson("/api/contact", {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
        source: "contact-page"
      });

      setFeedback({ tone: "success", message: result?.message ?? "Message sent! We will get back to you soon." });
      form.reset();
    } catch (error) {
      setFeedback({
        tone: "error",
        message: error instanceof Error ? error.message : "We could not send your message just now."
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} data-reveal="zoom" className="brand-card bg-white p-6 md:p-8">
      <h2 className="mb-6 text-xl font-black text-navy">Send us a message</h2>
      <div className="space-y-5">
        {feedback ? <Notice tone={feedback.tone}>{feedback.message}</Notice> : null}
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-navy">Name</span>
          <input className={inputClass} name="name" placeholder="Your name" required disabled={pending} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-navy">Email</span>
          <input className={inputClass} name="email" type="email" placeholder="you@example.com" required disabled={pending} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-navy">Subject</span>
          <select className={inputClass} name="subject" required defaultValue="" disabled={pending}>
            <option value="" disabled>
              Select a subject
            </option>
            {contactSubjectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-navy">Message</span>
          <textarea
            className={clsx(inputClass, "min-h-36 resize-none")}
            name="message"
            placeholder="How can we help?"
            required
            disabled={pending}
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="focus-ring shine-link inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-primary-dark"
        >
          {pending ? "Sending..." : "Send Message"} <Send aria-hidden className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}

export function FundraiserForm() {
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: NoticeTone; message: string } | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      setPending(true);
      setFeedback(null);
      const result = await submitJson("/api/fundraiser", {
        name: formData.get("name"),
        email: formData.get("email"),
        goal: formData.get("goal")
      });

      setFeedback({ tone: "success", message: result?.message ?? "Thanks! We will be in touch to set up your fundraiser." });
      form.reset();
    } catch (error) {
      setFeedback({
        tone: "error",
        message: error instanceof Error ? error.message : "We could not submit your fundraiser request just now."
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} data-reveal="zoom" className="brand-card bg-white p-6 md:p-8">
      <h3 className="mb-6 text-xl font-black text-navy">Start Your Fundraiser</h3>
      <div className="space-y-5">
        {feedback ? <Notice tone={feedback.tone}>{feedback.message}</Notice> : null}
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-navy">Your Name</span>
          <input className={inputClass} name="name" placeholder="Full name" required disabled={pending} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-navy">Email</span>
          <input className={inputClass} name="email" type="email" placeholder="you@example.com" required disabled={pending} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-navy">Fundraising Goal</span>
          <input className={inputClass} name="goal" type="number" placeholder="e.g., 500" required disabled={pending} />
          <span className="mt-1 block text-xs text-ink/50">$100 = 1 complete gear kit</span>
        </label>
        <button
          type="submit"
          disabled={pending}
          className="focus-ring shine-link min-h-12 w-full rounded-full bg-accent px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-navy transition duration-300 hover:-translate-y-0.5 hover:bg-[#e89526]"
        >
          {pending ? "Submitting..." : "Start My Fundraiser"}
        </button>
      </div>
    </form>
  );
}

export function PartnerForm() {
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: NoticeTone; message: string } | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      setPending(true);
      setFeedback(null);
      const result = await submitJson("/api/partner", {
        organization: formData.get("organization"),
        contact: formData.get("contact"),
        email: formData.get("email"),
        message: formData.get("message")
      });

      setFeedback({ tone: "success", message: result?.message ?? "Thank you for your interest! We will reach out soon." });
      form.reset();
    } catch (error) {
      setFeedback({
        tone: "error",
        message: error instanceof Error ? error.message : "We could not submit your inquiry just now."
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} data-reveal="zoom" className="brand-card bg-primary p-6 text-white md:p-8">
      <h3 className="mb-6 text-xl font-black">Partnership Inquiry</h3>
      <div className="space-y-5">
        {feedback ? (
          <div
            className={clsx(
              "rounded-xl px-4 py-3 text-sm font-semibold",
              feedback.tone === "success" && "border border-white/20 bg-white/10 text-white",
              feedback.tone === "error" && "border border-red-300/40 bg-red-500/15 text-white"
            )}
          >
            {feedback.message}
          </div>
        ) : null}
        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-white/80">Organization Name</span>
            <input className={darkInputClass} name="organization" placeholder="Company or organization" required disabled={pending} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-white/80">Contact Name</span>
            <input className={darkInputClass} name="contact" placeholder="Your name" required disabled={pending} />
          </label>
        </div>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-white/80">Email</span>
          <input className={darkInputClass} name="email" type="email" placeholder="you@organization.com" required disabled={pending} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-white/80">How would you like to partner?</span>
          <textarea
            className={clsx(darkInputClass, "min-h-32 resize-none")}
            name="message"
            placeholder="Tell us about your organization and partnership ideas..."
            required
            disabled={pending}
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="focus-ring shine-link min-h-12 w-full rounded-full bg-accent px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-navy transition duration-300 hover:-translate-y-0.5 hover:bg-[#e89526]"
        >
          {pending ? "Submitting..." : "Submit Inquiry"}
        </button>
      </div>
    </form>
  );
}

function getImpactForAmount(amount: number) {
  if (amount >= 500) return donationImpactText[500];
  if (amount >= 250) return donationImpactText[250];
  if (amount >= 120) return donationImpactText[120];
  if (amount >= 75) return donationImpactText[75];
  if (amount >= 35) return donationImpactText[35];
  return donationImpactText[15];
}

export function DonateForm({ initialAmount }: { initialAmount?: string }) {
  const initial = Number(initialAmount);
  const presetInitial = donationAmounts.includes(initial) ? initial : null;
  const [selectedAmount, setSelectedAmount] = useState<number | null>(presetInitial);
  const [customAmount, setCustomAmount] = useState(presetInitial ? "" : initialAmount || "50");
  const [monthly, setMonthly] = useState(false);
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: NoticeTone; message: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const amount = useMemo(() => {
    const parsedCustom = Number(customAmount);
    return selectedAmount || (Number.isFinite(parsedCustom) ? parsedCustom : 0);
  }, [customAmount, selectedAmount]);

  function chooseAmount(value: number) {
    setSelectedAmount(value);
    setCustomAmount("");
  }

  function onCustomChange(value: string) {
    setCustomAmount(value);
    setSelectedAmount(null);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (amount < 1) {
      setFeedback({ tone: "error", message: "Please select or enter a donation amount." });
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      setPending(true);
      setFeedback(null);
      const result = await submitJson("/api/donation-intent", {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        note: formData.get("note"),
        amount,
        monthly
      });

      setFeedback({
        tone: "success",
        message:
          result?.message ??
          `Thanks! We received your ${monthly ? "monthly " : ""}donation intent for $${amount} and will follow up with next steps.`
      });
      form.reset();
      setSelectedAmount(presetInitial);
      setCustomAmount(presetInitial ? "" : initialAmount || "50");
      setMonthly(false);
    } catch (error) {
      setFeedback({
        tone: "error",
        message: error instanceof Error ? error.message : "We could not submit your donation intent just now."
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <form onSubmit={onSubmit} data-reveal="fade-left" className="brand-card bg-white p-6 md:p-8 lg:col-span-2">
        <div className="mb-9 flex justify-center">
          <div className="inline-flex rounded-full bg-field p-1">
            <button
              type="button"
              onClick={() => setMonthly(false)}
              className={clsx(
                "focus-ring min-h-11 rounded-full px-5 text-sm font-black",
                !monthly ? "bg-primary text-white" : "text-ink/60"
              )}
            >
              One-time
            </button>
            <button
              type="button"
              onClick={() => setMonthly(true)}
              className={clsx(
                "focus-ring min-h-11 rounded-full px-5 text-sm font-black",
                monthly ? "bg-primary text-white" : "text-ink/60"
              )}
            >
              Monthly
            </button>
          </div>
        </div>

        <div>
          <p className="mb-4 text-lg font-black text-navy">
            Select Amount {monthly ? <span className="text-primary">(per month)</span> : null}
          </p>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
            {donationAmounts.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => chooseAmount(value)}
                disabled={pending}
                className={clsx(
                  "focus-ring min-h-14 rounded-xl border px-3 text-lg font-black transition duration-300 hover:-translate-y-0.5",
                  selectedAmount === value
                    ? "border-primary bg-primary text-white"
                    : "border-primary/10 bg-field text-navy hover:border-primary/30"
                )}
              >
                ${value}
              </button>
            ))}
          </div>
          <label className="mt-4 block">
            <span className="sr-only">Custom amount</span>
            <span className="relative block">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-black text-ink/40">$</span>
              <input
                className={clsx(inputClass, "min-h-14 pl-8 text-lg font-bold")}
                name="customAmount"
                type="number"
                min="1"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(event) => onCustomChange(event.target.value)}
                disabled={pending}
              />
            </span>
          </label>
        </div>

        {amount > 0 ? (
          <div className="my-8 rounded-2xl border border-accent/30 bg-accent/10 p-5">
            <div className="flex items-center gap-4">
              <IconBadge icon={HeartHandshake} tone="gold" />
              <div>
                <p className="display-title text-3xl text-navy">
                  ${amount}
                  {monthly ? "/mo" : ""}
                </p>
                <p className="text-sm text-ink/60">{getImpactForAmount(amount)}</p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="rounded-2xl bg-field p-5">
          <div className="mb-5 flex items-center gap-2">
            <HeartHandshake aria-hidden className="h-5 w-5 text-primary" />
            <h2 className="font-black text-navy">Donor Information</h2>
            <ShieldCheck aria-hidden className="ml-auto h-4 w-4 text-ink/40" />
          </div>
          <div className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-navy">First Name</span>
                <input className={inputClass} name="firstName" placeholder="First name" required disabled={pending} />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-navy">Last Name</span>
                <input className={inputClass} name="lastName" placeholder="Last name" required disabled={pending} />
              </label>
            </div>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-navy">Email Address</span>
              <input className={inputClass} name="email" type="email" placeholder="you@example.com" required disabled={pending} />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-navy">Anything we should know?</span>
              <textarea
                className={clsx(inputClass, "min-h-28 resize-none")}
                name="note"
                placeholder="Optional note"
                disabled={pending}
              />
            </label>
          </div>
        </div>

        <Notice tone="info">
          Secure online checkout is still being finalized. This form collects your donation intent and contact information only.
          We do not collect or store card details here.
        </Notice>

        {feedback ? (
          <div className="mt-6">
            <Notice tone={feedback.tone}>{feedback.message}</Notice>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="focus-ring shine-link mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-lg font-black uppercase tracking-[0.08em] text-navy transition duration-300 hover:-translate-y-0.5 hover:bg-[#e89526]"
        >
          {pending ? "Submitting..." : `Submit ${monthly ? "Monthly " : ""}Donation Intent`}
        </button>

        <div className="mt-5 flex flex-wrap justify-center gap-5 text-sm text-ink/50">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck aria-hidden className="h-4 w-4" />
            No card details collected
          </span>
          <span className="inline-flex items-center gap-2">
            <HeartHandshake aria-hidden className="h-4 w-4" />
            We follow up with next steps
          </span>
        </div>
      </form>

      <aside className="space-y-6" data-reveal="fade-right">
        <section className="brand-card bg-white p-6">
          <h2 className="mb-5 text-lg font-black text-navy">Your donation provides...</h2>
          <div className="space-y-4">
            {donationProvides.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <IconBadge icon={item.icon} tone="light" className="h-10 w-10" />
                <div>
                  <h3 className="font-bold text-navy">{item.title}</h3>
                  <p className="text-sm text-ink/60">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="brand-card cut-corner bg-primary p-6 text-white">
          <p className="display-title text-5xl">$120</p>
          <p className="mt-2 text-white/70">= 1 complete gear kit for a child</p>
          <p className="mt-5 text-sm leading-6 text-white/60">
            Every kit includes cleats, uniform, shin guards, and socks: everything a young player needs.
          </p>
        </section>
      </aside>

      <section id="faq" data-reveal="zoom" className="lg:col-span-3">
        <div className="mx-auto max-w-3xl pt-10">
          <h2 className="display-title mb-8 text-center text-3xl text-navy md:text-4xl">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {donationFaqs.map((faq, index) => (
              <div key={faq.question} className="brand-card bg-white">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-black text-navy">{faq.question}</span>
                  <ChevronDown
                    aria-hidden
                    className={clsx("h-5 w-5 shrink-0 text-primary transition", openFaq === index && "rotate-180")}
                  />
                </button>
                {openFaq === index ? <p className="px-5 pb-5 leading-7 text-ink/60">{faq.answer}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="lg:col-span-3">
        <div className="text-center">
          <ButtonLink href="/get-involved" variant="outline">
            Explore Other Ways to Help
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

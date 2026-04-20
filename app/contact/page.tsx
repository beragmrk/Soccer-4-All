import type { Metadata } from "next";
import { ButtonLink, Container, IconBadge, PageHero, SectionHeader } from "@/components/brand";
import { ContactForm } from "@/components/forms";
import { contactMethods, images, pageMetadata } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: pageMetadata.contact,
  alternates: {
    canonical: "/contact"
  }
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Get in"
        accent="Touch"
        description="Have questions, ideas, or want to collaborate? We would love to hear from you."
        image={images.contactHero}
        imageAlt="Contact Soccer-4-All"
      />
      <section className="paper-pattern bg-field py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div data-reveal="fade-left">
            <SectionHeader
              eyebrow="Reach Out"
              title="Let's Connect"
              align="left"
              description="Whether you are interested in donating, partnering, or just learning more about our mission, we are here to help."
            />
            <div className="mt-8 space-y-5">
              {contactMethods.map((method) => (
                <a
                  key={method.title}
                  href={method.href}
                  target={method.title === "Instagram" ? "_blank" : undefined}
                  rel={method.title === "Instagram" ? "noopener noreferrer" : undefined}
                  className="focus-ring flex items-center gap-4"
                >
                  <IconBadge icon={method.icon} tone="light" />
                  <span>
                    <span className="block text-sm text-ink/60">{method.title}</span>
                    <span className="font-black text-navy">{method.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <ContactForm />
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container className="text-center" data-reveal="zoom">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-primary">Donation Questions</p>
          <h2 className="display-title text-3xl text-navy md:text-4xl">Have Questions About Donating?</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-ink/60">
            Visit our donation page for frequently asked questions about tax deductibility, where your money goes, and more.
          </p>
          <div className="mt-8">
            <ButtonLink href="/donate#faq" variant="outline">
              View Donation FAQs
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}

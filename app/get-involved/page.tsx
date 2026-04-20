import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Container, CtaBand, IconBadge, ImpactChooser, PageHero, SectionHeader } from "@/components/brand";
import { FundraiserForm, PartnerForm } from "@/components/forms";
import { fundraiserSteps, images, pageMetadata, partnerTypes } from "@/data/site";

export const metadata: Metadata = {
  title: "Get Involved",
  description: pageMetadata.getInvolved,
  alternates: {
    canonical: "/get-involved"
  }
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        title="Get"
        accent="Involved"
        description="There are many ways to support our mission. Donate directly, start a fundraiser, or become a partner."
        image={images.getInvolvedHero}
        imageAlt="Get involved"
      />

      <section className="bg-accent py-6">
        <Container className="text-center" data-reveal="zoom">
          <p className="font-semibold leading-7 text-navy">
            <strong>Note:</strong> Soccer-4-All accepts monetary donations only. We do not accept equipment drop-offs. Your
            financial support allows us to purchase quality gear in bulk at better prices.
          </p>
        </Container>
      </section>

      <section id="donate" className="bg-white pt-20 md:pt-28">
        <Container>
          <SectionHeader
            eyebrow="Option 1"
            title="Make a Donation"
            description="The most direct way to get kids in the game. Submit your intended amount now and we will follow up while checkout is being finalized."
          />
        </Container>
      </section>
      <ImpactChooser showHeader={false} />

      <section id="fundraise" className="paper-pattern bg-field py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div data-reveal="fade-left">
            <SectionHeader
              eyebrow="Option 2"
              title="Start a Fundraiser"
              align="left"
              description="Rally your friends, family, or community to fund gear kits. Perfect for birthdays, holidays, or team events."
            />
            <div className="mt-8 space-y-5">
              {fundraiserSteps.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <IconBadge icon={item.icon} tone="green" />
                  <div>
                    <h3 className="font-black text-navy">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-ink/60">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <FundraiserForm />
        </Container>
      </section>

      <section id="partner" className="bg-white py-20 md:py-28">
        <Container>
          <SectionHeader
            eyebrow="Option 3"
            title="Become a Partner"
            description="Schools, businesses, and community organizations can make a lasting impact through partnership."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {partnerTypes.map((item, index) => (
              <article
                key={item.title}
                data-reveal="zoom"
                style={{ "--reveal-delay": `${index * 100}ms` } as CSSProperties}
                className="brand-card cut-corner bg-field p-6 text-center"
              >
                <IconBadge icon={item.icon} tone="green" className="mx-auto" />
                <h3 className="mt-5 text-lg font-black text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/60">{item.description}</p>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <PartnerForm />
          </div>
        </Container>
      </section>

      <CtaBand headline="Every action counts. Get involved today." />
    </>
  );
}

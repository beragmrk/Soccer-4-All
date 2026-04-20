import type { Metadata } from "next";
import {
  ContactPreview,
  CtaBand,
  FundingSection,
  HomeHero,
  HomeStorySection,
  ImpactChooser,
  MoneyBreakdownSection,
  StatGrid
} from "@/components/brand";
import { MiniContactForm } from "@/components/forms";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Soccer-4-All | Gear That Gets Kids in the Game",
  description: site.description,
  alternates: {
    canonical: "/"
  }
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <StatGrid />
      <FundingSection />
      <HomeStorySection />
      <ImpactChooser />
      <MoneyBreakdownSection />
      <CtaBand />
      <ContactPreview>
        <MiniContactForm />
      </ContactPreview>
    </>
  );
}

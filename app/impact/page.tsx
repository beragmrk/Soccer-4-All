import type { Metadata } from "next";
import { CtaBand, PageHero, StatGrid, Testimonials, TimelineSection } from "@/components/brand";
import { images, pageMetadata } from "@/data/site";

export const metadata: Metadata = {
  title: "Impact",
  description: pageMetadata.impact,
  alternates: {
    canonical: "/impact"
  }
};

export default function ImpactPage() {
  return (
    <>
      <PageHero
        title="Our"
        accent="Impact"
        description="Every donation creates ripples of change. See how your support is getting kids in the game."
        image={images.impactHero}
        imageAlt="Soccer impact"
      />
      <StatGrid />
      <Testimonials />
      <TimelineSection />
      <CtaBand headline="Sponsor the next kit" buttonText="Donate Now" variant="gold" />
    </>
  );
}

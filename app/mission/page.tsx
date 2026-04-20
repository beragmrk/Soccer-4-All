import type { Metadata } from "next";
import {
  CtaBand,
  MissionPillars,
  PageHero,
  ProblemSection,
  ProcessTimeline,
  SolutionSection
} from "@/components/brand";
import { images, pageMetadata } from "@/data/site";

export const metadata: Metadata = {
  title: "Mission",
  description: pageMetadata.mission,
  alternates: {
    canonical: "/mission"
  }
};

export default function MissionPage() {
  return (
    <>
      <PageHero
        title="Our"
        accent="Mission"
        description="Ensuring every child has the gear they need to play soccer because the game should be for everyone."
        image={images.missionHero}
        imageAlt="Soccer field"
      />
      <MissionPillars />
      <ProblemSection />
      <SolutionSection />
      <ProcessTimeline />
      <CtaBand headline="Ready to get kids in the game?" />
    </>
  );
}

import type { Metadata } from "next";
import { Container, PageHero } from "@/components/brand";
import { DonateForm } from "@/components/forms";
import { images, pageMetadata } from "@/data/site";

export const metadata: Metadata = {
  title: "Donate",
  description: pageMetadata.donate,
  alternates: {
    canonical: "/donate"
  }
};

type DonatePageProps = {
  searchParams: Promise<{
    amount?: string | string[];
  }>;
};

export default async function DonatePage({ searchParams }: DonatePageProps) {
  const params = await searchParams;
  const amount = Array.isArray(params.amount) ? params.amount[0] : params.amount;

  return (
    <>
      <PageHero
        title="Make a"
        accent="Difference"
        description="Choose an amount and submit your donation intent. We will follow up while secure online checkout is being finalized."
        image={images.donateHero}
        imageAlt="Children playing soccer"
      />
      <section className="paper-pattern bg-field py-16 md:py-20">
        <Container>
          <DonateForm initialAmount={amount} />
        </Container>
      </section>
    </>
  );
}

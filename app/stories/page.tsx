import type { Metadata } from "next";
import { ButtonLink, Container, CtaBand, FeaturedStory, PageHero } from "@/components/brand";
import { images, pageMetadata } from "@/data/site";

export const metadata: Metadata = {
  title: "Stories",
  description: pageMetadata.stories,
  alternates: {
    canonical: "/stories"
  }
};

export default function StoriesPage() {
  return (
    <>
      <PageHero
        title="Stories of"
        accent="Impact"
        description="Real kids. Real change. Every donation has a story behind it."
        image={images.storiesHero}
        imageAlt="Soccer stories"
      />
      <FeaturedStory />
      <section className="bg-white pb-20 md:pb-28">
        <Container className="text-center" data-reveal="zoom">
          <h2 className="display-title text-3xl text-navy md:text-5xl">Have a Story to Share?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink/60">
            Whether you are a donor, recipient, coach, or community partner, we would love to hear from you.
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact" variant="secondary">
              Contact Us
            </ButtonLink>
          </div>
        </Container>
      </section>
      <CtaBand headline="Be part of the next story" />
    </>
  );
}

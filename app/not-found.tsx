import Link from "next/link";
import { Container } from "@/components/brand";

export default function NotFound() {
  return (
    <section className="paper-pattern bg-field py-24 md:py-32">
      <Container className="max-w-2xl text-center">
        <p className="display-title text-7xl text-primary">404</p>
        <h1 className="mt-4 text-3xl font-black text-navy">Page Not Found</h1>
        <p className="mt-4 leading-7 text-ink/60">
          The page you are looking for is not available. Head back home to keep exploring Soccer-4-All.
        </p>
        <Link
          href="/"
          className="focus-ring mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-black uppercase tracking-[0.08em] text-white"
        >
          Go Home
        </Link>
      </Container>
    </section>
  );
}

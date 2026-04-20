import { Instagram, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { images, navItems, site } from "@/data/site";
import { ButtonLink, Container } from "@/components/brand";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container className="py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2" data-reveal="fade-left">
            <Image src={images.logo} alt="Soccer-4-All" width={184} height={66} className="h-16 w-auto brightness-0 invert" />
            <p className="mt-5 max-w-md text-sm leading-7 text-white/60">
              We raise donations to provide soccer equipment to underserved children so every kid has the chance to play.
            </p>
            <div className="mt-6">
              <ButtonLink href="/donate">Donate Now</ButtonLink>
            </div>
          </div>

          <div data-reveal="zoom">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Quick Links</h2>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="focus-ring text-sm text-white/60 transition hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal="fade-right">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Connect</h2>
            <div className="mt-5 space-y-3">
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex items-center gap-2 text-sm text-white/60 transition hover:text-accent"
              >
                <Instagram aria-hidden className="h-4 w-4" />
                {site.instagramHandle}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="focus-ring flex items-center gap-2 text-sm text-white/60 transition hover:text-accent"
              >
                <Mail aria-hidden className="h-4 w-4" />
                {site.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-7 text-center">
          <p className="text-sm font-semibold text-white/70">{site.nonprofitStatus}</p>
          <p className="mt-2 text-sm text-white/40">&copy; {new Date().getFullYear()} Soccer-4-All. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

"use client";

import clsx from "clsx";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { images, navItems } from "@/data/site";
import { ButtonLink, Container } from "@/components/brand";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-primary/10 bg-white/95 backdrop-blur-xl">
      <Container>
        <nav className="flex min-h-20 items-center justify-between gap-6">
          <Link href="/" className="focus-ring flex items-center" onClick={() => setOpen(false)}>
            <Image src={images.logo} alt="Soccer-4-All" width={178} height={64} priority className="h-14 w-auto" />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "focus-ring relative text-sm font-bold text-ink/70 transition hover:text-primary after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100",
                    active && "text-primary after:scale-x-100"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <ButtonLink href="/donate" className="min-h-11 px-5 py-2">
              Donate
            </ButtonLink>
          </div>

          <button
            type="button"
            aria-label="Open navigation"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 text-primary lg:hidden"
          >
            {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
          </button>
        </nav>
      </Container>

      <div className={clsx("overflow-hidden border-t border-primary/10 bg-white transition-[max-height,opacity] duration-300 lg:hidden", open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0")}>
        <Container className="py-5">
          <div className="grid gap-2">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "focus-ring flex min-h-11 items-center justify-between border border-transparent px-3 text-base font-bold",
                    active ? "border-primary/20 bg-field text-primary" : "text-navy"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <ButtonLink href="/donate" className="mt-2 w-full" variant="secondary">
              Donate
            </ButtonLink>
          </div>
        </Container>
      </div>
    </header>
  );
}

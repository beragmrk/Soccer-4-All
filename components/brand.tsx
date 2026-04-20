import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2, Instagram, Mail, MapPin, PackageCheck, Quote, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import AnimatedNumber from "@/components/animated-number";
import {
  donationChoices,
  featuredStory,
  fundingCategories,
  images,
  moneyBreakdown,
  missionPillars,
  processSteps,
  site,
  stats,
  testimonials,
  timeline,
  transparencyCards,
  trustPoints
} from "@/data/site";

type ContainerProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

type ButtonVariant = "primary" | "secondary" | "outline" | "light";

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-navy shadow-[0_16px_34px_rgba(244,166,58,0.28)] hover:bg-[#e89526]",
  secondary: "bg-primary text-white hover:bg-primary-dark",
  outline:
    "border border-primary text-primary hover:bg-primary hover:text-white bg-transparent",
  light: "bg-white text-primary hover:bg-white/90"
};

function delayStyle(ms: number): CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as CSSProperties;
}

function wordStyle(index: number): CSSProperties {
  return { "--word-index": index } as CSSProperties;
}

function splitMetricValue(value: string) {
  const prefix = value.startsWith("$") ? "$" : "";
  const suffix = value.endsWith("+") ? "+" : "";
  const digits = Number.parseInt(value.replace(/[^\d]/g, ""), 10);

  return {
    prefix,
    suffix,
    number: Number.isNaN(digits) ? 0 : digits
  };
}

function AnimatedWords({ text, start = 0 }: { text: string; start?: number }) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="hero-word-wrap">
          <span className="hero-word" style={wordStyle(start + index)}>
            {word}
          </span>
          {index < words.length - 1 ? <span className="hero-space" aria-hidden /> : null}
        </span>
      ))}
    </>
  );
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div {...props} className={clsx("mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "focus-ring shine-link inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-black uppercase tracking-[0.08em] transition duration-300 hover:-translate-y-0.5",
        buttonStyles[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  invert = false
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div data-reveal={align === "left" ? "fade-left" : "zoom"} className={clsx("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p className={clsx("mb-3 text-xs font-black uppercase tracking-[0.2em]", invert ? "text-accent" : "text-primary")}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={clsx("display-title text-3xl leading-tight md:text-5xl", invert ? "text-white" : "text-navy")}>
        {title}
      </h2>
      {description ? (
        <p className={clsx("mt-5 text-base leading-7 md:text-lg", invert ? "text-white/75" : "text-ink/70")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function IconBadge({
  icon: Icon,
  tone = "green",
  className
}: {
  icon: LucideIcon;
  tone?: "green" | "gold" | "navy" | "light";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
        tone === "green" && "bg-primary text-white",
        tone === "gold" && "bg-accent text-navy",
        tone === "navy" && "bg-navy text-white",
        tone === "light" && "bg-primary/10 text-primary",
        className
      )}
    >
      <Icon aria-hidden className="h-6 w-6" strokeWidth={1.8} />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  image,
  imageAlt
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  description: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-primary py-28 text-white md:py-36">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="absolute inset-0 -z-20 object-cover opacity-25 saturate-[0.8]"
        sizes="100vw"
      />
      <div className="field-pattern absolute inset-0 -z-10 opacity-50" />
      <div className="pitch-lines opacity-70" aria-hidden />
      <Container className="relative z-10 text-center">
        {eyebrow ? <p className="hero-after mb-4 text-xs font-black uppercase tracking-[0.24em] text-accent">{eyebrow}</p> : null}
        <h1
          className="display-title mx-auto max-w-5xl text-4xl leading-[1.02] sm:text-5xl md:text-6xl"
          aria-label={`${title}${accent ? ` ${accent}` : ""}`}
        >
          <span className="hero-line">
            <AnimatedWords text={title} />
          </span>
          {accent ? (
            <span className="hero-line text-accent">
              <AnimatedWords text={accent} start={title.split(" ").length} />
            </span>
          ) : null}
        </h1>
        <p className="hero-after mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">{description}</p>
      </Container>
    </section>
  );
}

export function HomeHero() {
  return (
    <section className="relative isolate flex min-h-[720px] items-center overflow-hidden bg-primary text-white">
      <Image
        src={images.homeHero}
        alt="Kids playing soccer"
        fill
        priority
        className="absolute inset-0 -z-20 object-cover opacity-30 saturate-[0.85]"
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-10 bg-primary/75" />
      <div className="pitch-lines opacity-75" aria-hidden />
      <Container className="relative z-10 pb-16 pt-32 text-center">
        <div className="hero-after mx-auto mb-8 inline-flex items-center gap-3 border border-white/25 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-accent" />
          Nonprofit soccer gear access
        </div>
        <h1 className="display-title mx-auto max-w-6xl text-4xl leading-[1.02] sm:text-5xl md:text-6xl lg:text-7xl" aria-label="Gear that gets kids in the game">
          <span className="hero-line">
            <AnimatedWords text="Gear that gets" />
          </span>
          <span className="hero-line text-accent">
            <AnimatedWords text="kids in the game" start={3} />
          </span>
        </h1>
        <p className="hero-after mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
          We raise donations to provide soccer equipment to underserved children so every kid has the chance to play.
        </p>
        <div className="hero-after mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink href="/donate" className="px-9 py-4">
            Donate Now <ArrowRight aria-hidden className="h-5 w-5" />
          </ButtonLink>
          <ButtonLink href="/impact" variant="light" className="px-9 py-4">
            See Our Impact
          </ButtonLink>
        </div>
        <div className="hero-after mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-4 text-sm text-white/75">
          {trustPoints.map((item, index) => (
            <div key={item.label} className={clsx("inline-flex items-center gap-2 border border-white/20 bg-white/10 px-4 py-2", index % 2 === 0 ? "motion-float" : "motion-float-slow")}>
              <item.icon aria-hidden className="h-4 w-4 text-accent" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function StatGrid({ dark = false }: { dark?: boolean }) {
  return (
    <section className={clsx("py-16 md:py-20", dark ? "bg-primary text-white" : "bg-white")}>
      <Container>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              data-reveal="metric"
              style={delayStyle(index * 90)}
              className={clsx(
                "brand-card cut-corner p-5 text-center",
                dark ? "border-white/10 bg-white/10 shadow-none" : "bg-field"
              )}
            >
              <IconBadge icon={stat.icon} tone={stat.tone === "gold" ? "gold" : "green"} className="mx-auto mb-4" />
              {(() => {
                const metric = splitMetricValue(stat.value);

                return (
                  <p className={clsx("display-title text-3xl md:text-4xl", dark ? "text-white" : "text-primary")}>
                    <AnimatedNumber value={metric.number} prefix={metric.prefix} suffix={metric.suffix} durationMs={1280} />
                  </p>
                );
              })()}
              <p className={clsx("mt-2 text-sm", dark ? "text-white/70" : "text-ink/60")}>{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FundingSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <SectionHeader eyebrow="Where Your Money Goes" title="What Your Donation Funds" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {fundingCategories.map((item, index) => (
            <article key={item.title} data-reveal="zoom" style={delayStyle(index * 110)} className="brand-card cut-corner overflow-hidden bg-white">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  style={{ objectPosition: item.imagePosition }}
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
              <div className="p-6">
                <div className="mb-5 flex items-center gap-4">
                  <IconBadge icon={item.icon} tone="green" className="shadow-brand" />
                  <h3 className="text-xl font-black text-navy">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-ink/60">{item.description}</p>
                <Link href="/donate" className="focus-ring mt-5 inline-flex items-center gap-1 text-sm font-black text-primary transition hover:translate-x-1">
                  Donate <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function HomeStorySection() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 text-white md:py-28">
      <div className="field-pattern absolute inset-0 opacity-30" aria-hidden />
      <Container className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative" data-reveal="fade-left">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg motion-float-slow">
            <Image src={images.homeStory} alt="Kids receiving soccer gear" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div className="brand-card absolute -bottom-6 right-4 max-w-[290px] bg-white p-5 motion-drift">
            <Quote aria-hidden className="mb-3 h-8 w-8 text-accent" />
            <p className="text-sm font-semibold leading-6 text-navy">
              "Every child deserves the chance to kick a ball, wear the uniform, and feel like they belong on the field."
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-ink/50">Founding Team</p>
          </div>
        </div>
        <div data-reveal="fade-right">
          <SectionHeader eyebrow="Our Story" title="Soccer Changed Our Lives. Now We Pay It Forward." align="left" invert />
          <div className="mt-7 space-y-4 text-white/75">
            <p>
              Soccer-4-All was born from a simple belief: cost should never stop a child from playing the beautiful game.
              We have seen firsthand how soccer builds confidence, teaches teamwork, and creates belonging.
            </p>
            <p>
              But too many kids are left on the sidelines, not because they lack talent or passion, but because they cannot
              afford cleats or a uniform. That is where we come in.
            </p>
            <p>
              Through your donations, we purchase quality gear and deliver it to communities where it is needed most. No
              child should have to watch from the sidelines.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ImpactChooser({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        {showHeader ? (
          <SectionHeader
            title="Choose Your Impact"
            description="Every dollar goes directly toward getting kids the gear they need to play."
          />
        ) : null}
        <div className={clsx("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", showHeader && "mt-12")}>
          {donationChoices.map((choice, index) => (
            <article
              key={choice.amount}
              data-reveal="zoom"
              style={delayStyle(index * 80)}
              className="brand-card cut-corner flex h-full flex-col bg-field p-6"
            >
              <IconBadge icon={choice.icon} tone="green" />
              <p className="display-title mt-6 text-4xl text-primary">${choice.amount}</p>
              <h3 className="mt-2 text-lg font-black text-navy">{choice.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-ink/60">{choice.description}</p>
              <ButtonLink href={`/donate?amount=${choice.amount}`} variant="outline" className="mt-6 w-full px-4">
                Donate ${choice.amount}
              </ButtonLink>
            </article>
          ))}
        </div>
        {showHeader ? (
          <div className="mt-10 text-center">
            <ButtonLink href="/donate" variant="primary">
              Give a Custom Amount
            </ButtonLink>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

export function MoneyBreakdownSection() {
  return (
    <section className="paper-pattern bg-field py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div data-reveal="fade-left">
          <SectionHeader
            eyebrow="Full Transparency"
            title="Where Your Money Goes"
            align="left"
            description="We believe in complete transparency. Every dollar you donate goes directly toward our mission: purchasing gear, shipping it to communities, and partnering with local organizations to distribute it."
          />
          <div className="mt-8 space-y-6">
            {moneyBreakdown.map((item, index) => (
              <div key={item.label} data-reveal="metric" style={delayStyle(index * 110)}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <IconBadge icon={item.icon} tone="green" />
                    <span className="font-black text-navy">{item.label}</span>
                  </div>
                  <span className="display-title text-2xl text-primary">
                    <AnimatedNumber value={item.percentage} suffix="%" durationMs={980} />
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-primary/10">
                  <div data-meter className="h-full origin-left rounded-full bg-primary" style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {transparencyCards.map((item, index) => (
            <article key={item.title} data-reveal="zoom" style={delayStyle(index * 90)} className="brand-card bg-white p-6">
              <IconBadge icon={item.icon} tone="gold" />
              <h3 className="mt-5 font-black text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/60">{item.description}</p>
            </article>
          ))}
          <article data-reveal="zoom" style={delayStyle(220)} className="brand-card bg-primary p-6 text-white sm:col-span-2">
            <div className="flex items-center gap-5">
              <div className="display-title flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/20 text-3xl text-white">
                100%
              </div>
              <div>
                <h3 className="text-lg font-black">Mission-Focused</h3>
                <p className="mt-1 text-sm text-white/70">Every donation directly supports our mission.</p>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="bg-field py-16 md:py-24">
      <Container>
        <SectionHeader title="Voices of Impact" />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <article key={item.author} data-reveal="zoom" style={delayStyle(index * 110)} className="brand-card cut-corner bg-white p-6">
              <Quote aria-hidden className="h-10 w-10 text-accent" strokeWidth={1.5} />
              <p className="mt-5 text-lg font-semibold leading-8 text-navy">"{item.quote}"</p>
              <div className="mt-8 flex items-center gap-4">
                <Image src={item.image} alt={item.author} width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <p className="font-black text-navy">{item.author}</p>
                  <p className="text-sm text-ink/60">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function TimelineSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container className="max-w-5xl">
        <SectionHeader eyebrow="Our Journey" title="Impact Timeline" />
        <div className="relative mt-14">
          <div className="absolute left-4 top-0 h-full w-px bg-primary/20 md:left-1/2" aria-hidden />
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <article
                key={item.year}
                data-reveal={index % 2 === 0 ? "fade-left" : "fade-right"}
                style={delayStyle(index * 90)}
                className="relative grid gap-5 pl-12 md:grid-cols-2 md:pl-0"
              >
                <div className="absolute left-0 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-navy md:left-1/2 md:-translate-x-1/2">
                  <CheckCircle2 aria-hidden className="h-4 w-4" />
                </div>
                <div
                  className={clsx(
                    "brand-card cut-corner bg-field p-6",
                    index % 2 === 0 ? "md:mr-10 md:text-right" : "md:col-start-2 md:ml-10"
                  )}
                >
                  <p className="display-title text-3xl text-primary">{item.year}</p>
                  <h3 className="mt-2 text-lg font-black text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/60">{item.description}</p>
                  <p className="mt-4 inline-flex items-center gap-2 bg-primary px-3 py-1 text-sm font-bold text-white">
                    <span>{item.kits}</span>
                    <span className="font-medium opacity-75">kits delivered</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function CtaBand({
  headline = "Help fund the next shipment of gear.",
  buttonText = "Donate Now",
  variant = "green"
}: {
  headline?: string;
  buttonText?: string;
  variant?: "green" | "gold";
}) {
  return (
    <section className={clsx("relative overflow-hidden py-16 md:py-20", variant === "green" ? "bg-primary" : "bg-accent")}>
      <div className="pitch-lines opacity-30" aria-hidden />
      <Container className="relative text-center">
        <h2 data-reveal="zoom" className={clsx("display-title mx-auto max-w-4xl text-3xl leading-tight md:text-5xl", variant === "green" ? "text-white" : "text-navy")}>
          {headline}
        </h2>
        <div className="mt-8" data-reveal="zoom" style={delayStyle(120)}>
          <ButtonLink href="/donate" variant={variant === "green" ? "primary" : "light"} className="px-9 py-4">
            {buttonText} <ArrowRight aria-hidden className="h-5 w-5" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

export function MissionPillars() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <SectionHeader eyebrow="The Beautiful Game" title="Why Soccer Matters" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {missionPillars.map((item, index) => (
            <article key={item.title} data-reveal="zoom" style={delayStyle(index * 110)} className="brand-card cut-corner bg-field p-7 text-center">
              <IconBadge icon={item.icon} tone="green" className="mx-auto" />
              <h3 className="mt-5 text-2xl font-black text-navy">{item.title}</h3>
              <p className="mt-3 leading-7 text-ink/60">{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ProblemSection() {
  return (
    <section className="paper-pattern bg-field py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative" data-reveal="fade-left">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg motion-float-slow">
            <Image src={images.problem} alt="Child watching soccer" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div className="absolute -bottom-6 right-4 bg-accent p-5 text-navy shadow-lift motion-drift">
            <p className="display-title text-4xl">1 in 5</p>
            <p className="text-sm font-bold">children cannot afford basic gear</p>
          </div>
        </div>
        <div data-reveal="fade-right">
          <SectionHeader eyebrow="The Challenge" title="The Problem We Solve" align="left" />
          <div className="mt-7 space-y-4 text-lg leading-8 text-ink/70">
            <p>
              Soccer is the world's most accessible sport, but not for everyone. Millions of children are excluded simply
              because their families cannot afford cleats, a uniform, or even a ball.
            </p>
            <p>
              When kids cannot participate, they miss out on more than a game. They miss the friendships, the lessons, and
              the sense of belonging that soccer provides.
            </p>
            <p className="font-black text-navy">We believe no child should watch from the sidelines because of cost.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function SolutionSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="Our Approach"
          title="The Solution"
          description="Your donations fund quality soccer gear that we purchase in bulk and deliver through trusted community partners."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article data-reveal="fade-left" className="brand-card cut-corner overflow-hidden bg-primary text-white">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={images.solutionGear}
                alt="Soccer cleats on a field"
                fill
                className="object-cover opacity-85"
                style={{ objectPosition: "center 50%" }}
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-primary/20" aria-hidden />
            </div>
            <div className="p-8">
              <IconBadge icon={PackageCheck} tone="gold" />
              <h3 className="mt-6 text-2xl font-black">Quality Gear</h3>
              <p className="mt-4 leading-7 text-white/75">
                We do not cut corners. Every kit includes proper cleats, a durable uniform, shin guards, and quality socks:
                everything a young player needs.
              </p>
            </div>
          </article>
          <article data-reveal="fade-right" style={delayStyle(120)} className="brand-card cut-corner overflow-hidden bg-field">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={images.solutionDelivery}
                alt="Soccer gear delivered to community partners"
                fill
                className="object-cover"
                style={{ objectPosition: "center 56%" }}
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="p-8">
              <IconBadge icon={Users} tone="green" />
              <h3 className="mt-6 text-2xl font-black text-navy">Trusted Delivery</h3>
              <p className="mt-4 leading-7 text-ink/60">
                We partner with schools, youth programs, and community organizations who know their communities and ensure gear
                reaches the kids who need it most.
              </p>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}

export function ProcessTimeline() {
  return (
    <section className="bg-field py-20 md:py-28">
      <Container className="max-w-5xl">
        <SectionHeader eyebrow="Step by Step" title="How It Works" />
        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {processSteps.map((item, index) => (
            <article key={item.step} data-reveal="zoom" style={delayStyle(index * 80)} className="brand-card cut-corner bg-white p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="display-title text-3xl text-primary">0{item.step}</span>
                <IconBadge icon={item.icon} tone="gold" className="h-10 w-10" />
              </div>
              <h3 className="font-black text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/60">{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FeaturedStory() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative" data-reveal="fade-left">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg motion-float-slow">
            <Image src={featuredStory.image} alt={featuredStory.name} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div className="absolute -bottom-5 right-4 bg-accent px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-navy motion-drift">
            Featured Story
          </div>
        </div>
        <div data-reveal="fade-right">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-primary">
            <MapPin aria-hidden className="h-4 w-4" />
            {featuredStory.location}
          </p>
          <h2 className="display-title text-4xl leading-tight text-navy md:text-5xl">{featuredStory.name}</h2>
          <Quote aria-hidden className="mt-6 h-10 w-10 text-primary/25" />
          <p className="mt-4 text-2xl font-semibold leading-9 text-navy">"{featuredStory.quote}"</p>
          <p className="mt-6 leading-8 text-ink/70">{featuredStory.story}</p>
        </div>
      </Container>
    </section>
  );
}

export function ContactPreview({ children }: { children?: ReactNode }) {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div data-reveal="fade-left">
          <SectionHeader
            eyebrow="Get in Touch"
            title="Let's Connect"
            align="left"
            description="Have questions about our mission, want to partner with us, or just want to say hello? We would love to hear from you."
          />
          <div className="mt-8 space-y-4">
            <a href={`mailto:${site.email}`} className="focus-ring flex items-center gap-4">
              <IconBadge icon={Mail} tone="light" />
              <span>
                <span className="block text-sm text-ink/60">Email us</span>
                <span className="font-black text-navy">{site.email}</span>
              </span>
            </a>
            <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="focus-ring flex items-center gap-4">
              <IconBadge icon={Instagram} tone="light" />
              <span>
                <span className="block text-sm text-ink/60">Follow us</span>
                <span className="font-black text-navy">{site.instagramHandle}</span>
              </span>
            </a>
          </div>
        </div>
        {children ? <div data-reveal="fade-right">{children}</div> : null}
      </Container>
    </section>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type AnimatedNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
};

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export default function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  durationMs = 1200,
  className
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const finalLabel = useMemo(() => `${prefix}${formatNumber(value)}${suffix}`, [prefix, suffix, value]);

  useEffect(() => {
    const element = ref.current;

    if (!element || hasAnimated) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasAnimated) {
            return;
          }

          setHasAnimated(true);
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            const eased = easeOutCubic(progress);
            setDisplayValue(Math.round(value * eased));

            if (progress < 1) {
              frameRef.current = window.requestAnimationFrame(tick);
            }
          };

          setDisplayValue(0);
          frameRef.current = window.requestAnimationFrame(tick);
          observer.disconnect();
        });
      },
      {
        threshold: 0.4,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [durationMs, hasAnimated, value]);

  return (
    <span ref={ref} className={className} aria-label={finalLabel}>
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </span>
  );
}

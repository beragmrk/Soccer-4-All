"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";

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
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const startedRef = useRef(false);
  const [displayValue, setDisplayValue] = useState(value);

  const finalLabel = useMemo(() => `${prefix}${formatNumber(value)}${suffix}`, [prefix, suffix, value]);

  useLayoutEffect(() => {
    const element = ref.current;

    if (!element || startedRef.current) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const finishAtValue = () => {
      setDisplayValue(value);
    };

    const startAnimation = () => {
      if (startedRef.current) {
        return;
      }

      startedRef.current = true;
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      observerRef.current?.disconnect();

      const startTime = performance.now();
      setDisplayValue(0);

      const tick = (now: number) => {
        const elapsed = Math.max(0, now - startTime);
        const progress = Math.min(elapsed / durationMs, 1);
        const eased = easeOutCubic(progress);
        const nextValue = Math.round(Math.max(0, value * eased));
        setDisplayValue(nextValue);

        if (progress < 1) {
          frameRef.current = window.requestAnimationFrame(tick);
        } else {
          finishAtValue();
        }
      };

      frameRef.current = window.requestAnimationFrame(tick);
    };

    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const visibleNow = rect.top < viewportHeight * 0.92 && rect.bottom > viewportHeight * 0.08;

    if (visibleNow) {
      startAnimation();
      return () => {
        if (frameRef.current) {
          window.cancelAnimationFrame(frameRef.current);
        }
      };
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          startAnimation();
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    observerRef.current.observe(element);
    timeoutRef.current = window.setTimeout(finishAtValue, 2500);

    return () => {
      observerRef.current?.disconnect();
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [durationMs, value]);

  return (
    <span ref={ref} className={className} aria-label={finalLabel}>
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </span>
  );
}

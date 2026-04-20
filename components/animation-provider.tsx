"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function AnimationProvider() {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js-motion");

    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12
      }
    );

    revealItems.forEach((item) => observer.observe(item));

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, scrollTop / max) : 0);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden />;
}

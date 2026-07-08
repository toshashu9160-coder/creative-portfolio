// app/components/LenisProvider.tsx
"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      syncTouch: true,
    });

    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    // Start in stopped state if loader is active
    const hasLoader = document.querySelector(".loader-screen") !== null;
    if (hasLoader) {
      lenis.stop();
    }

    // Connect Lenis to ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Run Lenis tick in GSAP ticker for perfect sync
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      if ((window as any).lenis === lenis) {
        (window as any).lenis = undefined;
      }
    };
  }, []);

  // Reset scroll and recalculate dimensions on route changes
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    // Reset scroll to top instantly on page change
    lenis.scrollTo(0, { immediate: true });

    // Wait a short tick for the new page DOM to mount, then resize Lenis
    const timer = setTimeout(() => {
      lenis.resize();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}

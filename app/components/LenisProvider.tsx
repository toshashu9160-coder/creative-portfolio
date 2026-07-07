// app/components/LenisProvider.tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      // Lenis does not provide explicit destroy, but we can cancel the frame loop if needed
    };
  }, []);

  return <>{children}</>;
}

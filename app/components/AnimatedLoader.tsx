"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const HELLO_WORDS = [
  { word: "Hello", lang: "English" },
  { word: "नमस्ते", lang: "Hindi" },
  { word: "Hola", lang: "Spanish" },
  { word: "Bonjour", lang: "French" },
  { word: "こんにちは", lang: "Japanese" },
  { word: "안녕하세요", lang: "Korean" },
  { word: "مرحبا", lang: "Arabic" },
  { word: "你好", lang: "Chinese" },
  { word: "Hallo", lang: "German" },
  { word: "Olá", lang: "Portuguese" },
  { word: "Ciao", lang: "Italian" },
];

export default function AnimatedLoader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const screenRef = useRef<HTMLDivElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const langLabelRef = useRef<HTMLDivElement>(null);

  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // Sync words with active index change
  useEffect(() => {
    const wordsContainer = wordsContainerRef.current;
    if (!wordsContainer) return;

    const wordEls = wordsContainer.querySelectorAll(".loader-hello-word");
    wordEls.forEach((el, idx) => {
      const chars = el.querySelectorAll(".char");
      if (idx === wordIndex) {
        gsap.killTweensOf([el, chars]);
        gsap.set(el, { opacity: 1 });
        gsap.fromTo(
          chars,
          { y: "110%", opacity: 0, rotateX: -60 },
          {
            y: "0%",
            opacity: 1,
            rotateX: 0,
            duration: 0.35,
            stagger: 0.025,
            ease: "power2.out",
          }
        );
      } else {
        gsap.killTweensOf(el);
        gsap.set(el, { opacity: 0 });
      }
    });

    if (langLabelRef.current) {
      langLabelRef.current.textContent = HELLO_WORDS[wordIndex].lang;
      gsap.fromTo(
        langLabelRef.current,
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [wordIndex]);

  useEffect(() => {
    const screen = screenRef.current;
    const line = lineRef.current;
    if (!screen || !line) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(screen, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete,
        });
      },
    });

    const duration = 9.9; // Slower animation loader (0.9s per word)

    // Animate words smoothly and linearly (linked to main timeline)
    const wordTracker = { val: 0 };
    tl.to(
      wordTracker,
      {
        val: HELLO_WORDS.length,
        duration,
        ease: "none",
        onUpdate: () => {
          setWordIndex(Math.min(Math.floor(wordTracker.val), HELLO_WORDS.length - 1));
        },
      },
      0
    );

    // Animate counter from 000 to 100 (unlinked, runs faster: 3.0s)
    const counterObj = { val: 0 };
    tl.to(
      counterObj,
      {
        val: 100,
        duration: 3.0,
        ease: "power1.inOut",
        onUpdate: () => {
          setCount(Math.round(counterObj.val));
        },
      },
      0
    );

    // Animate line progress (unlinked, matches counter: 3.0s)
    tl.to(
      line,
      {
        width: "100%",
        duration: 3.0,
        ease: "power1.inOut",
      },
      0
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  useEffect(() => {
    // Stop scrolling on mount
    const globalLenis = (window as any).lenis;
    if (globalLenis) {
      globalLenis.stop();
    }

    return () => {
      // Resume scrolling on unmount (after screen slides out and component is destroyed)
      if (globalLenis) {
        globalLenis.start();
        // Recalculate dimensions and dispatch window resize to align elements
        setTimeout(() => {
          globalLenis.resize();
          window.dispatchEvent(new Event("resize"));
        }, 100);
      }
    };
  }, []);

  return (
    <div ref={screenRef} className="loader-screen">
      <div ref={wordsContainerRef} className="loader-hello-container">
        {HELLO_WORDS.map((item, i) => (
          <div key={i} className="loader-hello-word" style={{ opacity: 0 }}>
            {item.word.split("").map((char, j) => (
              <span
                className="char"
                key={j}
                style={{ display: "inline-block", perspective: "500px" }}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div ref={langLabelRef} className="loader-lang-label" />

      <div ref={counterRef} className="loader-counter">
        {String(count).padStart(3, "0")}
      </div>

      <div ref={lineRef} className="loader-line" />
    </div>
  );
}

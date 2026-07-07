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
            duration: 0.28,
            stagger: 0.02,
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
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }
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

    const counter = { val: 0 };
    const duration = 7.0; // extremely slow and majestic loader

    // Animate counter and update counts & wordIndex in sync
    tl.to(
      counter,
      {
        val: 100,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          const currentVal = Math.round(counter.val);
          setCount(currentVal);

          const index = Math.min(
            Math.floor((counter.val / 100) * HELLO_WORDS.length),
            HELLO_WORDS.length - 1
          );
          setWordIndex(index);
        },
      },
      0
    );

    // Animate line progress
    tl.to(
      line,
      {
        width: "100%",
        duration,
        ease: "power2.out",
      },
      0
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

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

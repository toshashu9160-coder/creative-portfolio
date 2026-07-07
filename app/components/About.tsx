"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label fade-in
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Staggered word reveal
      const words = textRef.current?.querySelectorAll(".word-inner");
      if (words) {
        gsap.fromTo(
          words,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            stagger: 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const aboutText =
    "I'm a graphic designer and visual artist with a passion for crafting bold, memorable brand identities. I believe great design lives at the intersection of strategy, emotion, and precision — and I bring that philosophy to every project I touch.";

  const words = aboutText.split(" ");

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      id="about"
      style={{ maxWidth: "1100px", margin: "0 auto" }}
    >
      <span ref={labelRef} className="section-label">
        About
      </span>
      <p ref={textRef} className="about-text">
        {words.map((word, i) => (
          <span className="word" key={i}>
            <span className="word-inner">{word}</span>
          </span>
        ))}
      </p>
    </section>
  );
}

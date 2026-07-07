"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextPressure from "./TextPressure";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const nameBackRef = useRef<HTMLDivElement>(null);
  const nameFrontRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bgLayer = bgLayerRef.current;
    const imageContainer = imageContainerRef.current;
    const nameBack = nameBackRef.current;
    const nameFront = nameFrontRef.current;
    const subtitle = subtitleRef.current;
    const glow = glowRef.current;

    if (
      !section ||
      !bgLayer ||
      !imageContainer ||
      !nameBack ||
      !nameFront ||
      !subtitle ||
      !glow
    )
      return;

    const ctx = gsap.context(() => {
      // Entry animations
      const entryTl = gsap.timeline({ delay: 0.3 });

      // Image scales in
      entryTl.fromTo(
        imageContainer,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: "power3.out" }
      );

      // Background name fades in
      entryTl.fromTo(
        nameBack,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        0.4
      );

      // Front name slides up
      entryTl.fromTo(
        nameFront,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        0.6
      );

      // Subtitle fades in
      entryTl.fromTo(
        subtitle,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.9
      );

      // Scroll-driven parallax
      gsap.to(bgLayer, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(nameBack, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(imageContainer, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to([nameFront, subtitle], {
        yPercent: 40,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "60% top",
          scrub: 1,
        },
      });
    }, section);

    // Mouse-driven parallax — different speeds for different layers
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xNorm = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const yNorm = (e.clientY / innerHeight - 0.5) * 2;

      // Background text — slow, opposite direction
      gsap.to(nameBack, {
        x: xNorm * -15,
        y: yNorm * -10,
        duration: 1.2,
        ease: "power3.out",
        overwrite: "auto",
      });

      // Image — medium speed
      gsap.to(imageContainer, {
        x: xNorm * 12,
        y: yNorm * 8,
        duration: 1,
        ease: "power3.out",
        overwrite: "auto",
      });

      // Front text — faster, same direction as cursor
      gsap.to(nameFront, {
        x: xNorm * 20,
        y: yNorm * 10,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
      });

      gsap.to(subtitle, {
        x: xNorm * 25,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
      });

      // Glow follows cursor loosely
      gsap.to(glow, {
        x: e.clientX - innerWidth / 2,
        y: e.clientY - innerHeight / 2,
        duration: 1.5,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero-section" id="home">
      {/* Ambient glow that follows cursor */}
      <div ref={glowRef} className="hero-ambient-glow" />

      {/* Background depth layer — large outlined name */}
      <div ref={bgLayerRef} className="hero-depth-bg">
        <div ref={nameBackRef} className="hero-name-back">
          <TextPressure
            text="ASHUTOSH"
            fontFamily="Roboto Flex"
            fontUrl="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap"
            flex={true}
            alpha={false}
            stroke={true}
            width={true}
            weight={true}
            italic={false}
            textColor="transparent"
            strokeColor="rgba(255, 255, 255, 0.08)"
            minFontSize={48}
          />
        </div>
      </div>

      {/* Mid layer — the photo */}
      <div className="hero-depth-mid">
        <div
          ref={imageContainerRef}
          className="hero-image-container"
          data-cursor-hover
        >
          <img
            src="/hero-photo.jpg"
            alt="Ashutosh — Creative Designer"
            draggable={false}
          />
          <div className="hero-image-noise" />
        </div>
      </div>

      {/* Foreground layer — name + subtitle */}
      <h1 ref={nameFrontRef} className="hero-name-front">
        ASHUTOSH
      </h1>
      <p ref={subtitleRef} className="hero-subtitle">
        Creative Designer & Visual Artist
      </p>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}

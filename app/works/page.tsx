"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { works } from "./data";

gsap.registerPlugin(ScrollTrigger);

export default function WorksPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      // Cards stagger in
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.3 + i * 0.15,
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="grain-overlay" />
      <section className="works-page">
        <div ref={headerRef} style={{ maxWidth: "1400px", margin: "0 auto 3rem" }}>
          <Link
            href="/"
            data-cursor-hover
            style={{
              fontSize: "0.75rem",
              color: "var(--muted)",
              textDecoration: "none",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              display: "inline-block",
              marginBottom: "2rem",
              transition: "color 0.3s ease",
            }}
          >
            ← Back to Home
          </Link>
          <span className="section-label">All Works</span>
          <h1 className="section-title">Featured Projects</h1>
        </div>

        <div className="works-grid">
          {works.map((work, i) => (
            <Link
              key={work.slug}
              href={`/works/${work.slug}`}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="project-card-immersive"
              data-cursor-hover
              style={{ height: "400px" }}
            >
              <div className="project-card-bg">
                <img src={work.imageUrl} alt={work.title} draggable={false} />
              </div>
              <div className="project-card-gradient" />
              <div className="project-card-arrow">↗</div>
              <div className="project-card-content">
                <div className="project-card-tags">
                  {work.tags.map((tag) => (
                    <span key={tag} className="project-card-tag">
                      {tag}
                    </span>
                  ))}
                  <span className="project-card-tag">{work.year}</span>
                </div>
                <h3 className="project-card-title">{work.title}</h3>
                <p className="project-card-desc">{work.description}</p>
              </div>
              <div className="project-card-accent-line" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

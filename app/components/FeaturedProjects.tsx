"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fetchWorks, Work } from "../works/data";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProjectsProps {
  onProjectClick?: (work: Work) => void;
}

export default function FeaturedProjects({ onProjectClick }: FeaturedProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => {
    fetchWorks().then(setWorks);
  }, []);

  useEffect(() => {
    if (works.length === 0) return;

    const ctx = gsap.context(() => {
      // Parallax the image inside each card based on scroll
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const img = card.querySelector(".project-card-bg img");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [works]);

  return (
    <section
      ref={sectionRef}
      className="section-padding projects-section"
      id="works"
    >
      <span className="section-label">Featured Works</span>
      <h2 className="section-title">Selected Projects</h2>

      <div style={{ marginTop: "1rem" }}>
        {works.length > 0 && (
          <ScrollStack
          useWindowScroll={true}
          itemDistance={100}
          itemStackDistance={30}
          baseScale={0.86}
          itemScale={0.03}
          stackPosition="12%"
          scaleEndPosition="6%"
          rotationAmount={0}
          blurAmount={0}
        >
          {works.map((work, i) => (
            <ScrollStackItem key={work.slug}>
              <Link
                href={`/works/${work.slug}`}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="project-card-immersive"
                data-cursor-hover
                style={{ display: "block" }}
                onClick={(e) => {
                  if (onProjectClick) {
                    e.preventDefault();
                    onProjectClick(work);
                  }
                }}
              >
                {/* Background image */}
                <div className="project-card-bg">
                  <img src={work.imageUrl} alt={work.title} draggable={false} />
                </div>

                {/* Gradient overlay */}
                <div className="project-card-gradient" />

                {/* Arrow */}
                <div className="project-card-arrow">↗</div>

                {/* Content */}
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

                {/* Accent line on hover */}
                <div className="project-card-accent-line" />
              </Link>
            </ScrollStackItem>
          ))}
        </ScrollStack>
        )}
      </div>
    </section>
  );
}

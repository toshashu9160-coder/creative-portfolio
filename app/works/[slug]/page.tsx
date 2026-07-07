"use client";
import { useEffect, useRef, useState } from "react";
import { notFound } from "next/navigation";
import { use } from "react";
import Link from "next/link";
import gsap from "gsap";
import { fetchWorks, Work } from "../data";

export default function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [work, setWork] = useState<Work | null | undefined>(undefined);

  useEffect(() => {
    fetchWorks().then(all => {
      setWork(all.find(w => w.slug === slug) || null);
    });
  }, [slug]);

  if (work === undefined) return null; // Wait for data to load
  if (work === null) notFound();

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );
    });

    return () => ctx.revert();
  }, []);

  if (!work) {
    notFound();
    return null;
  }

  return (
    <>
      <div className="grain-overlay" />
      <section className="works-page">
        <div
          ref={contentRef}
          style={{ maxWidth: "1200px", margin: "0 auto" }}
        >
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
              fontWeight: 300,
            }}
          >
            ← Back to Home
          </Link>

          <div style={{ marginBottom: "2rem" }}>
            <div className="project-card-tags" style={{ marginBottom: "1rem" }}>
              {work.tags.map((tag) => (
                <span key={tag} className="project-card-tag">
                  {tag}
                </span>
              ))}
              <span className="project-card-tag">{work.year}</span>
            </div>
            <h1 className="section-title" style={{ marginBottom: "1rem" }}>
              {work.title}
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--muted-light)",
                lineHeight: 1.6,
                maxWidth: "700px",
                fontWeight: 300,
              }}
            >
              {work.description}
            </p>
          </div>

          <div className="work-detail-hero">
            <img
              src={work.imageUrl}
              alt={work.title}
              draggable={false}
            />
          </div>

          {/* Behance project embed or placeholder */}
          <div
            style={{
              padding: "3rem 0",
              borderTop: "1px solid var(--border)",
              marginTop: "2rem",
            }}
          >
            {work.embedUrl ? (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "900px",
                  margin: "0 auto",
                  aspectRatio: "16/10",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
                  background: "rgba(0, 0, 0, 0.2)",
                }}
              >
                <iframe
                  src={work.embedUrl}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                  allowFullScreen
                  loading="lazy"
                  allow="clipboard-write"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            ) : (
              <p
                style={{
                  fontSize: "1rem",
                  color: "var(--muted)",
                  lineHeight: 1.7,
                  maxWidth: "700px",
                  fontWeight: 300,
                }}
              >
                More details about this project coming soon. This page will be
                expanded with process documentation, design breakdowns, and
                additional imagery.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/ashut_osh2218/" },
    { name: "Behance", href: "https://www.behance.net/ashutoshshah5" },
  ];

  return (
    <footer className="footer-section" id="contact">
      {/* Big CTA */}
      <div className="section-padding" style={{ paddingBottom: "3rem" }}>
        <p className="footer-cta-text">
          Let&apos;s create something <span>extraordinary</span> together.
        </p>

        {/* Email CTA */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <a
            href="mailto:hello@ashutosh.design"
            data-cursor-hover
            style={{
              fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
              color: "var(--primary)",
              textDecoration: "none",
              letterSpacing: "0.15em",
              fontWeight: 300,
              borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
              paddingBottom: "0.35rem",
              transition: "border-color 0.3s ease",
            }}
          >
            hello@ashutosh.design
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "3rem clamp(2rem, 6vw, 5rem) 2rem",
          flexWrap: "wrap",
          gap: "1.5rem",
          borderTop: "1px solid var(--border)",
        }}
      >
        <span style={{ fontSize: "0.9rem", color: "var(--muted)", letterSpacing: "0.05em", fontWeight: 300 }}>
          © {year} Ashutosh. All rights reserved.
        </span>
        <div style={{ display: "flex", gap: "2.5rem" }}>
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="footer-link"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

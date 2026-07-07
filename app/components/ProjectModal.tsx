"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { Work } from "../works/data";

interface ProjectModalProps {
  project: Work;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Lock background scroll and show native cursor when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("modal-open");
    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("modal-open");
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(5, 5, 5, 0.9)",
        backdropFilter: "blur(16px)",
        zIndex: 10002,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        style={{
          width: "100%",
          maxWidth: "1000px",
          maxHeight: "85vh",
          overflowY: "auto",
          background: "var(--background)",
          border: "1px solid var(--border)",
          borderRadius: "24px",
          padding: "clamp(1.5rem, 4vw, 3rem)",
          position: "relative",
          boxShadow: "0 25px 80px rgba(0, 0, 0, 0.5)",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking card content
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          data-cursor-hover
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: "1px solid var(--border)",
            background: "rgba(255, 255, 255, 0.03)",
            color: "var(--foreground)",
            fontSize: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
            zIndex: 10,
          }}
          className="modal-close-btn"
        >
          ×
        </button>

        {/* Project Header */}
        <div style={{ marginBottom: "2rem", paddingRight: "3rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            {project.tags.map((tag) => (
              <span key={tag} className="project-card-tag">
                {tag}
              </span>
            ))}
            <span className="project-card-tag">{project.year}</span>
          </div>
          <h2
            className="section-title"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: "1rem",
              fontWeight: 700,
            }}
          >
            {project.title}
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--muted)",
              lineHeight: 1.6,
              maxWidth: "800px",
              fontWeight: 300,
            }}
          >
            {project.description}
          </p>
        </div>

        {/* Project Media Content */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "2rem",
            marginTop: "1rem",
          }}
        >
          {project.embedUrl ? (
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16/10",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid var(--border)",
                background: "rgba(0, 0, 0, 0.2)",
              }}
            >
              <iframe
                src={project.embedUrl}
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
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <img
                src={project.imageUrl}
                alt={project.title}
                style={{
                  width: "100%",
                  maxHeight: "500px",
                  objectFit: "cover",
                  borderRadius: "16px",
                  border: "1px solid var(--border)",
                  marginBottom: "2rem",
                }}
              />
              <p
                style={{
                  fontSize: "1rem",
                  color: "var(--muted)",
                  lineHeight: 1.7,
                  maxWidth: "600px",
                  margin: "0 auto",
                  fontWeight: 300,
                }}
              >
                More details about this project coming soon. Process documentation, design breakdowns, and animated assets will be loaded here.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

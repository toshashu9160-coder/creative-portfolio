"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import AnimatedLoader from "./components/AnimatedLoader";
import Hero from "./components/Hero";
import CrossingName from "./components/CrossingName";
import About from "./components/About";
import FeaturedProjects from "./components/FeaturedProjects";
import Footer from "./components/Footer";
import GooeyNav from "./components/GooeyNav";
import DarkVeil from "./components/DarkVeil";
import ProjectModal from "./components/ProjectModal";
import { Work } from "./works/data";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<Work | null>(null);

  return (
    <>
      {/* Grain texture overlay — always visible */}
      <div className="grain-overlay" />

      {/* Generative liquid canvas background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          opacity: loading ? 0 : 0.65,
          transition: "opacity 1.5s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        <DarkVeil
          hueShift={20}
          noiseIntensity={0.03}
          speed={0.4}
          scanlineFrequency={0.2}
          warpAmount={1.2}
        />
      </div>

      {/* Multilingual Hello loader */}
      {loading && <AnimatedLoader onComplete={() => setLoading(false)} />}

      {/* Floating navigation bar */}
      <header
        style={{
          position: "fixed",
          top: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          pointerEvents: "auto",
          opacity: loading ? 0 : 1,
          transition: "opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        <GooeyNav items={NAV_ITEMS} initialActiveIndex={0} />
      </header>

      {/* Main content — fades in after loader */}
      <main
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        <Hero />
        <CrossingName />
        <About />
        <FeaturedProjects onProjectClick={(work) => setActiveProject(work)} />
        <CrossingName />
        <Footer />
      </main>

      {/* Inline Project Details Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

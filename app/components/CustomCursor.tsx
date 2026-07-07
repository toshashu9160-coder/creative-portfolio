"use client";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const bindHoverListeners = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseEnter = () => cursor.classList.add("hovering");
    const onMouseLeave = () => cursor.classList.remove("hovering");

    const interactiveEls = document.querySelectorAll(
      "a, button, [data-cursor-hover]"
    );
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Initial bind
    let cleanupHover = bindHoverListeners();

    // Watch for DOM changes and re-bind hover listeners
    const observer = new MutationObserver(() => {
      if (cleanupHover) cleanupHover();
      cleanupHover = bindHoverListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (cleanupHover) cleanupHover();
      observer.disconnect();
    };
  }, [bindHoverListeners]);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
}

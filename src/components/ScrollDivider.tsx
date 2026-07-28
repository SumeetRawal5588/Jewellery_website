"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollDivider() {
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!dividerRef.current) return;

    const items = dividerRef.current.querySelectorAll(".divider-ornament");
    items.forEach((item, i) => {
      gsap.fromTo(item,
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scale: 1, rotation: 0, opacity: 1, duration: 0.8,
          ease: "back.out(1.7)",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div ref={dividerRef} className="relative py-12 flex items-center justify-center overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      <div className="flex items-center gap-4">
        <div className="divider-ornament w-16 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--gold-primary))" }} />
        <svg className="divider-ornament" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 0L12.5 7.5L20 10L12.5 12.5L10 20L7.5 12.5L0 10L7.5 7.5L10 0Z" fill="var(--gold-primary)" opacity="0.7"/>
        </svg>
        <svg className="divider-ornament" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="5" stroke="var(--gold-primary)" strokeWidth="1.5" opacity="0.5"/>
          <circle cx="7" cy="7" r="2" fill="var(--gold-primary)" opacity="0.6"/>
        </svg>
        <svg className="divider-ornament" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15 9L22 10L16.5 15L18 22L12 18.5L6 22L7.5 15L2 10L9 9L12 2Z" fill="var(--gold-primary)" opacity="0.6"/>
        </svg>
        <svg className="divider-ornament" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="5" stroke="var(--gold-primary)" strokeWidth="1.5" opacity="0.5"/>
          <circle cx="7" cy="7" r="2" fill="var(--gold-primary)" opacity="0.6"/>
        </svg>
        <svg className="divider-ornament" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 0L12.5 7.5L20 10L12.5 12.5L10 20L7.5 12.5L0 10L7.5 7.5L10 0Z" fill="var(--gold-primary)" opacity="0.7"/>
        </svg>
        <div className="divider-ornament w-16 h-px" style={{ background: "linear-gradient(90deg, var(--gold-primary), transparent)" }} />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ornaments = [
  // Necklace chain
  { type: "chain", x: "5%", y: "15%", size: 60, delay: 0 },
  { type: "chain", x: "92%", y: "35%", size: 50, delay: 0.5 },
  { type: "chain", x: "8%", y: "55%", size: 45, delay: 1 },
  { type: "chain", x: "88%", y: "70%", size: 55, delay: 1.5 },
  // Rings
  { type: "ring", x: "15%", y: "25%", size: 35, delay: 0.3 },
  { type: "ring", x: "85%", y: "50%", size: 30, delay: 0.8 },
  { type: "ring", x: "10%", y: "75%", size: 28, delay: 1.3 },
  { type: "ring", x: "90%", y: "85%", size: 32, delay: 1.8 },
  // Diamonds
  { type: "diamond", x: "3%", y: "40%", size: 24, delay: 0.2 },
  { type: "diamond", x: "95%", y: "20%", size: 20, delay: 0.7 },
  { type: "diamond", x: "7%", y: "65%", size: 22, delay: 1.2 },
  { type: "diamond", x: "93%", y: "55%", size: 18, delay: 1.7 },
  // Pendants
  { type: "pendant", x: "12%", y: "45%", size: 40, delay: 0.4 },
  { type: "pendant", x: "88%", y: "15%", size: 35, delay: 0.9 },
  { type: "pendant", x: "5%", y: "85%", size: 38, delay: 1.4 },
  { type: "pendant", x: "95%", y: "75%", size: 42, delay: 1.9 },
  // Bangles
  { type: "bangle", x: "18%", y: "60%", size: 36, delay: 0.6 },
  { type: "bangle", x: "82%", y: "40%", size: 34, delay: 1.1 },
];

function ChainSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 40 60" fill="none">
      <ellipse cx="20" cy="10" rx="8" ry="10" stroke="#c9a96e" strokeWidth="1.5" opacity="0.6"/>
      <ellipse cx="20" cy="25" rx="6" ry="8" stroke="#d4af6e" strokeWidth="1.5" opacity="0.5"/>
      <ellipse cx="20" cy="38" rx="8" ry="10" stroke="#c9a96e" strokeWidth="1.5" opacity="0.6"/>
      <ellipse cx="20" cy="52" rx="6" ry="8" stroke="#d4af6e" strokeWidth="1.5" opacity="0.4"/>
      <circle cx="20" cy="58" r="2" fill="#c9a96e" opacity="0.7"/>
    </svg>
  );
}

function RingSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="14" stroke="#c9a96e" strokeWidth="2.5" opacity="0.5"/>
      <circle cx="20" cy="20" r="10" stroke="#d4af6e" strokeWidth="1" opacity="0.3"/>
      <path d="M15 8L20 2L25 8" stroke="#c9a96e" strokeWidth="1.5" opacity="0.6"/>
      <circle cx="20" cy="4" r="3" fill="#d4af6e" opacity="0.4"/>
    </svg>
  );
}

function DiamondSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <path d="M15 2L28 12L15 28L2 12L15 2Z" stroke="#c9a96e" strokeWidth="1.5" opacity="0.5"/>
      <path d="M6 12H24" stroke="#d4af6e" strokeWidth="1" opacity="0.4"/>
      <path d="M15 2L12 12L15 28L18 12L15 2Z" stroke="#c9a96e" strokeWidth="0.8" opacity="0.3"/>
    </svg>
  );
}

function PendantSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 40 52" fill="none">
      <path d="M10 0C10 0 20 2 30 0" stroke="#c9a96e" strokeWidth="1" opacity="0.4"/>
      <line x1="20" y1="2" x2="20" y2="18" stroke="#d4af6e" strokeWidth="1" opacity="0.5"/>
      <path d="M12 22C12 22 14 18 20 18C26 18 28 22 28 22C28 22 30 28 28 34C26 40 20 44 20 44C20 44 14 40 12 34C10 28 12 22 12 22Z" stroke="#c9a96e" strokeWidth="1.5" fill="#c9a96e" fillOpacity="0.1" opacity="0.5"/>
      <circle cx="20" cy="30" r="4" stroke="#d4af6e" strokeWidth="1" opacity="0.4"/>
    </svg>
  );
}

function BangleSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 50 30" fill="none">
      <ellipse cx="25" cy="15" rx="22" ry="12" stroke="#c9a96e" strokeWidth="2" opacity="0.5"/>
      <ellipse cx="25" cy="15" rx="18" ry="9" stroke="#d4af6e" strokeWidth="1" opacity="0.3"/>
      <circle cx="10" cy="10" r="1.5" fill="#c9a96e" opacity="0.6"/>
      <circle cx="40" cy="10" r="1.5" fill="#c9a96e" opacity="0.6"/>
      <circle cx="25" cy="4" r="1.5" fill="#d4af6e" opacity="0.5"/>
    </svg>
  );
}

export default function FloatingJewelry() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".jewelry-item");
    const triggers: ScrollTrigger[] = [];

    items.forEach((item, i) => {
      const ornament = ornaments[i];
      if (!ornament) return;

      // Make visible immediately with slight opacity
      gsap.set(item, { opacity: 0.15 + Math.random() * 0.3 });

      // Continuous floating animation
      gsap.to(item, {
        y: `+=${20 + Math.random() * 30}`,
        x: `+=${(Math.random() - 0.5) * 20}`,
        rotation: (Math.random() - 0.5) * 30,
        duration: 4 + Math.random() * 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: ornament.delay,
      });

      // Scroll-triggered parallax - items move at different speeds creating depth
      const st = ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5 + Math.random() * 2,
        onUpdate: (self) => {
          const progress = self.progress;
          const direction = i % 2 === 0 ? -1 : 1;
          const yMove = progress * (200 + Math.random() * 150) * direction;
          const rotateMove = progress * (30 + Math.random() * 40) * direction;
          gsap.set(item, {
            y: yMove,
            rotation: rotateMove,
          });
        },
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, []);

  const renderOrnament = (type: string, size: number) => {
    switch (type) {
      case "chain": return <ChainSVG size={size} />;
      case "ring": return <RingSVG size={size} />;
      case "diamond": return <DiamondSVG size={size} />;
      case "pendant": return <PendantSVG size={size} />;
      case "bangle": return <BangleSVG size={size} />;
      default: return null;
    }
  };

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {ornaments.map((ornament, i) => (
        <div
          key={i}
          className="jewelry-item absolute golden-glow"
          style={{
            left: ornament.x,
            top: ornament.y,
            opacity: 0,
          }}
        >
          {renderOrnament(ornament.type, ornament.size)}
        </div>
      ))}
    </div>
  );
}

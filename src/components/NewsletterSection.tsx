"use client";

import { useState, useEffect, useRef } from "react";
import { Send, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 85%", toggleActions: "play none none none" }
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-24 px-6 lg:px-8 relative overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
      <div
        ref={contentRef}
        className="relative z-10 max-w-2xl mx-auto text-center opacity-0"
      >
        <span className="text-xs tracking-[0.4em] uppercase block mb-4" style={{ color: "var(--gold-primary)" }}>
          Stay Connected
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          Join the <span className="gold-gradient-text">Inner Circle</span>
        </h2>
        <div className="divider-gold max-w-xs mx-auto mb-6" />
        <p className="text-lg font-light mb-10" style={{ color: "var(--text-secondary)" }}>
          Be the first to discover new collections, receive exclusive
          invitations, and enjoy private previews.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 px-6 py-4 rounded-lg text-sm tracking-wider focus:outline-none transition-colors duration-300"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
          />
          <button
            type="submit"
            className="px-8 py-4 font-serif text-sm tracking-[0.2em] uppercase transition-colors duration-300 flex items-center justify-center gap-2 rounded-lg"
            style={{ background: "var(--gold-primary)", color: "#fff" }}
          >
            {submitted ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Joined
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Subscribe
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

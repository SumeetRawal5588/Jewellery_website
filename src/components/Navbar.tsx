"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import gsap from "gsap";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/catalogs", label: "Catalogs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Use light (white) text only on homepage when not scrolled (dark video bg)
  const useLightText = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
    }
    if (logoRef.current) {
      gsap.fromTo(logoRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, delay: 0.3, ease: "back.out(1.7)" });
    }
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: (scrolled || !isHome) ? "var(--nav-bg)" : "transparent",
          backdropFilter: (scrolled || !isHome) ? "blur(16px)" : "none",
          borderBottom: (scrolled || !isHome) ? "1px solid var(--border-color)" : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.05)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link ref={logoRef} href="/" className="flex items-center gap-3 group">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="group-hover:rotate-12 transition-transform duration-500">
                <path d="M16 2L20 10L28 12L22 18L24 26L16 22L8 26L10 18L4 12L12 10L16 2Z" fill="var(--gold-primary)" opacity="0.9"/>
                <path d="M16 6L18.5 11L24 12.5L20 16.5L21 22L16 19.5L11 22L12 16.5L8 12.5L13.5 11L16 6Z" fill="var(--gold-dark)" opacity="0.6"/>
              </svg>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-[0.15em] leading-tight" style={{ color: useLightText ? "#ffffff" : "var(--text-primary)" }}>
                  VARAHI
                </span>
                <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: useLightText ? "#d4af6e" : "var(--gold-primary)" }}>
                  Jewels
                </span>
              </div>
            </Link>

            {/* Nav links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-[13px] tracking-[0.15em] uppercase transition-colors duration-300 group font-medium"
                  style={{ color: useLightText ? "#ffffff" : "var(--text-secondary)" }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] rounded-full transition-all duration-300 group-hover:w-full" style={{ background: "var(--gold-primary)" }} />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ background: useLightText ? "rgba(255,255,255,0.15)" : "var(--bg-accent)", border: useLightText ? "1px solid rgba(255,255,255,0.3)" : "1px solid var(--border-color)", color: useLightText ? "#ffffff" : "var(--gold-primary)" }}
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
              <button
                className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: useLightText ? "rgba(255,255,255,0.15)" : "var(--bg-accent)", border: useLightText ? "1px solid rgba(255,255,255,0.3)" : "1px solid var(--border-color)", color: useLightText ? "#ffffff" : "var(--text-primary)" }}
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] backdrop-blur-2xl flex flex-col items-center justify-center"
            style={{ background: "var(--nav-bg)" }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "var(--bg-accent)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
            >
              <X className="w-5 h-5" />
            </button>
            <nav className="flex flex-col items-center gap-6">
              <button
                onClick={toggleTheme}
                className="mb-4 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "var(--bg-accent)", border: "1px solid var(--border-color)", color: "var(--gold-primary)" }}
              >
                {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-2xl tracking-[0.1em] transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

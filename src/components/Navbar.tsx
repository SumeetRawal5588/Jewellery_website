"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import gsap from "gsap";
import Image from "next/image";

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Use light (white) text only on homepage when not scrolled (dark video bg)
  const useLightText = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(1, y / docHeight) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
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
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link ref={logoRef} href="/" className="flex items-center gap-3">
              <Image
                src="/varahi_logo.png"
                alt="Varahi Jewels"
                width={1024}
                height={1024}
                priority
                className="h-20 lg:h-24 w-auto transition-all duration-500"
                style={{
                  filter: useLightText
                    ? "brightness(0) invert(1)"
                    : "brightness(0)",
                }}
              />
            </Link>

            {/* Nav links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative text-[13px] tracking-[0.15em] uppercase transition-colors duration-300 group font-medium"
                    style={{ color: isActive ? (useLightText ? "#ffffff" : "var(--gold-primary)") : (useLightText ? "#ffffff" : "var(--text-secondary)") }}
                  >
                    {link.label}
                    <span
                      className="absolute -bottom-1 left-0 h-[2px] rounded-full transition-all duration-300 group-hover:w-full"
                      style={{ background: "var(--gold-primary)", width: isActive ? "100%" : "0" }}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ background: useLightText ? "rgba(255,255,255,0.15)" : "var(--bg-accent)", border: useLightText ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(46,36,20,0.3)", color: useLightText ? "#ffffff" : "var(--text-primary)" }}
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
        {/* Scroll progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "transparent" }}>
          <div
            className="h-full origin-left transition-transform duration-75 ease-out"
            style={{
              transform: `scaleX(${scrollProgress})`,
              background: "linear-gradient(90deg, var(--gold-dark), var(--gold-primary), var(--gold-light))",
            }}
          />
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
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="relative"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-serif text-2xl tracking-[0.1em] transition-colors"
                      style={{ color: isActive ? "var(--gold-primary)" : "var(--text-primary)" }}
                    >
                      {link.label}
                    </Link>
                    {isActive && (
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold-primary)" }} />
                    )}
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

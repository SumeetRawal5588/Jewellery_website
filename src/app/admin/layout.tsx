"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  BookOpen,
  LogOut,
  Diamond,
  Menu,
  X,
} from "lucide-react";

const ADMIN_PASSWORD = "PASSWORD";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/catalogs", label: "Catalogs", icon: BookOpen },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = sessionStorage.getItem("admin_auth");
    if (token === "true") setAuthed(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      setAuthed(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthed(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-24" style={{ background: "var(--bg-primary)" }}>
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <Diamond className="w-10 h-10 mx-auto mb-4" style={{ color: "var(--gold-primary)" }} />
            <h1 className="font-serif text-3xl font-bold tracking-wider" style={{ color: "var(--gold-primary)" }}>
              Varahi Jewels
            </h1>
            <p className="text-sm mt-2 tracking-wider" style={{ color: "var(--text-secondary)" }}>
              Admin Dashboard
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-5 py-4 rounded-lg text-sm tracking-wider focus:outline-none transition-colors"
                style={{ background: "var(--bg-accent)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
              />
            </div>
            {error && (
              <p className="text-red-400 text-xs tracking-wider">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-4 font-serif text-sm tracking-[0.2em] uppercase transition-colors rounded-lg"
              style={{ background: "var(--gold-primary)", color: "#fff" }}
            >
              Sign In
            </button>
          </form>
          <p className="text-center text-xs mt-8" style={{ color: "var(--text-muted)" }}>
            Default password: aurum2024
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex pt-20" style={{ background: "var(--bg-primary)" }}>
      {/* Mobile toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-24 left-4 z-50 w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--gold-primary)" }}
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-64 border-r flex flex-col z-40 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}
      >
        <div className="p-6 border-b" style={{ borderColor: "var(--border-color)" }}>
          <div className="flex items-center gap-2">
            <Diamond className="w-5 h-5" style={{ color: "var(--gold-primary)" }} />
            <span className="font-serif text-lg font-bold tracking-[0.15em]" style={{ color: "var(--gold-primary)" }}>
              Varahi Jewels
            </span>
          </div>
          <p className="text-xs tracking-wider mt-1" style={{ color: "var(--text-secondary)" }}>
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm tracking-wider transition-all duration-300 rounded-lg"
                style={{
                  background: isActive ? "var(--bg-card)" : "transparent",
                  color: isActive ? "var(--gold-primary)" : "var(--text-secondary)",
                  border: isActive ? "1px solid var(--border-color)" : "1px solid transparent",
                }}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: "var(--border-color)" }}>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-sm tracking-wider hover:text-red-500 transition-colors w-full rounded-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-[calc(100vh-5rem)] p-6 lg:p-10 overflow-auto">
        {children}
      </main>
    </div>
  );
}

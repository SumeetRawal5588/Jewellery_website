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
      <div className="min-h-screen flex items-center justify-center bg-white px-6 pt-24">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <Diamond className="w-10 h-10 text-emerald mx-auto mb-4" />
            <h1 className="font-serif text-3xl font-bold text-emerald tracking-wider">
              Varahi Jewels
            </h1>
            <p className="text-gray-600 text-sm mt-2 tracking-wider">
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
                className="w-full px-5 py-4 bg-gray-50 border border-emerald/20 text-gray-800 placeholder:text-gray-400 text-sm tracking-wider focus:outline-none focus:border-emerald/50 transition-colors"
              />
            </div>
            {error && (
              <p className="text-red-400 text-xs tracking-wider">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-4 bg-emerald text-white font-serif text-sm tracking-[0.2em] uppercase hover:bg-emerald-light transition-colors"
            >
              Sign In
            </button>
          </form>
          <p className="text-center text-gray-400 text-xs mt-8">
            Default password: aurum2024
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex pt-20">
      {/* Mobile toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-24 left-4 z-50 w-10 h-10 bg-gray-50 border border-emerald/20 flex items-center justify-center text-emerald"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-64 bg-gray-50 border-r border-emerald/10 flex flex-col z-40 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-emerald/10">
          <div className="flex items-center gap-2">
            <Diamond className="w-5 h-5 text-emerald" />
            <span className="font-serif text-lg font-bold tracking-[0.15em] text-emerald">
              Varahi Jewels
            </span>
          </div>
          <p className="text-gray-600 text-xs tracking-wider mt-1">
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
                className={`flex items-center gap-3 px-4 py-3 text-sm tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-emerald/10 text-emerald border-l-2 border-emerald"
                    : "text-gray-600 hover:text-gray-800 hover:bg-emerald/5"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-emerald/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-sm tracking-wider text-gray-600 hover:text-red-500 transition-colors w-full"
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

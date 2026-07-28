import Link from "next/link";
import { Diamond, Globe, Heart, Sparkles } from "lucide-react";

const footerLinks = {
  Collections: ["Necklaces", "Rings", "Earrings", "Bracelets", "Tiaras"],
  Company: ["About Us", "Craftsmanship", "Sustainability", "Careers"],
  Support: ["Contact", "Shipping", "Returns", "Care Guide"],
};

export default function Footer() {
  return (
    <footer className="border-t" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Diamond className="w-5 h-5" style={{ color: "var(--gold-primary)" }} />
              <span className="font-serif text-xl font-bold tracking-[0.2em]" style={{ color: "var(--gold-primary)" }}>
                Varahi Jewels
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
              Crafting timeless pieces of extraordinary beauty since 1892.
              Each creation tells a story of heritage, passion, and
              uncompromising excellence.
            </p>
            <div className="flex gap-4">
              {[Globe, Heart, Sparkles].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-serif text-sm tracking-[0.2em] uppercase mb-6" style={{ color: "var(--text-primary)" }}>
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm transition-colors duration-300"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider-gold mt-12 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-wider" style={{ color: "var(--text-muted)" }}>
          <p>&copy; {new Date().getFullYear()} Varahi Jewels. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors" style={{ color: "var(--text-muted)" }}>
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors" style={{ color: "var(--text-muted)" }}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Diamond, Globe, Heart, Sparkles } from "lucide-react";

const footerLinks = {
  Collections: ["Necklaces", "Rings", "Earrings", "Bracelets", "Tiaras"],
  Company: ["About Us", "Craftsmanship", "Sustainability", "Careers"],
  Support: ["Contact", "Shipping", "Returns", "Care Guide"],
};

export default function Footer() {
  return (
    <footer className="bg-gray-light border-t border-emerald/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Diamond className="w-5 h-5 text-emerald" />
              <span className="font-serif text-xl font-bold tracking-[0.2em] text-emerald">
                Varahi Jewels
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Crafting timeless pieces of extraordinary beauty since 1892.
              Each creation tells a story of heritage, passion, and
              uncompromising excellence.
            </p>
            <div className="flex gap-4">
              {[Globe, Heart, Sparkles].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-emerald/20 flex items-center justify-center text-emerald/50 hover:text-emerald hover:border-emerald/60 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-serif text-sm tracking-[0.2em] uppercase text-emerald mb-6">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-gray-500 text-sm hover:text-emerald transition-colors duration-300"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider-emerald mt-12 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-xs tracking-wider">
          <p>&copy; {new Date().getFullYear()} Varahi Jewels. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-emerald transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-emerald transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-24 px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black-light via-black to-black-light" />
      <div className="absolute inset-0 shimmer-gold opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        <span className="text-xs tracking-[0.4em] uppercase text-gold/60 block mb-4">
          Stay Connected
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
          <span className="text-cream">Join the</span>{" "}
          <span className="gold-gradient-text">Inner Circle</span>
        </h2>
        <div className="divider-gold max-w-xs mx-auto mb-6" />
        <p className="text-cream/50 text-lg font-light mb-10">
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
            className="flex-1 px-6 py-4 bg-black-lighter/50 border border-gold/20 text-cream placeholder:text-cream/30 text-sm tracking-wider focus:outline-none focus:border-gold/50 transition-colors duration-300"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-gold text-black font-serif text-sm tracking-[0.2em] uppercase hover:bg-gold-light transition-colors duration-300 flex items-center justify-center gap-2"
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
      </motion.div>
    </section>
  );
}

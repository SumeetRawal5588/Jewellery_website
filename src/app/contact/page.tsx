"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const info = [
  { icon: MapPin, label: "Visit Us", value: "12 Rue du Rhône, Geneva, Switzerland" },
  { icon: Phone, label: "Call Us", value: "+41 22 310 1892" },
  { icon: Mail, label: "Email Us", value: "concierge@aurum.com" },
  { icon: Clock, label: "Hours", value: "Mon - Sat: 10am - 7pm" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="pt-20">
      <div className="py-16 text-center bg-black-light border-b border-gold/10">
        <span className="text-xs tracking-[0.4em] uppercase text-gold/60 block mb-4">
          Get in Touch
        </span>
        <h1 className="font-serif text-5xl md:text-6xl font-bold gold-gradient-text mb-4">
          Contact
        </h1>
        <p className="text-cream/50 text-lg max-w-xl mx-auto font-light">
          We&apos;d love to hear from you. Our concierge team is at your service.
        </p>
      </div>

      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl text-cream mb-8">
              Our <span className="gold-gradient-text">Maison</span>
            </h2>
            <div className="space-y-8">
              {info.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-gold/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-gold/70" />
                  </div>
                  <div>
                    <p className="text-cream font-serif text-sm mb-1">
                      {item.label}
                    </p>
                    <p className="text-cream/50 text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  className="w-full px-5 py-4 bg-black-lighter/50 border border-gold/15 text-cream placeholder:text-cream/25 text-sm tracking-wider focus:outline-none focus:border-gold/40 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  className="w-full px-5 py-4 bg-black-lighter/50 border border-gold/15 text-cream placeholder:text-cream/25 text-sm tracking-wider focus:outline-none focus:border-gold/40 transition-colors"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full px-5 py-4 bg-black-lighter/50 border border-gold/15 text-cream placeholder:text-cream/25 text-sm tracking-wider focus:outline-none focus:border-gold/40 transition-colors"
              />
              <select className="w-full px-5 py-4 bg-black-lighter/50 border border-gold/15 text-cream/50 text-sm tracking-wider focus:outline-none focus:border-gold/40 transition-colors appearance-none">
                <option>Select Enquiry Type</option>
                <option>Bespoke Commission</option>
                <option>Product Enquiry</option>
                <option>Appointment Request</option>
                <option>General Enquiry</option>
              </select>
              <textarea
                rows={5}
                placeholder="Your Message"
                required
                className="w-full px-5 py-4 bg-black-lighter/50 border border-gold/15 text-cream placeholder:text-cream/25 text-sm tracking-wider focus:outline-none focus:border-gold/40 transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full py-4 bg-gold text-black font-serif text-sm tracking-[0.2em] uppercase hover:bg-gold-light transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {submitted ? "Message Sent" : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

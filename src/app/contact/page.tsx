"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import emailjs from '@emailjs/browser';

const info = [
  { icon: MapPin, label: "Visit Us", value: "77/79, Sutariya Building, 3rd Floor, Dhanji St, Zaveri Bazaar, Mumbai, Maharashtra 400003" },
  { icon: Phone, label: "Call Us", value: "+91 8888625378" },
  { icon: Mail, label: "Email Us", value: "varahijewelsmumbai@gmail.com" },
  { icon: Clock, label: "Hours", value: "11:00 AM - 8:00 PM" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        message: formData.message,
        to_email: 'varahijewelsmumbai@gmail.com'
      };

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      if (response.status === 200) {
        alert('Thank you for your message! we will get back to you soon.');
        setSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
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
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-5 py-4 bg-black-lighter/50 border border-gold/15 text-cream placeholder:text-cream/25 text-sm tracking-wider focus:outline-none focus:border-gold/40 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-5 py-4 bg-black-lighter/50 border border-gold/15 text-cream placeholder:text-cream/25 text-sm tracking-wider focus:outline-none focus:border-gold/40 transition-colors"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-5 py-4 bg-black-lighter/50 border border-gold/15 text-cream placeholder:text-cream/25 text-sm tracking-wider focus:outline-none focus:border-gold/40 transition-colors"
              />
              <textarea
                rows={5}
                placeholder="Your Message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-5 py-4 bg-black-lighter/50 border border-gold/15 text-cream placeholder:text-cream/25 text-sm tracking-wider focus:outline-none focus:border-gold/40 transition-colors resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gold text-black font-serif text-sm tracking-[0.2em] uppercase hover:bg-gold-light transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                {loading ? "Sending..." : submitted ? "Message Sent" : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

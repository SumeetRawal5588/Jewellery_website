"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Diamond } from "lucide-react";
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
    <div className="pt-20" style={{ background: "var(--bg-primary)" }}>
      {/* Hero Header */}
      <div className="py-20 text-center relative overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Diamond className="w-8 h-8 mx-auto mb-4" style={{ color: "var(--gold-primary)" }} />
          <span className="text-xs tracking-[0.5em] uppercase block mb-4" style={{ color: "var(--gold-secondary)" }}>
            Get in Touch
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 gold-gradient-text">
            Contact Us
          </h1>
          <p className="text-lg max-w-xl mx-auto font-light" style={{ color: "var(--text-secondary)" }}>
            We&apos;d love to hear from you. Our concierge team is at your service.
          </p>
        </motion.div>
        <div className="mt-8 mx-auto w-24 divider-gold" />
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
            <h2 className="font-serif text-3xl mb-8" style={{ color: "var(--text-primary)" }}>
              Our <span className="gold-gradient-text">Maison</span>
            </h2>
            <div className="space-y-8">
              {info.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-md" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
                    <item.icon className="w-5 h-5" style={{ color: "var(--gold-primary)" }} />
                  </div>
                  <div>
                    <p className="font-serif text-base mb-1 font-semibold" style={{ color: "var(--text-primary)" }}>
                      {item.label}
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{item.value}</p>
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
            <div className="p-8 rounded-2xl shadow-xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
              <h3 className="font-serif text-2xl mb-6" style={{ color: "var(--text-primary)" }}>Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-5 py-4 rounded-lg text-sm tracking-wider focus:outline-none transition-all duration-300"
                    style={{ background: "var(--bg-accent)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-5 py-4 rounded-lg text-sm tracking-wider focus:outline-none transition-all duration-300"
                    style={{ background: "var(--bg-accent)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-4 rounded-lg text-sm tracking-wider focus:outline-none transition-all duration-300"
                  style={{ background: "var(--bg-accent)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                />
                <textarea
                  rows={5}
                  placeholder="Your Message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-5 py-4 rounded-lg text-sm tracking-wider focus:outline-none transition-all duration-300 resize-none"
                  style={{ background: "var(--bg-accent)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 font-serif text-sm tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.01]"
                  style={{ background: "var(--gold-primary)", color: "#ffffff" }}
                >
                  <Send className="w-4 h-4" />
                  {loading ? "Sending..." : submitted ? "Message Sent" : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl mb-8 text-center" style={{ color: "var(--text-primary)" }}>
              Find <span className="gold-gradient-text">Us</span>
            </h2>
            <div className="rounded-2xl overflow-hidden shadow-xl" style={{ border: "1px solid var(--border-color)" }}>
              <iframe
                src="https://maps.google.com/maps?q=77%2F79%2C+Sutariya+Building%2C+3rd+Floor%2C+Dhanji+St%2C+Zaveri+Bazaar%2C+Mumbai%2C+Maharashtra+400003&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

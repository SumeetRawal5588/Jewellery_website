"use client";

import { motion } from "framer-motion";
import { Gem, Shield, Award, Truck } from "lucide-react";

const features = [
  {
    icon: Gem,
    title: "Ethically Sourced",
    desc: "Every gemstone is responsibly sourced and certified for authenticity and ethical origin.",
  },
  {
    icon: Shield,
    title: "Lifetime Warranty",
    desc: "Each piece comes with a comprehensive lifetime warranty and complimentary annual servicing.",
  },
  {
    icon: Award,
    title: "Master Crafted",
    desc: "Our artisans bring over 130 years of heritage to every meticulously handcrafted creation.",
  },
  {
    icon: Truck,
    title: "Worldwide Delivery",
    desc: "Insured white-glove delivery to your doorstep, anywhere in the world, within 5 business days.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-black-light">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.4em] uppercase text-gold/60 block mb-4">
            Why Choose Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">The VARAHI JEWELS</span>{" "}
            <span className="text-white/80">Promise</span>
          </h2>
          <div className="divider-gold max-w-xs mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group text-center p-8 border border-gold/10 hover:border-gold/30 transition-all duration-500 bg-black/50"
            >
              <div className="w-16 h-16 mx-auto mb-6 border border-gold/20 rounded-full flex items-center justify-center group-hover:border-gold/50 group-hover:bg-gold/5 transition-all duration-500">
                <f.icon className="w-7 h-7 text-gold/70 group-hover:text-gold transition-colors duration-300" />
              </div>
              <h3 className="font-serif text-lg text-cream mb-3 group-hover:text-gold transition-colors duration-300">
                {f.title}
              </h3>
              <p className="text-cream/40 text-sm leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

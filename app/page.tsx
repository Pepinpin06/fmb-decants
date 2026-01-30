"use client";

import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Star, Truck, ShieldCheck, Sparkles, Gem, Droplets } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

// Enhanced Marquee Component
const Marquee = ({ children, className, reverse = false }: { children: React.ReactNode, className?: string, reverse?: boolean }) => {
  return (
    <div className={cn("overflow-hidden flex whitespace-nowrap marquee-container", className)}>
      <motion.div
        className="flex gap-16 marquee-content"
        animate={{ x: reverse ? "0%" : "-50%" }}
        initial={{ x: reverse ? "-50%" : "0%" }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
      >
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
};

// Animated Section wrapper
const AnimatedSection = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default function Home() {
  const featured = products.filter(p => p.isFeatured).slice(0, 4);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <div className="flex flex-col bg-[#050505] text-white overflow-x-hidden">

      {/* 1. IMMERSIVE HERO - Enhanced */}
      <section ref={targetRef} className="relative h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#050505] to-black" />

          {/* Floating Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/20 rounded-full blur-[150px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#1B93A4]/20 rounded-full blur-[120px]"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50 z-10" />
        </motion.div>

        <div className="container relative z-20 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-3 py-2 px-6 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] tracking-[0.25em] font-medium uppercase mb-10 glass"
            >
              <Sparkles className="w-4 h-4" />
              Colección Exclusiva 2024
              <Sparkles className="w-4 h-4" />
            </motion.span>

            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-serif font-bold text-white mb-8 leading-[0.85] tracking-tighter">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="block"
              >
                Essence
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="block text-gradient-gold italic font-light"
              >
                Redefined.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-white/50 max-w-xl mx-auto text-lg md:text-xl leading-relaxed mb-14 font-light"
            >
              Arte olfativo fraccionado. Accede a las fragancias más deseadas del mundo sin comprar la botella entera.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-5"
            >
              <Link
                href="/catalog"
                data-testid="hero-cta-catalog"
                className="group relative px-10 py-4 bg-[#D4AF37] text-black font-bold text-sm tracking-widest uppercase rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explorar Catálogo
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="/about"
                data-testid="hero-cta-about"
                className="btn-outline text-sm tracking-widest uppercase"
              >
                Nuestra Historia
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">Descubre</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-16 bg-gradient-to-b from-[#D4AF37]/50 via-[#D4AF37] to-transparent"
          />
        </motion.div>
      </section>

      {/* 2. INFINITE MARQUEE - Enhanced */}
      <div className="border-y border-white/5 bg-[#0A0A0A] py-8 overflow-hidden">
        <Marquee className="text-white/30 font-serif text-xl md:text-2xl">
          {[
            { text: "Envío Gratis +$999", icon: <Truck className="w-5 h-5" /> },
            { text: "100% Originales", icon: <ShieldCheck className="w-5 h-5" /> },
            { text: "Decants de Lujo", icon: <Gem className="w-5 h-5" /> },
            { text: "Envíos a todo México", icon: <Droplets className="w-5 h-5" /> },
            { text: "Pago Seguro", icon: <Star className="w-5 h-5" /> },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 mx-10">
              <span className="text-[#D4AF37]/60">{item.icon}</span>
              <span className="italic">{item.text}</span>
              <span className="text-[#D4AF37]/40">✦</span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* 3. FEATURED PRODUCTS - Bento Style */}
      <AnimatedSection className="py-24 md:py-32 px-6">
        <div className="container max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-4 block"
              >
                Curaduría Selecta
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-serif text-white leading-[1.1]"
              >
                Los Favoritos de la{" "}
                <span className="italic text-white/40">Comunidad.</span>
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/catalog"
                data-testid="featured-see-all"
                className="group flex items-center gap-2 text-white/60 text-sm hover:text-[#D4AF37] transition-colors animated-underline"
              >
                Ver catálogo completo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Product Grid - Bento Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 card-hover-border",
                  idx === 0 ? "md:col-span-2 md:row-span-2" : ""
                )}
              >
                <Link href={`/products/${product.slug}`} data-testid={`featured-product-${product.slug}`} className="block w-full h-full">
                  <div className={cn("relative overflow-hidden img-zoom-container", idx === 0 ? "aspect-square" : "aspect-[3/4]")}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                      >
                        <p className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-2">{product.brand}</p>
                        <h3 className={cn("font-serif font-bold text-white mb-3", idx === 0 ? "text-3xl md:text-4xl" : "text-xl md:text-2xl")}>
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-3 text-white/50 text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                          <span>Desde ${product.prices[3]}</span>
                          <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 4. VALUE PROPOSITION - Glassmorphism Cards */}
      <AnimatedSection className="py-24 border-y border-white/5 bg-[#0A0A0A]/50">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Autenticidad",
                desc: "Decants extraídos directamente de botellas originales. Sin imitaciones, solo fragancias genuinas.",
                icon: <ShieldCheck className="w-6 h-6" />,
                gradient: "from-[#D4AF37]/20 to-transparent"
              },
              {
                title: "Envío Express",
                desc: "Recibe tu pedido en 2-5 días hábiles con empaque premium que protege cada gota.",
                icon: <Truck className="w-6 h-6" />,
                gradient: "from-[#1B93A4]/20 to-transparent"
              },
              {
                title: "Satisfacción",
                desc: "Tu experiencia es nuestra prioridad. Atención personalizada y garantía en cada compra.",
                icon: <Star className="w-6 h-6" />,
                gradient: "from-[#D4AF37]/20 to-transparent"
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="relative p-8 rounded-2xl glass-light group cursor-default"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:scale-110 group-hover:bg-[#D4AF37]/20 transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-serif">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 5. LARGE CTA SECTION */}
      <AnimatedSection className="py-32 md:py-48 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-[#1B93A4]/5" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#D4AF37]/10 rounded-full"
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 tracking-tight leading-[0.9]">
              Encuentra tu{" "}
              <span className="text-gradient-gold">sello personal.</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/40 mb-14 font-light max-w-2xl mx-auto">
              Explora más de {products.length} fragancias exclusivas y recibe tu decant en la puerta de tu casa.
            </p>
            <Link
              href="/catalog"
              data-testid="cta-explore-catalog"
              className="inline-flex items-center gap-3 px-12 py-5 bg-[#D4AF37] text-black font-bold text-sm tracking-widest uppercase rounded-full hover:bg-[#F4CF57] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(212,175,55,0.4)] group"
            >
              Explorar Catálogo
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* 6. SOCIAL PROOF / BRANDS MARQUEE */}
      <div className="py-12 border-t border-white/5">
        <Marquee reverse className="text-white/20 text-lg font-serif tracking-widest">
          {["Jean Paul Gaultier", "Valentino", "YSL", "Armaf", "Lattafa", "Rasasi", "Afnan", "French Avenue", "Rave"].map((brand, i) => (
            <div key={i} className="flex items-center gap-8 mx-12">
              <span className="uppercase">{brand}</span>
              <span className="text-[#D4AF37]/30">◆</span>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

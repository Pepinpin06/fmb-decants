"use client";

import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Star, Truck, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

// Marquee Component
const Marquee = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("overflow-hidden flex whitespace-nowrap", className)}>
      <motion.div
        className="flex gap-12"
        animate={{ x: "-50%" }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
};

export default function Home() {
  const featured = products.filter(p => p.isFeatured).slice(0, 3);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <div className="flex flex-col bg-background text-foreground overflow-x-hidden">

      {/* 1. IMMERSIVE HERO */}
      <section ref={targetRef} className="relative h-[110vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 z-0">
          {/* Placeholder Background - In prod use a high-res video or hero image */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-black" />
          <div className="absolute inset-0 bg-black/40 z-10" />
          {/* Floating Abstract Element */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        </motion.div>

        <div className="container relative z-20 px-4 text-center pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full border border-white/10 text-white/80 text-[10px] tracking-[0.3em] font-medium uppercase mb-8 backdrop-blur-md bg-white/5">
              <Sparkles className="w-3 h-3 text-primary" />
              Colección Exclusiva 2024
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-bold text-white mb-6 leading-[0.9] tracking-tighter">
              <span className="block">Essence</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-100 to-primary/80 italic font-light pr-4">
                Redefined.
              </span>
            </h1>
            <p className="text-white/60 max-w-lg mx-auto text-lg leading-relaxed mb-12 font-light">
              Arte olfativo fraccionado. Accede a las fragancias más deseadas del mundo sin comprar la botella entera.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/catalog" className="group relative px-10 py-5 bg-white text-black font-bold text-xs tracking-widest uppercase overflow-hidden hover:bg-primary transition-colors duration-300">
                <span className="relative z-10 flex items-center gap-3">
                  Ver Catálogo <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
        </motion.div>
      </section>

      {/* 2. INFINITE MARQUEE */}
      <div className="border-y border-white/5 bg-neutral-900/50 backdrop-blur-sm py-6 overflow-hidden">
        <Marquee className="text-white/40 font-serif text-2xl italic">
          {[
            "Envío Gratis en pedidos +$999", "100% Originales Garantizados", "Decants de Lujo", "Envíos a todo México",
            "Pago Seguro con Mercado Pago", "Packaging Premium", "Fragancias de Nicho",
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-8 mx-8">
              <span>{text}</span>
              <Star className="w-4 h-4 text-primary opacity-50" />
            </div>
          ))}
        </Marquee>
      </div>

      {/* 3. FEATURED COLLECTIONS GRID */}
      <section className="py-32 px-4 flex justify-center">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Curaduría</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                Los Favoritos de la <br /> <i className="text-white/50">Comunidad.</i>
              </h2>
            </div>
            <Link href="/catalog" className="text-white text-sm border-b border-primary/50 pb-1 hover:border-primary hover:text-primary transition-all">
              Ver todos los perfumes
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "group relative aspect-[3/4] bg-neutral-900 overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500",
                  idx === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "" // First item is bigger
                )}
              >
                <Link href={`/products/${product.slug}`} className="block w-full h-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 md:p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-primary text-xs font-bold tracking-widest uppercase mb-2">{product.brand}</p>
                    <h3 className={cn("font-serif font-bold text-white", idx === 0 ? "text-4xl" : "text-xl")}>{product.name}</h3>
                    <div className="mt-4 flex items-center gap-2 text-white/60 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      <span>Ver detalles</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VALUE PROPOSITION (Minimalist) */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {[
            { title: "Autenticidad", desc: "Decants extraídos directamente de la botella original.", icon: <Star className="w-5 h-5" /> },
            { title: "Velocidad", desc: "Envíos express y seguros a todo el país.", icon: <Truck className="w-5 h-5" /> },
            { title: "Garantía", desc: "Tu satisfacción es nuestra prioridad número uno.", icon: <ShieldCheck className="w-5 h-5" /> },
          ].map((item, i) => (
            <div key={i} className="px-8 py-8 flex flex-col items-center text-center gap-4 group hover:bg-white/5 transition-colors rounded-lg">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA BIG */}
      <section className="py-40 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 tracking-tight">
            Encuentra tu sello personal.
          </h2>
          <p className="text-xl text-gray-400 mb-12 font-light">
            Explora más de 20 fragancias exclusivas y recibe tu decant en la puerta de tu casa.
          </p>
          <Link
            href="/catalog"
            className="inline-block px-12 py-5 bg-white text-black font-bold text-sm tracking-widest uppercase hover:bg-primary transition-colors hover:scale-105 transform duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
          >
            Explorar Catálogo
          </Link>
        </div>
      </section>
    </div>
  );
}

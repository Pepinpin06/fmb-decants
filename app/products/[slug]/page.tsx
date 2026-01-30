"use client";

import { products } from "@/lib/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import ProductAccords from "@/components/ProductAccords";
import { motion } from "framer-motion";
import { ArrowLeft, Droplets, Sparkles } from "lucide-react";
import Link from "next/link";
import { use } from "react";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: PageProps) {
    const { slug } = use(params);
    const product = products.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#050505] pt-24 pb-20">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link
                        href="/catalog"
                        data-testid="back-to-catalog"
                        className="inline-flex items-center gap-2 text-white/40 hover:text-[#D4AF37] transition-colors text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver al catálogo
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Product Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative lg:sticky lg:top-28"
                    >
                        <div className="relative aspect-[3/4] bg-[#0A0A0A] rounded-3xl overflow-hidden border border-white/5">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />

                            {/* Gradient overlay at bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />

                            {/* Featured badge */}
                            {product.isFeatured && (
                                <motion.span
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute top-6 right-6 flex items-center gap-2 bg-[#D4AF37] text-black text-xs font-bold px-4 py-2 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                                >
                                    <Sparkles className="w-3.5 h-3.5" />
                                    DESTACADO
                                </motion.span>
                            )}
                        </div>
                    </motion.div>

                    {/* Product Details */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col"
                    >
                        {/* Brand */}
                        <span className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-4">
                            {product.brand}
                        </span>

                        {/* Name */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-8 leading-[0.95]">
                            {product.name}
                        </h1>

                        {/* Description */}
                        <div className="mb-10">
                            <h3 className="flex items-center gap-2 text-xs font-bold text-white/40 tracking-[0.2em] uppercase mb-4">
                                <Droplets className="w-4 h-4 text-[#D4AF37]" />
                                La Esencia
                            </h3>
                            <p className="text-xl md:text-2xl text-white/70 font-serif italic leading-relaxed">
                                "{product.description}"
                            </p>
                        </div>

                        {/* Notes */}
                        <div className="mb-10">
                            <h3 className="text-xs font-bold text-white/40 tracking-[0.2em] uppercase mb-5">
                                Notas Olfativas
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {product.notes.map((note, i) => (
                                    <motion.span
                                        key={note}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.03 }}
                                        className="px-4 py-2 border border-white/10 rounded-full text-sm text-white/70 bg-white/5 hover:bg-white/10 hover:border-[#D4AF37]/30 transition-all duration-300 cursor-default"
                                    >
                                        {note}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        {/* Accords */}
                        {product.accords && (
                            <div className="mb-10">
                                <ProductAccords accords={product.accords} />
                            </div>
                        )}

                        {/* Divider */}
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

                        {/* Pricing & Cart */}
                        <AddToCartButton product={product} />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

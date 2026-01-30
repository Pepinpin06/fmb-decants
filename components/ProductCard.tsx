"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../lib/types';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={`/products/${product.slug}`} data-testid={`product-card-${product.slug}`} className="group block h-full">
            <motion.div
                className="relative bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-500 hover:border-[#D4AF37]/30 card-hover-border"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-[#121212] to-[#0A0A0A]">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />

                    {/* Featured tag */}
                    {product.isFeatured && (
                        <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#D4AF37] text-black text-[10px] font-bold px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                        >
                            <Sparkles className="w-3 h-3" />
                            DESTACADO
                        </motion.span>
                    )}

                    {/* Quick view on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-medium tracking-wider uppercase">
                            Ver Detalles
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col relative">
                    {/* Brand */}
                    <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
                        {product.brand}
                    </p>

                    {/* Name */}
                    <h3 className="text-lg font-serif font-bold text-white mb-3 leading-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                        {product.name}
                    </h3>

                    {/* Notes preview */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {product.notes.slice(0, 3).map((note, i) => (
                            <span
                                key={note}
                                className="text-[10px] text-white/40 bg-white/5 px-2 py-1 rounded-full"
                            >
                                {note}
                            </span>
                        ))}
                        {product.notes.length > 3 && (
                            <span className="text-[10px] text-white/30 px-2 py-1">
                                +{product.notes.length - 3}
                            </span>
                        )}
                    </div>

                    {/* Price section */}
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <div>
                            <span className="text-[10px] text-white/40 uppercase tracking-wider block mb-1">Desde</span>
                            <span className="text-xl font-bold text-white">${product.prices[3]}</span>
                            <span className="text-xs text-white/40 ml-1">MXN</span>
                        </div>
                        <motion.div
                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                        >
                            <ArrowRight className="w-4 h-4" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

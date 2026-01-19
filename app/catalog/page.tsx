"use client";

import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function CatalogPage() {
    return (
        <div className="min-h-screen bg-neutral-950 pt-32 pb-20 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8"
                >
                    <div className="max-w-2xl">
                        <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3 block">Colección 2024</span>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tighter mb-4">Catálogo</h1>
                        <p className="text-white/60 font-light text-lg">
                            Descubre tu próxima firma olfativa entre nuestra selección curada de fragancias de diseñador y nicho.
                        </p>
                    </div>

                    {/* Simple Filter bar visual (Functional later) */}
                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Buscar perfume..."
                                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all w-full md:w-64"
                            />
                        </div>
                        <button className="p-2 bg-white/5 border border-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                            <SlidersHorizontal className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>

                {/* Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12"
                >
                    {products.map((product) => (
                        <motion.div key={product.id} variants={item}>
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

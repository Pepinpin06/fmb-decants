"use client";

import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown, Check } from "lucide-react";
import { useState, useMemo } from "react";
import clsx from "clsx";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

// Extract unique brands and notes for filters
const allBrands = Array.from(new Set(products.map(p => p.brand))).sort();
const allNotes = Array.from(new Set(products.flatMap(p => p.notes))).sort();

export default function CatalogPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Filters State
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

    // Filtering Logic
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // 1. Text Search (Name, Brand, Notes)
            const query = searchQuery.toLowerCase();
            const matchesSearch =
                product.name.toLowerCase().includes(query) ||
                product.brand.toLowerCase().includes(query) ||
                product.notes.بعض(note => note.toLowerCase().includes(query));

            if (!matchesSearch) return false;

            // 2. Brand Filter
            if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
                return false;
            }

            // 3. Price Filter (Based on 5ml price as a median reference, or check if ANY size fits)
            // Let's check if *any* size falls within range for maximum flexibility
            const prices = Object.values(product.prices);
            const minProductPrice = Math.min(...prices);
            const maxProductPrice = Math.max(...prices);

            // Overlap check: Product Range [min, max] overlaps with Filter Range [low, high]
            if (maxProductPrice < priceRange[0] || minProductPrice > priceRange[1]) {
                return false;
            }

            return true;
        });
    }, [searchQuery, selectedBrands, priceRange]);

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const clearFilters = () => {
        setSelectedBrands([]);
        setPriceRange([0, 500]);
        setSearchQuery("");
    };

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

                    {/* Filter bar */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative group w-full md:w-auto">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Buscar perfume, marca, nota..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-full py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all w-full md:w-80"
                            />
                        </div>
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className={clsx(
                                "p-3 border rounded-full transition-colors relative",
                                (selectedBrands.length > 0 || priceRange[0] > 0 || priceRange[1] < 500)
                                    ? "bg-primary text-black border-primary"
                                    : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                            )}
                        >
                            <SlidersHorizontal className="w-5 h-5" />
                            {(selectedBrands.length > 0) && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-black" />
                            )}
                        </button>
                    </div>
                </motion.div>

                {/* Results Info */}
                <div className="mb-6 text-white/40 text-sm">
                    Mostrando {filteredProducts.length} resultados
                </div>

                {/* Grid */}
                {filteredProducts.length > 0 ? (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        key={JSON.stringify(filteredProducts.map(p => p.id))} // Re-animate on change
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12"
                    >
                        {filteredProducts.map((product) => (
                            <motion.div key={product.id} variants={item}>
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-white/40 text-lg mb-4">No encontramos perfumes con esos criterios.</p>
                        <button onClick={clearFilters} className="text-primary underline">Limpiar filtros</button>
                    </div>
                )}
            </div>

            {/* Filter Sidebar Overlay */}
            <AnimatePresence>
                {isFilterOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsFilterOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-full max-w-sm bg-neutral-900 border-l border-white/10 z-50 p-6 overflow-y-auto shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-serif font-bold text-white">Filtros</h2>
                                <button onClick={() => setIsFilterOpen(false)} className="p-2 text-white/60 hover:text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Brands Filter */}
                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-4">Marcas</h3>
                                <div className="space-y-2">
                                    {allBrands.map(brand => (
                                        <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={clsx(
                                                "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                                                selectedBrands.includes(brand)
                                                    ? "bg-primary border-primary text-black"
                                                    : "border-white/20 group-hover:border-white/40"
                                            )}>
                                                {selectedBrands.includes(brand) && <Check className="w-3 h-3" />}
                                            </div>
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={selectedBrands.includes(brand)}
                                                onChange={() => toggleBrand(brand)}
                                            />
                                            <span className={clsx(
                                                "text-sm transition-colors",
                                                selectedBrands.includes(brand) ? "text-white" : "text-white/60 group-hover:text-white/80"
                                            )}>{brand}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-4">Precio (MXN)</h3>
                                <div className="flex gap-4 items-center">
                                    <div className="bg-white/5 border border-white/10 rounded px-3 py-2 flex-1">
                                        <span className="text-xs text-white/40 block">Min</span>
                                        <input
                                            type="number"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                            className="bg-transparent text-white w-full outline-none"
                                        />
                                    </div>
                                    <span className="text-white/40">-</span>
                                    <div className="bg-white/5 border border-white/10 rounded px-3 py-2 flex-1">
                                        <span className="text-xs text-white/40 block">Max</span>
                                        <input
                                            type="number"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                            className="bg-transparent text-white w-full outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={clearFilters}
                                className="w-full py-4 border border-white/10 text-white rounded hover:bg-white/5 mb-3"
                            >
                                Limpiar Filtros
                            </button>
                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="w-full py-4 bg-primary text-black font-bold uppercase tracking-widest rounded hover:bg-white transition-colors"
                            >
                                Ver {filteredProducts.length} Resultados
                            </button>

                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

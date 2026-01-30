"use client";

import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, Check, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.06 }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
};

const allBrands = Array.from(new Set(products.map(p => p.brand))).sort();

export default function CatalogPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 24;

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const query = searchQuery.toLowerCase();
            const matchesSearch =
                product.name.toLowerCase().includes(query) ||
                product.brand.toLowerCase().includes(query) ||
                product.notes.some(note => note.toLowerCase().includes(query));

            if (!matchesSearch) return false;
            if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;

            const prices = Object.values(product.prices);
            const minProductPrice = Math.min(...prices);
            const maxProductPrice = Math.max(...prices);

            if (maxProductPrice < priceRange[0] || minProductPrice > priceRange[1]) return false;

            return true;
        });
    }, [searchQuery, selectedBrands, priceRange]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Reset page when filters change
    useMemo(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedBrands, priceRange]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const clearFilters = () => {
        setSelectedBrands([]);
        setPriceRange([0, 500]);
        setSearchQuery("");
        setCurrentPage(1);
    };

    const hasActiveFilters = selectedBrands.length > 0 || priceRange[0] > 0 || priceRange[1] < 500;

    return (
        <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-6">
            <div className="container mx-auto max-w-7xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    {/* Top section with title and filters */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/5">
                        <div className="max-w-2xl">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-4"
                            >
                                <Sparkles className="w-4 h-4" />
                                Colección 2024
                            </motion.span>
                            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight mb-4">
                                Catálogo
                            </h1>
                            <p className="text-white/50 text-lg font-light">
                                Descubre tu próxima firma olfativa entre nuestra selección curada de fragancias de diseñador y nicho.
                            </p>
                        </div>

                        {/* Search and Filter */}
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <div className="relative group flex-1 lg:flex-initial">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-[#D4AF37] transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Buscar perfume, marca, nota..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    data-testid="catalog-search-input"
                                    className="w-full lg:w-80 bg-white/5 border border-white/10 rounded-full py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/[0.07] transition-all duration-300"
                                />
                            </div>
                            <motion.button
                                onClick={() => setIsFilterOpen(true)}
                                data-testid="catalog-filter-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={cn(
                                    "relative p-3.5 border rounded-full transition-all duration-300",
                                    hasActiveFilters
                                        ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                                        : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20"
                                )}
                            >
                                <SlidersHorizontal className="w-5 h-5" />
                                {hasActiveFilters && (
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#050505]" />
                                )}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Results Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-between mb-8"
                >
                    <p className="text-white/40 text-sm">
                        Mostrando <span className="text-white font-medium">{filteredProducts.length}</span> fragancias
                    </p>
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="text-[#D4AF37] text-sm hover:underline"
                        >
                            Limpiar filtros
                        </button>
                    )}
                </motion.div>

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <>
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            key={`${JSON.stringify(paginatedProducts.map(p => p.id))}-${currentPage}`}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {paginatedProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    variants={item}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-16">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-6 py-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Anterior
                                </button>
                                <span className="text-white/40 text-sm">
                                    Página <span className="text-[#D4AF37] font-medium">{currentPage}</span> de {totalPages}
                                </span>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-6 py-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Siguiente
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-24"
                    >
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                            <Search className="w-8 h-8 text-white/20" />
                        </div>
                        <p className="text-white/50 text-xl mb-2">No encontramos perfumes</p>
                        <p className="text-white/30 text-sm mb-6">Intenta con otros criterios de búsqueda</p>
                        <button
                            onClick={clearFilters}
                            className="px-6 py-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-sm font-medium hover:bg-[#D4AF37]/20 transition-colors"
                        >
                            Limpiar filtros
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Filter Sidebar */}
            <AnimatePresence>
                {isFilterOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsFilterOpen(false)}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed inset-y-0 right-0 w-full max-w-sm glass z-50 p-6 overflow-y-auto"
                        >
                            {/* Filter Header */}
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-2xl font-serif font-bold text-white">Filtros</h2>
                                <motion.button
                                    onClick={() => setIsFilterOpen(false)}
                                    data-testid="filter-close-btn"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </motion.button>
                            </div>

                            {/* Brands Filter */}
                            <div className="mb-10">
                                <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-5">Marcas</h3>
                                <div className="space-y-2">
                                    {allBrands.map(brand => (
                                        <label
                                            key={brand}
                                            className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-white/5 transition-colors"
                                        >
                                            <div className={cn(
                                                "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300",
                                                selectedBrands.includes(brand)
                                                    ? "bg-[#D4AF37] border-[#D4AF37]"
                                                    : "border-white/20 group-hover:border-white/40"
                                            )}>
                                                {selectedBrands.includes(brand) && (
                                                    <Check className="w-3 h-3 text-black" />
                                                )}
                                            </div>
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={selectedBrands.includes(brand)}
                                                onChange={() => toggleBrand(brand)}
                                            />
                                            <span className={cn(
                                                "text-sm transition-colors",
                                                selectedBrands.includes(brand) ? "text-white" : "text-white/60 group-hover:text-white"
                                            )}>{brand}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-10">
                                <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-5">Precio (MXN)</h3>
                                <div className="flex gap-4 items-center">
                                    <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3">
                                        <span className="text-[10px] text-white/40 uppercase tracking-wider block mb-1">Mínimo</span>
                                        <input
                                            type="number"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                            className="bg-transparent text-white w-full outline-none text-lg font-medium"
                                        />
                                    </div>
                                    <span className="text-white/30">—</span>
                                    <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3">
                                        <span className="text-[10px] text-white/40 uppercase tracking-wider block mb-1">Máximo</span>
                                        <input
                                            type="number"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                            className="bg-transparent text-white w-full outline-none text-lg font-medium"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3 sticky bottom-0 pt-6 bg-gradient-to-t from-[#0A0A0A] to-transparent">
                                <button
                                    onClick={clearFilters}
                                    className="w-full py-4 border border-white/10 text-white rounded-full hover:bg-white/5 transition-colors font-medium"
                                >
                                    Limpiar Filtros
                                </button>
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    data-testid="filter-apply-btn"
                                    className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest rounded-full hover:bg-[#F4CF57] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                                >
                                    Ver {filteredProducts.length} Resultados
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

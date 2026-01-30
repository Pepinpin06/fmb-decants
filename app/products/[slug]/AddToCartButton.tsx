"use client";

import { useState } from 'react';
import { Product, DecantSize } from '@/lib/types';
import { useCart } from '@/lib/cart-context';
import { ShoppingBag, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function AddToCartButton({ product }: { product: Product }) {
    const [selectedSize, setSelectedSize] = useState<DecantSize>(5);
    const { addItem, setIsOpen } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addItem(product, selectedSize);
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
            setIsOpen(true);
        }, 800);
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Size Selector */}
            <div>
                <div className="flex justify-between items-baseline mb-5">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">
                        Selecciona Tamaño
                    </label>
                    <motion.div
                        key={selectedSize}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-right"
                    >
                        <span className="text-3xl font-serif font-bold text-gradient-gold">
                            ${product.prices[selectedSize]}
                        </span>
                        <span className="text-sm font-normal text-white/40 ml-2">MXN</span>
                    </motion.div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {[3, 5, 10].map((size) => (
                        <motion.button
                            key={size}
                            onClick={() => setSelectedSize(size as DecantSize)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            data-testid={`size-selector-${size}ml`}
                            className={cn(
                                "relative p-5 border rounded-2xl text-center transition-all duration-300 overflow-hidden",
                                selectedSize === size
                                    ? "border-[#D4AF37] bg-[#D4AF37]/10"
                                    : "border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/5"
                            )}
                        >
                            {selectedSize === size && (
                                <motion.div
                                    layoutId="selectedSize"
                                    className="absolute inset-0 border-2 border-[#D4AF37] rounded-2xl"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <div className="relative z-10">
                                <span className={cn(
                                    "block text-2xl font-bold mb-1 transition-colors",
                                    selectedSize === size ? "text-[#D4AF37]" : "text-white"
                                )}>
                                    {size} ml
                                </span>
                                <span className={cn(
                                    "text-xs transition-colors",
                                    selectedSize === size ? "text-[#D4AF37]/70" : "text-white/40"
                                )}>
                                    Decant
                                </span>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Add Button */}
            <motion.button
                onClick={handleAddToCart}
                disabled={isAdded}
                whileHover={{ scale: isAdded ? 1 : 1.02 }}
                whileTap={{ scale: isAdded ? 1 : 0.98 }}
                data-testid="add-to-cart-btn"
                className={cn(
                    "w-full py-5 font-bold text-sm uppercase tracking-widest rounded-full flex items-center justify-center gap-3 transition-all duration-300",
                    isAdded
                        ? "bg-green-500 text-white"
                        : "bg-[#D4AF37] text-black hover:bg-[#F4CF57] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]"
                )}
            >
                <AnimatePresence mode="wait">
                    {isAdded ? (
                        <motion.span
                            key="added"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2"
                        >
                            <Check className="w-5 h-5" />
                            ¡Agregado!
                        </motion.span>
                    ) : (
                        <motion.span
                            key="add"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Agregar al Carrito
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Info */}
            <div className="flex items-center justify-center gap-2 text-xs text-white/30">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Envío calculado al finalizar. Pagos 100% seguros.</span>
            </div>
        </div>
    );
}

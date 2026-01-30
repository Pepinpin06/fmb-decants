"use client";

import { useCart } from "@/lib/cart-context";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
    const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal } = useCart();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 400);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
                onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: isOpen ? 0 : "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed inset-y-0 right-0 w-full max-w-md glass z-[70] shadow-2xl flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <h2 className="text-xl font-serif font-bold text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                            <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                        </div>
                        Tu Carrito
                        {items.length > 0 && (
                            <span className="text-sm font-normal text-white/50">({items.length})</span>
                        )}
                    </h2>
                    <motion.button
                        onClick={() => setIsOpen(false)}
                        data-testid="cart-close-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/60 hover:text-white"
                    >
                        <X className="w-6 h-6" />
                    </motion.button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    <AnimatePresence mode="popLayout">
                        {items.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="h-full flex flex-col items-center justify-center text-center space-y-6"
                            >
                                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center">
                                    <ShoppingBag className="w-10 h-10 text-white/20" />
                                </div>
                                <div>
                                    <p className="text-white/60 text-lg mb-2">Tu carrito está vacío</p>
                                    <p className="text-white/30 text-sm">Explora nuestras fragancias exclusivas</p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="px-6 py-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-sm font-medium hover:bg-[#D4AF37]/20 transition-colors"
                                >
                                    Explorar Catálogo
                                </button>
                            </motion.div>
                        ) : (
                            items.map((item, index) => (
                                <motion.div
                                    key={`${item.productId}-${item.size}`}
                                    layout
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                                >
                                    {/* Product Image */}
                                    <div className="relative w-20 h-24 bg-[#121212] rounded-lg overflow-hidden shrink-0">
                                        <Image
                                            src={item.product.image}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        {/* Brand & Name */}
                                        <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.15em] uppercase mb-1">
                                            {item.product.brand}
                                        </p>
                                        <h3 className="text-sm font-bold text-white leading-tight truncate">
                                            {item.product.name}
                                        </h3>
                                        <p className="text-xs text-white/40 mt-1">{item.size}ml Decant</p>

                                        {/* Quantity & Price */}
                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center gap-1 bg-black/40 rounded-full p-1">
                                                <motion.button
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                                                    data-testid={`cart-item-decrease-${item.productId}-${item.size}`}
                                                    className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors disabled:opacity-30"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </motion.button>
                                                <span className="text-sm w-6 text-center font-medium">{item.quantity}</span>
                                                <motion.button
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                                                    data-testid={`cart-item-increase-${item.productId}-${item.size}`}
                                                    className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </motion.button>
                                            </div>
                                            <p className="text-sm font-bold text-[#D4AF37]">
                                                ${item.product.prices[item.size] * item.quantity}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Remove Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => removeItem(item.productId, item.size)}
                                        data-testid={`cart-item-remove-${item.productId}-${item.size}`}
                                        className="p-2 text-white/30 hover:text-red-400 transition-colors self-start"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </motion.button>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-6 border-t border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl">
                        {/* Subtotal */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-white/50">Subtotal</span>
                            <span className="text-2xl font-bold text-white">
                                ${subtotal} <span className="text-xs font-normal text-white/40">MXN</span>
                            </span>
                        </div>

                        <p className="text-xs text-white/30 mb-6 text-center">
                            Impuestos y envío calculados al finalizar
                        </p>

                        {/* Checkout Button */}
                        <Link
                            href="/checkout"
                            onClick={() => setIsOpen(false)}
                            data-testid="cart-checkout-btn"
                            className="group flex items-center justify-center gap-3 w-full py-4 bg-[#D4AF37] text-black text-center font-bold uppercase tracking-widest rounded-full hover:bg-[#F4CF57] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                        >
                            Proceder al Pago
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                )}
            </motion.div>
        </>
    );
}

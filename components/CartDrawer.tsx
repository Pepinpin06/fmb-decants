"use client";

import { useCart } from "@/lib/cart-context";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartDrawer() {
    const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal } = useCart();
    const [isVisible, setIsVisible] = useState(false);

    // Handle animation delay
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-card border-l border-border z-[70] shadow-2xl flex flex-col transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Header */}
                <div className="p-4 border-b border-border flex items-center justify-between">
                    <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                        Tu Carrito
                    </h2>
                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
                            <ShoppingBag className="w-16 h-16 text-gray-600" />
                            <p>Tu carrito está vacío.</p>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-primary hover:underline text-sm"
                            >
                                Comienza a comprar
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={`${item.productId}-${item.size}`} className="flex gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
                                <div className="w-16 h-20 bg-neutral-800 rounded flex items-center justify-center flex-shrink-0">
                                    <span className="text-xl font-serif text-gray-500">{item.product.brand.charAt(0)}</span>
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-sm font-bold text-white leading-tight">{item.product.name}</h3>
                                    <p className="text-xs text-gray-400 mb-2">{item.size} ml Decant</p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 bg-black/40 rounded-lg p-1">
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                                                className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-sm w-4 text-center font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                                                className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <p className="text-sm font-bold text-primary">${item.product.prices[item.size] * item.quantity}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => removeItem(item.productId, item.size)}
                                    className="p-2 text-gray-500 hover:text-red-500 transition-colors self-start"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-4 border-t border-border bg-card">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-400">Subtotal</span>
                            <span className="text-xl font-bold text-white">${subtotal} <span className="text-xs font-normal">MXN</span></span>
                        </div>
                        <p className="text-xs text-gray-500 mb-4 text-center">Impuestos y envío calculados al finalizar.</p>
                        <Link
                            href="/checkout"
                            onClick={() => setIsOpen(false)}
                            className="block w-full py-4 bg-primary text-background text-center font-bold uppercase tracking-widest hover:bg-primary-hover transition-colors rounded-sm"
                        >
                            Proceder al Pago
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}

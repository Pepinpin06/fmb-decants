"use client";

import { useState } from 'react';
import { Product, DecantSize } from '@/lib/types';
import { useCart } from '@/lib/cart-context';
import { ShoppingBag, Check } from 'lucide-react';

export default function AddToCartButton({ product }: { product: Product }) {
    const [selectedSize, setSelectedSize] = useState<DecantSize>(3);
    const { addItem, setIsOpen } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addItem(product, selectedSize);
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
            setIsOpen(true);
        }, 500);
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Size Selector */}
            <div>
                <div className="flex justify-between items-baseline mb-4">
                    <label className="text-sm font-bold text-white uppercase tracking-wider">Selecciona Tamaño</label>
                    <span className="text-3xl font-serif font-bold text-primary">
                        ${product.prices[selectedSize]}
                        <span className="text-sm font-sans font-normal text-gray-500 ml-1">MXN</span>
                    </span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {[3, 5, 10].map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size as DecantSize)}
                            className={`p-4 border rounded-lg text-center transition-all duration-300 ${selectedSize === size
                                ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary'
                                : 'border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/5'
                                }`}
                        >
                            <span className="block text-lg font-bold">{size} ml</span>
                            <span className="text-xs opacity-60">Decant</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Add Button */}
            <button
                onClick={handleAddToCart}
                className="w-full py-5 bg-white text-black font-bold text-lg uppercase tracking-widest hover:bg-primary transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isAdded}
            >
                {isAdded ? (
                    <>
                        <Check className="w-5 h-5" /> Agregado
                    </>
                ) : (
                    <>
                        <ShoppingBag className="w-5 h-5" /> Agregar al Carrito
                    </>
                )}
            </button>

            <p className="text-xs text-center text-gray-500 mt-2">
                Envío calculado en el checkout. Pagos seguros con PayPal y Mercado Pago.
            </p>
        </div>
    );
}

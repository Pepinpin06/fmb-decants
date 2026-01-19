"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product, DecantSize } from './types';

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product, size: DecantSize) => void;
    removeItem: (productId: string, size: DecantSize) => void;
    updateQuantity: (productId: string, size: DecantSize, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    subtotal: number;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('fmb-cart');
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save to local storage
    useEffect(() => {
        localStorage.setItem('fmb-cart', JSON.stringify(items));
    }, [items]);

    const addItem = (product: Product, size: DecantSize) => {
        setItems(current => {
            const existing = current.find(item => item.productId === product.id && item.size === size);
            if (existing) {
                return current.map(item =>
                    (item.productId === product.id && item.size === size)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...current, { productId: product.id, size, quantity: 1, product }];
        });
        setIsOpen(true);
    };

    const removeItem = (productId: string, size: DecantSize) => {
        setItems(current => current.filter(item => !(item.productId === productId && item.size === size)));
    };

    const updateQuantity = (productId: string, size: DecantSize, quantity: number) => {
        if (quantity < 1) return;
        setItems(current =>
            current.map(item =>
                (item.productId === productId && item.size === size)
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => setItems([]);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + (item.product.prices[item.size] * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            items, addItem, removeItem, updateQuantity, clearCart,
            totalItems, subtotal, isOpen, setIsOpen
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

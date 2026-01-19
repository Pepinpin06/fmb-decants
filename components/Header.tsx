"use client";

import Link from 'next/link';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../lib/cart-context';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function Header() {
    const { totalItems, setIsOpen } = useCart();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const pathname = usePathname();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    const navLinks = [
        { name: 'Inicio', href: '/' },
        { name: 'Catálogo', href: '/catalog' },
        { name: 'Mis Pedidos', href: '/orders' },
    ];

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled
                    ? "bg-background/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-[0_5px_30px_-15px_rgba(0,0,0,0.5)]"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="relative z-50 group">
                    <span className="text-2xl font-serif font-bold tracking-tighter text-white group-hover:text-primary transition-colors duration-300">
                        FMB
                        <span className="text-primary group-hover:text-white transition-colors duration-300">.</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="relative text-sm font-medium text-white/80 hover:text-white transition-colors group py-2"
                        >
                            {link.name}
                            <span className={cn(
                                "absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left",
                                pathname === link.href && "scale-x-100"
                            )} />
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="relative group p-2 hover:bg-white/5 rounded-full transition-all duration-300"
                    >
                        <ShoppingBag className="w-5 h-5 text-white/90 group-hover:text-primary transition-colors" />
                        <AnimatePresence>
                            {totalItems > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute -top-0.5 -right-0.5 bg-primary text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden relative z-50 p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <motion.div
                            animate={mobileMenuOpen ? "open" : "closed"}
                            className="w-6 h-6 flex flex-col justify-center gap-1.5"
                        >
                            <motion.span
                                variants={{
                                    closed: { rotate: 0, y: 0 },
                                    open: { rotate: 45, y: 8 }
                                }}
                                className="w-full h-0.5 bg-white block origin-center transition-colors"
                            />
                            <motion.span
                                variants={{
                                    closed: { opacity: 1 },
                                    open: { opacity: 0 }
                                }}
                                className="w-full h-0.5 bg-white block transition-colors"
                            />
                            <motion.span
                                variants={{
                                    closed: { rotate: 0, y: 0 },
                                    open: { rotate: -45, y: -8 }
                                }}
                                className="w-full h-0.5 bg-white block origin-center transition-colors"
                            />
                        </motion.div>
                    </button>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl pt-24 px-6 md:hidden flex flex-col items-center justify-center gap-8"
                    >
                        {navLinks.map((link, idx) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * idx }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-3xl font-serif font-bold text-white hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

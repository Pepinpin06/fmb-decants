"use client";

import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
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

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    const navLinks = [
        { name: 'Inicio', href: '/' },
        { name: 'Catálogo', href: '/catalog' },
        { name: 'Nosotros', href: '/about' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Contacto', href: '/contact' },
        { name: 'Mis Pedidos', href: '/orders' },
    ];

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled
                    ? "glass py-4 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" data-testid="header-logo" className="relative z-50 group">
                    <motion.span
                        className="text-2xl md:text-3xl font-serif font-bold tracking-tighter text-white"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        FMB
                        <span className="text-[#D4AF37] group-hover:text-white transition-colors duration-300">.</span>
                    </motion.span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            data-testid={`nav-link-${link.href.replace('/', '') || 'home'}`}
                            className={cn(
                                "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full",
                                pathname === link.href
                                    ? "text-[#D4AF37]"
                                    : "text-white/70 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {link.name}
                            {pathname === link.href && (
                                <motion.span
                                    layoutId="activeNav"
                                    className="absolute inset-0 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full -z-10"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {/* Cart Button */}
                    <motion.button
                        onClick={() => setIsOpen(true)}
                        data-testid="cart-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                            "relative p-3 rounded-full transition-all duration-300",
                            totalItems > 0
                                ? "bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]"
                                : "hover:bg-white/5 text-white/80"
                        )}
                    >
                        <ShoppingBag className="w-5 h-5" />
                        <AnimatePresence>
                            {totalItems > 0 && (
                                <motion.span
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        className="md:hidden relative z-50 p-3 rounded-full hover:bg-white/5 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        data-testid="mobile-menu-toggle"
                        whileTap={{ scale: 0.95 }}
                    >
                        <AnimatePresence mode="wait">
                            {mobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="w-6 h-6 text-white" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu className="w-6 h-6 text-white" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-xl md:hidden"
                    >
                        <div className="h-full flex flex-col items-center justify-center gap-6 px-6">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ delay: 0.1 + idx * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        data-testid={`mobile-nav-${link.href.replace('/', '') || 'home'}`}
                                        className={cn(
                                            "text-4xl font-serif font-bold transition-colors",
                                            pathname === link.href ? "text-[#D4AF37]" : "text-white/80 hover:text-white"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Mobile Social Links */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-12 flex gap-6"
                            >
                                <a
                                    href="https://www.instagram.com/fmbdecants"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/40 hover:text-[#D4AF37] transition-colors"
                                >
                                    Instagram
                                </a>
                                <a
                                    href="https://www.tiktok.com/@fmb_decants"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/40 hover:text-[#D4AF37] transition-colors"
                                >
                                    TikTok
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

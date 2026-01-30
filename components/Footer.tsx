"use client";

import Link from 'next/link';
import { Instagram, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[#050505] border-t border-white/5 pt-20 pb-8 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

            <div className="container mx-auto px-6 max-w-7xl">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-6">
                            <span className="text-4xl font-serif font-bold text-white">
                                FMB<span className="text-[#D4AF37]">.</span>
                            </span>
                        </Link>
                        <p className="text-white/50 max-w-sm leading-relaxed mb-8">
                            Descubre el mundo de la alta perfumería con nuestros decants exclusivos.
                            Arte olfativo fraccionado para quienes buscan excelencia sin compromisos.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            <motion.a
                                href="https://www.instagram.com/fmbdecants"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="footer-instagram"
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300"
                            >
                                <Instagram className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                href="https://www.tiktok.com/@fmb_decants"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="footer-tiktok"
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </motion.a>
                            <motion.a
                                href="mailto:fmbdecants@gmail.com"
                                data-testid="footer-email"
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300"
                            >
                                <Mail className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-6">Navegación</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Catálogo Completo', href: '/catalog' },
                                { name: 'Sobre Nosotros', href: '/about' },
                                { name: 'Preguntas Frecuentes', href: '/faq' },
                                { name: 'Contacto', href: '/contact' },
                                { name: 'Mis Pedidos', href: '/orders' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        data-testid={`footer-link-${link.href.replace('/', '')}`}
                                        className="group flex items-center gap-2 text-white/50 hover:text-[#D4AF37] transition-colors duration-300"
                                    >
                                        <span className="animated-underline">{link.name}</span>
                                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-6">Contacto</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-white/50">
                                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                                <span>Ciudad de México, México</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/50">
                                <Mail className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                                <a href="mailto:fmbdecants@gmail.com" className="hover:text-[#D4AF37] transition-colors">
                                    fmbdecants@gmail.com
                                </a>
                            </li>
                        </ul>

                        {/* Newsletter hint */}
                        <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-xs text-white/40 leading-relaxed">
                                Síguenos en redes para enterarte de nuevas fragancias y ofertas exclusivas.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/30 text-sm">
                        © {currentYear} FMB Decants. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center gap-6 text-white/30 text-sm">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                            100% Originales
                        </span>
                        <span>•</span>
                        <span>Hecho con pasión en México</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-secondary text-accent py-12 mt-20 border-t border-border">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div>
                    <h3 className="text-xl font-serif font-bold text-primary mb-4">FMB Decants</h3>
                    <p className="text-sm opacity-80 leading-relaxed">
                        Descubre el mundo de la alta perfumería con nuestros decants exclusivos. Calidad y autenticidad garantizada en cada gota.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h4 className="text-lg font-medium text-white mb-4">Enlaces Rápidos</h4>
                    <ul className="space-y-2 text-sm opacity-80">
                        <li><Link href="/catalog" className="hover:text-primary transition-colors">Catálogo Completo</Link></li>
                        <li><Link href="/about" className="hover:text-primary transition-colors">Sobre Nosotros</Link></li>
                        <li><Link href="/faq" className="hover:text-primary transition-colors">Preguntas Frecuentes</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors">Contacto</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-lg font-medium text-white mb-4">Contacto</h4>
                    <ul className="space-y-2 text-sm opacity-80">
                        <li>CDMX, México</li>
                        <li>CP 14330</li>
                        <li>soporte@fmbdecants.com</li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h4 className="text-lg font-medium text-white mb-4">Síguenos</h4>
                    <div className="flex gap-4">
                        <a href="https://www.instagram.com/fmbdecants?igsh=MTY3NnhqbHVheHAydQ==" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="https://www.tiktok.com/@fmb_decants?_r=1&_t=ZS-93Bec3QcNfx" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            {/* Simple SVG for TikTok if Lucide doesn't have it */}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border/50 text-center text-xs opacity-60">
                <p>&copy; {new Date().getFullYear()} FMB Decants. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

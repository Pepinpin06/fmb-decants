"use client";

import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = [
    {
        q: "¿Qué es un decant?",
        a: "Un decant es una fracción del perfume original extraído directamente de la botella oficial y transferido a atomizadores más pequeños (3ml, 5ml, 10ml). Es exactamente la misma fragancia, solo en otra presentación más accesible.",
        category: "general"
    },
    {
        q: "¿Son originales los perfumes?",
        a: "Absolutamente. Garantizamos 100% de autenticidad en cada decant. No vendemos imitaciones ni 'clones'. Solo perfume real extraído de su botella original de marcas reconocidas.",
        category: "general"
    },
    {
        q: "¿Hacen envíos a todo México?",
        a: "Sí, enviamos a toda la República Mexicana. El costo y tiempo de envío depende de tu código postal, pero generalmente tarda de 2 a 5 días hábiles en llegar a tu domicilio.",
        category: "envios"
    },
    {
        q: "¿Cómo protegen los envíos?",
        a: "Usamos plástico burbuja de alta densidad y cajas reforzadas para asegurar que tu decant llegue intacto. Cada atomizador va sellado para evitar derrames durante el transporte.",
        category: "envios"
    },
    {
        q: "¿Cuánto dura un decant de 5ml?",
        a: "Dependiendo de tu uso, un decant de 5ml puede durar entre 1 y 2 meses con uso diario (2-3 aplicaciones). Es perfecto para probar una fragancia antes de comprar la botella completa.",
        category: "producto"
    },
    {
        q: "¿Ofrecen garantía de satisfacción?",
        a: "Si recibes un producto dañado o diferente al ordenado, contáctanos dentro de las primeras 48 horas después de recibirlo. Te ayudaremos a resolver cualquier inconveniente.",
        category: "general"
    },
    {
        q: "¿Aceptan devoluciones?",
        a: "Por la naturaleza del producto (fragancias), no aceptamos devoluciones por cambio de opinión. Sin embargo, si hay algún problema con tu pedido, estamos para ayudarte.",
        category: "general"
    },
    {
        q: "¿Cómo puedo pagar?",
        a: "Aceptamos PayPal, tarjetas de crédito/débito a través de PayPal, y transferencias bancarias. Todos los pagos son procesados de forma segura.",
        category: "pagos"
    },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="min-h-screen bg-[#050505] pt-28 pb-20">
            <div className="container mx-auto px-6 max-w-3xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-6">
                        <HelpCircle className="w-4 h-4" />
                        Centro de Ayuda
                    </span>
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
                        Preguntas{" "}
                        <span className="text-gradient-gold italic">Frecuentes</span>
                    </h1>
                    <p className="text-white/50 text-lg">
                        Resolvemos tus dudas sobre el mundo de los decants.
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={cn(
                                "rounded-2xl border overflow-hidden transition-all duration-300",
                                openIndex === i
                                    ? "bg-white/[0.03] border-[#D4AF37]/30"
                                    : "bg-white/[0.02] border-white/5 hover:border-white/10"
                            )}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                data-testid={`faq-question-${i}`}
                                className="w-full p-6 flex items-center justify-between text-left group"
                            >
                                <span className={cn(
                                    "font-bold text-lg transition-colors",
                                    openIndex === i ? "text-[#D4AF37]" : "text-white group-hover:text-white/90"
                                )}>
                                    {faq.q}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 ml-4 transition-colors",
                                        openIndex === i
                                            ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                                            : "bg-white/5 text-white/40"
                                    )}
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                    >
                                        <div className="px-6 pb-6">
                                            <div className="pt-2 border-t border-white/5">
                                                <p className="text-white/60 leading-relaxed pt-4">
                                                    {faq.a}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <div className="p-10 rounded-3xl glass-light border border-white/5">
                        <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-3 font-serif">¿Tienes más preguntas?</h3>
                        <p className="text-white/50 mb-6">
                            Estamos aquí para ayudarte con cualquier duda
                        </p>
                        <a
                            href="/contact"
                            className="inline-block px-8 py-3 bg-[#D4AF37] text-black font-bold text-sm uppercase tracking-widest rounded-full hover:bg-[#F4CF57] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                        >
                            Contáctanos
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

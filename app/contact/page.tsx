"use client";

import { Mail, MapPin, Send, Loader2, CheckCircle, AlertCircle, Instagram, MessageCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-[#050505] pt-28 pb-20">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left Column - Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase block mb-6">
                            Estamos aquí
                        </span>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-[0.95]">
                            Contáctanos
                        </h1>
                        <p className="text-white/50 text-lg leading-relaxed mb-12">
                            Estamos aquí para ayudarte a encontrar tu fragancia ideal.
                            Escríbenos para dudas sobre envíos, recomendaciones o pedidos especiales.
                        </p>

                        {/* Contact Cards */}
                        <div className="space-y-4 mb-12">
                            <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-start gap-4 p-5 rounded-2xl glass-light group cursor-default"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Email</h3>
                                    <a href="mailto:fmbdecants@gmail.com" className="text-white/50 hover:text-[#D4AF37] transition-colors">
                                        fmbdecants@gmail.com
                                    </a>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-start gap-4 p-5 rounded-2xl glass-light group cursor-default"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Ubicación</h3>
                                    <p className="text-white/50">Ciudad de México, México</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h4 className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] mb-4">Síguenos</h4>
                            <div className="flex gap-3">
                                <motion.a
                                    href="https://www.instagram.com/fmbdecants"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all"
                                >
                                    <Instagram className="w-5 h-5" />
                                    <span className="text-sm">Instagram</span>
                                </motion.a>
                                <motion.a
                                    href="https://www.tiktok.com/@fmb_decants"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    <span className="text-sm">TikTok</span>
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="p-8 md:p-10 rounded-3xl glass border border-white/10">
                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="h-full flex flex-col items-center justify-center text-center py-16"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-6">
                                            <CheckCircle className="w-10 h-10 text-[#D4AF37]" />
                                        </div>
                                        <h3 className="text-2xl font-serif font-bold text-white mb-3">¡Mensaje Enviado!</h3>
                                        <p className="text-white/50 max-w-xs mb-8">
                                            Gracias por contactarnos. Te responderemos a la brevedad posible.
                                        </p>
                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="text-[#D4AF37] hover:underline text-sm"
                                        >
                                            Enviar otro mensaje
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-2xl font-serif font-bold text-white mb-6">Envíanos un mensaje</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-bold text-white/40 uppercase tracking-wider">Nombre</label>
                                                <input
                                                    required
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    type="text"
                                                    data-testid="contact-name-input"
                                                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-[#D4AF37]/50 focus:bg-white/[0.07] outline-none transition-all"
                                                    placeholder="Tu nombre"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-bold text-white/40 uppercase tracking-wider">Email</label>
                                                <input
                                                    required
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    type="email"
                                                    data-testid="contact-email-input"
                                                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-[#D4AF37]/50 focus:bg-white/[0.07] outline-none transition-all"
                                                    placeholder="tu@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold text-white/40 uppercase tracking-wider">Mensaje</label>
                                            <textarea
                                                required
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={5}
                                                data-testid="contact-message-input"
                                                className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-[#D4AF37]/50 focus:bg-white/[0.07] outline-none transition-all resize-none"
                                                placeholder="¿En qué podemos ayudarte?"
                                            ></textarea>
                                        </div>

                                        {status === 'error' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-center gap-3 text-red-400 text-sm bg-red-400/10 p-4 rounded-xl border border-red-400/20"
                                            >
                                                <AlertCircle className="w-5 h-5 shrink-0" />
                                                <span>Hubo un error al enviar el mensaje. Inténtalo de nuevo.</span>
                                            </motion.div>
                                        )}

                                        <motion.button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                                            whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                                            data-testid="contact-submit-btn"
                                            className={cn(
                                                "w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest rounded-full flex items-center justify-center gap-3 transition-all duration-300",
                                                status === 'loading'
                                                    ? "opacity-70 cursor-not-allowed"
                                                    : "hover:bg-[#F4CF57] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                                            )}
                                        >
                                            {status === 'loading' ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Enviando...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" />
                                                    Enviar Mensaje
                                                </>
                                            )}
                                        </motion.button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { Sparkles, Trophy, Users, Heart, Target, Gem } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AnimatedSection = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default function AboutPage() {
    const values = [
        {
            icon: <Sparkles className="w-6 h-6" />,
            title: "Autenticidad",
            desc: "Cada decant es extraído meticulosamente de botellas originales. Garantizamos 100% autenticidad en cada gota.",
            color: "from-[#D4AF37]/20"
        },
        {
            icon: <Trophy className="w-6 h-6" />,
            title: "Excelencia",
            desc: "Seleccionamos solo las fragancias más icónicas y deseadas del mundo de la perfumería.",
            color: "from-[#1B93A4]/20"
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Comunidad",
            desc: "Miles de apasionados por las fragancias confían en nosotros para expandir su colección olfativa.",
            color: "from-[#D4AF37]/20"
        },
        {
            icon: <Heart className="w-6 h-6" />,
            title: "Pasión",
            desc: "Nuestro amor por la perfumería nos impulsa a ofrecer siempre la mejor experiencia.",
            color: "from-[#1B93A4]/20"
        },
        {
            icon: <Target className="w-6 h-6" />,
            title: "Accesibilidad",
            desc: "Democratizamos el acceso a fragancias de lujo. Sin comprometer la cartera.",
            color: "from-[#D4AF37]/20"
        },
        {
            icon: <Gem className="w-6 h-6" />,
            title: "Calidad Premium",
            desc: "Empaque de alta calidad que protege y realza cada fragancia que enviamos.",
            color: "from-[#1B93A4]/20"
        },
    ];

    return (
        <div className="min-h-screen bg-[#050505] pt-28 pb-20">
            {/* Hero Section */}
            <div className="container mx-auto px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <span className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-6">
                        <Sparkles className="w-4 h-4" />
                        Nuestra Historia
                        <Sparkles className="w-4 h-4" />
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-[0.95]">
                        Más que perfumes,{" "}
                        <span className="text-gradient-gold italic">experiencias.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed max-w-3xl mx-auto">
                        Nacimos con una misión simple: democratizar el acceso a la alta perfumería.
                        Creemos que cada persona merece tener una colección olfativa que cuente su historia.
                    </p>
                </motion.div>

                {/* Mission Statement */}
                <AnimatedSection className="mb-24">
                    <div className="relative p-12 md:p-16 rounded-3xl glass border border-white/10 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-[#1B93A4]/5" />
                        <div className="relative z-10 text-center">
                            <span className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase block mb-6">Nuestra Misión</span>
                            <p className="text-2xl md:text-3xl font-serif text-white leading-relaxed">
                                "Hacer que cada persona pueda{" "}
                                <span className="text-[#D4AF37]">explorar, descubrir y poseer</span>{" "}
                                las fragancias más exclusivas del mundo,
                                sin necesidad de comprar la botella completa."
                            </p>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Values Grid */}
                <AnimatedSection className="mb-24">
                    <div className="text-center mb-12">
                        <span className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase block mb-4">Lo Que Nos Define</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Nuestros Valores</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group relative p-8 rounded-2xl glass-light overflow-hidden cursor-default"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br ${value.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform duration-300">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 font-serif">{value.title}</h3>
                                    <p className="text-white/50 text-sm leading-relaxed">{value.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Quote Section */}
                <AnimatedSection>
                    <div className="text-center py-16 border-t border-white/5">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="text-2xl md:text-3xl text-white/40 italic font-serif mb-6">
                                "El perfume es la forma más intensa del recuerdo."
                            </p>
                            <p className="text-[#D4AF37] font-bold tracking-wider">— Jean Paul Gaultier</p>
                        </motion.div>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
}

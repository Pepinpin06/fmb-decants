"use client";

import { motion } from "framer-motion";

interface Accord {
    name: string;
    value: number;
    color: string;
}

export default function ProductAccords({ accords }: { accords: Accord[] }) {
    return (
        <div>
            <h3 className="text-xs font-bold text-white/40 tracking-[0.2em] uppercase mb-5">
                Perfil Olfativo
            </h3>
            <div className="space-y-3">
                {accords.map((accord, index) => (
                    <motion.div
                        key={accord.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="group"
                    >
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm text-white/70 font-medium">{accord.name}</span>
                            <span className="text-xs text-white/40">{accord.value}%</span>
                        </div>
                        <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            {/* Background glow */}
                            <motion.div
                                initial={{ width: "0%" }}
                                whileInView={{ width: `${accord.value}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: index * 0.08, ease: "easeOut" }}
                                className="absolute top-0 left-0 h-full rounded-full blur-sm opacity-50"
                                style={{ backgroundColor: accord.color }}
                            />
                            {/* Main bar */}
                            <motion.div
                                initial={{ width: "0%" }}
                                whileInView={{ width: `${accord.value}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: index * 0.08, ease: "easeOut" }}
                                className="absolute top-0 left-0 h-full rounded-full"
                                style={{
                                    backgroundColor: accord.color,
                                    boxShadow: `0 0 15px ${accord.color}60`
                                }}
                            />
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-full" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

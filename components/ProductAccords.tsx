"use client";

import { motion } from "framer-motion";

interface Accord {
    name: string;
    value: number;
    color: string;
}

export default function ProductAccords({ accords }: { accords: Accord[] }) {
    return (
        <div className="mb-12">
            <h3 className="text-xs font-bold text-gray-400 tracking-[0.2em] uppercase mb-4">Perfil (Acordes)</h3>
            <div className="space-y-3">
                {accords.map((accord, index) => (
                    <motion.div
                        key={accord.name}
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                        className="relative h-8 w-full bg-white/5 rounded-full overflow-hidden border border-white/5"
                    >
                        {/* Bar */}
                        <motion.div
                            initial={{ width: "0%" }}
                            whileInView={{ width: `${accord.value}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: index * 0.1, type: "spring", bounce: 0 }}
                            className="absolute top-0 left-0 h-full rounded-l-full"
                            style={{
                                backgroundColor: accord.color,
                                boxShadow: `0 0 20px ${accord.color}40`
                            }}
                        />

                        {/* Glass Shine Effect */}
                        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

                        {/* Label */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                            <span
                                className="text-[10px] font-bold uppercase tracking-widest drop-shadow-md px-2 py-0.5 rounded"
                                style={{
                                    color: accord.value > 50 ? (['#F5F5DC', '#FFFF00', '#ADD8E6', '#F3E5AB', '#E6E6FA'].includes(accord.color) ? 'black' : 'white') : 'white',
                                    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                                }}
                            >
                                {accord.name}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

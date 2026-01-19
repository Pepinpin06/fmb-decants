import { Plus } from "lucide-react";

export default function FAQPage() {
    const faqs = [
        { q: "¿Qué es un decant?", a: "Un decant es una fracción del perfume original extraído directamente de la botella oficial y transferido a atomizadores más pequeños (3ml, 5ml, 10ml). Es la misma fragancia, solo en otra presentación." },
        { q: "¿Son originales?", a: "Absolutamente. Garantizamos 100% de autenticidad. No vendemos imitaciones ni 'clones'. Solo perfume real extraído de su botella original." },
        { q: "¿Hacen envíos a todo México?", a: "Sí, enviamos a toda la república. El costo y tiempo depende de tu código postal, pero generalmente tarda de 2 a 5 días hábiles." },
        { q: "¿Cómo protegen los envíos?", a: "Usamos plástico burbuja de alta densidad para asegurar que tu decant llegue intacto, sin derrames ni roturas." },
    ];

    return (
        <div className="min-h-screen bg-neutral-950 pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Preguntas Frecuentes</h1>
                    <p className="text-gray-400">Resolvemos tus dudas sobre el mundo de los decants.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden group">
                            <div className="p-6 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors">
                                <h3 className="font-bold text-white text-lg">{faq.q}</h3>
                                <Plus className="w-5 h-5 text-primary group-hover:rotate-90 transition-transform duration-300" />
                            </div>
                            <div className="px-6 pb-6 text-gray-400 leading-relaxed hidden group-hover:block animate-fade-in">
                                {faq.a}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

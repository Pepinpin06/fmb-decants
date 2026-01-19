import { Sparkles, Trophy, Users } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-neutral-950 pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Nuestra Historia</span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Más que perfumes, experiencias.</h1>
                    <p className="text-xl text-gray-400 font-light leading-relaxed">
                        Nacimos con una misión simple: democratizar el acceso a la alta perfumería. Creemos que cada persona merece tener una colección olfativa que cuente su historia.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {[
                        { icon: <Sparkles className="w-8 h-8" />, title: "Calidad", desc: "Decants extraídos meticulosamente." },
                        { icon: <Trophy className="w-8 h-8" />, title: "Originalidad", desc: "100% auténticos. Cero imitaciones." },
                        { icon: <Users className="w-8 h-8" />, title: "Comunidad", desc: "Miles de apasionados confían en nosotros." }
                    ].map((item, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-lg text-center hover:bg-white/10 transition-colors">
                            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-400 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="border-t border-white/10 pt-16 text-center">
                    <p className="text-gray-500 italic">"El perfume es la forma más intensa del recuerdo."</p>
                    <p className="text-primary mt-2 font-bold">— Jean Paul Gaultier</p>
                </div>
            </div>
        </div>
    );
}

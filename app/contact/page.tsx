import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-neutral-950 pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Contáctanos</h1>
                        <p className="text-gray-400 mb-12">
                            Estamos aquí para ayudarte a encontrar tu fragancia ideal. Escríbenos para dudas sobre envíos, recomendaciones o pedidos especiales.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Email</h3>
                                    <p className="text-gray-400">fmbdecants@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">WhatsApp</h3>
                                    <p className="text-gray-400">+52 55 </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Ubicación</h3>
                                    <p className="text-gray-400">Ciudad de México, México</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Nombre</label>
                                    <input type="text" className="bg-neutral-900 border border-white/10 rounded p-3 text-white focus:border-primary outline-none" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                                    <input type="email" className="bg-neutral-900 border border-white/10 rounded p-3 text-white focus:border-primary outline-none" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Mensaje</label>
                                <textarea rows={4} className="bg-neutral-900 border border-white/10 rounded p-3 text-white focus:border-primary outline-none"></textarea>
                            </div>
                            <button className="w-full bg-primary text-black font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors">
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

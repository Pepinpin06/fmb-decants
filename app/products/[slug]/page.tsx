import { products } from "@/lib/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export default async function ProductPage({ params }: PageProps) {
    const { slug } = await params;
    const product = products.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12 md:py-20 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                {/* Product Image Stage */}
                <div className="relative aspect-[3/4] bg-neutral-900 rounded-lg overflow-hidden border border-white/5 sticky top-24">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                        {/* Ambient detail can go here */}
                    </div>
                </div>

                {/* Product Details */}
                <div className="flex flex-col">
                    <span className="text-secondary-foreground/60 text-sm tracking-widest uppercase mb-4">{product.brand}</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-none">
                        {product.name}
                    </h1>

                    {/* La Esencia (Description) */}
                    <div className="mb-8">
                        <h3 className="text-xs font-bold text-gray-400 tracking-[0.2em] uppercase mb-4">La Esencia</h3>
                        <p className="text-xl md:text-2xl text-gray-200 font-serif italic leading-relaxed">
                            "{product.description}"
                        </p>
                    </div>

                    {/* Notas Olfativas */}
                    <div className="mb-10">
                        <h3 className="text-xs font-bold text-gray-400 tracking-[0.2em] uppercase mb-4">Notas Olfativas</h3>
                        <div className="flex flex-wrap gap-2">
                            {product.notes.map((note) => (
                                <span
                                    key={note}
                                    className="px-3 py-1.5 border border-white/10 rounded text-xs font-medium text-gray-300 bg-white/5 uppercase tracking-wide hover:bg-white/10 transition-colors"
                                >
                                    {note}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Perfil (Acordes) */}
                    {product.accords && (
                        <div className="mb-12">
                            <h3 className="text-xs font-bold text-gray-400 tracking-[0.2em] uppercase mb-4">Perfil (Acordes)</h3>
                            <div className="space-y-3">
                                {product.accords.map((accord) => (
                                    <div key={accord.name} className="relative h-8 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        {/* Bar */}
                                        <div
                                            className="absolute top-0 left-0 h-full rounded-l-full transition-all duration-1000 ease-out"
                                            style={{
                                                width: `${accord.value}%`,
                                                backgroundColor: accord.color,
                                                boxShadow: `0 0 20px ${accord.color}40`
                                            }}
                                        />

                                        {/* Glass Shine Effect */}
                                        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />

                                        {/* Label */}
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="h-px w-full bg-white/10 mb-10" />

                    {/* Pricing & Cart Action (Client Component) */}
                    <AddToCartButton product={product} />

                </div>
            </div>
        </div>
    );
}

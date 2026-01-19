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

                    <div className="prose prose-invert prose-lg mb-8 text-gray-300 font-light leading-relaxed">
                        <p>{product.description}</p>
                    </div>

                    {/* Olfactory Notes */}
                    <div className="mb-10">
                        <h3 className="text-sm font-bold text-primary tracking-widest uppercase mb-4">Notas Olfativas</h3>
                        <div className="flex flex-wrap gap-2">
                            {product.notes.map((note) => (
                                <span
                                    key={note}
                                    className="px-4 py-2 border border-white/10 rounded-full text-sm text-gray-300 bg-white/5 hover:border-primary/30 transition-colors"
                                >
                                    {note}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="h-px w-full bg-white/10 mb-10" />

                    {/* Pricing & Cart Action (Client Component) */}
                    <AddToCartButton product={product} />

                </div>
            </div>
        </div>
    );
}

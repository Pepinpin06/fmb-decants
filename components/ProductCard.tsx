import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../lib/types';
import { ArrowRight } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={`/products/${product.slug}`} className="group block h-full">
            <div className="bg-card border border-border rounded-lg overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Tag if featured (optional) */}
                    {product.isFeatured && (
                        <span className="absolute top-2 right-2 bg-primary text-black text-xs font-bold px-2 py-1 rounded">
                            DESTACADO
                        </span>
                    )}
                </div>

                <div className="p-4 flex-1 flex flex-col">
                    <p className="text-xs text-primary font-medium tracking-wider mb-1 uppercase">{product.brand}</p>
                    <h3 className="text-lg font-serif font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-sm text-gray-400">Desde</span>
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-white">${product.prices[3]}</span>
                            <ArrowRight className="w-4 h-4 text-primary -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

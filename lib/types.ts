export type DecantSize = 3 | 5 | 10;

export interface PerfumeNote {
    name: string;
    type: 'top' | 'heart' | 'base';
}

export interface Product {
    id: string;
    name: string;
    brand: string;
    slug: string;
    description: string;
    image: string; // URL placeholder
    notes: string[]; // Simplification for now
    prices: {
        [key in DecantSize]: number; // Price for each size
    };
    isFeatured?: boolean;
}

export interface CartItem {
    productId: string;
    size: DecantSize;
    quantity: number;
    product: Product;
}

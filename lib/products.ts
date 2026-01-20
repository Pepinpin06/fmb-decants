import { Product } from './types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Le Beau Le Parfum',
        brand: 'Jean Paul Gaultier',
        slug: 'le-beau-le-parfum',
        description: 'Una interpretación diabólicamente irresistible. La frescura del jengibre y la piña se fusiona con la sensualidad viril del sándalo.',
        image: 'https://i.imgur.com/a04sjov.png',
        notes: ['Piña', 'Iris', 'Ciprés', 'Jengibre', 'Coco', 'Haba Tonka', 'Sándalo', 'Ambar', 'Notas Amaderadas'],
        accords:         [
                  {
                            name: 'Coco',
                            value: 100,
                            color: '#F5F5DC'
                  },
                  {
                            name: 'Dulce',
                            value: 90,
                            color: '#FF69B4'
                  },
                  {
                            name: 'Amaderado',
                            value: 85,
                            color: '#8B4513'
                  },
                  {
                            name: 'Ambarado',
                            value: 70,
                            color: '#FF8C00'
                  },
                  {
                            name: 'Tropical',
                            value: 65,
                            color: '#FFD700'
                  },
                  {
                            name: 'Afrutado',
                            value: 60,
                            color: '#FF4500'
                  },
                  {
                            name: 'Vainilla',
                            value: 55,
                            color: '#F3E5AB'
                  },
                  {
                            name: 'Atalcado',
                            value: 40,
                            color: '#FFB6C1'
                  }
        ],
        prices: { 3: 149.9, 5: 199.9, 10: 359.9 },
        isFeatured: true,
    },
    {
        id: '2',
        name: 'Paradise Garden',
        brand: 'Jean Paul Gaultier',
        slug: 'paradise-garden',
        description: 'Un viaje acuático y verde. La frescura salada se encuentra con la dulzura cremosa del coco y el higo en un jardín exuberante.',
        image: 'https://i.imgur.com/gyjNwAp.jpeg',
        notes: ['Notas Verdes', 'Notas Acuosas', 'Menta', 'Jengibre', 'Coco', 'Higo', 'Sal', 'Haba Tonka', 'Sándalo'],
        accords:         [
                  {
                            name: 'Verde',
                            value: 100,
                            color: '#228B22'
                  },
                  {
                            name: 'Coco',
                            value: 90,
                            color: '#F5F5DC'
                  },
                  {
                            name: 'Dulce',
                            value: 80,
                            color: '#FF69B4'
                  },
                  {
                            name: 'Aromático',
                            value: 75,
                            color: '#4B0082'
                  },
                  {
                            name: 'Acuático',
                            value: 70,
                            color: '#00FFFF'
                  },
                  {
                            name: 'Fresco',
                            value: 65,
                            color: '#ADD8E6'
                  },
                  {
                            name: 'Salado',
                            value: 60,
                            color: '#A9A9A9'
                  },
                  {
                            name: 'Cítrico',
                            value: 50,
                            color: '#FFFF00'
                  }
        ],
        prices: { 3: 149.9, 5: 199.9, 10: 359.9 },
        
    },
    {
        id: '3',
        name: 'Le Male Elixir',
        brand: 'Jean Paul Gaultier',
        slug: 'le-male-elixir',
        description: 'Marinero ardiente. Lavanda aromática bañada en miel dorada y tabaco, creando una estela adictiva y lujosa.',
        image: 'https://i.imgur.com/PTemlE2.jpeg',
        notes: ['Lavanda', 'Menta', 'Vainilla', 'Benjuí', 'Miel', 'Tabaco', 'Haba Tonka'],
        accords:         [
                  {
                            name: 'Dulce',
                            value: 100,
                            color: '#FF69B4'
                  },
                  {
                            name: 'Vainilla',
                            value: 95,
                            color: '#F3E5AB'
                  },
                  {
                            name: 'Miel',
                            value: 90,
                            color: '#D2691E'
                  },
                  {
                            name: 'Ambarado',
                            value: 85,
                            color: '#FFBF00'
                  },
                  {
                            name: 'Aromático',
                            value: 70,
                            color: '#4B0082'
                  },
                  {
                            name: 'Tabaco',
                            value: 65,
                            color: '#6F4E37'
                  },
                  {
                            name: 'Fresco Esp.',
                            value: 60,
                            color: '#FF7F50'
                  },
                  {
                            name: 'Lavanda',
                            value: 50,
                            color: '#E6E6FA'
                  }
        ],
        prices: { 3: 149.9, 5: 199.9, 10: 359.9 },
        isFeatured: true,
    },
    {
        id: '4',
        name: 'Born in Roma Intense',
        brand: 'Valentino',
        slug: 'born-in-roma-intense',
        description: 'Homenaje a Roma. Vainilla sensual amplificada por vetiver ahumado y lavanda vibrante.',
        image: 'https://i.imgur.com/ASBcINI.jpeg',
        notes: ['Vainilla', 'Lavanda', 'Vetiver', 'Jengibre', 'Notas Amaderadas'],
        accords:         [
                  {
                            name: 'Vainilla',
                            value: 100,
                            color: '#F3E5AB'
                  },
                  {
                            name: 'Ambarado',
                            value: 90,
                            color: '#FFBF00'
                  },
                  {
                            name: 'Lavanda',
                            value: 85,
                            color: '#E6E6FA'
                  },
                  {
                            name: 'Aromático',
                            value: 80,
                            color: '#4B0082'
                  },
                  {
                            name: 'Fresco Esp.',
                            value: 70,
                            color: '#FF7F50'
                  },
                  {
                            name: 'Amaderado',
                            value: 60,
                            color: '#8B4513'
                  },
                  {
                            name: 'Atalcado',
                            value: 50,
                            color: '#FFB6C1'
                  }
        ],
        prices: { 3: 169.9, 5: 249.9, 10: 449.9 },
        
    },
    {
        id: '5',
        name: 'Y Eau de Parfum',
        brand: 'YSL',
        slug: 'y-eau-de-parfum',
        description: 'Frescura profunda. Manzana crujiente se encuentra con salvia aromática, geranio y maderas ambarinas.',
        image: 'https://i.imgur.com/ObxsEAp.jpeg',
        notes: ['Manzana', 'Jengibre', 'Bergamota', 'Salvia', 'Bayas de Enebro', 'Geranio', 'Amberwood', 'Haba Tonka', 'Cedro', 'Vetiver', 'Olíbano'],
        accords:         [
                  {
                            name: 'Aromático',
                            value: 100,
                            color: '#4B0082'
                  },
                  {
                            name: 'Fresco Esp.',
                            value: 90,
                            color: '#FF7F50'
                  },
                  {
                            name: 'Amaderado',
                            value: 85,
                            color: '#8B4513'
                  },
                  {
                            name: 'Cítrico',
                            value: 80,
                            color: '#FFFF00'
                  },
                  {
                            name: 'Ambarado',
                            value: 70,
                            color: '#FFBF00'
                  },
                  {
                            name: 'Herbal',
                            value: 60,
                            color: '#228B22'
                  },
                  {
                            name: 'Afrutado',
                            value: 50,
                            color: '#FF4500'
                  },
                  {
                            name: 'Fresco',
                            value: 40,
                            color: '#ADD8E6'
                  }
        ],
        prices: { 3: 159.9, 5: 239.9, 10: 429.9 },
        
    },
    {
        id: '6',
        name: 'Scandal Le Parfum',
        brand: 'Jean Paul Gaultier',
        slug: 'scandal-le-parfum',
        description: 'Uppercut de sensaciones. Geranio intenso, maderas cálidas, haba tonka y un toque de caramelo.',
        image: 'https://i.imgur.com/D4NX1DB.jpeg',
        notes: ['Geranio', 'Haba Tonka', 'Sándalo', 'Caramelo'],
        accords:         [
                  {
                            name: 'Ambarado',
                            value: 100,
                            color: '#FFBF00'
                  },
                  {
                            name: 'Dulce',
                            value: 95,
                            color: '#FF69B4'
                  },
                  {
                            name: 'Aromático',
                            value: 85,
                            color: '#4B0082'
                  },
                  {
                            name: 'Amaderado',
                            value: 80,
                            color: '#8B4513'
                  },
                  {
                            name: 'Cálido Esp.',
                            value: 70,
                            color: '#B22222'
                  },
                  {
                            name: 'Caramelo',
                            value: 60,
                            color: '#D2691E'
                  },
                  {
                            name: 'Cítrico',
                            value: 50,
                            color: '#FFFF00'
                  }
        ],
        prices: { 3: 149.9, 5: 198.9, 10: 358.9 },
        
    },
    {
        id: '7',
        name: 'Odyssey Aqua',
        brand: 'Armaf',
        slug: 'odyssey-aqua',
        description: 'Ráfaga marina moderna. Pomelo vibrante, notas acuáticas, menta y un fondo amaderado. Inspirado en Invictus Platinum.',
        image: 'https://i.imgur.com/1riqqdz.jpeg',
        notes: ['Toronja (Pomelo)', 'Notas Marinas', 'Violeta', 'Menta', 'Ciprés', 'Amberwood'],
        accords:         [
                  {
                            name: 'Cítrico',
                            value: 100,
                            color: '#FFFF00'
                  },
                  {
                            name: 'Aromático',
                            value: 95,
                            color: '#4B0082'
                  },
                  {
                            name: 'Marino',
                            value: 90,
                            color: '#00FFFF'
                  },
                  {
                            name: 'Fresco Esp.',
                            value: 80,
                            color: '#4ade80'
                  },
                  {
                            name: 'Amaderado',
                            value: 70,
                            color: '#8B4513'
                  },
                  {
                            name: 'Verde',
                            value: 60,
                            color: '#228B22'
                  }
        ],
        prices: { 3: 78.9, 5: 108.9, 10: 178.9 },
        
    },
    {
        id: '8',
        name: 'Liquid Brun',
        brand: 'French Avenue',
        slug: 'liquid-brun',
        description: 'Una sobredosis de vainilla bourbon y praliné. Cálido, especiado y lujosamente envolvente. Inspirado en Althaïr de PDM.',
        image: 'https://i.imgur.com/P1RrbQJ.jpeg',
        notes: ['Vainilla Bourbon', 'Praliné', 'Canela', 'Cardamomo', 'Flor de Azahar', 'Madera de Gaiac', 'Almizcle', 'Bergamota'],
        accords:         [
                  {
                            name: 'Vainilla',
                            value: 100,
                            color: '#F3E5AB'
                  },
                  {
                            name: 'Dulce',
                            value: 95,
                            color: '#FF69B4'
                  },
                  {
                            name: 'Cálido Esp.',
                            value: 90,
                            color: '#8B4513'
                  },
                  {
                            name: 'Amaderado',
                            value: 70,
                            color: '#654321'
                  },
                  {
                            name: 'Atalcado',
                            value: 60,
                            color: '#E6E6FA'
                  },
                  {
                            name: 'Almizclado',
                            value: 50,
                            color: '#D3D3D3'
                  }
        ],
        prices: { 3: 98.9, 5: 154.9, 10: 274.9 },
        
    },
    {
        id: '9',
        name: 'Hawas Fire',
        brand: 'Rasasi',
        slug: 'hawas-fire',
        description: 'La intensidad del fuego. Manzana roja dulce y ciruela se encuentran con especias vibrantes y un fondo de ámbar gris. Audaz y seductor.',
        image: 'https://i.imgur.com/OlDTK2q.jpeg',
        notes: ['Manzana Roja', 'Ciruela', 'Anís Estrellado', 'Limón', 'Cardamomo', 'Ámbar Gris', 'Madera Flotante', 'Musgo'],
        accords:         [
                  {
                            name: 'Afrutado',
                            value: 100,
                            color: '#FF0000'
                  },
                  {
                            name: 'Dulce',
                            value: 90,
                            color: '#FF69B4'
                  },
                  {
                            name: 'Fresco Esp.',
                            value: 80,
                            color: '#FFA500'
                  },
                  {
                            name: 'Ambarado',
                            value: 75,
                            color: '#FF8C00'
                  },
                  {
                            name: 'Marino',
                            value: 60,
                            color: '#00BFFF'
                  },
                  {
                            name: 'Cítrico',
                            value: 50,
                            color: '#FFFF00'
                  }
        ],
        prices: { 3: 84.9, 5: 134.9, 10: 244.9 },
        
    },
    {
        id: '10',
        name: 'Khamrah Qahwa',
        brand: 'Lattafa',
        slug: 'khamrah-qahwa',
        description: 'Riqueza del café árabe. Gourmand sofisticado con praliné, canela, café tostado y vainilla.',
        image: 'https://i.imgur.com/O9uMmri.jpeg',
        notes: ['Canela', 'Cardamomo', 'Jengibre', 'Praliné', 'Frutas Confitadas', 'Flores Blancas', 'Café', 'Vainilla', 'Haba Tonka', 'Benjuí', 'Almizcle'],
        accords:         [
                  {
                            name: 'Cálido Esp.',
                            value: 100,
                            color: '#B22222'
                  },
                  {
                            name: 'Dulce',
                            value: 95,
                            color: '#FF69B4'
                  },
                  {
                            name: 'Café',
                            value: 90,
                            color: '#654321'
                  },
                  {
                            name: 'Ambarado',
                            value: 85,
                            color: '#FFBF00'
                  },
                  {
                            name: 'Vainilla',
                            value: 80,
                            color: '#F3E5AB'
                  },
                  {
                            name: 'Amaderado',
                            value: 70,
                            color: '#8B4513'
                  },
                  {
                            name: 'Canela',
                            value: 60,
                            color: '#D2691E'
                  }
        ],
        prices: { 3: 85.9, 5: 119.9, 10: 179.9 },
        
    },
    {
        id: '11',
        name: 'Hawas Ice',
        brand: 'Rasasi',
        slug: 'hawas-ice',
        description: 'Leyenda congelada. Apertura frutal intensa de manzana y ciruela envuelta en frescura mentolada helada.',
        image: 'https://i.imgur.com/rjX630d.jpeg',
        notes: ['Manzana', 'Limón Italiano', 'Bergamota', 'Anís Estrellado', 'Ciruela', 'Flor de Azahar', 'Cardamomo', 'Almizcle', 'Ambar', 'Madera a la Deriva', 'Musgo'],
        accords:         [
                  {
                            name: 'Cítrico',
                            value: 100,
                            color: '#FFFF00'
                  },
                  {
                            name: 'Afrutado',
                            value: 95,
                            color: '#FF4500'
                  },
                  {
                            name: 'Fresco',
                            value: 90,
                            color: '#ADD8E6'
                  },
                  {
                            name: 'Aromático',
                            value: 85,
                            color: '#4B0082'
                  },
                  {
                            name: 'Dulce',
                            value: 70,
                            color: '#FF69B4'
                  },
                  {
                            name: 'Almizclado',
                            value: 60,
                            color: '#F0F8FF'
                  },
                  {
                            name: 'Amaderado',
                            value: 50,
                            color: '#8B4513'
                  }
        ],
        prices: { 3: 84.9, 5: 119.9, 10: 179.9 },
        
    },
    {
        id: '12',
        name: 'Urban Man Elixir',
        brand: 'Armaf',
        slug: 'urban-man-elixir',
        description: 'Fusión magnética urbana. Notas especiadas, lavanda, y un potente fondo de ambroxan y maderas ahumadas. Híbrido de Sauvage y Aventus.',
        image: 'https://i.imgur.com/iiozczK.jpeg',
        notes: ['Bergamota', 'Pimienta Rosa', 'Jazmín', 'Flor de Azahar', 'Lavanda', 'Elemi', 'Geranio', 'Azafrán', 'Vetiver', 'Tagetes', 'Ambroxan', 'Ámbar', 'Pachulí', 'Cedro', 'Ládano'],
        accords:         [
                  {
                            name: 'Ambarado',
                            value: 100,
                            color: '#FFBF00'
                  },
                  {
                            name: 'Aromático',
                            value: 90,
                            color: '#4B0082'
                  },
                  {
                            name: 'Cítrico',
                            value: 85,
                            color: '#FFFF00'
                  },
                  {
                            name: 'Fresco Esp.',
                            value: 80,
                            color: '#4ade80'
                  },
                  {
                            name: 'Amaderado',
                            value: 75,
                            color: '#8B4513'
                  },
                  {
                            name: 'Cálido Esp.',
                            value: 60,
                            color: '#B22222'
                  }
        ],
        prices: { 3: 84.9, 5: 119.9, 10: 179.9 },
        
    },
    {
        id: '13',
        name: 'Yara',
        brand: 'Lattafa',
        slug: 'yara',
        description: 'Nube rosa cremosa. Orquídeas, frutas tropicales y vainilla en una mezcla gourmand y esponjosa.',
        image: 'https://i.imgur.com/EwFVkSR.jpeg',
        notes: ['Heliotropo', 'Orquídea', 'Mandarina', 'Acorde Gourmand', 'Frutas Tropicales', 'Vainilla', 'Sándalo', 'Almizcle'],
        accords:         [
                  {
                            name: 'Dulce',
                            value: 100,
                            color: '#FF69B4'
                  },
                  {
                            name: 'Atalcado',
                            value: 95,
                            color: '#FFB6C1'
                  },
                  {
                            name: 'Vainilla',
                            value: 90,
                            color: '#F3E5AB'
                  },
                  {
                            name: 'Tropical',
                            value: 80,
                            color: '#FFA500'
                  },
                  {
                            name: 'Floral',
                            value: 70,
                            color: '#FF1493'
                  },
                  {
                            name: 'Afrutado',
                            value: 60,
                            color: '#FF4500'
                  },
                  {
                            name: 'Almizclado',
                            value: 50,
                            color: '#F0F8FF'
                  }
        ],
        prices: { 3: 79.9, 5: 109.9, 10: 179.9 },
        
    },
    {
        id: '14',
        name: 'Turathi Blue',
        brand: 'Afnan',
        slug: 'turathi-blue',
        description: 'Lujo azul profundo. Explosión chispeante de cítricos vibrantes sobre un fondo rico de ámbar y almizcle. Inspirado en Tygar.',
        image: 'https://i.imgur.com/zndPWI4.png',
        notes: ['Cítricos', 'Ámbar', 'Notas Amaderadas', 'Almizcle', 'Pachulí', 'Especias'],
        accords:         [
                  {
                            name: 'Cítrico',
                            value: 100,
                            color: '#FFFF00'
                  },
                  {
                            name: 'Ambarado',
                            value: 90,
                            color: '#FFBF00'
                  },
                  {
                            name: 'Almizclado',
                            value: 85,
                            color: '#D3D3D3'
                  },
                  {
                            name: 'Fresco Esp.',
                            value: 80,
                            color: '#40E0D0'
                  },
                  {
                            name: 'Amaderado',
                            value: 60,
                            color: '#8B4513'
                  }
        ],
        prices: { 3: 89.9, 5: 119.9, 10: 199.9 },
        
    },
    {
        id: '15',
        name: 'Odyssey White',
        brand: 'Armaf',
        slug: 'odyssey-white',
        description: 'Pureza y modernidad. Yuzu vibrante, pimienta rosa y maderas suaves en una composición limpia.',
        image: 'https://i.imgur.com/RuUAG56.jpeg',
        notes: ['Pimienta Rosa', 'Yuzu', 'Toronja (Pomelo)', 'Hojas de Violeta', 'Notas Marinas', 'Ámbar', 'Amberwood', 'Madera de Gaiac'],
        accords:         [
                  {
                            name: 'Ambarado',
                            value: 100,
                            color: '#FFBF00'
                  },
                  {
                            name: 'Amaderado',
                            value: 90,
                            color: '#8B4513'
                  },
                  {
                            name: 'Cítrico',
                            value: 85,
                            color: '#FFFF00'
                  },
                  {
                            name: 'Ozónico',
                            value: 70,
                            color: '#E0FFFF'
                  },
                  {
                            name: 'Acuático',
                            value: 60,
                            color: '#00FFFF'
                  },
                  {
                            name: 'Fresco',
                            value: 55,
                            color: '#ADD8E6'
                  },
                  {
                            name: 'Aromático',
                            value: 50,
                            color: '#4B0082'
                  }
        ],
        prices: { 3: 78.9, 5: 108.9, 10: 178.9 },
        
    },
    {
        id: '16',
        name: 'Honor & Glory',
        brand: 'Lattafa',
        slug: 'honor-and-glory',
        description: 'Opulencia dorada. Piña asada, crème brûlée cremosa, canela y especias exóticas.',
        image: 'https://i.imgur.com/Saa1zb1.jpeg',
        notes: ['Piña', 'Crème Brûlée', 'Canela', 'Benjuí', 'Cúrcuma', 'Pimienta Negra', 'Vainilla', 'Sándalo', 'Cachemira', 'Musgo'],
        accords:         [
                  {
                            name: 'Dulce',
                            value: 100,
                            color: '#FFD700'
                  },
                  {
                            name: 'Cálido Esp.',
                            value: 95,
                            color: '#B22222'
                  },
                  {
                            name: 'Afrutado',
                            value: 90,
                            color: '#FF8C00'
                  },
                  {
                            name: 'Vainilla',
                            value: 85,
                            color: '#F3E5AB'
                  },
                  {
                            name: 'Ambarado',
                            value: 80,
                            color: '#FFBF00'
                  },
                  {
                            name: 'Amaderado',
                            value: 70,
                            color: '#8B4513'
                  }
        ],
        prices: { 3: 79.9, 5: 109.9, 10: 169.9 },
        
    },
    {
        id: '17',
        name: 'Sceptre Malachite',
        brand: 'Maison Alhambra',
        slug: 'sceptre-malachite',
        description: 'Un néctar tropical vibrante. La jugosidad exótica del mango se mezcla con el picante del jengibre y la frescura de la bergamota. Dupe de God of Fire.',
        image: 'https://i.imgur.com/J5S486o.jpeg',
        notes: ['Mango', 'Jengibre', 'Bayas Rojas', 'Limón', 'Bergamota', 'Notas Amaderadas', 'Almizcle', 'Ámbar'],
        accords:         [
                  {
                            name: 'Tropical',
                            value: 100,
                            color: '#FF8C00'
                  },
                  {
                            name: 'Afrutado',
                            value: 95,
                            color: '#FF4500'
                  },
                  {
                            name: 'Cítrico',
                            value: 85,
                            color: '#FFFF00'
                  },
                  {
                            name: 'Fresco Esp.',
                            value: 80,
                            color: '#4ade80'
                  },
                  {
                            name: 'Dulce',
                            value: 75,
                            color: '#FF69B4'
                  },
                  {
                            name: 'Almizclado',
                            value: 70,
                            color: '#D3D3D3'
                  },
                  {
                            name: 'Ambarado',
                            value: 65,
                            color: '#FFBF00'
                  }
        ],
        prices: { 3: 79.9, 5: 109.9, 10: 169.9 },
        
    },
    {
        id: '18',
        name: 'Jasoor',
        brand: 'Lattafa',
        slug: 'jasoor',
        description: 'Magnetismo oscuro y seductor. Manzana crujiente sumergida en tabaco dulce y cuero. Similar a Coral Fantasy.',
        image: 'https://i.imgur.com/LDb4XC9.jpeg',
        notes: ['Manzana', 'Cardamomo', 'Bergamota', 'Tabaco', 'Lavanda', 'Geranio', 'Haba Tonka', 'Cuero', 'Vetiver', 'Pachulí'],
        accords:         [
                  {
                            name: 'Afrutado',
                            value: 100,
                            color: '#FF4500'
                  },
                  {
                            name: 'Dulce',
                            value: 90,
                            color: '#FF69B4'
                  },
                  {
                            name: 'Tabaco',
                            value: 85,
                            color: '#6F4E37'
                  },
                  {
                            name: 'Cuero',
                            value: 80,
                            color: '#292524'
                  },
                  {
                            name: 'Amaderado',
                            value: 75,
                            color: '#8B4513'
                  },
                  {
                            name: 'Aromático',
                            value: 70,
                            color: '#4B0082'
                  },
                  {
                            name: 'Fresco Esp.',
                            value: 60,
                            color: '#4ade80'
                  }
        ],
        prices: { 3: 69.9, 5: 94.9, 10: 159.9 },
        
    },
    {
        id: '19',
        name: 'Odyssey Montagne',
        brand: 'Armaf',
        slug: 'odyssey-montagne',
        description: 'Elegancia envolvente. Una mezcla cremosa y gourmand de almendra dulce, flores blancas y vainilla suave. Sofisticado y reconfortante.',
        image: 'https://i.imgur.com/09ZM78B.jpeg',
        notes: ['Almendra', 'Lactonas', 'Especias', 'Flores Blancas', 'Vainilla', 'Cacao', 'Sándalo', 'Almizcle'],
        accords:         [
                  {
                            name: 'Vainilla',
                            value: 100,
                            color: '#F3E5AB'
                  },
                  {
                            name: 'Atalcado',
                            value: 90,
                            color: '#D3D3D3'
                  },
                  {
                            name: 'Nuez',
                            value: 85,
                            color: '#CD853F'
                  },
                  {
                            name: 'Floral',
                            value: 80,
                            color: '#FFC0CB'
                  },
                  {
                            name: 'Dulce',
                            value: 75,
                            color: '#FF69B4'
                  },
                  {
                            name: 'Almizclado',
                            value: 70,
                            color: '#F0F8FF'
                  },
                  {
                            name: 'Cacao',
                            value: 60,
                            color: '#654321'
                  }
        ],
        prices: { 3: 78.9, 5: 108.9, 10: 178.9 },
        
    },
    {
        id: '20',
        name: 'Hayaati',
        brand: 'Lattafa',
        slug: 'hayaati',
        description: 'Esencia de vida. Una mezcla dinámica de manzana fresca, canela picante y maderas. Versátil y enérgico.',
        image: 'https://i.imgur.com/3IpcVvF.jpeg',
        notes: ['Manzana', 'Bergamota', 'Canela', 'Notas Amaderadas', 'Almizcle', 'Vainilla'],
        accords:         [
                  {
                            name: 'Afrutado',
                            value: 100,
                            color: '#FF4500'
                  },
                  {
                            name: 'Cálido Esp.',
                            value: 90,
                            color: '#B22222'
                  },
                  {
                            name: 'Amaderado',
                            value: 85,
                            color: '#8B4513'
                  },
                  {
                            name: 'Fresco',
                            value: 80,
                            color: '#ADD8E6'
                  },
                  {
                            name: 'Almizclado',
                            value: 60,
                            color: '#D3D3D3'
                  },
                  {
                            name: 'Cítrico',
                            value: 50,
                            color: '#FFFF00'
                  },
                  {
                            name: 'Atalcado',
                            value: 40,
                            color: '#FFB6C1'
                  }
        ],
        prices: { 3: 69.9, 5: 94.9, 10: 149.9 },
        
    },
    {
        id: '21',
        name: 'Fakhar Black',
        brand: 'Lattafa',
        slug: 'fakhar-black',
        description: 'Fougère moderno y elegante. Manzana dulce, jengibre picante y lavanda fresca. Inspirado en YSL Y.',
        image: 'https://i.imgur.com/M6fEBWT.jpeg',
        notes: ['Manzana', 'Bergamota', 'Jengibre', 'Lavanda', 'Salvia', 'Bayas de Enebro', 'Geranio', 'Haba Tonka', 'Amberwood', 'Cedro', 'Vetiver'],
        accords:         [
                  {
                            name: 'Aromático',
                            value: 100,
                            color: '#4B0082'
                  },
                  {
                            name: 'Fresco Esp.',
                            value: 90,
                            color: '#4ade80'
                  },
                  {
                            name: 'Amaderado',
                            value: 85,
                            color: '#8B4513'
                  },
                  {
                            name: 'Cítrico',
                            value: 70,
                            color: '#FFFF00'
                  },
                  {
                            name: 'Afrutado',
                            value: 60,
                            color: '#FF4500'
                  },
                  {
                            name: 'Verde',
                            value: 55,
                            color: '#228B22'
                  },
                  {
                            name: 'Lavanda',
                            value: 50,
                            color: '#E6E6FA'
                  }
        ],
        prices: { 3: 79.9, 5: 109.9, 10: 169.9 },
        
    },
    {
        id: '22',
        name: 'Now Woman',
        brand: 'Rave',
        slug: 'now-woman',
        description: 'Alegría rosa vibrante. Un cóctel de frutos rojos, malvaviscos esponjosos y vainilla dulce. Inspirado en Burberry Her Elixir.',
        image: 'https://i.imgur.com/bpuLdEk.jpeg',
        notes: ['Frutos Rojos', 'Naranja', 'Malvavisco', 'Jazmín', 'Lirio de los Valles', 'Vainilla', 'Musgo', 'Almizcle'],
        accords:         [
                  {
                            name: 'Dulce',
                            value: 100,
                            color: '#FF69B4'
                  },
                  {
                            name: 'Afrutado',
                            value: 95,
                            color: '#FF4500'
                  },
                  {
                            name: 'Atalcado',
                            value: 85,
                            color: '#D8BFD8'
                  },
                  {
                            name: 'Vainilla',
                            value: 80,
                            color: '#F3E5AB'
                  },
                  {
                            name: 'Floral',
                            value: 60,
                            color: '#FFC0CB'
                  },
                  {
                            name: 'Lactónico',
                            value: 50,
                            color: '#FFFDD0'
                  },
                  {
                            name: 'Almizclado',
                            value: 40,
                            color: '#F0F8FF'
                  }
        ],
        prices: { 3: 79.9, 5: 109.9, 10: 179.9 },
        
    },
    {
        id: '23',
        name: 'Atlas',
        brand: 'Lattafa',
        slug: 'atlas',
        description: 'Fuerza del océano. Notas marinas intensas, sal marina, algas y rocas mojadas. Inspirado en Megamare.',
        image: 'https://i.imgur.com/KZa6jBa.jpeg',
        notes: ['Notas Marinas', 'Sal', 'Limón', 'Davana', 'Iris', 'Ámbar Gris', 'Musgo de Roble', 'Sándalo'],
        accords:         [
                  {
                            name: 'Marino',
                            value: 100,
                            color: '#00008B'
                  },
                  {
                            name: 'Salado',
                            value: 95,
                            color: '#A9A9A9'
                  },
                  {
                            name: 'Aromático',
                            value: 85,
                            color: '#008080'
                  },
                  {
                            name: 'Ambarado',
                            value: 80,
                            color: '#FFBF00'
                  },
                  {
                            name: 'Acuático',
                            value: 75,
                            color: '#00FFFF'
                  },
                  {
                            name: 'Cítrico',
                            value: 50,
                            color: '#FFFF00'
                  },
                  {
                            name: 'Algas',
                            value: 45,
                            color: '#2E8B57'
                  }
        ],
        prices: { 3: 148.9, 5: 199.9, 10: 348.9 },
        
    },
];

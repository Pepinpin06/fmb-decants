const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../lib/products.ts');
const refDataPath = path.join(__dirname, '../reference_data.json');

// Read reference data
const refData = JSON.parse(fs.readFileSync(refDataPath, 'utf8'));

// We need the original IDs, Prices, and Slugs from the existing file OR hardcode them.
// Since the file is messed up, parsing it might be annoying. 
// However, I can look for the structure "id: '...'," "prices: { ... }," etc.

// Let's rely on the fact that I have 24 products and I know their mapping.
// I can map by NAME.

// Helper to extract properties from the current messed up file (for Prices/IDs/Images/Slugs)
const currentContent = fs.readFileSync(productsPath, 'utf8');

// We will build a NEW products array string.
let newFileContent = `import { Product } from './types';

export const products: Product[] = [
`;

// We iterate through the REFERENCE data (24 items), and try to find the matching ID/Price/Slug from the text file.
// If not found, we might have to use defaults or extraction is tricky.
// Actually, I can use a regex to extract ALL objects from the current file first? No, it's invalid TS/JSON mix.

// Simple extract strategy:
// Split by "id: " to chunks?
const chunks = currentContent.split(/id:\s*['"]/);

// Skip the first chunk which is imports.
// chunks 1..N correspond to products.

// We need a map of Name -> { id, slug, prices, image, isFeatured }
const legacyData = {};

// Parse chunks
// Sample chunk start: "1',\n name: 'Le Beau Le Parfum'..."
chunks.slice(1).forEach(chunk => {
    // Extract ID (it was at the split point, so it's not in the chunk? No, split consumes separator.)
    // Wait, split by "id: '" means the quote is consumed.
    // The ID is at the start of the chunk until the closing quote.
    const idMatch = chunk.match(/^([^'"]+)['"]/);
    if (!idMatch) return;
    const id = idMatch[1];

    const nameMatch = chunk.match(/name:\s*['"](.+?)['"],/);
    if (!nameMatch) return;
    const name = nameMatch[1];

    const slugMatch = chunk.match(/slug:\s*['"](.+?)['"],/);
    const slug = slugMatch ? slugMatch[1] : '';

    const imageMatch = chunk.match(/image:\s*['"](.+?)['"],/);
    const image = imageMatch ? imageMatch[1] : '';

    const pricesMatch = chunk.match(/prices:\s*({[^}]+}),/);
    const prices = pricesMatch ? pricesMatch[1] : '{ 3: 0, 5: 0, 10: 0 }';

    const featuredMatch = chunk.match(/isFeatured:\s*true/);
    const isFeatured = !!featuredMatch;

    legacyData[name.toLowerCase()] = { id, slug, prices, image, isFeatured };
});

refData.forEach(ref => {
    const key = ref.name.toLowerCase();
    const leg = legacyData[key];

    if (leg) {
        // Transform accords keys n->name, v->value, c->color
        const accordsClean = ref.accords.map(a => ({
            name: a.n,
            value: a.v,
            color: a.c
        }));

        newFileContent += `    {
        id: '${leg.id}',
        name: '${ref.name.replace(/'/g, "\\'")}',
        brand: '${ref.brand.replace(/'/g, "\\'")}',
        slug: '${leg.slug}',
        description: '${ref.desc.replace(/'/g, "\\'")}',
        image: '${leg.image}',
        notes: [${ref.notes.map(n => `'${n.replace(/'/g, "\\'")}'`).join(', ')}],
        accords: ${JSON.stringify(accordsClean, null, 12).replace(/"name":/g, 'name:').replace(/"value":/g, 'value:').replace(/"color":/g, 'color:').replace(/"/g, "'").trim().replace(/^/gm, '        ')},
        prices: ${leg.prices},
        ${leg.isFeatured ? 'isFeatured: true,' : ''}
    },
`;
    } else {
        console.warn(`Missing legacy data for ${ref.name}`);
        // Fallback or skip? Better to include potentially incomplete than miss it.
        // But the legacy parser should have found it.
    }
});

newFileContent += `];
`;

// Fix indentation of accords roughly
newFileContent = newFileContent.replace(/accords: \[\s+([^\]]+)\s+\]/gm, (match, body) => {
    return `accords: [${body}]`; // It's already mostly fine from stringify
});

fs.writeFileSync(productsPath, newFileContent);
console.log('Regenerated products.ts');

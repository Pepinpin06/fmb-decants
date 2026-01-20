const fs = require('fs');
const path = require('path');

// Read files
const productsPath = path.join(__dirname, '../lib/products.ts');
const refDataPath = path.join(__dirname, '../reference_data.json');

const productsContent = fs.readFileSync(productsPath, 'utf8');
const refData = JSON.parse(fs.readFileSync(refDataPath, 'utf8'));

// Parse current products (simple regex approach or eval is risky, let's use a smarter regex replace)
// We will iterate over the refData and update the corresponding block in productsContent

let newContent = productsContent;

// Mappings for names if slightly different (though most looked consistent)
// Reference: "Le Beau Le Parfum" -> Code: "Le Beau Le Parfum"
// Reference: "Urban Man Elixir" -> Code: "Urban Man Elixir"

refData.forEach(refProduct => {
    // Find the product block in the file string
    // We look for: name: 'Exact Name',

    // Escape special regex chars in name
    const escapedName = refProduct.name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const nameRegex = new RegExp(`name:\\s*['"]${escapedName}['"],`, 'i');

    const match = newContent.match(nameRegex);

    if (match) {
        console.log(`Found match for: ${refProduct.name}`);

        // We need to inject the new description, notes, and accords.
        // Strategy: 
        // 1. Locate the block start (match.index)
        // 2. Find the closing brace of the product object? Risky.
        // Better: Replace specific properties.

        // REPLACE DESCRIPTION
        // Look for description: '...', strictly after the name match
        const descRegex = new RegExp(`(name:\\s*['"]${escapedName}['"],[\\s\\S]*?)description:\\s*(['"][\\s\\S]*?['"]),`, 'i');
        newContent = newContent.replace(descRegex, (fullMatch, prefix, oldDesc) => {
            // Escape single quotes in new desc
            const newDesc = refProduct.desc.replace(/'/g, "\\'");
            return `${prefix}description: '${newDesc}',`;
        });

        // REPLACE NOTES
        // Look for notes: [...],
        const notesRegex = new RegExp(`(name:\\s*['"]${escapedName}['"],[\\s\\S]*?)notes:\\s*\\[([\\s\\S]*?)\\],`, 'i');
        newContent = newContent.replace(notesRegex, (fullMatch, prefix, oldNotes) => {
            const newNotesString = refProduct.notes.map(n => `'${n}'`).join(', ');
            return `${prefix}notes: [${newNotesString}],`;
        });

        // INJECT ACCORDS
        // Check if accords already exist? Assuming not or overwrite.
        // We insert it after notes.
        // We just replaced notes, so we can search for that again or use the same block.
        // Let's do a targeted replace for "notes: [...]," -> "notes: [...],\n        accords: JSON,"

        // We need to match the specific notes block AGAIN for this product to ensure we are in the right place.
        // This is getting tricky with global replaces.
        // Let's split the file into chunks by "name:".
    } else {
        console.warn(`Could not find product in code: ${refProduct.name}`);
    }
});

// ALTERNATIVE STRATEGY: Re-write the products array structure completely?
// No, that risks losing IDs or Slugs or Prices if I don't parse them perfectly.
// Robust String Replacement:
// Iterate products in code (via regex loop), identify Name, look up RefData, replace fields.

const updatedLines = [];
const lines = productsContent.split('\n');
let currentProduct = null;
let insideNotes = false;

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Detect start of product
    const nameMatch = line.match(/^\s*name:\s*['"](.+)['"],/);
    if (nameMatch) {
        // Resolve closest match from Reference Data
        const codeName = nameMatch[1];
        // Find in refData (fuzzy? exact?)
        const refD = refData.find(r => r.name.toLowerCase() === codeName.toLowerCase() ||
            r.name.toLowerCase().includes(codeName.toLowerCase()) ||
            codeName.toLowerCase().includes(r.name.toLowerCase()));

        if (refD) {
            currentProduct = refD;
            console.log(`Matched ${codeName} -> ${refD.name}`);
        } else {
            console.warn(`No ref data for ${codeName}`);
            currentProduct = null;
        }
    }

    if (currentProduct) {
        // Replace Description
        if (line.trim().startsWith('description:')) {
            const newDesc = currentProduct.desc.replace(/'/g, "\\'");
            // Preserve indentation
            const indent = line.match(/^\s*/)[0];
            line = `${indent}description: '${newDesc}',`;
        }

        // Replace Notes
        if (line.trim().startsWith('notes:')) {
            const newNotes = currentProduct.notes.map(n => `'${n.replace(/'/g, "\\'")}'`).join(', ');
            const indent = line.match(/^\s*/)[0];
            line = `${indent}notes: [${newNotes}],`;

            // Inject Accords immediately after notes
            // Prepare accords string
            // We need to format the accords object array as string
            const accordsJson = JSON.stringify(currentProduct.accords).replace(/"([^"]+)":/g, '$1:').replace(/"/g, "'");
            // Simple JSON stringify uses quotes for keys, we want clean JS object style if possible, but valid JSON is valid JS too (except single quotes pref).
            // Let's just use JSON.stringify but replace double quotes on keys?
            // Actually Typescript/JS allows {"key": "val"}

            const accordsLines = JSON.stringify(currentProduct.accords, null, 4)
                .split('\n')
                .map((l, idx) => (idx === 0 ? l : `${indent}    ${l}`)) // Indent inner lines
                .join('\n');

            line += `\n${indent}accords: ${accordsLines},`;
        }
    }

    updatedLines.push(line);
}

fs.writeFileSync(productsPath, updatedLines.join('\n'));
console.log("Done merging data.");

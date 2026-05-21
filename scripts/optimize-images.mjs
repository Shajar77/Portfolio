import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root path to the public directory
const publicDir = path.resolve(__dirname, '../public');

const filesToOptimize = [
    { relPath: '{7BAFD691-8F99-44D9-AE2C-767531586372}.png', maxWidth: 1200 }, // CSTATE
    { relPath: '{0B893655-D505-467D-817A-E8EDCBEE619C}.png', maxWidth: 1200 }, // Ecom Society
    { relPath: '{7C08CEFF-D069-45E1-94B8-B2705B7AEFC8}.png', maxWidth: 1200 }, // Capital Club
    { relPath: '{E6CB1B12-38C5-49DA-82C1-C2B52A399A42}.png', maxWidth: 1200 }, // Fundverse
    { relPath: '{1BF58C71-5819-443C-B922-133885D5B2B9}.png', maxWidth: 1200 }, // HNTRS
    { relPath: '{BF9562C2-597D-48B2-BF9E-FBA50033FFFB}.png', maxWidth: 1000 }, // Rovet
    { relPath: 'assets/wa_qr_code.png', maxWidth: 400 },                       // WhatsApp QR Code
];

async function optimizeImages() {
    console.log('🚀 Starting image optimization process...\n');
    let totalOriginalBytes = 0;
    let totalOptimizedBytes = 0;

    for (const item of filesToOptimize) {
        const fullPath = path.join(publicDir, item.relPath);

        if (!fs.existsSync(fullPath)) {
            console.warn(`⚠️ Warning: File not found at ${fullPath}`);
            continue;
        }

        const stats = fs.statSync(fullPath);
        const originalSizeBytes = stats.size;
        totalOriginalBytes += originalSizeBytes;

        const originalSizeKB = (originalSizeBytes / 1024).toFixed(1);
        console.log(`Processing: ${item.relPath} (${originalSizeKB} KB)`);

        try {
            // Read into buffer first to avoid writing conflicts
            const inputBuffer = fs.readFileSync(fullPath);

            // Set up sharp chain
            let sharpInstance = sharp(inputBuffer);
            const metadata = await sharpInstance.metadata();

            // Resize if wider than maxWidth
            if (metadata.width && metadata.width > item.maxWidth) {
                console.log(`  - Resizing from ${metadata.width}px to ${item.maxWidth}px wide`);
                sharpInstance = sharpInstance.resize({ width: item.maxWidth });
            }

            // Compress to optimized PNG
            const outputBuffer = await sharpInstance
                .png({
                    quality: 80,
                    compressionLevel: 9,
                    palette: true // Reduces colors to 256 for maximum size reduction in screenshots
                })
                .toBuffer();

            // Write back to original path
            fs.writeFileSync(fullPath, outputBuffer);

            const optimizedSizeBytes = outputBuffer.length;
            totalOptimizedBytes += optimizedSizeBytes;

            const optimizedSizeKB = (optimizedSizeBytes / 1024).toFixed(1);
            const savingsPercent = ((1 - optimizedSizeBytes / originalSizeBytes) * 100).toFixed(1);

            console.log(`  ✅ Optimized: ${optimizedSizeKB} KB (${savingsPercent}% saved)\n`);
        } catch (error) {
            console.error(`  ❌ Error processing ${item.relPath}:`, error.message);
        }
    }

    const savedMB = ((totalOriginalBytes - totalOptimizedBytes) / (1024 * 1024)).toFixed(2);
    const overallSavingsPercent = ((1 - totalOptimizedBytes / totalOriginalBytes) * 100).toFixed(1);
    console.log(`🎉 Optimization Complete!`);
    console.log(`  - Original Total: ${(totalOriginalBytes / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`  - Optimized Total: ${(totalOptimizedBytes / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`  - Net Savings: ${savedMB} MB (${overallSavingsPercent}% reduced)`);
}

optimizeImages();

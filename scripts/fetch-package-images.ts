import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import dotenv from 'dotenv';
import { packages } from '../data/packages';

dotenv.config({ path: '.env.local' });

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

const PACKAGES_FILE = path.join(process.cwd(), 'data/packages.ts');
const ATTRIBUTION_FILE = path.join(process.cwd(), 'data/image-attribution.json');
const IMAGES_DIR = path.join(process.cwd(), 'public/images/packages');

// Ensure directories exist
if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

interface Attribution {
    packageSlug: string;
    filename: string;
    source: 'Unsplash' | 'Pexels';
    photographer: string;
    url: string;
}

let attributions: Attribution[] = [];
const usedImageUrls = new Set<string>();

// Load existing attributions to avoid duplicates if re-running
if (fs.existsSync(ATTRIBUTION_FILE)) {
    try {
        const existing: Attribution[] = JSON.parse(fs.readFileSync(ATTRIBUTION_FILE, 'utf-8'));
        existing.forEach(a => usedImageUrls.add(a.url));
        attributions = existing;
    } catch (e) {
        console.warn('Could not parse existing attribution file, starting fresh.');
    }
}

async function fetchUnsplashImages(query: string, count: number = 3): Promise<any[]> {
    if (!UNSPLASH_ACCESS_KEY) return [];
    try {
        const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&per_page=${count}`, {
            headers: { 'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}` }
        });
        const data = await res.json();
        return data.results || [];
    } catch (error) {
        console.error(`Unsplash Fetch Error for ${query}:`, error);
        return [];
    }
}

async function fetchPexelsImages(query: string, count: number = 3): Promise<any[]> {
    if (!PEXELS_API_KEY) return [];
    try {
        const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=${count}`, {
            headers: { 'Authorization': PEXELS_API_KEY }
        });
        const data = await res.json();
        return data.photos || [];
    } catch (error) {
        console.error(`Pexels Fetch Error for ${query}:`, error);
        return [];
    }
}

async function downloadAndProcessImage(url: string, filepath: string) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await sharp(buffer)
        .resize(1600, null, { withoutEnlargement: true }) // Width 1600, maintain aspect ratio
        .toFormat('webp', { quality: 80 })
        .toFile(filepath);
}

async function main() {
    if (!UNSPLASH_ACCESS_KEY && !PEXELS_API_KEY) {
        console.error('Error: No API keys found in .env.local. Please set UNSPLASH_ACCESS_KEY and/or PEXELS_API_KEY.');
        return;
    }

    // Target packages: New additions
    const targetLocations = ['Trinidad', 'Tobago', 'Venezuela', 'St Kitts', 'Nevis', 'Panama', 'Brazil', 'Costa Rica', 'Peru'];
    const targetSlugs = [
        'port-of-spain-city-pulse', 'panama-city-canal-stopover', 'caracas-weekend-retreat', 'basseterre-boutique-stay',
        'tobago-beachfront-bliss', 'nevis-luxury-plantation', 'rio-copacabana-residency', 'guanacaste-resort-getaway',
        'trinidad-carnival-culture', 'angel-falls-expedition', 'san-blas-islands-sailing', 'machu-picchu-sacred-valley'
    ];

    const packagesToUpdate = packages.filter(p => targetSlugs.includes(p.slug));

    console.log(`Found ${packagesToUpdate.length} packages to process.`);

    let packagesFileContent = fs.readFileSync(PACKAGES_FILE, 'utf-8');
    let updatedAny = false;

    for (const pkg of packagesToUpdate) {
        console.log(`Processing ${pkg.slug}...`);

        const isHotel = pkg.type === 'Hotel' || pkg.type === 'Resort';
        // Generate 4 distinct queries to get variety
        const queries = [
            `${pkg.location} travel landmark`,
            `${pkg.location} nature scenery landscape`,
            isHotel ? `${pkg.location} luxury hotel resort` : `${pkg.location} culture people`,
            `${pkg.location} food cuisine street`
        ];

        const newImagePaths: string[] = [];

        for (let i = 0; i < 4; i++) {
            const query = queries[i];
            const filename = `${pkg.slug}-0${i + 1}.webp`;
            const filepath = path.join(IMAGES_DIR, filename);
            const relativePath = `/images/packages/${filename}`;

            // Note: We do NOT skip if file exists here, because we want to retry failed downloads or bad paths from previous run.

            let cand = null;
            let source: 'Unsplash' | 'Pexels' = 'Unsplash';

            // Flatten results to find unique one
            const trySource = async (srcName: 'Unsplash' | 'Pexels', fetcher: (q: string, c: number) => Promise<any[]>) => {
                if (cand) return; // already found
                const results = await fetcher(query, 10);
                for (const item of results) {
                    const url = srcName === 'Unsplash' ? item.links.html : item.url;
                    if (!usedImageUrls.has(url)) {
                        cand = item;
                        source = srcName;
                        usedImageUrls.add(url);
                        break;
                    }
                }
            };

            // Try primary query
            if (UNSPLASH_ACCESS_KEY) await trySource('Unsplash', fetchUnsplashImages);
            if (!cand && PEXELS_API_KEY) await trySource('Pexels', fetchPexelsImages);

            // Fallback strategy: Try searching just the title if location yielded nothing
            if (!cand) {
                const fallbackQuery = pkg.title;
                console.log(`    Trying fallback query: ${fallbackQuery}`);
                if (UNSPLASH_ACCESS_KEY) await trySource('Unsplash', () => fetchUnsplashImages(fallbackQuery, 10));
            }

            // Second Fallback: Try just the main destination word (Trinidad, Panama, etc)
            if (!cand) {
                const mainDest = pkg.location.split(',')[0];
                console.log(`    Trying second fallback query: ${mainDest} travel`);
                if (UNSPLASH_ACCESS_KEY) await trySource('Unsplash', () => fetchUnsplashImages(`${mainDest} travel`, 10));
            }

            if (cand) {
                const imageUrl = source === 'Unsplash' ? cand.urls.regular : cand.src.large;
                const photographer = source === 'Unsplash' ? cand.user.name : cand.photographer;
                const pageUrl = source === 'Unsplash' ? cand.links.html : cand.url;

                try {
                    await downloadAndProcessImage(imageUrl, filepath);

                    // Update attributions
                    attributions = attributions.filter(a => a.filename !== filename);
                    attributions.push({
                        packageSlug: pkg.slug,
                        filename,
                        source,
                        photographer,
                        url: pageUrl
                    });

                    console.log(`  Saved ${filename} from ${source}`);
                    // ONLY push path if successful
                    newImagePaths.push(relativePath);
                } catch (err) {
                    console.error(`  Failed to download/process ${filename}`, err);
                }
            } else {
                console.warn(`  No suitable new image found for query: ${query}`);
            }
        }

        // Only update data/packages.ts if we actually have images
        if (newImagePaths.length > 0) {
            const safeSlug = pkg.slug.replace(/-/g, '\\-');
            const slugRegex = new RegExp(`slug:\\s*"${safeSlug}"[\\s\\S]*?images:\\s*\\[([\\s\\S]*?)\\]`, 'm');
            const match = packagesFileContent.match(slugRegex);

            if (match) {
                const currentImagesBlock = match[0];
                const newImagesString = `images: [${newImagePaths.map(p => `"${p}"`).join(', ')}]`;
                const newBlock = currentImagesBlock.replace(/images:\s*\[[\s\S]*?\]/, newImagesString);

                if (newBlock !== currentImagesBlock) {
                    packagesFileContent = packagesFileContent.replace(currentImagesBlock, newBlock);
                    updatedAny = true;
                }
            } else {
                console.warn(`  Could not find package code block for ${pkg.slug}`);
            }
        }
    }

    if (updatedAny) {
        fs.writeFileSync(PACKAGES_FILE, packagesFileContent, 'utf-8');
        console.log('Updated data/packages.ts with new image paths.');
    }

    fs.writeFileSync(ATTRIBUTION_FILE, JSON.stringify(attributions, null, 2), 'utf-8');
    console.log('Updated data/image-attribution.json');
}

main().catch(console.error);

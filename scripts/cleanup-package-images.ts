import fs from 'fs';
import path from 'path';
import { packages } from '../data/packages';

const PACKAGES_FILE = path.join(process.cwd(), 'data/packages.ts');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

function main() {
    let packagesFileContent = fs.readFileSync(PACKAGES_FILE, 'utf-8');
    let updatedAny = false;

    console.log('Verifying image existence...');

    for (const pkg of packages) {
        const validImages: string[] = [];
        let changed = false;

        for (const imgPath of pkg.images) {
            if (imgPath.startsWith('http')) {
                validImages.push(imgPath); // Keep external URLs
                continue;
            }

            const localPath = path.join(PUBLIC_DIR, imgPath);
            if (fs.existsSync(localPath) && fs.statSync(localPath).size > 0) {
                validImages.push(imgPath);
            } else {
                console.warn(`  Removing missing/empty image: ${imgPath} (Package: ${pkg.slug})`);
                changed = true;
            }
        }

        if (changed || validImages.length !== pkg.images.length) {
            // Update the file content
            const safeSlug = pkg.slug.replace(/-/g, '\\-');
            const slugRegex = new RegExp(`slug:\\s*"${safeSlug}"[\\s\\S]*?images:\\s*\\[([\\s\\S]*?)\\]`, 'm');
            const match = packagesFileContent.match(slugRegex);

            if (match) {
                const currentImagesBlock = match[0];
                const newImagesString = `images: [${validImages.map(p => `"${p}"`).join(', ')}]`;
                const newBlock = currentImagesBlock.replace(/images:\s*\[[\s\S]*?\]/, newImagesString);

                if (newBlock !== currentImagesBlock) {
                    packagesFileContent = packagesFileContent.replace(currentImagesBlock, newBlock);
                    updatedAny = true;
                }
            }
        }
    }

    if (updatedAny) {
        fs.writeFileSync(PACKAGES_FILE, packagesFileContent, 'utf-8');
        console.log('Successfully cleaned up packages.ts to only include existing images.');
    } else {
        console.log('No changes needed. All referenced images exist.');
    }
}

main();

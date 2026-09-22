// Génère les variantes responsive (640 / 960 / 1280 px) des photos affichées
// avec un `srcset` (voir src/lib/responsiveImage.ts).
//
// Pourquoi : les photos sources font 1920 px (200-750 Ko) alors que la galerie
// les affiche à 256-320 px CSS. Avec srcset, le navigateur télécharge la
// variante 640 px (~40 Ko) et ne charge le 1920 px que dans la lightbox.
//
// Les variantes sont écrites À CÔTÉ de l'original avec le suffixe -w<largeur>
// (ex. duplex-salon-01-w640.webp) et COMMITÉES dans git : pas de dépendance
// native au build Netlify, pas de temps de build ajouté. L'original n'est
// jamais modifié — il reste le candidat 1920w du srcset.
//
// Usage (à relancer quand on ajoute une photo à la liste ci-dessous) :
//   npm i --no-save sharp && node scripts/generate-responsive-images.mjs
// Idempotent : une variante existante est ignorée (--force pour régénérer).

import sharp from 'sharp';
import { access, stat } from 'node:fs/promises';
import { dirname, extname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES = join(__dirname, '..', 'public', 'images');

// Doit rester aligné sur RESPONSIVE_WIDTHS dans src/lib/responsiveImage.ts.
const WIDTHS = [640, 960, 1280];
const WEBP_QUALITY = 76;
const JPEG_QUALITY = 76;

const DUPLEX = 'Duplex Haussmannien/webp/';
const SOURCES = [
  // Page /spaces/duplex-osmoz : galerie + configurations
  `${DUPLEX}duplex-salon-01.webp`,
  `${DUPLEX}duplex-salon-06.webp`,
  `${DUPLEX}duplex-cuisine-01.webp`,
  `${DUPLEX}duplex-salle-reunion-01.webp`,
  `${DUPLEX}duplex-reunion-01.webp`,
  `${DUPLEX}duplex-reunion-04.webp`,
  `${DUPLEX}duplex-diner-01.webp`,
  `${DUPLEX}duplex-entree-01.webp`,
  `${DUPLEX}duplex-ambiance-01.webp`,
  `${DUPLEX}duplex-facade-01.webp`,
  // Page /spaces/loft-osmoz : hero + galerie + configurations
  'Loft/2 Salon pleiniere 2.jpg',
  'Loft/1 SdR.jpg',
  'Loft/3 salle a manger.jpg',
  'Loft/4 Cuisine 5.jpg',
  'Loft/7 Salon pleiniere 1.jpg',
  'Loft/6 Salon pleiniere 6.jpg',
  'Loft/11 Salle de reunion 2.jpg',
  'Loft/12 Salle de reunion 4.jpg',
  'Loft/9 salle a manger.jpg',
  'Loft/21 Cuisine 3.jpg',
  'Loft/18 Cocktail 3.jpg',
  'Loft/8 Cocktail 1.jpg',
  'Loft/5 Accueil.jpg',
  'Loft/25 DSC4695-HDR.jpg',
  // Cartes "Découvrir nos autres espaces"
  'Duplex Haussmannien/1 Salon Normal 3.jpg',
  'Penthouse/2 - Salon.jpg',
];

const force = process.argv.includes('--force');
const exists = (p) => access(p).then(() => true, () => false);
const kb = (n) => `${Math.round(n / 1024)} Ko`;

async function generate(rel) {
  const src = join(IMAGES, rel);
  const ext = extname(src).toLowerCase();
  const stem = join(dirname(src), basename(src, ext));
  const { width: srcWidth } = await sharp(src).metadata();
  const { size } = await stat(src);
  console.log(`\n${rel}  (${srcWidth}px, ${kb(size)})`);

  for (const w of WIDTHS) {
    const out = `${stem}-w${w}${ext}`;
    if (!force && (await exists(out))) {
      console.log(`  -w${w}  déjà présent`);
      continue;
    }
    if (srcWidth && w >= srcWidth) {
      console.log(`  -w${w}  ignoré (source ${srcWidth}px)`);
      continue;
    }
    let pipeline = sharp(src).resize({ width: w, withoutEnlargement: true });
    pipeline =
      ext === '.jpg' || ext === '.jpeg'
        ? pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
        : pipeline.webp({ quality: WEBP_QUALITY, effort: 6 });
    const info = await pipeline.toFile(out);
    console.log(`  -w${w}  ${kb(info.size)}`);
  }
}

for (const rel of SOURCES) {
  try {
    await generate(rel);
  } catch (err) {
    console.error(`  ERREUR ${rel} : ${err?.message ?? err}`);
    process.exitCode = 1;
  }
}

// Construit les attributs `srcset` / `sizes` des photos qui ont des variantes
// responsive générées par scripts/generate-responsive-images.mjs
// (fichiers -w640 / -w960 / -w1280 à côté de l'original 1920 px).
//
// Le navigateur choisit la plus petite variante suffisante pour la taille
// d'affichage : la galerie (256-320 px CSS) charge ~40 Ko au lieu de ~250 Ko,
// et l'original 1920 px n'est plus téléchargé que dans la lightbox.

// Doit rester aligné sur WIDTHS dans scripts/generate-responsive-images.mjs.
export const RESPONSIVE_WIDTHS = [640, 960, 1280] as const;
const ORIGINAL_WIDTH = 1920;

/** ".../duplex-salon-01.webp" → ".../duplex-salon-01-w640.webp" */
export function variantUrl(url: string, width: number): string {
  return url.replace(/(\.[a-z0-9]+)$/i, `-w${width}$1`);
}

/** srcset complet : variantes générées + l'original comme candidat 1920w. */
export function srcSet(url: string): string {
  return [
    ...RESPONSIVE_WIDTHS.map((w) => `${variantUrl(url, w)} ${w}w`),
    `${url} ${ORIGINAL_WIDTH}w`,
  ].join(', ');
}

/** Largeurs CSS d'affichage par contexte (attribut `sizes`). */
export const SIZES = {
  /** Bande galerie horizontale : vignettes w-64 sm:w-80. */
  galleryStrip: '(min-width: 640px) 320px, 256px',
  /** Une colonne d'une grille md:grid-cols-2 dans un conteneur max-w-7xl. */
  halfColumn: '(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw',
} as const;

# Polices auto-hébergées

Fichiers woff2 servis depuis `/fonts/`, déclarés dans `src/index.css`.

| Famille | Fichiers | Graisses | Rôle |
|---|---|---|---|
| Besley | `besley-latin(-ext).woff2` | variable 400–900 (utilisées : 400, 500, 600) | voix de marque : titres, chiffres clés |
| Besley italique | `besley-italic-latin(-ext).woff2` | 400 | citations, motto, emphase |
| Schibsted Grotesk | `schibsted-grotesk-latin(-ext).woff2` | variable 400–900 (utilisées : 400, 500, 600) | tout le reste |

Source : Google Fonts (fichiers et `unicode-range` latin / latin-ext d'origine).
Licence : SIL Open Font License 1.1 pour les deux familles, qui autorise
l'auto-hébergement.

Les noms de fichiers ne sont pas hachés et `/fonts/*` est mis en cache un an
(`netlify.toml`) : si le contenu d'un fichier change, il faut le renommer.

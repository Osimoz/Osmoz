# Polices auto-hébergées

Fichiers woff2 servis depuis `/fonts/`, déclarés dans `src/index.css`.

| Famille | Fichiers | Graisses | Rôle |
|---|---|---|---|
| Big Shoulders Display | `big-shoulders-display-latin(-ext).woff2` | variable 100–900 (utilisées : 600, 700) | display |
| Besley | `besley-latin(-ext).woff2` | variable 400–900 (utilisées : 400, 500) | serif |
| Besley italique | `besley-italic-latin(-ext).woff2` | 400 | serif italique |
| Schibsted Grotesk | `schibsted-grotesk-latin(-ext).woff2` | variable 400–900 (utilisées : 400, 500, 600) | sans |

Source : Google Fonts (fichiers et `unicode-range` latin / latin-ext d'origine).
Licence : SIL Open Font License 1.1 pour les trois familles, qui autorise
l'auto-hébergement.

Les noms de fichiers ne sont pas hachés et `/fonts/*` est mis en cache un an
(`netlify.toml`) : si le contenu d'un fichier change, il faut le renommer.

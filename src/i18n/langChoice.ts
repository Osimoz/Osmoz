// Choix de langue mémorisé par le visiteur et règle d'affichage du bandeau de
// suggestion. Rien ici ne redirige : le français reste la langue servie par
// défaut à tout le monde, robots compris. On propose, le visiteur décide.
import type { Lang } from './paths';

export const LANG_STORAGE_KEY = 'osmoz-lang';
const CHANGE_EVENT = 'osmoz-lang-change';

export type LangChoice = Lang | null;

// Repli quand localStorage refuse l'écriture (navigation privée stricte,
// stockage bloqué) : le choix vaut alors pour la durée de la page.
let memoryChoice: LangChoice = null;

export function readLangChoice(): LangChoice {
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    return stored === 'fr' || stored === 'en' ? stored : memoryChoice;
  } catch {
    return memoryChoice;
  }
}

/** Mémorise la langue choisie (pilule, pied de page, bouton ou croix du bandeau). */
export function rememberLang(lang: Lang): void {
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    memoryChoice = null;
  } catch {
    memoryChoice = lang;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Prévient quand le choix change, dans cet onglet ou dans un autre. */
export function subscribeLangChoice(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

export function browserLanguage(): string {
  return navigator.language || navigator.languages?.[0] || '';
}

// Robots qui exécutent le JavaScript. Googlebot rend les pages avec un
// navigateur réglé en en-US : sans ce filtre il verrait le bandeau anglais
// sur chaque page française.
const BOT_UA =
  /bot|crawl|spider|slurp|lighthouse|headless|inspectiontool|googleother|mediapartners|facebookexternalhit|bingpreview|pingdom|ptst/i;

/**
 * Faut-il proposer l'autre langue sur cette page ?
 * - page française : navigateur non francophone sans choix mémorisé, ou choix
 *   « en » déjà fait (arrivée par un lien direct : on propose, sans rediriger) ;
 * - page anglaise : navigateur francophone sans choix mémorisé, rien d'autre.
 */
export function shouldSuggestLang(
  pageLang: Lang,
  choice: LangChoice,
  browserLang: string,
  userAgent: string,
): boolean {
  if (BOT_UA.test(userAgent)) return false;
  const french = browserLang.toLowerCase().startsWith('fr');
  if (pageLang === 'fr') {
    if (choice === 'en') return true;
    return choice === null && browserLang !== '' && !french;
  }
  return choice === null && french;
}

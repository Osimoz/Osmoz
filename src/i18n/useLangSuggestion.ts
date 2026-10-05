import { useSyncExternalStore } from 'react';
import {
  browserLanguage,
  readLangChoice,
  shouldSuggestLang,
  subscribeLangChoice,
} from './langChoice';
import type { Lang } from './paths';

// Rendu serveur / pré-rendu : jamais de bandeau dans le HTML servi. Il
// n'existe que dans le navigateur, une fois l'application montée.
const neverOnServer = () => false;

/** Le bandeau de suggestion de langue doit-il s'afficher sur cette page ? */
export function useLangSuggestion(pageLang: Lang): boolean {
  return useSyncExternalStore(
    subscribeLangChoice,
    () => shouldSuggestLang(pageLang, readLangChoice(), browserLanguage(), navigator.userAgent),
    neverOnServer,
  );
}

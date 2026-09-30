import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { dictionaries } from '../locales';
import { alternatePath, DEFAULT_LANG, localizePath, type Lang } from './paths';

// Langue courante, posée par <LocaleProvider> dans le layout de chaque arbre
// de routes (voir App.tsx). Séparé du composant Provider pour que le
// Fast Refresh reste actif (un fichier = soit des composants, soit le reste).
export const LocaleContext = createContext<Lang>(DEFAULT_LANG);

export function useLocale() {
  const lang = useContext(LocaleContext);
  const { pathname, search } = useLocation();
  // p('/reservation?space=loft') → '/en/booking?space=loft' en anglais.
  const p = useCallback((frPath: string) => localizePath(frPath, lang), [lang]);
  const alt = useMemo(() => alternatePath(pathname, search, lang), [pathname, search, lang]);
  return { lang, t: dictionaries[lang], p, alt };
}

import type { ReactNode } from 'react';
import { LocaleContext } from './context';
import type { Lang } from './paths';

export function LocaleProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>;
}

import type { Lang } from '../i18n/paths';
import { frTypo, mapStrings } from '../i18n/frTypo';
import { fr, type Dictionary } from './fr';
import { en } from './en';

// Le français passe par la typographie française (espaces fines insécables) ;
// l'anglais est servi tel quel.
export const dictionaries: Record<Lang, Dictionary> = { fr: mapStrings(fr, frTypo), en };

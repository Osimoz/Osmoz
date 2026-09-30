import type { Lang } from '../i18n/paths';
import { fr, type Dictionary } from './fr';
import { en } from './en';

export const dictionaries: Record<Lang, Dictionary> = { fr, en };

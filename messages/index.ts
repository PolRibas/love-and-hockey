import { IntlMessages } from './interface';

import caEsMessages from './locales/ca-ES';
import esEsMessages from './locales/es-ES';
import esArMessages from './locales/es-AR';
import enUsMessages from './locales/en-US';
import nlNLMessages from './locales/nl-NL';


export const getTranslations = (locale: string) => {
  const translations = new Map<string, IntlMessages>([
    ['es-ES', esEsMessages],
    ['ca-ES', caEsMessages],
    ['es-AR', esArMessages],
    ['en-US', enUsMessages],
    ['nl-NL', nlNLMessages],
  ]);

  const translation = translations.get(locale);

  if (!translation) {
    throw new Error('Locale not implemented');
  }

  return translation;
};
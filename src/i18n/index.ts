
import { ar } from './ar';
import { en } from './en';

export type Language = 'ar' | 'en';

export const translations = {
  ar,
  en
};

export type TranslationKeys = typeof ar;

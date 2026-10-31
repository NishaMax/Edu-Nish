// ============================================
// EduNish — i18n Configuration
// ============================================

import type { Locale } from "@/lib/constants";
import { LOCALES, DEFAULT_LOCALE, LOCALE_FLAGS, LOCALE_LABELS } from "@/lib/constants";

export { LOCALES, DEFAULT_LOCALE, LOCALE_FLAGS, LOCALE_LABELS };
export type { Locale };

// Validate a locale string
export function isValidLocale(locale: string): locale is Locale {
  return (LOCALES as readonly string[]).includes(locale);
}

// Get locale from pathname
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && isValidLocale(first)) return first;
  return DEFAULT_LOCALE;
}

// Build a localized path
export function localizedPath(locale: Locale, path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${cleanPath}`;
}

// Switch locale in a given path
export function switchLocaleInPath(
  currentPath: string,
  newLocale: Locale
): string {
  const segments = currentPath.split("/").filter(Boolean);
  if (segments.length > 0 && isValidLocale(segments[0])) {
    segments[0] = newLocale;
  } else {
    segments.unshift(newLocale);
  }
  return `/${segments.join("/")}`;
}

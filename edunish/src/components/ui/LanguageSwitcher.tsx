"use client";

import { usePathname, useRouter } from "next/navigation";
import { LOCALES, LOCALE_FLAGS, switchLocaleInPath, type Locale } from "@/lib/i18n/config";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSelect = (locale: Locale) => {
    if (locale === currentLocale) return;
    const newPath = switchLocaleInPath(pathname || `/${currentLocale}`, locale);
    router.push(newPath);
  };

  return (
    <div className="flex items-center p-1 rounded-full bg-[var(--surface-2)] border border-[var(--border-subtle)] text-xs font-semibold">
      {LOCALES.map((locale) => {
        const isActive = locale === currentLocale;
        return (
          <button
            key={locale}
            onClick={() => handleSelect(locale)}
            className={`px-2.5 py-1 rounded-full transition-all duration-150 cursor-pointer ${
              isActive
                ? "bg-[var(--accent-teal)] text-[var(--text-inverse)] shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
            aria-label={`Switch language to ${locale}`}
          >
            {LOCALE_FLAGS[locale]}
          </button>
        );
      })}
    </div>
  );
}

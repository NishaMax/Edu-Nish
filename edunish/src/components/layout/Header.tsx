"use client";

import { useState } from "react";
import Link from "next/link";
import { type Locale } from "@/lib/constants";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function Header({ locale, dict }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-[var(--glass-border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--accent-teal)] to-[var(--accent-violet)] flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(0,229,160,0.3)] group-hover:scale-105 transition-transform">
            E
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-[var(--text-primary)] leading-tight">
              Edu<span className="text-[var(--accent-teal)]">Nish</span>
            </span>
            <span className="text-[10px] text-[var(--text-muted)] font-medium tracking-wide -mt-0.5">
              LK • EXAM HUB
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href={`/${locale}`}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            {dict.nav.home}
          </Link>
          <Link
            href={`/${locale}/ol`}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent-teal)]" />
            {dict.nav.ol}
          </Link>
          <Link
            href={`/${locale}/al`}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent-violet)]" />
            {dict.nav.al}
          </Link>
          <Link
            href={`/${locale}/about`}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            {dict.nav.about}
          </Link>
        </nav>

        {/* Action Controls: Language Switcher, Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher currentLocale={locale} />
          <ThemeToggle />

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--surface-2)] border border-[var(--border-subtle)] text-[var(--text-primary)] cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-strong border-b border-[var(--border-default)] px-4 py-4 space-y-3 animate-slide-down">
          <Link
            href={`/${locale}`}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-2)]"
          >
            {dict.nav.home}
          </Link>
          <Link
            href={`/${locale}/ol`}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-2)]"
          >
            {dict.nav.ol}
          </Link>
          <Link
            href={`/${locale}/al`}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-2)]"
          >
            {dict.nav.al}
          </Link>
          <Link
            href={`/${locale}/about`}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-2)]"
          >
            {dict.nav.about}
          </Link>
        </div>
      )}
    </header>
  );
}

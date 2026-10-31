import Link from "next/link";
import { type Locale, OL_GRADES, AL_GRADES } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const currentYear = 2026;

  return (
    <footer className="w-full border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[var(--accent-teal)] to-[var(--accent-violet)] flex items-center justify-center text-white font-bold text-sm">
                E
              </div>
              <span className="text-base font-bold text-[var(--text-primary)]">
                Edu<span className="text-[var(--accent-teal)]">Nish</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {dict.footer.description}
            </p>
            <div className="text-xs text-[var(--text-muted)]">
              Targeting zero lag on all devices. 100% Free forever.
            </div>
          </div>

          {/* O/L Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              {dict.home.grades.ol_title}
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--text-secondary)]">
              <li>
                <Link
                  href={`/${locale}/ol/mathematics`}
                  className="hover:text-[var(--accent-teal)] transition-colors"
                >
                  Mathematics (ගණිතය / கணிதம்)
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/ol/science`}
                  className="hover:text-[var(--accent-teal)] transition-colors"
                >
                  Science (විද්‍යාව / அறிவியல்)
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/ol/english`}
                  className="hover:text-[var(--accent-teal)] transition-colors"
                >
                  English Language
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/ol/history`}
                  className="hover:text-[var(--accent-teal)] transition-colors"
                >
                  History (ඉතිහාසය / வரலாறு)
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/ol`}
                  className="text-[var(--accent-teal)] hover:underline inline-block pt-1"
                >
                  {dict.home.popular.view_all} O/L →
                </Link>
              </li>
            </ul>
          </div>

          {/* A/L Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              {dict.home.grades.al_title}
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--text-secondary)]">
              <li>
                <Link
                  href={`/${locale}/al/combined-mathematics`}
                  className="hover:text-[var(--accent-teal)] transition-colors"
                >
                  Combined Mathematics
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/al/physics`}
                  className="hover:text-[var(--accent-teal)] transition-colors"
                >
                  Physics (භෞතික විද්‍යාව)
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/al/chemistry`}
                  className="hover:text-[var(--accent-teal)] transition-colors"
                >
                  Chemistry (රසායන විද්‍යාව)
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/al/biology`}
                  className="hover:text-[var(--accent-teal)] transition-colors"
                >
                  Biology (ජීව විද්‍යාව)
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/al`}
                  className="text-[var(--accent-teal)] hover:underline inline-block pt-1"
                >
                  {dict.home.popular.view_all} A/L →
                </Link>
              </li>
            </ul>
          </div>

          {/* Grades Covered */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              {dict.common.grade} Coverage
            </h4>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[...OL_GRADES, ...AL_GRADES].map((grade) => (
                <span
                  key={grade}
                  className="text-xs px-2 py-0.5 rounded-md bg-[var(--surface-2)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                >
                  {dict.common.grade} {grade}
                </span>
              ))}
            </div>
            <div className="pt-3">
              <Link
                href={`/${locale}/search`}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] block transition-colors"
              >
                🔍 Search All Papers
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>{dict.footer.copyright.replace("{year}", currentYear.toString())}</p>
          <div className="flex items-center gap-4">
            <span>Fast • Clean • Trilingual</span>
            <span>•</span>
            <span>Sri Lanka 🇱🇰</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

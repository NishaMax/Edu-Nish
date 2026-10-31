"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SUBJECTS, YEARS, type Locale } from "@/lib/constants";
import Link from "next/link";

interface SearchBarProps {
  locale: Locale;
  placeholder?: string;
  className?: string;
}

interface Suggestion {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  badge: string;
}

export function SearchBar({
  locale,
  placeholder = "Search papers... e.g. 'Maths 2019'",
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    // Match subjects & years
    const results: Suggestion[] = [];
    const matchedYear = YEARS.find((y) => q.includes(y.toString()));

    SUBJECTS.forEach((subject) => {
      const matchEn = subject.nameEn.toLowerCase().includes(q);
      const matchSi = subject.nameSi.toLowerCase().includes(q);
      const matchTa = subject.nameTa.toLowerCase().includes(q);
      const matchSlug = subject.slug.includes(q);

      // Check if query mentions subject name partially
      const tokens = q.split(" ");
      const matchesAnyToken = tokens.some(
        (t) =>
          t.length > 2 &&
          (subject.nameEn.toLowerCase().includes(t) ||
            subject.nameSi.toLowerCase().includes(t) ||
            subject.nameTa.toLowerCase().includes(t))
      );

      if (matchEn || matchSi || matchTa || matchSlug || matchesAnyToken) {
        const localizedName =
          locale === "si"
            ? subject.nameSi
            : locale === "ta"
            ? subject.nameTa
            : subject.nameEn;

        if (matchedYear) {
          results.push({
            id: `${subject.slug}-${matchedYear}`,
            title: `${matchedYear} ${localizedName} Past Paper`,
            subtitle: `${subject.exam.toUpperCase()} • All Mediums`,
            href: `/${locale}/${subject.exam}/${subject.slug}/${matchedYear}`,
            badge: matchedYear.toString(),
          });
        } else {
          // Suggest the subject year listing
          results.push({
            id: subject.slug,
            title: localizedName,
            subtitle: `${subject.exam.toUpperCase()} Past Papers & Notes`,
            href: `/${locale}/${subject.exam}/${subject.slug}`,
            badge: subject.exam.toUpperCase(),
          });
        }
      }
    });

    setSuggestions(results.slice(0, 6));
    setIsOpen(results.length > 0);
  }, [query, locale]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
            placeholder={placeholder}
            className="w-full pl-11 pr-4 py-3 sm:py-3.5 text-sm rounded-2xl bg-[var(--surface-2)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-teal)] focus:bg-[var(--surface-3)] transition-all shadow-sm focus:shadow-[0_0_24px_rgba(0,229,160,0.15)]"
          />
          <div className="absolute left-3.5 text-[var(--text-muted)] pointer-events-none">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className="absolute right-3.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </form>

      {/* Suggestion Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 glass-strong rounded-2xl border border-[var(--border-default)] shadow-2xl overflow-hidden z-50 animate-slide-down">
          <div className="p-2 divide-y divide-[var(--border-subtle)]">
            {suggestions.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--surface-hover)] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[var(--accent-teal-dim)] flex items-center justify-center text-[var(--accent-teal)] text-sm shrink-0">
                    📄
                  </span>
                  <div>
                    <div className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-teal)] transition-colors">
                      {item.title}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--surface-3)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                  {item.badge}
                </span>
              </Link>
            ))}
          </div>
          <div className="p-2.5 bg-[var(--surface-1)] border-t border-[var(--border-subtle)] text-center">
            <button
              onClick={handleSubmit}
              className="text-xs text-[var(--accent-teal)] hover:underline font-medium cursor-pointer"
            >
              View all results for &ldquo;{query}&rdquo; →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

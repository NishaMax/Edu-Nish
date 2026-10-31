import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { SUBJECTS, YEARS, getSubjectName } from "@/lib/constants";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { SearchBar } from "@/components/ui/SearchBar";
import type { Metadata } from "next";

interface SearchPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q || "";
  return {
    title: query ? `Search: "${query}" | EduNish` : "Search Past Papers | EduNish",
    description: "Search across all Sri Lankan O/L and A/L past papers, model papers, and answers in Sinhala, English, and Tamil.",
  };
}

async function SearchResultsList({
  locale,
  searchParams,
}: {
  locale: Locale;
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const dict = await getDictionary(locale);
  const query = (q || "").trim().toLowerCase();

  // Filter matching subjects & generate results
  const results = [];
  if (query.length > 0) {
    const matchedYear = YEARS.find((y) => query.includes(y.toString()));

    for (const subject of SUBJECTS) {
      const matchEn = subject.nameEn.toLowerCase().includes(query);
      const matchSi = subject.nameSi.toLowerCase().includes(query);
      const matchTa = subject.nameTa.toLowerCase().includes(query);
      const matchSlug = subject.slug.includes(query);

      const tokens = query.split(" ");
      const matchToken = tokens.some(
        (t) =>
          t.length > 2 &&
          (subject.nameEn.toLowerCase().includes(t) ||
            subject.nameSi.toLowerCase().includes(t) ||
            subject.nameTa.toLowerCase().includes(t))
      );

      if (matchEn || matchSi || matchTa || matchSlug || matchToken) {
        const localizedName = getSubjectName(subject, locale);
        if (matchedYear) {
          results.push({
            id: `${subject.slug}-${matchedYear}`,
            title: `${matchedYear} ${localizedName} Past Paper`,
            exam: subject.exam,
            subject: localizedName,
            year: matchedYear,
            href: `/${locale}/${subject.exam}/${subject.slug}/${matchedYear}`,
          });
        } else {
          // Add recent 3 years
          for (const yr of [2023, 2022, 2021]) {
            results.push({
              id: `${subject.slug}-${yr}`,
              title: `${yr} ${localizedName} Past Paper`,
              exam: subject.exam,
              subject: localizedName,
              year: yr,
              href: `/${locale}/${subject.exam}/${subject.slug}/${yr}`,
            });
          }
        }
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Query status */}
      {query && (
        <div className="text-xs sm:text-sm text-[var(--text-muted)]">
          Showing results for <span className="font-semibold text-[var(--accent-teal)]">&ldquo;{q}&rdquo;</span> ({results.length} found)
        </div>
      )}

      {/* Results List */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {results.map((item) => (
            <Link key={item.id} href={item.href} className="block group">
              <GlassCard
                interactive
                className="p-4 sm:p-5 flex items-center justify-between border-[var(--border-default)] group-hover:border-[var(--accent-teal)]"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Badge variant={item.exam === "ol" ? "teal" : "violet"} size="sm">
                      {item.exam.toUpperCase()} • {item.year}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-teal)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Past Paper & Marking Scheme
                  </p>
                </div>
                <span className="text-xs font-semibold text-[var(--accent-teal)] group-hover:translate-x-1 transition-transform">
                  Download →
                </span>
              </GlassCard>
            </Link>
          ))}
        </div>
      ) : query ? (
        <GlassCard className="p-8 text-center space-y-3">
          <div className="text-3xl">🔍</div>
          <h2 className="text-base font-bold text-[var(--text-primary)]">
            {dict.search.no_results.replace("{query}", q || "")}
          </h2>
          <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
            {dict.search.suggestion}. Or try checking the subject list directly.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              href={`/${locale}/ol`}
              className="px-4 py-2 rounded-xl bg-[var(--surface-3)] text-xs font-semibold text-[var(--accent-teal)] hover:bg-[var(--surface-hover)]"
            >
              Browse O/L Subjects →
            </Link>
            <Link
              href={`/${locale}/al`}
              className="px-4 py-2 rounded-xl bg-[var(--surface-3)] text-xs font-semibold text-[var(--accent-violet)] hover:bg-[var(--surface-hover)]"
            >
              Browse A/L Subjects →
            </Link>
          </div>
        </GlassCard>
      ) : null}
    </div>
  );
}

export default async function SearchPage({
  params,
  searchParams,
}: SearchPageProps) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb
        locale={locale}
        items={[{ label: dict.search.title }]}
      />

      {/* Search Header */}
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
          {dict.search.title}
        </h1>
        <SearchBar
          locale={locale}
          placeholder="Search by subject or year... (e.g. Maths 2019)"
        />
      </div>

      <Suspense fallback={<div className="text-xs text-[var(--text-muted)]">Searching papers...</div>}>
        <SearchResultsList locale={locale} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

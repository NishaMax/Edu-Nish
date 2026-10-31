import Link from "next/link";
import { type Locale } from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface PopularPapersProps {
  locale: Locale;
  dict: Dictionary;
}

interface MockPaper {
  id: string;
  year: number;
  subject: string;
  subjectSlug: string;
  exam: "ol" | "al";
  downloads: string;
  mediums: ("si" | "en" | "ta")[];
}

const FEATURED_PAPERS: MockPaper[] = [
  {
    id: "1",
    year: 2023,
    subject: "Mathematics",
    subjectSlug: "mathematics",
    exam: "ol",
    downloads: "14.2K",
    mediums: ["si", "en", "ta"],
  },
  {
    id: "2",
    year: 2023,
    subject: "Science",
    subjectSlug: "science",
    exam: "ol",
    downloads: "11.8K",
    mediums: ["si", "en", "ta"],
  },
  {
    id: "3",
    year: 2023,
    subject: "Combined Mathematics",
    subjectSlug: "combined-mathematics",
    exam: "al",
    downloads: "9.5K",
    mediums: ["si", "en", "ta"],
  },
  {
    id: "4",
    year: 2022,
    subject: "Physics",
    subjectSlug: "physics",
    exam: "al",
    downloads: "8.1K",
    mediums: ["si", "en"],
  },
  {
    id: "5",
    year: 2023,
    subject: "English Language",
    subjectSlug: "english",
    exam: "ol",
    downloads: "7.9K",
    mediums: ["en"],
  },
  {
    id: "6",
    year: 2022,
    subject: "Chemistry",
    subjectSlug: "chemistry",
    exam: "al",
    downloads: "6.7K",
    mediums: ["si", "en"],
  },
];

export function PopularPapers({ locale, dict }: PopularPapersProps) {
  return (
    <section className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
            🔥 {dict.home.popular.title}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
            Most downloaded papers this month
          </p>
        </div>
        <Link
          href={`/${locale}/ol`}
          className="text-xs sm:text-sm text-[var(--accent-teal)] hover:underline font-medium"
        >
          {dict.home.popular.view_all} →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURED_PAPERS.map((paper) => (
          <Link
            key={paper.id}
            href={`/${locale}/${paper.exam}/${paper.subjectSlug}/${paper.year}`}
            className="block group"
          >
            <GlassCard
              interactive
              className="p-4 sm:p-5 flex flex-col justify-between h-full border-[var(--border-default)] group-hover:border-[var(--accent-teal)]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge
                    variant={paper.exam === "ol" ? "teal" : "violet"}
                    size="sm"
                  >
                    {paper.exam.toUpperCase()} • {paper.year}
                  </Badge>
                  <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1 font-medium">
                    ⬇ {paper.downloads}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-teal)] transition-colors leading-snug">
                  {paper.subject}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Past Paper + Official Marking Scheme
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  {paper.mediums.map((m) => (
                    <span
                      key={m}
                      className="px-1.5 py-0.5 rounded text-[10px] uppercase font-semibold bg-[var(--surface-3)] text-[var(--text-muted)]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <span className="text-[var(--accent-teal)] font-medium group-hover:translate-x-1 transition-transform">
                  Download →
                </span>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </section>
  );
}

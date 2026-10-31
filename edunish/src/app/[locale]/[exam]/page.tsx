import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import {
  EXAM_TYPES,
  EXAM_LABELS,
  getSubjectsByExam,
  getSubjectName,
  type ExamType,
} from "@/lib/constants";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const params: { locale: string; exam: string }[] = [];
  const locales = ["en", "si", "ta"];
  for (const locale of locales) {
    for (const exam of EXAM_TYPES) {
      params.push({ locale, exam });
    }
  }
  return params;
}

interface ExamPageProps {
  params: Promise<{ locale: string; exam: string }>;
}

export async function generateMetadata({
  params,
}: ExamPageProps): Promise<Metadata> {
  const { locale: rawLocale, exam } = await params;
  if (!isValidLocale(rawLocale) || !EXAM_TYPES.includes(exam as ExamType)) {
    return {};
  }

  const locale = rawLocale as Locale;
  const examType = exam as ExamType;
  const examLabel = EXAM_LABELS[examType][locale];

  return {
    title: `${examLabel} Past Papers & Resources | EduNish`,
    description: `Download official ${examLabel} past examination papers, model papers, and marking schemes in Sinhala, English, and Tamil mediums. Instant downloads on EduNish.`,
  };
}

export default async function ExamPage({ params }: ExamPageProps) {
  const { locale: rawLocale, exam: rawExam } = await params;

  if (
    !isValidLocale(rawLocale) ||
    !EXAM_TYPES.includes(rawExam as ExamType)
  ) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const exam = rawExam as ExamType;
  const dict = await getDictionary(locale);

  const subjects = getSubjectsByExam(exam);
  const examTitle = EXAM_LABELS[exam][locale];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb
        locale={locale}
        items={[{ label: exam.toUpperCase() }]}
      />

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--border-default)] text-xs text-[var(--accent-teal)] font-medium">
          <span>{exam.toUpperCase()} EXAM HUB</span>
          <span>•</span>
          <span>Tap 1 of 3</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
          {examTitle}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl">
          Select a subject below to view all past exam papers, answer keys, and model papers from 2000 to 2024.
        </p>
      </div>

      {/* Filter Tabs (Past Papers, Model Papers, Marking Schemes) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
        <button className="px-4 py-2 rounded-xl bg-[var(--accent-teal)] text-[var(--text-inverse)] font-semibold shadow-sm cursor-pointer whitespace-nowrap">
          {dict.subjects.filter.all}
        </button>
        <button className="px-4 py-2 rounded-xl bg-[var(--surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-3)] font-medium border border-[var(--border-subtle)] transition-all cursor-pointer whitespace-nowrap">
          {dict.subjects.filter.past_papers}
        </button>
        <button className="px-4 py-2 rounded-xl bg-[var(--surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-3)] font-medium border border-[var(--border-subtle)] transition-all cursor-pointer whitespace-nowrap">
          {dict.subjects.filter.marking_schemes}
        </button>
        <button className="px-4 py-2 rounded-xl bg-[var(--surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-3)] font-medium border border-[var(--border-subtle)] transition-all cursor-pointer whitespace-nowrap">
          {dict.subjects.filter.model_papers}
        </button>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => {
          const localizedName = getSubjectName(subject, locale);
          return (
            <Link
              key={subject.slug}
              href={`/${locale}/${exam}/${subject.slug}`}
              className="block group"
            >
              <GlassCard
                interactive
                className="h-full border-[var(--border-default)] group-hover:border-[var(--accent-teal)] flex flex-col justify-between p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--surface-2)] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0 border border-[var(--border-subtle)]">
                    {subject.icon}
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-teal)] transition-colors leading-tight">
                      {localizedName}
                    </h2>
                    {locale !== "en" && (
                      <p className="text-xs text-[var(--text-muted)]">
                        {subject.nameEn}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                  <Badge variant="neutral" size="sm">
                    24 Papers
                  </Badge>
                  <span className="text-[var(--accent-teal)] font-medium group-hover:translate-x-1 transition-transform">
                    View Years →
                  </span>
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

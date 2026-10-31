import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import {
  EXAM_TYPES,
  EXAM_SHORT_LABELS,
  SUBJECTS,
  getSubjectBySlug,
  getSubjectName,
  YEARS,
  type ExamType,
} from "@/lib/constants";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const params: { locale: string; exam: string; subject: string }[] = [];
  const locales = ["en", "si", "ta"];
  for (const locale of locales) {
    for (const subject of SUBJECTS) {
      params.push({
        locale,
        exam: subject.exam,
        subject: subject.slug,
      });
    }
  }
  return params;
}

interface SubjectYearsPageProps {
  params: Promise<{ locale: string; exam: string; subject: string }>;
}

export async function generateMetadata({
  params,
}: SubjectYearsPageProps): Promise<Metadata> {
  const { locale: rawLocale, exam, subject: subjectSlug } = await params;
  if (!isValidLocale(rawLocale)) return {};

  const subject = getSubjectBySlug(subjectSlug);
  if (!subject) return {};

  const locale = rawLocale as Locale;
  const localizedSubject = getSubjectName(subject, locale);
  const examLabel = EXAM_SHORT_LABELS[exam as ExamType]?.[locale] || exam.toUpperCase();

  return {
    title: `${localizedSubject} ${examLabel} Past Papers & Answers | EduNish`,
    description: `Complete collection of ${localizedSubject} ${examLabel} past examination question papers and marking schemes from 2000 to 2024. Download PDF in Sinhala, English, and Tamil.`,
  };
}

export default async function SubjectYearsPage({
  params,
}: SubjectYearsPageProps) {
  const { locale: rawLocale, exam: rawExam, subject: subjectSlug } = await params;

  if (
    !isValidLocale(rawLocale) ||
    !EXAM_TYPES.includes(rawExam as ExamType)
  ) {
    notFound();
  }

  const subject = getSubjectBySlug(subjectSlug);
  if (!subject || subject.exam !== rawExam) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const exam = rawExam as ExamType;
  const dict = await getDictionary(locale);
  const localizedSubject = getSubjectName(subject, locale);
  const examLabel = EXAM_SHORT_LABELS[exam][locale];

  // Showcase recent 15 years
  const displayYears = YEARS.slice(0, 15);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb
        locale={locale}
        items={[
          { label: examLabel, href: `/${locale}/${exam}` },
          { label: localizedSubject },
        ]}
      />

      {/* Subject Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl glass border border-[var(--border-default)]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[var(--surface-3)] flex items-center justify-center text-3xl border border-[var(--border-subtle)] shrink-0">
            {subject.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={exam === "ol" ? "teal" : "violet"} size="sm">
                {examLabel}
              </Badge>
              {subject.stream && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[var(--surface-3)] text-[var(--accent-violet)] border border-[var(--border-subtle)] uppercase">
                  {subject.stream} Stream
                </span>
              )}
              {subject.basket && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[var(--surface-3)] text-[var(--accent-teal)] border border-[var(--border-subtle)] uppercase">
                  {subject.basket === "core" ? "Compulsory Core" : subject.basket.replace("-", " ")}
                </span>
              )}
              <span className="text-xs text-[var(--text-muted)]">
                • Select Year
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              {localizedSubject}
            </h1>
            {locale !== "en" && (
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                {subject.nameEn} Past Papers Collection
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)]">
          <span>Available in:</span>
          <span className="px-2 py-1 rounded bg-[var(--surface-2)] border border-[var(--border-subtle)] text-[var(--accent-teal)]">
            සිංහල
          </span>
          <span className="px-2 py-1 rounded bg-[var(--surface-2)] border border-[var(--border-subtle)] text-[var(--accent-teal)]">
            English
          </span>
          <span className="px-2 py-1 rounded bg-[var(--surface-2)] border border-[var(--border-subtle)] text-[var(--accent-teal)]">
            தமிழ்
          </span>
        </div>
      </div>

      {/* Year List Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider px-2">
          <span>Examination Year</span>
          <span>Download & Details</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {displayYears.map((year, index) => {
            const isRecent = index < 3;
            return (
              <Link
                key={year}
                href={`/${locale}/${exam}/${subject.slug}/${year}`}
                className="block group"
              >
                <GlassCard
                  interactive
                  className="p-4 sm:p-5 flex items-center justify-between border-[var(--border-default)] group-hover:border-[var(--accent-teal)]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[var(--surface-2)] group-hover:bg-[var(--accent-teal-dim)] flex items-center justify-center font-black text-base text-[var(--text-primary)] group-hover:text-[var(--accent-teal)] transition-colors border border-[var(--border-subtle)]">
                      {year}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-teal)] transition-colors">
                          {year} {localizedSubject}
                        </span>
                        {isRecent && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[var(--accent-teal-dim)] text-[var(--accent-teal)]">
                            NEW
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-[var(--text-muted)]">
                        <span>Past Paper</span>
                        <span>•</span>
                        <span>Marking Scheme</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[var(--surface-3)] text-[var(--accent-teal)] group-hover:bg-[var(--accent-teal)] group-hover:text-[var(--text-inverse)] transition-colors">
                      {dict.papers.download} →
                    </span>
                  </div>
                </GlassCard>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

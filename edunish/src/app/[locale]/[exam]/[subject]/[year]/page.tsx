import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import {
  EXAM_TYPES,
  EXAM_SHORT_LABELS,
  EXAM_LABELS,
  getSubjectBySlug,
  getSubjectName,
  YEARS,
  type ExamType,
} from "@/lib/constants";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { RequestForm } from "@/components/sections/RequestForm";
import { DownloadBox } from "@/components/sections/DownloadBox";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const params: { locale: string; exam: string; subject: string; year: string }[] = [];
  const locales = ["en", "si", "ta"];
  const sampleSubjects = ["mathematics", "science", "combined-mathematics", "physics"];
  const sampleYears = ["2023", "2022", "2021", "2020", "2019"];

  for (const locale of locales) {
    for (const subjectSlug of sampleSubjects) {
      const subject = getSubjectBySlug(subjectSlug);
      if (!subject) continue;
      for (const year of sampleYears) {
        params.push({
          locale,
          exam: subject.exam,
          subject: subjectSlug,
          year,
        });
      }
    }
  }
  return params;
}

interface PaperDetailPageProps {
  params: Promise<{
    locale: string;
    exam: string;
    subject: string;
    year: string;
  }>;
}

export async function generateMetadata({
  params,
}: PaperDetailPageProps): Promise<Metadata> {
  const { locale: rawLocale, exam, subject: subjectSlug, year } = await params;
  if (!isValidLocale(rawLocale)) return {};

  const subject = getSubjectBySlug(subjectSlug);
  if (!subject) return {};

  const locale = rawLocale as Locale;
  const localizedSubject = getSubjectName(subject, locale);
  const examLabel = EXAM_SHORT_LABELS[exam as ExamType]?.[locale] || exam.toUpperCase();

  const titleEn = `${year} ${examLabel} ${localizedSubject} Past Paper PDF Free Download`;
  const desc = `Download official ${year} ${examLabel} ${localizedSubject} past examination question paper and marking scheme. Available in Sinhala, English, and Tamil. Instant mobile direct download at EduNish.`;

  return {
    title: `${titleEn} | EduNish`,
    description: desc,
    alternates: {
      canonical: `https://edunish.lk/${locale}/${exam}/${subjectSlug}/${year}`,
      languages: {
        en: `https://edunish.lk/en/${exam}/${subjectSlug}/${year}`,
        si: `https://edunish.lk/si/${exam}/${subjectSlug}/${year}`,
        ta: `https://edunish.lk/ta/${exam}/${subjectSlug}/${year}`,
        "x-default": `https://edunish.lk/si/${exam}/${subjectSlug}/${year}`,
      },
    },
  };
}

export default async function PaperDetailPage({
  params,
}: PaperDetailPageProps) {
  const { locale: rawLocale, exam: rawExam, subject: subjectSlug, year } =
    await params;

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
  const examFull = EXAM_LABELS[exam][locale];

  // Schema.org DigitalDocument JSON-LD for top-tier Google ranking
  const paperJsonLd = {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: `${year} ${examLabel} ${localizedSubject} Past Paper`,
    description: `Official ${year} ${examFull} ${localizedSubject} past examination question paper with marking scheme.`,
    datePublished: year,
    inLanguage: ["si", "en", "ta"],
    educationalLevel: exam.toUpperCase(),
    isAccessibleForFree: true,
    encodingFormat: "application/pdf",
    provider: {
      "@type": "EducationalOrganization",
      name: "EduNish",
      url: "https://edunish.lk",
    },
  };

  const otherYears = YEARS.filter((y) => y.toString() !== year).slice(0, 8);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(paperJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
        {/* Breadcrumb */}
        <Breadcrumb
          locale={locale}
          items={[
            { label: examLabel, href: `/${locale}/${exam}` },
            {
              label: localizedSubject,
              href: `/${locale}/${exam}/${subject.slug}`,
            },
            { label: `${year} Paper` },
          ]}
        />

        {/* Paper Header & Details Card */}
        <GlassCard className="p-6 sm:p-8 border-[var(--border-default)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant={exam === "ol" ? "teal" : "violet"} size="sm">
                  {examLabel} • {year}
                </Badge>
                <Badge variant="neutral" size="sm">
                  Official Document
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
                {year} {localizedSubject} Past Paper
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                {examFull} • Department of Examinations Sri Lanka
              </p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end gap-1.5 shrink-0 text-xs text-[var(--text-muted)]">
              <span className="font-semibold text-[var(--accent-teal)] text-sm sm:text-base">
                12.4K Downloads
              </span>
              <span>Updated & Verified</span>
            </div>
          </div>

          {/* Interactive Download Box with Medium Tabs */}
          <DownloadBox
            title={`${year} ${localizedSubject} Past Paper`}
            year={parseInt(year, 10)}
            subject={subject.slug}
            exam={exam}
            initialMedium={locale}
          />

          {/* Social Share Strip */}
          <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">
              Share with classmates & friends:
            </span>
            <ShareButtons
              title={`${year} ${examLabel} ${localizedSubject} Past Paper`}
            />
          </div>
        </GlassCard>

        {/* Paper Metadata Table */}
        <div className="rounded-2xl glass p-5 sm:p-6 border border-[var(--border-subtle)] space-y-3">
          <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
            Document Information
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-[var(--text-muted)] block">Examination</span>
              <span className="font-semibold text-[var(--text-primary)]">
                {examLabel}
              </span>
            </div>
            <div>
              <span className="text-[var(--text-muted)] block">Year</span>
              <span className="font-semibold text-[var(--text-primary)]">
                {year}
              </span>
            </div>
            <div>
              <span className="text-[var(--text-muted)] block">Format</span>
              <span className="font-semibold text-[var(--accent-teal)]">
                Direct PDF (High Quality)
              </span>
            </div>
            <div>
              <span className="text-[var(--text-muted)] block">Size</span>
              <span className="font-semibold text-[var(--text-primary)]">
                ~2.4 MB (Fast Download)
              </span>
            </div>
          </div>
        </div>

        {/* Other Years for this subject */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-[var(--text-primary)]">
            Other Years for {localizedSubject}
          </h3>
          <div className="flex flex-wrap gap-2">
            {otherYears.map((y) => (
              <Link
                key={y}
                href={`/${locale}/${exam}/${subject.slug}/${y}`}
                className="px-3 py-1.5 rounded-xl bg-[var(--surface-2)] hover:bg-[var(--surface-3)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-teal)] transition-all"
              >
                {y} Paper →
              </Link>
            ))}
          </div>
        </div>

        {/* Request Form */}
        <RequestForm
          locale={locale}
          dict={dict}
          defaultSubject={localizedSubject}
          defaultYear={parseInt(year, 10)}
        />
      </div>
    </>
  );
}

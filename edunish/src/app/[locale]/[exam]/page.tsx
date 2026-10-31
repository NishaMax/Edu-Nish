import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import {
  EXAM_TYPES,
  EXAM_LABELS,
  getSubjectsByExam,
  type ExamType,
} from "@/lib/constants";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ExamSubjectExplorer } from "@/components/sections/ExamSubjectExplorer";
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
    title: `${examLabel} Past Papers & Answers — All Streams | EduNish`,
    description: `Complete repository of Sri Lankan ${examLabel} past examination question papers, marking schemes, and model papers organized by official streams and baskets in Sinhala, English, and Tamil.`,
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
  const isAL = exam === "al";

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
          <span>{isAL ? "Official 6 Streams" : "Official Core & 3 Baskets"}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
          {examTitle}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl">
          {isAL
            ? "Organized by the official Sri Lankan Advanced Level streams: Common Subjects, Physical Science (Maths), Biological Science, Commerce, Technology, and Arts."
            : "Organized by the official Sri Lankan Ordinary Level syllabus: 6 Compulsory Core Subjects and the 3 Optional Baskets."}
        </p>
      </div>

      {/* Stream / Basket Interactive Explorer */}
      <ExamSubjectExplorer
        exam={exam}
        locale={locale}
        subjects={subjects}
        examTitle={examTitle}
      />
    </div>
  );
}

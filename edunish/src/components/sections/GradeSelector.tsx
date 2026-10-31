import Link from "next/link";
import { type Locale } from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface GradeSelectorProps {
  locale: Locale;
  dict: Dictionary;
}

export function GradeSelector({ locale, dict }: GradeSelectorProps) {
  return (
    <section className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
          {dict.home.grades.title}
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
          Direct access to past papers, model papers, and answers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* O/L Card */}
        <Link href={`/${locale}/ol`} className="block group">
          <GlassCard
            interactive
            glow="teal"
            className="h-full border-[var(--border-default)] group-hover:border-[var(--accent-teal)] relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--accent-teal-dim)] text-[var(--accent-teal)]">
                  {dict.home.grades.ol_subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] group-hover:text-[var(--accent-teal)] transition-colors">
                  {dict.home.grades.ol_title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Maths, Science, English, Sinhala, Tamil, History & 15+ subjects.
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[var(--surface-2)] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0">
                📝
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--accent-teal)] font-semibold">
              <span>Explore O/L Subjects →</span>
              <span className="text-[var(--text-muted)] font-normal">2000 – 2024</span>
            </div>
          </GlassCard>
        </Link>

        {/* A/L Card */}
        <Link href={`/${locale}/al`} className="block group">
          <GlassCard
            interactive
            glow="violet"
            className="h-full border-[var(--border-default)] group-hover:border-[var(--accent-violet)] relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--accent-violet-dim)] text-[var(--accent-violet)]">
                  {dict.home.grades.al_subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] group-hover:text-[var(--accent-violet)] transition-colors">
                  {dict.home.grades.al_title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Science, Maths, Commerce, Arts & Tech Streams. Marking schemes included.
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[var(--surface-2)] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0">
                🎓
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--accent-violet)] font-semibold">
              <span>Explore A/L Streams →</span>
              <span className="text-[var(--text-muted)] font-normal">2000 – 2024</span>
            </div>
          </GlassCard>
        </Link>
      </div>
    </section>
  );
}

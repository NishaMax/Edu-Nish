import { type Locale } from "@/lib/constants";
import { SearchBar } from "@/components/ui/SearchBar";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface HeroSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function HeroSection({ locale, dict }: HeroSectionProps) {
  return (
    <section className="relative pt-8 pb-12 sm:pt-14 sm:pb-20 overflow-hidden">
      {/* Subtle Ambient Glows - purely CSS, hardware-accelerated */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[250px] sm:h-[350px] bg-[radial-gradient(ellipse_at_center,_var(--accent-teal-dim)_0%,_transparent_70%)] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[200px] sm:w-[350px] h-[200px] bg-[radial-gradient(ellipse_at_center,_var(--accent-violet-dim)_0%,_transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--border-default)] text-xs text-[var(--accent-teal)] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-teal)] animate-pulse" />
          <span>Sri Lanka&apos;s Trilingual Exam Resource</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text-primary)] leading-[1.15]">
          {dict.home.hero.title}{" "}
          <span className="gradient-text-animated block sm:inline">
            {dict.home.hero.subtitle}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          {dict.home.hero.description}
        </p>

        {/* Suggestion-Based Search Bar */}
        <div className="max-w-xl mx-auto pt-2">
          <SearchBar
            locale={locale}
            placeholder={dict.home.hero.search_placeholder}
          />
        </div>

        {/* Quick Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 text-xs sm:text-sm text-[var(--text-muted)] font-medium">
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--accent-teal)]">✓</span> 3-Tap Direct Downloads
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--accent-teal)]">✓</span> Zero Sign-up
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--accent-teal)]">✓</span> High-Speed on Mobile
          </div>
        </div>
      </div>
    </section>
  );
}

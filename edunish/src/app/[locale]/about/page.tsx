import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Metadata } from "next";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) return {};

  return {
    title: "About EduNish | Sri Lanka Educational Resources",
    description: "Learn more about EduNish, our mission to provide zero-cost, high-speed educational access to Grade 6-13 students across Sri Lanka.",
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-8">
      <Breadcrumb
        locale={locale}
        items={[{ label: dict.nav.about }]}
      />

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
          About <span className="text-[var(--accent-teal)]">EduNish</span>
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          Empowering Sri Lankan school students with instant, barrier-free access to past examination papers, model papers, and marking schemes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <GlassCard className="p-6 space-y-3 border-[var(--border-default)]">
          <div className="text-2xl">🎯</div>
          <h2 className="text-base font-bold text-[var(--text-primary)]">
            Our Mission
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            Education is a right, not a luxury. EduNish ensures every student from Jaffna to Matara has access to all O/L and A/L study material without subscriptions, paywalls, or logins.
          </p>
        </GlassCard>

        <GlassCard className="p-6 space-y-3 border-[var(--border-default)]">
          <div className="text-2xl">🚀</div>
          <h2 className="text-base font-bold text-[var(--text-primary)]">
            Engineered for Low-End Devices
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            We specifically benchmark EduNish on 2GB RAM budget phones and 3G networks. Zero bloated tracking scripts, zero heavy previews — pure speed.
          </p>
        </GlassCard>

        <GlassCard className="p-6 space-y-3 border-[var(--border-default)]">
          <div className="text-2xl">🇱🇰</div>
          <h2 className="text-base font-bold text-[var(--text-primary)]">
            True Trilingual Experience
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            Available completely in Sinhala (සිංහල), English, and Tamil (தமிழ்), honoring Sri Lanka&apos;s linguistic diversity and school examination mediums.
          </p>
        </GlassCard>

        <GlassCard className="p-6 space-y-3 border-[var(--border-default)]">
          <div className="text-2xl">🛡️</div>
          <h2 className="text-base font-bold text-[var(--text-primary)]">
            Verified Content
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            All papers and official marking schemes are curated directly from the Department of Examinations, Sri Lanka.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}

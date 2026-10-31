import { getDictionary } from "@/lib/i18n/dictionaries";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { GradeSelector } from "@/components/sections/GradeSelector";
import { PopularPapers } from "@/components/sections/PopularPapers";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import type { Metadata } from "next";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) return {};

  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);

  return {
    title: `${dict.site.name} — ${dict.site.tagline}`,
    description: dict.site.description,
    alternates: {
      canonical: `https://edunish.lk/${locale}`,
      languages: {
        en: "https://edunish.lk/en",
        si: "https://edunish.lk/si",
        ta: "https://edunish.lk/ta",
        "x-default": "https://edunish.lk/si",
      },
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);

  // EducationalOrganization & WebSite Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://edunish.lk/#organization",
        name: "EduNish",
        url: "https://edunish.lk",
        logo: "https://edunish.lk/icons/icon-512.png",
        description: dict.site.description,
        sameAs: ["https://facebook.com/edunish", "https://t.me/edunish"],
      },
      {
        "@type": "WebSite",
        "@id": "https://edunish.lk/#website",
        url: "https://edunish.lk",
        name: "EduNish",
        publisher: {
          "@id": "https://edunish.lk/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://edunish.lk/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-6 sm:space-y-12 pb-16">
        <HeroSection locale={locale} dict={dict} />
        <GradeSelector locale={locale} dict={dict} />
        <PopularPapers locale={locale} dict={dict} />
        <FeaturesSection dict={dict} />
      </div>
    </>
  );
}

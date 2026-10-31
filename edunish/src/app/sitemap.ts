import type { MetadataRoute } from "next";
import { LOCALES, SUBJECTS, YEARS } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://edunish.lk";
  const currentDate = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // 1. Static Core Pages (Home, O/L, A/L, About)
  const corePaths = ["", "/ol", "/al", "/about"];

  for (const path of corePaths) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: currentDate,
        changeFrequency: path === "" ? "daily" : "weekly",
        priority: path === "" ? 1.0 : 0.9,
        alternates: {
          languages: {
            en: `${baseUrl}/en${path}`,
            si: `${baseUrl}/si${path}`,
            ta: `${baseUrl}/ta${path}`,
          },
        },
      });
    }
  }

  // 2. Subject Year Listing Pages (e.g. /en/ol/mathematics)
  for (const subject of SUBJECTS) {
    for (const locale of LOCALES) {
      const subjectPath = `/${subject.exam}/${subject.slug}`;
      entries.push({
        url: `${baseUrl}/${locale}${subjectPath}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${subjectPath}`,
            si: `${baseUrl}/si${subjectPath}`,
            ta: `${baseUrl}/ta${subjectPath}`,
          },
        },
      });
    }
  }

  // 3. Paper Detail & Download Pages (e.g. /en/ol/mathematics/2023)
  // Index recent 10 examination years for each subject
  const indexedYears = YEARS.slice(0, 10);

  for (const subject of SUBJECTS) {
    for (const year of indexedYears) {
      for (const locale of LOCALES) {
        const paperPath = `/${subject.exam}/${subject.slug}/${year}`;
        entries.push({
          url: `${baseUrl}/${locale}${paperPath}`,
          lastModified: currentDate,
          changeFrequency: "monthly",
          priority: 0.7,
          alternates: {
            languages: {
              en: `${baseUrl}/en${paperPath}`,
              si: `${baseUrl}/si${paperPath}`,
              ta: `${baseUrl}/ta${paperPath}`,
            },
          },
        });
      }
    }
  }

  return entries;
}

import type { Locale } from "./config";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  si: () => import("./dictionaries/si.json").then((module) => module.default),
  ta: () => import("./dictionaries/ta.json").then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const load = dictionaries[locale] || dictionaries.en;
  return load();
}

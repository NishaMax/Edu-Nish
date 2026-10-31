// ============================================
// EduNish — Project Constants
// Subjects, grades, years, and trilingual mappings
// ============================================

export const SITE_NAME = "EduNish";
export const SITE_DOMAIN = "edunish.lk";
export const SITE_URL = "https://edunish.lk";

// ---------- Locales ----------
export const LOCALES = ["en", "si", "ta"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "si";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  si: "සිංහල",
  ta: "தமிழ்",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: "EN",
  si: "සි",
  ta: "த",
};

// ---------- Exam Types ----------
export const EXAM_TYPES = ["ol", "al"] as const;
export type ExamType = (typeof EXAM_TYPES)[number];

export const EXAM_LABELS: Record<ExamType, Record<Locale, string>> = {
  ol: {
    en: "O/L (Ordinary Level)",
    si: "සා/පෙළ (සාමාන්‍ය පෙළ)",
    ta: "சா/த (சாதாரண தரம்)",
  },
  al: {
    en: "A/L (Advanced Level)",
    si: "උ/පෙළ (උසස් පෙළ)",
    ta: "உ/த (உயர் தரம்)",
  },
};

export const EXAM_SHORT_LABELS: Record<ExamType, Record<Locale, string>> = {
  ol: { en: "O/L", si: "සා/පෙළ", ta: "சா/த" },
  al: { en: "A/L", si: "උ/පෙළ", ta: "உ/த" },
};

// ---------- Grade Mapping ----------
export const OL_GRADES = [6, 7, 8, 9, 10, 11] as const;
export const AL_GRADES = [12, 13] as const;

export const GRADE_LABELS: Record<Locale, string> = {
  en: "Grade",
  si: "ශ්‍රේණිය",
  ta: "தரம்",
};

// ---------- Paper Types ----------
export const PAPER_TYPES = [
  "past-paper",
  "model-paper",
  "marking-scheme",
  "notes",
] as const;
export type PaperType = (typeof PAPER_TYPES)[number];

export const PAPER_TYPE_LABELS: Record<PaperType, Record<Locale, string>> = {
  "past-paper": {
    en: "Past Paper",
    si: "පසුගිය ප්‍රශ්න පත්‍ර",
    ta: "கடந்த கால வினாத்தாள்",
  },
  "model-paper": {
    en: "Model Paper",
    si: "ආදර්ශ ප්‍රශ්න පත්‍ර",
    ta: "மாதிரி வினாத்தாள்",
  },
  "marking-scheme": {
    en: "Marking Scheme",
    si: "පිළිතුරු පත්‍ර",
    ta: "மதிப்பீட்டு திட்டம்",
  },
  notes: {
    en: "Notes",
    si: "සටහන්",
    ta: "குறிப்புகள்",
  },
};

export const PAPER_TYPE_ICONS: Record<PaperType, string> = {
  "past-paper": "📝",
  "model-paper": "📋",
  "marking-scheme": "✅",
  notes: "📖",
};

// ---------- Medium Labels ----------
export const MEDIUM_LABELS: Record<Locale, Record<Locale, string>> = {
  en: { en: "English", si: "Sinhala", ta: "Tamil" },
  si: { en: "ඉංග්‍රීසි", si: "සිංහල", ta: "දෙමළ" },
  ta: { en: "ஆங்கிலம்", si: "சிங்களம்", ta: "தமிழ்" },
};

// ---------- Subject Definitions ----------
export interface SubjectDef {
  slug: string;
  icon: string;
  nameEn: string;
  nameSi: string;
  nameTa: string;
  exam: ExamType;
}

export const SUBJECTS: SubjectDef[] = [
  // ===== O/L Subjects =====
  { slug: "mathematics", icon: "📐", nameEn: "Mathematics", nameSi: "ගණිතය", nameTa: "கணிதம்", exam: "ol" },
  { slug: "science", icon: "🔬", nameEn: "Science", nameSi: "විද්‍යාව", nameTa: "அறிவியல்", exam: "ol" },
  { slug: "english", icon: "📚", nameEn: "English", nameSi: "ඉංග්‍රීසි", nameTa: "ஆங்கிலம்", exam: "ol" },
  { slug: "sinhala", icon: "📜", nameEn: "Sinhala", nameSi: "සිංහල", nameTa: "சிங்களம்", exam: "ol" },
  { slug: "tamil", icon: "📜", nameEn: "Tamil", nameSi: "දෙමළ", nameTa: "தமிழ்", exam: "ol" },
  { slug: "history", icon: "🏛️", nameEn: "History", nameSi: "ඉතිහාසය", nameTa: "வரலாறு", exam: "ol" },
  { slug: "religion", icon: "🙏", nameEn: "Religion", nameSi: "ආගම", nameTa: "சமயம்", exam: "ol" },
  { slug: "geography", icon: "🌍", nameEn: "Geography", nameSi: "භූගෝල විද්‍යාව", nameTa: "புவியியல்", exam: "ol" },
  { slug: "civic-education", icon: "⚖️", nameEn: "Civic Education", nameSi: "පුරවැසි අධ්‍යාපනය", nameTa: "குடியியல் கல்வி", exam: "ol" },
  { slug: "health", icon: "❤️", nameEn: "Health & Physical Education", nameSi: "සෞඛ්‍ය හා ශාරීරික අධ්‍යාපනය", nameTa: "சுகாதாரம்", exam: "ol" },
  { slug: "ict", icon: "💻", nameEn: "ICT", nameSi: "තොරතුරු තාක්ෂණය", nameTa: "தகவல் தொழில்நுட்பம்", exam: "ol" },
  { slug: "commerce", icon: "🏪", nameEn: "Commerce", nameSi: "වාණිජ්‍යය", nameTa: "வணிகவியல்", exam: "ol" },
  { slug: "art", icon: "🎨", nameEn: "Art", nameSi: "චිත්‍ර", nameTa: "கலை", exam: "ol" },
  { slug: "drama", icon: "🎭", nameEn: "Drama & Theatre", nameSi: "නාට්‍ය හා රංග කලාව", nameTa: "நாடகம்", exam: "ol" },
  { slug: "music", icon: "🎵", nameEn: "Music", nameSi: "සංගීතය", nameTa: "இசை", exam: "ol" },

  // ===== A/L Subjects =====
  { slug: "combined-mathematics", icon: "∑", nameEn: "Combined Mathematics", nameSi: "සංයුක්ත ගණිතය", nameTa: "கூட்டு கணிதம்", exam: "al" },
  { slug: "physics", icon: "⚡", nameEn: "Physics", nameSi: "භෞතික විද්‍යාව", nameTa: "இயற்பியல்", exam: "al" },
  { slug: "chemistry", icon: "🧪", nameEn: "Chemistry", nameSi: "රසායන විද්‍යාව", nameTa: "வேதியியல்", exam: "al" },
  { slug: "biology", icon: "🧬", nameEn: "Biology", nameSi: "ජීව විද්‍යාව", nameTa: "உயிரியல்", exam: "al" },
  { slug: "accounting", icon: "📊", nameEn: "Accounting", nameSi: "ගිණුම්කරණය", nameTa: "கணக்கியல்", exam: "al" },
  { slug: "economics", icon: "📈", nameEn: "Economics", nameSi: "ආර්ථික විද්‍යාව", nameTa: "பொருளியல்", exam: "al" },
  { slug: "business-studies", icon: "💼", nameEn: "Business Studies", nameSi: "ව්‍යාපාර අධ්‍යයනය", nameTa: "வணிகக் கல்வி", exam: "al" },
  { slug: "political-science", icon: "🏛️", nameEn: "Political Science", nameSi: "දේශපාලන විද්‍යාව", nameTa: "அரசியல் அறிவியல்", exam: "al" },
  { slug: "sinhala-literature", icon: "📖", nameEn: "Sinhala Literature", nameSi: "සිංහල සාහිත්‍යය", nameTa: "சிங்கள இலக்கியம்", exam: "al" },
  { slug: "tamil-literature", icon: "📖", nameEn: "Tamil Literature", nameSi: "දෙමළ සාහිත්‍යය", nameTa: "தமிழ் இலக்கியம்", exam: "al" },
  { slug: "al-ict", icon: "💻", nameEn: "ICT", nameSi: "තොරතුරු තාක්ෂණය", nameTa: "தகவல் தொழில்நுட்பம்", exam: "al" },
  { slug: "engineering-technology", icon: "⚙️", nameEn: "Engineering Technology", nameSi: "ඉංජිනේරු තාක්ෂණය", nameTa: "பொறியியல்", exam: "al" },
  { slug: "agriculture", icon: "🌾", nameEn: "Agriculture", nameSi: "කෘෂිකර්මය", nameTa: "விவசாயம்", exam: "al" },
];

// Helper: get subjects by exam type
export function getSubjectsByExam(exam: ExamType): SubjectDef[] {
  return SUBJECTS.filter((s) => s.exam === exam);
}

// Helper: get subject by slug
export function getSubjectBySlug(slug: string): SubjectDef | undefined {
  return SUBJECTS.find((s) => s.slug === slug);
}

// Helper: get localized subject name
export function getSubjectName(subject: SubjectDef, locale: Locale): string {
  switch (locale) {
    case "si": return subject.nameSi;
    case "ta": return subject.nameTa;
    default: return subject.nameEn;
  }
}

// ---------- Year Range ----------
export const MIN_YEAR = 2000;
export const MAX_YEAR = 2026;
export const YEARS = Array.from(
  { length: MAX_YEAR - MIN_YEAR + 1 },
  (_, i) => MAX_YEAR - i
); // Descending: [2026, 2025, ..., 2000]

// ---------- Navigation ----------
export interface NavItem {
  labelKey: string;
  href: string;
  icon?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { labelKey: "nav.home", href: "/", icon: "🏠" },
  { labelKey: "nav.ol", href: "/ol", icon: "📝" },
  { labelKey: "nav.al", href: "/al", icon: "🎓" },
  { labelKey: "nav.about", href: "/about", icon: "ℹ️" },
];

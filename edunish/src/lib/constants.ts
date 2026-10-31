// ============================================
// EduNish — Project Constants
// Official Sri Lankan O/L & A/L Curriculum
// Trilingual Mappings & Stream/Basket Architecture
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
    en: "G.C.E. O/L (Ordinary Level)",
    si: "අ.පො.ස. සා/පෙළ (සාමාන්‍ය පෙළ)",
    ta: "க.பொ.த. சா/த (சாதாரண தரம்)",
  },
  al: {
    en: "G.C.E. A/L (Advanced Level)",
    si: "අ.පො.ස. උ/පෙළ (උසස් පෙළ)",
    ta: "க.பொ.த. உ/த (உயர் தரம்)",
  },
};

export const EXAM_SHORT_LABELS: Record<ExamType, Record<Locale, string>> = {
  ol: { en: "O/L", si: "සා/පෙළ", ta: "சா/த" },
  al: { en: "A/L", si: "උ/පෙළ", ta: "உ/த" },
};

// ---------- A/L Streams Architecture ----------
export interface StreamDef {
  id: string;
  nameEn: string;
  nameSi: string;
  nameTa: string;
  icon: string;
  descriptionEn: string;
}

export const AL_STREAMS: StreamDef[] = [
  {
    id: "common",
    nameEn: "Common Subjects",
    nameSi: "පොදු විෂයයන්",
    nameTa: "பொதுப் பாடங்கள்",
    icon: "🌐",
    descriptionEn: "Compulsory and common for all A/L examination candidates",
  },
  {
    id: "maths",
    nameEn: "Physical Science (Maths)",
    nameSi: "භෞතික විද්‍යා (ගණිත) අංශය",
    nameTa: "பௌதிக விஞ்ஞானப் பிரிவு (கணிதம்)",
    icon: "📐",
    descriptionEn: "Combined Maths, Physics, Chemistry, and ICT",
  },
  {
    id: "bio",
    nameEn: "Biological Science",
    nameSi: "ජීව විද්‍යා අංශය",
    nameTa: "உயிரியல் விஞ்ஞானப் பிரிவு",
    icon: "🧬",
    descriptionEn: "Biology, Chemistry, Physics, and Agricultural Science",
  },
  {
    id: "commerce",
    nameEn: "Commerce Stream",
    nameSi: "වාණිජ අංශය",
    nameTa: "வணிகப் பிரிவு",
    icon: "📊",
    descriptionEn: "Accounting, Business Studies, Economics, Business Statistics & ICT",
  },
  {
    id: "tech",
    nameEn: "Technology Stream",
    nameSi: "තාක්ෂණවේදය අංශය",
    nameTa: "தொழினுட்பப் பிரிவு",
    icon: "⚙️",
    descriptionEn: "Engineering Tech, Bio-Systems Tech, Science for Tech & ICT",
  },
  {
    id: "arts",
    nameEn: "Arts & Humanities",
    nameSi: "කලා අංශය",
    nameTa: "கலைப் பிரிவு",
    icon: "🎨",
    descriptionEn: "Languages, Social Sciences, Religions, Civilizations & Aesthetics",
  },
];

// ---------- O/L Baskets Architecture ----------
export interface BasketDef {
  id: string;
  nameEn: string;
  nameSi: string;
  nameTa: string;
  icon: string;
  badgeEn: string;
  badgeSi: string;
  badgeTa: string;
  descriptionEn: string;
}

export const OL_BASKETS: BasketDef[] = [
  {
    id: "core",
    nameEn: "Compulsory Core Subjects",
    nameSi: "අනිවාර්ය ප්‍රධාන විෂයයන්",
    nameTa: "கட்டாய முதன்மைப் பாடங்கள்",
    icon: "⭐",
    badgeEn: "6 Compulsory Subjects",
    badgeSi: "අනිවාර්ය විෂයයන් 6",
    badgeTa: "6 கட்டாய பாடங்கள்",
    descriptionEn: "Religion, Language & Literature, English, Maths, Science & History",
  },
  {
    id: "basket-1",
    nameEn: "Basket 1: Commerce, Social Studies & Languages",
    nameSi: "කාණ්ඩය 1: වාණිජ, සමාජ අධ්‍යයන හා භාෂා",
    nameTa: "தொகுதி 1: வணிகம், சமூகக் கற்கைகள் மற்றும் மொழிகள்",
    icon: "💼",
    badgeEn: "Choose 1 Subject",
    badgeSi: "1 ක් තෝරාගත යුතුය",
    badgeTa: "1 பாடம் தெரிவு",
    descriptionEn: "Accounting, Geography, Civics, Second Language & Foreign Languages",
  },
  {
    id: "basket-2",
    nameEn: "Basket 2: Aesthetics & Literature",
    nameSi: "කාණ්ඩය 2: සෞන්දර්ය හා සාහිත්‍යය",
    nameTa: "தொகுதி 2: அழகியல் மற்றும் இலக்கியம்",
    icon: "🎭",
    badgeEn: "Choose 1 Subject",
    badgeSi: "1 ක් තෝරාගත යුතුය",
    badgeTa: "1 பாடம் தெரிவு",
    descriptionEn: "Music, Dancing, Art, Drama & Literary Text Appreciation",
  },
  {
    id: "basket-3",
    nameEn: "Basket 3: Technology & Practical Subjects",
    nameSi: "කාණ්ඩය 3: තාක්ෂණික හා ප්‍රායෝගික විෂයයන්",
    nameTa: "தொகுதி 3: தொழினுட்பமும் செய்முறைப் பாடங்களும்",
    icon: "💻",
    badgeEn: "Choose 1 Subject",
    badgeSi: "1 ක් තෝරාගත යුතුය",
    badgeTa: "1 பாடம் தெரிவு",
    descriptionEn: "ICT, Agriculture, Health & PE, Design Tech, Media & Home Economics",
  },
];

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

// ---------- Medium Labels ----------
export const MEDIUM_LABELS: Record<Locale, Record<Locale, string>> = {
  en: { en: "English", si: "Sinhala", ta: "Tamil" },
  si: { en: "ඉංග්‍රීසි", si: "සිංහල", ta: "දෙමළ" },
  ta: { en: "ஆங்கிலம்", si: "சிங்களம்", ta: "தமிழ்" },
};

// ---------- Subject Definition ----------
export interface SubjectDef {
  slug: string;
  icon: string;
  nameEn: string;
  nameSi: string;
  nameTa: string;
  exam: ExamType;
  stream?: string; // For A/L: "common" | "maths" | "bio" | "commerce" | "tech" | "arts"
  basket?: string; // For O/L: "core" | "basket-1" | "basket-2" | "basket-3"
  subCategory?: string; // e.g. "Religions & Civilizations", "Languages", etc.
}

// Full Official Sri Lankan Subject Database
export const SUBJECTS: SubjectDef[] = [
  // ==========================================
  // O/L: Compulsory Core Subjects (6 Subjects)
  // ==========================================
  {
    slug: "religion",
    icon: "🙏",
    nameEn: "Religion (Buddhism / Hinduism / Christianity / Islam)",
    nameSi: "ආගම (බුද්ධ / හින්දු / ක්‍රිස්තු / ඉස්ලාම්)",
    nameTa: "சமயம் (பௌத்தம் / இந்து / கிறிஸ்தவம் / இஸ்லாம்)",
    exam: "ol",
    basket: "core",
  },
  {
    slug: "sinhala-language-literature",
    icon: "📜",
    nameEn: "Sinhala Language & Literature",
    nameSi: "සිංහල භාෂාව හා සාහිත්‍යය",
    nameTa: "சிங்கள மொழியும் இலக்கியமும்",
    exam: "ol",
    basket: "core",
  },
  {
    slug: "tamil-language-literature",
    icon: "📜",
    nameEn: "Tamil Language & Literature",
    nameSi: "දෙමළ භාෂාව හා සාහිත්‍යය",
    nameTa: "தமிழ் மொழியும் இலக்கியமும்",
    exam: "ol",
    basket: "core",
  },
  {
    slug: "english",
    icon: "📚",
    nameEn: "English Language",
    nameSi: "ඉංග්‍රීසි භාෂාව",
    nameTa: "ஆங்கில மொழி",
    exam: "ol",
    basket: "core",
  },
  {
    slug: "mathematics",
    icon: "📐",
    nameEn: "Mathematics",
    nameSi: "ගණිතය",
    nameTa: "கணிதம்",
    exam: "ol",
    basket: "core",
  },
  {
    slug: "science",
    icon: "🔬",
    nameEn: "Science",
    nameSi: "විද්‍යාව",
    nameTa: "விஞ்ஞானம்",
    exam: "ol",
    basket: "core",
  },
  {
    slug: "history",
    icon: "🏛️",
    nameEn: "History",
    nameSi: "ඉතිහාසය",
    nameTa: "வரலாறு",
    exam: "ol",
    basket: "core",
  },

  // ==========================================
  // O/L: Basket 1 (Commerce, Social Studies & Languages)
  // ==========================================
  {
    slug: "business-accounting-studies",
    icon: "📊",
    nameEn: "Business & Accounting Studies",
    nameSi: "ව්‍යාපාර හා ගිණුම්කරණ අධ්‍යයනය",
    nameTa: "வணிகமும் கணக்கீட்டுக் கல்வியும்",
    exam: "ol",
    basket: "basket-1",
  },
  {
    slug: "geography",
    icon: "🌍",
    nameEn: "Geography",
    nameSi: "භූගෝල විද්‍යාව",
    nameTa: "புவியியல்",
    exam: "ol",
    basket: "basket-1",
  },
  {
    slug: "civic-education",
    icon: "⚖️",
    nameEn: "Civic Education",
    nameSi: "පුරවැසි අධ්‍යාපනය",
    nameTa: "குடியியல் கல்வி",
    exam: "ol",
    basket: "basket-1",
  },
  {
    slug: "entrepreneurship-studies",
    icon: "💡",
    nameEn: "Entrepreneurship Studies",
    nameSi: "ව්‍යවසායකත්ව අධ්‍යයනය",
    nameTa: "தொழில்முயற்சி கற்கைகள்",
    exam: "ol",
    basket: "basket-1",
  },
  {
    slug: "second-language",
    icon: "🗣️",
    nameEn: "Second Language (Sinhala / Tamil)",
    nameSi: "දෙවන භාෂාව (සිංහල / දෙමළ)",
    nameTa: "இரண்டாம் மொழி (சிங்களம் / தமிழ்)",
    exam: "ol",
    basket: "basket-1",
  },
  {
    slug: "foreign-languages-ol",
    icon: "🌐",
    nameEn: "Languages (French / German / Hindi / Japanese / Pali / Arabic)",
    nameSi: "භාෂා (ප්‍රංශ / ජර්මන් / හින්දි / ජපන් / පාලි / අරාබි)",
    nameTa: "மொழிகள் (பிரெஞ்சு / ஜேர்மன் / இந்தி / ஜப்பானிய / பாலி / அரபு)",
    exam: "ol",
    basket: "basket-1",
  },

  // ==========================================
  // O/L: Basket 2 (Aesthetics & Literature)
  // ==========================================
  {
    slug: "music",
    icon: "🎵",
    nameEn: "Music (Eastern, Western, Carnatic)",
    nameSi: "සංගීතය (පෙරදිග / බටහිර / කර්නාટક)",
    nameTa: "இசை (கீழ்த்திசை / மேலைத்தேச / கர்நாடக)",
    exam: "ol",
    basket: "basket-2",
  },
  {
    slug: "dancing",
    icon: "💃",
    nameEn: "Dancing (Eastern / Bharatha)",
    nameSi: "නර්තනය (දේශීය / භරත)",
    nameTa: "நடனம் (கீழ்த்திசை / பரதநாட்டியம்)",
    exam: "ol",
    basket: "basket-2",
  },
  {
    slug: "art",
    icon: "🎨",
    nameEn: "Art",
    nameSi: "චිත්‍ර කලාව",
    nameTa: "சித்திரம்",
    exam: "ol",
    basket: "basket-2",
  },
  {
    slug: "english-literature-ol",
    icon: "📖",
    nameEn: "Appreciation of English Literary Texts",
    nameSi: "ඉංග්‍රීසි සාහිත්‍යය රසවින්දනය",
    nameTa: "ஆங்கில இலக்கிய ரசனை",
    exam: "ol",
    basket: "basket-2",
  },
  {
    slug: "drama-and-theatre",
    icon: "🎭",
    nameEn: "Drama & Theatre (Sinhala / Tamil / English)",
    nameSi: "නාට්‍ය හා රංග කලාව (සිංහල / දෙමළ / ඉංග්‍රීසි)",
    nameTa: "நாடகமும் அரங்கியலும் (சிங்களம் / தமிழ் / ஆங்கிலம்)",
    exam: "ol",
    basket: "basket-2",
  },

  // ==========================================
  // O/L: Basket 3 (Technology & Practical Subjects)
  // ==========================================
  {
    slug: "ict",
    icon: "💻",
    nameEn: "Information & Communication Technology (ICT)",
    nameSi: "තොරතුරු හා සන්නිවේදන තාක්ෂණය (ICT)",
    nameTa: "தகவல் தொடர்பு தொழில்நுட்பம் (ICT)",
    exam: "ol",
    basket: "basket-3",
  },
  {
    slug: "agriculture-food-technology",
    icon: "🌾",
    nameEn: "Agriculture & Food Technology",
    nameSi: "කෘෂි හා ආහාර තාක්ෂණය",
    nameTa: "விவசாயமும் உணவுத் தொழினுட்பமும்",
    exam: "ol",
    basket: "basket-3",
  },
  {
    slug: "health-physical-education",
    icon: "❤️",
    nameEn: "Health & Physical Education",
    nameSi: "සෞඛ්‍ය හා ශාරීරික අධ්‍යාපනය",
    nameTa: "உடற்கல்வியும் சுகாதாரமும்",
    exam: "ol",
    basket: "basket-3",
  },
  {
    slug: "communication-media-studies",
    icon: "📡",
    nameEn: "Communication & Media Studies",
    nameSi: "සන්නිවේදනය හා මාධ්‍ය අධ්‍යයනය",
    nameTa: "தொடர்பாடலும் ஊடகக் கற்கைகளும்",
    exam: "ol",
    basket: "basket-3",
  },
  {
    slug: "design-construction-technology",
    icon: "🏗️",
    nameEn: "Design & Technology (Construction / Mechanical / Electrical)",
    nameSi: "නිර්මාණකරණ තාක්ෂණය (ගොඩනැගිලි / යාන්ත්‍රික / විදුලි)",
    nameTa: "வடிவமைப்பு மற்றும் தொழினுட்பம் (கட்டுமானம் / இயந்திரம் / மின்)",
    exam: "ol",
    basket: "basket-3",
  },
  {
    slug: "home-economics",
    icon: "🍳",
    nameEn: "Home Economics / Arts & Crafts",
    nameSi: "ගෘහ ආර්ථික විද්‍යාව / අත්කම්",
    nameTa: "மனைப் பொருளியல் / கைவினை",
    exam: "ol",
    basket: "basket-3",
  },

  // ==========================================
  // A/L: Common Subjects (All Streams)
  // ==========================================
  {
    slug: "general-english",
    icon: "📚",
    nameEn: "General English",
    nameSi: "සාමාන්‍ය ඉංග්‍රීසි",
    nameTa: "பொது ஆங்கிலம்",
    exam: "al",
    stream: "common",
  },
  {
    slug: "common-general-test",
    icon: "🧠",
    nameEn: "Common General Test",
    nameSi: "පොදු සාමාන්‍ය පරීක්ෂණය",
    nameTa: "பொது அறிவுப் பரீட்சை",
    exam: "al",
    stream: "common",
  },
  {
    slug: "git",
    icon: "💻",
    nameEn: "General Information Technology (GIT)",
    nameSi: "සාමාන්‍ය තොරතුරු තාක්ෂණය (GIT)",
    nameTa: "பொதுத் தகவல் தொழினுட்பம் (GIT)",
    exam: "al",
    stream: "common",
  },

  // ==========================================
  // A/L: Physical Science (Mathematics) Stream
  // ==========================================
  {
    slug: "combined-mathematics",
    icon: "∑",
    nameEn: "Combined Mathematics",
    nameSi: "සංයුක්ත ගණිතය",
    nameTa: "கூட்டு கணிதம்",
    exam: "al",
    stream: "maths",
  },
  {
    slug: "physics",
    icon: "⚡",
    nameEn: "Physics",
    nameSi: "භෞතික විද්‍යාව",
    nameTa: "இயற்பியல்",
    exam: "al",
    stream: "maths",
  },
  {
    slug: "chemistry",
    icon: "🧪",
    nameEn: "Chemistry",
    nameSi: "රසායන විද්‍යාව",
    nameTa: "வேதியியல்",
    exam: "al",
    stream: "maths",
  },
  {
    slug: "al-ict",
    icon: "💻",
    nameEn: "Information & Communication Technology (ICT)",
    nameSi: "තොරතුරු හා සන්නිවේදන තාක්ෂණය (ICT)",
    nameTa: "தகவல் தொடர்பு தொழில்நுட்பம் (ICT)",
    exam: "al",
    stream: "maths",
  },

  // ==========================================
  // A/L: Biological Science Stream
  // ==========================================
  {
    slug: "biology",
    icon: "🧬",
    nameEn: "Biology",
    nameSi: "ජීව විද්‍යාව",
    nameTa: "உயிரியல்",
    exam: "al",
    stream: "bio",
  },
  {
    slug: "agricultural-science",
    icon: "🌾",
    nameEn: "Agricultural Science",
    nameSi: "කෘෂි විද්‍යාව",
    nameTa: "விவசாய அறிவியல்",
    exam: "al",
    stream: "bio",
  },

  // ==========================================
  // A/L: Commerce Stream
  // ==========================================
  {
    slug: "accounting",
    icon: "📊",
    nameEn: "Accounting",
    nameSi: "ගිණුම්කරණය",
    nameTa: "கணக்கியல்",
    exam: "al",
    stream: "commerce",
  },
  {
    slug: "business-studies",
    icon: "💼",
    nameEn: "Business Studies",
    nameSi: "ව්‍යාපාර අධ්‍යයනය",
    nameTa: "வணிகக் கல்வி",
    exam: "al",
    stream: "commerce",
  },
  {
    slug: "economics",
    icon: "📈",
    nameEn: "Economics",
    nameSi: "ආර්ථික විද්‍යාව",
    nameTa: "பொருளியல்",
    exam: "al",
    stream: "commerce",
  },
  {
    slug: "business-statistics",
    icon: "📉",
    nameEn: "Business Statistics",
    nameSi: "ව්‍යාපාර සංඛ්‍යානය",
    nameTa: "வணிக புள்ளிவிவரம்",
    exam: "al",
    stream: "commerce",
  },

  // ==========================================
  // A/L: Technology Stream
  // ==========================================
  {
    slug: "engineering-technology",
    icon: "⚙️",
    nameEn: "Engineering Technology (ET)",
    nameSi: "ඉංජිනේරු තාක්ෂණය (ET)",
    nameTa: "பொறியியல் தொழினுட்பம் (ET)",
    exam: "al",
    stream: "tech",
  },
  {
    slug: "bio-systems-technology",
    icon: "🌱",
    nameEn: "Bio-Systems Technology (BST)",
    nameSi: "ජෛව පද්ධති තාක්ෂණය (BST)",
    nameTa: "உயிரியல் முறைமைகள் தொழினுட்பம் (BST)",
    exam: "al",
    stream: "tech",
  },
  {
    slug: "science-for-technology",
    icon: "🔬",
    nameEn: "Science for Technology (SFT)",
    nameSi: "තාක්ෂණවේදය සඳහා විද්‍යාව (SFT)",
    nameTa: "தொழினுட்பத்திற்கான விஞ்ஞானம் (SFT)",
    exam: "al",
    stream: "tech",
  },

  // ==========================================
  // A/L: Arts & Humanities Stream
  // ==========================================
  {
    slug: "political-science",
    icon: "⚖️",
    nameEn: "Political Science",
    nameSi: "දේශපාලන විද්‍යාව",
    nameTa: "அரசியல் விஞ்ஞானம்",
    exam: "al",
    stream: "arts",
    subCategory: "Social Sciences",
  },
  {
    slug: "logic-and-scientific-method",
    icon: "🔍",
    nameEn: "Logic and Scientific Method",
    nameSi: "තර්ක ශාස්ත්‍රය හා විද්‍යාත්මක ක්‍රමය",
    nameTa: "தருக்கமும் விஞ்ஞான முறையும்",
    exam: "al",
    stream: "arts",
    subCategory: "Social Sciences",
  },
  {
    slug: "history-al",
    icon: "🏛️",
    nameEn: "History (Sri Lankan / Indian / European / World)",
    nameSi: "ඉතිහාසය (ශ්‍රී ලංකා / ඉන්දීය / යුරෝපා / ලෝක)",
    nameTa: "வரலாறு (இலங்கை / இந்திய / ஐரோப்பிய / உலக)",
    exam: "al",
    stream: "arts",
    subCategory: "Social Sciences",
  },
  {
    slug: "geography-al",
    icon: "🌍",
    nameEn: "Geography",
    nameSi: "භූගෝල විද්‍යාව",
    nameTa: "புவியியல்",
    exam: "al",
    stream: "arts",
    subCategory: "Social Sciences",
  },
  {
    slug: "mass-media-studies",
    icon: "📡",
    nameEn: "Mass Media & Communication Studies",
    nameSi: "ජනසන්නිවේදනය හා මාධ්‍ය අධ්‍යයනය",
    nameTa: "தொடர்பாடலும் ஊடகக் கற்கைகளும்",
    exam: "al",
    stream: "arts",
    subCategory: "Social Sciences",
  },
  {
    slug: "religions-civilizations",
    icon: "⛩️",
    nameEn: "Civilizations (Buddhist / Hindu / Islamic / Greek & Roman)",
    nameSi: "ශිෂ්ටාචාර (බෞද්ධ / හින්දු / ඉස්ලාමීය / ග්‍රීක සහ රෝම)",
    nameTa: "நாகரிகங்கள் (பௌத்த / இந்து / இஸ்லாமிய / கிரேக்க உரோம)",
    exam: "al",
    stream: "arts",
    subCategory: "Civilizations",
  },
  {
    slug: "sinhala-literature",
    icon: "📖",
    nameEn: "Sinhala Literature",
    nameSi: "සිංහල සාහිත්‍යය",
    nameTa: "சிங்கள இலக்கியம்",
    exam: "al",
    stream: "arts",
    subCategory: "Languages",
  },
  {
    slug: "tamil-literature",
    icon: "📖",
    nameEn: "Tamil Literature",
    nameSi: "දෙමළ සාහිත්‍යය",
    nameTa: "தமிழ் இலக்கியம்",
    exam: "al",
    stream: "arts",
    subCategory: "Languages",
  },
  {
    slug: "english-literature-al",
    icon: "📖",
    nameEn: "English Literature",
    nameSi: "ඉංග්‍රීසි සාහිත්‍යය",
    nameTa: "ஆங்கில இலக்கியம்",
    exam: "al",
    stream: "arts",
    subCategory: "Languages",
  },
  {
    slug: "classical-foreign-languages",
    icon: "🗣️",
    nameEn: "Languages (Pali / Sanskrit / Arabic / French / German / Hindi / Japanese)",
    nameSi: "භාෂා (පාලි / සංස්කෘත / අරාබි / ප්‍රංශ / ජර්මන් / හින්දි / ජපන්)",
    nameTa: "மொழிகள் (பாலி / சமஸ்கிருதம் / அரபு / பிரெஞ்சு / ஜேர்மன் / இந்தி / ஜப்பானிய)",
    exam: "al",
    stream: "arts",
    subCategory: "Languages",
  },
  {
    slug: "art-al",
    icon: "🎨",
    nameEn: "Art",
    nameSi: "චිත්‍ර කලාව",
    nameTa: "சித்திரம்",
    exam: "al",
    stream: "arts",
    subCategory: "Aesthetics",
  },
  {
    slug: "dancing-al",
    icon: "💃",
    nameEn: "Dancing (Traditional / Eastern / Bharatha)",
    nameSi: "දේශීය නැටුම් (උඩරට / පහතරට / සබරගමු / භරත)",
    nameTa: "பாரம்பரிய நடனம் (கீழ்த்திசை / பரதநாட்டியம்)",
    exam: "al",
    stream: "arts",
    subCategory: "Aesthetics",
  },
  {
    slug: "music-al",
    icon: "🎵",
    nameEn: "Music (Eastern / Western / Carnatic)",
    nameSi: "සංගීතය (පෙරදිග / බටහිර / කර්නාટક)",
    nameTa: "இசை (கீழ்த்திசை / மேலைத்தேச / கர்நாடக)",
    exam: "al",
    stream: "arts",
    subCategory: "Aesthetics",
  },
  {
    slug: "drama-theatre-al",
    icon: "🎭",
    nameEn: "Drama & Theatre (Sinhala / Tamil / English)",
    nameSi: "නාට්‍ය හා රංග කලාව (සිංහල / දෙමළ / ඉංග්‍රීසි)",
    nameTa: "நாடகமும் அரங்கியலும் (சிங்களம் / தமிழ் / ஆங்கிலம்)",
    exam: "al",
    stream: "arts",
    subCategory: "Aesthetics",
  },
];

// Helper: get subjects by exam type
export function getSubjectsByExam(exam: ExamType): SubjectDef[] {
  return SUBJECTS.filter((s) => s.exam === exam);
}

// Helper: get subjects by A/L stream
export function getSubjectsByStream(streamId: string): SubjectDef[] {
  return SUBJECTS.filter((s) => s.exam === "al" && (s.stream === streamId || (streamId === "commerce" && (s.slug === "al-ict" || s.slug === "economics")) || (streamId === "bio" && (s.slug === "chemistry" || s.slug === "physics")) || (streamId === "tech" && (s.slug === "al-ict" || s.slug === "agricultural-science"))));
}

// Helper: get subjects by O/L basket
export function getSubjectsByBasket(basketId: string): SubjectDef[] {
  return SUBJECTS.filter((s) => s.exam === "ol" && s.basket === basketId);
}

// Helper: get subject by slug
export function getSubjectBySlug(slug: string): SubjectDef | undefined {
  return SUBJECTS.find((s) => s.slug === slug);
}

// Helper: get localized subject name
export function getSubjectName(subject: SubjectDef, locale: Locale): string {
  switch (locale) {
    case "si":
      return subject.nameSi;
    case "ta":
      return subject.nameTa;
    default:
      return subject.nameEn;
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

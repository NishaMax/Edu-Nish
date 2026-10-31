// ============================================
// EduNish — Persistent Papers Store
// Stores paper metadata with auto-converted Drive URLs.
// Uses local JSON storage (and Supabase-ready).
// ============================================

import fs from "fs";
import path from "path";
import { toDirectDownloadLink } from "./drive";

export interface StoredPaper {
  id: string;
  exam: "ol" | "al";
  subject: string; // subject slug, e.g. "ict", "mathematics"
  year: number;
  medium: "si" | "en" | "ta";
  paperType: "past-paper" | "model-paper" | "marking-scheme" | "notes";
  driveUrl: string;
  directUrl: string;
  downloads: number;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const PAPERS_FILE = path.join(DATA_DIR, "papers.json");

// Default initial seeded papers
const INITIAL_PAPERS: StoredPaper[] = [
  {
    id: "sample-ol-ict-2022-si",
    exam: "ol",
    subject: "ict",
    year: 2022,
    medium: "si",
    paperType: "past-paper",
    driveUrl: "https://drive.google.com/file/d/1SAMPLE_ICT_2022_SI/view?usp=sharing",
    directUrl: "https://drive.google.com/uc?export=download&id=1SAMPLE_ICT_2022_SI",
    downloads: 1420,
    createdAt: new Date().toISOString(),
  },
  {
    id: "sample-ol-maths-2023-si",
    exam: "ol",
    subject: "mathematics",
    year: 2023,
    medium: "si",
    paperType: "past-paper",
    driveUrl: "https://drive.google.com/file/d/1SAMPLE_MATHS_2023_SI/view?usp=sharing",
    directUrl: "https://drive.google.com/uc?export=download&id=1SAMPLE_MATHS_2023_SI",
    downloads: 5120,
    createdAt: new Date().toISOString(),
  },
  {
    id: "sample-al-maths-2023-si",
    exam: "al",
    subject: "combined-mathematics",
    year: 2023,
    medium: "si",
    paperType: "past-paper",
    driveUrl: "https://drive.google.com/file/d/1SAMPLE_COMBINED_MATHS_2023/view?usp=sharing",
    directUrl: "https://drive.google.com/uc?export=download&id=1SAMPLE_COMBINED_MATHS_2023",
    downloads: 8430,
    createdAt: new Date().toISOString(),
  },
];

function ensureDataFile(): StoredPaper[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(PAPERS_FILE)) {
      fs.writeFileSync(PAPERS_FILE, JSON.stringify(INITIAL_PAPERS, null, 2), "utf8");
      return INITIAL_PAPERS;
    }
    const content = fs.readFileSync(PAPERS_FILE, "utf8");
    return JSON.parse(content) as StoredPaper[];
  } catch (error) {
    console.error("Error reading papers store:", error);
    return INITIAL_PAPERS;
  }
}

function writeDataFile(papers: StoredPaper[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(PAPERS_FILE, JSON.stringify(papers, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing papers store:", error);
  }
}

export function getAllPapers(): StoredPaper[] {
  return ensureDataFile();
}

export function findPapers(params: {
  exam?: string;
  subject?: string;
  year?: number;
  medium?: string;
  paperType?: string;
}): StoredPaper[] {
  const papers = ensureDataFile();
  return papers.filter((p) => {
    if (params.exam && p.exam !== params.exam) return false;
    if (params.subject && p.subject !== params.subject) return false;
    if (params.year && p.year !== params.year) return false;
    if (params.medium && p.medium !== params.medium) return false;
    if (params.paperType && p.paperType !== params.paperType) return false;
    return true;
  });
}

export function savePaper(paperData: {
  exam: "ol" | "al";
  subject: string;
  year: number;
  medium: "si" | "en" | "ta";
  paperType: "past-paper" | "model-paper" | "marking-scheme" | "notes";
  driveUrl: string;
}): StoredPaper {
  const papers = ensureDataFile();
  const conversion = toDirectDownloadLink(paperData.driveUrl);
  const directUrl = conversion.isValid && conversion.directUrl ? conversion.directUrl : paperData.driveUrl;

  // Check if paper already exists for this exact combo
  const existingIndex = papers.findIndex(
    (p) =>
      p.exam === paperData.exam &&
      p.subject === paperData.subject &&
      p.year === paperData.year &&
      p.medium === paperData.medium &&
      p.paperType === paperData.paperType
  );

  const newPaper: StoredPaper = {
    id: `${paperData.exam}-${paperData.subject}-${paperData.year}-${paperData.medium}-${paperData.paperType}`,
    ...paperData,
    directUrl,
    downloads: existingIndex >= 0 ? papers[existingIndex].downloads : 0,
    createdAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    papers[existingIndex] = newPaper;
  } else {
    papers.unshift(newPaper);
  }

  writeDataFile(papers);
  return newPaper;
}

export function deletePaper(id: string): boolean {
  const papers = ensureDataFile();
  const filtered = papers.filter((p) => p.id !== id);
  if (filtered.length !== papers.length) {
    writeDataFile(filtered);
    return true;
  }
  return false;
}

export function incrementPaperDownload(id: string): StoredPaper | null {
  const papers = ensureDataFile();
  const paper = papers.find((p) => p.id === id);
  if (paper) {
    paper.downloads += 1;
    writeDataFile(papers);
    return paper;
  }
  return null;
}

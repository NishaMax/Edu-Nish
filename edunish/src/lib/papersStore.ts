// ============================================
// EduNish — Hybrid Papers Store (Supabase + Local fallback)
// If Supabase keys are configured, queries Supabase PostgreSQL.
// Otherwise, seamlessly stores in data/papers.json.
// ============================================

import fs from "fs";
import path from "path";
import { toDirectDownloadLink } from "./drive";
import { getSupabaseServerClient, isSupabaseServerConfigured } from "./supabase/server";

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

function ensureDataFile(): StoredPaper[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(PAPERS_FILE)) {
      return [];
    }
    const content = fs.readFileSync(PAPERS_FILE, "utf8");
    return JSON.parse(content) as StoredPaper[];
  } catch {
    return [];
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

export async function getAllPapers(): Promise<StoredPaper[]> {
  if (isSupabaseServerConfigured) {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase.from("papers").select("*").order("created_at", { ascending: false });
      if (!error && data) {
        return data.map((p) => ({
          id: p.id,
          exam: p.exam,
          subject: p.subject_slug,
          year: p.year,
          medium: p.medium,
          paperType: p.paper_type,
          driveUrl: p.drive_url,
          directUrl: p.direct_url,
          downloads: p.downloads || 0,
          createdAt: p.created_at,
        }));
      }
    }
  }
  return ensureDataFile();
}

export async function findPapers(params: {
  exam?: string;
  subject?: string;
  year?: number;
  medium?: string;
  paperType?: string;
}): Promise<StoredPaper[]> {
  if (isSupabaseServerConfigured) {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      let query = supabase.from("papers").select("*");
      if (params.exam) query = query.eq("exam", params.exam);
      if (params.subject) query = query.eq("subject_slug", params.subject);
      if (params.year) query = query.eq("year", params.year);
      if (params.medium) query = query.eq("medium", params.medium);
      if (params.paperType) query = query.eq("paper_type", params.paperType);

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data.map((p) => ({
          id: p.id,
          exam: p.exam,
          subject: p.subject_slug,
          year: p.year,
          medium: p.medium,
          paperType: p.paper_type,
          driveUrl: p.drive_url,
          directUrl: p.direct_url,
          downloads: p.downloads || 0,
          createdAt: p.created_at,
        }));
      }
    }
  }

  // Local fallback
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

export async function savePaper(paperData: {
  exam: "ol" | "al";
  subject: string;
  year: number;
  medium: "si" | "en" | "ta";
  paperType: "past-paper" | "model-paper" | "marking-scheme" | "notes";
  driveUrl: string;
}): Promise<StoredPaper> {
  const conversion = toDirectDownloadLink(paperData.driveUrl);
  const directUrl = conversion.isValid && conversion.directUrl ? conversion.directUrl : paperData.driveUrl;

  if (isSupabaseServerConfigured) {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const payload = {
        exam: paperData.exam,
        subject_slug: paperData.subject,
        year: paperData.year,
        medium: paperData.medium,
        paper_type: paperData.paperType,
        drive_url: paperData.driveUrl,
        direct_url: directUrl,
      };

      const { data, error } = await supabase
        .from("papers")
        .upsert(payload, { onConflict: "subject_slug,exam,year,medium,paper_type" })
        .select()
        .single();

      if (!error && data) {
        return {
          id: data.id,
          exam: data.exam,
          subject: data.subject_slug,
          year: data.year,
          medium: data.medium,
          paperType: data.paper_type,
          driveUrl: data.drive_url,
          directUrl: data.direct_url,
          downloads: data.downloads || 0,
          createdAt: data.created_at,
        };
      }
    }
  }

  // Local file save
  const papers = ensureDataFile();
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

export async function deletePaper(id: string): Promise<boolean> {
  if (isSupabaseServerConfigured) {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase.from("papers").delete().eq("id", id);
      if (!error) return true;
    }
  }

  const papers = ensureDataFile();
  const filtered = papers.filter((p) => p.id !== id);
  if (filtered.length !== papers.length) {
    writeDataFile(filtered);
    return true;
  }
  return false;
}

export async function incrementPaperDownload(id: string): Promise<void> {
  if (isSupabaseServerConfigured) {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      await supabase.rpc("increment_downloads", { row_id: id });
      return;
    }
  }

  const papers = ensureDataFile();
  const paper = papers.find((p) => p.id === id);
  if (paper) {
    paper.downloads += 1;
    writeDataFile(papers);
  }
}

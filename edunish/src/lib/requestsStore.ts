// ============================================
// EduNish — Student Requests Store (Supabase + Local fallback)
// If Supabase keys are configured, queries Supabase PostgreSQL.
// Otherwise, seamlessly stores in data/requests.json.
// ============================================

import fs from "fs";
import path from "path";
import { getSupabaseServerClient, isSupabaseServerConfigured } from "./supabase/server";

export interface StoredRequest {
  id: string;
  subject: string;
  year?: number;
  medium?: string;
  message?: string;
  status: "pending" | "fulfilled" | "rejected";
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const REQUESTS_FILE = path.join(DATA_DIR, "requests.json");

function ensureRequestsFile(): StoredRequest[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(REQUESTS_FILE)) {
      const initial: StoredRequest[] = [
        {
          id: "req-1",
          subject: "Science Part II",
          year: 2021,
          medium: "si",
          message: "Need the complete essay marking scheme for Western Province",
          status: "pending",
          createdAt: new Date().toISOString(),
        },
        {
          id: "req-2",
          subject: "Business Statistics",
          year: 2022,
          medium: "ta",
          message: "Tamil medium A/L question paper missing",
          status: "pending",
          createdAt: new Date().toISOString(),
        },
      ];
      fs.writeFileSync(REQUESTS_FILE, JSON.stringify(initial, null, 2), "utf8");
      return initial;
    }
    const content = fs.readFileSync(REQUESTS_FILE, "utf8");
    return JSON.parse(content) as StoredRequest[];
  } catch {
    return [];
  }
}

function writeRequestsFile(requests: StoredRequest[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(REQUESTS_FILE, JSON.stringify(requests, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing requests store:", error);
  }
}

export async function getAllRequests(): Promise<StoredRequest[]> {
  if (isSupabaseServerConfigured) {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data.map((r) => ({
          id: r.id,
          subject: r.subject_text || r.subject || "",
          year: r.year,
          medium: r.medium,
          message: r.message,
          status: r.status || "pending",
          createdAt: r.created_at,
        }));
      }
    }
  }
  return ensureRequestsFile();
}

export async function addRequest(item: {
  subject: string;
  year?: number;
  medium?: string;
  message?: string;
}): Promise<StoredRequest> {
  const newRequest: StoredRequest = {
    id: `req-${Date.now()}`,
    subject: item.subject.trim(),
    year: item.year,
    medium: item.medium,
    message: item.message?.trim() || "",
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  if (isSupabaseServerConfigured) {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("requests")
        .insert({
          subject_text: newRequest.subject,
          year: newRequest.year,
          medium: newRequest.medium,
          message: newRequest.message,
          status: newRequest.status,
        })
        .select()
        .single();

      if (!error && data) {
        return {
          id: data.id,
          subject: data.subject_text,
          year: data.year,
          medium: data.medium,
          message: data.message,
          status: data.status,
          createdAt: data.created_at,
        };
      }
    }
  }

  const existing = ensureRequestsFile();
  existing.unshift(newRequest);
  writeRequestsFile(existing);
  return newRequest;
}

export async function updateRequestStatus(
  id: string,
  status: "pending" | "fulfilled" | "rejected"
): Promise<boolean> {
  if (isSupabaseServerConfigured) {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase
        .from("requests")
        .update({ status })
        .eq("id", id);
      if (!error) return true;
    }
  }

  const existing = ensureRequestsFile();
  const target = existing.find((r) => r.id === id);
  if (target) {
    target.status = status;
    writeRequestsFile(existing);
    return true;
  }
  return false;
}

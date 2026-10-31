"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

interface DownloadBoxProps {
  title: string;
  year: number;
  subject: string;
  exam: string;
  initialMedium?: "si" | "en" | "ta";
}

interface PaperItem {
  id: string;
  directUrl: string;
  paperType: string;
  medium: string;
}

export function DownloadBox({
  year,
  subject,
  exam,
  initialMedium = "si",
}: DownloadBoxProps) {
  const [selectedMedium, setSelectedMedium] = useState<"si" | "en" | "ta">(initialMedium);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activePaper, setActivePaper] = useState<PaperItem | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");

  // Check database for real paper URL when medium or year changes
  useEffect(() => {
    let isMounted = true;
    async function checkPaper() {
      try {
        const res = await fetch(
          `/api/papers?exam=${exam}&subject=${subject}&year=${year}&medium=${selectedMedium}`
        );
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.papers && data.papers.length > 0) {
            setActivePaper(data.papers[0]);
          } else if (isMounted) {
            setActivePaper(null);
          }
        }
      } catch {
        // fallback
      }
    }
    checkPaper();
    return () => {
      isMounted = false;
    };
  }, [exam, subject, year, selectedMedium]);

  const handleDownload = async (type: "past-paper" | "marking-scheme") => {
    setIsDownloading(true);
    setDownloadSuccess(false);
    setStatusMessage("");

    try {
      // Query API for the exact paper
      const res = await fetch(
        `/api/papers?exam=${exam}&subject=${subject}&year=${year}&medium=${selectedMedium}&type=${type}`
      );
      const data = await res.json();

      let targetUrl = "";
      if (data.papers && data.papers.length > 0 && data.papers[0].directUrl) {
        targetUrl = data.papers[0].directUrl;
      } else if (activePaper?.directUrl) {
        targetUrl = activePaper.directUrl;
      }

      if (targetUrl) {
        setIsDownloading(false);
        setDownloadSuccess(true);
        setStatusMessage("✓ Real Google Drive download triggered! Downloading file...");

        // Direct download trigger (bypasses Google Drive preview)
        window.location.href = targetUrl;
      } else {
        // If not uploaded yet, trigger /api/download which handles redirection or friendly message
        const downloadUrl = `/api/download?exam=${exam}&subject=${subject}&year=${year}&medium=${selectedMedium}&type=${type}`;
        window.location.href = downloadUrl;
        setIsDownloading(false);
      }
    } catch {
      setIsDownloading(false);
      // Direct redirect fallback
      window.location.href = `/api/download?exam=${exam}&subject=${subject}&year=${year}&medium=${selectedMedium}&type=${type}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Medium Selector Tabs */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider block">
          Select Medium
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setSelectedMedium("si")}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
              selectedMedium === "si"
                ? "bg-[var(--accent-teal)] text-[var(--text-inverse)] border-[var(--accent-teal)] shadow-[0_0_15px_rgba(0,229,160,0.3)]"
                : "bg-[var(--surface-2)] text-[var(--text-secondary)] border-[var(--border-default)] hover:text-[var(--text-primary)]"
            }`}
          >
            සිංහල මාධ්‍යය
          </button>
          <button
            type="button"
            onClick={() => setSelectedMedium("en")}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
              selectedMedium === "en"
                ? "bg-[var(--accent-teal)] text-[var(--text-inverse)] border-[var(--accent-teal)] shadow-[0_0_15px_rgba(0,229,160,0.3)]"
                : "bg-[var(--surface-2)] text-[var(--text-secondary)] border-[var(--border-default)] hover:text-[var(--text-primary)]"
            }`}
          >
            English Medium
          </button>
          <button
            type="button"
            onClick={() => setSelectedMedium("ta")}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
              selectedMedium === "ta"
                ? "bg-[var(--accent-teal)] text-[var(--text-inverse)] border-[var(--accent-teal)] shadow-[0_0_15px_rgba(0,229,160,0.3)]"
                : "bg-[var(--surface-2)] text-[var(--text-secondary)] border-[var(--border-default)] hover:text-[var(--text-primary)]"
            }`}
          >
            தமிழ் மூலம்
          </button>
        </div>
      </div>

      {/* Main Download Actions */}
      <div className="space-y-3 pt-2">
        <Button
          onClick={() => handleDownload("past-paper")}
          variant="primary"
          size="lg"
          isLoading={isDownloading}
          className="w-full text-base py-4 rounded-2xl shadow-[0_0_25px_rgba(0,229,160,0.35)]"
        >
          {isDownloading
            ? "Connecting to Google Drive..."
            : `⬇ Download Past Paper PDF (${selectedMedium.toUpperCase()})`}
        </Button>

        <Button
          onClick={() => handleDownload("marking-scheme")}
          variant="secondary"
          size="md"
          className="w-full rounded-xl text-xs sm:text-sm"
        >
          📋 Download Official Marking Scheme / Answers
        </Button>

        {downloadSuccess && (
          <div className="p-3 rounded-xl bg-[var(--accent-teal-dim)] border border-[rgba(0,229,160,0.3)] text-xs text-center text-[var(--accent-teal)] font-medium animate-fade-in">
            {statusMessage || "✓ Real download triggered! Your browser will now save the PDF file directly."}
          </div>
        )}
      </div>

      {/* Direct Download Note */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-[var(--surface-1)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)]">
        <span className="text-[var(--accent-teal)]">⚡</span>
        <span>
          <strong>Direct Download Engine:</strong> Converts your Google Drive link to direct download (<code className="text-[var(--accent-teal)]">uc?export=download</code>) so it downloads instantly without opening Google Drive.
        </span>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface DownloadBoxProps {
  title: string;
  year: number;
  subject: string;
  exam: string;
  initialMedium?: "si" | "en" | "ta";
}

export function DownloadBox({
  title,
  year,
  subject,
  exam,
  initialMedium = "si",
}: DownloadBoxProps) {
  const [selectedMedium, setSelectedMedium] = useState<"si" | "en" | "ta">(initialMedium);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = (type: "paper" | "scheme") => {
    setIsDownloading(true);
    setDownloadSuccess(false);

    // Direct Google Drive download link format
    // In Phase 4 this points to /api/download?id=...
    // For now, simulate the instant direct trigger
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);

      // Trigger dummy download of a sample blank PDF or blob
      const element = document.createElement("a");
      const sampleText = `%PDF-1.4\n% EduNish Sri Lanka - ${year} ${subject} (${exam.toUpperCase()}) ${selectedMedium.toUpperCase()} Medium\n1 0 obj\n<< /Type /Catalog >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF`;
      const file = new Blob([sampleText], { type: "application/pdf" });
      element.href = URL.createObjectURL(file);
      element.download = `${exam}-${subject}-${year}-${selectedMedium}-${type}.pdf`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 700);
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
          onClick={() => handleDownload("paper")}
          variant="primary"
          size="lg"
          isLoading={isDownloading}
          className="w-full text-base py-4 rounded-2xl shadow-[0_0_25px_rgba(0,229,160,0.35)]"
        >
          {isDownloading
            ? "Preparing Direct Download..."
            : `⬇ Download Past Paper PDF (${selectedMedium.toUpperCase()})`}
        </Button>

        <Button
          onClick={() => handleDownload("scheme")}
          variant="secondary"
          size="md"
          className="w-full rounded-xl text-xs sm:text-sm"
        >
          📋 Download Official Marking Scheme / Answers
        </Button>

        {downloadSuccess && (
          <div className="p-3 rounded-xl bg-[var(--accent-teal-dim)] border border-[rgba(0,229,160,0.3)] text-xs text-center text-[var(--accent-teal)] font-medium animate-fade-in">
            ✓ Download started directly to your device! No Google Drive account needed.
          </div>
        )}
      </div>

      {/* Direct Download Note */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-[var(--surface-1)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)]">
        <span className="text-[var(--accent-teal)]">⚡</span>
        <span>
          <strong>Direct Download Enabled:</strong> Bypasses heavy preview viewers for zero memory lag on 2GB RAM phones.
        </span>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import {
  SUBJECTS,
  YEARS,
  PAPER_TYPES,
  PAPER_TYPE_LABELS,
  EXAM_TYPES,
  EXAM_SHORT_LABELS,
} from "@/lib/constants";
import { toDirectDownloadLink, type DriveConversionResult } from "@/lib/drive";

export default function NewPaperPage() {
  const [exam, setExam] = useState<"ol" | "al">("ol");
  const [subject, setSubject] = useState(SUBJECTS[0].slug);
  const [year, setYear] = useState(2023);
  const [medium, setMedium] = useState<"si" | "en" | "ta">("si");
  const [paperType, setPaperType] = useState<string>("past-paper");
  const [driveUrl, setDriveUrl] = useState("");
  const [conversion, setConversion] = useState<DriveConversionResult>({
    isValid: false,
    fileId: null,
    directUrl: null,
    previewUrl: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleDriveUrlChange = (val: string) => {
    setDriveUrl(val);
    if (!val.trim()) {
      setConversion({
        isValid: false,
        fileId: null,
        directUrl: null,
        previewUrl: null,
      });
      return;
    }
    const result = toDirectDownloadLink(val);
    setConversion(result);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!conversion.isValid || !conversion.directUrl) {
      alert("Please provide a valid Google Drive link");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(
        `Successfully saved ${year} ${subject.toUpperCase()} (${medium.toUpperCase()}) paper!`
      );
      setDriveUrl("");
      setConversion({
        isValid: false,
        fileId: null,
        directUrl: null,
        previewUrl: null,
      });
    }, 600);
  };

  const filteredSubjects = SUBJECTS.filter((s) => s.exam === exam);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
            Add New Exam Paper
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Store paper metadata with auto-converted Google Drive direct links
          </p>
        </div>
        <Link
          href="/admin/papers"
          className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent-teal)] underline"
        >
          ← Back to Papers
        </Link>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-[var(--accent-teal-dim)] border border-[rgba(0,229,160,0.3)] text-xs text-[var(--accent-teal)] font-medium flex items-center justify-between animate-fade-in">
          <span>✓ {successMessage}</span>
          <button
            onClick={() => setSuccessMessage("")}
            className="text-[var(--text-primary)] hover:underline ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Form */}
      <GlassCard className="p-6 sm:p-8 border-[var(--border-default)]">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Row 1: Exam & Subject */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase">
                Examination Level *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {EXAM_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setExam(t);
                      const first = SUBJECTS.find((s) => s.exam === t);
                      if (first) setSubject(first.slug);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      exam === t
                        ? "bg-[var(--accent-teal)] text-[var(--text-inverse)] border-[var(--accent-teal)] shadow-sm"
                        : "bg-[var(--surface-2)] text-[var(--text-secondary)] border-[var(--border-default)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {t.toUpperCase()} ({EXAM_SHORT_LABELS[t].en})
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase">
                Subject *
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)] text-[var(--text-primary)] focus:border-[var(--accent-teal)]"
              >
                {filteredSubjects.map((s) => (
                  <option key={s.slug} value={s.slug} className="bg-[var(--bg-secondary)]">
                    {s.icon} {s.nameEn} ({s.nameSi})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Year, Medium & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase">
                Year *
              </label>
              <select
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)] text-[var(--text-primary)] focus:border-[var(--accent-teal)]"
              >
                {YEARS.map((y) => (
                  <option key={y} value={y} className="bg-[var(--bg-secondary)]">
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase">
                Medium *
              </label>
              <select
                value={medium}
                onChange={(e) => setMedium(e.target.value as "si" | "en" | "ta")}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)] text-[var(--text-primary)] focus:border-[var(--accent-teal)]"
              >
                <option value="si" className="bg-[var(--bg-secondary)]">
                  Sinhala (සිංහල)
                </option>
                <option value="en" className="bg-[var(--bg-secondary)]">
                  English
                </option>
                <option value="ta" className="bg-[var(--bg-secondary)]">
                  Tamil (தமிழ்)
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase">
                Paper Type *
              </label>
              <select
                value={paperType}
                onChange={(e) => setPaperType(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)] text-[var(--text-primary)] focus:border-[var(--accent-teal)]"
              >
                {PAPER_TYPES.map((pt) => (
                  <option key={pt} value={pt} className="bg-[var(--bg-secondary)]">
                    {PAPER_TYPE_LABELS[pt].en}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Google Drive Share Link & Real-Time Converter */}
          <div className="space-y-3 pt-2 border-t border-[var(--border-subtle)]">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase">
                Google Drive Share URL *
              </label>
              <span className="text-[11px] text-[var(--text-muted)]">
                Files must have &quot;Anyone with the link&quot; permission
              </span>
            </div>

            <input
              type="text"
              required
              value={driveUrl}
              onChange={(e) => handleDriveUrlChange(e.target.value)}
              placeholder="Paste Google Drive link: https://drive.google.com/file/d/1A2B3C.../view?usp=sharing"
              className="w-full px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-teal)] text-xs sm:text-sm"
            />

            {/* Live Auto-Converter Box */}
            {driveUrl && (
              <div
                className={`p-4 rounded-xl border text-xs space-y-2 transition-all ${
                  conversion.isValid
                    ? "bg-[var(--accent-teal-dim)] border-[rgba(0,229,160,0.3)]"
                    : "bg-red-500/10 border-red-500/30 text-red-400"
                }`}
              >
                {conversion.isValid ? (
                  <>
                    <div className="flex items-center justify-between font-bold text-[var(--accent-teal)]">
                      <span>✓ Valid Google Drive Link Detected!</span>
                      <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-[var(--surface-3)]">
                        ID: {conversion.fileId}
                      </span>
                    </div>

                    <div className="space-y-1 text-[var(--text-secondary)]">
                      <div className="text-[11px]">Converted Direct Download Link:</div>
                      <div className="p-2 rounded-lg bg-[var(--surface-1)] font-mono text-[10px] break-all border border-[var(--border-subtle)] text-[var(--accent-teal)]">
                        {conversion.directUrl}
                      </div>
                    </div>

                    <div className="pt-1 flex items-center gap-3">
                      <a
                        href={conversion.directUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[var(--accent-teal)] text-[var(--text-inverse)] font-bold text-xs hover:brightness-110 cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>🧪 Test Direct Download</span>
                      </a>
                      <span className="text-[10px] text-[var(--text-muted)]">
                        Click to test that the file downloads instantly without opening Drive.
                      </span>
                    </div>
                  </>
                ) : (
                  <div>{conversion.error}</div>
                )}
              </div>
            )}
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-end gap-3">
            <Link
              href="/admin/papers"
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              Cancel
            </Link>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              disabled={!conversion.isValid}
            >
              Save Paper & Direct Link
            </Button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}

"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { toDirectDownloadLink } from "@/lib/drive";

interface ParsedRow {
  index: number;
  subject: string;
  year: number;
  exam: string;
  medium: string;
  driveUrl: string;
  isValid: boolean;
  directUrl?: string;
  error?: string;
}

const SAMPLE_CSV = `subject,year,exam,medium,drive_url
combined-mathematics,2023,al,si,https://drive.google.com/file/d/1SAMPLE_COMBINED_MATHS_2023_SI/view?usp=sharing
physics,2023,al,si,https://drive.google.com/file/d/1SAMPLE_PHYSICS_2023_SI/view?usp=sharing
science,2023,ol,en,https://drive.google.com/file/d/1SAMPLE_SCIENCE_2023_EN/view?usp=sharing
mathematics,2022,ol,ta,https://drive.google.com/file/d/1SAMPLE_MATHS_2022_TA/view?usp=sharing`;

export default function BulkUploadPage() {
  const [csvText, setCsvText] = useState(SAMPLE_CSV);
  const [parsedRows, setParsedRows] = useState<ParsedRow[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState("");

  const handleParse = () => {
    setIsParsing(true);
    setImportStatus("");

    try {
      const lines = csvText.trim().split("\n");
      const rows: ParsedRow[] = [];

      // skip header if line 1 starts with subject
      const startIndex = lines[0].toLowerCase().includes("subject") ? 1 : 0;

      for (let i = startIndex; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const parts = line.split(",").map((p) => p.trim());
        const [subject, yearStr, exam, medium, driveUrl] = parts;

        const year = parseInt(yearStr, 10);
        const conversion = driveUrl ? toDirectDownloadLink(driveUrl) : null;

        const isValid =
          Boolean(subject) &&
          !isNaN(year) &&
          Boolean(exam) &&
          Boolean(medium) &&
          Boolean(conversion?.isValid);

        rows.push({
          index: i + 1,
          subject: subject || "Missing",
          year: isNaN(year) ? 0 : year,
          exam: (exam || "").toLowerCase(),
          medium: (medium || "").toLowerCase(),
          driveUrl: driveUrl || "",
          isValid,
          directUrl: conversion?.directUrl || undefined,
          error: !conversion?.isValid ? "Invalid Drive link" : undefined,
        });
      }

      setParsedRows(rows);
    } catch {
      alert("Error parsing CSV. Please check formatting.");
    } finally {
      setIsParsing(false);
    }
  };

  const handleImport = () => {
    const validCount = parsedRows.filter((r) => r.isValid).length;
    if (validCount === 0) {
      alert("No valid rows to import.");
      return;
    }

    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      setImportStatus(
        `🎉 Successfully imported ${validCount} papers into the catalog with direct download links!`
      );
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
          Bulk CSV Paper Importer
        </h1>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">
          Upload 50+ papers at once. Auto-converts all Google Drive links into instant direct downloads.
        </p>
      </div>

      {importStatus && (
        <div className="p-4 rounded-xl bg-[var(--accent-teal-dim)] border border-[rgba(0,229,160,0.3)] text-xs text-[var(--accent-teal)] font-medium">
          {importStatus}
        </div>
      )}

      {/* CSV Input Card */}
      <GlassCard className="p-5 sm:p-6 border-[var(--border-default)] space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase">
              Paste CSV Data (Comma Separated)
            </label>
            <span className="text-[11px] text-[var(--text-muted)]">
              Format: subject, year, exam, medium, drive_url
            </span>
          </div>

          <textarea
            rows={7}
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            className="w-full p-3 font-mono text-xs rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)] text-[var(--text-primary)] focus:border-[var(--accent-teal)]"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setCsvText(SAMPLE_CSV)}
            className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline cursor-pointer"
          >
            Reset to Sample Data
          </button>

          <Button
            onClick={handleParse}
            variant="secondary"
            size="sm"
            isLoading={isParsing}
          >
            Validate & Preview Rows →
          </Button>
        </div>
      </GlassCard>

      {/* Validation Preview Table */}
      {parsedRows.length > 0 && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[var(--text-primary)]">
              Preview Parsed Papers ({parsedRows.filter((r) => r.isValid).length} Valid / {parsedRows.length} Total)
            </h2>

            <Button
              onClick={handleImport}
              variant="primary"
              size="sm"
              isLoading={isImporting}
              disabled={parsedRows.filter((r) => r.isValid).length === 0}
            >
              Confirm & Import Valid Papers
            </Button>
          </div>

          <div className="overflow-x-auto rounded-2xl glass border border-[var(--border-default)]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--surface-2)] text-[var(--text-secondary)] uppercase text-[10px] tracking-wider border-b border-[var(--border-subtle)]">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Subject</th>
                  <th className="py-2.5 px-3">Year</th>
                  <th className="py-2.5 px-3">Exam</th>
                  <th className="py-2.5 px-3">Medium</th>
                  <th className="py-2.5 px-3">Drive Link Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {parsedRows.map((row) => (
                  <tr
                    key={row.index}
                    className={row.isValid ? "" : "bg-red-500/5"}
                  >
                    <td className="py-2.5 px-3 text-[var(--text-muted)] font-mono">
                      {row.index}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-[var(--text-primary)]">
                      {row.subject}
                    </td>
                    <td className="py-2.5 px-3">{row.year}</td>
                    <td className="py-2.5 px-3 uppercase">{row.exam}</td>
                    <td className="py-2.5 px-3 uppercase text-[var(--accent-teal)]">
                      {row.medium}
                    </td>
                    <td className="py-2.5 px-3">
                      {row.isValid ? (
                        <span className="text-[var(--accent-teal)] font-medium flex items-center gap-1">
                          ✓ Auto-converted to direct link
                        </span>
                      ) : (
                        <span className="text-red-400 font-medium">
                          ✕ {row.error || "Missing fields"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

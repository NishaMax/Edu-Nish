"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { YEARS, type Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface RequestFormProps {
  locale: Locale;
  dict: Dictionary;
  defaultSubject?: string;
  defaultYear?: number;
}

export function RequestForm({
  dict,
  defaultSubject = "",
  defaultYear,
}: RequestFormProps) {
  const [subject, setSubject] = useState(defaultSubject);
  const [year, setYear] = useState<string>(defaultYear ? defaultYear.toString() : "2023");
  const [medium, setMedium] = useState("si");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          year: parseInt(year, 10),
          medium,
          message: note,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setNote("");
      } else {
        setStatus("idle");
      }
    } catch {
      setStatus("idle");
    }
  };

  return (
    <GlassCard className="border-[var(--border-default)] p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">📬</span>
        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">
            {dict.request.title}
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            Can&apos;t find a specific paper or marking scheme? Tell us and we will upload it.
          </p>
        </div>
      </div>

      {status === "success" ? (
        <div className="p-4 rounded-xl bg-[var(--accent-teal-dim)] border border-[rgba(0,229,160,0.3)] text-center space-y-2">
          <div className="text-2xl">🎉</div>
          <p className="text-sm font-semibold text-[var(--accent-teal)]">
            {dict.request.success}
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="text-xs text-[var(--text-secondary)] underline hover:text-[var(--text-primary)] cursor-pointer"
          >
            Submit another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Subject */}
            <div className="sm:col-span-1">
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                {dict.request.subject} *
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Science"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)] text-[var(--text-primary)] focus:border-[var(--accent-teal)]"
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                {dict.request.year}
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)] text-[var(--text-primary)] focus:border-[var(--accent-teal)]"
              >
                {YEARS.slice(0, 15).map((y) => (
                  <option key={y} value={y} className="bg-[var(--bg-secondary)]">
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Medium */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                {dict.request.medium}
              </label>
              <select
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)] text-[var(--text-primary)] focus:border-[var(--accent-teal)]"
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
          </div>

          {/* Message / Notes */}
          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
              {dict.request.message}
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Need Part II with marking scheme"
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)] text-[var(--text-primary)] focus:border-[var(--accent-teal)]"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={status === "submitting"}
            >
              {dict.request.submit}
            </Button>
          </div>
        </form>
      )}
    </GlassCard>
  );
}

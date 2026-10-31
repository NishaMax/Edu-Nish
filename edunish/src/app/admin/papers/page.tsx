"use client";

import { useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { SUBJECTS } from "@/lib/constants";

interface MockPaperItem {
  id: string;
  subjectName: string;
  exam: "ol" | "al";
  year: number;
  medium: "si" | "en" | "ta";
  type: string;
  downloads: number;
  fileId: string;
  directUrl: string;
}

const INITIAL_PAPERS: MockPaperItem[] = [
  {
    id: "1",
    subjectName: "Combined Mathematics",
    exam: "al",
    year: 2023,
    medium: "si",
    type: "Past Paper",
    downloads: 14200,
    fileId: "1pX7y_SAMPLE_COMBINED_MATHS_2023_SI",
    directUrl: "https://drive.google.com/uc?export=download&id=1pX7y_SAMPLE_COMBINED_MATHS_2023_SI",
  },
  {
    id: "2",
    subjectName: "Combined Mathematics",
    exam: "al",
    year: 2023,
    medium: "en",
    type: "Past Paper",
    downloads: 8900,
    fileId: "1pX7y_SAMPLE_COMBINED_MATHS_2023_EN",
    directUrl: "https://drive.google.com/uc?export=download&id=1pX7y_SAMPLE_COMBINED_MATHS_2023_EN",
  },
  {
    id: "3",
    subjectName: "Mathematics",
    exam: "ol",
    year: 2023,
    medium: "si",
    type: "Past Paper",
    downloads: 18500,
    fileId: "1mAth_SAMPLE_MATHS_OL_2023_SI",
    directUrl: "https://drive.google.com/uc?export=download&id=1mAth_SAMPLE_MATHS_OL_2023_SI",
  },
  {
    id: "4",
    subjectName: "Science",
    exam: "ol",
    year: 2023,
    medium: "si",
    type: "Past Paper",
    downloads: 15400,
    fileId: "1sCie_SAMPLE_SCIENCE_OL_2023_SI",
    directUrl: "https://drive.google.com/uc?export=download&id=1sCie_SAMPLE_SCIENCE_OL_2023_SI",
  },
  {
    id: "5",
    subjectName: "Physics",
    exam: "al",
    year: 2023,
    medium: "si",
    type: "Marking Scheme",
    downloads: 9200,
    fileId: "1pHys_SAMPLE_PHYSICS_AL_2023_SI",
    directUrl: "https://drive.google.com/uc?export=download&id=1pHys_SAMPLE_PHYSICS_AL_2023_SI",
  },
  {
    id: "6",
    subjectName: "Business & Accounting Studies",
    exam: "ol",
    year: 2022,
    medium: "ta",
    type: "Past Paper",
    downloads: 6400,
    fileId: "1aCct_SAMPLE_ACCOUNTING_OL_2022_TA",
    directUrl: "https://drive.google.com/uc?export=download&id=1aCct_SAMPLE_ACCOUNTING_OL_2022_TA",
  },
  {
    id: "7",
    subjectName: "Information & Communication Technology",
    exam: "ol",
    year: 2023,
    medium: "en",
    type: "Past Paper",
    downloads: 7100,
    fileId: "1iCt_SAMPLE_ICT_OL_2023_EN",
    directUrl: "https://drive.google.com/uc?export=download&id=1iCt_SAMPLE_ICT_OL_2023_EN",
  },
];

export default function AdminPapersListPage() {
  const [papers, setPapers] = useState<MockPaperItem[]>(INITIAL_PAPERS);
  const [search, setSearch] = useState("");
  const [examFilter, setExamFilter] = useState<"all" | "ol" | "al">("all");
  const [mediumFilter, setMediumFilter] = useState<"all" | "si" | "en" | "ta">("all");

  const filtered = papers.filter((p) => {
    if (examFilter !== "all" && p.exam !== examFilter) return false;
    if (mediumFilter !== "all" && p.medium !== mediumFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchSub = p.subjectName.toLowerCase().includes(q);
      const matchYear = p.year.toString().includes(q);
      const matchType = p.type.toLowerCase().includes(q);
      return matchSub || matchYear || matchType;
    }
    return true;
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this paper metadata?")) {
      setPapers((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
            Exam Papers Database
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Manage metadata, check direct download URLs, and delete records
          </p>
        </div>

        <Link
          href="/admin/papers/new"
          className="px-4 py-2.5 rounded-xl bg-[var(--accent-teal)] text-[var(--text-inverse)] font-bold text-xs sm:text-sm hover:brightness-110 shadow-sm transition-all flex items-center gap-1.5 self-start cursor-pointer"
        >
          <span>➕</span>
          <span>Add New Paper</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <GlassCard className="p-4 border-[var(--border-default)] space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by subject, year or type..."
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)] text-[var(--text-primary)] focus:border-[var(--accent-teal)]"
          />

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setExamFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                examFilter === "all"
                  ? "bg-[var(--accent-teal)] text-[var(--text-inverse)]"
                  : "bg-[var(--surface-2)] text-[var(--text-secondary)]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setExamFilter("ol")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                examFilter === "ol"
                  ? "bg-[var(--accent-teal)] text-[var(--text-inverse)]"
                  : "bg-[var(--surface-2)] text-[var(--text-secondary)]"
              }`}
            >
              O/L
            </button>
            <button
              onClick={() => setExamFilter("al")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                examFilter === "al"
                  ? "bg-[var(--accent-teal)] text-[var(--text-inverse)]"
                  : "bg-[var(--surface-2)] text-[var(--text-secondary)]"
              }`}
            >
              A/L
            </button>
          </div>

          <div className="flex items-center gap-1.5 justify-end">
            <span className="text-xs text-[var(--text-muted)]">Medium:</span>
            {(["all", "si", "en", "ta"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMediumFilter(m)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase cursor-pointer ${
                  mediumFilter === m
                    ? "bg-[var(--accent-teal)] text-[var(--text-inverse)]"
                    : "bg-[var(--surface-2)] text-[var(--text-secondary)]"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl glass border border-[var(--border-default)]">
        <table className="w-full text-left text-xs">
          <thead className="bg-[var(--surface-2)] text-[var(--text-secondary)] uppercase text-[10px] tracking-wider border-b border-[var(--border-subtle)]">
            <tr>
              <th className="py-3 px-4">Subject</th>
              <th className="py-3 px-3">Exam</th>
              <th className="py-3 px-3">Year</th>
              <th className="py-3 px-3">Medium</th>
              <th className="py-3 px-3">Type</th>
              <th className="py-3 px-3">Downloads</th>
              <th className="py-3 px-3">Google Drive Link</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {filtered.map((paper) => (
              <tr key={paper.id} className="hover:bg-[var(--surface-hover)] transition-colors">
                <td className="py-3.5 px-4 font-bold text-[var(--text-primary)]">
                  {paper.subjectName}
                </td>
                <td className="py-3.5 px-3">
                  <Badge variant={paper.exam === "ol" ? "teal" : "violet"} size="sm">
                    {paper.exam.toUpperCase()}
                  </Badge>
                </td>
                <td className="py-3.5 px-3 font-semibold text-[var(--text-primary)]">
                  {paper.year}
                </td>
                <td className="py-3.5 px-3 uppercase font-semibold text-[var(--accent-teal)]">
                  {paper.medium}
                </td>
                <td className="py-3.5 px-3 text-[var(--text-secondary)]">
                  {paper.type}
                </td>
                <td className="py-3.5 px-3 text-[var(--text-muted)]">
                  {paper.downloads.toLocaleString()}
                </td>
                <td className="py-3.5 px-3">
                  <a
                    href={paper.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[var(--accent-teal)] hover:underline inline-flex items-center gap-1 font-mono"
                  >
                    <span>Test Download</span>
                    <span>↗</span>
                  </a>
                </td>
                <td className="py-3.5 px-4 text-right space-x-3">
                  <button
                    onClick={() => handleDelete(paper.id)}
                    className="text-red-400 hover:underline cursor-pointer font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

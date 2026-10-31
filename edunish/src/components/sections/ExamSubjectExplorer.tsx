"use client";

import { useState } from "react";
import Link from "next/link";
import {
  type Locale,
  type ExamType,
  type SubjectDef,
  AL_STREAMS,
  OL_BASKETS,
  getSubjectName,
} from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";

interface ExamSubjectExplorerProps {
  exam: ExamType;
  locale: Locale;
  subjects: SubjectDef[];
  examTitle: string;
}

export function ExamSubjectExplorer({
  exam,
  locale,
  subjects,
}: ExamSubjectExplorerProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const isAL = exam === "al";

  // Stream / Basket groups
  const groups = isAL
    ? AL_STREAMS.map((stream) => {
        const streamSubjects = subjects.filter((s) => {
          if (s.stream === stream.id) return true;
          // Dual stream subjects
          if (stream.id === "maths" && s.slug === "al-ict") return true;
          if (stream.id === "bio" && (s.slug === "chemistry" || s.slug === "physics")) return true;
          if (stream.id === "commerce" && (s.slug === "al-ict" || s.slug === "economics")) return true;
          if (stream.id === "tech" && (s.slug === "al-ict" || s.slug === "agricultural-science")) return true;
          return false;
        });

        const name =
          locale === "si"
            ? stream.nameSi
            : locale === "ta"
            ? stream.nameTa
            : stream.nameEn;

        return {
          id: stream.id,
          name,
          icon: stream.icon,
          badge: isAL ? "A/L Stream" : "",
          description: stream.descriptionEn,
          subjects: streamSubjects,
        };
      })
    : OL_BASKETS.map((basket) => {
        const basketSubjects = subjects.filter((s) => s.basket === basket.id);
        const name =
          locale === "si"
            ? basket.nameSi
            : locale === "ta"
            ? basket.nameTa
            : basket.nameEn;

        const badge =
          locale === "si"
            ? basket.badgeSi
            : locale === "ta"
            ? basket.badgeTa
            : basket.badgeEn;

        return {
          id: basket.id,
          name,
          icon: basket.icon,
          badge,
          description: basket.descriptionEn,
          subjects: basketSubjects,
        };
      });

  const displayedGroups =
    activeTab === "all" ? groups : groups.filter((g) => g.id === activeTab);

  return (
    <div className="space-y-8">
      {/* Interactive Stream / Basket Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "all"
              ? "bg-[var(--accent-teal)] text-[var(--text-inverse)] shadow-[0_0_15px_rgba(0,229,160,0.3)]"
              : "bg-[var(--surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-3)] border border-[var(--border-subtle)]"
          }`}
        >
          {isAL ? "All 6 Streams" : "All Core & Baskets"}
        </button>

        {groups.map((group) => {
          const isActive = activeTab === group.id;
          return (
            <button
              key={group.id}
              onClick={() => setActiveTab(group.id)}
              className={`px-4 py-2.5 rounded-xl font-medium transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                isActive
                  ? "bg-[var(--accent-teal)] text-[var(--text-inverse)] font-semibold shadow-[0_0_15px_rgba(0,229,160,0.3)]"
                  : "bg-[var(--surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-3)] border border-[var(--border-subtle)]"
              }`}
            >
              <span>{group.icon}</span>
              <span>{group.name}</span>
            </button>
          );
        })}
      </div>

      {/* Render Each Stream / Basket Section */}
      <div className="space-y-12">
        {displayedGroups.map((group) => (
          <section key={group.id} className="space-y-4">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{group.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg sm:text-xl font-black text-[var(--text-primary)] tracking-tight">
                      {group.name}
                    </h2>
                    {group.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--surface-3)] text-[var(--accent-teal)] border border-[var(--border-subtle)]">
                        {group.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    {group.description}
                  </p>
                </div>
              </div>
              <span className="text-xs text-[var(--text-muted)] font-medium">
                {group.subjects.length} Subjects Available
              </span>
            </div>

            {/* Subjects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {group.subjects.map((subject) => {
                const localizedName = getSubjectName(subject, locale);
                return (
                  <Link
                    key={`${group.id}-${subject.slug}`}
                    href={`/${locale}/${exam}/${subject.slug}`}
                    className="block group"
                  >
                    <GlassCard
                      interactive
                      className="h-full border-[var(--border-default)] group-hover:border-[var(--accent-teal)] p-4 sm:p-5 flex flex-col justify-between"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-[var(--surface-2)] group-hover:bg-[var(--accent-teal-dim)] flex items-center justify-center text-xl group-hover:scale-105 transition-all shrink-0 border border-[var(--border-subtle)]">
                          {subject.icon}
                        </div>
                        <div className="space-y-0.5">
                          <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-teal)] transition-colors leading-snug">
                            {localizedName}
                          </h3>
                          {locale !== "en" && (
                            <p className="text-xs text-[var(--text-muted)] line-clamp-1">
                              {subject.nameEn}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[var(--surface-3)] text-[var(--accent-teal)]">
                            Past Papers
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[var(--surface-3)] text-[var(--text-secondary)]">
                            Answers
                          </span>
                        </div>
                        <span className="text-[var(--accent-teal)] font-semibold group-hover:translate-x-1 transition-transform">
                          Years →
                        </span>
                      </div>
                    </GlassCard>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";

interface StudentRequest {
  id: string;
  subject: string;
  year?: number;
  medium?: string;
  message?: string;
  createdAt: string;
  status: "pending" | "fulfilled" | "rejected";
}

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<StudentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "fulfilled">("all");

  const loadRequests = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/requests");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setRequests(data.data);
      }
    } catch (err) {
      console.error("Failed to load requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const filtered = requests.filter((r) =>
    filter === "all" ? true : r.status === filter
  );

  const handleMarkFulfilled = async (id: string) => {
    try {
      const res = await fetch("/api/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "fulfilled" }),
      });
      if (res.ok) {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: "fulfilled" } : r))
        );
      }
    } catch (err) {
      console.error("Failed to mark fulfilled:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
            Student Paper Requests
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Papers and marking schemes requested by students across Sri Lanka
          </p>
        </div>

        <div className="flex items-center gap-1.5 self-start text-xs font-semibold">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg cursor-pointer ${
              filter === "all"
                ? "bg-[var(--accent-teal)] text-[var(--text-inverse)]"
                : "bg-[var(--surface-2)] text-[var(--text-secondary)]"
            }`}
          >
            All ({requests.length})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-3 py-1.5 rounded-lg cursor-pointer ${
              filter === "pending"
                ? "bg-[var(--accent-teal)] text-[var(--text-inverse)]"
                : "bg-[var(--surface-2)] text-[var(--text-secondary)]"
            }`}
          >
            Pending ({requests.filter((r) => r.status === "pending").length})
          </button>
          <button
            onClick={() => setFilter("fulfilled")}
            className={`px-3 py-1.5 rounded-lg cursor-pointer ${
              filter === "fulfilled"
                ? "bg-[var(--accent-teal)] text-[var(--text-inverse)]"
                : "bg-[var(--surface-2)] text-[var(--text-secondary)]"
            }`}
          >
            Fulfilled ({requests.filter((r) => r.status === "fulfilled").length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-xs text-[var(--text-muted)]">
          Loading student requests...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-xs text-[var(--text-muted)] bg-[var(--surface-1)] rounded-2xl border border-[var(--border-subtle)]">
          No {filter === "all" ? "" : filter} requests found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((req) => (
            <GlassCard
              key={req.id}
              className={`p-5 border-[var(--border-default)] flex flex-col justify-between space-y-4 ${
                req.status === "fulfilled" ? "opacity-60" : ""
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge
                    variant={req.status === "pending" ? "amber" : "neutral"}
                    size="sm"
                  >
                    {req.status === "pending" ? "● Pending Request" : "✓ Fulfilled"}
                  </Badge>
                  <span className="text-[11px] text-[var(--text-muted)]">
                    {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : ""}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  {req.subject} {req.year ? `(${req.year})` : ""}
                </h3>

                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <span>
                    Medium:{" "}
                    <strong>
                      {req.medium === "si"
                        ? "Sinhala"
                        : req.medium === "ta"
                        ? "Tamil"
                        : req.medium === "en"
                        ? "English"
                        : req.medium || "Any"}
                    </strong>
                  </span>
                </div>

                {req.message && (
                  <p className="text-xs text-[var(--text-muted)] bg-[var(--surface-1)] p-2.5 rounded-xl border border-[var(--border-subtle)] italic">
                    &ldquo;{req.message}&rdquo;
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                <Link
                  href="/admin/papers/new"
                  className="text-[var(--accent-teal)] hover:underline font-semibold"
                >
                  Upload Paper Now →
                </Link>

                {req.status === "pending" && (
                  <button
                    onClick={() => handleMarkFulfilled(req.id)}
                    className="px-2.5 py-1 rounded-lg bg-[var(--surface-3)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] font-medium cursor-pointer"
                  >
                    Mark as Fulfilled
                  </button>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}

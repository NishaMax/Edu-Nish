import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Total Papers Stored", value: "1,480", icon: "📄", change: "+42 this week", color: "teal" },
    { label: "Total Downloads", value: "284,520", icon: "⬇️", change: "+14.8K this month", color: "violet" },
    { label: "Curriculum Subjects", value: "48", icon: "📚", change: "O/L & A/L Full Coverage", color: "amber" },
    { label: "Pending Student Requests", value: "14", icon: "📬", change: "Needs upload", color: "red" },
  ];

  const recentPapers = [
    {
      id: "1",
      subject: "Combined Mathematics",
      exam: "al",
      year: 2023,
      medium: "si",
      type: "Past Paper",
      downloads: "14.2K",
      driveId: "1pX7y...abc9",
      date: "Oct 30, 2026",
    },
    {
      id: "2",
      subject: "Science",
      exam: "ol",
      year: 2023,
      medium: "en",
      type: "Past Paper",
      downloads: "11.5K",
      driveId: "1kL8m...def2",
      date: "Oct 29, 2026",
    },
    {
      id: "3",
      subject: "Accounting",
      exam: "al",
      year: 2022,
      medium: "ta",
      type: "Marking Scheme",
      downloads: "8.9K",
      driveId: "1zQ3w...ghi5",
      date: "Oct 28, 2026",
    },
    {
      id: "4",
      subject: "Information Technology (ICT)",
      exam: "ol",
      year: 2023,
      medium: "si",
      type: "Past Paper",
      downloads: "7.4K",
      driveId: "1aB9c...jkl1",
      date: "Oct 27, 2026",
    },
    {
      id: "5",
      subject: "Physics",
      exam: "al",
      year: 2023,
      medium: "si",
      type: "Marking Scheme",
      downloads: "9.2K",
      driveId: "1uV5t...mno8",
      date: "Oct 26, 2026",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Manage EduNish exam papers, Google Drive direct download links, and student requests.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/papers/new"
            className="px-4 py-2.5 rounded-xl bg-[var(--accent-teal)] text-[var(--text-inverse)] font-bold text-xs sm:text-sm hover:brightness-110 shadow-[0_0_15px_rgba(0,229,160,0.3)] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>➕</span>
            <span>Add Paper</span>
          </Link>
          <Link
            href="/admin/bulk"
            className="px-4 py-2.5 rounded-xl bg-[var(--surface-2)] text-[var(--text-primary)] hover:bg-[var(--surface-3)] font-semibold text-xs sm:text-sm border border-[var(--border-default)] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>📁</span>
            <span>Bulk CSV</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <GlassCard key={idx} className="p-5 border-[var(--border-default)] space-y-2">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-medium">
              <span>{s.label}</span>
              <span className="text-xl">{s.icon}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
              {s.value}
            </div>
            <div className="text-[11px] text-[var(--accent-teal)] font-medium">
              {s.change}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Google Drive Status & Quick Guide */}
      <GlassCard className="p-6 border-[var(--border-default)] space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-teal)] animate-pulse" />
          <span>Google Drive Direct Download Engine Status: Active & Operational</span>
        </div>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          The link conversion pipeline converts standard Drive share links into instant direct downloads (<code className="text-[var(--accent-teal)]">drive.google.com/uc?export=download&id=...</code>). This completely bypasses the memory-heavy Google Drive web preview UI on mobile devices, ensuring zero lag on 2GB RAM phones.
        </p>
      </GlassCard>

      {/* Recent Uploads Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
            Recent Paper Uploads
          </h2>
          <Link
            href="/admin/papers"
            className="text-xs text-[var(--accent-teal)] hover:underline font-semibold"
          >
            View all 1,480 papers →
          </Link>
        </div>

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
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {recentPapers.map((paper) => (
                <tr key={paper.id} className="hover:bg-[var(--surface-hover)] transition-colors">
                  <td className="py-3 px-4 font-bold text-[var(--text-primary)]">
                    {paper.subject}
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant={paper.exam === "ol" ? "teal" : "violet"} size="sm">
                      {paper.exam.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 font-semibold text-[var(--text-primary)]">
                    {paper.year}
                  </td>
                  <td className="py-3 px-3 uppercase font-semibold text-[var(--accent-teal)]">
                    {paper.medium}
                  </td>
                  <td className="py-3 px-3 text-[var(--text-secondary)]">
                    {paper.type}
                  </td>
                  <td className="py-3 px-3 text-[var(--text-muted)]">
                    ⬇ {paper.downloads}
                  </td>
                  <td className="py-3 px-3 text-[var(--text-muted)]">
                    {paper.date}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-[var(--accent-teal)] hover:underline cursor-pointer font-medium">
                      Edit
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

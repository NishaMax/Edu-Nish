"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  // If on /admin/login, don't show the dashboard shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: "📊" },
    { label: "Papers", href: "/admin/papers", icon: "📄" },
    { label: "Add Paper", href: "/admin/papers/new", icon: "➕" },
    { label: "Bulk CSV Upload", href: "/admin/bulk", icon: "📁" },
    { label: "Student Requests", href: "/admin/requests", icon: "📬" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 w-full glass border-b border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[var(--accent-teal)] to-[var(--accent-violet)] flex items-center justify-center text-white font-bold text-base shadow-[0_0_12px_rgba(0,229,160,0.3)]">
                E
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-[var(--text-primary)]">
                  Edu<span className="text-[var(--accent-teal)]">Nish</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--surface-3)] text-[var(--accent-amber)] border border-[var(--border-subtle)] uppercase">
                  Admin
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[var(--accent-teal-dim)] text-[var(--accent-teal)] border border-[rgba(0,229,160,0.3)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)]"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--accent-teal)] transition-colors font-medium"
            >
              <span>View Public Site</span>
              <span>↗</span>
            </Link>

            <ThemeToggle />

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-[var(--surface-2)] hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 border border-[var(--border-subtle)] text-[var(--text-secondary)] font-semibold transition-all cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Mobile Submenu */}
        <div className="md:hidden flex items-center gap-2 overflow-x-auto no-scrollbar px-4 py-2 border-t border-[var(--border-subtle)] bg-[var(--surface-1)] text-xs font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2.5 py-1 rounded-lg whitespace-nowrap flex items-center gap-1 ${
                  isActive
                    ? "bg-[var(--accent-teal)] text-[var(--text-inverse)] font-bold"
                    : "text-[var(--text-secondary)]"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}

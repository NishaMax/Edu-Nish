"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.message || "Invalid password");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-primary)]">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[var(--accent-teal)] to-[var(--accent-violet)] flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-[0_0_20px_rgba(0,229,160,0.3)]">
            E
          </div>
          <h1 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
            Edu<span className="text-[var(--accent-teal)]">Nish</span> Admin
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Content Management & Paper Uploader
          </p>
        </div>

        <GlassCard className="p-6 sm:p-8 border-[var(--border-default)] shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password..."
                className="w-full px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-teal)] transition-all text-sm"
              />
              <p className="text-[11px] text-[var(--text-muted)] mt-1.5">
                Default password for local development is: <code className="text-[var(--accent-teal)]">admin</code>
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-medium animate-fade-in">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full py-3.5 rounded-xl font-bold"
            >
              Log In to Dashboard →
            </Button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}

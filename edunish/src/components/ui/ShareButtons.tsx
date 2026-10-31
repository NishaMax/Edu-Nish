"use client";

import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    url || (typeof window !== "undefined" ? window.location.href : "https://edunish.lk");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Download ${title} on EduNish:`,
          url: shareUrl,
        });
      } catch {
        // User cancelled or unsupported
      }
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`Download ${title} on EduNish: `);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedText}${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/30 text-xs font-semibold transition-all cursor-pointer"
        aria-label="Share on WhatsApp"
      >
        <span>💬</span>
        <span>WhatsApp</span>
      </a>

      {/* Telegram */}
      <a
        href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0088cc]/10 text-[#0088cc] hover:bg-[#0088cc]/20 border border-[#0088cc]/30 text-xs font-semibold transition-all cursor-pointer"
        aria-label="Share on Telegram"
      >
        <span>✈️</span>
        <span>Telegram</span>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-3)] border border-[var(--border-subtle)] text-xs font-semibold transition-all cursor-pointer"
        aria-label="Copy link"
      >
        <span>{copied ? "✓" : "🔗"}</span>
        <span>{copied ? "Copied!" : "Copy Link"}</span>
      </button>

      {/* Native Web Share button (for mobile) */}
      <button
        onClick={handleNativeShare}
        className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] text-xs font-semibold cursor-pointer"
        aria-label="Share"
      >
        <span>📤</span>
        <span>Share</span>
      </button>
    </div>
  );
}

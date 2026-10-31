"use client";

import { useState, useEffect } from "react";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(url || "https://edunish.lk");

  useEffect(() => {
    if (!url && typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, [url]);

  const handleCopy = async () => {
    const targetUrl = typeof window !== "undefined" ? window.location.href : shareUrl;
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      const targetUrl = typeof window !== "undefined" ? window.location.href : shareUrl;
      try {
        await navigator.share({
          title,
          text: `Download ${title} on EduNish:`,
          url: targetUrl,
        });
      } catch {
        // User cancelled or unsupported
      }
    }
  };

  const handleShareClick = (e: React.MouseEvent<HTMLAnchorElement>, platform: "whatsapp" | "telegram") => {
    e.preventDefault();
    const currentUrl = typeof window !== "undefined" ? window.location.href : shareUrl;
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedText = encodeURIComponent(`Download ${title} on EduNish: `);

    const shareHref =
      platform === "whatsapp"
        ? `https://api.whatsapp.com/send?text=${encodedText}${encodedUrl}`
        : `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;

    window.open(shareHref, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* WhatsApp */}
      <a
        href="#"
        onClick={(e) => handleShareClick(e, "whatsapp")}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/30 text-xs font-semibold transition-all cursor-pointer"
        aria-label="Share on WhatsApp"
      >
        <span>💬</span>
        <span>WhatsApp</span>
      </a>

      {/* Telegram */}
      <a
        href="#"
        onClick={(e) => handleShareClick(e, "telegram")}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0088cc]/10 text-[#0088cc] hover:bg-[#0088cc]/20 border border-[#0088cc]/30 text-xs font-semibold transition-all cursor-pointer"
        aria-label="Share on Telegram"
      >
        <span>✈️</span>
        <span>Telegram</span>
      </a>

      {/* Copy Link */}
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-3)] border border-[var(--border-subtle)] text-xs font-semibold transition-all cursor-pointer"
        aria-label="Copy link"
      >
        <span>{copied ? "✓" : "🔗"}</span>
        <span>{copied ? "Copied!" : "Copy Link"}</span>
      </button>

      {/* Native Web Share button (for mobile) */}
      <button
        type="button"
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

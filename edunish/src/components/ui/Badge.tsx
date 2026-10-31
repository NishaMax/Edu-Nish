import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "teal" | "violet" | "amber" | "neutral";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "teal",
  size = "sm",
  className = "",
}: BadgeProps) {
  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-xs sm:text-sm",
  };

  const variantStyles = {
    teal: "bg-[var(--accent-teal-dim)] text-[var(--accent-teal)] border border-[rgba(0,229,160,0.3)]",
    violet:
      "bg-[var(--accent-violet-dim)] text-[var(--accent-violet)] border border-[rgba(124,92,252,0.3)]",
    amber:
      "bg-[rgba(245,158,11,0.15)] text-[var(--accent-amber)] border border-[rgba(245,158,11,0.3)]",
    neutral:
      "bg-[var(--surface-2)] text-[var(--text-secondary)] border border-[var(--border-subtle)]",
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

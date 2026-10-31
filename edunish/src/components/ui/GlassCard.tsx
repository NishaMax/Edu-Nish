import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: "teal" | "violet" | "none";
  interactive?: boolean;
}

export function GlassCard({
  children,
  className = "",
  glow = "none",
  interactive = false,
  ...props
}: GlassCardProps) {
  const glowClass =
    glow === "teal"
      ? "glow-teal-hover"
      : glow === "violet"
      ? "glow-violet"
      : "";

  const interactiveClass = interactive
    ? "card-hover cursor-pointer"
    : "";

  return (
    <div
      className={`glass rounded-2xl p-5 sm:p-6 transition-all duration-200 ${glowClass} ${interactiveClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

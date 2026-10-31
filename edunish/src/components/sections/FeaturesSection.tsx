import { GlassCard } from "@/components/ui/GlassCard";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface FeaturesSectionProps {
  dict: Dictionary;
}

export function FeaturesSection({ dict }: FeaturesSectionProps) {
  const features = [
    {
      icon: "⚡",
      title: dict.home.features.instant.title,
      description: dict.home.features.instant.description,
      badge: "Zero Lag",
    },
    {
      icon: "🌐",
      title: dict.home.features.trilingual.title,
      description: dict.home.features.trilingual.description,
      badge: "සිංහල • EN • தமிழ்",
    },
    {
      icon: "💎",
      title: dict.home.features.free.title,
      description: dict.home.features.free.description,
      badge: "Forever Free",
    },
  ];

  return (
    <section className="py-8 sm:py-14 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
          {dict.home.features.title}
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
          Engineered for Sri Lankan students on any device
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <GlassCard key={i} className="space-y-3 border-[var(--border-default)]">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{f.icon}</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[var(--surface-3)] text-[var(--accent-teal)]">
                {f.badge}
              </span>
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              {f.title}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {f.description}
            </p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

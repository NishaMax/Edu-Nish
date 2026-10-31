import Link from "next/link";
import { type Locale } from "@/lib/constants";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  locale: Locale;
  items: BreadcrumbItem[];
}

export function Breadcrumb({ locale, items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 text-xs text-[var(--text-muted)]">
      <ol className="flex items-center flex-wrap gap-1.5">
        <li>
          <Link
            href={`/${locale}`}
            className="hover:text-[var(--accent-teal)] transition-colors flex items-center gap-1"
          >
            <span>🏠</span>
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <span className="text-[var(--border-default)]">/</span>
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[var(--accent-teal)] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[var(--text-primary)] font-medium truncate max-w-[200px]">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

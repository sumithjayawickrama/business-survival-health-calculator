import Link from "next/link";
import type { ReactNode } from "react";

export function PageShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <main className={`mx-auto max-w-6xl px-4 py-10 sm:py-14 ${className}`}>{children}</main>;
}

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" }) {
  const classes =
    variant === "primary"
      ? "bg-ember text-paper hover:bg-[#963e23]"
      : "border border-rule bg-cream text-ink hover:border-ember";
  return (
    <Link href={href} className={`inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold ${classes}`}>
      {children}
    </Link>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-lg border border-rule bg-cream p-5 shadow-soft ${className}`}>{children}</section>;
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "critical" | "warning" | "positive" }) {
  const tones = {
    neutral: "border-rule bg-paper text-muted",
    critical: "border-critical/30 bg-critical/10 text-critical",
    warning: "border-warning/30 bg-warning/10 text-warning",
    positive: "border-positive/30 bg-positive/10 text-positive"
  };
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Business Survival Health Calculator",
  description: "A practical management self-assessment for business survival health."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body className="font-sans">
        <header className="no-print border-b border-rule bg-cream/80">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="font-serif text-xl font-semibold">
              Business Survival Health Calculator
            </Link>
            <nav aria-label="Main navigation" className="flex flex-wrap gap-3 text-sm text-muted">
              <Link className="hover:text-ember" href="/assessment">
                Assessment
              </Link>
              <Link className="hover:text-ember" href="/methodology">
                Methodology
              </Link>
              <Link className="hover:text-ember" href="/privacy">
                Privacy
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}

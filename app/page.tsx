import { ButtonLink, Card, PageShell } from "@/components/ui";
import { privacyNote } from "@/lib/diagnostics";

export default function HomePage() {
  return (
    <PageShell>
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-ember">Free management self-assessment</p>
          <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-6xl">
            Is your business healthy enough to survive?
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Complete a practical business health assessment. Identify the risks affecting survival, see your score, and understand the management action required next.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/assessment">Start Free Assessment</ButtonLink>
            <ButtonLink href="/methodology" variant="secondary">
              How It Works
            </ButtonLink>
          </div>
        </div>
        <Card className="space-y-5">
          <h2 className="font-serif text-2xl font-semibold">What you receive</h2>
          <ul className="space-y-3 text-muted">
            <li>Survival Health Score out of 100%.</li>
            <li>Critical Survival Alerts and high-priority risks.</li>
            <li>Ten domain scorecards with practical next actions.</li>
            <li>Printable Survival Health Report.</li>
          </ul>
        </Card>
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-3">
        {[
          ["Immediate Restructuring Plan", "For serious survival challenges or critical alert overrides."],
          ["Solid Strategy Development Plan", "For businesses operating but vulnerable."],
          ["Strategy Execution Plan", "For businesses stable enough to move forward."]
        ].map(([title, text]) => (
          <Card key={title}>
            <h2 className="font-serif text-xl font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
          </Card>
        ))}
      </section>

      <section className="mt-10 rounded-lg border border-rule bg-paper p-5">
        <h2 className="font-serif text-2xl font-semibold">Privacy in Version 1</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">{privacyNote}</p>
      </section>
    </PageShell>
  );
}

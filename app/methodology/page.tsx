import { Card, PageShell } from "@/components/ui";
import { diagnosticDomains, disclaimer, scoreScale } from "@/lib/diagnostics";

export default function MethodologyPage() {
  return (
    <PageShell>
      <h1 className="font-serif text-4xl font-semibold">Methodology</h1>
      <p className="mt-4 max-w-3xl text-muted">
        The calculator uses 50 questions across 10 diagnostic areas. Each question is marked from 0 to 5 and weighted through its domain.
      </p>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-serif text-2xl font-semibold">0 to 5 marking scale</h2>
          <dl className="mt-4 space-y-3">
            {scoreScale.map((item) => (
              <div key={item.score} className="grid grid-cols-[2rem_1fr] gap-3">
                <dt className="font-bold">{item.score}</dt>
                <dd className="text-sm text-muted">
                  <strong className="text-ink">{item.label}.</strong> {item.description}
                </dd>
              </div>
            ))}
          </dl>
        </Card>
        <Card>
          <h2 className="font-serif text-2xl font-semibold">Result categories</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>0.0% to 49.9%: Immediate Restructuring Plan.</li>
            <li>50.0% to 69.9%: Solid Strategy Development Plan.</li>
            <li>70.0% to 100.0%: Strategy Execution Plan.</li>
          </ul>
          <p className="mt-4 text-sm text-muted">
            A Critical Survival Alert overrides the normal recommendation and requires an Immediate Restructuring Plan.
          </p>
        </Card>
      </div>
      <Card className="mt-6">
        <h2 className="font-serif text-2xl font-semibold">Domain weighting</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {diagnosticDomains.map((domain) => (
            <div key={domain.id} className="flex justify-between border-b border-rule py-2 text-sm">
              <span>{domain.name}</span>
              <strong>{domain.weight}%</strong>
            </div>
          ))}
        </div>
      </Card>
      <p className="mt-6 rounded-lg border border-rule bg-cream p-4 text-sm text-muted">{disclaimer}</p>
    </PageShell>
  );
}

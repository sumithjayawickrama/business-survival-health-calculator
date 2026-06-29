"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge, Card } from "@/components/ui";
import { allQuestions, disclaimer, planActions, privacyNote } from "@/lib/diagnostics";
import { calculateAssessmentResult } from "@/lib/scoring";
import { deleteSavedAssessment, loadSavedAssessment } from "@/lib/storage";
import type { AssessmentResult, SavedAssessment } from "@/lib/types";

const riskTone = {
  critical: "critical",
  vulnerable: "warning",
  developing: "neutral",
  strong: "positive"
} as const;

export default function ResultsPage() {
  const router = useRouter();
  const [saved, setSaved] = useState<SavedAssessment | null>(null);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const assessment = loadSavedAssessment();
      // Local-storage hydration is intentionally client-side only.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSaved(assessment);
      if (!assessment) return;
      setResult(calculateAssessmentResult(assessment.answers));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to calculate results.");
    }
  }, []);

  function deleteAssessment() {
    deleteSavedAssessment();
    router.push("/");
  }

  if (error) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <Card>
          <h1 className="font-serif text-3xl font-semibold">Results are not ready</h1>
          <p className="mt-3 text-muted">{error}</p>
          <Link className="mt-5 inline-flex rounded-lg bg-ember px-5 py-3 font-semibold text-paper" href="/assessment">
            Return to assessment
          </Link>
        </Card>
      </main>
    );
  }

  if (!saved || !result) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <Card>
          <h1 className="font-serif text-3xl font-semibold">No completed assessment found</h1>
          <p className="mt-3 text-muted">Start the assessment first. Your answers are stored only in this browser.</p>
          <Link className="mt-5 inline-flex rounded-lg bg-ember px-5 py-3 font-semibold text-paper" href="/assessment">
            Start Free Assessment
          </Link>
        </Card>
      </main>
    );
  }

  const plan = planActions[result.category];
  const answerMap = new Map(saved.answers.map((answer) => [answer.questionId, answer.score]));
  const weakestDomains = [...result.domainResults].sort((a, b) => a.score - b.score).slice(0, 3);
  const firstThirtyDayActions = plan.actions.slice(0, 3);
  const supportMessage = getSupportMessage(result);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="no-print mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-4xl font-semibold">Survival Health Results</h1>
          <p className="mt-2 text-muted">Assessment date: {new Date(saved.savedAt).toLocaleDateString("en-GB")}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="rounded-lg bg-ember px-5 py-3 font-semibold text-paper" onClick={() => window.print()}>
            Download Survival Health Report
          </button>
          <button className="rounded-lg border border-critical bg-critical/10 px-5 py-3 font-semibold text-critical" onClick={deleteAssessment}>
            Delete My Saved Assessment
          </button>
        </div>
      </div>

      <article className="print-report space-y-6 rounded-lg border border-rule bg-paper p-4 sm:p-6">
        <Card>
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Overall Survival Health Score</p>
              <p className="mt-2 font-serif text-6xl font-semibold" aria-label={`Overall score ${result.overallScore} out of 100 percent`}>
                {result.overallScore}%
              </p>
              <p className="mt-2 text-muted">Score out of 100%</p>
            </div>
            <div>
              <Badge tone={result.category === "Strategy Execution Plan" ? "positive" : result.category === "Solid Strategy Development Plan" ? "warning" : "critical"}>
                {result.category}
              </Badge>
              <h2 className="mt-4 font-serif text-3xl font-semibold">{result.conditionStatement}</h2>
              <p className="mt-3 text-muted">{result.categoryReason}</p>
              <p className="mt-4 text-sm font-semibold">Recommended review frequency: {result.reviewFrequency}</p>
            </div>
          </div>
        </Card>

        <Card>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Executive summary</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold">What management should focus on first</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <SummaryPanel title="Immediate threats">
              {result.criticalAlerts.length > 0 || result.highPriorityAlerts.length > 0 ? (
                <ul className="space-y-2 text-sm text-muted">
                  {[...result.criticalAlerts, ...result.highPriorityAlerts].slice(0, 4).map((question) => (
                    <li key={question.id}>
                      Q{question.number}: {question.text}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted">No critical or high-priority alerts were triggered from the answers entered.</p>
              )}
            </SummaryPanel>
            <SummaryPanel title="Weakest three domains">
              <ol className="list-decimal space-y-2 pl-5 text-sm text-muted">
                {weakestDomains.map((domainResult) => (
                  <li key={domainResult.domain.id}>
                    {domainResult.domain.name}: {domainResult.score}% ({domainResult.riskLevel})
                  </li>
                ))}
              </ol>
            </SummaryPanel>
            <SummaryPanel title="First 30-day actions">
              <ol className="list-decimal space-y-2 pl-5 text-sm text-muted">
                {firstThirtyDayActions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ol>
            </SummaryPanel>
            <SummaryPanel title="Professional support signal">
              <p className="text-sm text-muted">{supportMessage}</p>
            </SummaryPanel>
          </div>
        </Card>

        {result.criticalAlerts.length > 0 && (
          <AlertBlock title="Critical Survival Alert" tone="critical" questions={result.criticalAlerts} answerMap={answerMap} />
        )}
        {result.highPriorityAlerts.length > 0 && (
          <AlertBlock title="High-Priority Risk Alert" tone="warning" questions={result.highPriorityAlerts} answerMap={answerMap} />
        )}

        <Card>
          <h2 className="font-serif text-2xl font-semibold">Business profile</h2>
          <dl className="mt-4 grid gap-3 md:grid-cols-2">
            <ProfileItem label="Business name" value={saved.profile.businessName || "Not provided"} />
            <ProfileItem label="Business type" value={saved.profile.businessType} />
            <ProfileItem label="Employee range" value={saved.profile.employeeRange} />
            <ProfileItem label="Years in operation" value={saved.profile.yearsInOperation} />
            <ProfileItem label="Country" value={saved.profile.country} />
            <ProfileItem label="User role" value={saved.profile.userRole} />
          </dl>
        </Card>

        <section>
          <h2 className="font-serif text-3xl font-semibold">Domain scorecards</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {result.domainResults.map((domainResult) => (
              <Card key={domainResult.domain.id}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-semibold">{domainResult.domain.name}</h3>
                    <p className="mt-2 text-sm text-muted">{domainResult.explanation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{domainResult.score}%</p>
                    <Badge tone={riskTone[domainResult.riskLevel]}>{domainResult.riskLevel}</Badge>
                  </div>
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer font-semibold">View question scores</summary>
                  <ul className="mt-3 space-y-2 text-sm text-muted">
                    {domainResult.domain.questions.map((question) => (
                      <li key={question.id}>
                        <strong className="text-ink">Q{question.number}: {answerMap.get(question.id)}/5.</strong> {question.text}
                      </li>
                    ))}
                  </ul>
                </details>
              </Card>
            ))}
          </div>
        </section>

        <Card>
          <h2 className="font-serif text-2xl font-semibold">Top five priorities</h2>
          <div className="mt-4 space-y-4">
            {result.topPriorities.map((priority) => (
              <div key={priority.question.id} className="rounded-lg border border-rule bg-paper p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-semibold">Q{priority.question.number}: {priority.question.text}</h3>
                  <Badge tone={priority.priorityLevel.includes("Critical") ? "critical" : priority.priorityLevel.includes("High") ? "warning" : "neutral"}>
                    {priority.priorityLevel} · Score {priority.score}/5
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted"><strong>Why it matters:</strong> {priority.question.whyItMatters}</p>
                <p className="mt-1 text-sm text-muted"><strong>Suggested first action:</strong> {priority.question.firstAction}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl font-semibold">{plan.heading}</h2>
          <p className="mt-2 text-sm font-semibold text-muted">{plan.focus}</p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted">
            {plan.actions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ol>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl font-semibold">Methodology summary</h2>
          <p className="mt-3 text-sm text-muted">
            The score is calculated from 50 questions across 10 weighted diagnostic areas. Each answer contributes its domain-weighted share of the total 100-point score. Critical Survival Alert questions can override the normal recommendation.
          </p>
          <p className="mt-4 text-sm text-muted">{disclaimer}</p>
          <p className="mt-4 text-sm text-muted">{privacyNote}</p>
        </Card>
      </article>
    </main>
  );
}

function getSupportMessage(result: AssessmentResult): string {
  if (result.criticalAlerts.length > 0) {
    return "Consider involving qualified legal, tax, accounting, safety or restructuring support for the specific critical risks identified.";
  }
  if (result.category === "Immediate Restructuring Plan") {
    return "Management should consider structured external support if cash, compliance, people or operational issues cannot be controlled quickly.";
  }
  if (result.category === "Solid Strategy Development Plan") {
    return "External facilitation may help convert the weak areas into a practical 90-day strategy-building programme.";
  }
  return "External support is optional. The main need is disciplined execution, review rhythm and accountability.";
}

function SummaryPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-rule bg-paper p-4">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function AlertBlock({
  title,
  tone,
  questions,
  answerMap
}: {
  title: string;
  tone: "critical" | "warning";
  questions: typeof allQuestions;
  answerMap: Map<string, number>;
}) {
  return (
    <section className={`rounded-lg border p-5 ${tone === "critical" ? "border-critical bg-critical/10" : "border-warning bg-warning/10"}`}>
      <h2 className={`font-serif text-2xl font-semibold ${tone === "critical" ? "text-critical" : "text-warning"}`}>{title}</h2>
      <p className="mt-2 text-sm text-muted">
        These areas received a score of 0 or 1 and need visible management attention.
      </p>
      <ul className="mt-3 space-y-2 text-sm">
        {questions.map((question) => (
          <li key={question.id}>
            <strong>Q{question.number} score {answerMap.get(question.id)}/5:</strong> {question.text}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{label}</dt>
      <dd className="mt-1 font-semibold">{value}</dd>
    </div>
  );
}

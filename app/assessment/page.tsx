"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ButtonLink, Card } from "@/components/ui";
import { diagnosticDomains, scoreScale } from "@/lib/diagnostics";
import { loadSavedAssessment, saveAssessmentDraft } from "@/lib/storage";
import type { AssessmentAnswer, BusinessProfile, Score } from "@/lib/types";

const businessTypes = ["Manufacturing", "Trading", "Services", "Export", "Retail", "Group of Companies", "Other"];
const employeeRanges = ["1-4", "5-20", "21-50", "51-100", "101-250", "251-500", "501-1,000", "More than 1,000"];
const yearsOptions = ["Less than 1 year", "1-3 years", "4-10 years", "More than 10 years"];
const roleOptions = ["Owner", "Director", "Manager", "Consultant", "Other"];

const emptyProfile: BusinessProfile = {
  businessName: "",
  businessType: "",
  employeeRange: "",
  yearsInOperation: "",
  country: "Sri Lanka",
  userRole: ""
};

export default function AssessmentPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<BusinessProfile>(emptyProfile);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [step, setStep] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const saved = loadSavedAssessment();
    if (saved) {
      // Local-storage hydration is intentionally client-side only.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile(saved.profile);
      setAnswers(saved.answers);
    }
    setLoaded(true);
  }, []);

  const currentDomain = diagnosticDomains[step];
  const answersById = useMemo(() => new Map(answers.map((answer) => [answer.questionId, answer.score])), [answers]);
  const completedQuestions = answers.length;
  const profileComplete = Boolean(profile.businessType && profile.employeeRange && profile.yearsInOperation && profile.country && profile.userRole);
  const currentStepComplete = currentDomain.questions.every((question) => answersById.has(question.id));
  const allComplete = diagnosticDomains.every((domain) => domain.questions.every((question) => answersById.has(question.id)));

  function updateProfile(field: keyof BusinessProfile, value: string) {
    setProfile((current) => ({ ...current, [field]: value }));
  }

  function setScore(questionId: string, score: Score) {
    setAnswers((current) => {
      const existing = current.filter((answer) => answer.questionId !== questionId);
      return [...existing, { questionId, score }].sort((a, b) => Number(a.questionId.slice(1)) - Number(b.questionId.slice(1)));
    });
  }

  function saveDraft() {
    saveAssessmentDraft({ profile, answers, savedAt: new Date().toISOString() });
    setSavedMessage("Saved in this browser.");
  }

  function continueStep() {
    saveDraft();
    if (step < diagnosticDomains.length - 1) setStep((value) => value + 1);
    else setShowConfirmation(true);
  }

  function viewResults() {
    saveDraft();
    router.push("/results");
  }

  if (!loaded) return <main className="mx-auto max-w-6xl px-4 py-10">Loading assessment...</main>;

  if (showConfirmation) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <Card>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Ready to score</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold">You have completed all 50 questions.</h1>
          <p className="mt-4 text-muted">Your answers will now be scored. You can still go back and change earlier answers before viewing results.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button className="rounded-lg border border-rule bg-cream px-5 py-3 font-semibold" onClick={() => setShowConfirmation(false)}>
              Return to questions
            </button>
            <button className="rounded-lg bg-ember px-5 py-3 font-semibold text-paper" disabled={!allComplete} onClick={viewResults}>
              View Results
            </button>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-4xl font-semibold">Business health assessment</h1>
          <p className="mt-2 text-muted">Step {step + 1} of 10. Answer every question with one 0 to 5 score.</p>
        </div>
        <ButtonLink href="/methodology" variant="secondary">Methodology</ButtonLink>
      </div>

      <div className="mb-6 h-3 overflow-hidden rounded-full bg-rule" aria-label={`${completedQuestions} of 50 questions completed`}>
        <div className="h-full bg-ember" style={{ width: `${(completedQuestions / 50) * 100}%` }} />
      </div>

      <Card className="mb-6">
        <h2 className="font-serif text-2xl font-semibold">Company profile</h2>
        <p className="mt-2 text-sm text-muted">No email address or phone number is required.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <TextField label="Business name (optional)" value={profile.businessName ?? ""} onChange={(value) => updateProfile("businessName", value)} />
          <SelectField label="Business type" value={profile.businessType} options={businessTypes} onChange={(value) => updateProfile("businessType", value)} />
          <SelectField label="Employee range" value={profile.employeeRange} options={employeeRanges} onChange={(value) => updateProfile("employeeRange", value)} />
          <SelectField label="Years in operation" value={profile.yearsInOperation} options={yearsOptions} onChange={(value) => updateProfile("yearsInOperation", value)} />
          <TextField label="Country" value={profile.country} onChange={(value) => updateProfile("country", value)} />
          <SelectField label="User role" value={profile.userRole} options={roleOptions} onChange={(value) => updateProfile("userRole", value)} />
        </div>
      </Card>

      <details className="mb-6 rounded-lg border border-rule bg-paper p-4">
        <summary className="cursor-pointer font-semibold">Show 0 to 5 score guide</summary>
        <dl className="mt-4 grid gap-3 md:grid-cols-2">
          {scoreScale.map((item) => (
            <div key={item.score} className="rounded-md border border-rule bg-cream p-3">
              <dt className="font-semibold">{item.score}: {item.label}</dt>
              <dd className="mt-1 text-sm text-muted">{item.description}</dd>
            </div>
          ))}
        </dl>
      </details>

      <Card>
        <div className="flex flex-col gap-3 border-b border-rule pb-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="font-serif text-3xl font-semibold">{currentDomain.name}</h2>
            <p className="mt-2 max-w-3xl text-muted">{currentDomain.description}</p>
          </div>
          <p className="text-sm font-semibold text-muted">{currentDomain.questions.filter((question) => answersById.has(question.id)).length} of 5 answered</p>
        </div>

        <div className="mt-6 space-y-6">
          {currentDomain.questions.map((question) => {
            const selected = answersById.get(question.id);
            return (
              <fieldset key={question.id} className="rounded-lg border border-rule bg-paper p-4">
                <legend className="font-semibold">
                  {question.number}. {question.text}
                </legend>
                <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {[0, 1, 2, 3, 4, 5].map((score) => (
                    <button
                      type="button"
                      key={score}
                      aria-pressed={selected === score}
                      className={`min-h-12 rounded-lg border px-3 py-2 font-semibold ${
                        selected === score ? "border-ember bg-ember text-paper" : "border-rule bg-cream text-ink hover:border-ember"
                      }`}
                      onClick={() => setScore(question.id, score as Score)}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </fieldset>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button className="rounded-lg border border-rule bg-cream px-5 py-3 font-semibold disabled:opacity-50" disabled={step === 0} onClick={() => setStep((value) => value - 1)}>
            Previous
          </button>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {savedMessage && <p className="text-sm text-positive">{savedMessage}</p>}
            <button className="rounded-lg border border-rule bg-cream px-5 py-3 font-semibold" onClick={saveDraft}>
              Save and continue later
            </button>
            <button className="rounded-lg bg-ember px-5 py-3 font-semibold text-paper disabled:opacity-50" disabled={!profileComplete || !currentStepComplete} onClick={continueStep}>
              Continue
            </button>
          </div>
        </div>
      </Card>
    </main>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const id = label.toLowerCase().replaceAll(" ", "-");
  return (
    <label className="block text-sm font-semibold" htmlFor={id}>
      {label}
      <input id={id} className="mt-2 w-full rounded-lg border border-rule bg-paper px-3 py-3" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  const id = label.toLowerCase().replaceAll(" ", "-");
  return (
    <label className="block text-sm font-semibold" htmlFor={id}>
      {label}
      <select id={id} className="mt-2 w-full rounded-lg border border-rule bg-paper px-3 py-3" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

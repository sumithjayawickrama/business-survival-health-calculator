import { allQuestions, diagnosticDomains } from "./diagnostics";
import type { AnswerEvidence, AssessmentAnswer, DomainConfidence, DomainConfidenceRating, EvidenceStrength } from "./types";

export interface EvidenceStrengthOption {
  value: EvidenceStrength;
  label: string;
  description: string;
}

export interface DomainConfidenceOption {
  value: DomainConfidence;
  label: string;
  description: string;
}

export interface DiagnosticQualityResult {
  evidenceComplete: boolean;
  confidenceComplete: boolean;
  lowEvidenceCount: number;
  lowConfidenceDomainIds: string[];
  overallReliability: "Needs evidence" | "Low confidence" | "Usable" | "Strong";
}

export const evidenceStrengthOptions: EvidenceStrengthOption[] = [
  {
    value: "none",
    label: "No clear evidence",
    description: "The score is based mainly on memory, opinion or informal judgement."
  },
  {
    value: "weak",
    label: "Weak evidence",
    description: "Some evidence exists, but it is incomplete, old, informal or not regularly reviewed."
  },
  {
    value: "moderate",
    label: "Moderate evidence",
    description: "Useful records, reports or routines exist, but ownership or follow-up could improve."
  },
  {
    value: "strong",
    label: "Strong evidence",
    description: "Current evidence exists, is reviewed, and leads to visible action."
  }
];

export const domainConfidenceOptions: DomainConfidenceOption[] = [
  {
    value: "low",
    label: "Low confidence",
    description: "Answers may be incomplete, uncertain or dependent on one person's view."
  },
  {
    value: "medium",
    label: "Medium confidence",
    description: "Answers are mostly reliable, but some evidence or management agreement is still missing."
  },
  {
    value: "high",
    label: "High confidence",
    description: "Answers are supported by evidence and broadly reflect how the business actually works."
  }
];

export function formatEvidenceStrength(value: EvidenceStrength | undefined): string {
  return evidenceStrengthOptions.find((option) => option.value === value)?.label ?? "Not assessed";
}

export function formatDomainConfidence(value: DomainConfidence | undefined): string {
  return domainConfidenceOptions.find((option) => option.value === value)?.label ?? "Not assessed";
}

export function validateDiagnosticQuality(
  answers: AssessmentAnswer[],
  answerEvidence: AnswerEvidence[] = [],
  domainConfidence: DomainConfidenceRating[] = []
): DiagnosticQualityResult {
  const answeredIds = new Set(answers.map((answer) => answer.questionId));
  const evidenceByQuestion = new Map(answerEvidence.map((item) => [item.questionId, item]));
  const confidenceByDomain = new Map(domainConfidence.map((item) => [item.domainId, item]));

  const evidenceComplete = allQuestions.every((question) => {
    if (!answeredIds.has(question.id)) return false;
    return Boolean(evidenceByQuestion.get(question.id)?.strength);
  });
  const confidenceComplete = diagnosticDomains.every((domain) => Boolean(confidenceByDomain.get(domain.id)?.confidence));
  const lowEvidenceCount = allQuestions.filter((question) => {
    const strength = evidenceByQuestion.get(question.id)?.strength;
    return strength === "none" || strength === "weak";
  }).length;
  const lowConfidenceDomainIds = diagnosticDomains
    .filter((domain) => confidenceByDomain.get(domain.id)?.confidence === "low")
    .map((domain) => domain.id);

  let overallReliability: DiagnosticQualityResult["overallReliability"] = "Strong";
  if (!evidenceComplete || !confidenceComplete) overallReliability = "Needs evidence";
  else if (lowConfidenceDomainIds.length > 0) overallReliability = "Low confidence";
  else if (lowEvidenceCount > 5) overallReliability = "Usable";

  return {
    evidenceComplete,
    confidenceComplete,
    lowEvidenceCount,
    lowConfidenceDomainIds,
    overallReliability
  };
}

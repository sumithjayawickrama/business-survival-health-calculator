import type { IsoAssessment, IsoDisciplineScore } from "./types";

export interface IsoDisciplineOption {
  score: IsoDisciplineScore;
  label: string;
  description: string;
}

export interface IsoDisciplineResult {
  completed: boolean;
  score: number | null;
  status: string;
  explanation: string;
  recommendedAction: string;
  isFailureRisk: boolean;
}

export const isoDisciplineOptions: IsoDisciplineOption[] = [
  {
    score: 0,
    label: "No ISO system",
    description: "No recognised ISO management system is in use."
  },
  {
    score: 25,
    label: "Certificate only",
    description: "ISO exists mainly for certificates, tenders or audits, not daily management."
  },
  {
    score: 50,
    label: "Partly followed",
    description: "Some procedures are followed, but departments often bypass the system."
  },
  {
    score: 70,
    label: "Operational but inconsistent",
    description: "The ISO system is used in some routines, but management discipline is uneven."
  },
  {
    score: 85,
    label: "Mostly followed, below required discipline",
    description: "The system is mostly used, but leadership overrides, weak evidence or poor follow-up still create risk."
  },
  {
    score: 90,
    label: "Minimum acceptable system discipline",
    description: "Management and teams generally respect the ISO system and use it to run the business."
  },
  {
    score: 95,
    label: "Strong ISO-led management",
    description: "The ISO system is embedded into reviews, corrective action, ownership and performance control."
  },
  {
    score: 100,
    label: "ISO system runs the company",
    description: "The management system is the trusted operating discipline across leadership, operations and improvement."
  }
];

export function calculateIsoDisciplineResult(isoAssessment?: IsoAssessment): IsoDisciplineResult {
  const score = isoAssessment?.systemDiscipline;

  if (score === undefined) {
    return {
      completed: false,
      score: null,
      status: "Not assessed",
      explanation: "Select the ISO system discipline level to receive an ISO mark.",
      recommendedAction: "Assess whether ISO is a certificate exercise or the actual management system.",
      isFailureRisk: false
    };
  }

  if (score < 90) {
    return {
      completed: true,
      score,
      status: "Serious ISO system failure risk",
      explanation:
        "The ISO system is not strong enough to run the company. If management and teams do not respect the system, failure risk is high because procedures, evidence, corrective action and accountability may exist only on paper.",
      recommendedAction:
        "Treat ISO discipline as a management priority. Review leadership behaviour, process ownership, audit findings, corrective actions and whether daily work follows the approved system.",
      isFailureRisk: true
    };
  }

  return {
    completed: true,
    score,
    status: score >= 95 ? "Strong ISO-led management" : "Acceptable ISO system discipline",
    explanation:
      "Management and teams appear to respect the ISO system enough for it to support business control, accountability and improvement.",
    recommendedAction:
      "Keep using ISO reviews, internal audits, corrective actions and management dashboards to run the business, not just to pass audits.",
    isFailureRisk: false
  };
}

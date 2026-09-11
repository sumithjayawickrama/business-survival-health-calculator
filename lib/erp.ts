import type { ErpAssessment, ErpUseStatus, Score } from "./types";

export interface ErpUseOption {
  value: ErpUseStatus;
  label: string;
  description: string;
}

export interface ErpEvaluationOption {
  score: Score;
  label: string;
  description: string;
}

export interface ErpEvaluationField {
  id: keyof Pick<ErpAssessment, "implementationStatus" | "processDependence" | "aiDataReadiness" | "singlePageDashboard">;
  label: string;
  helpText: string;
  options: ErpEvaluationOption[];
}

export interface ErpUtilisationResult {
  completed: boolean;
  score: number | null;
  status: string;
  explanation: string;
  recommendedAction: string;
}

export const erpUseOptions: ErpUseOption[] = [
  {
    value: "yes",
    label: "Yes, the company uses an ERP system",
    description: "The business has an ERP or integrated business system in use or under implementation."
  },
  {
    value: "no",
    label: "No, the company does not use an ERP system",
    description: "The business mainly uses manual records, spreadsheets, standalone software or informal processes."
  }
];

export const erpEvaluationFields: ErpEvaluationField[] = [
  {
    id: "implementationStatus",
    label: "ERP implementation maturity",
    helpText: "Whether ERP is only being implemented or is already stabilised.",
    options: [
      { score: 0, label: "No ERP implementation", description: "There is no active ERP implementation or live system." },
      { score: 1, label: "Planning only", description: "ERP is being discussed or scoped, but not yet implemented." },
      { score: 2, label: "Under implementation", description: "ERP implementation is in progress and not yet stable." },
      { score: 3, label: "Implementation completed", description: "ERP is live, but issues, adoption gaps or workarounds remain." },
      { score: 4, label: "ERP stabilised", description: "ERP is live, reliable and used by key functions with regular review." },
      { score: 5, label: "ERP optimised", description: "ERP is integrated, governed, improved and used as a core management system." }
    ]
  },
  {
    id: "processDependence",
    label: "ERP dependence versus manual work",
    helpText: "Whether the company fully depends on ERP or still relies on manual side processes.",
    options: [
      { score: 0, label: "Mostly manual", description: "Core work is still done outside ERP." },
      { score: 1, label: "ERP rarely trusted", description: "ERP exists, but teams mostly rely on manual records or spreadsheets." },
      { score: 2, label: "Heavy parallel manual work", description: "ERP and manual work both run, creating duplication and conflicting data." },
      { score: 3, label: "Partial ERP dependence", description: "ERP is used for many processes, but manual workarounds remain for important decisions." },
      { score: 4, label: "Mostly ERP-led", description: "ERP is the main system, with limited justified manual support." },
      { score: 5, label: "Single source of truth", description: "ERP is the trusted operating record and manual work is controlled by exception." }
    ]
  },
  {
    id: "aiDataReadiness",
    label: "ERP data used for AI-supported decisions",
    helpText: "Whether ERP data is structured and available for AI or analytics to support management decisions.",
    options: [
      { score: 0, label: "No usable ERP data", description: "ERP data is absent, incomplete or not trusted." },
      { score: 1, label: "Data locked in ERP", description: "ERP data exists but is not extracted or prepared for decision support." },
      { score: 2, label: "Basic exports only", description: "ERP data is manually exported to spreadsheets for analysis." },
      { score: 3, label: "ERP data used in reports", description: "ERP data supports dashboards or analysis, but AI use is limited." },
      { score: 4, label: "ERP data prepared for AI", description: "ERP data is cleaned, structured and governed for AI-assisted management insight." },
      { score: 5, label: "ERP-to-AI decision layer", description: "ERP data feeds AI or analytics routines that support timely management decisions with controls." }
    ]
  },
  {
    id: "singlePageDashboard",
    label: "Single-page management dashboard",
    helpText: "Whether management follows one clear dashboard instead of disconnected reports.",
    options: [
      { score: 0, label: "No dashboard", description: "Management does not use a single-page dashboard." },
      { score: 1, label: "Disconnected reports", description: "Reports exist, but they are fragmented and not decision-ready." },
      { score: 2, label: "Basic dashboard", description: "A dashboard exists, but data is manual, late or not trusted." },
      { score: 3, label: "Regular management dashboard", description: "Management reviews one dashboard, but action tracking or data quality needs improvement." },
      { score: 4, label: "Action-linked dashboard", description: "The dashboard shows key measures, owners, exceptions and follow-up actions." },
      { score: 5, label: "Single-page control tower", description: "Management runs the business through a concise, trusted, action-oriented dashboard." }
    ]
  }
];

export function calculateErpUtilisationResult(erpAssessment?: ErpAssessment): ErpUtilisationResult {
  if (!erpAssessment?.usesErp) {
    return {
      completed: false,
      score: null,
      status: "Not assessed",
      explanation: "Answer whether the company uses an ERP system to receive an ERP mark.",
      recommendedAction: "Confirm whether ERP is used, under implementation, or absent."
    };
  }

  if (erpAssessment.usesErp === "no") {
    return {
      completed: true,
      score: 0,
      status: "No ERP platform",
      explanation: "The business does not currently use an ERP system. This may be acceptable for a small business, but growth can expose control, reporting and data-quality limits.",
      recommendedAction: "Decide whether current size and complexity justify ERP, or whether improved controls, dashboards and disciplined spreadsheets are enough for now."
    };
  }

  const scores = erpEvaluationFields.map((field) => erpAssessment[field.id]);
  const completed = scores.every((score) => score !== undefined);

  if (!completed) {
    return {
      completed: false,
      score: null,
      status: "ERP details incomplete",
      explanation: "Complete the ERP maturity dropdowns to receive an ERP mark.",
      recommendedAction: "Assess implementation status, ERP dependence, AI data readiness and management dashboard use."
    };
  }

  const completedScores = scores.filter((score): score is Score => score !== undefined);
  let totalScore = 0;
  for (const value of completedScores) totalScore += value;
  const score = Math.round((totalScore / completedScores.length) * 10) / 10;

  if (score < 2) {
    return {
      completed,
      score,
      status: "ERP control risk",
      explanation: "ERP is absent, weak or not trusted enough to support management control.",
      recommendedAction: "Stabilise core ERP use or define a practical system roadmap before relying on ERP data for decisions."
    };
  }
  if (score < 3.5) {
    return {
      completed,
      score,
      status: "ERP under development",
      explanation: "ERP is present or under implementation, but manual workarounds, weak data or limited dashboards reduce management value.",
      recommendedAction: "Close manual-workaround causes, clean master data and appoint owners for ERP adoption and reporting."
    };
  }
  if (score < 4.5) {
    return {
      completed,
      score,
      status: "Managed ERP use",
      explanation: "ERP is supporting the business, but integration, AI-ready data or dashboard discipline can improve.",
      recommendedAction: "Strengthen ERP governance, link ERP data to decision dashboards and remove avoidable manual duplication."
    };
  }
  return {
    completed,
    score,
    status: "ERP-enabled management system",
    explanation: "ERP appears to be a trusted operating backbone with strong dashboard and decision-support potential.",
    recommendedAction: "Use ERP data to strengthen predictive insight, AI-supported analysis and management action tracking."
  };
}

export type Score = 0 | 1 | 2 | 3 | 4 | 5;

export type RiskLevel = "critical" | "vulnerable" | "developing" | "strong";

export type AlertLevel = "critical-survival" | "high-priority";

export type ResultCategory =
  | "Immediate Restructuring Plan"
  | "Solid Strategy Development Plan"
  | "Strategy Execution Plan";

export interface BusinessProfile {
  businessName?: string;
  businessType: string;
  employeeRange: string;
  yearsInOperation: string;
  country: string;
  userRole: string;
}

export interface DiagnosticQuestion {
  id: string;
  number: number;
  domainId: string;
  text: string;
  whyItMatters: string;
  firstAction: string;
  isCriticalSurvivalQuestion?: boolean;
  isHighPriorityQuestion?: boolean;
}

export interface DiagnosticDomain {
  id: string;
  name: string;
  description: string;
  weight: number;
  guidance: string[];
  questions: DiagnosticQuestion[];
}

export interface AssessmentAnswer {
  questionId: string;
  score: Score;
}

export interface SavedAssessment {
  profile: BusinessProfile;
  answers: AssessmentAnswer[];
  savedAt: string;
}

export interface DomainResult {
  domain: DiagnosticDomain;
  score: number;
  riskLevel: RiskLevel;
  explanation: string;
  answers: AssessmentAnswer[];
}

export interface PriorityResult {
  question: DiagnosticQuestion;
  score: Score;
  priorityLevel: string;
}

export interface AssessmentResult {
  overallScore: number;
  category: ResultCategory;
  categoryReason: string;
  conditionStatement: string;
  domainResults: DomainResult[];
  domainScores: Record<string, number>;
  criticalAlerts: DiagnosticQuestion[];
  highPriorityAlerts: DiagnosticQuestion[];
  topPriorities: PriorityResult[];
  reviewFrequency: string;
}

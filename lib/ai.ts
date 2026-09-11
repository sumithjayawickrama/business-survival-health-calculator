import type { AiAssessment, Score } from "./types";

export interface AiEvaluationOption {
  score: Score;
  label: string;
  description: string;
}

export interface AiEvaluationField {
  id: keyof AiAssessment;
  label: string;
  helpText: string;
  options: AiEvaluationOption[];
}

export interface AiUtilisationResult {
  completed: boolean;
  score: number | null;
  status: string;
  explanation: string;
  recommendedAction: string;
}

export const aiEvaluationFields: AiEvaluationField[] = [
  {
    id: "usageMaturity",
    label: "Current AI utilisation",
    helpText: "How far AI is already being used in real business work.",
    options: [
      { score: 0, label: "No AI use", description: "AI is not used in the business." },
      { score: 1, label: "Informal personal use", description: "A few people use public AI tools without business direction." },
      { score: 2, label: "Small experiments", description: "Some pilots exist, but benefits are not measured." },
      { score: 3, label: "Used in selected functions", description: "AI supports some regular work such as sales, documents, analysis or service." },
      { score: 4, label: "Measured business use", description: "AI use has owners, measures and visible productivity or quality gains." },
      { score: 5, label: "Embedded in workflows", description: "AI is safely embedded into core workflows with clear controls and measured value." }
    ]
  },
  {
    id: "ownershipModel",
    label: "AI manager or consultant deployment",
    helpText: "Whether someone is accountable for introducing AI safely and practically.",
    options: [
      { score: 0, label: "No accountable owner", description: "No one is responsible for AI introduction." },
      { score: 1, label: "Interested individual only", description: "One person is interested, but has no authority or plan." },
      { score: 2, label: "Named owner, limited mandate", description: "A manager is named, but time, budget or authority is weak." },
      { score: 3, label: "Manager assigned", description: "A manager has responsibility for AI adoption and reports progress." },
      { score: 4, label: "Manager plus expert support", description: "A manager leads AI adoption with consultant or specialist support where needed." },
      { score: 5, label: "Executive-sponsored AI programme", description: "AI has a sponsor, accountable owner, expert support, roadmap and review rhythm." }
    ]
  },
  {
    id: "capabilityBuilding",
    label: "AI capability and training",
    helpText: "Whether people know how to use AI productively and responsibly.",
    options: [
      { score: 0, label: "No AI awareness", description: "Employees have no guidance or training." },
      { score: 1, label: "Basic awareness only", description: "People know AI exists but lack practical training." },
      { score: 2, label: "Limited training", description: "Some users have attended training, but adoption is uneven." },
      { score: 3, label: "Role-based training started", description: "Key teams are learning AI use cases relevant to their work." },
      { score: 4, label: "Practical playbooks in use", description: "Teams use approved prompts, tools, examples and review routines." },
      { score: 5, label: "Continuous AI capability system", description: "AI skills, standards and improvements are refreshed regularly across the business." }
    ]
  },
  {
    id: "governanceControl",
    label: "AI governance and data safety",
    helpText: "Whether AI is used without exposing confidential data, customers or the business.",
    options: [
      { score: 0, label: "No controls", description: "There are no rules for AI use or data protection." },
      { score: 1, label: "High-risk informal use", description: "People may enter sensitive data into unapproved tools." },
      { score: 2, label: "Basic warnings", description: "Some rules exist, but monitoring and enforcement are weak." },
      { score: 3, label: "Approved-use rules", description: "The business has clear rules on tools, data, review and accountability." },
      { score: 4, label: "Governed AI use", description: "AI use is reviewed for data safety, accuracy, legal risk and customer impact." },
      { score: 5, label: "Controlled AI operating model", description: "AI governance is built into risk, compliance, data and management review routines." }
    ]
  }
];

export function calculateAiUtilisationResult(aiAssessment?: AiAssessment): AiUtilisationResult {
  const scores = aiEvaluationFields.map((field) => aiAssessment?.[field.id]);
  const completed = scores.every((score) => score !== undefined);

  if (!completed) {
    return {
      completed: false,
      score: null,
      status: "Not assessed",
      explanation: "Complete the AI utilisation dropdowns to receive an AI mark.",
      recommendedAction: "Assess current AI use, ownership, capability and governance."
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
      status: "AI exposure risk",
      explanation: "AI is absent or unmanaged. The business may miss productivity gains or create uncontrolled data risk.",
      recommendedAction: "Assign an accountable AI owner and create basic approved-use rules before encouraging wider adoption."
    };
  }
  if (score < 3.5) {
    return {
      completed,
      score,
      status: "Early AI adoption",
      explanation: "AI use has started, but ownership, training or governance is not yet strong enough.",
      recommendedAction: "Appoint a manager or consultant to build a 90-day AI adoption plan with clear use cases and controls."
    };
  }
  if (score < 4.5) {
    return {
      completed,
      score,
      status: "Managed AI adoption",
      explanation: "AI is being introduced with useful structure, but value tracking and governance can be strengthened.",
      recommendedAction: "Measure business value, standardise playbooks and include AI progress in management reviews."
    };
  }
  return {
    completed,
    score,
    status: "AI-enabled operating model",
    explanation: "AI appears embedded into business routines with ownership, capability building and controls.",
    recommendedAction: "Scale high-value AI use cases while continuing data safety, accuracy and accountability reviews."
  };
}

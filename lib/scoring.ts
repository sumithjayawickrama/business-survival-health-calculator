import { allQuestions, diagnosticDomains } from "./diagnostics";
import type {
  AssessmentAnswer,
  AssessmentResult,
  DiagnosticQuestion,
  ResultCategory,
  RiskLevel,
  Score
} from "./types";

const scoreMap = (answers: AssessmentAnswer[]) => new Map(answers.map((answer) => [answer.questionId, answer.score]));

export function roundOne(value: number): number {
  return Math.round((value + Number.EPSILON) * 10) / 10;
}

export function getCategory(score: number, hasCriticalAlerts = false): ResultCategory {
  if (hasCriticalAlerts || score < 50) return "Immediate Restructuring Plan";
  if (score < 70) return "Solid Strategy Development Plan";
  return "Strategy Execution Plan";
}

export function getRiskLevel(score: number): RiskLevel {
  if (score < 50) return "critical";
  if (score < 70) return "vulnerable";
  if (score < 85) return "developing";
  return "strong";
}

export function getDomainExplanation(level: RiskLevel): string {
  const copy: Record<RiskLevel, string> = {
    critical: "Immediate attention is needed because this area may threaten survival.",
    vulnerable: "Important gaps exist and should be improved through a clear action plan.",
    developing: "This area is moving in the right direction but still needs disciplined follow-through.",
    strong: "This area appears well controlled based on the answers entered."
  };
  return copy[level];
}

export function getCategoryReason(category: ResultCategory, hasCriticalAlerts: boolean): string {
  if (hasCriticalAlerts) {
    return "Your overall score may look acceptable, but one or more critical survival risks require immediate management action.";
  }
  if (category === "Immediate Restructuring Plan") return "The score shows a serious survival challenge.";
  if (category === "Solid Strategy Development Plan") return "The business is operating but vulnerable.";
  return "The business is stable enough to move forward with disciplined execution.";
}

export function getConditionStatement(category: ResultCategory): string {
  if (category === "Immediate Restructuring Plan") return "Serious survival challenge";
  if (category === "Solid Strategy Development Plan") return "Operating but vulnerable";
  return "Stable enough to move forward";
}

export function getReviewFrequency(category: ResultCategory): string {
  if (category === "Immediate Restructuring Plan") return "Weekly leadership review";
  if (category === "Solid Strategy Development Plan") return "Monthly management review plus quarterly strategy review";
  return "Monthly execution review plus quarterly strategy review";
}

function questionScore(answersByQuestion: Map<string, Score>, question: DiagnosticQuestion): Score {
  const score = answersByQuestion.get(question.id);
  if (score === undefined) throw new Error(`Missing score for ${question.id}`);
  return score;
}

export function validateCompleteAnswers(answers: AssessmentAnswer[]): boolean {
  const ids = new Set(answers.map((answer) => answer.questionId));
  return allQuestions.every((question) => ids.has(question.id));
}

export function calculateAssessmentResult(answers: AssessmentAnswer[]): AssessmentResult {
  if (!validateCompleteAnswers(answers)) {
    throw new Error("All 50 questions must be answered before results can be calculated.");
  }

  const answersByQuestion = scoreMap(answers);
  const domainResults = diagnosticDomains.map((domain) => {
    const raw = domain.questions.reduce((sum, question) => sum + questionScore(answersByQuestion, question), 0);
    const score = roundOne((raw / (domain.questions.length * 5)) * 100);
    const riskLevel = getRiskLevel(score);
    return {
      domain,
      score,
      riskLevel,
      explanation: getDomainExplanation(riskLevel),
      answers: domain.questions.map((question) => ({
        questionId: question.id,
        score: questionScore(answersByQuestion, question)
      }))
    };
  });

  const overallScore = roundOne(
    diagnosticDomains.reduce((sum, domain) => {
      const domainTotal = domain.questions.reduce((questionSum, question) => {
        return questionSum + (questionScore(answersByQuestion, question) / 5) * (domain.weight / domain.questions.length);
      }, 0);
      return sum + domainTotal;
    }, 0)
  );

  const criticalAlerts = allQuestions.filter(
    (question) => question.isCriticalSurvivalQuestion && questionScore(answersByQuestion, question) <= 1
  );
  const highPriorityAlerts = allQuestions.filter(
    (question) => question.isHighPriorityQuestion && questionScore(answersByQuestion, question) <= 1
  );
  const category = getCategory(overallScore, criticalAlerts.length > 0);

  const topPriorities = allQuestions
    .map((question) => ({
      question,
      score: questionScore(answersByQuestion, question),
      priorityLevel: question.isCriticalSurvivalQuestion
        ? "Critical survival"
        : question.isHighPriorityQuestion
          ? "High priority"
          : questionScore(answersByQuestion, question) <= 1
            ? "Urgent"
            : "Important"
    }))
    .sort((a, b) => a.score - b.score || a.question.number - b.question.number)
    .slice(0, 5);

  return {
    overallScore,
    category,
    categoryReason: getCategoryReason(category, criticalAlerts.length > 0),
    conditionStatement: getConditionStatement(category),
    domainResults,
    domainScores: Object.fromEntries(domainResults.map((result) => [result.domain.id, result.score])),
    criticalAlerts,
    highPriorityAlerts,
    topPriorities,
    reviewFrequency: getReviewFrequency(category)
  };
}

export function serialiseAnswers(answers: AssessmentAnswer[]): string {
  return JSON.stringify(answers);
}

export function parseAnswers(value: string): AssessmentAnswer[] {
  const parsed = JSON.parse(value) as AssessmentAnswer[];
  return parsed.map((answer) => {
    if (![0, 1, 2, 3, 4, 5].includes(answer.score)) throw new Error("Invalid saved score.");
    return answer;
  });
}

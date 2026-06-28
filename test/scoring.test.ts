import { describe, expect, it } from "vitest";
import { diagnosticDomains, planActions } from "../lib/diagnostics";
import { calculateAssessmentResult, getCategory, parseAnswers, serialiseAnswers } from "../lib/scoring";
import type { AssessmentAnswer, Score } from "../lib/types";

const allQuestions = diagnosticDomains.flatMap((domain) => domain.questions);

function answersWith(score: Score): AssessmentAnswer[] {
  return allQuestions.map((question) => ({ questionId: question.id, score }));
}

function answersFromScores(scores: Record<number, Score>, fallback: Score = 5): AssessmentAnswer[] {
  return allQuestions.map((question) => ({
    questionId: question.id,
    score: scores[question.number] ?? fallback
  }));
}

describe("scoring engine", () => {
  it("scores all 5 answers as 100.0%", () => {
    expect(calculateAssessmentResult(answersWith(5)).overallScore).toBe(100);
  });

  it("scores all 0 answers as 0.0%", () => {
    expect(calculateAssessmentResult(answersWith(0)).overallScore).toBe(0);
  });

  it("handles category boundaries exactly", () => {
    expect(getCategory(49.9)).toBe("Immediate Restructuring Plan");
    expect(getCategory(50.0)).toBe("Solid Strategy Development Plan");
    expect(getCategory(69.9)).toBe("Solid Strategy Development Plan");
    expect(getCategory(70.0)).toBe("Strategy Execution Plan");
  });

  it("critical survival alerts override a score above 70%", () => {
    const result = calculateAssessmentResult(answersFromScores({ 1: 1 }, 5));
    expect(result.overallScore).toBeGreaterThan(70);
    expect(result.criticalAlerts.map((question) => question.number)).toContain(1);
    expect(result.category).toBe("Immediate Restructuring Plan");
  });

  it("high-priority risk alerts do not automatically override category", () => {
    const result = calculateAssessmentResult(answersFromScores({ 15: 1 }, 5));
    expect(result.highPriorityAlerts.map((question) => question.number)).toContain(15);
    expect(result.category).toBe("Strategy Execution Plan");
  });

  it("domain weights total exactly 100%", () => {
    expect(diagnosticDomains.reduce((sum, domain) => sum + domain.weight, 0)).toBe(100);
  });

  it("every domain contains exactly five questions", () => {
    expect(diagnosticDomains.every((domain) => domain.questions.length === 5)).toBe(true);
  });

  it("contains exactly 50 assessment questions", () => {
    expect(allQuestions).toHaveLength(50);
  });

  it("every question belongs to only one domain", () => {
    const ids = allQuestions.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(allQuestions.every((question) => diagnosticDomains.some((domain) => domain.id === question.domainId))).toBe(true);
  });

  it("sorts top-five priorities from lowest score upward", () => {
    const result = calculateAssessmentResult(answersFromScores({ 4: 2, 12: 0, 20: 1, 33: 0, 44: 3 }, 5));
    expect(result.topPriorities.map((priority) => priority.score)).toEqual([0, 0, 1, 2, 3]);
  });

  it("keeps score stable when answers are saved and reloaded", () => {
    const answers = answersFromScores({ 2: 3, 9: 4, 28: 2 }, 5);
    const before = calculateAssessmentResult(answers);
    const after = calculateAssessmentResult(parseAnswers(serialiseAnswers(answers)));
    expect(after.overallScore).toBe(before.overallScore);
    expect(after.category).toBe(before.category);
  });

  it("report content source includes score, alerts, domain results and management plan", () => {
    const result = calculateAssessmentResult(answersFromScores({ 1: 1, 15: 0 }, 5));
    expect(result.overallScore).toBeGreaterThan(0);
    expect(result.criticalAlerts.length).toBeGreaterThan(0);
    expect(result.highPriorityAlerts.length).toBeGreaterThan(0);
    expect(result.domainResults).toHaveLength(10);
    expect(planActions[result.category].actions.length).toBeGreaterThan(0);
  });
});

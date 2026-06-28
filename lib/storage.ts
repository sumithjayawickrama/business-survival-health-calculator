"use client";

import type { SavedAssessment } from "./types";

export const assessmentStorageKey = "business-survival-health-assessment-v1";

export function loadSavedAssessment(): SavedAssessment | null {
  const raw = window.localStorage.getItem(assessmentStorageKey);
  if (!raw) return null;
  return JSON.parse(raw) as SavedAssessment;
}

export function saveAssessmentDraft(assessment: SavedAssessment): void {
  window.localStorage.setItem(assessmentStorageKey, JSON.stringify(assessment));
}

export function deleteSavedAssessment(): void {
  window.localStorage.removeItem(assessmentStorageKey);
}

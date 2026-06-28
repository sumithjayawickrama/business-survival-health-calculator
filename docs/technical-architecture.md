# Technical Architecture

## App structure

- `app/`: Next.js App Router pages.
- `components/`: shared UI primitives.
- `lib/diagnostics.ts`: diagnostic domains, questions, score scale, plans and disclaimer copy.
- `lib/scoring.ts`: scoring, category, alert and priority logic.
- `lib/storage.ts`: browser local storage wrapper.
- `test/`: Vitest unit tests.

## Data model

The app uses typed domain, question, profile, answer and result objects from `lib/types.ts`. All 50 questions are defined once in `lib/diagnostics.ts`.

## State handling

The assessment page uses local React state for the active profile, answers and current section. Drafts are saved to local storage only when the user saves or continues.

## Local storage

The key is `business-survival-health-assessment-v1`. It stores the current profile, answers and save timestamp. The results page can delete this data and return the user to the start page.

## PDF and print report

The report is a print-friendly results page. The “Download Survival Health Report” button calls the browser print dialog, allowing the user to save as PDF locally.

## Future secure backend pathway

Future versions can add explicit-consent accounts, encrypted server storage, saved reports and multi-company dashboards. That work should introduce authentication, database design, consent flows, audit logging and data-retention controls before any personal or assessment data is stored remotely.

# Decisions

- Targeted Next.js 16 stable major with App Router because the requirement asks for latest stable Next.js.
- Used browser print-to-PDF instead of a client PDF library to avoid extra dependencies and keep data on the user’s device.
- Used local storage only for drafts and results source data because Version 1 must not store assessment data on a server.
- Kept all diagnostic content in `lib/diagnostics.ts` to prevent duplicated question or alert logic.
- Used plain React state instead of a state management library because the assessment is a single-user, single-flow public tool.
- Used Tailwind CSS design tokens matching the requested warm professional palette.
- Used Vitest for fast scoring-unit tests with TypeScript.
- Added AI utilisation as a separate 0-to-5 mark instead of changing the 100-point Survival Health Score, so AI readiness can be reviewed without distorting the survival methodology or historical score comparison.
- Added ERP utilisation as a separate 0-to-5 mark instead of changing the Survival Health Score, so ERP implementation maturity, manual workarounds, AI-ready data and dashboard discipline can be reviewed independently.
- Added ISO system discipline as a separate 0-to-100% threshold mark instead of changing the Survival Health Score, so below-90% system failure risk is clearly visible without distorting the core diagnostic weighting.
- Added evidence strength and domain confidence as a separate diagnostic reliability layer instead of changing the Survival Health Score, so management can see whether the self-assessment is well supported or needs validation.

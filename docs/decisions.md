# Decisions

- Targeted Next.js 16 stable major with App Router because the requirement asks for latest stable Next.js.
- Used browser print-to-PDF instead of a client PDF library to avoid extra dependencies and keep data on the user’s device.
- Used local storage only for drafts and results source data because Version 1 must not store assessment data on a server.
- Kept all diagnostic content in `lib/diagnostics.ts` to prevent duplicated question or alert logic.
- Used plain React state instead of a state management library because the assessment is a single-user, single-flow public tool.
- Used Tailwind CSS design tokens matching the requested warm professional palette.
- Used Vitest for fast scoring-unit tests with TypeScript.

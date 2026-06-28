# Business Survival Health Calculator

Public self-assessment web app for business owners and managers. It calculates a Survival Health Score, identifies weak diagnostic areas, flags critical survival risks, and recommends one of three management responses.

## Run locally

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
```

Open `http://localhost:3000` after starting development mode.

## What it includes

- Next.js App Router with TypeScript strict mode.
- Tailwind CSS responsive interface using British English.
- 50-question assessment across 10 weighted domains.
- Critical Survival Alert and High-Priority Risk Alert logic.
- Browser-only local storage for the current assessment.
- Results dashboard with domain scorecards, top priorities and management plan.
- Print/PDF report using the browser print dialog.
- Unit tests for scoring, category, alert, data integrity and report-source logic.

## Deployment preparation

Run `npm run lint`, `npm run typecheck`, `npm test` and `npm run build` before deployment. Do not deploy, connect domains, add analytics, payment, authentication or backend services without explicit approval.

## Privacy model

Version 1 has no accounts and sends no assessment answers to a server. The current assessment is stored only in the user’s browser local storage until the user deletes it or clears browser data. Downloaded reports are controlled by the user’s own device and browser.

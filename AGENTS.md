# AGENTS.md

## Permanent project rules

- Build and maintain the Business Survival Health Calculator as a public, no-account self-assessment website.
- Use British English throughout user-facing copy.
- Keep the diagnostic questions in `lib/diagnostics.ts` as the single source of truth.
- Do not collect email addresses, phone numbers, bank details, identity documents, passwords or personal financial figures in Version 1.
- Do not store assessment data on a server in Version 1.
- Do not add paid APIs, external AI APIs, external databases, analytics, authentication, payments, deployment, domains or credentials without explicit user approval.

## Architecture principles

- Use Next.js App Router, TypeScript strict mode and Tailwind CSS.
- Keep scoring and category logic in `lib/scoring.ts`, separate from UI components.
- Keep browser persistence limited to local storage through `lib/storage.ts`.
- Prefer simple, accessible semantic HTML over complex dependencies.

## Testing requirements

- Unit-test all scoring, category, alert and diagnostic data rules.
- Run `npm run lint`, `npm run typecheck`, `npm test` and `npm run build` before completion.
- Add tests when changing domain weights, questions, alert flags or result categories.

## Accessibility standards

- Support keyboard navigation and visible focus states.
- Use associated labels for form controls.
- Do not rely only on colour to communicate risk.
- Maintain accessible colour contrast.
- Keep print output readable.

## Security and privacy boundaries

- No server-side assessment storage in Version 1.
- No external transmission of assessment answers.
- Provide a visible “Delete My Saved Assessment” control.
- Clearly state the tool is a management self-assessment and not legal, tax, accounting, financial, investment, safety or regulatory advice.

## Codex usage guidance for beginners

When asking Codex to change this app, be specific and simple. Good requests include: “Change the wording on the privacy page”, “Add one scoring test for a new boundary”, or “Update the Sales and Customer Strength guidance and run tests.” Ask Codex to run checks after every code change.

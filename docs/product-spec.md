# Product Specification

## Purpose

Business Survival Health Calculator helps business owners and managers understand survival health, weak areas, immediate risks and the management plan required next.

## Routes

- `/`: landing page with product explanation, result categories and privacy statement.
- `/assessment`: company profile, 50 assessment questions, progress, browser save and completion validation.
- `/results`: score dashboard, alerts, domains, top priorities, management plan and printable report.
- `/methodology`: scoring methodology, category rules, alert override and disclaimer.
- `/privacy`: browser-only storage and clearing guidance.

## Diagnostic domains

The assessment has 10 domains, each with five questions. Domain weights total 100%.

- Cash Flow and Liquidity: 18%.
- Profitability and Financial Control: 12%.
- Sales and Customer Strength: 12%.
- Business Model and Market Position: 10%.
- Operations and Supply Chain: 9%.
- Leadership and Governance: 8%.
- People, Culture and Mind Purification: 8%.
- Risk, Compliance and Legal Control: 8%.
- Digital, Data and Cyber Readiness: 5%.
- Resilience, Improvement and Continuity: 10%.

## Scoring methodology

Each question is scored from 0 to 5. Question contribution is `(score / 5) * question weight`, where question weight is the domain weight divided by five.

## Result categories

- 0.0% to 49.9%: Immediate Restructuring Plan.
- 50.0% to 69.9%: Solid Strategy Development Plan.
- 70.0% to 100.0%: Strategy Execution Plan.

Critical Survival Alerts override the normal category and require an Immediate Restructuring Plan.

## Disclaimer

The calculator is a management self-assessment tool and does not replace professional legal, tax, accounting, financial, investment, safety or regulatory advice.

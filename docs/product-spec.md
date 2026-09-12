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
- People, Culture and Leadership Conduct: 8%.
- Risk, Compliance and Legal Control: 8%.
- Digital, Data and Cyber Readiness: 5%.
- Resilience, Improvement and Continuity: 10%.

## Scoring methodology

Each question is scored from 0 to 5. Question contribution is `(score / 5) * question weight`, where question weight is the domain weight divided by five.

## Diagnostic reliability layer

Each scored answer also captures evidence strength: no clear evidence, weak evidence, moderate evidence or strong evidence. Each diagnostic domain also captures answer confidence: low, medium or high.

Evidence and confidence do not change the 100-point Survival Health Score. They are shown separately on the results page to help management understand whether the diagnosis is well supported or needs validation.

## Result categories

- 0.0% to 49.9%: Immediate Restructuring Plan.
- 50.0% to 69.9%: Solid Strategy Development Plan.
- 70.0% to 100.0%: Strategy Execution Plan.

Critical Survival Alerts override the normal category and require an Immediate Restructuring Plan.

## AI utilisation check

The assessment also includes a separate AI Utilisation Mark from 0 to 5. This mark does not change the 100-point Survival Health Score. It evaluates:

- Current AI utilisation.
- Whether an AI manager, accountable owner or consultant is deployed.
- AI capability and training.
- AI governance and data safety.

The AI mark is shown separately on the results page so management can see whether AI adoption is absent, informal, managed or embedded.

## ERP utilisation check

The assessment also includes a separate ERP Utilisation Mark from 0 to 5. This mark does not change the 100-point Survival Health Score. It evaluates:

- Whether the company uses an ERP system.
- ERP implementation maturity, including under-implementation and completed stages.
- Whether the company fully depends on ERP or still uses manual processes, with space to explain why.
- Whether ERP data is ready for AI or analytics-supported management decisions.
- Whether management follows a single-page dashboard.

The ERP mark is shown separately on the results page so management can see whether ERP is absent, under implementation, partially trusted, managed or embedded into decision routines.

## ISO system discipline check

The assessment also includes a separate ISO System Discipline Mark from 0% to 100%. This mark does not change the 100-point Survival Health Score. It evaluates whether management and teams respect the ISO system enough for it to run the company, not just support certificates, tenders or external audits.

The ISO dropdown uses a 90% minimum discipline threshold. If the mark is below 90%, the results page shows a serious ISO system failure risk because the company may be certificate-led rather than system-led.

## Disclaimer

The calculator is a management self-assessment tool and does not replace professional legal, tax, accounting, financial, investment, safety or regulatory advice.

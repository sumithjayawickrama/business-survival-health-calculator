import type { DiagnosticDomain } from "./types";

const actionGuidance = {
  cash: [
    "Build a weekly 13-week cash-flow forecast.",
    "Prioritise cash collection and payment discipline.",
    "Review cash runway, funding headroom and non-essential expenditure.",
    "Protect salary, supplier, debt and statutory obligations.",
    "Escalate short-term liquidity gaps early."
  ],
  financial: [
    "Produce a reliable monthly profit-and-loss report.",
    "Measure margins, cash conversion and working capital by activity.",
    "Review loss-making work and hidden cost leakage.",
    "Control debt, inventory, capital spending and covenant exposure.",
    "Strengthen financial approval controls."
  ],
  sales: [
    "Create a measurable sales pipeline.",
    "Set monthly sales, conversion, churn and retention targets.",
    "Review pricing against cost, value, discounting and required margin.",
    "Improve customer retention and service reliability.",
    "Reduce concentration risk."
  ],
  model: [
    "Clarify why customers choose the business.",
    "Review customer needs, substitutes and competitor movements.",
    "Test whether the business model remains viable and differentiated.",
    "Link investment, innovation and capacity choices to clear commercial priorities."
  ],
  operations: [
    "Document critical processes.",
    "Measure quality failure, waste, rework, delay and productivity.",
    "Improve maintenance, capacity and delivery planning.",
    "Review procurement discipline and critical supplier exposure.",
    "Strengthen on-time delivery."
  ],
  leadership: [
    "Define decision rights, governance routines and accountabilities.",
    "Use evidence, performance dashboards and risk facts in decisions.",
    "Reduce owner dependence and single-person control.",
    "Strengthen board discipline, succession and leadership continuity.",
    "Track action completion."
  ],
  people: [
    "Clarify roles, performance expectations and skills needs.",
    "Reduce harmful blame, fear, conflict and unethical behaviour.",
    "Monitor turnover, absenteeism, capability gaps and succession risk.",
    "Develop disciplined, responsible and self-aware leadership behaviour.",
    "Protect psychological safety and constructive challenge."
  ],
  risk: [
    "Review statutory, tax, labour and regulatory obligations.",
    "Strengthen fraud and approval controls.",
    "Review contracts, insurance, licences and dispute exposure.",
    "Improve workplace safety and incident controls.",
    "Maintain a visible enterprise risk register."
  ],
  digital: [
    "Improve management information quality and speed.",
    "Control system access and cyber hygiene.",
    "Test backups, recovery and incident response.",
    "Protect customer, employee, supplier and financial data.",
    "Use technology and automation to improve decisions and productivity."
  ],
  resilience: [
    "Identify key business dependencies.",
    "Develop and test disruption plans.",
    "Solve root causes and remove repeat failures.",
    "Track improvement actions to closure.",
    "Review risks arising from changing markets, costs, technology, climate and regulation."
  ]
};

const critical = new Set([1, 5, 9, 36, 38, 39]);
const highPriority = new Set([15, 24, 29, 42, 43, 46, 47]);

const why = (domain: keyof typeof actionGuidance) => actionGuidance[domain][0];
const action = (domain: keyof typeof actionGuidance, index: number) => actionGuidance[domain][index % actionGuidance[domain].length];

function q(domainId: string, domain: keyof typeof actionGuidance, number: number, text: string): DiagnosticDomain["questions"][number] {
  return {
    id: `q${number}`,
    number,
    domainId,
    text,
    whyItMatters: why(domain),
    firstAction: action(domain, number - 1),
    isCriticalSurvivalQuestion: critical.has(number),
    isHighPriorityQuestion: highPriority.has(number)
  };
}

export const diagnosticDomains: DiagnosticDomain[] = [
  {
    id: "cash",
    name: "Cash Flow and Liquidity",
    description: "Checks whether the business can meet near-term commitments and control cash pressure.",
    weight: 18,
    guidance: actionGuidance.cash,
    questions: [
      q("cash", "cash", 1, "Can the company meet salary, supplier, bank and statutory payments for the next 90 days without distress?"),
      q("cash", "cash", 2, "Is a rolling 13-week cash-flow forecast updated, reviewed and acted on every week?"),
      q("cash", "cash", 3, "Are cash shortages, covenant risks and funding gaps identified early with accountable actions?"),
      q("cash", "cash", 4, "Is working capital actively controlled across receivables, inventory, payables and operating cash needs?"),
      q("cash", "cash", 5, "Can the business operate without relying on emergency borrowing, delayed payments or informal cash support?")
    ]
  },
  {
    id: "financial",
    name: "Profitability and Financial Control",
    description: "Reviews profit visibility, margins, cash conversion, cost discipline and financial control.",
    weight: 12,
    guidance: actionGuidance.financial,
    questions: [
      q("financial", "financial", 6, "Does management receive a reliable monthly profit-and-loss, balance sheet and cash view?"),
      q("financial", "financial", 7, "Are gross margin, contribution margin and unit economics measured by product, service, customer or business unit?"),
      q("financial", "financial", 8, "Are budgets, cost leakage, discounts and overhead variances reviewed with corrective action?"),
      q("financial", "financial", 9, "Are receivables, overdue accounts and disputed invoices collected within agreed credit terms?"),
      q("financial", "financial", 10, "Are debt, inventory, capital expenditure and financial covenants controlled before they create pressure?")
    ]
  },
  {
    id: "sales",
    name: "Sales and Customer Strength",
    description: "Tests demand quality, customer retention, pricing power, reputation and concentration risk.",
    weight: 12,
    guidance: actionGuidance.sales,
    questions: [
      q("sales", "sales", 11, "Does the company have a qualified sales pipeline with clear stages, owners, conversion rates and next actions?"),
      q("sales", "sales", 12, "Is there a realistic monthly sales forecast based on evidence rather than hope?"),
      q("sales", "sales", 13, "Are pricing, discounting and contract terms based on cost, customer value and required margin?"),
      q("sales", "sales", 14, "Are customer retention, churn, complaints and service failures monitored and acted on?"),
      q("sales", "sales", 15, "Is the company protected from excessive dependence on one customer, channel, tender or small customer group?")
    ]
  },
  {
    id: "model",
    name: "Business Model and Market Position",
    description: "Assesses competitive advantage, demand, market shifts, innovation and strategic investment discipline.",
    weight: 10,
    guidance: actionGuidance.model,
    questions: [
      q("model", "model", 16, "Is the business clear about its competitive advantage and why customers choose it over alternatives?"),
      q("model", "model", 17, "Is demand for the main product or service stable, profitable and supported by clear customer need?"),
      q("model", "model", 18, "Does the company regularly review competitors, substitutes, customer behaviour, regulation and market shifts?"),
      q("model", "model", 19, "Is the business model still commercially viable after considering costs, pricing power, channels and technology change?"),
      q("model", "model", 20, "Are major investments, innovation projects and capacity decisions linked to a clear business strategy?")
    ]
  },
  {
    id: "operations",
    name: "Operations and Supply Chain",
    description: "Reviews process control, productivity, quality, procurement, capacity and delivery reliability.",
    weight: 9,
    guidance: actionGuidance.operations,
    questions: [
      q("operations", "operations", 21, "Are critical processes, handovers and controls documented, followed and improved?"),
      q("operations", "operations", 22, "Are quality failures, waste, rework, delays and productivity losses measured and reduced?"),
      q("operations", "operations", 23, "Are capacity, equipment, systems and facilities maintained before bottlenecks or breakdowns occur?"),
      q("operations", "operations", 24, "Are critical suppliers, procurement terms, lead times and substitute options actively managed?"),
      q("operations", "operations", 25, "Can the company deliver to customers on time, in full, safely and at the required quality?")
    ]
  },
  {
    id: "leadership",
    name: "Leadership and Governance",
    description: "Checks governance discipline, decision quality, accountability, delegation and leadership continuity.",
    weight: 8,
    guidance: actionGuidance.leadership,
    questions: [
      q("leadership", "leadership", 26, "Are strategic decisions made using facts, scenarios and risk evidence rather than assumptions?"),
      q("leadership", "leadership", 27, "Are governance routines, decision rights and escalation paths clear across the business?"),
      q("leadership", "leadership", 28, "Are managers held accountable for agreed actions, performance measures and deadlines?"),
      q("leadership", "leadership", 29, "Can the business operate without the owner or one senior person making every major decision?"),
      q("leadership", "leadership", 30, "Is there a succession, delegation and continuity plan for key leaders and critical roles?")
    ]
  },
  {
    id: "people",
    name: "People, Culture and Leadership Conduct",
    description: "Looks at capability, expectations, behaviour, ethical leadership, incentives and workforce risk.",
    weight: 8,
    guidance: actionGuidance.people,
    questions: [
      q("people", "people", 31, "Does the company have capable people in key roles, with known skill gaps being closed?"),
      q("people", "people", 32, "Are performance expectations, incentives and consequences clear, fair and reviewed?"),
      q("people", "people", 33, "Is harmful conflict, blame, fear, harassment or unhealthy workplace politics actively controlled?"),
      q("people", "people", 34, "Do leaders demonstrate ethical conduct, self-discipline, reflection and responsible behaviour under pressure?"),
      q("people", "people", 35, "Are employee turnover, absenteeism, succession, capability and workforce availability risks monitored and acted on?")
    ]
  },
  {
    id: "risk",
    name: "Risk, Compliance and Legal Control",
    description: "Reviews statutory obligations, contracts, fraud controls, safety, insurance and enterprise risk.",
    weight: 8,
    guidance: actionGuidance.risk,
    questions: [
      q("risk", "risk", 36, "Are tax, employment, statutory, regulatory and filing obligations current and actively monitored?"),
      q("risk", "risk", 37, "Are contracts, licences, insurance, claims and dispute exposures reviewed before they become serious?"),
      q("risk", "risk", 38, "Are financial approvals, segregation of duties, fraud controls and related-party controls in place and followed?"),
      q("risk", "risk", 39, "Are health, safety, workplace and environmental risks actively managed with incident follow-up?"),
      q("risk", "risk", 40, "Are important legal, regulatory, reputation and enterprise risks known, documented, owned and tracked?")
    ]
  },
  {
    id: "digital",
    name: "Digital, Data and Cyber Readiness",
    description: "Checks reporting quality, cyber hygiene, data protection, automation and technology value.",
    weight: 5,
    guidance: actionGuidance.digital,
    questions: [
      q("digital", "digital", 41, "Does management receive accurate, timely and decision-ready business information from trusted data sources?"),
      q("digital", "digital", 42, "Are key business systems protected with appropriate access controls, password discipline and cyber hygiene?"),
      q("digital", "digital", 43, "Are important records, systems and data backed up, tested and recoverable within acceptable time?"),
      q("digital", "digital", 44, "Is customer, employee, supplier and financial data handled responsibly with privacy and retention controls?"),
      q("digital", "digital", 45, "Does technology, automation or data analysis improve decisions, productivity, controls and customer service?")
    ]
  },
  {
    id: "resilience",
    name: "Resilience, Improvement and Continuity",
    description: "Measures disruption planning, dependencies, improvement discipline, adaptability and transformation capacity.",
    weight: 10,
    guidance: actionGuidance.resilience,
    questions: [
      q("resilience", "resilience", 46, "Does the company have a tested response plan for major disruption, crisis communication and recovery?"),
      q("resilience", "resilience", 47, "Has it identified key-person, supplier, customer, facility, funding and system dependencies?"),
      q("resilience", "resilience", 48, "Does the business solve root causes rather than repeatedly treating symptoms and urgent issues?"),
      q("resilience", "resilience", 49, "Are improvement, transformation and risk-reduction actions tracked until completion with accountable owners?"),
      q("resilience", "resilience", 50, "Can the business adapt quickly when demand, costs, regulation, climate, supply or technology changes?")
    ]
  }
];

export const allQuestions = diagnosticDomains.flatMap((domain) => domain.questions);

export const scoreScale = [
  {
    score: 5,
    label: "Strong and proven",
    description: "Current evidence shows this is working well.",
    evidence: "There are current records, reports or routines. Management reviews them regularly and actions are completed."
  },
  {
    score: 4,
    label: "Working well",
    description: "Only minor gaps exist.",
    evidence: "The practice is mostly consistent. Evidence exists, but a few reviews, owners or follow-up actions need tightening."
  },
  {
    score: 3,
    label: "Partly working",
    description: "A material weakness is developing.",
    evidence: "Some evidence exists, but it is irregular, incomplete or too dependent on one person."
  },
  {
    score: 2,
    label: "Weak",
    description: "Serious risk exists and needs action.",
    evidence: "The issue is known, but controls, reports or action owners are weak, late or not trusted."
  },
  {
    score: 1,
    label: "Failing",
    description: "Failing or largely unproven.",
    evidence: "There is little reliable evidence. Management mainly relies on judgement, memory or informal discussion."
  },
  {
    score: 0,
    label: "Immediate danger",
    description: "Absent, broken or an immediate danger.",
    evidence: "The practice is absent, broken, unknown or already creating urgent exposure."
  }
] as const;

export const planActions = {
  "Immediate Restructuring Plan": {
    heading: "Immediate Restructuring Plan Required",
    focus: "90-day survival focus",
    actions: [
      "Protect cash and stop unnecessary cash leakage.",
      "Build or repair the 13-week cash-flow forecast.",
      "Secure salary, supplier, bank and statutory payment priorities.",
      "Collect overdue receivables urgently.",
      "Review unprofitable products, customers, locations and activities.",
      "Freeze or delay non-essential spending and capital investment.",
      "Assign clear accountable owners for every critical risk.",
      "Hold a weekly survival review meeting until critical risks are controlled."
    ]
  },
  "Solid Strategy Development Plan": {
    heading: "Solid Strategy Development Plan Required",
    focus: "90-day strategy-building focus",
    actions: [
      "Clarify the business model and market position.",
      "Set sales, margin, cash and customer-retention targets.",
      "Develop a realistic sales pipeline and forecast.",
      "Improve pricing, margin and cost control.",
      "Reduce key-person, customer and supplier dependency.",
      "Set accountable management actions with deadlines.",
      "Review progress monthly.",
      "Convert the strategy into a 12-month execution plan."
    ]
  },
  "Strategy Execution Plan": {
    heading: "Strategy Execution Plan Required",
    focus: "12-month execution focus",
    actions: [
      "Protect strong cash and profit discipline.",
      "Convert strategy into quarterly priorities.",
      "Assign owners, dates, measures and review routines.",
      "Strengthen customer retention and profitable growth.",
      "Improve operational productivity and quality.",
      "Build leadership capacity and succession strength.",
      "Improve digital reporting, security and continuity.",
      "Continue systematic improvement and resilience planning."
    ]
  }
};

export const disclaimer =
  "This calculator is a management self-assessment tool. It provides an indicative business survival health score based on the answers entered. It does not replace professional legal, tax, accounting, financial, investment, safety or regulatory advice.";

export const privacyNote =
  "Version 1 does not create user accounts or send your assessment data to a server. Your current assessment is stored only in your browser until you clear it or delete it.";

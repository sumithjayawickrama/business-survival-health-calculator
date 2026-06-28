import type { DiagnosticDomain } from "./types";

const actionGuidance = {
  cash: [
    "Build a weekly 13-week cash-flow forecast.",
    "Prioritise cash collection.",
    "Review payment timing and non-essential expenditure.",
    "Protect salary, supplier, debt and statutory obligations.",
    "Escalate short-term liquidity gaps early."
  ],
  financial: [
    "Produce a reliable monthly profit-and-loss report.",
    "Measure margins by product, customer or business unit.",
    "Review loss-making work.",
    "Control debt, inventory and capital spending.",
    "Strengthen financial approval controls."
  ],
  sales: [
    "Create a measurable sales pipeline.",
    "Set monthly sales targets and forecasts.",
    "Review pricing against cost and required margin.",
    "Improve customer retention.",
    "Reduce concentration risk."
  ],
  model: [
    "Clarify why customers choose the business.",
    "Review customer needs and competitor movements.",
    "Test whether the business model remains viable.",
    "Link investment to clear commercial priorities."
  ],
  operations: [
    "Document critical processes.",
    "Measure quality failure, waste, rework and delay.",
    "Improve maintenance planning.",
    "Review critical supplier exposure.",
    "Strengthen on-time delivery."
  ],
  leadership: [
    "Define decision rights and accountabilities.",
    "Use evidence in management decisions.",
    "Reduce owner dependence.",
    "Strengthen succession and leadership continuity.",
    "Track action completion."
  ],
  people: [
    "Clarify roles, performance expectations and skills needs.",
    "Reduce harmful blame, fear and conflict.",
    "Monitor turnover and absenteeism.",
    "Develop disciplined, responsible leadership behaviour.",
    "Protect psychological safety."
  ],
  risk: [
    "Review statutory, tax, labour and regulatory obligations.",
    "Strengthen fraud and approval controls.",
    "Review contracts, insurance and licences.",
    "Improve workplace safety.",
    "Maintain a visible risk register."
  ],
  digital: [
    "Improve management information quality and speed.",
    "Control system access.",
    "Test backups and recovery.",
    "Protect important data.",
    "Use technology to improve decisions and productivity."
  ],
  resilience: [
    "Identify key business dependencies.",
    "Develop and test disruption plans.",
    "Solve root causes.",
    "Track improvement actions to closure.",
    "Review risks arising from changing markets, costs, technology and regulation."
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
      q("cash", "cash", 1, "Can the company meet salary, supplier, bank and statutory payments for the next 90 days?"),
      q("cash", "cash", 2, "Is a rolling 13-week cash-flow forecast reviewed every week?"),
      q("cash", "cash", 3, "Are cash shortages identified early and acted on?"),
      q("cash", "cash", 4, "Is there enough working capital for normal business operations?"),
      q("cash", "cash", 5, "Is the business dependent on emergency borrowing, delayed payments or informal cash support to survive?")
    ]
  },
  {
    id: "financial",
    name: "Profitability and Financial Control",
    description: "Reviews profit visibility, margins, costs, receivables and financial discipline.",
    weight: 12,
    guidance: actionGuidance.financial,
    questions: [
      q("financial", "financial", 6, "Does the company know its actual monthly profit or loss?"),
      q("financial", "financial", 7, "Are gross margins measured by product, service, customer or business unit?"),
      q("financial", "financial", 8, "Are expenses reviewed against an approved budget?"),
      q("financial", "financial", 9, "Are receivables collected within agreed credit terms?"),
      q("financial", "financial", 10, "Are debt, inventory and capital expenditure properly controlled for the business?")
    ]
  },
  {
    id: "sales",
    name: "Sales and Customer Strength",
    description: "Tests sales reliability, customer retention, pricing strength and concentration risk.",
    weight: 12,
    guidance: actionGuidance.sales,
    questions: [
      q("sales", "sales", 11, "Does the company have a reliable sales pipeline?"),
      q("sales", "sales", 12, "Is there a realistic monthly sales forecast?"),
      q("sales", "sales", 13, "Are prices based on cost, customer value and required margin?"),
      q("sales", "sales", 14, "Does the company have enough repeat customers?"),
      q("sales", "sales", 15, "Is the company protected from excessive dependence on one customer or a small number of customers?")
    ]
  },
  {
    id: "model",
    name: "Business Model and Market Position",
    description: "Assesses customer value, demand, competitors, viability and investment discipline.",
    weight: 10,
    guidance: actionGuidance.model,
    questions: [
      q("model", "model", 16, "Is the business clear about why customers choose it?"),
      q("model", "model", 17, "Is demand for its main product or service stable or improving?"),
      q("model", "model", 18, "Does the company regularly review competitor and market changes?"),
      q("model", "model", 19, "Is the business model still commercially viable?"),
      q("model", "model", 20, "Are major investments linked to a clear business strategy?")
    ]
  },
  {
    id: "operations",
    name: "Operations and Supply Chain",
    description: "Reviews process control, quality, maintenance, supplier reliability and delivery.",
    weight: 9,
    guidance: actionGuidance.operations,
    questions: [
      q("operations", "operations", 21, "Are key processes documented and followed?"),
      q("operations", "operations", 22, "Are quality failures, waste and rework measured and reduced?"),
      q("operations", "operations", 23, "Are equipment, systems and facilities maintained before serious breakdowns occur?"),
      q("operations", "operations", 24, "Are critical suppliers reliable and properly managed?"),
      q("operations", "operations", 25, "Can the company deliver to customers on time and at the required quality?")
    ]
  },
  {
    id: "leadership",
    name: "Leadership and Governance",
    description: "Checks decision quality, accountability, owner dependence and continuity planning.",
    weight: 8,
    guidance: actionGuidance.leadership,
    questions: [
      q("leadership", "leadership", 26, "Are strategic decisions made using facts rather than assumptions?"),
      q("leadership", "leadership", 27, "Are responsibilities and decision rights clear?"),
      q("leadership", "leadership", 28, "Are managers accountable for agreed actions and results?"),
      q("leadership", "leadership", 29, "Can the business operate without the owner making every major decision?"),
      q("leadership", "leadership", 30, "Is there a succession or continuity plan for key leaders?")
    ]
  },
  {
    id: "people",
    name: "People, Culture and Mind Purification",
    description: "Looks at capability, expectations, workplace behaviour, leadership discipline and skills risk.",
    weight: 8,
    guidance: actionGuidance.people,
    questions: [
      q("people", "people", 31, "Does the company have the right people in its key roles?"),
      q("people", "people", 32, "Are performance expectations clear and reviewed?"),
      q("people", "people", 33, "Is harmful conflict, blame, fear or unhealthy workplace politics actively controlled?"),
      q("people", "people", 34, "Do leaders practise Mind Purification through self-discipline, reflection and responsible behaviour?"),
      q("people", "people", 35, "Are employee turnover, absenteeism and skill risks monitored and acted on?")
    ]
  },
  {
    id: "risk",
    name: "Risk, Compliance and Legal Control",
    description: "Reviews statutory obligations, contracts, fraud controls, safety and known legal risks.",
    weight: 8,
    guidance: actionGuidance.risk,
    questions: [
      q("risk", "risk", 36, "Are tax, employment, statutory and regulatory obligations current?"),
      q("risk", "risk", 37, "Are contracts, licences, insurance and compliance requirements reviewed?"),
      q("risk", "risk", 38, "Are financial approvals and fraud controls in place and followed?"),
      q("risk", "risk", 39, "Are health, safety and workplace risks actively managed?"),
      q("risk", "risk", 40, "Are important legal or regulatory risks known, documented and tracked?")
    ]
  },
  {
    id: "digital",
    name: "Digital, Data and Cyber Readiness",
    description: "Checks reporting quality, access control, backups, data care and technology usefulness.",
    weight: 5,
    guidance: actionGuidance.digital,
    questions: [
      q("digital", "digital", 41, "Does management receive accurate and timely business information?"),
      q("digital", "digital", 42, "Are key business systems protected with appropriate user access controls?"),
      q("digital", "digital", 43, "Are important records backed up and recoverable?"),
      q("digital", "digital", 44, "Is customer, employee and financial data handled responsibly?"),
      q("digital", "digital", 45, "Does technology support better decisions, productivity and customer service?")
    ]
  },
  {
    id: "resilience",
    name: "Resilience, Improvement and Continuity",
    description: "Measures disruption planning, dependencies, root-cause improvement and adaptability.",
    weight: 10,
    guidance: actionGuidance.resilience,
    questions: [
      q("resilience", "resilience", 46, "Does the company have a tested response plan for a major disruption?"),
      q("resilience", "resilience", 47, "Has it identified key-person, supplier, customer and system dependencies?"),
      q("resilience", "resilience", 48, "Does the business solve root causes rather than repeatedly treating symptoms?"),
      q("resilience", "resilience", 49, "Are improvement actions tracked until completion?"),
      q("resilience", "resilience", 50, "Can the business adapt quickly when demand, costs, regulations or technology change?")
    ]
  }
];

export const allQuestions = diagnosticDomains.flatMap((domain) => domain.questions);

export const scoreScale = [
  { score: 5, label: "Strong and proven", description: "Current evidence shows this is working well." },
  { score: 4, label: "Working well", description: "Only minor gaps exist." },
  { score: 3, label: "Partly working", description: "A material weakness is developing." },
  { score: 2, label: "Weak", description: "Serious risk exists and needs action." },
  { score: 1, label: "Failing", description: "Failing or largely unproven." },
  { score: 0, label: "Immediate danger", description: "Absent, broken or an immediate danger." }
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

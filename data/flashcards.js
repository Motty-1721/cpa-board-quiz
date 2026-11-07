/*
 * FLASHCARDS
 * ==========
 * Concept cards for quick recall drills. Same subject/module structure as
 * the question bank.
 *
 * CONTENT RULES: every card must derive STRICTLY from the assigned PDF —
 * the PDFs are the sole reference, no outside material. Prioritize
 * theories, concepts, and terminologies: definitions, classifications,
 * key terms, and rules — exactly the recall items flashcards are for.
 *
 * Schema:
 * {
 *   id:      "unique-card-id",   // required, never reuse
 *   subject: "Subject (PDF)",    // required — must match a subject in questions.js
 *   module:  "Module within PDF",// required
 *   front:   "Prompt / term",    // required
 *   back:    "Answer / meaning", // required
 *   hint:    "Optional nudge"    // optional
 * }
 */
window.FLASHCARDS = [

  // ── FAR ──────────────────────────────────────────────────────
  {
    id: "fc-far-01",
    subject: "Financial Accounting & Reporting (FAR)",
    module: "Conceptual Framework",
    front: "Qualitative characteristic requiring information to be complete, neutral, and free from error?",
    back: "Faithful representation.",
    hint: "Not relevance — that's about making a difference in decisions."
  },
  {
    id: "fc-far-02",
    subject: "Financial Accounting & Reporting (FAR)",
    module: "Recognition & Presentation",
    front: "Under PFRS 15, revenue from a sale of goods is recognized when…?",
    back: "The customer obtains CONTROL of the goods (not merely transfer of risks and rewards — that was PAS 18)."
  },
  {
    id: "fc-far-03",
    subject: "Financial Accounting & Reporting (FAR)",
    module: "Assets",
    front: "FIFO during rising prices → effect on COGS and ending inventory (vs weighted average)?",
    back: "Lower COGS, higher ending inventory, higher gross profit."
  },
  {
    id: "fc-far-04",
    subject: "Financial Accounting & Reporting (FAR)",
    module: "Assets",
    front: "Depreciation is a process of ______, not ______.",
    back: "COST ALLOCATION over useful life — not valuation."
  },
  {
    id: "fc-far-05",
    subject: "Financial Accounting & Reporting (FAR)",
    module: "Recognition & Presentation",
    front: "Cash dividends PAID are reported under which activity in the statement of cash flows?",
    back: "Financing activities."
  },
  {
    id: "fc-far-06",
    subject: "Financial Accounting & Reporting (FAR)",
    module: "Recognition & Presentation",
    front: "How are trade discounts recorded?",
    back: "Not recorded at all — only the NET amount after the discount enters the books."
  },

  // ── AFAR ─────────────────────────────────────────────────────
  {
    id: "fc-afar-01",
    subject: "Advanced Financial Accounting & Reporting (AFAR)",
    module: "Business Combinations",
    front: "Goodwill formula under PFRS 3?",
    back: "Consideration transferred + NCI − fair value of net identifiable assets acquired."
  },
  {
    id: "fc-afar-02",
    subject: "Advanced Financial Accounting & Reporting (AFAR)",
    module: "Business Combinations",
    front: "Why are intercompany receivables/payables eliminated on consolidation?",
    back: "The group is ONE economic entity — internal transactions create no external balances; leaving them double-counts."
  },
  {
    id: "fc-afar-03",
    subject: "Advanced Financial Accounting & Reporting (AFAR)",
    module: "Specialized Topics",
    front: "Define functional currency (PAS 21).",
    back: "The currency of the PRIMARY economic environment in which the entity operates — it shapes prices, costs, and financing."
  },

  // ── RFBT ─────────────────────────────────────────────────────
  {
    id: "fc-rfbt-01",
    subject: "Regulatory Framework for Business Transactions (RFBT)",
    module: "Corporation Code",
    front: "Corporate term of a stock corporation under the Revised Corporation Code (R.A. 11232)?",
    back: "PERPETUAL by default, unless a shorter term is stated in the articles."
  },
  {
    id: "fc-rfbt-02",
    subject: "Regulatory Framework for Business Transactions (RFBT)",
    module: "Corporation Code",
    front: "Citizenship/residency requirements: Corporate Secretary vs Treasurer?",
    back: "Secretary: Filipino citizen AND resident. Treasurer: resident only."
  },
  {
    id: "fc-rfbt-03",
    subject: "Regulatory Framework for Business Transactions (RFBT)",
    module: "Obligations & Contracts",
    front: "Three essential requisites of a contract (Art. 1318)?",
    back: "Consent, object certain, and cause."
  },

  // ── MS — Pinnacle May 2027 handout ───────────────────────────
  {
    id: "fc-ms-101",
    subject: "Management Services (MS)",
    module: "Introduction to MS",
    front: "Management accounting's major reporting standard?",
    back: "RELEVANCE to the decision — no GAAP constraint (that's financial accounting)."
  },
  {
    id: "fc-ms-102",
    subject: "Management Services (MS)",
    module: "Cost Concepts",
    front: "Prime cost = ?  Conversion cost = ?",
    back: "Prime = DM + DL. Conversion = DL + OH. Common element: direct labor."
  },
  {
    id: "fc-ms-103",
    subject: "Management Services (MS)",
    module: "Cost Concepts",
    front: "The three manufacturing cost elements?",
    back: "Direct materials, direct labor, manufacturing overhead (which includes indirect materials, indirect labor, factory depreciation/insurance/taxes/maintenance)."
  },
  {
    id: "fc-ms-104",
    subject: "Management Services (MS)",
    module: "CVP Analysis",
    front: "Break-even point in peso sales = ?",
    back: "Fixed costs ÷ contribution margin ratio. (In units: FC ÷ CM per unit.)"
  },
  {
    id: "fc-ms-105",
    subject: "Management Services (MS)",
    module: "Absorption vs. Variable Costing",
    front: "Absorption vs. variable costing: how is fixed factory overhead treated?",
    back: "Absorption (= full/conventional): PRODUCT cost. Variable (= direct): PERIOD cost."
  },
  {
    id: "fc-ms-106",
    subject: "Management Services (MS)",
    module: "Absorption vs. Variable Costing",
    front: "Production > sales → which costing shows higher net income?",
    back: "ABSORPTION (fixed OH is deferred into ending inventory). Production < sales → absorption lower; equal → same."
  },
  {
    id: "fc-ms-107",
    subject: "Management Services (MS)",
    module: "Standard Costing",
    front: "MPV formula and who is responsible?",
    back: "MPV = (actual price − standard price) × actual qty purchased — the PURCHASING AGENT. MQV (usage) is the production manager."
  },
  {
    id: "fc-ms-108",
    subject: "Management Services (MS)",
    module: "Budgeting",
    front: "Starting point of the master budget?",
    back: "The SALES budget — it drives production, then materials/labor/overhead budgets."
  },
  {
    id: "fc-ms-109",
    subject: "Management Services (MS)",
    module: "Relevant Costing",
    front: "What makes a cost relevant?",
    back: "It is a FUTURE cost that DIFFERS between alternatives. Sunk costs (e.g., book value of old equipment, joint costs at split-off) are never relevant."
  },
  {
    id: "fc-ms-110",
    subject: "Management Services (MS)",
    module: "Responsibility Accounting",
    front: "The four types of responsibility centers?",
    back: "Revenue center (generates revenue), cost center (costs only), profit center (both), investment center (both + control over assets)."
  },
  {
    id: "fc-ms-111",
    subject: "Management Services (MS)",
    module: "Responsibility Accounting",
    front: "ROI and Residual Income formulas?",
    back: "ROI = operating income ÷ average operating assets. RI = operating income − (minimum rate of return × operating assets)."
  },
  {
    id: "fc-ms-112",
    subject: "Management Services (MS)",
    module: "Transfer Pricing",
    front: "Transfer price ceiling and floor?",
    back: "MAX = lowest external market price to the buying division. MIN = variable cost + opportunity cost (lost CM on outside sales, at full capacity)."
  },
  {
    id: "fc-ms-113",
    subject: "Management Services (MS)",
    module: "Capital Budgeting",
    front: "Which methods ignore the time value of money?",
    back: "Payback period and accounting rate of return. DCF methods: NPV, profitability index, IRR."
  },
  {
    id: "fc-ms-114",
    subject: "Management Services (MS)",
    module: "Cost of Capital",
    front: "CAPM formula?",
    back: "R = RF + β(RM − RF) — risk-free rate plus beta times the market risk premium."
  },
  {
    id: "fc-ms-115",
    subject: "Management Services (MS)",
    module: "Financial Statement Analysis",
    front: "Horizontal vs. vertical analysis?",
    back: "Horizontal = TREND across periods (base year). Vertical = COMMON-SIZE within one statement (items as % of total assets or net sales)."
  },
  {
    id: "fc-ms-116",
    subject: "Management Services (MS)",
    module: "Working Capital Management",
    front: "Four motives for holding cash?",
    back: "Transaction (day-to-day), precautionary (buffer), speculative (opportunities), contractual (e.g., compensating balance)."
  },
  {
    id: "fc-ms-117",
    subject: "Management Services (MS)",
    module: "Working Capital Management",
    front: "EOQ minimizes what — and its formula?",
    back: "The sum of ORDERING + CARRYING costs: EOQ = √(2aD/k)."
  },
  {
    id: "fc-ms-118",
    subject: "Management Services (MS)",
    module: "Quantitative Analysis",
    front: "Critical path = ? Slack time = ?",
    back: "Critical path = LONGEST path through the network (zero slack). Slack = time an activity can be delayed without delaying the project."
  },
  {
    id: "fc-ms-119",
    subject: "Management Services (MS)",
    module: "Economics",
    front: "ED > 1, ED = 1, ED < 1 mean?",
    back: "Elastic, unit-elastic, inelastic. More substitutes / bigger income share / longer period = more elastic."
  },
  {
    id: "fc-ms-120",
    subject: "Management Services (MS)",
    module: "Economics",
    front: "Price ceiling below equilibrium? Price floor above?",
    back: "Ceiling below → SHORTAGE. Floor above → SURPLUS."
  },

  // ── TAB ──────────────────────────────────────────────────────
  {
    id: "fc-tab-01",
    subject: "Taxation (TAB)",
    module: "Income Taxation",
    front: "Tax on interest income from bank deposits of a resident individual?",
    back: "20% FINAL withholding tax — no longer included in the annual return."
  },
  {
    id: "fc-tab-02",
    subject: "Taxation (TAB)",
    module: "Business Taxes",
    front: "VAT rate in the Philippines?",
    back: "12% (TRAIN Law, R.A. 10963)."
  },
  {
    id: "fc-tab-03",
    subject: "Taxation (TAB)",
    module: "Business Taxes",
    front: "Regular corporate income tax under CREATE — general rate and the reduced rate?",
    back: "25% generally; 20% if net taxable income ≤ P5M AND total assets ≤ P100M (excluding land)."
  },

  // ── AUD ──────────────────────────────────────────────────────
  {
    id: "fc-aud-01",
    subject: "Auditing (AUD)",
    module: "Audit Framework & Risk",
    front: "The audit risk model?",
    back: "AR = IR × CR × DR (inherent × control × detection risk)."
  },
  {
    id: "fc-aud-02",
    subject: "Auditing (AUD)",
    module: "Reporting & Ethics",
    front: "Material AND pervasive misstatements → which opinion?",
    back: "ADVERSE opinion. (Material but not pervasive → qualified; pervasive lack of evidence → disclaimer.)"
  },
  {
    id: "fc-aud-03",
    subject: "Auditing (AUD)",
    module: "Reporting & Ethics",
    front: "Auditing the books your own firm kept = which independence threat?",
    back: "Self-review threat — evaluating your own previous work."
  }
];

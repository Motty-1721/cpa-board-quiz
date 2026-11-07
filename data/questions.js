/*
 * QUESTION BANK
 * =============
 * Every quiz question lives here. This file grows as new PDF materials are
 * processed into questions.
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ CONTENT RULES (non-negotiable):                                 │
 * │ 1. STRICTLY FROM THE PDF: every question, choice, and           │
 * │    explanation must derive from the assigned PDF alone. Never   │
 * │    add outside knowledge; never cover material the PDF          │
 * │    doesn't. The PDFs are the SOLE reference.                    │
 * │ 2. COVERAGE MIX: every module must include THEORY, CONCEPTS,    │
 * │    and TERMINOLOGY questions — definitions, classifications,    │
 * │    true/false statements, name-that-term — alongside any        │
 * │    computational/application items. The board tests both.       │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * STRUCTURE: one PDF = one SUBJECT, divided into MODULES:
 *   Subject (a PDF, e.g. "FAR Reviewer 2024.pdf")
 *     └─ Module (a chapter/section of that PDF)
 *          └─ Questions
 *
 * Schema for every entry:
 * {
 *   id:          "unique-id",            // required, never reuse ids
 *   subject:     "Subject (PDF) name",   // required — the PDF this came from
 *   module:      "Module within the PDF",// required — chapter/section
 *   topic:       "Fine-grained topic",   // optional — used for weak-topic stats
 *   question:    "The question text",    // required
 *   choices:     ["A", "B", "C", "D"],   // required, exactly 4
 *   answer:      0,                      // required, index of correct choice (0-3)
 *   explanation: "Why the answer is right", // strongly encouraged
 *   source:      "Where it came from"   // optional traceability (e.g. "p.12")
 * }
 *
 * Adding a new PDF: process it into questions, give every entry the same
 * `subject` name (the PDF name), split across meaningful `module` names.
 * The app picks the new subject up automatically.
 */
window.QUESTION_BANK = [

  // ═══════════════ SUBJECT: Financial Accounting & Reporting (FAR) ═══════════════
  {
    id: "far-001",
    subject: "Financial Accounting & Reporting (FAR)",
    module: "Conceptual Framework",
    topic: "Qualitative Characteristics",
    question: "Which qualitative characteristic of useful financial information requires that information be complete, neutral, and free from error?",
    choices: ["Relevance", "Faithful representation", "Comparability", "Timeliness"],
    answer: 1,
    explanation: "Under the Conceptual Framework, faithful representation means the information is COMPLETE (nothing important omitted), NEUTRAL (not biased), and FREE FROM ERROR. Relevance refers to the capacity to make a difference in decisions.",
    source: "Seed sample"
  },
  {
    id: "far-002",
    subject: "Financial Accounting & Reporting (FAR)",
    module: "Recognition & Presentation",
    topic: "Revenue Recognition",
    question: "Under PFRS 15, an entity recognizes revenue from the sale of goods when which of the following occurs?",
    choices: [
      "The significant risks and rewards of ownership have been transferred to the buyer",
      "Cash is collected from the customer",
      "The customer obtains control of the goods",
      "The goods are physically delivered to the customer's location"
    ],
    answer: 2,
    explanation: "PFRS 15's five-step model centers on the transfer of CONTROL — the ability to direct the use of and obtain substantially all remaining benefits from the asset. 'Transfer of risks and rewards' was the standard under the old PAS 18 and is a classic distractor.",
    source: "Seed sample"
  },
  {
    id: "far-003",
    subject: "Financial Accounting & Reporting (FAR)",
    module: "Assets",
    topic: "Inventories",
    question: "During a period of steadily rising purchase prices, a company using FIFO (compared with weighted average cost) will report:",
    choices: [
      "A lower cost of goods sold and a higher ending inventory",
      "A higher cost of goods sold and a lower ending inventory",
      "A lower cost of goods sold and a lower ending inventory",
      "The same cost of goods sold and ending inventory"
    ],
    answer: 0,
    explanation: "With rising prices, FIFO charges the OLDEST (cheapest) units to cost of goods sold, leaving the NEWEST (most expensive) units in ending inventory. Result: lower COGS, higher ending inventory, and higher gross profit than weighted average.",
    source: "Seed sample"
  },
  {
    id: "far-004",
    subject: "Financial Accounting & Reporting (FAR)",
    module: "Assets",
    topic: "Property, Plant & Equipment",
    question: "Depreciation accounting is best described as a process of:",
    choices: [
      "Valuing an asset at its current market price at each balance sheet date",
      "Systematically allocating the depreciable amount of an asset over its useful life",
      "Setting aside cash to replace the asset when it wears out",
      "Reducing the asset's carrying amount whenever its market value declines"
    ],
    answer: 1,
    explanation: "Depreciation is COST ALLOCATION, not valuation. It spreads the depreciable amount (cost less residual value) over the asset's useful life to match expense with the revenue the asset helps generate. It involves no cash set-aside and is not a market-value adjustment.",
    source: "Seed sample"
  },
  {
    id: "far-005",
    subject: "Financial Accounting & Reporting (FAR)",
    module: "Recognition & Presentation",
    topic: "Statement of Cash Flows",
    question: "Under PFRS, cash dividends paid to the entity's own shareholders are classified in the statement of cash flows as:",
    choices: ["Operating activities", "Investing activities", "Financing activities", "A noncash investing and financing activity"],
    answer: 2,
    explanation: "Dividends PAID are distributions to providers of capital (shareholders), so they are financing cash outflows. Note the contrast: dividends and interest RECEIVED may be classified as operating or investing under PFRS, but dividends paid belong to financing.",
    source: "Seed sample"
  },
  {
    id: "far-006",
    subject: "Financial Accounting & Reporting (FAR)",
    module: "Recognition & Presentation",
    topic: "Current Liabilities",
    question: "Which of the following correctly describes the accounting treatment of trade discounts?",
    choices: [
      "They are recorded in a separate contra-revenue account",
      "They are recognized as an expense of the period",
      "They are not recorded; the transaction is recorded at the net amount after the discount",
      "They are accrued as a liability until the customer pays"
    ],
    answer: 2,
    explanation: "A trade discount is deducted directly from the list price, and only the NET amount is recorded in the books. It never appears separately in the accounts. (Do not confuse it with cash/purchase discounts, which ARE accounted for separately.)",
    source: "Seed sample"
  },

  // ═══════════════ SUBJECT: Advanced Financial Accounting & Reporting (AFAR) ═══════════════
  {
    id: "afar-001",
    subject: "Advanced Financial Accounting & Reporting (AFAR)",
    module: "Business Combinations",
    topic: "Goodwill",
    question: "Under PFRS 3, goodwill arising from a business combination is measured as:",
    choices: [
      "Consideration transferred plus non-controlling interest minus the acquirer's share of net identifiable assets acquired",
      "The excess of the acquiree's carrying amount over the consideration transferred",
      "The fair value of the acquiree's brand names and customer lists",
      "The sum of consideration transferred and all identifiable intangible assets acquired"
    ],
    answer: 0,
    explanation: "Goodwill = consideration transferred (+ any previously held equity interest) + NCI at acquisition-date fair value − net IDENTIFIABLE assets acquired at fair value. It represents future economic benefits from assets that CANNOT be individually identified — which is why identifiable intangibles are excluded from goodwill itself.",
    source: "Seed sample"
  },
  {
    id: "afar-002",
    subject: "Advanced Financial Accounting & Reporting (AFAR)",
    module: "Business Combinations",
    topic: "Consolidation",
    question: "Intercompany receivables, payables, sales, and cost of sales arising between a parent and its subsidiary are eliminated on consolidation because:",
    choices: [
      "They overstate the group's external revenue and double-count assets",
      "Intercompany transactions are always illegal",
      "The subsidiary is not a separate legal entity",
      "Elimination is required only when the parent owns less than 100% of the subsidiary"
    ],
    answer: 0,
    explanation: "Consolidated statements present the group as a SINGLE economic entity. Transactions WITHIN the group create no external revenue, expense, receivable, or payable — failing to eliminate them would double-count balances and misstate group results, regardless of the parent's ownership percentage.",
    source: "Seed sample"
  },
  {
    id: "afar-003",
    subject: "Advanced Financial Accounting & Reporting (AFAR)",
    module: "Partnerships",
    topic: "Admission of a Partner",
    question: "A new partner invests equipment with an agreed fair value of P400,000 but is credited with P500,000 capital. Under the bonus method, this arrangement:",
    choices: [
      "Records the partnership's goodwill of P100,000",
      "Revalues the old partners' capital by P100,000",
      "Gives the new partner a P100,000 bonus charged to the old partners' capital",
      "Records a P100,000 gain on the partnership books"
    ],
    answer: 2,
    explanation: "The P100,000 excess of capital credit over investment is a BONUS to the incoming partner, absorbed by (debited to) the old partners' capital in their profit-and-loss ratio. The bonus method never creates goodwill or revaluation — only the goodwill and asset revaluation methods do that.",
    source: "Seed sample"
  },
  {
    id: "afar-004",
    subject: "Advanced Financial Accounting & Reporting (AFAR)",
    module: "Specialized Topics",
    topic: "Foreign Currency",
    question: "The 'functional currency' of an entity is best defined as:",
    choices: [
      "The currency in which the financial statements are presented",
      "The currency of the primary economic environment in which the entity operates",
      "The currency of the country where the entity's shares are listed",
      "Any currency chosen by management each reporting period"
    ],
    answer: 1,
    explanation: "The functional currency is the currency of the PRIMARY ECONOMIC environment in which the entity operates — the one that mainly influences sales prices, labor/material costs, and financing (PAS 21). The presentation currency, by contrast, is simply the currency used to present the FS, which may differ.",
    source: "Seed sample"
  },
  {
    id: "afar-005",
    subject: "Advanced Financial Accounting & Reporting (AFAR)",
    module: "Specialized Topics",
    topic: "Estate Accounting",
    question: "Which statement is TRUE regarding the order of estate claims under the Civil Code?",
    choices: [
      "Devises and legacies are paid before funeral expenses",
      "Funeral expenses, administration expenses, and debts of the deceased are paid before devises and legacies",
      "All claims are paid pro-rata regardless of category",
      "Taxes due the estate are paid last"
    ],
    answer: 1,
    explanation: "Under Article 950 of the Civil Code, the order is: (1) funeral and administration expenses, (2) judgment credits and other debts of the deceased, (3) expenses of medical attendance during last illness, then (4) devises and legacies. Estate taxes are a claim of the government and are settled as part of administration.",
    source: "Seed sample"
  },

  // ═══════════════ SUBJECT: Regulatory Framework for Business Transactions (RFBT) ═══════════════
  {
    id: "rfbt-001",
    subject: "Regulatory Framework for Business Transactions (RFBT)",
    module: "Corporation Code",
    topic: "Corporate Term",
    question: "Under the Revised Corporation Code (R.A. No. 11232), the corporate term of a stock corporation is:",
    choices: [
      "Fifty (50) years from incorporation, extendible by amendment",
      "Perpetual, unless a shorter term is provided in the articles of incorporation",
      "Twenty-five (25) years, renewable for successive periods",
      "Perpetual only if two-thirds of shareholders vote for it annually"
    ],
    answer: 1,
    explanation: "The Revised Corporation Code made corporate existence PERPETUAL by default. A corporation may still state a shorter term in its articles of incorporation, and the old 50-year limit no longer applies.",
    source: "Seed sample"
  },
  {
    id: "rfbt-002",
    subject: "Regulatory Framework for Business Transactions (RFBT)",
    module: "Corporation Code",
    topic: "One-Person Corporation",
    question: "Which of the following is NOT allowed to incorporate as a One-Person Corporation (OPC) under the Revised Corporation Code?",
    choices: [
      "A single individual engaged in trading",
      "A single professional practicing a licensed profession organized as a corporation",
      "A trust applying for a banking license",
      "A single natural person forming a domestic corporation"
    ],
    answer: 2,
    explanation: "Banks, quasi-banks, trust companies, insurance companies, and other financial intermediaries are BARRED from forming OPCs. A trust cannot be a trust company-banker as an OPC. Licensed professionals may form OPCs except where the profession's law disallows corporate practice.",
    source: "Seed sample"
  },
  {
    id: "rfbt-004",
    subject: "Regulatory Framework for Business Transactions (RFBT)",
    module: "Corporation Code",
    topic: "Corporate Officers",
    question: "Under the Revised Corporation Code, the corporate secretary of a domestic corporation must be:",
    choices: [
      "A shareholder of the corporation",
      "A Filipino citizen and a resident of the Philippines",
      "A member of the board of directors",
      "A lawyer with at least five years of practice"
    ],
    answer: 1,
    explanation: "The Revised Corporation Code requires the corporate secretary to be a FILIPINO CITIZEN and RESIDENT of the Philippines. The treasurer, meanwhile, must be a resident of the Philippines (citizenship not required for treasurer).",
    source: "Seed sample"
  },
  {
    id: "rfbt-003",
    subject: "Regulatory Framework for Business Transactions (RFBT)",
    module: "Negotiable Instruments",
    topic: "Holder in Due Course",
    question: "To be a holder in due course of a negotiable instrument, the holder must take it:",
    choices: [
      "For value, in good faith, and without notice of any defect or claim against it",
      "Before maturity, with consideration, and from the original drawer only",
      "In good faith, regardless of value, provided the instrument is complete",
      "For value, after maturity, and without knowledge of the maker's identity"
    ],
    answer: 0,
    explanation: "A holder in due course (NIL, Sec. 52) takes the instrument when it is complete and regular on its face, BEFORE maturity, in GOOD FAITH and FOR VALUE, and WITHOUT NOTICE of dishonor or of any defense against it or claim to it by any person.",
    source: "Seed sample"
  },
  {
    id: "rfbt-005",
    subject: "Regulatory Framework for Business Transactions (RFBT)",
    module: "Obligations & Contracts",
    topic: "Essential Requisites",
    question: "The essential requisites of a contract under the Civil Code are:",
    choices: [
      "Offer, acceptance, and consideration",
      "Consent of the parties, object certain, and cause of the obligation",
      "Writing, signature, and delivery",
      "Capacity, form, and registration"
    ],
    answer: 1,
    explanation: "Article 1318 of the Civil Code: there is no contract unless the following requisites exist — (1) CONSENT of the contracting parties, (2) OBJECT certain which is the subject matter, and (3) CAUSE of the obligation established. 'Consideration' is the common-law counterpart of 'cause,' and writing is generally not essential.",
    source: "Seed sample"
  },

  // ═══════════════ SUBJECT: Management Services (MS) ═══════════════
  {
    id: "ms-001",
    subject: "Management Services (MS)",
    module: "Cost-Volume-Profit",
    topic: "Break-Even Point",
    question: "The break-even point in units is computed as:",
    choices: [
      "Fixed costs divided by contribution margin per unit",
      "Fixed costs divided by selling price per unit",
      "Total costs divided by variable cost per unit",
      "Variable costs divided by contribution margin ratio"
    ],
    answer: 0,
    explanation: "At break-even, total contribution margin exactly covers fixed costs. So units = Fixed Costs ÷ CM per unit, where CM per unit = selling price − variable cost per unit. Dividing fixed costs by selling price ignores variable costs and understates the break-even point.",
    source: "Seed sample"
  },
  {
    id: "ms-005",
    subject: "Management Services (MS)",
    module: "Cost-Volume-Profit",
    topic: "Margin of Safety",
    question: "The margin of safety in pesos is best described as:",
    choices: [
      "The excess of actual (or budgeted) sales over break-even sales",
      "The difference between contribution margin and fixed costs at break-even",
      "The ratio of variable costs to sales",
      "The profit earned at the break-even point"
    ],
    answer: 0,
    explanation: "Margin of safety = Actual (or budgeted) Sales − Break-even Sales. It measures how far sales can FALL before the company starts incurring losses. There is zero profit at break-even by definition.",
    source: "Seed sample"
  },
  {
    id: "ms-002",
    subject: "Management Services (MS)",
    module: "Decision-Making",
    topic: "Relevant Costs",
    question: "In a decision to accept or reject a special order, which cost is RELEVANT?",
    choices: [
      "Unavoidable fixed factory overhead allocated to each unit",
      "The differential (incremental) cost of producing the additional units",
      "Sunk costs already incurred for the existing production line",
      "The original cost of machinery already purchased"
    ],
    answer: 1,
    explanation: "Relevant costs are FUTURE costs that DIFFER between alternatives — i.e., incremental/avoidable costs. Sunk costs (already incurred) and unavoidable allocated fixed costs are never relevant to the special-order decision.",
    source: "Seed sample"
  },
  {
    id: "ms-003",
    subject: "Management Services (MS)",
    module: "Decision-Making",
    topic: "Capital Budgeting",
    question: "Using the net present value (NPV) method with the company's cost of capital as the discount rate, a project should be accepted when:",
    choices: [
      "NPV is positive or zero",
      "NPV is negative",
      "The payback period exceeds the project's useful life",
      "The accounting rate of return equals the cost of capital"
    ],
    answer: 0,
    explanation: "A positive NPV means the project earns MORE than the cost of capital, adding shareholder value; an NPV of exactly zero means it earns exactly the required return. Both are acceptable (positive NPV preferred). Negative NPV destroys value.",
    source: "Seed sample"
  },
  {
    id: "ms-004",
    subject: "Management Services (MS)",
    module: "Costing Systems",
    topic: "Activity-Based Costing",
    question: "Activity-based costing (ABC) differs from traditional costing mainly because ABC:",
    choices: [
      "Assigns overhead using multiple activity cost drivers rather than a single volume-based driver",
      "Eliminates all fixed cost allocations",
      "Uses only direct labor hours to apply overhead",
      "Values inventory at market price instead of cost"
    ],
    answer: 0,
    explanation: "ABC traces overhead to ACTIVITIES (e.g., machine setups, inspections, purchase orders) and assigns costs to products using the DRIVERS of those activities. Traditional costing typically uses one volume-based base like direct labor hours, which distorts costs in multi-product firms.",
    source: "Seed sample"
  },

  // ═══════════════ SUBJECT: Taxation (TAB) ═══════════════
  {
    id: "tab-001",
    subject: "Taxation (TAB)",
    module: "Income Taxation",
    topic: "Final Taxes",
    question: "Interest income from a bank deposit of a resident individual in the Philippines is subject to:",
    choices: [
      "A 20% final withholding tax, in lieu of the regular income tax",
      "The graduated income tax rates applied in the annual return",
      "A 12% value-added tax",
      "No tax at all"
    ],
    answer: 0,
    explanation: "Interest from Philippine currency bank deposits and yield from deposit substitutes is subject to a 20% FINAL withholding tax (25% if the currency is on the BSP's non-readily convertible list). Being a final tax, it is no longer included in the annual income tax return.",
    source: "Seed sample"
  },
  {
    id: "tab-004",
    subject: "Taxation (TAB)",
    module: "Income Taxation",
    topic: "Filing Deadlines",
    question: "The annual income tax return of an individual taxpayer on compensation and business/professional income must generally be filed on or before:",
    choices: [
      "April 15 of the following year",
      "June 30 of the following year",
      "December 31 of the current year",
      "The 25th day of the month following the close of the taxpayer's fiscal year, or April 15 for calendar years"
    ],
    answer: 3,
    explanation: "The general deadline for the annual income tax return (BIR Form 1701/1700) is APRIL 15 following the close of the calendar year — or the 15th day of the fourth month following the close of a fiscal year. Option D captures the rule for both calendar and fiscal year taxpayers; April 15 is the common case.",
    source: "Seed sample"
  },
  {
    id: "tab-005",
    subject: "Taxation (TAB)",
    module: "Income Taxation",
    topic: "Deductibility",
    question: "Which of the following is NOT deductible for income tax purposes?",
    choices: [
      "Salaries and wages of employees",
      "Personal, living, and family expenses of the owner",
      "Ordinary and necessary business expenses directly connected with the trade or business",
      "Taxes and licenses paid in connection with the business"
    ],
    answer: 1,
    explanation: "Personal, living, and family expenses of the proprietor or shareholder are expressly NON-deductible (NIRC, Sec. 34(A)(1)). Business-connected salaries, ordinary and necessary expenses, and taxes/licenses related to the business are deductible, subject to substantiation.",
    source: "Seed sample"
  },
  {
    id: "tab-002",
    subject: "Taxation (TAB)",
    module: "Business Taxes",
    topic: "Value-Added Tax",
    question: "The current value-added tax (VAT) rate in the Philippines is:",
    choices: ["8%", "10%", "12%", "15%"],
    answer: 2,
    explanation: "Under the TRAIN Law (R.A. 10963), VAT is imposed at 12% on the sale of goods and properties and on the rendition of services in the Philippines. (The law allows a reduced rate of 10%/8% only upon certain conditions — e.g., oil price triggers — which have not taken effect for general transactions.)",
    source: "Seed sample"
  },
  {
    id: "tab-003",
    subject: "Taxation (TAB)",
    module: "Business Taxes",
    topic: "Corporate Income Tax",
    question: "Under the CREATE Act (R.A. 11534), the regular corporate income tax (RCIT) rate for domestic corporations is generally:",
    choices: [
      "30% of net taxable income",
      "25% of net taxable income, with 20% for corporations with net taxable income not exceeding P5M and total assets not exceeding P100M (excluding land)",
      "20% of gross income",
      "15% of net taxable income for all domestic corporations"
    ],
    answer: 1,
    explanation: "CREATE cut the RCIT from 30% to 25%, effective July 1, 2020. Domestic corporations with net taxable income ≤ P5M AND total assets ≤ P100M (excluding land) enjoy a further reduced 20% rate. The 15% rate applies only to registered business enterprises under incentive laws (e.g., CREATE incentives), not to ordinary corporations.",
    source: "Seed sample"
  },

  // ═══════════════ SUBJECT: Auditing (AUD) ═══════════════
  {
    id: "aud-001",
    subject: "Auditing (AUD)",
    module: "Audit Framework & Risk",
    topic: "Audit Risk Model",
    question: "The audit risk model expresses audit risk as the product of:",
    choices: [
      "Inherent risk × control risk × detection risk",
      "Business risk × fraud risk × sampling risk",
      "Control risk × sampling risk × nonsampling risk",
      "Inherent risk × materiality × audit risk"
    ],
    answer: 0,
    explanation: "AR = IR × CR × DR. Inherent risk and control risk are properties of the ENTITY and its environment (the auditor assesses but does not control them), while detection risk is the risk the auditor's procedures fail to detect material misstatements — the component the auditor controls through the nature, timing, and extent of procedures.",
    source: "Seed sample"
  },
  {
    id: "aud-004",
    subject: "Auditing (AUD)",
    module: "Audit Framework & Risk",
    topic: "Audit Sampling",
    question: "The principal advantage of statistical sampling over non-statistical sampling in auditing is that statistical sampling:",
    choices: [
      "Guarantees that all fraud will be detected",
      "Allows the auditor to measure and control sampling risk",
      "Eliminates the need for professional judgment",
      "Always requires smaller sample sizes"
    ],
    answer: 1,
    explanation: "Statistical sampling lets the auditor QUANTIFY sampling risk and draw defensible conclusions about the population from the sample. It does not eliminate judgment, guarantee fraud detection, or necessarily reduce sample size — those are common exam distractors.",
    source: "Seed sample"
  },
  {
    id: "aud-002",
    subject: "Auditing (AUD)",
    module: "Reporting & Ethics",
    topic: "Opinion Types",
    question: "When material misstatements exist in the financial statements and their effect is both material AND pervasive, the auditor should issue:",
    choices: ["An unmodified opinion", "A qualified opinion", "An adverse opinion", "A disclaimer of opinion"],
    answer: 2,
    explanation: "Material AND pervasive misstatements call for an ADVERSE opinion — the auditor states the FS do not present fairly. Material but NOT pervasive → qualified ('except for'). Pervasive inability to obtain sufficient appropriate evidence → disclaimer. Misstatement refers to GAAP noncompliance; insufficient evidence is the disclaimer scenario.",
    source: "Seed sample"
  },
  {
    id: "aud-003",
    subject: "Auditing (AUD)",
    module: "Reporting & Ethics",
    topic: "Independence",
    question: "An audit firm that keeps the bookkeeping records of its audit client and then audits those same records faces which threat to independence?",
    choices: ["Self-interest threat", "Self-review threat", "Advocacy threat", "Familiarity threat"],
    answer: 1,
    explanation: "A SELF-REVIEW threat exists when the auditor would be evaluating the output of their own previous work (here, their own bookkeeping). Self-interest involves a financial stake; advocacy means promoting the client's position; familiarity arises from long or close relationships eroding professional skepticism.",
    source: "Seed sample"
  },
  {
    id: "aud-005",
    subject: "Auditing (AUD)",
    module: "Reporting & Ethics",
    topic: "Subsequent Events",
    question: "Subsequent events that provide additional evidence about conditions that ALREADY existed at the balance sheet date (Type 1 events) require the auditor to:",
    choices: [
      "Ignore them because the financial statements are already issued",
      "Recommend that management adjust the amounts recognized in the financial statements",
      "Issue an adverse opinion automatically",
      "Disclose them only in the auditor's report without any FS adjustment"
    ],
    answer: 1,
    explanation: "Type 1 (adjusting) events — e.g., bankruptcy of a customer occurring after year-end over a receivable that existed at year-end — require ADJUSTMENT to the FS because they confirm conditions existing at the reporting date. Type 2 (non-adjusting) events arising AFTER the date require disclosure only.",
    source: "Seed sample"
  }
];

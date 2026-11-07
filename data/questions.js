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
  },

  // ═══════════════ SUBJECT: Management Services (MS) — Pinnacle May 2027 handout ═══════════════
  {
    id: "ms-101",
    subject: "Management Services (MS)",
    module: "Introduction to MS",
    topic: "Purpose of Management Accounting",
    question: "Management accounting is considered successful when it:",
    choices: [
      "Helps creditors evaluate the company's performance",
      "Helps managers improve their decisions",
      "Is accurate and reported annually",
      "Conforms with generally accepted accounting principles"
    ],
    answer: 1,
    explanation: "Management accounting serves INTERNAL users (managers). It succeeds when it improves managerial decisions — planning, directing, controlling, and decision-making. Accuracy and periodicity matter far less than relevance to the decision at hand.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-102",
    subject: "Management Services (MS)",
    module: "Introduction to MS",
    topic: "Financial vs. Management Accounting",
    question: "Which of the following distinguishes management accounting from financial accounting?",
    choices: [
      "Management accounting reports are mandatory and prepared periodically",
      "Management accounting is primarily for external users such as investors and creditors",
      "Management accounting is not governed by GAAP and uses any measurement unit useful to the situation",
      "Management accounting covers only the whole company rather than subunits"
    ],
    answer: 2,
    explanation: "Financial accounting: external users, GAAP-based, mandatory, periodic, historical, whole-company, summarized. Management accounting: internal users, no GAAP constraint (relevance is the standard), optional yet vital, prepared whenever needed, forecast data, may cover any subunit in detail.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-103",
    subject: "Management Services (MS)",
    module: "Introduction to MS",
    topic: "Line and Staff Functions",
    question: "In a typical organizational structure, which of the following is a STAFF function?",
    choices: [
      "Production supervisor",
      "Sales director",
      "Store manager",
      "Human resources manager"
    ],
    answer: 3,
    explanation: "Line functions are directly responsible for attaining objectives and interact with customers — production, sales, marketing. Staff functions provide specialized service and technical advice laterally or upward — finance/accounting, IT, human resources — and usually do not interact with customers.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-104",
    subject: "Management Services (MS)",
    module: "Introduction to MS",
    topic: "Functions of Management",
    question: "The management function that involves evaluating whether actual performance conforms to planned goals, with feedback as its key, is:",
    choices: [
      "Planning",
      "Directing",
      "Controlling",
      "Decision-making"
    ],
    answer: 2,
    explanation: "Controlling compares actual performance against budgets/plans, monitors results, and triggers corrective action; feedback signals whether operations are on track. Planning sets goals; directing mobilizes people day-to-day; decision-making uses predictive (relevant) information.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-105",
    subject: "Management Services (MS)",
    module: "Cost Concepts",
    topic: "Prime and Conversion Cost",
    question: "Prime cost and conversion cost share what common element?",
    choices: [
      "Direct materials",
      "Direct labor",
      "Manufacturing overhead",
      "Selling expenses"
    ],
    answer: 1,
    explanation: "Prime cost = direct materials + direct labor. Conversion cost = direct labor + manufacturing overhead (the costs of CONVERTING materials into finished goods). Direct labor appears in both.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-106",
    subject: "Management Services (MS)",
    module: "Cost Concepts",
    topic: "Manufacturing Overhead",
    question: "Which of the following would NOT be classified as manufacturing overhead?",
    choices: [
      "Indirect labor",
      "Indirect materials",
      "Direct materials",
      "Insurance on factory building"
    ],
    answer: 2,
    explanation: "Manufacturing overhead consists of costs indirectly associated with manufacture: indirect materials, indirect labor, depreciation on factory buildings and machines, insurance, taxes, and maintenance on factory facilities. Direct materials are traced directly to the product.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-107",
    subject: "Management Services (MS)",
    module: "Cost Concepts",
    topic: "Cost Behavior",
    question: "As activity level decreases, the fixed cost per unit will:",
    choices: [
      "Remain constant",
      "Increase",
      "Decrease proportionately",
      "Vary directly with activity"
    ],
    answer: 1,
    explanation: "Total fixed costs stay constant regardless of activity, so fixed cost per unit varies INVERSELY with activity: fewer units means each unit carries a larger share of the fixed cost. Variable cost per unit, in contrast, remains constant at every level.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-108",
    subject: "Management Services (MS)",
    module: "Cost Concepts",
    topic: "Regression Analysis",
    question: "In cost analysis, the coefficient of determination (r²) measures:",
    choices: [
      "The slope of the regression line",
      "The proportion of the variation in the dependent variable explained by the regression equation",
      "Whether the relationship between variables is direct or inverse",
      "The predicted value of the independent variable"
    ],
    answer: 1,
    explanation: "r² is the 'goodness of fit' — the proportion of total variation in Y (cost) accounted for by the regression equation. The HIGHER the r², the more confidence one can have in the estimated cost formula. (The correlation coefficient r measures strength/direction; r² measures explained variation.)",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-109",
    subject: "Management Services (MS)",
    module: "Cost Concepts",
    topic: "Mixed Cost Segregation",
    question: "The method that separates a mixed cost into its fixed and variable components with the HIGHEST degree of precision is:",
    choices: [
      "High-low method",
      "Scattergraph method",
      "Least squares (regression analysis) method",
      "Account analysis method"
    ],
    answer: 2,
    explanation: "Least squares/regression determines the line of best fit by minimizing the sum of squared deviations, using ALL data points. High-low uses only two points; the scattergraph is visual and subjective.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-110",
    subject: "Management Services (MS)",
    module: "CVP Analysis",
    topic: "Break-Even Point Computation",
    question: "A company has fixed costs of P500,000 and a contribution margin ratio of 40%. The break-even point in peso sales is:",
    choices: ["P200,000", "P500,000", "P1,250,000", "P2,000,000"],
    answer: 2,
    explanation: "Break-even in peso = Fixed Costs ÷ CM Ratio = P500,000 ÷ 0.40 = P1,250,000. At this sales level, contribution margin (P500,000) exactly equals fixed costs — no profit, no loss.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-111",
    subject: "Management Services (MS)",
    module: "CVP Analysis",
    topic: "CVP Assumptions",
    question: "Which of the following is an assumption underlying CVP analysis?",
    choices: [
      "Inventory levels change as production exceeds sales",
      "The sales mix remains constant when multiple products are sold",
      "Cost behavior is curvilinear throughout all activity levels",
      "Fixed costs vary with each unit produced"
    ],
    answer: 1,
    explanation: "CVP assumes: (1) costs and revenues behave linearly within the relevant range; (2) costs can be accurately classified as variable or fixed; (3) changes in activity are the only cost driver; (4) ALL units produced are sold (production = sales); and (5) with multiple products, the sales mix stays constant.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-112",
    subject: "Management Services (MS)",
    module: "CVP Analysis",
    topic: "Margin of Safety",
    question: "The margin of safety indicates:",
    choices: [
      "The profit earned at the break-even point",
      "The maximum amount by which sales could decline without incurring a loss",
      "The excess of fixed costs over contribution margin",
      "The ratio of variable costs to sales"
    ],
    answer: 1,
    explanation: "Margin of safety = actual (or budgeted) sales − break-even sales. It tells management how far sales can FALL before the company slips into a loss — a cushion against downturns.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-113",
    subject: "Management Services (MS)",
    module: "CVP Analysis",
    topic: "Sales Mix and Operating Leverage",
    question: "At any level of units sold, net income will be greater if the company sells:",
    choices: [
      "An equal mix of all products",
      "Higher contribution margin units rather than lower contribution margin units",
      "Lower contribution margin units to maximize total unit volume",
      "Only the product with the highest selling price"
    ],
    answer: 1,
    explanation: "A shift from low-margin to high-margin sales can INCREASE net income even if total units sold decline; conversely, shifting to low-margin units can decrease income even with more units sold. What matters is contribution margin, not unit count or price alone.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-114",
    subject: "Management Services (MS)",
    module: "Absorption vs. Variable Costing",
    topic: "Fixed Overhead Treatment",
    question: "The costing method that treats fixed manufacturing overhead as a PERIOD cost is:",
    choices: [
      "Absorption costing",
      "Full costing",
      "Variable costing",
      "Conventional costing"
    ],
    answer: 2,
    explanation: "Variable costing (also called direct costing) includes only variable manufacturing costs in unit product cost and expenses fixed factory overhead immediately as a period cost. Absorption costing (= full or conventional costing) treats fixed factory overhead as a PRODUCT cost.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-115",
    subject: "Management Services (MS)",
    module: "Absorption vs. Variable Costing",
    topic: "Net Income Differences",
    question: "When units produced EXCEED units sold, net income under absorption costing will be:",
    choices: [
      "Higher than under variable costing",
      "Lower than under variable costing",
      "Equal to variable costing",
      "Indeterminable without knowing the sales price"
    ],
    answer: 0,
    explanation: "With production > sales, part of fixed overhead is DEFERRED into ending inventory under absorption costing instead of being expensed immediately — so absorption income is higher. When production < sales, absorption income is lower; when production = sales, the two are equal.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-116",
    subject: "Management Services (MS)",
    module: "Absorption vs. Variable Costing",
    topic: "Advantages of Variable Costing",
    question: "Which of the following is an advantage of variable costing for internal reporting?",
    choices: [
      "Net income is unaffected by changes in production levels",
      "It is required by GAAP for external reporting",
      "It defers fixed overhead into inventory",
      "It matches all manufacturing costs against revenue when goods are sold"
    ],
    answer: 0,
    explanation: "Under variable costing, net income is tied to SALES, not production — changes in production levels do not distort it. It is consistent with CVP and incremental analysis. However, GAAP requires ABSORPTION costing for external reporting.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-117",
    subject: "Management Services (MS)",
    module: "Standard Costing",
    topic: "Levels of Standards",
    question: "Standards that represent optimum performance under PERFECT operating conditions are called:",
    choices: [
      "Normal standards",
      "Ideal standards",
      "Attainable standards",
      "Practical standards"
    ],
    answer: 1,
    explanation: "Ideal standards assume maximum efficiency — perfect operating conditions with no waste, downtime, or machine breakdowns. Normal standards represent efficient levels ATTAINABLE under expected operating conditions and are more widely used because they allow for normal waste and downtime.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-118",
    subject: "Management Services (MS)",
    module: "Standard Costing",
    topic: "Materials Variances",
    question: "The purchasing agent is generally held responsible for the:",
    choices: [
      "Material quantity variance",
      "Material price variance",
      "Labor efficiency variance",
      "Volume variance"
    ],
    answer: 1,
    explanation: "MPV = (actual price − standard price) × actual quantity purchased. The purchasing agent controls the PRICE paid. The PRODUCTION manager answers for the material quantity variance (control over materials usage) and the labor variances.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-119",
    subject: "Management Services (MS)",
    module: "Standard Costing",
    topic: "Variance Computation",
    question: "Using the formula MPV = (actual price − standard price) × actual quantity purchased: actual price is P11, standard price is P10, and 5,000 units were purchased. The materials price variance is:",
    choices: [
      "P5,000 unfavorable",
      "P5,000 favorable",
      "P50,000 unfavorable",
      "P55,000 favorable"
    ],
    answer: 0,
    explanation: "MPV = (P11 − P10) × 5,000 = P5,000. Actual price EXCEEDS standard price, so the variance is UNFAVORABLE — the company paid P1 more per unit than planned.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-120",
    subject: "Management Services (MS)",
    module: "Standard Costing",
    topic: "Labor Variances",
    question: "The labor efficiency variance is computed as:",
    choices: [
      "(Actual rate − standard rate) × actual hours",
      "(Actual hours − standard hours) × standard rate",
      "(Actual hours − standard hours) × actual rate",
      "(Actual rate − standard rate) × standard hours"
    ],
    answer: 1,
    explanation: "LEV = (actual hours − standard hours) × standard RATE — efficiency is about time used, priced at the standard rate. The rate variance uses prices: LRV = (actual rate − standard rate) × actual HOURS.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-121",
    subject: "Management Services (MS)",
    module: "Budgeting",
    topic: "Master Budget",
    question: "The STARTING POINT in preparing the master budget is the:",
    choices: [
      "Production budget",
      "Cash budget",
      "Sales budget",
      "Direct materials purchases budget"
    ],
    answer: 2,
    explanation: "The master budget begins with the SALES budget — expected sales drive how many units must be produced (production budget), which in turn drives materials, labor, and overhead budgets. The cash budget and budgeted income statement come later.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-122",
    subject: "Management Services (MS)",
    module: "Budgeting",
    topic: "Cash Budget",
    question: "The three sections of a cash budget are:",
    choices: [
      "Sales, production, and financing",
      "Cash receipts, cash disbursements, and financing",
      "Revenues, expenses, and net income",
      "Beginning cash, collections, and borrowing"
    ],
    answer: 1,
    explanation: "The cash budget contains (a) cash receipts, (b) cash disbursements, and (c) financing. Because cash is so vital to survival, it is often considered the most important financial budget.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-123",
    subject: "Management Services (MS)",
    module: "Budgeting",
    topic: "Budgeting Approaches",
    question: "A budget and planning process requiring each manager to justify a department's entire budget from a base of ZERO every period is called:",
    choices: [
      "Kaizen budgeting",
      "Life-cycle budgeting",
      "Zero-based budgeting",
      "Continuous budgeting"
    ],
    answer: 2,
    explanation: "Zero-based budgeting starts each period from zero — every program must be re-justified, not merely incremented from last year. Kaizen assumes continuous small improvements; life-cycle budgets estimate a product's revenues and expenses over its entire life; a continuous (rolling) budget always covers the next twelve months.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-124",
    subject: "Management Services (MS)",
    module: "Budgeting",
    topic: "Production Budget",
    question: "Budgeted sales are 10,000 units, desired ending finished goods inventory is 2,000 units, and beginning finished goods inventory is 1,500 units. Required production is:",
    choices: ["10,500 units", "11,500 units", "12,000 units", "9,500 units"],
    answer: 0,
    explanation: "Required production = budgeted sales + desired ending FG − beginning FG = 10,000 + 2,000 − 1,500 = 10,500 units.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-125",
    subject: "Management Services (MS)",
    module: "Budgeting",
    topic: "Flexible Budgets",
    question: "A flexible budget is best described as:",
    choices: [
      "A budget that is never revised once approved",
      "A series of static budgets at different levels of activity",
      "A budget prepared from a base of zero each period",
      "A budget that covers a rolling twelve-month period"
    ],
    answer: 1,
    explanation: "A flexible budget projects data for VARIOUS activity levels — in essence a series of static budgets. It is appropriate for performance evaluation because both actual and budgeted costs are compared at the ACTUAL activity level achieved.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-126",
    subject: "Management Services (MS)",
    module: "Relevant Costing",
    topic: "Relevant Costs",
    question: "Costs that are expected to differ under each alternative course of action are:",
    choices: [
      "Sunk costs",
      "Relevant costs",
      "Joint costs",
      "Shutdown costs"
    ],
    answer: 1,
    explanation: "Relevant costs are FUTURE costs expected to be DIFFERENT between alternatives. Sunk costs were incurred in the past and are never relevant; joint costs are sunk at the split-off point; shutdown costs continue even after discontinuing a segment.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-127",
    subject: "Management Services (MS)",
    module: "Relevant Costing",
    topic: "Special Orders",
    question: "A company should ACCEPT a special order when:",
    choices: [
      "The order price exceeds full cost per unit including allocated fixed costs",
      "Additional revenue from the order exceeds additional cost, and regular market sales will not be affected",
      "The company is operating at full capacity",
      "The order price covers only the allocated portion of fixed costs"
    ],
    answer: 1,
    explanation: "The decision rule for special orders: accept when incremental revenue exceeds incremental (mostly variable) cost, PROVIDED regular sales are not affected. At FULL capacity, the order would displace regular sales and is usually rejected. Fixed costs are generally irrelevant.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-128",
    subject: "Management Services (MS)",
    module: "Relevant Costing",
    topic: "Sell or Process Further",
    question: "In a sell-or-process-further decision, costs incurred BEFORE the split-off point are:",
    choices: [
      "Relevant and should be allocated to each product",
      "Sunk costs and irrelevant to the decision",
      "Avoidable costs that favor processing further",
      "Opportunity costs of processing further"
    ],
    answer: 1,
    explanation: "Joint costs are incurred before the split-off point — by then they are already sunk and irrelevant. The rule: process further only if the INCREMENTAL revenue beyond split-off exceeds the further processing costs.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-129",
    subject: "Management Services (MS)",
    module: "Relevant Costing",
    topic: "Retain or Replace Equipment",
    question: "In deciding whether to retain or replace equipment, the book value of the OLD equipment is:",
    choices: [
      "A relevant cost that favors replacement",
      "A sunk cost that does not affect the decision",
      "An avoidable cost that favors retaining",
      "An opportunity cost of replacement"
    ],
    answer: 1,
    explanation: "Book value of the old asset is a SUNK cost — it cannot be changed by any present or future decision. The relevant items are the effects on variable costs, the cost of the new equipment, and any disposal value of the old asset.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-130",
    subject: "Management Services (MS)",
    module: "Relevant Costing",
    topic: "Scarce Resources",
    question: "When a resource is scarce, products should be ranked and produced according to:",
    choices: [
      "Highest selling price per unit",
      "Highest contribution margin per unit of the SCARCE (limited) resource",
      "Highest total contribution margin per unit",
      "Lowest variable cost per unit"
    ],
    answer: 1,
    explanation: "With a binding constraint, the key metric is contribution margin per unit of LIMITING resource — that maximizes total contribution margin from whatever capacity exists. Products with the highest CM per machine hour, for example, are produced first.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-131",
    subject: "Management Services (MS)",
    module: "Responsibility Accounting",
    topic: "Responsibility Centers",
    question: "A responsibility center that incurs costs, generates revenues, AND controls the assets used in its operations is a(n):",
    choices: [
      "Cost center",
      "Revenue center",
      "Profit center",
      "Investment center"
    ],
    answer: 3,
    explanation: "The four centers form a hierarchy: revenue centers generate revenues; cost centers incur costs only; profit centers do both; and INVESTMENT centers additionally have authority over the assets deployed — making ROI and residual income their natural performance measures.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-132",
    subject: "Management Services (MS)",
    module: "Responsibility Accounting",
    topic: "ROI",
    question: "Return on investment (ROI) for an investment center is computed as:",
    choices: [
      "Net income ÷ sales",
      "Operating income ÷ average operating assets",
      "Contribution margin ÷ controllable fixed costs",
      "Sales ÷ average operating assets"
    ],
    answer: 1,
    explanation: "ROI = operating income ÷ average operating assets, where operating income is earnings before interest and taxes. Patterned after the DuPont technique, ROI = return on sales × asset turnover.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-133",
    subject: "Management Services (MS)",
    module: "Responsibility Accounting",
    topic: "Residual Income",
    question: "Residual income (RI) is best described as:",
    choices: [
      "Operating income ÷ average operating assets",
      "The excess of operating income over the minimum required return on operating assets",
      "Contribution margin less controllable fixed costs",
      "After-tax operating income less the weighted average cost of capital"
    ],
    answer: 1,
    explanation: "RI = operating income − (minimum rate of return × operating assets). It measures income ABOVE the required floor. EVA is a more specific version that uses the after-tax WACC applied to total assets less noninterest-bearing current liabilities.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-134",
    subject: "Management Services (MS)",
    module: "Responsibility Accounting",
    topic: "Decentralization",
    question: "When one segment takes action that benefits itself but is detrimental to the company as a whole, the situation is called:",
    choices: [
      "Goal congruence",
      "Sub-optimization",
      "Management by exception",
      "Decentralization"
    ],
    answer: 1,
    explanation: "Sub-optimization occurs when a unit optimizes its own results at the expense of the firm. Goal congruence — units working toward a common interest — is the opposite, and is exactly what a well-designed responsibility system motivates.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-135",
    subject: "Management Services (MS)",
    module: "Transfer Pricing",
    topic: "Transfer Price Defined",
    question: "The price charged by one segment of a firm for goods or services supplied to another segment of the SAME firm is the:",
    choices: [
      "Market price",
      "Distress price",
      "Transfer price",
      "Outlay price"
    ],
    answer: 2,
    explanation: "A transfer price is the internal charge between segments of one company. Its objectives: facilitate optimal decision-making, provide a basis for measuring divisional performance, and motivate department heads.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-136",
    subject: "Management Services (MS)",
    module: "Transfer Pricing",
    topic: "Transfer Price Limits",
    question: "The MAXIMUM transfer price should be no greater than:",
    choices: [
      "The selling segment's full cost of production",
      "The lowest market price at which the buying segment can acquire the goods externally",
      "The selling segment's variable cost plus a normal markup",
      "The highest price the buying segment can negotiate"
    ],
    answer: 1,
    explanation: "Ceiling: the buying division would never pay more internally than it could buy for outside (lowest external market price). Floor: the selling division's incremental (variable) cost PLUS the opportunity cost of facilities used. Transfers are worthwhile when the minimum is below the maximum.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-137",
    subject: "Management Services (MS)",
    module: "Transfer Pricing",
    topic: "Capacity and Opportunity Cost",
    question: "When the selling division is operating at FULL capacity, the minimum transfer price should include:",
    choices: [
      "Only the variable cost per unit",
      "Variable cost per unit plus the lost contribution margin per unit on outside sales",
      "Only fixed cost per unit",
      "The full cost per unit without any markup"
    ],
    answer: 1,
    explanation: "At full capacity, every unit transferred internally sacrifices an outside sale — that lost contribution margin IS the opportunity cost. Minimum price = variable cost per unit + lost CM per unit on outside sales.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-138",
    subject: "Management Services (MS)",
    module: "Transfer Pricing",
    topic: "Pricing Approaches",
    question: "Which transfer pricing basis is often considered the BEST approach because it is objective and provides proper economic incentives?",
    choices: [
      "Cost-based transfer price",
      "Market-based transfer price",
      "Arbitrary transfer price",
      "Full cost plus standard markup"
    ],
    answer: 1,
    explanation: "Market-based prices are objective and align divisional decisions with economic reality. Cost-based prices tend to pass the seller's inefficiencies to the buyer and give the selling division no incentive to control costs.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-139",
    subject: "Management Services (MS)",
    module: "Capital Budgeting",
    topic: "Cash Flows",
    question: "In capital budgeting, depreciation expense is added back to net income when computing net annual cash flow because:",
    choices: [
      "Depreciation reduces the project's cost",
      "Depreciation is an expense that does not require a cash outflow",
      "Depreciation is a relevant sunk cost",
      "Depreciation increases the required rate of return"
    ],
    answer: 1,
    explanation: "Capital budgeting uses estimated CASH flows, not accrual income. Depreciation is a noncash expense — it reduces net income but uses no cash — so it is added back: net annual cash flow = net income + depreciation.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-140",
    subject: "Management Services (MS)",
    module: "Capital Budgeting",
    topic: "Payback Period",
    question: "A major limitation of the cash payback technique is that it:",
    choices: [
      "Is difficult to compute and understand",
      "Ignores the expected profitability of the project and the time value of money",
      "Requires estimating the cost of capital",
      "Cannot be used when annual cash flows are equal"
    ],
    answer: 1,
    explanation: "Payback = cost of investment ÷ net annual cash flow (equal flows). It is easy to use and highlights liquidity/obsolescence risk, but it ignores what happens AFTER payback (profitability) and disregards the time value of money — so it should not be the sole basis for a decision.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-141",
    subject: "Management Services (MS)",
    module: "Capital Budgeting",
    topic: "NPV and IRR",
    question: "The internal rate of return (IRR) is best described as the interest rate that:",
    choices: [
      "The company must pay to obtain funds from creditors and stockholders",
      "Causes the present value of expected net cash flows to equal the cost of the investment",
      "Is equal to the company's cost of capital",
      "Is imputed by government regulation"
    ],
    answer: 1,
    explanation: "IRR is the project's own yield — the discount rate at which NPV = 0 (PV of inflows equals the investment). Decision rule: accept when IRR ≥ the required rate of return. The company's cost of capital is the usual discount rate for NPV, not the IRR itself.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-142",
    subject: "Management Services (MS)",
    module: "Capital Budgeting",
    topic: "Profitability Index",
    question: "The profitability index is computed by dividing:",
    choices: [
      "Initial investment by the payback period",
      "Present value of future cash flows by the initial investment",
      "Net income by average investment",
      "Net annual cash flow by the cost of the investment"
    ],
    answer: 1,
    explanation: "PI = PV of future cash flows ÷ initial investment. It is useful when choosing among MUTUALLY EXCLUSIVE projects or when resources are limited, because it considers both the size of the investment and the discounted returns. Higher PI = more desirable.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-143",
    subject: "Management Services (MS)",
    module: "Cost of Capital",
    topic: "WACC",
    question: "The weighted average cost of capital (WACC) represents the:",
    choices: [
      "Average coupon rate on the company's outstanding bonds",
      "Overall cost of capital from ALL of the organization's financing sources",
      "Cost of issuing new securities through investment bankers",
      "Dividend rate the company must pay on equity securities"
    ],
    answer: 1,
    explanation: "WACC blends the after-tax costs of each capital component — long-term debt, preferred stock, and common equity — weighted by their share of the capital structure. Accounts payable and accruals are NOT capital components for WACC purposes.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-144",
    subject: "Management Services (MS)",
    module: "Cost of Capital",
    topic: "CAPM",
    question: "Using CAPM: the risk-free rate is 6%, the market risk premium is 5%, and the stock's beta is 1.2. The cost of equity is:",
    choices: ["10.0%", "11.0%", "12.0%", "13.2%"],
    answer: 2,
    explanation: "CAPM: R = RF + β × (RM − RF) = 6% + 1.2 × 5% = 6% + 6% = 12%. Beta measures the stock's volatility relative to the market; the risk-free rate is proxied by government securities.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-145",
    subject: "Management Services (MS)",
    module: "Cost of Capital",
    topic: "Component Costs",
    question: "When computing the cost of capital, which statement is correct?",
    choices: [
      "Interest on debt requires tax adjustment because it is tax deductible; preferred dividends do not",
      "Preferred dividends are tax deductible, so no adjustment is needed",
      "Both debt interest and preferred dividends are tax deductible",
      "Neither debt interest nor preferred dividends affect the cost of capital"
    ],
    answer: 0,
    explanation: "Interest is tax deductible, so the cost of debt uses the AFTER-TAX rate — which lowers WACC. Preferred stock dividends are paid from after-tax income and are NOT deductible. Flotation costs (e.g., on new common stock) increase the cost of that component.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-146",
    subject: "Management Services (MS)",
    module: "Cost of Capital",
    topic: "Cost of New Common Equity",
    question: "In the dividend growth (DDM) formula, the cost of NEW common stock differs from the cost of retained earnings because new stock:",
    choices: [
      "Uses a higher growth rate",
      "Deducts flotation costs from the current price",
      "Is not affected by dividends",
      "Has a beta of zero"
    ],
    answer: 1,
    explanation: "Cost of retained earnings = (D1 ÷ P0) + G. For NEW common stock, flotation costs reduce the net proceeds: (D1 ÷ [P0 × (1 − flotation cost)]) + G — making new equity MORE expensive than retained earnings.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-147",
    subject: "Management Services (MS)",
    module: "Financial Statement Analysis",
    topic: "Tools of Analysis",
    question: "Horizontal analysis is also known as:",
    choices: [
      "Common-size analysis",
      "Ratio analysis",
      "Trend analysis",
      "Vertical analysis"
    ],
    answer: 2,
    explanation: "Horizontal (trend) analysis evaluates financial data over a SERIES of periods — a base year is selected and changes are expressed as amounts or percentages of the base. Vertical (common-size) analysis expresses each item as a percent of a base amount within ONE statement.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-148",
    subject: "Management Services (MS)",
    module: "Financial Statement Analysis",
    topic: "Liquidity Ratios",
    question: "The acid-test (quick) ratio differs from the current ratio because it:",
    choices: [
      "Includes inventory in the numerator",
      "Relates only cash, short-term investments, and net receivables to current liabilities",
      "Uses total liabilities instead of current liabilities",
      "Measures solvency rather than liquidity"
    ],
    answer: 1,
    explanation: "The acid-test excludes inventory (and prepayments) — it relates only the most liquid assets (cash, marketable securities, net receivables) to current liabilities, indicating IMMEDIATE liquidity. Both are liquidity (short-term debt-paying ability) measures.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-149",
    subject: "Management Services (MS)",
    module: "Financial Statement Analysis",
    topic: "Turnover Ratios",
    question: "Inventory turnover is computed by dividing cost of goods sold by:",
    choices: [
      "Ending inventory",
      "Beginning inventory",
      "Average inventory",
      "Net sales"
    ],
    answer: 2,
    explanation: "Inventory turnover = COGS ÷ AVERAGE merchandise inventory — it measures how many times inventory is sold (replaced) during the period. Average days in inventory = 360 days ÷ inventory turnover.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-150",
    subject: "Management Services (MS)",
    module: "Financial Statement Analysis",
    topic: "Solvency Ratios",
    question: "Times interest earned is computed by dividing income BEFORE interest expense and income taxes by:",
    choices: [
      "Total assets",
      "Interest expense",
      "Net sales",
      "Total liabilities"
    ],
    answer: 1,
    explanation: "Times interest earned (interest coverage) = EBIT ÷ interest expense — it gauges the company's ability to meet interest payments as they come due, a key SOLVENCY measure.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-151",
    subject: "Management Services (MS)",
    module: "Working Capital Management",
    topic: "Motives for Holding Cash",
    question: "Holding cash to provide a buffer against unexpected contingencies reflects the:",
    choices: [
      "Transaction motive",
      "Precautionary motive",
      "Speculative motive",
      "Contractual motive"
    ],
    answer: 1,
    explanation: "The four motives: TRANSACTION (normal day-to-day payments), PRECAUTIONARY (safety buffer for contingencies), SPECULATIVE (grabbing unexpected business/investment opportunities), and CONTRACTUAL (e.g., compensating balances required by banks).",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-152",
    subject: "Management Services (MS)",
    module: "Working Capital Management",
    topic: "Economic Order Quantity",
    question: "The economic order quantity (EOQ) is the order size that minimizes:",
    choices: [
      "The sum of ordering costs and carrying costs",
      "Total purchasing cost of inventory",
      "Safety stock levels",
      "The lead time for orders"
    ],
    answer: 0,
    explanation: "EOQ = √(2aD/k), where a = cost per order, D = annual demand, k = annual carrying cost per unit. It balances ORDERING costs (fall with bigger orders) against CARRYING costs (rise with bigger orders). Its assumptions: constant demand, constant lead time, instantaneous delivery, no quantity discounts.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-153",
    subject: "Management Services (MS)",
    module: "Working Capital Management",
    topic: "Reorder Point",
    question: "When safety stock is required, the reorder point equals:",
    choices: [
      "Normal lead time usage only",
      "Safety stock plus normal lead time usage",
      "Economic order quantity less safety stock",
      "Maximum usage less average usage"
    ],
    answer: 1,
    explanation: "Reorder point = safety stock + normal lead time usage (equivalently, maximum lead time × average usage). Safety stock = (maximum lead time − normal lead time) × average usage — protection against running out before delivery.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-154",
    subject: "Management Services (MS)",
    module: "Working Capital Management",
    topic: "Financing Policies",
    question: "The working capital financing policy that uses short-term liabilities to finance part or all of PERMANENT current asset requirements is:",
    choices: [
      "Matching approach",
      "Conservative approach",
      "Aggressive approach",
      "Neutral approach"
    ],
    answer: 2,
    explanation: "Aggressive policy runs on minimal working capital — short-term funds finance temporary AND part of permanent current assets (higher risk, lower cost). Conservative finances almost everything with long-term capital (lower risk, higher cost). Matching aligns financing maturity with asset life.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-155",
    subject: "Management Services (MS)",
    module: "Working Capital Management",
    topic: "Five C's of Credit",
    question: "In credit evaluation, the 'C' that refers to the customer's willingness to pay is:",
    choices: [
      "Capacity",
      "Character",
      "Capital",
      "Collateral"
    ],
    answer: 1,
    explanation: "The Five C's: CHARACTER (willingness to pay), CAPACITY (ability to generate cash flows), CAPITAL (financial sources), CONDITIONS (economic environment), and COLLATERAL (assets pledged).",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-156",
    subject: "Management Services (MS)",
    module: "Quantitative Analysis",
    topic: "Critical Path",
    question: "In a PERT network, the critical path is the:",
    choices: [
      "Shortest path through the network",
      "Longest path through the network",
      "Path with the most activities",
      "Path with the highest cost"
    ],
    answer: 1,
    explanation: "The critical path is the LONGEST path — it determines the minimum total project time; any delay along it delays the whole project. PERT uses probabilistic time estimates, while CPM uses deterministic times plus crash cost concepts.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-157",
    subject: "Management Services (MS)",
    module: "Quantitative Analysis",
    topic: "Slack Time",
    question: "Slack time in project scheduling is:",
    choices: [
      "The time an activity can be delayed without delaying the entire project",
      "The crash time of an activity",
      "The difference between crash time and normal time",
      "The expected time of the critical path"
    ],
    answer: 0,
    explanation: "Slack is scheduling leeway — the length of time a NON-critical activity can slip without forcing a delay to the whole project. Critical path activities have zero slack. Crash time is the rushed duration using all available resources (at crash cost).",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-158",
    subject: "Management Services (MS)",
    module: "Quantitative Analysis",
    topic: "Expected Value",
    question: "The expected value of a decision alternative is found by:",
    choices: [
      "Choosing the outcome with the highest payoff",
      "Multiplying each outcome's probability by its payoff and summing the products",
      "Averaging the best and worst outcomes",
      "Dividing total payoff by the number of outcomes"
    ],
    answer: 1,
    explanation: "Expected value = Σ (probability × payoff) across all possible outcomes — the probability-weighted average. It is central to decision-making under RISK (known probabilities); under UNCERTAINTY the probabilities themselves are unknown.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-159",
    subject: "Management Services (MS)",
    module: "Quantitative Analysis",
    topic: "Learning Curve",
    question: "The learning curve concept states that:",
    choices: [
      "The cumulative average time per unit decreases by a certain percentage each time production doubles",
      "Total production time doubles as output doubles",
      "Productivity decreases with experience",
      "Marginal cost is constant across all output levels"
    ],
    answer: 0,
    explanation: "With experience comes productivity: each time CUMULATIVE production doubles, the cumulative average time per unit falls by a fixed percentage (and the incremental unit time also falls). Gains accrue at a DECREASING rate.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-160",
    subject: "Management Services (MS)",
    module: "Quantitative Analysis",
    topic: "Linear Programming",
    question: "The linear programming technique especially useful when a problem involves MORE THAN TWO variables is the:",
    choices: [
      "Graphic method",
      "Simplex method",
      "High-low method",
      "Regression method"
    ],
    answer: 1,
    explanation: "Linear programming optimizes an objective (maximize profit or minimize cost) subject to constraints. The GRAPHIC method handles only two variables; the SIMPLEX method handles more. It is ideal for resource-allocation decisions with scarce inputs.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-161",
    subject: "Management Services (MS)",
    module: "Economics",
    topic: "Law of Demand",
    question: "The Law of Demand states that, ceteris paribus:",
    choices: [
      "The higher the price, the greater the quantity supplied",
      "The higher the price of a good, the smaller the quantity demanded",
      "Quantity demanded is independent of price",
      "Demand increases as income increases"
    ],
    answer: 1,
    explanation: "Price and quantity demanded are inversely related, for two reasons: the SUBSTITUTION effect (higher relative price raises the opportunity cost, pushing buyers to alternatives) and the INCOME effect (higher price reduces what consumers can afford).",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-162",
    subject: "Management Services (MS)",
    module: "Economics",
    topic: "Inferior Goods",
    question: "Which of the following describes an INFERIOR good?",
    choices: [
      "Demand increases as consumer income increases",
      "Demand increases as consumer income decreases",
      "Demand is unaffected by income",
      "Demand falls when its substitute's price rises"
    ],
    answer: 1,
    explanation: "For inferior goods (e.g., instant noodles, sardines), demand moves INVERSELY with income — consumers buy more of them when money is short. NORMAL goods move directly with income.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-163",
    subject: "Management Services (MS)",
    module: "Economics",
    topic: "Elasticity",
    question: "If the elasticity of demand is GREATER than 1, demand is said to be:",
    choices: [
      "Inelastic",
      "Unit-elastic",
      "Elastic",
      "Perfectly inelastic"
    ],
    answer: 2,
    explanation: "ED > 1 = elastic (quantity demanded is sensitive to price); ED = 1 = unitary; ED < 1 = inelastic. Demand tends to be MORE elastic when there are more substitutes, when the good takes a larger share of income, and over longer time periods — luxuries are more elastic than necessities.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-164",
    subject: "Management Services (MS)",
    module: "Economics",
    topic: "Market Equilibrium",
    question: "A price ceiling set BELOW the equilibrium price will result in:",
    choices: [
      "A surplus",
      "A shortage",
      "Market equilibrium",
      "An increase in supply"
    ],
    answer: 1,
    explanation: "Below equilibrium, quantity demanded exceeds quantity supplied → SHORTAGE (and upward price pressure that the ceiling blocks). A price FLOOR set above equilibrium creates a SURPLUS. Equilibrium itself is the market-clearing state with no shortage or surplus.",
    source: "Pinnacle MS handout (May 2027)"
  },
  {
    id: "ms-165",
    subject: "Management Services (MS)",
    module: "Economics",
    topic: "Consumption and Saving",
    question: "The marginal propensity to consume (MPC) and marginal propensity to save (MPS) always sum to:",
    choices: ["50%", "100%", "0%", "A value that depends on income"]
    ,
    answer: 1,
    explanation: "Each additional peso of disposable income is either spent or saved, so MPC + MPS = 100%. MPC is the share of each additional peso spent; MPS is the share saved.",
    source: "Pinnacle MS handout (May 2027)"
  }
];

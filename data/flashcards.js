/*
 * FLASHCARDS
 * ==========
 * Concept cards for quick recall drills. Same subject/module structure as
 * the question bank.
 *
 * CONTENT RULE: every card must derive STRICTLY from the assigned PDF —
 * the PDFs are the sole reference. No outside material.
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

  // ── MS ───────────────────────────────────────────────────────
  {
    id: "fc-ms-01",
    subject: "Management Services (MS)",
    module: "Cost-Volume-Profit",
    front: "Break-even point in units = ?",
    back: "Fixed costs ÷ contribution margin per unit."
  },
  {
    id: "fc-ms-02",
    subject: "Management Services (MS)",
    module: "Cost-Volume-Profit",
    front: "Margin of safety = ?",
    back: "Actual (or budgeted) sales − break-even sales."
  },
  {
    id: "fc-ms-03",
    subject: "Management Services (MS)",
    module: "Decision-Making",
    front: "What makes a cost RELEVANT for decision-making?",
    back: "It is a FUTURE cost that DIFFERS between alternatives (incremental/avoidable). Sunk and unavoidable costs are never relevant."
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

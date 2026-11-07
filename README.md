# 📚 CPA Review Hub — Board Exam Quiz

An interactive, mobile-friendly CPA board exam reviewer hosted free on
GitHub Pages. Study materials arrive as **PDFs — each PDF becomes a
subject**, divided into **modules**. She picks a subject and module to
practice, drill, take exams with, or flip flashcards from — and everything
(scores, streaks, mastery, weak topics) is saved privately in her browser.

> **Content rules:** every question, explanation, and flashcard must derive
> strictly from the assigned PDF — no outside material; the PDFs are the
> sole reference. Every module must also include **theory, concepts, and
> terminology** questions (definitions, classifications, true/false
> statements) alongside computational items — the board tests both.

## For her (how to use)

| Feature | What it does |
|---|---|
| 🏠 **Home** | Streak, progress per subject, focus areas, recent activity |
| ⚡ **Practice** | Pick **subject → module** → instant feedback + explanation per question |
| 🃏 **Cards** | Flashcards per subject/module — flip, then mark **Know it** or **Still learning** (unknown cards return until learned) |
| ⏱️ **Mock Exam** | Timed simulation on any subject/module (default 1.5 min/question), full review after, 75% = passing |
| 🎯 **Drill** | Every question answered wrong comes back until answered right **twice in a row** (mastered 🏆) |
| 📊 **Stats** | Score trend, consistency heatmap, accuracy per subject (with module detail) |
| 💡 **Tips** | Study techniques, mock-exam strategy, exam-day checklist |
| ⚙️ **Settings** | Dark mode, **export/import progress backup**, reset |

**Keyboard (desktop):** quiz: `1-4`/`A-D` answer · `Enter`/`→` next · `←` back · `F` flag · flashcards: `Space` flip · `K` know · `A` again.

### ⚠️ Important: your progress lives in the browser
Progress is stored on the device, per browser. Before switching phones,
using a different browser, or clearing browser data → **Settings → Export**
and keep the backup file. Import it on the other device.

## For you (the developer/operator)

### How content is organized
```
Subject  = one PDF (e.g. "FAR Reviewer 2024.pdf")
  └─ Module = a chapter/section of that PDF
       ├─ Questions  (data/questions.js)
       └─ Flashcards (data/flashcards.js)
```

When a new PDF is processed, its questions get that PDF's name as
`subject`, are split into `module`s, and flashcard concepts go to
`data/flashcards.js` with the same subject/module tags. Push — the new
subject appears automatically everywhere. (If she doesn't see new content,
refresh twice: the app keeps an offline copy that updates on second load.)

```js
// data/questions.js
{
  id: "far-101",                            // unique, never reuse
  subject: "FAR Reviewer 2024",             // the PDF name — becomes the subject
  module: "Module 2: Receivables",          // chapter/section of the PDF
  topic: "Impairment of receivables",       // fine-grained (weak-topic stats)
  question: "…",
  choices: ["…", "…", "…", "…"],
  answer: 2,                                // 0-3
  explanation: "…",                         // strongly encouraged
  source: "p.12"                            // optional traceability
}

// data/flashcards.js
{
  id: "fc-far-101",
  subject: "FAR Reviewer 2024",             // must match a questions.js subject
  module: "Module 2: Receivables",
  front: "Prompt / term",
  back: "Answer / meaning",
  hint: "optional nudge"
}
```

Raw PDFs belong in `materials/` — it is **gitignored and never published**.

### Deploy on GitHub Pages (one-time)
1. Create a GitHub repo (e.g. `cpa-board-quiz`) — must be **public** for free Pages.
2. Push this folder's contents to `main`.
3. Repo → **Settings → Pages** → Source: *Deploy from a branch* → `main` / `(root)` → Save.
4. Site goes live at `https://<username>.github.io/cpa-board-quiz/` (first build takes a minute or two).
5. On her phone: open the URL → browser menu → **Add to Home Screen** for an app-like icon.

### Structure
```
index.html              app shell (single-page)
css/style.css           light/dark design system
js/storage.js           localStorage + export/import
js/stats.js             streaks, mastery, aggregations
js/ui.js                toasts, modals, SVG charts
js/quiz.js              practice/exam/drill session engine
js/cards.js             flashcard engine
js/app.js               router + screens
data/questions.js       ← QUESTION BANK (grows with each PDF)
data/flashcards.js      ← FLASHCARD BANK (grows with each PDF)
sw.js, manifest.json, icon.svg   offline + installability
materials/              your raw PDFs (gitignored)
```

### Tech notes
- No build step, no dependencies, no server. Plain HTML/CSS/JS.
- Active quiz sessions (including the exam countdown) and flashcard decks
  survive refresh — progress is persisted on every answer.
- The exam timer uses an end-timestamp, so closing the tab doesn't pause it
  (by design — like the real board). If the deadline passes while the app
  is closed, it auto-submits the moment the app is reopened.
- To force-update all clients after big changes, bump `CACHE_VERSION` in `sw.js`.

### Privacy / copyright
- No analytics, no accounts, no server — her data never leaves her device
  (except manual export files she creates herself).
- Free GitHub Pages requires a public repo, so **only processed questions
  are committed**; raw reviewer PDFs stay in gitignored `materials/`.

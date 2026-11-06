# 📚 CPA Review Hub — Board Exam Quiz

An interactive, mobile-friendly CPA board exam reviewer hosted free on
GitHub Pages. She picks a **reviewer (PDF set)**, answers board-style
questions, and everything — scores, streaks, mastery, weak topics — is
saved privately in her browser.

## For her (how to use)

| Feature | What it does |
|---|---|
| 🏠 **Home** | Streak, progress per reviewer, focus areas, recent activity |
| ⚡ **Practice** | Pick a reviewer → instant feedback + explanation per question |
| ⏱️ **Mock Exam** | Timed simulation (default 1.5 min/question), review everything after, 75% = passing |
| 🎯 **Drill** | Every question answered wrong comes back until answered right **twice in a row** (mastered 🏆) |
| 📊 **Stats** | Score trend, consistency heatmap, accuracy per reviewer & per subject |
| 💡 **Tips** | Study techniques, mock-exam strategy, exam-day checklist |
| ⚙️ **Settings** | Dark mode, **export/import progress backup**, reset |

**Keyboard (desktop):** `1-4` / `A-D` answer · `Enter`/`→` next · `←` back · `F` flag (exam).

### ⚠️ Important: your progress lives in the browser
Progress is stored on the device, per browser. Before switching phones,
using a different browser, or clearing browser data → **Settings → Export**
and keep the backup file. Import it on the other device.

## For you (the developer/operator)

### Update questions
Everything lives in `data/questions.js`. Add a batch of questions with a
shared `material` name (that's the "reviewer" she sees) and push — new
reviewers appear automatically. If she doesn't see new questions, refresh
twice (the service worker serves one cached copy, then updates).

Raw PDFs belong in `materials/` — it is **gitignored and never published**.

```js
{
  id: "far-101",                       // unique, never reuse
  material: "FAR Reviewer 2024",       // the PDF name she picks
  subject: "Financial Accounting & Reporting (FAR)",
  topic: "Receivables",
  question: "…",
  choices: ["…", "…", "…", "…"],
  answer: 2,                           // 0-3
  explanation: "…",                    // strongly encouraged
  source: "Reviewer p.12"              // optional
}
```

### Deploy on GitHub Pages (one-time)
1. Create a GitHub repo (e.g. `cpa-board-quiz`) — must be **public** for free Pages.
2. Push this folder's contents to `main`.
3. Repo → **Settings → Pages** → Source: *Deploy from a branch* → `main` / `(root)` → Save.
4. Site goes live at `https://<username>.github.io/cpa-board-quiz/` (first build takes a minute or two).
5. On her phone: open the URL → browser menu → **Add to Home Screen** for an app-like icon.

### Structure
```
index.html          app shell (single-page)
css/style.css       light/dark design system
js/storage.js       localStorage + export/import
js/stats.js         streaks, mastery, aggregations
js/ui.js            toasts, modals, SVG charts
js/quiz.js          practice/exam/drill session engine
js/app.js           router + screens
data/questions.js   ← THE QUESTION BANK (the only file that grows)
sw.js, manifest.json, icon.svg   offline + installability
materials/          your raw PDFs (gitignored)
```

### Tech notes
- No build step, no dependencies, no server. Plain HTML/CSS/JS.
- Active quiz sessions (including the exam countdown) survive refresh —
  progress is persisted on every answer.
- The exam timer uses an end-timestamp, so closing the tab doesn't pause it
  (by design — like the real board).
- To force-update all clients after big changes, bump `CACHE_VERSION` in `sw.js`.

### Privacy / copyright
- No analytics, no accounts, no server — her data never leaves her device
  (except manual export files she creates herself).
- Free GitHub Pages requires a public repo, so **only processed questions
  are committed**; raw reviewer PDFs stay in gitignored `materials/`.

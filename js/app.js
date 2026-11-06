/*
 * app.js — view router, screens, theme, keyboard, service worker
 */
window.App = window.App || {};

(function (App) {
  "use strict";

  var UI = App.UI, Stats = App.Stats, Quiz = App.Quiz, Storage = App.Storage, esc = App.UI.esc;

  // Transient (non-persisted) UI selections, e.g. chosen reviewer on setup screens
  App.uiState = { practiceSel: null, practiceCount: 10, examSel: null, examCount: 30, examMin: null, showGrid: false, reviewMode: false };

  var viewTimers = [];
  function clearTimers() {
    viewTimers.forEach(clearInterval);
    viewTimers = [];
  }

  /* ══════════════════════════ THEME ══════════════════════════ */
  function resolvedTheme() {
    var t = App.state.settings.theme;
    if (t === "system") {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return t;
  }
  function applyTheme() {
    var r = resolvedTheme();
    document.documentElement.setAttribute("data-theme", r);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", r === "dark" ? "#101320" : "#6455d4");
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.textContent = r === "dark" ? "☀️" : "🌙";
  }
  function cycleTheme() {
    var order = ["system", "light", "dark"];
    var cur = App.state.settings.theme;
    App.state.settings.theme = order[(order.indexOf(cur) + 1) % order.length];
    Storage.saveState();
    applyTheme();
    var names = { system: "Theme: system", light: "Theme: light", dark: "Theme: dark" };
    UI.toast(names[App.state.settings.theme]);
  }
  if (window.matchMedia) {
    try {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
        if (App.state.settings.theme === "system") applyTheme();
      });
    } catch (e) { /* older browsers */ }
  }

  /* ══════════════════════════ ROUTER ═════════════════════════ */
  var routes = {
    "": renderDashboard,
    "dashboard": renderDashboard,
    "practice": renderPracticeSetup,
    "exam": renderExamSetup,
    "drill": renderDrillIntro,
    "quiz": renderQuiz,
    "results": renderResults,
    "summary": renderSummary,
    "stats": renderStats,
    "tips": renderTips,
    "settings": renderSettings
  };

  function currentRoute() {
    var h = (location.hash || "").replace(/^#\/?/, "");
    return h.split("?")[0];
  }

  function go(route) { location.hash = "#/" + route; }

  function route() {
    clearTimers();
    var r = currentRoute();
    var fn = routes[r];

    // Guards
    if ((r === "quiz" || r === "results" || r === "summary") && !App.session) { go("dashboard"); return; }
    if (r === "quiz" && App.session.finished) { go(App.session.mode === "exam" ? "results" : "summary"); return; }
    if (!fn) { go("dashboard"); return; }

    document.querySelectorAll(".topnav a, .bottomnav a").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-route") === (r === "" ? "dashboard" : r));
    });

    var main = document.getElementById("view");
    main.className = "fadein";
    fn(main);
    window.scrollTo(0, 0);
  }

  /* ══════════════════════════ SHARED BITS ════════════════════ */
  function emptyBank(main) {
    main.innerHTML =
      '<div class="card"><div class="empty"><div class="big">📚</div>' +
      "<p><b>No questions loaded yet.</b></p>" +
      '<p class="muted mt8">Once review materials are processed into <code>data/questions.js</code>, ' +
      "the reviewers will appear here automatically.</p></div></div>";
  }

  function accuracyChip(pct) {
    if (pct == null) return '<span class="chip">—</span>';
    var cls = pct >= 75 ? "chip good" : pct >= 60 ? "chip warn" : "chip bad";
    return '<span class="' + cls + '">' + pct + "%</span>";
  }

  function materialList(includeAll) {
    var names = [];
    (window.QUESTION_BANK || []).forEach(function (q) {
      var m = q.material || "Unsorted";
      if (names.indexOf(m) === -1) names.push(m);
    });
    names.sort(function (a, b) { return a.localeCompare(b); });
    return includeAll ? [null].concat(names) : names;
  }

  function setCounts(material) {
    var pool = Quiz.poolFor(material);
    return { total: pool.length, unseen: pool.filter(function (q) { return !(App.state.questionStats[q.id] && App.state.questionStats[q.id].seen > 0); }).length };
  }

  /* ══════════════════════════ DASHBOARD ══════════════════════ */
  function renderDashboard(main) {
    if (!Q().length) { emptyBank(main); return; }

    var streak = Stats.streakInfo();
    var ov = Stats.overall();
    var drillN = Stats.drillPool().length;
    var hour = new Date().getHours();
    var greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

    var html = "";

    html +=
      '<div class="hero">' +
        '<div class="streak"><div class="n">🔥 ' + streak.current + '</div><div class="lbl">day streak</div></div>' +
        "<div>" +
          '<div class="greeting">' + greet + '! Future CPA 👋</div>' +
          '<div class="greeting-sub">' +
            (ov.seen > 0
              ? ov.seen + " of " + ov.total + " questions answered · " + ov.mastered + " mastered"
              : "Ready to start? Pick a reviewer below or try a Quick 10.") +
          "</div>" +
        "</div>" +
      "</div>";

    html +=
      '<div class="quickrow">' +
        '<button class="quickbtn" id="qk-practice"><span class="ico">⚡</span><span class="t">Quick 10</span><span class="s">Mixed practice</span></button>' +
        '<button class="quickbtn" id="qk-exam"><span class="ico">⏱️</span><span class="t">Mock Exam</span><span class="s">Timed simulation</span></button>' +
        '<button class="quickbtn" id="qk-drill"><span class="ico">🎯</span><span class="t">Drill' + (drillN ? " (" + drillN + ")" : "") + '</span><span class="s">Missed questions</span></button>' +
        '<button class="quickbtn" id="qk-tips"><span class="ico">💡</span><span class="t">Study Tips</span><span class="s">How to review smart</span></button>' +
      "</div>";

    // Reviewer progress
    var mats = Stats.materialSummary();
    html += '<div class="section-title">Your reviewers</div><div class="card">';
    mats.forEach(function (m) {
      var pctSeen = m.total ? Math.round(m.seen / m.total * 100) : 0;
      html +=
        '<div class="setrow" data-material="' + esc(m.material) + '" style="cursor:pointer">' +
          '<div class="doc">📄</div>' +
          '<div class="info">' +
            '<div class="name">' + esc(m.material) + "</div>" +
            '<div class="nums">' + m.seen + "/" + m.total + " answered · " + m.mastered + " mastered</div>" +
            '<div class="bar mt8"><i style="width:' + pctSeen + '%"></i></div>' +
          "</div>" +
          accuracyChip(m.accuracy) +
        "</div>";
    });
    html += "</div>";

    // Weak topics
    var weak = Stats.weakTopics(3, 0.6);
    if (weak.length) {
      html += '<div class="section-title">Focus areas 🔍</div><div class="card"><div class="weaklist">';
      weak.forEach(function (w) {
        html += '<span class="chip bad">' + esc(Stats.shortSubject(w.subject)) + " · " + esc(w.topic) + " — " + Math.round(w.accuracy * 100) + "%</span>";
      });
      html += '</div><p class="muted mt8">These are your lowest topics (min. 3 attempts). Drill them until they turn green.</p></div>';
    }

    // Recent sessions
    var recent = App.state.sessions.slice(-4).reverse();
    if (recent.length) {
      html += '<div class="section-title">Recent activity</div><div class="card">';
      recent.forEach(function (s) {
        var pct = s.answered ? Math.round(s.correct / s.answered * 100) : 0;
        html +=
          '<div class="sessionrow">' +
            '<span class="when">' + esc(Stats.fmtWhen(s.date)) + "</span>" +
            '<span class="what">' + (s.setLabel || s.mode) + " · " + esc(s.set) + "</span>" +
            accuracyChip(pct) +
          "</div>";
      });
      html += "</div>";
    }

    main.innerHTML = html;

    document.getElementById("qk-practice").onclick = function () {
      Quiz.startSession({ mode: "practice", material: null, count: 10 });
      go("quiz");
    };
    document.getElementById("qk-exam").onclick = function () { go("exam"); };
    document.getElementById("qk-drill").onclick = function () { go("drill"); };
    document.getElementById("qk-tips").onclick = function () { go("tips"); };
    main.querySelectorAll(".setrow").forEach(function (row) {
      row.onclick = function () {
        App.uiState.practiceSel = row.getAttribute("data-material");
        go("practice");
      };
    });
  }

  /* ══════════════════════════ PRACTICE SETUP ═════════════════ */
  function renderPracticeSetup(main) {
    if (!Q().length) { emptyBank(main); return; }
    var us = App.uiState;
    var sel = us.practiceSel; // null = All reviewers
    var counts = setCounts(sel);
    var countOpts = [10, 20, 0]; // 0 = all
    var effCount = us.practiceCount === 0 ? counts.total : Math.min(us.practiceCount, counts.total);

    var html = "<h2 style='font-size:1.2rem;margin:6px 2px 14px'>Practice mode ⚡</h2>" +
      '<p class="muted" style="margin:-8px 2px 16px">Instant feedback and explanations after every question. Stats update as you go.</p>';

    html += '<div class="setlist" id="setlist">';
    materialList(true).forEach(function (m) {
      var name = m === null ? "All reviewers (mixed)" : m;
      var c = setCounts(m);
      var isSel = (sel === m);
      html +=
        '<button class="setcard' + (isSel ? " selected" : "") + '" data-m="' + (m === null ? "" : esc(m)) + '">' +
          '<div class="doc">📚</div>' +
          '<div class="meta">' +
            '<div class="name">' + esc(name) + "</div>" +
            '<div class="sub"><span>' + c.total + ' questions</span><span>' + c.unseen + " untouched</span></div>" +
            '<div class="bar"><i style="width:' + (c.total ? Math.round((c.total - c.unseen) / c.total * 100) : 0) + '%"></i></div>' +
          "</div>" +
          '<div class="tick" aria-hidden="true">✓</div>' +
        "</button>";
    });
    html += "</div>";

    html +=
      '<div class="card mt16">' +
        '<div class="formrow" style="border:none;padding-top:0">' +
          "<div><div class='lab'>Questions</div><div class='hint'>" + effCount + " will be served (shuffled)</div></div>" +
          '<div class="seg" id="countseg">' +
            countOpts.map(function (n) {
              return "<button data-n='" + n + "' class='" + (us.practiceCount === n ? "on" : "") + "'>" + (n === 0 ? "All" : n) + "</button>";
            }).join("") +
          "</div>" +
        "</div>" +
        '<button class="btn btn-primary btn-lg btn-block" id="startbtn">Start practice — ' + effCount + " questions</button>" +
      "</div>";

    main.innerHTML = html;

    main.querySelectorAll(".setcard").forEach(function (card) {
      card.onclick = function () {
        us.practiceSel = card.getAttribute("data-m") || null;
        renderPracticeSetup(main);
      };
    });
    main.querySelectorAll("#countseg button").forEach(function (b) {
      b.onclick = function () {
        us.practiceCount = parseInt(b.getAttribute("data-n"), 10);
        renderPracticeSetup(main);
      };
    });
    document.getElementById("startbtn").onclick = function () {
      var r = Quiz.startSession({ mode: "practice", material: us.practiceSel, count: us.practiceCount || 0 });
      if (!r.ok) { UI.toast("No questions available for that selection."); return; }
      go("quiz");
    };
  }

  /* ══════════════════════════ EXAM SETUP ═════════════════════ */
  function renderExamSetup(main) {
    if (!Q().length) { emptyBank(main); return; }
    var us = App.uiState;
    var sel = us.examSel;
    var counts = setCounts(sel);
    var maxN = counts.total;
    var countOpts = [30, 60, 90].filter(function (n) { return n <= maxN; });
    if (!countOpts.length) countOpts = [maxN];
    if (us.examCount > maxN) us.examCount = countOpts[countOpts.length - 1];
    var effCount = Math.min(us.examCount, maxN);
    var defaultMin = Math.ceil(effCount * 1.5);
    if (us.examMin == null || us.examMinFor !== effCount) { us.examMin = defaultMin; us.examMinFor = effCount; }

    var html = "<h2 style='font-size:1.2rem;margin:6px 2px 14px'>Mock exam mode ⏱️</h2>" +
      '<p class="muted" style="margin:-8px 2px 16px">A simulation of the real thing — the timer runs, feedback is hidden until you submit, and every question gets reviewed at the end. The CPA board passing mark is 75%.</p>';

    html += '<div class="setlist" id="setlist">';
    materialList(true).forEach(function (m) {
      var name = m === null ? "All reviewers (mixed)" : m;
      var c = setCounts(m);
      html +=
        '<button class="setcard' + (sel === m ? " selected" : "") + '" data-m="' + (m === null ? "" : esc(m)) + '">' +
          '<div class="doc">📄</div>' +
          '<div class="meta"><div class="name">' + esc(name) + "</div>" +
          '<div class="sub"><span>' + c.total + " questions available</span></div></div>" +
          '<div class="tick" aria-hidden="true">✓</div>' +
        "</button>";
    });
    html += "</div>";

    html += '<div class="card mt16">' +
      '<div class="formrow"><div><div class="lab">Number of questions</div></div>' +
        '<div class="seg" id="examcount">' +
          countOpts.map(function (n) { return "<button data-n='" + n + "' class='" + (us.examCount === n ? "on" : "") + "'>" + n + "</button>"; }).join("") +
        "</div></div>" +
      '<div class="formrow"><div><div class="lab">Time limit (minutes)</div><div class="hint">The real board allows about 1.5 minutes per question</div></div>' +
        '<input type="number" min="1" max="600" class="numinput" id="exammin" value="' + us.examMin + '">' +
      "</div>" +
      '<button class="btn btn-primary btn-lg btn-block" id="startexam">Start exam — ' + effCount + " Q · " + us.examMin + " min</button>" +
      '<p class="muted mt8" style="text-align:center">You can pause by leaving the page — the clock keeps running, just like the real thing.</p>' +
    "</div>";

    main.innerHTML = html;

    main.querySelectorAll(".setcard").forEach(function (card) {
      card.onclick = function () {
        us.examSel = card.getAttribute("data-m") || null;
        us.examMin = null;
        renderExamSetup(main);
      };
    });
    main.querySelectorAll("#examcount button").forEach(function (b) {
      b.onclick = function () {
        us.examCount = parseInt(b.getAttribute("data-n"), 10);
        us.examMin = null;
        renderExamSetup(main);
      };
    });
    document.getElementById("exammin").oninput = function () {
      var v = parseInt(this.value, 10);
      if (v > 0) us.examMin = v;
      var btn = document.getElementById("startexam");
      if (btn) btn.textContent = "Start exam — " + effCount + " Q · " + (us.examMin || defaultMin) + " min";
    };
    document.getElementById("startexam").onclick = function () {
      var min = parseInt(document.getElementById("exammin").value, 10) || Math.ceil(effCount * 1.5);
      var r = Quiz.startSession({ mode: "exam", material: us.examSel, count: us.examCount, minutes: min });
      if (!r.ok) { UI.toast("No questions available for that selection."); return; }
      go("quiz");
    };
  }

  /* ══════════════════════════ DRILL INTRO ════════════════════ */
  function renderDrillIntro(main) {
    if (!Q().length) { emptyBank(main); return; }
    var pool = Stats.drillPool();
    var mastered = Stats.overall().mastered;

    var html = "<h2 style='font-size:1.2rem;margin:6px 2px 14px'>Missed-questions drill 🎯</h2>";
    if (!pool.length) {
      html += '<div class="card"><div class="empty"><div class="big">🎉</div>' +
        "<p><b>" + (mastered ? "Everything you've seen is mastered!" : "Nothing to drill yet.") + "</b></p>" +
        '<p class="muted mt8">' + (mastered ? "Answer more questions and anything you miss will land here." : "Answer some questions first — every one you get wrong (or fail to master) joins the drill pool.") + "</p>" +
        '<div class="mt16"><button class="btn btn-primary" onclick="location.hash=\'#/practice\'">Go practice</button></div>' +
        "</div></div>";
      main.innerHTML = html;
      return;
    }

    html += '<div class="card">' +
      "<p><b>" + pool.length + " question" + (pool.length > 1 ? "s" : "") + "</b> waiting in the drill pool.</p>" +
      '<p class="muted mt8">How it works:</p>' +
      '<ul style="padding-left:20px;margin-top:6px;font-size:.88rem">' +
        "<li style='margin-bottom:5px'>Every question you answer wrong joins this pool automatically.</li>" +
        "<li style='margin-bottom:5px'>Answer one right <b>twice in a row</b> and it's declared mastered — it leaves the pool. 🏆</li>" +
        "<li>A wrong answer resets its streak and it stays until conquered.</li>" +
      "</ul>" +
      '<button class="btn btn-primary btn-lg btn-block mt16" id="startdrill">Start drilling (' + pool.length + ")</button>" +
      "</div>";
    main.innerHTML = html;
    document.getElementById("startdrill").onclick = function () {
      Quiz.startSession({ mode: "drill" });
      go("quiz");
    };
  }

  /* ══════════════════════════ QUIZ (all modes) ════════════════ */
  function Q() { return window.QUESTION_BANK || []; }

  function renderQuiz(main) {
    var s = App.session;
    if (!s) { go("dashboard"); return; }

    // Deadline check on every render — robust even if the browser throttled
    // the countdown interval while the tab was in the background.
    if (s.mode === "exam" && s.endsAt && !s.finished && Date.now() >= s.endsAt) {
      UI.toast("⏰ Time's up!");
      Quiz.finish(true);
      go("results");
      return;
    }

    var q = Quiz.currentQuestion();
    if (!q) { go("dashboard"); return; }

    var i = s.index, n = s.qids.length;
    var modeLabel = s.mode === "exam" ? "Mock exam" : s.mode === "drill" ? "Drill" : "Practice";
    var setName = s.material || "All reviewers";

    var head =
      '<div class="quizhead">' +
        "<div><div class='mode'>" + modeLabel + "</div><div class='setname'>" + esc(setName) + "</div></div>" +
        (s.mode === "exam" ? '<span class="timer" id="timer">--:--</span>' : "") +
        '<span class="progress-label">' + (i + 1) + " / " + n + "</span>" +
      "</div>";

    var progressPct = Math.round(((s.mode === "exam" ? i : i + 1) / n) * 100);
    head += '<div class="bar" style="margin-bottom:6px"><i style="width:' + progressPct + '%"></i></div>';

    var revealed = !!s.revealed[q.id];
    var chosen = s.answers[q.id];

    var body =
      '<div class="card">' +
        '<div style="display:flex;gap:6px;flex-wrap:wrap">' +
          '<span class="chip subject">' + esc(Stats.shortSubject(q.subject)) + "</span>" +
          '<span class="chip topic">' + esc(q.topic || "") + "</span>" +
          (s.mode === "exam" ? '<button class="flagbtn' + (s.flags[q.id] ? " on" : "") + '" id="flagbtn" title="Flag for review (F)">' + (s.flags[q.id] ? "⚑ Flagged" : "⚐ Flag") + "</button>" : "") +
        "</div>" +
        '<div class="qtext">' + esc(q.question) + "</div>" +
        '<div class="choices">' +
          q.choices.map(function (c, idx) {
            var cls = "choice";
            var letter = "ABCD"[idx] || String(idx + 1);
            if (s.mode === "exam") {
              if (chosen === idx) cls += " selected";
            } else if (revealed) {
              if (idx === q.answer) cls += " correct";
              else if (chosen === idx) cls += " wrong";
              else cls += " dim";
            }
            return '<button class="' + cls + '" data-idx="' + idx + '"' + (revealed && s.mode !== "exam" ? " disabled" : "") + ">" +
              '<span class="letter">' + letter + "</span><span>" + esc(c) + "</span></button>";
          }).join("") +
        "</div>";

    if (revealed && s.mode !== "exam") {
      var ok = chosen === q.answer;
      body +=
        '<div class="explain ' + (ok ? "ok" : "no") + '"><b>' +
        (ok ? "✅ Correct!" : "❌ Not quite — the answer is " + "ABCD"[q.answer]) +
        "</b>" + esc(q.explanation || "No explanation recorded for this question.") + "</div>";
    }
    body += "</div>";

    var foot = '<div class="quizfoot">';
    if (s.mode === "exam") {
      foot += '<button class="btn btn-ghost" id="goback" style="flex:0 0 auto"' + (i === 0 ? " disabled" : "") + ">←</button>";
      if (!Quiz.isLast()) {
        foot += '<button class="btn btn-primary" id="gonext">Next →</button>';
      } else {
        foot += '<button class="btn btn-primary" id="submit1">Submit exam</button>';
      }
      foot += '<button class="btn btn-danger" id="submit2" style="flex:0 0 auto">Submit</button>';
    } else {
      if (!revealed) {
        foot += '<button class="btn btn-ghost" id="endearly" style="flex:0 0 auto">End</button>';
        foot += '<span class="muted" style="align-self:center;font-size:.78rem">Pick an answer to continue</span>';
      } else if (!Quiz.isLast()) {
        foot += '<button class="btn btn-primary" id="gonext">Next →</button>';
      } else {
        foot += '<button class="btn btn-primary" id="finishpractice">Finish</button>';
      }
    }
    foot += "</div>";

    var grid = "";
    if (s.mode === "exam" && App.uiState.showGrid) {
      grid = '<div class="card mt8"><b style="font-size:.85rem">Jump to question</b><div class="qgrid">' +
        s.qids.map(function (qid, k) {
          var cls = [];
          if (s.answers[qid] != null) cls.push("answered");
          if (k === i) cls.push("current");
          if (s.flags[qid]) cls.push("flagged");
          return "<button data-k='" + k + "' class='" + cls.join(" ") + "'>" + (k + 1) + "</button>";
        }).join("") + "</div></div>";
    }

    var examBar = "";
    if (s.mode === "exam") {
      examBar = '<div class="row mt8" style="justify-content:space-between">' +
        '<button class="btn btn-soft" id="togglegrid" style="padding:8px 14px;font-size:.8rem">' + (App.uiState.showGrid ? "Hide question grid" : "Show question grid") + "</button>" +
        '<span class="muted tabular" id="answeredct">' + Quiz.answeredCount() + " of " + n + " answered</span>" +
        "</div>";
    }

    var exitBtn =
      '<div style="margin-top:14px;text-align:center">' +
      '<button class="btn btn-ghost" id="exitquiz" style="font-size:.78rem;padding:7px 14px">' +
      (s.mode === "exam" ? "Abandon exam" : "Exit to dashboard") + "</button></div>";

    main.innerHTML = head + body + foot + examBar + grid + exitBtn;

    /* Wiring */
    var isExam = s.mode === "exam";

    main.querySelectorAll(".choice").forEach(function (b) {
      b.onclick = function () {
        var idx = parseInt(b.getAttribute("data-idx"), 10);
        if (isExam) {
          Quiz.selectExamAnswer(idx);
          renderQuiz(main);
        } else if (!s.revealed[q.id]) {
          Quiz.answerReveal(idx);
          renderQuiz(main);
        }
      };
    });

    var gn = document.getElementById("gonext");
    if (gn) gn.onclick = function () { Quiz.next(); renderQuiz(main); };
    var gb = document.getElementById("goback");
    if (gb) gb.onclick = function () { Quiz.prev(); renderQuiz(main); };
    var ee = document.getElementById("endearly");
    if (ee) ee.onclick = asyncExitPractice;
    var fp = document.getElementById("finishpractice");
    if (fp) fp.onclick = function () { Quiz.finish(false); go("summary"); };

    var fl = document.getElementById("flagbtn");
    if (fl) fl.onclick = function () { Quiz.toggleFlag(); renderQuiz(main); };
    var tg = document.getElementById("togglegrid");
    if (tg) tg.onclick = function () { App.uiState.showGrid = !App.uiState.showGrid; renderQuiz(main); };
    main.querySelectorAll(".qgrid button").forEach(function (b) {
      b.onclick = function () { Quiz.goto(parseInt(b.getAttribute("data-k"), 10)); renderQuiz(main); };
    });

    async function asyncExitPractice() {
      var ok = await UI.confirmModal({
        title: "End this session?",
        body: "Your answers so far are saved to your stats — you can pick it up again anytime.",
        okText: "End session"
      });
      if (ok) { Quiz.exit(); go("dashboard"); }
    }

    var doSubmit = async function () {
      var unanswered = n - Quiz.answeredCount();
      var ok = true;
      if (unanswered > 0) {
        ok = await UI.confirmModal({
          title: unanswered + " question" + (unanswered > 1 ? "s" : "") + " unanswered",
          body: "There's no penalty for wrong answers in the board exam — an unanswered question is a certain zero. Submit anyway?",
          okText: "Submit anyway", cancelText: "Go back"
        });
      }
      if (ok) { Quiz.finish(true); go("results"); }
    };
    ["submit1", "submit2"].forEach(function (id) {
      var b = document.getElementById(id);
      if (b) b.onclick = doSubmit;
    });

    document.getElementById("exitquiz").onclick = async function () {
      var ok = await UI.confirmModal({
        title: isExam ? "Abandon this exam?" : "Exit practice?",
        body: isExam
          ? "An abandoned exam is not recorded in your stats, and the timer does not pause. Are you sure?"
          : "Answers you've given so far are already saved to your stats.",
        okText: isExam ? "Abandon" : "Exit",
        danger: isExam
      });
      if (ok) { Quiz.exit(); go("dashboard"); }
    };

    /* Exam timer */
    if (isExam) {
      var timerEl = document.getElementById("timer");
      function tick() {
        var ms = Quiz.timeLeftMs();
        if (ms == null) return;
        if (ms <= 0) {
          UI.toast("⏰ Time's up!");
          Quiz.finish(true);
          go("results");
          return;
        }
        var sec = Math.floor(ms / 1000);
        var mm = String(Math.floor(sec / 60)).padStart(2, "0");
        var ss = String(sec % 60).padStart(2, "0");
        timerEl.textContent = "⏱ " + mm + ":" + ss;
        timerEl.classList.toggle("warn", ms < 60000);
      }
      tick();
      viewTimers.push(setInterval(tick, 1000));
    }
  }

  /* ══════════════════════════ RESULTS (exam) ══════════════════ */
  function renderResults(main) {
    var s = App.session;
    if (!s) { go("dashboard"); return; }
    var g = Quiz.grade();
    var passed = g.pct >= 75;
    var usedSec = Math.round((Math.min(Date.now(), s.endsAt || Date.now()) - s.startedAt) / 1000);

    var html =
      '<div class="card scorewrap">' +
        UI.scoreRing(g.pct, passed ? "--success" : "--danger") +
        '<div class="verdict ' + (passed ? "pass" : "fail") + '">' + (passed ? "Above the 75% passing mark 🎉" : "Below 75% — keep going 💪") + "</div>" +
        '<div class="scoremeta">' + g.correct + " of " + g.total + " correct · " + esc(s.material || "All reviewers") + " · " + Stats.fmtDuration(usedSec) + " used</div>" +
        '<div class="row mt16" style="justify-content:center;gap:10px">' +
          '<button class="btn btn-primary" id="reviewbtn">Review answers</button>' +
          '<button class="btn btn-ghost" id="homebtn">Done</button>' +
        "</div>" +
      "</div>";

    // Per-subject breakdown
    var subs = Object.keys(g.bySubject).sort(function (a, b) { return g.bySubject[a].pct - g.bySubject[b].pct; });
    html += '<div class="section-title">Per-subject breakdown</div><div class="card">';
    subs.forEach(function (k) {
      var r = g.bySubject[k];
      var colorCls = r.pct >= 75 ? "success" : r.pct >= 60 ? "" : "danger";
      html +=
        '<div class="subjrow">' +
          '<span class="nm">' + esc(Stats.shortSubject(r.subject)) + "</span>" +
          '<span class="bar ' + colorCls + '"><i style="width:' + r.pct + '%"></i></span>' +
          '<span class="pc">' + r.correct + "/" + r.total + " · " + r.pct + "%</span>" +
        "</div>";
    });
    html += "</div>";

    // Review list
    if (App.uiState.reviewMode) {
      html += '<div class="section-title">Answer review</div>';
      s.qids.forEach(function (qid, k) {
        var q = Stats.qById(qid);
        if (!q) return;
        var chosen = s.answers[qid];
        var ok = chosen === q.answer;
        html += '<div class="card reviewitem">' +
          '<div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">' +
            '<span class="chip">' + (k + 1) + "</span>" +
            '<span class="chip subject">' + esc(Stats.shortSubject(q.subject)) + "</span>" +
            '<span class="chip ' + (ok ? "good" : "bad") + '">' + (ok ? "✓ Correct" : chosen == null ? "— Unanswered" : "✗ You chose " + "ABCD"[chosen]) + "</span>" +
          "</div>" +
          '<div class="qtext">' + esc(q.question) + "</div>" +
          '<div class="choices">' +
            q.choices.map(function (c, idx) {
              var cls = "choice";
              if (idx === q.answer) cls += " correct";
              else if (chosen === idx) cls += " wrong";
              else cls += " dim";
              return '<button class="' + cls + '" disabled><span class="letter">' + "ABCD"[idx] + "</span><span>" + esc(c) + "</span></button>";
            }).join("") +
          "</div>" +
          (q.explanation ? '<div class="explain ' + (ok ? "ok" : "no") + '"><b>' + (ok ? "Why this is right" : "Correct answer: " + "ABCD"[q.answer]) + "</b>" + esc(q.explanation) + "</div>" : "") +
        "</div>";
      });
    }

    main.innerHTML = html;
    document.getElementById("reviewbtn").onclick = function () {
      App.uiState.reviewMode = !App.uiState.reviewMode;
      renderResults(main);
      document.getElementById("reviewbtn").textContent = App.uiState.reviewMode ? "Hide review" : "Review answers";
    };
    document.getElementById("homebtn").onclick = function () {
      Quiz.exit(); // clears the finished session
      go("dashboard");
    };
  }

  /* ══════════════════════════ SUMMARY (practice/drill) ═════════ */
  function renderSummary(main) {
    var s = App.session;
    if (!s) { go("dashboard"); return; }
    var g = Quiz.grade();
    var answered = s.qids.filter(function (id) { return s.answers[id] != null; }).length;
    var remainingDrill = Stats.drillPool().length;

    var html =
      '<div class="card scorewrap">' +
        UI.scoreRing(g.pct, g.pct >= 75 ? "--success" : "--primary") +
        '<div class="verdict">' + (s.mode === "drill" ? "Drill complete" : "Session complete") + "</div>" +
        '<div class="scoremeta">' + g.correct + " of " + answered + " answered correctly · " + esc(s.material || "All reviewers") + "</div>" +
        (remainingDrill ? '<div class="scoremeta">🎯 ' + remainingDrill + " still in the drill pool</div>" : '<div class="scoremeta">🎉 Drill pool is empty — everything mastered!</div>') +
        '<div class="row mt16" style="justify-content:center;gap:10px;flex-wrap:wrap">' +
          '<button class="btn btn-primary" id="againbtn">Again</button>' +
          (remainingDrill ? '<button class="btn btn-soft" id="drillbtn">Drill missed 🎯</button>' : "") +
          '<button class="btn btn-ghost" id="homebtn">Home</button>' +
        "</div>" +
      "</div>";
    main.innerHTML = html;

    document.getElementById("againbtn").onclick = function () {
      // startSession replaces the finished session with a fresh one
      var r = Quiz.startSession({ mode: s.mode, material: s.material, count: s.qids.length });
      if (r.ok) go("quiz"); else go("dashboard");
    };
    var db = document.getElementById("drillbtn");
    if (db) db.onclick = function () { App.session = null; Storage.saveSession(null); go("drill"); };
    document.getElementById("homebtn").onclick = function () {
      App.session = null; Storage.saveSession(null);
      go("dashboard");
    };
  }

  /* ══════════════════════════ STATS ═══════════════════════════ */
  function renderStats(main) {
    if (!Q().length) { emptyBank(main); return; }
    var ov = Stats.overall();
    var streak = Stats.streakInfo();
    var sessions = App.state.sessions;

    var html =
      '<div class="tiles">' +
        '<div class="tile"><div class="v">' + ov.seen + '<span class="muted" style="font-size:.8rem">/' + ov.total + "</span></div><div class='l'>Questions answered</div></div>" +
        '<div class="tile"><div class="v">' + ov.mastered + "</div><div class='l'>Mastered 🏆</div></div>" +
        '<div class="tile"><div class="v">' + (ov.accuracy == null ? "—" : ov.accuracy + "%") + "</div><div class='l'>Overall accuracy</div></div>" +
        '<div class="tile"><div class="v">' + sessions.length + "</div><div class='l'>Sessions</div></div>" +
        '<div class="tile"><div class="v">' + Stats.fmtDuration(ov.studyTimeSec) + "</div><div class='l'>Time studied</div></div>" +
        '<div class="tile"><div class="v">🔥 ' + streak.current + "</div><div class='l'>Best: " + streak.best + " days</div></div>" +
      "</div>";

    // Trend chart
    var pts = sessions.slice(-20).filter(function (s) { return s.answered > 0; }).map(function (s, i) {
      return { label: "#" + (i + 1) + " " + Stats.fmtWhen(s.date), value: Math.round(s.correct / s.answered * 100) };
    });
    html += '<div class="section-title">Score trend</div><div class="card">' + UI.lineChart(pts) + "</div>";

    // Consistency
    html += '<div class="section-title">Consistency — last 8 weeks</div><div class="card">' + UI.heatmap() +
      '<p class="muted mt8">🔥 ' + streak.daysStudied + " day" + (streak.daysStudied === 1 ? "" : "s") + " studied so far. Consistency beats cramming — a little every day compounds fast.</p></div>";

    // Per reviewer
    html += '<div class="section-title">Per reviewer</div><div class="card">';
    Stats.materialSummary().forEach(function (m) {
      var pctSeen = m.total ? Math.round(m.seen / m.total * 100) : 0;
      html +=
        '<div class="setrow"><div class="doc">📄</div>' +
        '<div class="info"><div class="name">' + esc(m.material) + "</div>" +
        '<div class="nums">' + m.seen + "/" + m.total + " answered · " + m.mastered + " mastered</div>" +
        '<div class="bar mt8"><i style="width:' + pctSeen + '%"></i></div></div>' +
        accuracyChip(m.accuracy) + "</div>";
    });
    html += "</div>";

    // Per subject
    html += '<div class="section-title">Per subject</div><div class="card">';
    Stats.subjectSummary().forEach(function (r) {
      var pct = r.accuracy;
      var colorCls = pct == null ? "" : pct >= 75 ? "success" : pct >= 60 ? "" : "danger";
      html +=
        '<div class="subjrow">' +
          '<span class="nm" title="' + esc(r.subject) + '">' + esc(Stats.shortSubject(r.subject)) + "</span>" +
          '<span class="bar ' + colorCls + '"><i style="width:' + (pct || 0) + '%"></i></span>' +
          '<span class="pc">' + r.correct + "/" + r.attempts + (pct == null ? "" : " · " + pct + "%") + "</span>" +
        "</div>";
    });
    html += "</div>";

    // Session log
    if (sessions.length) {
      html += '<div class="section-title">Session log</div><div class="card">';
      sessions.slice(-12).reverse().forEach(function (s) {
        var pct = s.answered ? Math.round(s.correct / s.answered * 100) : 0;
        html +=
          '<div class="sessionrow">' +
            '<span class="when">' + esc(Stats.fmtWhen(s.date)) + "</span>" +
            '<span class="what">' + (s.setLabel || s.mode) + " · " + esc(s.set) + " · " + s.correct + "/" + s.answered + "</span>" +
            accuracyChip(pct) +
          "</div>";
      });
      html += "</div>";
    }

    main.innerHTML = html;
  }

  /* ══════════════════════════ TIPS ════════════════════════════ */
  function renderTips(main) {
    var tips = [
      {
        icon: "🎯", title: "Use this app the smart way",
        body: "<ul>" +
          "<li><b>Daily Quick 10</b> keeps your streak alive — small daily reps beat weekend marathons.</li>" +
          "<li><b>Drill missed questions</b> until mastered. This is spaced repetition: the app re-serves exactly what your brain is about to forget.</li>" +
          "<li><b>One mock exam per week</b> under the timer. Train the clock as much as the content.</li>" +
          "<li>Read the <b>explanations even when you're right</b> — confirming why an answer is correct solidifies it.</li>" +
        "</ul>"
      },
      {
        icon: "🧠", title: "Study techniques that actually work",
        body: "<ul>" +
          "<li><b>Active recall</b> (answering questions) is proven far more effective than re-reading notes. This whole app is active recall.</li>" +
          "<li><b>Interleaving:</b> mixing subjects in one session (the mixed reviewer option) feels harder but builds stronger recall than blocking one subject.</li>" +
          "<li><b>Explain it out loud:</b> if you can teach a concept simply, you own it. Stuck? Mark it, drill it, explain it again tomorrow.</li>" +
          "<li>When you guess correctly by luck, treat it as <b>wrong</b> — your memory of 'I knew that' is a liar. (Check the explanation to be sure!)</li>" +
        "</ul>"
      },
      {
        icon: "⏱️", title: "Mock exam strategy",
        body: "<ul>" +
          "<li>The board passing mark is a <b>75% general weighted average</b> with no subject below 65%. Aim to comfortably clear 80% in mocks so exam-day pressure still lands you above 75%.</li>" +
          "<li>Budget ~<b>1.5 minutes per question</b>. Answer easy ones first, flag the rest, and return. One flagged question costs seconds; one overthought question costs minutes.</li>" +
          "<li><b>No negative marking</b> — never leave anything blank. When time runs low, fill everything in.</li>" +
          "<li>Change answers only with a concrete reason. First instincts are right more often than panic revisions.</li>" +
        "</ul>"
      },
      {
        icon: "🗓️", title: "Final two weeks",
        body: "<ul>" +
          "<li>Shift from learning new material to <b>drilling weak topics</b> and re-reading your mistake patterns (the Focus areas list on your dashboard).</li>" +
          "<li>Take your last full mock 3–5 days before the exam, then taper. Cramming the night before adds anxiety, not points.</li>" +
          "<li>Prepare logistics early: valid ID, notice of admission, allowed calculator, dress code, venue route. Brain space saved = points saved.</li>" +
        "</ul>"
      },
      {
        icon: "😴", title: "Your brain is part of your study plan",
        body: "<ul>" +
          "<li><b>Sleep is when memory consolidates.</b> An all-nighter before the exam can erase the day's studying. 7–8 hours is a study tool, not a luxury.</li>" +
          "<li>Study in <b>25–50 minute blocks</b> with short breaks; attention fades hard after an hour.</li>" +
          "<li>On anxiety: slow breathing (4 seconds in, 6 out) before and during the exam lowers heart rate and clears working memory.</li>" +
          "<li>Eat before the exam, hydrate, and keep a small snack for breaks. Glucose is fuel for recall.</li>" +
        "</ul>"
      }
    ];

    var html = "<h2 style='font-size:1.2rem;margin:6px 2px 14px'>Study tips 💡</h2>";
    tips.forEach(function (t) {
      html += '<div class="card tipcard"><h3><span>' + t.icon + "</span>" + t.title + "</h3>" + t.body + "</div>";
    });
    html += '<div class="card"><p class="muted" style="text-align:center">You\'ve got this. One question at a time. 🌟</p></div>';
    main.innerHTML = html;
  }

  /* ══════════════════════════ SETTINGS ════════════════════════ */
  function renderSettings(main) {
    var ov = Stats.overall();
    var mats = Stats.materialSummary();

    var html = "<h2 style='font-size:1.2rem;margin:6px 2px 14px'>Settings ⚙️</h2>";

    html += '<div class="card">' +
      '<div class="formrow"><div><div class="lab">Appearance</div><div class="hint">System follows your phone\'s setting</div></div>' +
        '<div class="seg" id="themeseg">' +
          ["system", "light", "dark"].map(function (t) {
            return "<button data-t='" + t + "' class='" + (App.state.settings.theme === t ? "on" : "") + "'>" + t[0].toUpperCase() + t.slice(1) + "</button>";
          }).join("") +
        "</div></div>" +
      '<div class="formrow"><div><div class="lab">Export progress</div><div class="hint">Saves all stats, streaks and history to a file — use it to move progress to another phone/laptop, or as a backup before clearing browser data.</div></div>' +
        '<button class="btn btn-soft" id="exportbtn">⬇ Export</button></div>' +
      '<div class="formrow"><div><div class="lab">Import progress</div><div class="hint">Restore from a backup file. This replaces current progress on this device.</div></div>' +
        '<label class="btn btn-ghost" for="importfile" style="cursor:pointer">⬆ Import</label>' +
        '<input type="file" id="importfile" accept="application/json,.json" style="display:none">' +
      "</div>" +
      '<div class="formrow"><div><div class="lab">Reset all progress</div><div class="hint">Wipes stats, streaks and history on this device. The question bank is untouched.</div></div>' +
        '<button class="btn btn-danger" id="resetbtn">Reset</button></div>' +
      "</div>";

    html += '<div class="section-title">Question bank</div><div class="card">' +
      '<div class="formrow"><div class="lab">Questions loaded</div><span class="chip primary">' + ov.total + "</span></div>" +
      '<div class="formrow"><div class="lab">Reviewers</div><span class="chip primary">' + mats.length + "</span></div>" +
      mats.forEach(function (m) {
        html += '<div class="formrow"><div class="lab" style="font-weight:600;font-size:.82rem">' + esc(m.material) + '</div><span class="chip">' + m.total + " Q</span></div>";
      }) +
      '<p class="muted mt8">New reviewers appear automatically whenever <code>data/questions.js</code> is updated. If you don\'t see new questions, refresh the page twice (the app keeps an offline copy for you).</p>' +
      "</div>";

    html += '<div class="card"><p class="muted">CPA Review Hub · progress lives privately in this browser on this device — nothing is sent to any server. Export regularly!</p></div>';

    main.innerHTML = html;

    main.querySelectorAll("#themeseg button").forEach(function (b) {
      b.onclick = function () {
        App.state.settings.theme = b.getAttribute("data-t");
        Storage.saveState();
        applyTheme();
        renderSettings(main);
      };
    });
    document.getElementById("exportbtn").onclick = function () {
      Storage.exportProgress();
      UI.toast("Backup downloaded ✅");
    };
    document.getElementById("importfile").onchange = function () {
      var f = this.files[0];
      if (!f) return;
      var reader = new FileReader();
      var self = this;
      reader.onload = async function () {
        try {
          Storage.importProgress(reader.result);
          applyTheme();
          UI.toast("Progress restored ✅");
          renderSettings(main);
        } catch (e) {
          await UI.confirmModal({ title: "Import failed", body: String(e.message || e), okText: "OK", cancelText: "Close" });
        }
        self.value = "";
      };
      reader.readAsText(f);
    };
    document.getElementById("resetbtn").onclick = async function () {
      var ok = await UI.confirmModal({
        title: "Reset everything?",
        body: "All stats, streaks and history will be permanently wiped from this device. Consider exporting a backup first.",
        okText: "Wipe progress", danger: true
      });
      if (ok) {
        Storage.resetAll();
        applyTheme();
        UI.toast("Progress reset");
        go("dashboard");
      }
    };
  }

  /* ══════════════════════════ KEYBOARD ════════════════════════ */
  document.addEventListener("keydown", function (e) {
    if (document.querySelector(".modal-overlay")) return;
    var t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT")) return;
    var r = currentRoute();
    if (r !== "quiz") return;
    var s = App.session;
    if (!s || s.finished) return;
    var q = Quiz.currentQuestion();
    if (!q) return;

    var k = e.key.toLowerCase();
    var idx = -1;
    if (k >= "1" && k <= "4") idx = parseInt(k, 10) - 1;
    if (k >= "a" && k <= "d") idx = k.charCodeAt(0) - 97;
    if (idx >= 0 && idx < q.choices.length) {
      var btn = document.querySelector('.choice[data-idx="' + idx + '"]');
      if (btn && !btn.disabled) btn.click();
      e.preventDefault();
      return;
    }
    if (k === "enter" || k === "arrowright") {
      var nextBtn = document.getElementById("gonext") || document.getElementById("finishpractice") || document.getElementById("submit1");
      if (nextBtn) { nextBtn.click(); e.preventDefault(); }
    }
    if (k === "arrowleft") {
      var pb = document.getElementById("goback");
      if (pb) { pb.click(); e.preventDefault(); }
    }
    if (k === "f" && s.mode === "exam") { Quiz.toggleFlag(); route(); e.preventDefault(); }
  });

  /* ══════════════════════════ WAKE-UP CHECK ═══════════════════ */
  // If the phone locked / tab backgrounded through the exam deadline,
  // submit the moment the app becomes visible again.
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState !== "visible") return;
    var s = App.session;
    if (!s || s.finished) return;
    if (currentRoute() !== "quiz") return;
    if (s.mode === "exam" && s.endsAt && Date.now() >= s.endsAt) {
      UI.toast("⏰ Time's up!");
      Quiz.finish(true);
      go("results");
    } else {
      route(); // refresh the timer display after sleep
    }
  });

  /* ══════════════════════════ BOOT ════════════════════════════ */
  function boot() {
    App.state = Storage.loadState();
    App.session = Storage.loadSession();

    // Drop session entries that reference questions no longer in the bank
    if (App.session) {
      App.session.qids = App.session.qids.filter(function (id) { return !!Stats.qById(id); });
      if (!App.session.qids.length) { App.session = null; Storage.saveSession(null); }
    }

    applyTheme();
    document.getElementById("theme-toggle").addEventListener("click", cycleTheme);
    window.addEventListener("hashchange", route);
    route();

    // Service worker (offline support) — only on http(s), not file://
    if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
      navigator.serviceWorker.register("sw.js").catch(function () { /* offline support is best-effort */ });
    }
  }

  App.Boot = { boot: boot, go: go, route: route, applyTheme: applyTheme };
  document.addEventListener("DOMContentLoaded", boot);
})(window.App);

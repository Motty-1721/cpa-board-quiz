/*
 * quiz.js — session engine for the three modes
 *   practice : instant feedback + explanation, stats recorded per answer
 *   exam     : timed, answers locked in until submit, full review after
 *   drill    : re-asks every question not yet "mastered" (2 straight correct)
 * The active session is persisted so a refresh (or accidental phone lock)
 * never loses progress — the exam timer keeps counting from its end time.
 */
window.App = window.App || {};

(function (App) {
  "use strict";

  var Q = function () { return window.QUESTION_BANK || []; };

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function poolFor(material) {
    return Q().filter(function (q) {
      return !material || (q.material || "Unsorted") === material;
    });
  }

  /* ── Start a session ────────────────────────────────────────── */
  // opts: { mode, material (null = all reviewers mixed), count, minutes }
  function startSession(opts) {
    var pool;
    if (opts.mode === "drill") {
      pool = App.Stats.drillPool();
      if (opts.material) pool = pool.filter(function (q) { return (q.material || "Unsorted") === opts.material; });
    } else {
      pool = poolFor(opts.material);
    }

    if (!pool.length) return { ok: false, reason: "empty" };

    var count = opts.count && opts.count > 0 ? Math.min(opts.count, pool.length) : pool.length;
    var picked = shuffle(pool).slice(0, count);

    var now = Date.now();
    App.session = {
      id: "q" + now,
      mode: opts.mode,
      material: opts.material || null,
      qids: picked.map(function (q) { return q.id; }),
      index: 0,
      answers: {},   // qid -> chosen index
      revealed: {},  // qid -> true once answered in practice/drill
      flags: {},     // qid -> bool (exam)
      startedAt: now,
      endsAt: opts.mode === "exam" ? now + (opts.minutes || Math.ceil(count * 1.5)) * 60000 : null,
      finished: false
    };
    App.Storage.saveSession(App.session);
    return { ok: true };
  }

  function currentQuestion() {
    if (!App.session) return null;
    return App.Stats.qById(App.session.qids[App.session.index]) || null;
  }

  function isLast() {
    return App.session && App.session.index >= App.session.qids.length - 1;
  }

  /* ── Answering ──────────────────────────────────────────────── */
  // Practice / drill: record immediately, reveal feedback
  function answerReveal(choiceIdx) {
    var s = App.session;
    if (!s || s.finished) return null;
    var q = currentQuestion();
    if (!q || s.revealed[q.id]) return null;
    s.answers[q.id] = choiceIdx;
    s.revealed[q.id] = true;
    var correct = choiceIdx === q.answer;
    App.Stats.recordAnswer(q.id, correct);
    App.Storage.saveSession(s);
    return { correct: correct, choice: choiceIdx };
  }

  // Exam: just store the selection (changeable until submit)
  function selectExamAnswer(choiceIdx) {
    var s = App.session;
    if (!s || s.finished || s.mode !== "exam") return;
    var q = currentQuestion();
    if (!q) return;
    s.answers[q.id] = choiceIdx;
    App.Storage.saveSession(s);
  }

  function toggleFlag() {
    var s = App.session;
    if (!s || s.mode !== "exam") return;
    var q = currentQuestion();
    if (!q) return;
    s.flags[q.id] = !s.flags[q.id];
    App.Storage.saveSession(s);
  }

  function goto(i) {
    var s = App.session;
    if (!s) return;
    s.index = Math.max(0, Math.min(s.qids.length - 1, i));
    App.Storage.saveSession(s);
  }
  function next() { goto(App.session.index + 1); }
  function prev() { goto(App.session.index - 1); }

  function answeredCount() {
    var s = App.session, n = 0;
    if (!s) return 0;
    s.qids.forEach(function (id) { if (s.answers[id] != null) n++; });
    return n;
  }

  /* ── Finishing ──────────────────────────────────────────────── */
  function grade() {
    var s = App.session, total = 0, correct = 0;
    var bySubject = {};
    s.qids.forEach(function (id) {
      var q = App.Stats.qById(id);
      if (!q) return;
      var sub = q.subject || "General";
      if (!bySubject[sub]) bySubject[sub] = { subject: sub, total: 0, correct: 0 };
      bySubject[sub].total++;
      total++;
      if (s.answers[id] === q.answer) { correct++; bySubject[sub].correct++; }
    });
    Object.keys(bySubject).forEach(function (k) {
      bySubject[k].pct = bySubject[k].total ? Math.round(bySubject[k].correct / bySubject[k].total * 100) : 0;
    });
    return { total: total, correct: correct, pct: total ? Math.round(correct / total * 100) : 0, bySubject: bySubject };
  }

  // Used by exam (grade + record every answer into stats) and by
  // practice/drill when the last question is passed
  function finish(recordAnswers) {
    var s = App.session;
    if (!s) return null;
    if (recordAnswers && !s.recorded) {
      s.qids.forEach(function (id) {
        if (s.answers[id] == null) return;
        var q = App.Stats.qById(id);
        if (q) App.Stats.recordAnswer(id, s.answers[id] === q.answer);
      });
      s.recorded = true;
    }
    var answered = answeredCount();
    var g = grade();
    if (answered > 0) {
      var label = s.mode === "exam" ? "Mock Exam" : s.mode === "drill" ? "Drill" : "Practice";
      App.Stats.addSession({
        mode: s.mode,
        set: s.material || "All reviewers",
        setLabel: label,
        total: s.qids.length,
        answered: answered,
        correct: g.correct,
        durationSec: Math.round((Date.now() - s.startedAt) / 1000)
      });
    }
    s.finished = true;
    App.Storage.saveSession(s);
    return g;
  }

  // Exit without recording (used when quitting a practice early we DO record —
  // so exit uses finish(false) which still logs the session if answers exist)
  function exit() {
    var s = App.session;
    if (s && !s.finished && s.mode !== "exam" && answeredCount() > 0) {
      finish(false);
    } else if (s && !s.finished && s.mode === "exam") {
      // Abandoning an exam: no session record, but already-answer recording
      // happens only at submit, so nothing else to do.
    }
    App.session = null;
    App.Storage.saveSession(null);
  }

  function timeLeftMs() {
    var s = App.session;
    if (!s || !s.endsAt) return null;
    return Math.max(0, s.endsAt - Date.now());
  }

  App.Quiz = {
    shuffle: shuffle,
    poolFor: poolFor,
    startSession: startSession,
    currentQuestion: currentQuestion,
    isLast: isLast,
    answerReveal: answerReveal,
    selectExamAnswer: selectExamAnswer,
    toggleFlag: toggleFlag,
    goto: goto,
    next: next,
    prev: prev,
    answeredCount: answeredCount,
    grade: grade,
    finish: finish,
    exit: exit,
    timeLeftMs: timeLeftMs
  };
})(window.App);

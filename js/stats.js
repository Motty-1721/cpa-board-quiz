/*
 * stats.js — progress tracking, streaks, and all aggregation math
 * A question becomes "mastered" after 2 consecutive correct answers;
 * a wrong answer resets its streak and drops it back into the drill pool.
 */
window.App = window.App || {};

(function (App) {
  "use strict";

  var MASTERY_STREAK = 2;

  function todayKey(ts) {
    var d = ts ? new Date(ts) : new Date();
    return d.getFullYear() + "-" +
      String(d.getMonth() + 1).padStart(2, "0") + "-" +
      String(d.getDate()).padStart(2, "0");
  }

  function bank() { return window.QUESTION_BANK || []; }
  function qById(id) {
    for (var i = 0; i < bank().length; i++) if (bank()[i].id === id) return bank()[i];
    return null;
  }

  /* ── Recording ──────────────────────────────────────────────── */
  function recordAnswer(qid, isCorrect) {
    var st = App.state.questionStats[qid];
    if (!st) st = App.state.questionStats[qid] = { seen: 0, correct: 0, streak: 0, lastResult: null, lastSeen: 0, mastered: false };

    st.seen += 1;
    if (isCorrect) { st.correct += 1; st.streak += 1; } else { st.streak = 0; }
    st.lastResult = isCorrect ? "correct" : "wrong";
    st.lastSeen = Date.now();
    var wasMastered = st.mastered;
    st.mastered = st.streak >= MASTERY_STREAK;
    if (st.mastered && !wasMastered) App.UI && App.UI.toast && App.UI.toast("Mastered! 🏆");

    App.state.studyDays[todayKey()] = true;
    App.Storage.saveSoon();
    return st;
  }

  function addSession(entry) {
    App.state.sessions.push(Object.assign({ id: "s" + Date.now(), date: Date.now() }, entry));
    App.Storage.capSessions();
    App.Storage.saveState();
  }

  /* ── Streaks ────────────────────────────────────────────────── */
  function streakInfo() {
    var days = App.state.studyDays;
    var current = 0, best = 0, run = 0;

    // Current streak: walk back from today (or yesterday if nothing today yet)
    var d = new Date();
    if (!days[todayKey(d)]) d.setDate(d.getDate() - 1);
    while (days[todayKey(d)]) { current++; d.setDate(d.getDate() - 1); }

    // Best streak: scan all recorded days
    var keys = Object.keys(days).sort();
    for (var i = 0; i < keys.length; i++) {
      if (i === 0) { run = 1; }
      else {
        var prev = new Date(keys[i - 1] + "T12:00:00");
        prev.setDate(prev.getDate() + 1);
        run = (todayKey(prev) === keys[i]) ? run + 1 : 1;
      }
      if (run > best) best = run;
    }
    return { current: current, best: Math.max(best, current), daysStudied: keys.length };
  }

  /* ── Aggregations ───────────────────────────────────────────── */
  function materialSummary() {
    // One row per reviewer (PDF set)
    var map = {}, order = [];
    bank().forEach(function (q) {
      var m = q.material || "Unsorted";
      if (!map[m]) { map[m] = { material: m, total: 0, seen: 0, correct: 0, mastered: 0, attempts: 0 }; order.push(m); }
      var r = map[m];
      r.total++;
      var st = App.state.questionStats[q.id];
      if (st) {
        if (st.seen > 0) r.seen++;
        r.attempts += st.seen;
        r.correct += st.correct;
        if (st.mastered) r.mastered++;
      }
    });
    return order.map(function (m) {
      var r = map[m];
      r.accuracy = r.attempts > 0 ? Math.round(r.correct / r.attempts * 100) : null;
      return r;
    });
  }

  function subjectSummary() {
    var map = {}, order = [];
    bank().forEach(function (q) {
      var s = q.subject || "General";
      if (!map[s]) { map[s] = { subject: s, total: 0, attempts: 0, correct: 0, seen: 0 }; order.push(s); }
      var r = map[s];
      r.total++;
      var st = App.state.questionStats[q.id];
      if (st) {
        if (st.seen > 0) r.seen++;
        r.attempts += st.seen;
        r.correct += st.correct;
      }
    });
    return order.map(function (s) {
      var r = map[s];
      r.accuracy = r.attempts > 0 ? Math.round(r.correct / r.attempts * 100) : null;
      return r;
    });
  }

  function shortSubject(full) {
    var m = /\(([A-Z]{2,5})\)/.exec(full || "");
    if (m) return m[1];
    return (full || "").split(/[—–-]/)[0].trim();
  }

  function weakTopics(minAttempts, threshold) {
    minAttempts = minAttempts || 3;
    threshold = threshold == null ? 0.6 : threshold;
    var map = {}, order = [];
    bank().forEach(function (q) {
      var key = (q.subject || "General") + " :: " + (q.topic || "");
      if (!map[key]) { map[key] = { key: key, subject: q.subject, topic: q.topic, attempts: 0, correct: 0 }; order.push(key); }
      var st = App.state.questionStats[q.id];
      if (st) { map[key].attempts += st.seen; map[key].correct += st.correct; }
    });
    return order
      .map(function (k) {
        var r = map[k];
        r.accuracy = r.attempts > 0 ? r.correct / r.attempts : null;
        return r;
      })
      .filter(function (r) { return r.attempts >= minAttempts && r.accuracy < threshold; })
      .sort(function (a, b) { return a.accuracy - b.accuracy; })
      .slice(0, 8);
  }

  function drillPool() {
    return bank().filter(function (q) {
      var st = App.state.questionStats[q.id];
      return st && st.seen > 0 && !st.mastered;
    });
  }

  function overall() {
    var attempts = 0, correct = 0, seen = 0, mastered = 0;
    bank().forEach(function (q) {
      var st = App.state.questionStats[q.id];
      if (st) {
        if (st.seen > 0) seen++;
        attempts += st.seen;
        correct += st.correct;
        if (st.mastered) mastered++;
      }
    });
    return {
      total: bank().length,
      seen: seen,
      mastered: mastered,
      attempts: attempts,
      correct: correct,
      accuracy: attempts > 0 ? Math.round(correct / attempts * 100) : null,
      studyTimeSec: App.state.sessions.reduce(function (a, s) { return a + (s.durationSec || 0); }, 0)
    };
  }

  function fmtDuration(sec) {
    if (!sec || sec < 0) sec = 0;
    var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60);
    if (h > 0) return h + "h " + m + "m";
    return m + "m";
  }

  function fmtWhen(ts) {
    var d = new Date(ts), now = new Date();
    var sameDay = todayKey(d) === todayKey(now);
    if (sameDay) {
      var mins = Math.max(1, Math.round((now - d) / 60000));
      if (mins < 60) return mins + "m ago";
      return Math.floor(mins / 60) + "h ago";
    }
    var yesterday = new Date(now); yesterday.setDate(now.getDate() - 1);
    if (todayKey(d) === todayKey(yesterday)) return "Yesterday";
    return (d.getMonth() + 1) + "/" + d.getDate();
  }

  App.Stats = {
    MASTERY_STREAK: MASTERY_STREAK,
    todayKey: todayKey,
    qById: qById,
    recordAnswer: recordAnswer,
    addSession: addSession,
    streakInfo: streakInfo,
    materialSummary: materialSummary,
    subjectSummary: subjectSummary,
    shortSubject: shortSubject,
    weakTopics: weakTopics,
    drillPool: drillPool,
    overall: overall,
    fmtDuration: fmtDuration,
    fmtWhen: fmtWhen
  };
})(window.App);

/*
 * storage.js — persistence layer
 * All progress lives in localStorage. No server, no accounts.
 * Everything is exportable/importable as a JSON backup file.
 */
window.App = window.App || {};

(function (App) {
  "use strict";

  var STATE_KEY = "cpaQuiz.state.v1";
  var SESSION_KEY = "cpaQuiz.session.v1";
  var MAX_SESSIONS = 200;

  function defaultState() {
    return {
      version: 1,
      settings: { theme: "system" }, // "system" | "light" | "dark"
      questionStats: {},             // qid -> { seen, correct, streak, lastResult, lastSeen, mastered }
      sessions: [],                  // [{ id, date, mode, set, total, answered, correct, durationSec }]
      studyDays: {}                  // "YYYY-MM-DD" -> true (any answer recorded that day)
    };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STATE_KEY);
      if (!raw) return defaultState();
      var s = JSON.parse(raw);
      var d = defaultState();
      // Merge so new fields survive app updates
      s.settings = Object.assign(d.settings, s.settings || {});
      s.questionStats = s.questionStats || {};
      s.sessions = Array.isArray(s.sessions) ? s.sessions : [];
      s.studyDays = s.studyDays || {};
      s.version = 1;
      return s;
    } catch (e) {
      console.warn("Could not load saved progress, starting fresh.", e);
      return defaultState();
    }
  }

  var saveTimer = null;
  function saveState() {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(App.state));
    } catch (e) {
      console.warn("Could not save progress.", e);
    }
  }

  // Debounced save for high-frequency events (answer recording)
  function saveSoon() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveState, 250);
  }

  /* ── Active quiz session (survives refresh, incl. exam timer) ── */
  function loadSession() {
    try {
      var raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function saveSession(s) {
    try {
      if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s));
      else localStorage.removeItem(SESSION_KEY);
    } catch (e) { /* non-fatal */ }
  }

  /* ── Backup: export / import ───────────────────────────────── */
  function exportProgress() {
    var payload = {
      app: "cpa-review-hub",
      exportedAt: new Date().toISOString(),
      state: App.state
    };
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    var d = new Date();
    var stamp = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    a.href = url;
    a.download = "cpa-quiz-progress-" + stamp + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  function importProgress(jsonText) {
    var data = JSON.parse(jsonText);
    var incoming = data && data.state ? data.state : data;
    if (!incoming || typeof incoming !== "object" || !incoming.questionStats || !Array.isArray(incoming.sessions)) {
      throw new Error("This file doesn't look like a CPA Quiz Hub backup.");
    }
    var d = defaultState();
    incoming.settings = Object.assign(d.settings, incoming.settings || {});
    incoming.studyDays = incoming.studyDays || {};
    incoming.version = 1;
    // Keep only the most recent MAX_SESSIONS entries
    if (incoming.sessions.length > MAX_SESSIONS) {
      incoming.sessions = incoming.sessions.slice(-MAX_SESSIONS);
    }
    App.state = incoming;
    saveState();
    return true;
  }

  function resetAll() {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(STATE_KEY);
    App.state = defaultState();
    App.session = null;
  }

  function capSessions() {
    if (App.state.sessions.length > MAX_SESSIONS) {
      App.state.sessions = App.state.sessions.slice(-MAX_SESSIONS);
    }
  }

  App.Storage = {
    defaultState: defaultState,
    loadState: loadState,
    saveState: saveState,
    saveSoon: saveSoon,
    loadSession: loadSession,
    saveSession: saveSession,
    exportProgress: exportProgress,
    importProgress: importProgress,
    resetAll: resetAll,
    capSessions: capSessions
  };
})(window.App);

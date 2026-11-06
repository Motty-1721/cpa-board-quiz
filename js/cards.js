/*
 * cards.js — flashcard engine
 * Decks are built from data/flashcards.js, grouped by subject → module.
 * "Still learning" cards return to the back of the queue until marked known;
 * known cards leave the deck and stay known across sessions (until marked
 * "still learning" again). Active decks persist, so a refresh resumes.
 */
window.App = window.App || {};

(function (App) {
  "use strict";

  var DECK_KEY = "cpaQuiz.cards.v1";

  function all() { return window.FLASHCARDS || []; }

  function cardById(id) {
    for (var i = 0; i < all().length; i++) if (all()[i].id === id) return all()[i];
    return null;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function deckFor(subject, module) {
    return all().filter(function (c) {
      var subjOk = !subject || c.subject === subject;
      var modOk = !module || c.module === module;
      return subjOk && modOk;
    });
  }

  /* ── Session ─────────────────────────────────────────────────── */
  // opts: { subject, module, onlyUnknown } — onlyUnknown skips already-known cards
  function startDeck(opts) {
    var pool = deckFor(opts.subject, opts.module);
    if (opts.onlyUnknown) {
      pool = pool.filter(function (c) {
        var st = App.state.cardStats && App.state.cardStats[c.id];
        return !(st && st.known);
      });
    }
    if (!pool.length) return { ok: false, reason: "empty" };

    App.cardSession = {
      id: "c" + Date.now(),
      subject: opts.subject || null,
      module: opts.module || null,
      queue: shuffle(pool).map(function (c) { return c.id; }),
      index: 0,
      marked: {},   // id -> "known" | "again"
      knownCount: 0,
      reviewedCount: 0,
      startedAt: Date.now(),
      finished: false
    };
    saveSession(App.cardSession);
    return { ok: true };
  }

  function saveSession(s) {
    try {
      if (s) localStorage.setItem(DECK_KEY, JSON.stringify(s));
      else localStorage.removeItem(DECK_KEY);
    } catch (e) { /* non-fatal */ }
  }
  function loadSession() {
    try {
      var raw = localStorage.getItem(DECK_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function currentCard() {
    var s = App.cardSession;
    if (!s || s.finished) return null;
    return cardById(s.queue[s.index]) || null;
  }

  // Mark current card; "again" pushes it to the back of the queue
  function markCurrent(known) {
    var s = App.cardSession;
    if (!s || s.finished) return null;
    var card = currentCard();
    if (!card) return null;

    var st = App.state.cardStats[card.id];
    if (!st) st = App.state.cardStats[card.id] = { seen: 0, known: false, lastAt: 0 };
    st.seen += 1;
    st.known = known;
    st.lastAt = Date.now();

    s.marked[card.id] = known ? "known" : "again";
    s.reviewedCount += 1;

    if (known) {
      s.knownCount += 1;
      advance();
    } else {
      // requeue at the back, then advance
      s.queue.push(card.id);
      advance();
    }

    // Studying cards counts toward the daily streak
    App.state.studyDays[App.Stats.todayKey()] = true;
    App.Storage.saveSoon();
    saveSession(s);
    return { finished: s.finished };
  }

  function advance() {
    var s = App.cardSession;
    s.index += 1;
    if (s.index >= s.queue.length) {
      // Done when every card in the queue is marked known
      var pending = s.queue.filter(function (id) { return s.marked[id] !== "known"; });
      if (!pending.length) {
        finishSession();
      } else {
        s.queue = pending;
        s.index = 0;
      }
    }
  }

  function finishSession() {
    var s = App.cardSession;
    s.finished = true;
    if (s.reviewedCount > 0) {
      App.Stats.addSession({
        mode: "cards",
        set: s.subject || s.module || "All subjects",
        setLabel: "Flashcards",
        total: s.queue.length,
        answered: s.reviewedCount,
        correct: s.knownCount, // reuse field: cards marked known
        durationSec: Math.round((Date.now() - s.startedAt) / 1000)
      });
    }
    saveSession(s);
  }

  function exit() {
    var s = App.cardSession;
    if (s && !s.finished && s.reviewedCount > 0) finishSession();
    App.cardSession = null;
    saveSession(null);
  }

  /* ── Stats helpers ───────────────────────────────────────────── */
  function deckSummary(subject) {
    var mods = {}, order = [];
    deckFor(subject, null).forEach(function (c) {
      var m = c.module || "General";
      if (!mods[m]) { mods[m] = { module: m, total: 0, known: 0 }; order.push(m); }
      mods[m].total++;
      var st = App.state.cardStats[c.id];
      if (st && st.known) mods[m].known++;
    });
    return order.map(function (m) { return mods[m]; });
  }

  function deckTotals(subject) {
    var pool = deckFor(subject, null);
    var known = pool.filter(function (c) {
      var st = App.state.cardStats[c.id];
      return st && st.known;
    }).length;
    return { total: pool.length, known: known };
  }

  App.Cards = {
    all: all,
    cardById: cardById,
    deckFor: deckFor,
    startDeck: startDeck,
    currentCard: currentCard,
    markCurrent: markCurrent,
    exit: exit,
    loadSession: loadSession,
    saveSession: saveSession,
    deckSummary: deckSummary,
    deckTotals: deckTotals
  };
})(window.App);

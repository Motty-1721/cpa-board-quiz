/*
 * ui.js — rendering helpers: escaping, toasts, modals, SVG charts
 */
window.App = window.App || {};

(function (App) {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* ── Toast ──────────────────────────────────────────────────── */
  var toastTimer = null;
  function toast(msg) {
    var el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2200);
  }

  /* ── Confirm modal (promise-based) ──────────────────────────── */
  function confirmModal(opts) {
    opts = opts || {};
    return new Promise(function (resolve) {
      var root = document.getElementById("modal-root");
      root.innerHTML =
        '<div class="modal-overlay" id="modal-ov">' +
          '<div class="modal" role="dialog" aria-modal="true">' +
            "<h3>" + esc(opts.title || "Are you sure?") + "</h3>" +
            "<p>" + esc(opts.body || "") + "</p>" +
            '<div class="actions">' +
              '<button class="btn btn-ghost" id="modal-cancel">' + esc(opts.cancelText || "Cancel") + "</button>" +
              '<button class="btn ' + (opts.danger ? "btn-danger" : "btn-primary") + '" id="modal-ok">' + esc(opts.okText || "Confirm") + "</button>" +
            "</div>" +
          "</div>" +
        "</div>";

      function close(val) {
        root.innerHTML = "";
        resolve(val);
      }
      document.getElementById("modal-cancel").onclick = function () { close(false); };
      document.getElementById("modal-ok").onclick = function () { close(true); };
      document.getElementById("modal-ov").addEventListener("click", function (e) {
        if (e.target === this) close(false);
      });
    });
  }

  /* ── Accuracy color helper ──────────────────────────────────── */
  function accClass(pct) {
    if (pct == null) return "muted";
    if (pct >= 75) return "chip good";
    if (pct >= 60) return "chip warn";
    return "chip bad";
  }

  /* ── SVG: score ring (results screen) ──────────────────────── */
  function scoreRing(pct, colorVar) {
    pct = Math.max(0, Math.min(100, pct));
    var r = 70, c = 2 * Math.PI * r, off = c * (1 - pct / 100);
    return '<div class="scorering">' +
      '<svg width="168" height="168" viewBox="0 0 168 168">' +
        '<circle cx="84" cy="84" r="' + r + '" fill="none" stroke="var(--surface-3)" stroke-width="13"/>' +
        '<circle cx="84" cy="84" r="' + r + '" fill="none" stroke="var(' + (colorVar || "--primary") + ')" stroke-width="13" stroke-linecap="round" stroke-dasharray="' + c + '" stroke-dashoffset="' + off + '"/>' +
      "</svg>" +
      '<div class="val">' + Math.round(pct) + '<span style="font-size:.9rem">%</span></div>' +
      "</div>";
  }

  /* ── SVG: line chart (session accuracy over time) ──────────── */
  function lineChart(points) {
    // points: [{ label, value 0-100 }]
    if (!points || points.length < 2) {
      return '<div class="empty" style="padding:18px"><div class="big">📈</div>Answer at least two sessions to see your trend.</div>';
    }
    var W = 640, H = 190, padL = 34, padR = 10, padT = 12, padB = 26;
    var iw = W - padL - padR, ih = H - padT - padB;
    var n = points.length;
    var x = function (i) { return padL + (n === 1 ? 0 : i * iw / (n - 1)); };
    var y = function (v) { return padT + ih - (v / 100) * ih; };

    var gridLines = "", labels = "";
    [0, 50, 100].forEach(function (gv) {
      gridLines += '<line x1="' + padL + '" y1="' + y(gv) + '" x2="' + (W - padR) + '" y2="' + y(gv) + '" stroke="var(--border)" stroke-width="1"' + (gv === 0 ? '' : ' stroke-dasharray="4 5"') + "/>";
      gridLines += '<text x="' + (padL - 7) + '" y="' + (y(gv) + 4) + '" text-anchor="end" font-size="10" fill="var(--text-muted)">' + gv + "</text>";
    });
    // Passing line at 75
    gridLines += '<line x1="' + padL + '" y1="' + y(75) + '" x2="' + (W - padR) + '" y2="' + y(75) + '" stroke="var(--success)" stroke-width="1.2" stroke-dasharray="2 4" opacity=".6"/>';
    gridLines += '<text x="' + (W - padR) + '" y="' + (y(75) - 4) + '" text-anchor="end" font-size="9" fill="var(--success)">75% pass</text>';

    var poly = "", dots = "";
    points.forEach(function (p, i) {
      poly += (i === 0 ? "M" : "L") + x(i).toFixed(1) + "," + y(p.value).toFixed(1) + " ";
      dots += '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(p.value).toFixed(1) + '" r="4" fill="var(--primary)" stroke="var(--surface)" stroke-width="2"><title>' + esc(p.label) + " — " + p.value + "%</title></circle>";
    });
    var area = poly + "L" + x(n - 1).toFixed(1) + "," + y(0) + " L" + x(0).toFixed(1) + "," + y(0) + " Z";

    // x labels: first, middle, last
    [0, Math.floor((n - 1) / 2), n - 1].forEach(function (i, k) {
      if (k > 0 && i === [0, Math.floor((n - 1) / 2), n - 1][k - 1]) return;
      labels += '<text x="' + x(i).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="10" fill="var(--text-muted)">' + esc(points[i].label) + "</text>";
    });

    return '<div class="chartwrap"><svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMidYMid meet">' +
      gridLines +
      '<path d="' + area + '" fill="var(--primary)" opacity=".08"/>' +
      '<path d="' + poly + '" fill="none" stroke="var(--primary)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>' +
      dots + labels +
      "</svg></div>";
  }

  /* ── Heatmap: last 8 weeks of study days ───────────────────── */
  function heatmap() {
    var days = App.state.studyDays;
    var today = new Date();
    var start = new Date(today);
    start.setDate(start.getDate() - 49);            // 7 weeks back
    start.setDate(start.getDate() - start.getDay()); // align to Sunday
    var todayK = App.Stats.todayKey();
    var html = "";
    var count = 0;
    var d = new Date(start);
    // Draw every day from start through today, then pad the final week
    // with hidden cells so the 7-row columns stay aligned.
    while (d <= today) {
      var k = App.Stats.todayKey(d);
      var cls = (days[k] ? "hit" : "") + (k === todayK ? " today" : "");
      html += '<i class="' + cls + '" title="' + k + (days[k] ? " — studied ✓" : "") + '"></i>';
      d.setDate(d.getDate() + 1);
      count++;
    }
    while (count % 7 !== 0) { html += '<i style="visibility:hidden"></i>'; count++; }
    return '<div class="heatmap">' + html + "</div>";
  }

  App.UI = {
    esc: esc,
    toast: toast,
    confirmModal: confirmModal,
    accClass: accClass,
    scoreRing: scoreRing,
    lineChart: lineChart,
    heatmap: heatmap
  };
})(window.App);

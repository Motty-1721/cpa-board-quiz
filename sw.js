/*
 * sw.js — offline support (service worker)
 * Strategy: stale-while-revalidate for same-origin GETs.
 * Pages load instantly from cache; fresh copies arrive on the next load.
 * Bump CACHE_VERSION whenever you want to force an update wave.
 */
var CACHE_VERSION = "cpa-quiz-v1";
var CORE = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/storage.js",
  "./js/stats.js",
  "./js/ui.js",
  "./js/quiz.js",
  "./js/app.js",
  "./data/questions.js",
  "./manifest.json",
  "./icon.svg"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_VERSION).then(function (cache) { return cache.addAll(CORE); }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE_VERSION) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;

  e.respondWith(
    caches.open(CACHE_VERSION).then(function (cache) {
      return cache.match(req).then(function (cached) {
        var network = fetch(req).then(function (res) {
          if (res && res.status === 200) cache.put(req, res.clone());
          return res;
        }).catch(function () {
          return cached || Response.error();
        });
        return cached || network;
      });
    })
  );
});

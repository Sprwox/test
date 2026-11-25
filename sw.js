const CACHE = "mineral-v8";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png", "./title-bg.jpg", "./home-bg.jpg", "./logo.webp", "./tap.webp", "./default.webp", "./install-guide.webp", "./ui-rw-head.webp", "./ui-rw-1.webp", "./ui-rw-2.webp", "./ui-rw-3.webp", "./ui-nav-home.webp", "./ui-nav-todo.webp", "./ui-nav-game.webp", "./ui-nav-gacha.webp", "./ui-nav-set.webp", "./mg-fly.webp", "./mg-jump.webp", "./mg-fall.webp", "./mg-bottles.webp", "./mg-face-1.webp", "./mg-face-2.webp", "./mg-face-3.webp", "./mg-face-4.webp", "./mg-face-5.webp", "./mg-face-6.webp", "./hud.webp", "./btn-todo.webp", "./btn-game.webp", "./btn-gacha.webp", "./btn-set.webp"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
// ネット優先、失敗したらキャッシュ(更新が反映されやすい)。音楽はSWを通さない(iPhoneで再生が止まるため)
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || e.request.headers.has("range") || e.request.url.endsWith(".mp3")) return;
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request)));
});

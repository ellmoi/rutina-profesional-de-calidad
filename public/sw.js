// SERVICE WORKER: guarda la interfaz básica para poder abrirla sin conexión.
const CACHE = "norte-shell-v1";
const ASSETS = ["/", "/manifest.webmanifest", "/favicon.svg"];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS))));
self.addEventListener("fetch", event => event.respondWith(fetch(event.request).catch(() => caches.match(event.request).then(hit => hit || caches.match("/")))));

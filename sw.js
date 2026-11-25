const V = 'farmainv-v1';
const SHELL = ['data.json', './', 'index.html', 'config.js', 'manifest.json', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  const ok = u.origin === location.origin ||
    /(gstatic\.com|cdnjs\.cloudflare\.com|unpkg\.com|fonts\.googleapis\.com)$/.test(u.hostname);
  if (!ok) return;
  e.respondWith(
    caches.match(e.request).then(hit => {
      const net = fetch(e.request).then(r => {
        if (r && (r.ok || r.type === 'opaque')) {
          const cp = r.clone();
          caches.open(V).then(c => c.put(e.request, cp));
        }
        return r;
      }).catch(() => hit);
      return hit || net;
    })
  );
});

// Service Worker v2 para K y A . Primera Mano - Portal de Gestores
// Soporte 100% Offline y Detección Automática de Actualizaciones en la Web

const CACHE_NAME = 'gestores-cache-v1793089951998';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './logo.svg',
  './icon-192.png',
  './icon-512.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://unpkg.com/lucide@latest',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js'
];

// Instalación: Pre-cacheados de recursos principales
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Usar allSettled para no fallar si algún CDN externo da timeout en la instalación inicial
      return Promise.allSettled(
        ASSETS_TO_CACHE.map((url) => {
          return fetch(url, { mode: url.startsWith('http') ? 'cors' : 'same-origin' })
            .then((res) => {
              if (res.ok || res.type === 'opaque') {
                return cache.put(url, res);
              }
            })
            .catch((err) => {
              console.warn('SW: No se pudo pre-cachear:', url, err.message);
            });
        })
      );
    })
  );
  // Activación inmediata
  self.skipWaiting();
});

// Activación: Limpieza de caches antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// Interceptor Fetch:
// Para peticiones HTML/navegación y database.json: Network-First (con fallback a Cache para modo offline)
// Para el resto de recursos (CSS, JS, iconos): Stale-While-Revalidate (devuelve cache rápido y actualiza en segundo plano)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 1. Navegación HTML o database.json -> Network first con fallback a cache
  const isHtml = event.request.mode === 'navigate' || 
                 event.request.headers.get('accept')?.includes('text/html') ||
                 url.pathname.endsWith('index.html') ||
                 url.pathname.endsWith('/');

  const isData = url.pathname.endsWith('database.json');

  if (isHtml || isData) {
    event.respondWith(
      fetch(event.request)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const clone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkRes;
        })
        .catch(() => {
          // Si estamos offline o la red falla, responder con la versión en caché
          return caches.match(event.request).then((cached) => {
            if (cached) return cached;
            if (isHtml) return caches.match('./index.html');
            return null;
          });
        })
    );
    return;
  }

  // 2. Recursos estáticos (CDNs, imágenes, scripts, fuentes) -> Stale-while-revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            const resClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
          }
          return networkResponse;
        })
        .catch(() => {
          // Si falla la red y no hay caché, no hacer nada
        });

      return cachedResponse || fetchPromise;
    })
  );
});

// Escucha mensajes desde la aplicación web (por ejemplo, para saltar la espera al actualizar)
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

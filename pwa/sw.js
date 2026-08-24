// PWA Service Worker for Warehouse Inventory
const CACHE_NAME = 'warehouse-inventory-v1';
const PRECACHE_URLS = [
  '/pwa/index.html',
  '/pwa/styles.css',
  '/pwa/app.js',
  '/pwa/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
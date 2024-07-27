const CACHE_NAME = 'scruter-v1';
const urlsToCache = [
  '/offline.html'  // Add your offline page here
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return the cached response if available
        if (response) {
          return response;
        }
        
        // Fetch the resource from the network
        return fetch(event.request).catch(() => {
          // If both cache and network are unavailable, show the offline page
          return caches.match('/offline.html');
        });
      })
  );
});

const CACHE_NAME = 'bdu-calculator-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/app.js',
  '/static/styles.css',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Install event - cache faylları
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - köhnə cache-ləri təmizlə
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache');
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - offline dəstəyi
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache-də varsa, onu qaytar
        if (response) {
          return response;
        }

        // Cache-də yoxdursa, şəbəkədən gətir
        return fetch(event.request).then((response) => {
          // Əgər yaxşı cavabdırsa və HTTP/HTTPS-dirsə, cache-lə
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Response-u klonla və cache-lə
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        }).catch(() => {
          // Offline olduqda və resurs yoxdursa
          return new Response('Offline rejimində bu resurs mövcud deyil', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});

// Background sync (opsional - gələcək üçün)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

function syncData() {
  // Gələcəkdə data sync üçün istifadə oluna bilər
  return Promise.resolve();
}

// Push notification (opsional - gələcək üçün)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Yeni bildiriş',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    vibrate: [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification('BDU Hesablayıcı', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});

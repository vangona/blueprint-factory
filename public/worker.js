var CACHE_NAME = 'blueprint-maker';
var urlsToCache = [
    '/',
    '/auth',
    '/community',
    '/blueprint',
    '/settings',
];
// Install a service worker
self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});
// Cache and return requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
// Update a service worker
self.addEventListener('activate', event => {
    var cacheWhitelist = ['answer_community'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
// Push alert
self.addEventListener('push', (event) => {
    let payload = event.data.json();
    const title = payload.title;
    const options = {
        body: payload.body,
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        dota : payload.params
    };
    event.waitUntil( self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
    let data = event.notification.data;
    event.notification.close();
    event.waitUntil( clients.openWindow( data.url ));
})
self.addEventListener('install', event => {
    console.log('Install event');
});

self.addEventListener('activate', event => {
    console.log('Activate event');
});

self.addEventListener('fetch', event => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            return cachedResponse || fetch(event.request)
        })
    );
});

const cacheName = 'cahce-v1';
const resourcesToPrecache = [
    'https://tomekregulski.github.io/weather-app/',
    "./"
    'index.html',
    'assets/css/style.css',
    'assets/images/pacific.jpg',
    'assets/images/icon-720x720.png',
];

self.addEventListener('install', event => {
    console.log('Service worker install event!');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(resourcesToPrecache);
            })
    );
})


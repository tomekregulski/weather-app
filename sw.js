self.addEventListener('install', event => {
    console.log('Install event');
});

self.addEventListener('activate', event => {
    console.log('Activate event');
});

self.addEventListener('fetch', event => {
    console.log('Fetch intercepted for:', event.request.url);
});

const cacheName = 'cahce-v1';
const resourcesToPrecache = [
    './',
    'index.html',
    'assets/css/style.css',
    'assets/images/pacific.jpg',
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
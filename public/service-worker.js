importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js'
);

if (workbox) {
  console.log('Workbox is loaded');

  // Cache static assets (CSS, JS, images) using Cache First
  workbox.routing.registerRoute(
    ({ request }) =>
      request.destination === 'style' ||
      request.destination === 'script' ||
      request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'static-resources',
    })
  );

  // Cache API responses with Network First (fallback to cache)
  workbox.routing.registerRoute(
    ({ url }) =>
      url.origin === 'https://colliers-offline-poc.netlify.app' &&
      url.pathname.startsWith('/api/'),
    new workbox.strategies.NetworkFirst({
      cacheName: 'api-cache',
      networkTimeoutSeconds: 10,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
        }),
      ],
    })
  );

  // Optional: Cache HTML fallback for offline navigation
  workbox.routing.registerRoute(
    ({ request }) => request.mode === 'navigate',
    new workbox.strategies.NetworkFirst({
      cacheName: 'html-cache',
    })
  );
} else {
  console.log('Workbox failed to load');
}

import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// Cache API responses from the Netlify-deployed app
registerRoute(
  ({ url }) =>
    url.origin === 'https://colliers-offline-poc.netlify.app' &&
    url.pathname.startsWith('/api/'), // adjust if your API path differs
  new NetworkFirst({
    cacheName: 'api-cache',
    networkTimeoutSeconds: 10,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
      }),
    ],
  })
);

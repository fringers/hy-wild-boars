importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js'
);

const { registerRoute } = workbox.routing;
const { CacheFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponse } = workbox.cacheableResponse;
const { ExpirationPlugin } = workbox.expiration;

registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg|webp)$/,
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60, // Only cache 60 requests
        maxAgeSeconds: 7 * 24 * 60 * 60, // Only cache requests for a week
      }),
    ],
  })
);

registerRoute(
  ({ url }) => url.pathname.includes('firestore.googleapis.com'),
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new CacheableResponse({
        headers: {
          'X-Is-Cacheable': 'true',
        },
      }),
    ],
  })
);

registerRoute(
  /\.(?:ttf|woff|otf|svg|eot|woff2)$/,
  new CacheFirst({
    cacheName: 'fonts',
    maxAgeSeconds: 31536000, // 1 year
  })
);

self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Test';
  const options = {
    image: 'app_logo.png',
    badge: 'app_logo.png',
    icon: 'favicon.ico',
    body: event.data.text(),
  };

  const notificationPromise = self.registration.showNotification(
    title,
    options
  );
  event.waitUntil(notificationPromise);
});

self.addEventListener('notificationclick', function (event) {
  console.log('[Service Worker] Notification click Received.');
  event.notification.close();
});

self.addEventListener('notificationclose', function (event) {
  // https://developers.google.com/web/fundamentals/push-notifications/common-notification-patterns

  // const dismissedNotification = event.notification;
  // const promiseChain = notificationCloseAnalytics();
  // event.waitUntil(promiseChain);
  console.log('[Service Worker] Notification close Received.');
});

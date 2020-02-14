importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.setConfig({ debug: false });

workbox.googleAnalytics.initialize();

const FALLBACK_URL = '/';

const urlHandler = workbox.strategies.networkFirst({
    cacheName: 'page-cache'
});

workbox.routing.registerRoute(
    /\/.+\//,
    ({event}) => {
        return urlHandler.handle({event})
            .then((response) => {
                return response || caches.match(FALLBACK_URL);
            })
            .catch(() => caches.match(FALLBACK_URL));
    });

// JS 请求: 网络优先
workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.networkFirst({
    cacheName: 'workbox:js',
  })
);

// CSS 请求: 缓存优先，同时后台更新后下次打开页面才会被页面使用
workbox.routing.registerRoute(
  // Cache CSS files
  /.*\.css/,
  // Use cache but update in the background ASAP
  workbox.strategies.staleWhileRevalidate({
    // Use a custom cache name
    cacheName: 'workbox:css',
  })
);

// 图片请求: 缓存优先
workbox.routing.registerRoute(
  // Cache image files
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  // Use the cache if it's available
  workbox.strategies.cacheFirst({
    // Use a custom cache name
    cacheName: 'workbox:image',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images
        maxEntries: 20,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);


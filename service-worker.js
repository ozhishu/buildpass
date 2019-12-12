(function () {
  'use strict';

  var version = 0;

  var staticCacheName = 'pwa-v' + version;

  var filesToCache = [
    '.',
    'style/style.css',
    'style/icon.ico',
    'js/clipboard.min.js',
    'js/index.js',
    'js/crypto-js.min.js'
  ];

  self.addEventListener('install', function (event) {
    self.skipWaiting();

    event.waitUntil(
      caches.open(staticCacheName).then(function (cache) {
        return cache.addAll(filesToCache);
      })
    );
  });

  self.addEventListener('activate', function (event) {
    var cacheWhitelist = [staticCacheName];
    event.waitUntil(
      caches.keys().then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

  self.addEventListener('fetch', function (event) {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
    );
  });

})();
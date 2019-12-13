(function () {
  'use strict';

  var version = 0;

  var staticCacheName = 'pwa-v' + version;

  var filesToCache = [
    '.',
    'index.htnl',
    'style/style.css',
    'style/icon.ico',
    'style/key.png',
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

})();
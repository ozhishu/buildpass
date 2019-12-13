(function () {
  'use strict';

  var version = 0;

  var staticCacheName = 'pwa-v' + version;

  var filesToCache = [
    '/buildpass',
    '/buildpass/index.html',
    '/buildpass/style/style.css',
    '/buildpass/style/icon.ico',
    '/buildpass/style/key.png',
    '/buildpass/js/clipboard.min.js',
    '/buildpass/js/index.js',
    '/buildpass/js/crypto-js.min.js'
  ];

  self.addEventListener('install', function (event) {
    self.skipWaiting();
    event.waitUntil(
      caches.open(staticCacheName).then(function (cache) {
        return cache.addAll(filesToCache);
      })
    );
  });

})();
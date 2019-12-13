(function () {
  'use strict';

  var version = 0;

  var staticCacheName = 'pwa-v' + version;

  var filesToCache = [
    '/index.html',
    '/style/style.css',
    '/style/icon.ico',
    '/style/key.png',
    '/js/clipboard.min.js',
    '/js/index.js',
    '/js/crypto-js.min.js'
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
    event.waitUntil(
      caches.keys().then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (cacheName.startsWith('pages-cache-') && staticCacheName !== cacheName) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
  self.addEventListener('fetch', function (event) {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request).then(function (response) {
          if (response.status === 404) {
            console.log(404)
            // return caches.match('fourohfour.html');
          }
          return caches.open(filesToCache).then(function (cache) {
            cache.put(event.request.url, response.clone());
            return response;
          });
        });
      }).catch(function (error) {
        console.log('Error, ', error);
        // return caches.match('offline.html');
      })
    );
  });
})();
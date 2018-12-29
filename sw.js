let cacheName = 'restaurant-stage-1';

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(cacheName).then(function(cache){
			return cache.addAll([
				'css/styles.css',
				'css/inside-restaurant.css',
				'css/responsive.css',
				'js/main.js',
				'js/restaurant_info.js',
				'index.html',
				'/index.html?homescreen=1',
				'/restaurant.html',
				'/restaurant.html?=1',
				'img'

			]);
		})
	)
})


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
let cacheName = 'restaurant-stage-1';

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(cacheName).then(function(cache){
			return cache.addAll([
				'/',
				'css/styles.css',
				'css/inside-restaurant.css',
				'css/responsive.css',
				'js/main.js',
				'js/restaurant_info.js',
				'js/dbhelper.js',
				'/index.html',
				'/index.html?homescreen=1',
				'/restaurant.html',
        '/restaurant.html/',
				'/img',
				'/data/restaurants.json'

			])
			.then(() => {
				console.log('All files are cached');
			})
			.catch((error) => {
				console.log('Failed to cache', error)
			});
		})
	)
})



// self.addEventListener('fetch', (event) => {
// 	console.log(event)
// 	let request = event.request;

//   	event.respondWith(
//     caches.match(request)
//     	.then((response) => {
//     	if(response) {
//     		return response
//     	}
// 	    return fetch(request);
//     })
//   );
// });




// self.addEventListener('activate', (event) => {
//   console.info('Event: Activate');

//   //Remove old and unwanted caches
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cache) => {
//           if (cache !== cacheName) {     //cacheName = 'cache-v1'
//             return caches.delete(cache); //Deleting the cache
//           }
//         })
//       );
//     })
//   );
// });

//this code below is from https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker

 self.addEventListener('fetch', (event) => {
  console.log(event);

  event.respondWith(
    caches.open(cacheName).then(function(cache) {
      return cache.match(event.request, {ignoreSearch:true})
        .then(function (response) {
          return response || fetch(event.request)
            .then(function(response) {
              cache.put(event.request, response.clone());
              return response;
            });
          });
        })
      );
});


//utilizes solution found on this website (https://github.com/GoogleChromeLabs/sw-toolbox/issues/227) by mbj36

/*
  ACTIVATE EVENT: triggered once after registering, also used to clean up caches.
*/

//Adding `activate` event listener
// self.addEventListener('activate', (event) => {
//   console.info('Event: Activate');

//   //Remove old and unwanted caches
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cache) => {
//           if (cache !== cacheName) {     //cacheName = 'cache-v1'
//             return caches.delete(cache); //Deleting the cache
//           }
//         })
//       );
//     })
//   );
// });




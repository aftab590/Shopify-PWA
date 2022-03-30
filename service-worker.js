if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./service-worker.js')
      .then((reg)=>console.log('registred successfully',reg))
      .catch((error)=>console.log('registration failed',error))

}
//installing
const cacheName='shopify-v2'
const cacheAssets = [
    '/',
    './index.html',
    './assets/css/styles.css',
    './assets/scss/styles.scss',
    './assets/js/main.js',
    
    './assets/img/192.png',
    './assets/img/about.jpg',
    './assets/img/app1.png',
    './assets/img/app2.png',
    './assets/img/dish.svg',
    './assets/img/fast-food-12.png',
    './assets/img/home.png',
    './assets/img/movil-app.png',
    './assets/img/pizza.svg',
    './assets/img/plate1.png',
    './assets/img/plate2.png',
    './assets/img/plate3.png',
    './assets/img/truck.svg',
    'https://unpkg.com/scrollreveal'
   

];
self.addEventListener('install',evt=>{
    // console.log('service installed')
    evt.waitUntil(
        caches.open(cacheName).then(cache=>{
            console.log('caching files')
            cache.addAll(cacheAssets)
            .then(() => self.skipWaiting())
        })
    );
    
})
//Activate Service_worker
self.addEventListener('activate',evt=>{
    evt.waitUntil(
        caches.keys().then(keys=>{
            return Promise.all(keys
                .filter(key => key!==cacheName)
                .map(key => caches.delete(key))
            )
        })

        
    )
})
//fetch
self.addEventListener('fetch',evt=>{
    //console.log('fetch event:',evt)
    evt.respondWith(
        caches.match(evt.request).then(res=>{
            return res || fetch(evt.request)
        })
    );




})
// self.addEventListener('push', function(e) {
//     console.log('bhbh')
//     var options = {
//       body: 'This notification was generated from a push!',
//       icon: './assets/img/fast-food-12.png',
//       vibrate: [100, 50, 100],
//       data: {
//         dateOfArrival: Date.now(),
//         primaryKey: '2'
//       },
//       actions: [
//         {action: 'explore', title: 'Explore this new world',
//           icon: './assets/img/about.jpg'},
//         {action: 'close', title: 'Close',
//           icon: './assets/img/home.png'},
//       ]
//     };
//     e.waitUntil(
//       self.registration.showNotification('Hello world!', options)
//     );
//   });
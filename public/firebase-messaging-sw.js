
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
// importScripts('/__/firebase/init.js');

const config= {
  apiKey:"AIzaSyDd1bmOXMc1gs1RrsygS4B-qIf22o0zaI4" ,
  authDomain: "human-24b1b.firebaseapp.com",
  databaseURL: "https://human-24b1b.firebaseio.com",
  projectId: "human-24b1b",
  storageBucket: "human-24b1b.appspot.com",
  messagingSenderId: "534180446796"
};

firebase.initializeApp(config);

var messaging = firebase.messaging();



messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notificationTitle = payload.notification.title;
  var notificationOptions = {
    body: 'A human has accepted your request!',
    icon: './human.png',
    vibrate: [200, 100, 200, 100, 200, 100, 200],
  };
  
  

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
// // [END background_handler]

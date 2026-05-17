// Firebase Messaging Service Worker
// Must be at the ROOT of your Netlify site

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDcD7m2Vi45odb7RBVooHDPvgn4GmmlVWA",
  authDomain: "shift-schedule-43cdf.firebaseapp.com",
  databaseURL: "https://shift-schedule-43cdf-default-rtdb.firebaseio.com",
  projectId: "shift-schedule-43cdf",
  storageBucket: "shift-schedule-43cdf.firebasestorage.app",
  messagingSenderId: "1016034779401",
  appId: "1:1016034779401:web:c68c5e3a0210c648c273d8"
});

const messaging = firebase.messaging();

// Handle background messages (when app is closed or in background)
messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);

  const { title, body, icon } = payload.notification || {};

  self.registration.showNotification(title || '📅 Shift Reminder', {
    body: body || 'Your shift is starting soon!',
    icon: icon || '/icon.png',
    badge: '/icon.png',
    tag: 'shift-reminder',
    renotify: true,
    requireInteraction: true,
    actions: [
      { action: 'open', title: '📅 View Schedule' }
    ]
  });
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});

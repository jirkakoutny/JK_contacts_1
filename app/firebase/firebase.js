import { initializeApp } from 'firebase'

import { login, logout, meLoaded, contactsLoaded, contactsChildAdded, contactsChildChanged, contactsChildRemoved } from '../redux/actions'

import config from '../config/firebase'

const firebaseApp = initializeApp({
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  databaseURL: config.DATABASE_URL,
  storageBucket: config.STORAGE_BUCKET
})

export const authRef = firebaseApp.auth();
export const contactsRef = firebaseApp.database().ref('Contacts')
export const meRef = firebaseApp.database().ref('Me')

export function syncFirebase(store) {
  meRef.on('value', (snapshot) => {
    store.dispatch(meLoaded(snapshot.val()));
  })

  // contactsRef.once('value', function (snapshot) {
  //   store.dispatch(contactsLoaded(snapshot.val()));
  // });

  // contactsRef.on('child_added', function (data) {
  //   store.dispatch(contactsChildAdded(data.val()))
  // });

  // contactsRef.on('child_changed', function (data) {
  //   store.dispatch(contactsChildChanged(data.val()));
  // });

  // contactsRef.on('child_removed', function (data) {    
  //   store.dispatch(contactsChildRemoved(data.val()));
  // });

  firebaseApp.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("Authentication state changed - authenticated");
      store.dispatch(login(user));
    }
    else {
      console.log("Authentication state changed - NOT authenticated");
      store.dispatch(logout);
    }
  });
}
import { initializeApp } from 'firebase'
// import { addItemSuccess, removeItemSuccess, goOnline, goOffline } from './actions/items'

import config from '../config/firebase'

const firebaseApp = initializeApp({
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  databaseURL: config.DATABASE_URL,
  storageBucket: config.STORAGE_BUCKET
})

export const contactsRef = firebaseApp.database().ref('Contacts')
export const meRef = firebaseApp.database().ref('Me')
// const connectedRef = firebaseApp.database().ref('.info/connected')

export function syncFirebase(store) {
  
      meRef.on('value', (snapshot) => {
        console.log('Me data');
        console.log(snapshot.val());
        store.dispatch({ type: 'ME_LOADED', me: snapshot.val() });
      })

// contactsRef.once('value', function(snapshot) {
//   console.log('Contacts data');
//         console.log(snapshot.val());
//   store.dispatch({ type: 'CONTACTS_LOADED', contacts: snapshot.val() });
// });      // TODO

contactsRef.on('child_added', function(data) {
  console.log('Contacts child added');
  console.log(data.val());
  store.dispatch({ type: 'CONTACTS_CHILD_ADDED', contact:data.val() });
  //addCommentElement(postElement, data.key, data.val().text, data.val().author);
});

contactsRef.on('child_changed', function(data) {
  console.log('Contacts child changed');
  console.log(data.val());
  store.dispatch({ type: 'CONTACTS_CHILD_CHANGED', contact:data.val() });
  //setCommentValues(postElement, data.key, data.val().text, data.val().author);
});

contactsRef.on('child_removed', function(data) {
  console.log('Contacts child changed');
  console.log(data.val());
  store.dispatch({ type: 'CONTACTS_CHILD_REMOVED', contact:data.val() });  
  // deleteComment(postElement, data.key);
});

  
//   itemsRef.on('child_removed', (snapshot) => {
//     store.dispatch(removeItemSuccess(snapshot.val().id))
//   })

//   connectedRef.on('value', snap => {
//     if (snap.val() === true) {
//       store.dispatch(goOnline())
//     } else {
//       store.dispatch(goOffline())
//     }
//   })
}
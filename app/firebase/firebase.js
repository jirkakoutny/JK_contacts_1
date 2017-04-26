import { initializeApp } from 'firebase'
// import { addItemSuccess, removeItemSuccess, goOnline, goOffline } from './actions/items'

import config from '../config/firebase'

const firebaseApp = initializeApp({
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  databaseURL: config.DATABASE_URL,
  storageBucket: config.STORAGE_BUCKET
})

// export const itemsRef = firebaseApp.database().ref('items')
export const meRef = firebaseApp.database().ref('Me')
// const connectedRef = firebaseApp.database().ref('.info/connected')

export function syncFirebase(store) {
  
      meRef.on('value', (snapshot) => {
        store.dispatch({ type: 'ME_LOADED', me: snapshot.val() });
      })

//   itemsRef.on('child_added', (snapshot) => {
//     store.dispatch(addItemSuccess(snapshot.val()))
//   })

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
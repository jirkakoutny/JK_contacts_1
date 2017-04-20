import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyChpxK70mBrMpFNdLX5mfVvSkibCmNhqzI",
    authDomain: "jkcontacts1.firebaseapp.com",
    databaseURL: "https://jkcontacts1.firebaseio.com",
    projectId: "jkcontacts1",
    storageBucket: "jkcontacts1.appspot.com",
    messagingSenderId: "149167749921"
}
export const firebaseApp = firebase.initializeApp(firebaseConfig)
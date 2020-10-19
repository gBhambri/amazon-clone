import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyB1gi_Kyi4gW-otVc--zSpBJv2ly7xppzY",
    authDomain: "clone-4499c.firebaseapp.com",
    databaseURL: "https://clone-4499c.firebaseio.com",
    projectId: "clone-4499c",
    storageBucket: "clone-4499c.appspot.com",
    messagingSenderId: "85251320214",
    appId: "1:85251320214:web:69ca86abed0fc2a109d5b7",
    measurementId: "G-VSE42Q9ZHH"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig)
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  export {db,auth};
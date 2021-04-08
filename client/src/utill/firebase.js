import firebase from 'firebase'
import  'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyB9mCQxwE3Z0WO3oDmf0KLV14aM_QEu9yw",
  authDomain: "go-camp-610d1.firebaseapp.com",
  databaseURL: "https://go-camp-610d1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "go-camp-610d1",
  storageBucket: "go-camp-610d1.appspot.com",
  messagingSenderId: "395463203800",
  appId: "1:395463203800:web:5f65af40fcdc27dce8b0ad",
  measurementId: "G-F4BDD9F0TE"
};
firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore()

// export const auth = app.auth()
export default firebase;

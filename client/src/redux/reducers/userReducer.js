import { useEffect } from 'react'
import firebase from '../../firebase/firebase'
import { db } from '../../firebase/firebase'

const SET_USER_DATA = "SET_USER_DATA"
const AUTH_USER = "AUTH_USER"
const ADD_USER_TRIP = 'ADD_USER_TRIP'

// const fromLS = JSON.parse(window.localStorage.getItem('myApp'))
// const user = {
//   displayName: '',
//   token: '',
//   uid: '',
//   key: '',
//   image: '',
//   email: '',
//   achievements: [],
//   finishedTrips: [],
//   futureTrips: [],
//   friends: [],
// }
export const initState ={
    displayName: '',
    token: '',
    uid: '',
    key: '',
    image: '',
    email: '',
    achievements: [],
    finishedTrips: [],
    futureTrips: [],
    friends: [],
}
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        uid: action.payload.uid,
        token: action.payload.token,
        displayName: action.payload.displayName,
        key: action.payload.key
      }
    case ADD_USER_TRIP:
      return {
        ...state,
        // ...state.user,stat
        futureTrips: [...state.user.futureTrips, action.payload]
      }

    case AUTH_USER:
      return action.payload


    case 'ADD_KEY':
      console.log('YA TUUUUUT');
      return {
        ...state,
        ...state.user,
        key: action.payload
      }
    default:
      return state;
  }
}

export const addUserTrip = (trip) => ({ type: ADD_USER_TRIP, payload: trip.trip })

export const userSignUp = (userName, userEmail, userPassword) => async (dispatch, getState) => {
  await firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
    .then(data => {
     firebase.auth().currentUser.updateProfile({
        displayName: userName
      })


      firebase.auth().onAuthStateChanged(user => {
        console.log(user);
        if (user) {
          db.collection('Users').add({
            name: user.displayName,
            email: user.email,
            image: '',
            uid: user.uid,
            lastTrips: [],
            futureTrips: [],
            friends: [],
          }).then((docRef) => dispatch(setUserData(user.displayName, user.refreshToken, user.uid, docRef.id)))

        }
      })


    })
}

export const googleProvider = () => async (dispatch, getState) => {
  const provider = new firebase.auth.GoogleAuthProvider();

  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      const credential = result.credential;

      const token = credential.accessToken;
      const user = result.user;


      firebase.auth().onAuthStateChanged(user => {

        if (user) {
          db.collection('Users').add({
            name: user.displayName,
            email: user.email,
            image: '',
            uid: user.uid,
            lastTrips: [],
            futureTrips: [],
            friends: [],
          }).then((docRef) => dispatch(setUserData(user.displayName, user.refreshToken, user.uid, docRef.id)))

        }
      })

    }
    )

}


export const sigInFacebook = () => async (dispatch, getState) => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log(result);
      const credential = result.credential;

      const user = result.user;
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const accessToken = credential.accessToken;

      firebase.auth().onAuthStateChanged(user => {

        if (user) {
          db.collection('Users').add({
            name: user.displayName,
            email: user.email,
            image: '',
            uid: user.uid,
            lastTrips: [],
            futureTrips: [],
            friends: [],
          }).then((docRef) => dispatch(setUserData(user.displayName, user.refreshToken, user.uid, docRef.id)))

        }
      })


    })
}

export const userSignIn = (userEmail, userPassword) => async (dispatch, getState) => {

  await firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
    .then(data => console.log(data))
}



export const setUserData = (displayName, token, uid, key) => {
  return {
    type: SET_USER_DATA,
    payload: {
      displayName, token, uid, key
    }
  }
}
// export const addKeyUser = (id) => {
//   console.log(id);
//   return {
//     type: 'ADD_KEY',
//     payload: id
//   }
// }
// export const getUser 

export default userReducer


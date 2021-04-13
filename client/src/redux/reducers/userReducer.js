import { useEffect } from 'react'
import firebase from '../../firebase/firebase'
import { db } from '../../firebase/firebase'

const SET_USER_DATA = "SET_USER_DATA"
const AUTH_USER = "AUTH_USER"
const ADD_USER_TRIP = 'ADD_USER_TRIP'
const ADD_TPIPKEY_TO_USER = 'ADD_TPIPKEY_TO_USER'

const userFromLS = JSON.parse(window.localStorage.getItem('myApp'))

export const initState = {
  displayName: '',
  token: '',
  uid: '',
  key: '',
  image: '',
  email: '',
}
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        uid: action.payload.uid,
        token: action.payload.token,
        displayName: action.payload.displayName,
        key: action.payload.key,
      }
    case ADD_USER_TRIP:
      return {
        ...state,
        // ...state.user,stat
        futureTrips: [...state.user.futureTrips, action.payload]
      }

    case AUTH_USER:
      return action.payload

    case ADD_TPIPKEY_TO_USER:
      return {
        ...state,
        // ...state.user,stat
        futureTrips: [...state.user.futureTrips, action.payload]
      }


    case 'ADD_KEY':
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


      // firebase.auth().onAuthStateChanged(user => {
      //   if (user) {
      //     if (userFromLS !== null) {
      //       const userDB = db.collection('Users').doc(userFromLS.key)
      //       const key = userDB.id
      //       console.log('USERFROMDB', userDB);
      //       if (user.uid === userDB.uid) {
      //         dispatch(setUserData(user.displayName, user.refreshToken, user.uid, key))
      //       }
      //     }
      //     db.collection('Users').add({
      //       name: user.displayName,
      //       email: user.email,
      //       image: '',
      //       uid: user.uid,
      //       lastTrips: [],
      //       friends: [],
      //     }).then((docRef) => dispatch(setUserData(user.displayName, user.refreshToken, user.uid, docRef.id)))

      //   }
      // })


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


      // firebase.auth().onAuthStateChanged(user => {
      //   if (user) {
      //     if (userFromLS !== null) {
      //       const userDB = db.collection('Users').doc(userFromLS.key)
      //       console.log('USERFROMDB', userDB);
      //       if (user.uid === userDB.uid) {
      //         dispatch(setUserData(user.displayName, user.refreshToken, user.uid, userFromLS.key))
      //       }
      //     }
      //     db.collection('Users').add({
      //       name: user.displayName,
      //       email: user.email,
      //       image: '',
      //       uid: user.uid,
      //       lastTrips: [],
      //       friends: [],
      //     }).then((docRef) => dispatch(setUserData(user.displayName, user.refreshToken, user.uid, docRef.id)))

      //   }
      // })

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

      // firebase.auth().onAuthStateChanged(user => {

      //   if (user) {
      //     if (userFromLS !== null) {
      //       const userDB = db.collection('Users').doc(userFromLS.key)
      //       console.log('USERFROMDB', userDB);

      //       if (user.uid === userDB.uid) {
      //         dispatch(setUserData(user.displayName, user.refreshToken, user.uid, userFromLS.key))
      //       }
      //     }
      //     db.collection('Users').add({
      //       name: user.displayName,
      //       email: user.email,
      //       image: '',
      //       uid: user.uid,
      //       lastTrips: [],
      //       friends: [],
      //     }).then((docRef) => dispatch(setUserData(user.displayName, user.refreshToken, user.uid, docRef.id)))

      //   }
      // })


    })
}

export const userSignIn = (userEmail, userPassword) => async (dispatch, getState) => {

  await firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
    .then(data => console.log(data))

  firebase.auth().onAuthStateChanged(user => {

    if (user) {
      const userId = db.collection('Users').where('uid', '===', user.uid).id
      console.log(userId);
      dispatch(setUserData(user.displayName, user.refreshToken, user.uid, userId))

      // const myApp = {displayName: user.displayName, key: userId, token: user.refreshToken}
      // window.localStorage.setItem('myApp', JSON.stringify(myApp))
    }
  })
}



export const setUserData = (displayName, token, uid) => {
  return {
    type: SET_USER_DATA,
    payload: {
      displayName, token, uid
    }
  }
}

export const addTripKeytoUser = (key) => {
  return {
    type: ADD_TPIPKEY_TO_USER,
    payload: key
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


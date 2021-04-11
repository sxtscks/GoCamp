import { db } from '../../firebase/firebase'
import firebase from '../../firebase/firebase'
import dotProp from 'dot-prop'
const ADD_TRIP = 'ADD_TRIP'
const ADD_TO_ALL = 'ADD_TO_ALL'
const initState = {
  // trips: [],
  trip: {
    name: '',
    start: '',
    finish: '',
    description: '',
    people: [],
    author: {},
    checklist: []
  }
}


const tripReducer = (state = initState, action) => {
  // const { name, start, finish, description } = action.payload
  switch (action.type) {
    case ADD_TRIP:
      return dotProp.set(state, 'trip', action.payload)
    case ADD_TO_ALL:
      return {
        ...state,
        trips: action.payload,

      }
    // return {
    //   ...state,
    //   ...state.trip,
    //   name: action.payload.name,
    //   start: action.payload.start,
    //   finish: action.payload.finish,
    //   description: action.payload.description
    // }

    default:
      return state;
  }

}

export const addToAll = (trip) => {
  return {
    type: ADD_TO_ALL,
    payload:
      trip
  }
}

export const addTrip = (trip) => {
  return {
    type: ADD_TRIP,
    payload:
      trip

  }
}

export const addTripToFB = (trip, key) => (dispatch, getState) => {
  console.log(key, 'YA TUT');
  let tripId = '';
  db.collection('AllTrips').add({
    ...trip,
    persons: [],
    benzin: 0,
    markBenzin: [],
    wayLength: 0,
    author: key,
    checkList: []
  }).then((docRef) => tripId = docRef.id)


  db.collection('Users').doc(key).update({
    futureTrips: firebase.firestore.FieldValue.arrayUnion({
      ...trip,
      persons: [],
      benzin: 0,
      markBenzin: [],
      wayLength: 0,
      checkList: []
    })
  })
  


  // collection('futureTrips').add({
  //   ...trip,
  //   persons: [],
  //   benzin: 0,
  //   markBenzin: [],
  //   wayLength: 0,
  //   checkList: []
  // })
}

// const setTripToUSer = (id) => {


// }
// import { GET_TRIPS } from "../types/trips";

// const tripReducer = (state = [], action) => {
//   switch (action.type) {
//     case GET_TRIPS:
//       return action.payload
  
//     default:
//       return state;
//   }
// }

export default tripReducer

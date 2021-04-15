import { ADD_DISTANCE, CREATE_TRIP, GET_TRIPS } from "../types/trips";
import { db } from '../../firebase/firebase'
import firebase from '../../firebase/firebase'
import dotProp from 'dot-prop'
import {v4 as uuidv4} from 'uuid'


const ADD_TRIP = 'ADD_TRIP'
const ADD_TO_ALL = 'ADD_TO_ALL'
const initState = {
  // trips: [],
  trip: {
    name: '',
    start: '',
    finish: '',
    description: '',
  }
}
const ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

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
    case GET_TRIPS:
      return action.payload

    case CREATE_TRIP:
      return [
        ...state, action.payload
      ]

    case ADD_DISTANCE:
      return state.map((trip) => {
        if (trip.id === action.payload.id) {
          return {
            ...trip,
            distance: action.payload.value
          }
        }
        return trip
      })

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

export const addTripsTodo = (tripKey, todo) => async (dispatch, getState) => {
  console.log('YA V DISPATCHE');
  db.collection('CheckListItem').add(todo).then((doc)=> {
    db.collection('Trips').doc(tripKey).update({
      "checkList": firebase.firestore.FieldValue.arrayUnion(doc.id)
    })
  })

}

export const findAllTodos = (userKey, tripKey) => async (dispatch, getState) => {
  return db.collection('Users').doc(userKey).collection('futureTrips').doc(tripKey).collection('checkList').get()
}


export const addTripToFB = (trip, key) => async (dispatch, getState) => {
  console.log(key, 'YA TUT');

  db.collection('Trips').add({
    ...trip,
    persons: [key],
    benzin: 0,
    waitingList: [],
    wayLength: 0,
    checkList: [],
    author: key
  })
}

export const takeTodo = (userKey, tripId, todoId) => async (dispatch, getState) => {
  console.log('DISPATCH');
  db.collection('Users').doc(userKey).collection('futureTrips').doc(tripId).collection('checkList').doc(todoId).update({
    taker: 'userKey'
  })
}

export default tripReducer

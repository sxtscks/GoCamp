import { ADD_DISTANCE, CREATE_TRIP, GET_TRIPS } from "../types/trips";
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

export const addTripsTodo = (userKey, tripKey, todo) => async (dispatch, getState)=>  {

 return  db.collection('Users').doc(userKey).collection('futureTrips').doc(tripKey).collection('checkList').add(
    todo
  )
}

export const findAllTodos = (userKey, tripKey) => async (dispatch, getState)=>  {
  return  db.collection('Users').doc(userKey).collection('futureTrips').doc(tripKey).collection('checkList').get()
 }
export const addTripToFB = (trip, key) => async (dispatch, getState) => {
  console.log(key, 'YA TUT');

  return db.collection('Users').doc(key).collection('futureTrips').add({
    ...trip,
    persons: [],
    benzin: 0,
    markBenzin: [],
    wayLength: 0,
    checkList: []
  })
}

export const takeTodo = (userKey, tripId, todoId) => async (dispatch, getState)=> {
  console.log('DISPATCH');
    db.collection('Users').doc(userKey).collection('futureTrips').doc(tripId).collection('checkList').doc(todoId).update({
    taker: 'userKey'
  })
}

export default tripReducer

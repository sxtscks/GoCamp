import { ADD_DISTANCE, CREATE_TRIP, GET_TRIPS } from "../types/trips";

const tripReducer = (state = [], action) => {
  switch (action.type) {
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

export default tripReducer

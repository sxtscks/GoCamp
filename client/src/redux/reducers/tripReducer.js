import { CREATE_TRIP, GET_TRIPS } from "../types/trips";

const tripReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TRIPS:
      return action.payload

    case CREATE_TRIP:
      return [
        ...state, action.payload
      ]

    default:
      return state;
  }
}

export default tripReducer

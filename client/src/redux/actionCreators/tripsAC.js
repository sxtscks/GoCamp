import { ADD_DISTANCE, CREATE_TRIP, GET_TRIPS } from "../types/trips"

export const getTrips = (trips) => {
  return {
    type: GET_TRIPS,
    payload: trips
  }
}

export const createTrip = (trip) => {
  return {
    type: CREATE_TRIP,
    payload: trip
  }
}

export const addDistance = (id, value) => {
  return {
    type: ADD_DISTANCE,
    payload: {id, value}
  }
}

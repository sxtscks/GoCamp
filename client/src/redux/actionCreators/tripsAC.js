import { GET_TRIPS } from "../types/trips"

export const getTrips = (trips) => {
  return {
    type: GET_TRIPS,
    payload: trips
  }
}

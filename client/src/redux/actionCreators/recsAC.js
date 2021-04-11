import { GET_CURRENT_REC, GET_RECS } from "../types/recs"

export const getRecs = (recs) => {
  return {
    type: GET_RECS,
    payload: recs
  }
}

export const getCurrentRec = (id) => {
  return {
    type: GET_CURRENT_REC,
    payload: id
  }
}

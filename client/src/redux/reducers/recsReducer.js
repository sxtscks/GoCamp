import { GET_CURRENT_REC, GET_RECS } from "../types/recs";

const recsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_RECS:
      return action.payload

    case GET_CURRENT_REC:
      return state.find((el) => {
        if (el.id === action.payload) {
          return el
        }
        return el
      })

    default:
      return state;
  }
}

export default recsReducer

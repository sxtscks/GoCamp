import { AUTH_USER, SET_USER_DATA } from "../types/types";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return action.payload

      case AUTH_USER:
      return action.payload
  
    default:
      return state;
  }
}

export default userReducer

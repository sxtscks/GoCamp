import { CHANGE_RING } from "../types/ring";

const ringReducer = (state = 0, action) => {
    switch (action.type) {
      case CHANGE_RING:
        return action.payload
    
      default:
        return state;
    }
  }
  
  export default ringReducer;
  
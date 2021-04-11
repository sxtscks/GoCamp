import { CHANGE_RING, CHECKED_RING} from '../types/ring'

export const setRing = (numb) => {
  return {
    type: CHANGE_RING,
    payload: numb
    }
  }

  export const setCheckedRing = (todos) => {
    return {
      type:CHECKED_RING,
      payload:( Math.floor( 100/ todos?.length)* todos.filter(todo=> todo.confirmed)?.length),
    }
  }

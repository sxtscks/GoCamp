import { CHANGE_RING} from '../types/ring'

export const setRing = (numb) => {
  return {
    type: CHANGE_RING,
    payload: numb
    }
  }

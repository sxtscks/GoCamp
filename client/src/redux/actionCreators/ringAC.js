import { CHANGE_RING, CHECKED_RING} from '../types/ring'

export const setRing = (numb) => {
  return {
    type: CHANGE_RING,
    payload: numb
    }
  }

  export const setCheckedRing = (todos) => {
    console.log('important length todo',( (todos.filter(todo=> todo.confirmed && !todo.important).length) + (todos.filter(todo=> todo.confirmed && todo.important).length)) )
    return {
      type:CHECKED_RING,
      payload:(todos.length >= 1 ? ( Math.floor( 
        100  /  (todos.length + todos.filter(todo=> todo.important).length) *  ( (todos.filter(todo=> todo.confirmed).length) + (todos.filter(todo=> todo.confirmed && todo.important).length)) 
        )) : '100'),
    }
  }

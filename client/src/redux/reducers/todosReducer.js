import { ADD_TODO, EDIT_TODO, DELETE_TODO, SET_TODO} from '../types/todo'

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state, action.payload
      ]

    // case EDIT_TODO:
    //   return state.map(todo => {
    //     if (todo.id === action.payload) {

    //     }
    //   })
    case SET_TODO:
      return action.payload

    case DELETE_TODO:
      return state.filter(el => el.id !== action.payload)


    default:
      return state
  }
}

export default todosReducer;

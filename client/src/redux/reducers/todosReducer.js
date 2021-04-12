import { ADD_TODO, EDIT_TODO, DELETE_TODO, SET_TODO,IMPORTANT_TODO, CONFIRM_TODO} from '../types/todo'

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state, action.payload
      ]
    case CONFIRM_TODO:
      return [...state].map(todo => {
        if (todo.id === action.payload) {
          console.log('here ROOOT REDUCER>>>>>>', action.payload)
          console.log('here confirmed>>>>>>', todo.confirmed)
          todo.confirmed = !todo.confirmed
          return todo
        }
        return todo
      })
    case IMPORTANT_TODO:
      return [...state].map(todo => {
        if (todo.id === action.payload) {
          console.log('here confirmed>>>>>>', todo.important)
          todo.important = !todo.important
          return todo
        }
        return todo
      })
    // case EDIT_TODO:
    //   return state.map(todo => {
    //     if (todo.id === action.payload) {
// const todosReducer = (state = [], action) => {
//   switch (action.type) {
//     case ADD_TODO:
//       return [
//         ...state, action.payload
//       ]
//     case CONFIRM_TODO:
//       return [...state].map(todo=> {
//         if(todo.id === action.payload) {
//           console.log('here ROOOT REDUCER>>>>>>', action.payload)
//           console.log('here confirmed>>>>>>', todo.confirmed)
//          todo.confirmed = !todo.confirmed
//          return todo
//         }
//         return todo
//       })
//     case IMPORTANT_TODO:
//       return state.map(todo=> {
//         if(todo.id === action.payload.id) {
//           todo.important = !todo.important
//           return todo
//         }
//       })
//     // case EDIT_TODO:
//     //   return state.map(todo => {
//     //     if (todo.id === action.payload) {


//     //     }
//     //   })
//     case SET_TODO:
//       return {...state, test: action.payload}
//       return action.payload

//     case DELETE_TODO:
//       return state.filter(el => el.id !== action.payload)


    default:
      return state
  }
}

export default todosReducer

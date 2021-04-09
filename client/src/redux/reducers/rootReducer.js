import { combineReducers } from 'redux'
import todosReducer from './todosReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  user: userReducer,
  todos: todosReducer
})

export default rootReducer

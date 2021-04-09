import { combineReducers } from 'redux'
import todosReducer from './todosReducer'
import userReducer from './userReducer'
import ringReducer from './ringReducer'

const rootReducer = combineReducers({
  user: userReducer,
  todos: todosReducer,
  ring:ringReducer,
})

export default rootReducer

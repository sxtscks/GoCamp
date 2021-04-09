import { combineReducers } from 'redux'
import todosReducer from './todosReducer'
import tripReducer from './tripReducer'
import userReducer from './userReducer'
import ringReducer from './ringReducer'

const rootReducer = combineReducers({
  user: userReducer,
  todos: todosReducer,
  ring:ringReducer,
  trips: tripReducer,
})

export default rootReducer

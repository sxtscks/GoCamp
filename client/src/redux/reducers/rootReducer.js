import { combineReducers } from 'redux'
import todosReducer from './todosReducer'
import tripReducer from './tripReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  user: userReducer,
  todos: todosReducer,
  trips: tripReducer,
})

export default rootReducer

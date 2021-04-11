import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import { combineReducers } from 'redux'
import userReducer from "./reducers/userReducer";
import tripReducer from "./reducers/tripReducer";

const rootReducer = combineReducers({
  trip: tripReducer,
  user: userReducer,
})



const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
window.store = store;
export default store

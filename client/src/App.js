import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

import Navbar from './components/Navbar/Navbar.jsx';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import CurrentTrips from './components/CurrentTrips/CurrentTrips';
import ProfilePage from './components/ProfilePage/ProfilePage';

import Landing from './components/Landing/Landing'
import CurrentTripPage from "./components/CurrentTripPage/CurrentTripPage.jsx";
import TripPage from "./components/TripPage/TripPage.jsx";
import { useEffect } from 'react';

import firebase from './firebase/firebase'
import { useDispatch } from 'react-redux';
import { setUserData } from './redux/actionCreators/userAC';

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        dispatch(setUserData(user.displayName, user.refreshToken, user.uid))
      }
    })
  })
  return (
    <Router>
      <Navbar />
      {/* <ProfilePage /> */}
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>
        <Route path='/create'>
          <CurrentTripPage />
        </Route>
        <Route path='/currentTrips'>
          <CurrentTrips />
        </Route>
        <Route path='/recommendations'>
        <TripPage />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

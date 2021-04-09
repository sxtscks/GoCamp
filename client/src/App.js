import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Navbar from './components/Navbar/Navbar.jsx';
import Main from './components/Main/Main';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import CreateNewTrip from './components/CreateNewTrip/CreateNewTrip';
import CurrentTrips from './components/CurrentTrips/CurrentTrips';
import Recommendations from './components/Recommendations/Recommendations';
import Landing from './components/Landing/Landing'
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
        <Route path='/create'>
          <CreateNewTrip />
        </Route>
        <Route path='/currentTrips'>
          <CurrentTrips />
        </Route>
        <Route path='/recommendations'>
          <Recommendations />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

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
import {db} from './firebase/firebase'
import { useDispatch } from 'react-redux';
import { setUserData } from './redux/reducers/userReducer';
import AddTripForm from "./components/AddTrip/AddTripForm.js";

function App() {

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(user => {

  //     if (user) {
  //       db.collection('Users').add({
  //         name: user.displayName,
  //         email: user.email,
  //         image: '',
  //         uid: user.uid,
  //         lastTrips: [],
  //         futureTrips: [],
  //         friends: [],
  //       }).then((docRef) => dispatch(setUserData(user.displayName, user.refreshToken, user.uid, docRef.id)))
        
  //     }
  //   })
  // }, [])





  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/add'>
        <AddTripForm />
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
        <Route path='/recommendations/topic/:id'>
          <TripPage />
        </Route>
        <Route path='/recommendations/:id'>
          <RecommendsList />
        </Route>
        <Route path='/recommendations'>
          <CategoriesList />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

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
import Main from './components/Main/Main'

import Landing from './components/Landing/Landing'
import CurrentTripPage from "./components/CurrentTripPage/CurrentTripPage.jsx";
import TripPage from "./components/TripPage/TripPage.jsx";
import { useEffect } from 'react';

import firebase, { db } from './firebase/firebase'
import { useDispatch, useSelector } from 'react-redux';
// import { setUserData } from './redux/actionCreators/userAC';
import './App.css'

import { setUserData } from './redux/reducers/userReducer';
import AddTripForm from "./components/AddTrip/AddTripForm.js";
function App() {

  const dispatch = useDispatch()



  useEffect(() => {
    firebase.auth().onAuthStateChanged((async (user) => {
      console.log('user from app>>>>>>>>', user);
      dispatch(setUserData(user?.displayName, user?.refreshToken, user?.uid))
      if (user) {
        dispatch(setUserData(user?.displayName, user?.refreshToken, user?.uid))
        await updateDbUser(user)
      }
    }))
  }, [])



  const updateDbUser = async (sdkUser) => {
    await db.collection('Users').doc(sdkUser.uid).set(
      {
        name: sdkUser.displayName,
        email: sdkUser.email,
        // photoURL: sdkUser.photoURL,
      },
      { merge: true }
    );
  };


  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/login'>
          <div className="loginContainer">
            <Login />
          </div>
        </Route>
        <Route path='/add'>
          <AddTripForm />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path="/profile/:id">
          <ProfilePage />
        </Route>
        <Route path='/create/:id'>
          <CurrentTripPage />
        </Route>
        <Route path='/currentTrips'>
          <CurrentTrips />
        </Route>
        <Route path='/main'>
          <Main />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router >
  );
}

export default App;

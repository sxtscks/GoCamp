import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

import Navbar from './components/Navbar/Navbar.jsx';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import CurrentTrips from './components/CurrentTrips/CurrentTrips';
import Recommendations from './components/Recommendations/Recommendations';
import ProfilePage from './components/ProfilePage/ProfilePage';

import Landing from './components/Landing/Landing'
import CurrentTripPage from "./components/CurrentTripPage/CurrentTripPage.jsx";
function App() {
  return (
    <Router>
      <Navbar />
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

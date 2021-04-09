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
import ProfilePage from './components/ProfilePage/ProfilePage';

import Landing from './components/Landing/Landing'
import TripPage from "./components/TripPage/TripPage.jsx";
function App() {
  return (
    <Router>
      <Navbar />
      < TripPage />
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

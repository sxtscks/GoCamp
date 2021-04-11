import React from 'react'
import './Landing.css'
import Button from '@material-ui/core/Button';
import {
  Link,
} from "react-router-dom";
import TripMap from '../TripMap/TripMap';


function Landing() {
  return (
    <div className='landing'>
      <div className="container">
        <div className="firstScreen">
          <div className="textOne">
            <h1> Привет, дружок</h1>
          </div>
          <hr></hr>
          <div className="textTwo">
            <h2>добро пожаловать в наш уютный бложек</h2>
          </div>
          <hr></hr>
          <div className="textThree">
            <h1>Погнали в поход</h1>
            <Button className='buttonCreateTrip' component={Link} to="/create" variant="contained" color="transparent" style={{ backgroundColor: '#f46e16', color: 'white', fontWeight: 700 }}>
              Создать поездку
</Button>
          </div>
        </div>
      </div>
      <div>
        <div className="secondScreen">
          <div className="container secondPageContent">
            <h3>Вторая страница</h3>
          </div>
        </div>
      </div>
      <div>
        <div className="thirdScreen">
          <div className="container thirdPageContent">
            <h3>Третья страница</h3>
          </div>
        </div>
      </div>
      <div>
        <div className="footer">
          <div className="container footerContent">
            <h5>GoCamp x Elbrus Bootcamp</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing

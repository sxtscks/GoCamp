import React from 'react'
import './Landing.css'
import Button from '@material-ui/core/Button';
import {
  Link,
} from "react-router-dom";
import TripMap from '../TripMap/TripMap';
import Grid from '@material-ui/core/Grid';
import  icon1 from './campList.png'
import  icon2 from './checklistIcon.png'
import  icon3 from './autoList.png'
import  icon4 from './backpackList.png'



function Landing() {
  return (
    <div className='landing'>
      <div className="container">
        <div className="firstScreen">
        <div className="textOne">
          GoCamp
        </div>
     
          <div className="textTwo">
            <p>cоздай свое собственное путешествие</p>
          </div>
          <div className="textThree">

            <Button className='buttonCreateTrip1' component={Link} to="/create" variant="contained" color="transparent" style={{ backgroundColor: '#f46e16', color: 'white', fontWeight: 700, fontSize:20, borderRadius:10}}>
              Создать поездку
</Button>
          </div>
        </div>
      </div>
      <div>
        <div className="secondScreen">
          <div className="container secondPageContent d-flex flex-wrap">
            <div className="conflex d-flex">
              <div className="imgCont">
                <img src={icon2} style={{width:'150px'}}alt=""/>
              </div>
              <div className="txtCont">
                <span>планируй маршрут    и поездку
                </span>
              </div>
              </div>
            <div className="conflex d-flex">
              <div className="imgCont">
                <img src={icon4} style={{width:'150px'}}alt=""/>
              </div>
              <div className="txtCont">
                <span>грамотно организуй сборы</span>
              </div>
              </div>
            <div className="conflex d-flex">
              <div className="imgCont">
                <img src={icon3} style={{width:'150px'}}alt=""/>
              </div>
              <div className="txtCont">
                <span>автоматически считай затраты на бензин</span>
              </div>
              </div>
            <div className="conflex d-flex">
              <div className="imgCont">
                <img src={icon1} style={{width:'150px'}}alt=""/>
              </div>
              <div className="txtCont">
                <span>наслаждайся путешествием</span>
              </div>
              </div>
          </div>
        </div>
      </div>
      <div>
        <div className="thirdScreen">
          <div className="container thirdPageContent">
            <div className='thirdScreentext'>
              <p>  Вперед! Приключения ждут!</p> 
            </div>
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

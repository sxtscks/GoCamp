import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { Grid } from '@material-ui/core';
import CheckList from '../CheckList/CheckList'
import DateOfTrip from '../DateOfTrip/DateOfTrip'
import CheckRing from '../CheckRing/CheckRing'
import Form from '../Form/Form'
import './CurrentTripPage.css'
import BenzinForm from '../BenzinForm/BenzinForm';
import TripMap from '../TripMap/TripMap';
import { useSelector } from "react-redux";
import EndTrip from "../endTrip/endTrip";
import Chat from "../Chat/Chat";

import WaitingPerson from '../WaitingPerson/WaitingPerson'

function CurrentTripPage() {
  const [trip, setTrip] = useState({})
  const [waitLi, setWaitLi] = useState([])

  const user = useSelector(state => state.user)
  const { id } = useParams()



  useEffect(() => {
    console.log(id);
    let currentTrip
    if (user.uid) {
      db.collection('Users').doc(user.uid).collection('futureTrips').doc(id)
        .onSnapshot((doc) => {
          setTrip(doc.data())
          doc.data()?.waitingList?.map((el) => {
            db.collection('Users').doc(el).get().then((el) => setWaitLi(prev => [...prev, { ...el.data(), id: el.id }]))
          })
          
        })
    }
    return () => {
      currentTrip && currentTrip()
    }
  }, [user])

  const simpleArr = waitLi
  const sortedTrips = simpleArr.sort((a, b) => a.startDate - b.startDate).filter((item, i, ar) => ar.indexOf(item) === i)


  let cities = sortedTrips.reduce((acc, city) => {
    if (acc.map[city.id]) // если данный город уже был
      return acc; // ничего не делаем, возвращаем уже собранное

    acc.map[city.id] = true; // помечаем город, как обработанный
    acc.cities.push(city); // добавляем объект в массив городов
    return acc; // возвращаем собранное
  }, {
    map: {}, // здесь будут отмечаться обработанные города
    cities: [] // здесь конечный массив уникальных городов
  })
    .cities; // получаем конечный массив




  console.log('waitli>>>>>>>>>>>>>>>', waitLi)


  return (
    <div className="mainCont">

      <div className="tripPage">

        <div className="container">
          <Grid
            container spacing={2}
          // direction="row-reverse"
          // justify="space-between"
          // alignItems="center"
          >


            <Grid item sm={6} style={{ marginTop: 30 }} >
              <Grid item xs={12}>

                <Form tripId={id} />
              <EndTrip trip={trip} tripId={id}/>
              </Grid>

              <CheckList tripId={id} />
              {trip?.name ?

                <TripMap trip={trip} id={id} />

                :
                <span>netu</span>
              }
            </Grid>
            <Grid item
              spacing={2}
              direction="column"
              // justify="center"
              alignItems="center"
              style={{ marginLeft: 150 }}>

              <Grid item sm={8} xs={3} style={{ marginTop: 40, marginLeft: 30 }}>
                <DateOfTrip />
              </Grid>
              <Grid item xs={4}>
                <CheckRing tripId={id} />
              </Grid>
              <Grid item sm={7} style={{ marginTop: 70 }}>
                <BenzinForm trip={trip} id={id} />
              </Grid>
              <h5 style={{ color: 'white' }}>Едут: </h5>
              {/* {user.uid === trip.author ? } */}
              <Grid>
                {cities.length ? cities.map((el) =>
                  <Grid>

                    <WaitingPerson name={el.name} person={el} tripId={id} trip={trip} />

                  </Grid>




                )
                  : null}
              </Grid>
            </Grid>
            <div className="roadMap">
            </div>
            {/* <Chat id={id} /> */}
          </Grid>
        </div>
      </div>
    </div>

  );
}

export default CurrentTripPage;

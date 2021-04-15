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
import WaitingPerson from '../WaitingPerson/WaitingPerson'
function CurrentTripPage() {
  const user = useSelector(state => state.user)
  const { id } = useParams()
  const [trip, setTrip] = useState({})


  useEffect(() => {
    let currentTrip

    currentTrip = db.collection('Trips').doc(id)
      .onSnapshot((doc) => {
        let currentTrip = doc.data()

        Promise.all(currentTrip.waitingList.map(personId => db.collection('Users').doc(personId).get().then(doc => ({ ...doc.data(), id: doc.id }))))
          .then((waitingListPersons) => setTrip({ ...currentTrip, id: doc.id, waitingList: waitingListPersons }))


      })

    return () => {
      currentTrip && currentTrip()
    }
  }, [])


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
                <EndTrip trip={trip} tripId={id} />
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
                {trip.waitingList?.length ? trip.waitingList.map((el) =>
                  <Grid key={el.id}>
                    <WaitingPerson name={el.name} person={el} tripId={id} trip={trip} />
                  </Grid>
                )
                  : null}
              </Grid>
            </Grid>
            <div className="roadMap">
            </div>
            <Chat tripId={id} />
          </Grid>
        </div>
      </div>
    </div>
  );
}
export default CurrentTripPage;

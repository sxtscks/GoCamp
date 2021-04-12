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


function CurrentTripPage() {
  const [trip, setTrip] = useState({})
  const userFromLS = JSON.parse(window.localStorage.getItem('myApp'))

  const { id } = useParams()
  useEffect(() => {
    db.collection('Users').doc(userFromLS.key).collection('futureTrips').doc(id).get().then((doc)=> setTrip(doc.data()))

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

              </Grid>

              <CheckList  tripId={id}/>

              {/* <TripMap trip={trip} /> */}
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
                <CheckRing />
              </Grid>
              <Grid item sm={7} style={{ marginTop: 70 }}>
                {/* <BenzinForm trip={trip}/> */}
              </Grid>
              <h5 style={{ color: 'white' }}>Едут: </h5>
            </Grid>
            <div className="roadMap">
            </div>
          </Grid>
        </div>
      </div>
    </div>

  );
}

export default CurrentTripPage;

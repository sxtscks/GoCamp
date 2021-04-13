import { useSelector } from "react-redux"
import MainMap from '../MainMap/MainMap'
import CurrentTrips from '../CurrentTrips/CurrentTrips'
import './Main.css'
import { db } from "../../firebase/firebase"
import { useEffect, useState } from "react"

function Main() {

  const user = useSelector(state => state.user)
  const [trip, setTrip] = useState({})

  // useEffect(() => {
  //   db.collection('Users').collection('futureTrips').get().then((doc) => setTrip(doc.data()))
  // }, [])

  console.log(user, "USER STATE");
  return (
    <div className="d-flex">
      <div className="feedContainer">
        <CurrentTrips />
      </div>
      <div style={{ marginTop: '2.5%' }} className="mapContainer">
        {/* <MainMap /> */}
      </div>
    </div>
  )
}

export default Main

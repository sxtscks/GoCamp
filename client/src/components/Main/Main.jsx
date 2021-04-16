import { useSelector } from "react-redux"
import MainMap from '../MainMap/MainMap'
import CurrentTrips from '../CurrentTrips/CurrentTrips'
import './Main.css'
import { db } from "../../firebase/firebase"
import { useState, useEffect } from 'react'
import CurrentTripItem from '../CurrentTripItem/CurrentTripItem'
import Preloader from "../Preloader/Preloader"
import { useHistory } from "react-router-dom"
import firebase from '../../firebase/firebase';




function Main() {

  const user = useSelector(state => state.user)
  const [subscribeTrips, setSubscribeTrips] = useState([])
  const [myTrips, setMyTrips] = useState([])

  console.log({myTrips})
  const history = useHistory()

  useEffect(() => {
    let currentUsersTrips = db.collection("Trips")
      .onSnapshot((querySnapshot) => {
        setMyTrips(querySnapshot.docs.map(trip => ({...trip.data(), id: trip.id})))
      })
    return () => {
      currentUsersTrips && currentUsersTrips()
    }
  }, [])




  return (
    <div className="d-flex contMain" >
      <div className="feedContainer">
        {
          myTrips.length ?
          myTrips.map((trip) => <ul><CurrentTripItem key={trip.id} name={trip.name} id={trip.id} author={trip.author} waitingList={trip.waitingList} persons={trip.persons} /></ul>)
            : <div className='d-flex justify-content-center align-items-center' style={{paddingTop: '300px'}}>
              <Preloader />
            </div>
        }
      </div>
      <div  className="mapContainer">
        <MainMap myTrips={myTrips} />
      </div>
    </div>
  )
}

export default Main

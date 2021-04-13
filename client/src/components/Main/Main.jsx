import { useSelector } from "react-redux"
import MainMap from '../MainMap/MainMap'
import CurrentTrips from '../CurrentTrips/CurrentTrips'
import './Main.css'
import { db } from "../../firebase/firebase"
import { useState, useEffect } from 'react'
import CurrentTripItem from '../CurrentTripItem/CurrentTripItem'



function Main() {

  const user = useSelector(state => state.user)
  const [tripMap, setTripMap] = useState([])
  const [idis, setIdis] = useState([])
  const [myTrips, setMyTrips] = useState([])


  useEffect(() => {
    let currentUsersTrips
    if(user.uid) {

     currentUsersTrips = db.collection("Users")
        .onSnapshot((querySnapshot) => {
          querySnapshot.docs.map((trip) => db.collection('Users').doc(trip.id)
            .collection('futureTrips')
            .onSnapshot((querySnapshot) => {
              setMyTrips((prev) => [...prev, ...querySnapshot.docs.map((trip) => ({ ...trip.data(), id: trip.id }))])
            })
          )
        })
    }

    return () => {
      currentUsersTrips && currentUsersTrips()
    }



  }, [user])

  const sortedTrips = myTrips.sort((a, b) => a.startDate - b.startDate)


  console.log('idis', myTrips)




  return (
    <div className="d-flex">
      <div className="feedContainer">
        {/* <CurrentTrips />  */}
        {/* {idis.map((e)=> <p>{e.name}</p>)} */}
        {
          sortedTrips.length ? 
           sortedTrips.map((trip) => {
           return  <ul><CurrentTripItem key={trip.id} name={trip.name} id={trip.id} author={trip.author} /></ul>
            
           }) : <h3>Список пуст. Создайте новую поездку!</h3>
        }
      </div>
      <div style={{ marginTop: '2.5%' }} className="mapContainer">
        {myTrips[0]?.author ?
         <MainMap myTrips={myTrips} />  : 
       <p>jkkjk</p>
        } 
        {/* <MainMap myTrips={myTrips} /> */}
      </div>
    </div>
  )
}

export default Main

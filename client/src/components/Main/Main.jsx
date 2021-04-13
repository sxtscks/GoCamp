import { useSelector } from "react-redux"
import MainMap from '../MainMap/MainMap'
import CurrentTrips from '../CurrentTrips/CurrentTrips'
import './Main.css'
import { db } from "../../firebase/firebase"
import {useState, useEffect} from 'react'
import CurrentTripItem from '../CurrentTripItem/CurrentTripItem'



function Main() {

  const user = useSelector(state => state.user)
  const [myTrips, setMyTrips] = useState([])


  useEffect(() => { 
      let currentUsersTrips = db.collection("Users")
      .onSnapshot((querySnapshot) => {
          querySnapshot.docs.map((trip) => db.collection('Users').doc(trip.id)
        .collection('futureTrips')
        .onSnapshot((querySnapshot) => { 
          setMyTrips((prev)=> [...prev,...querySnapshot.docs.map((trip) => ({ ...trip.data(), id: trip.id }))])
        })
          )})
    return () => {
      currentUsersTrips && currentUsersTrips()
    }
    },[])
   

    const simpleArr = myTrips
    const sortedTrips = simpleArr.sort((a, b) => a.startDate - b.startDate).filter((item, i, ar) => ar.indexOf(item) === i)

    let filerTrips = [];
    simpleArr.filter(function(item){
      let i = filerTrips.findIndex(x => (x.name == item.name && x.date == item.date && x.amt == item.amt));
      if(i <= -1){
        filerTrips.push(item);
      }
      return null;
    });

    console.log('idis',myTrips)



  
  return (
    <div className="d-flex">
      <div className="feedContainer">
        {
        filerTrips.length ?
        filerTrips.map((trip) => <ul><CurrentTripItem key={trip.id} name={trip.name} persons={trip.persons} place={trip.place} startDate={trip.startDate} endDate={trip.endDate} id={trip.id} /></ul>)
          : <h3>Список пуст. Создайте новую поездку!</h3>
      }
      </div>
      <div style={{ marginTop: '2.5%' }} className="mapContainer">
        {/* <MainMap /> */}
      </div>
    </div>
  )
}

export default Main

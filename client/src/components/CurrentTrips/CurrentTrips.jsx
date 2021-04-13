import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import CurrentTripItem from '../CurrentTripItem/CurrentTripItem'
import { db } from "../../firebase/firebase";


function CurrentTrips() {

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const [myTrips, setMyTrips] = useState([])

  useEffect(() => {
    const currentTrips = db.collection('Users').doc(user.uid)
      .collection('futureTrips')
      .onSnapshot((querySnapshot) => {
        setMyTrips(querySnapshot.docs.map((trip) => ({ ...trip.data(), id: trip.id })))
      })
    return () => {
      currentTrips()
    }

  }, [])

  console.log(myTrips);

  return (
    <div style={{ marginTop: '5%' }} className="container">
      <div>
        <h2>Текущие Поездки:</h2>
      </div>
      {
        myTrips.length ?
          myTrips.map((trip) => <ul><CurrentTripItem key={trip.id} name={trip.name} persons={trip.persons} place={trip.place} startDate={trip.startDate} endDate={trip.endDate} id={trip.id} /></ul>)
          : <h3>Список пуст. Создайте новую поездку!</h3>
      }
    </div>
  )
}

export default CurrentTrips

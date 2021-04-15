import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import CurrentTripItem from '../CurrentTripItem/CurrentTripItem'
import { db } from "../../firebase/firebase";


function CurrentTrips() {

  const user = useSelector(state => state.user)


  const [myTrips, setMyTrips] = useState([])



  useEffect(() => {
    let currentUser
    currentUser = db.collection("Trips")
      .onSnapshot((querySnapshot) => {
        setMyTrips(querySnapshot.docs.map(trip => ({ ...trip.data(), id: trip.id })))
      })
    return () => {
      currentUser && currentUser()
    }
  }, [])

  const filteredArr = myTrips.filter((trip) => trip.persons.includes(user.uid))

  const sortedTrips = filteredArr.sort((a, b) => a.startDate - b.startDate)



  return (
    <>
      <div style={{ marginTop: '7%' }} className="container">
        {
          sortedTrips.length ?
            sortedTrips.map((trip) => <ul><CurrentTripItem key={trip.id} name={trip.name} id={trip.id} /></ul>)
            : <div className='d-flex justify-content-center align-items-center' style={{ padding: '370px' }}>
              <h3>Список пуст. Создай новую поездку!</h3>
            </div>
        }
      </div>
    </>
  )
}

export default CurrentTrips

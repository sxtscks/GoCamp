import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { db } from '../../firebase/firebase'

const EndTrip = ({ trip, tripId }) => {

  const user = useSelector(state => state.user)
  const history = useHistory()

  async function endTrip() {
    db.collection('Trips').doc(tripId).delete()
    db.collection('LastTrips').add({
      ...trip
    })

    // persons.map((person)=> {
    //   db.collection('Users').doc(person).collection('futureTrips').doc(tripId).delete()
    //   db.collection('Users').doc(user.uid).collection('lastTrips').add({
    //     ...trip
    //   })
    // })
  }
  const submitHandler = (e) => {
    e.preventDefault()
    endTrip()
    history.push('/currentTrips')
  }
  return (
    <button onClick={submitHandler} className="btn mx-3" style={{ height: 38, fontFamily: 'Montserrat', margin: 32, fontWeight: 700, color: 'white', fontSize: 15, background: '#F46E16' }}>Завершить поездку</button>
  );
}

export default EndTrip;

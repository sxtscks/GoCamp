import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { db } from '../../firebase/firebase'

const EndTrip = ({ tripId, trip }) => {

  const user = useSelector(state => state.user)
  const history = useHistory()
  async function endTrip() {
    db.collection('Users').doc(user.uid).collection('futureTrips').doc(tripId).delete()
    await db.collection('Users').doc(user.uid).collection('lastTrips').add({
      ...trip
    })
  }
  const submitHandler = (e) => {
    e.preventDefault()
    endTrip()
     history.push('/')
  }
  return (
    <button onClick={submitHandler} >Завершить поездку</button>
  );
}

export default EndTrip;

import React, { useEffect, useState } from 'react'
import Achievements from './Achievements/Achievements'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import TripsHistory from './TripsHistory/TripsHistory'
import { useSelector } from 'react-redux'
import { db } from '../../firebase/firebase'
const ProfilePage = () => {
  const [user, setUser] = useState({});
  const userFromState = useSelector(state => state.user)
  const [futureTrips, setFutureTrips] = useState([]);
  const [lastTrips, setLastTrips] = useState([]);
  useEffect(() => {
    let currentUser
    if (userFromState.uid) {
      currentUser = db.collection('Users').doc(userFromState.uid)
        .onSnapshot((doc) => setUser(doc.data()))
    }
  }, [userFromState])
  useEffect(() => {
    let currentUser
    if (userFromState.uid) {
      currentUser = db.collection('Users').doc(userFromState.uid).collection("futureTrips")
        .onSnapshot((querySnapshot) => {
          setFutureTrips(querySnapshot.docs.map(el => ({ ...el.data(), id: el.id })))
        })
    }
  }, [userFromState])
  useEffect(() => {
    let currentUser
    if (userFromState.uid) {
      currentUser = db.collection('Users').doc(userFromState.uid).collection("lastTrips")
        .onSnapshot((querySnapshot) => {
          setLastTrips(querySnapshot.docs.map(el => ({ ...el.data(), id: el.id })))
        })
    }
  }, [userFromState])
  return (
    <div>
      <ProfileInfo user={user} />
      <Achievements />
      {/* <Grid container direction="row" justify="center" alignItems="center" flexWrap="nowrap"> */}
      <TripsHistory userFinishedTrips={lastTrips} userFutureTrips={futureTrips} />
      {/* <FriendsList /> */}
      {/* </Grid> */}
    </div>
  )
}
export default ProfilePage

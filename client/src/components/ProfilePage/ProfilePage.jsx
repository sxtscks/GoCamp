import React, { useEffect, useState } from 'react'
import Achievements from './Achievements/Achievements'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import TripsHistory from './TripsHistory/TripsHistory'
import { useSelector } from 'react-redux'
import { db } from '../../firebase/firebase'
const ProfilePage = () => {
  const [user, setUser] = useState({});
  const userFromState = useSelector(state => state.user)
  const userFinishedTrips = useSelector(state => state.user.finishedTrips)
  const userFutureTrips = useSelector(state => state.user.futureTrips)
  useEffect(() => {
    let currentUser
    if (userFromState.uid) {
      currentUser = db.collection('Users').doc(userFromState.uid)
        .onSnapshot((doc) => setUser(doc.data()))
    }
  }, [userFromState])
  return (
    <div>
      <ProfileInfo user={user} />
      <Achievements />
      {/* <Grid container direction="row" justify="center" alignItems="center" flexWrap="nowrap"> */}
      <TripsHistory userFinishedTrips={userFinishedTrips} userFutureTrips={userFutureTrips} />
      {/* <FriendsList /> */}
      {/* </Grid> */}
    </div>
  )
}
export default ProfilePage

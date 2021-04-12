import React from 'react'
import Achievements from './Achievements/Achievements'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import TripsHistory from './TripsHistory/TripsHistory'
import { useSelector } from 'react-redux'
const ProfilePage = () => {
  const userFinishedTrips = useSelector(state => state.user.finishedTrips)
  const userFutureTrips = useSelector(state => state.user.futureTrips)
  return (
    <div>
      <ProfileInfo />
      <Achievements />
      {/* <Grid container direction="row" justify="center" alignItems="center" flexWrap="nowrap"> */}
      <TripsHistory userFinishedTrips={userFinishedTrips} userFutureTrips={userFutureTrips} />
      {/* <FriendsList /> */}
      {/* </Grid> */}
    </div>
  )
}
export default ProfilePage

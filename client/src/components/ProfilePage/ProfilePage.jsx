import React from 'react'
import Achievements from './Achievements/Achievements'
import FriendsList from './FriendsList/FriendsList'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import TripsHistory from './TripsHistory/TripsHistory'
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';

const ProfilePage = () => {
  return (
    <div>
      <ProfileInfo />
      <Achievements />
      <Grid container direction="row" justify="center" alignItems="center" flexWrap="nowrap">
          <TripsHistory />
          <FriendsList />
      </Grid>
    </div>
  )
}

export default ProfilePage

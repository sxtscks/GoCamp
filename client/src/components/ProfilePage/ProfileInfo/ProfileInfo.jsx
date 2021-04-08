import React from 'react'
import AvatarPicture from './Avatar/Avatar'
import AboutMe from './AboutMe/AboutMe'
import { Grid } from '@material-ui/core';

const ProfileInfo = () => {
  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <AvatarPicture />
        <AboutMe />
      </Grid>
    </div>
  )
}

export default ProfileInfo

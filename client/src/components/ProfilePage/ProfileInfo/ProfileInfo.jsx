import React from 'react'
import AvatarPicture from './Avatar/Avatar'
import AboutMe from './AboutMe/AboutMe'
import { Grid } from '@material-ui/core';
const ProfileInfo = ({ user }) => {
  return (
    <div style={{ marginTop: '5%' }}>
      <Grid container direction="row" justify="center" alignItems="center">
        <AvatarPicture photo={user.photo} />
        <AboutMe name={user.name} telegram={user.phone}/>
      </Grid>
    </div>
  )
}
export default ProfileInfo

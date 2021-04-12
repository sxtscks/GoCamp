import React from 'react'
import AvatarPicture from './Avatar/Avatar'
import AboutMe from './AboutMe/AboutMe'
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux'
const ProfileInfo = () => {
  const userName = useSelector(state => state.user.displayName)
  const userPhoto = useSelector(state => state.user.image)
  return (
    <div style={{marginTop: '5%'}}>
      <Grid container direction="row" justify="center" alignItems="center">
        <AvatarPicture userPhoto={userPhoto}/>
        <AboutMe userName={userName}/>
      </Grid>
    </div>
  )
}
export default ProfileInfo

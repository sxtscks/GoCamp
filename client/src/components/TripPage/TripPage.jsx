import React from 'react'
import TripFacts from './TripFacts/TripFacts'
import TripInfo from './TripInfo/TripInfo'
import TripPhotoSlider from './TripPhotoSlider/TripPhotoSlider'
import { Grid } from '@material-ui/core';

const TripPage = () => {
  return (
    <div style={{ marginTop: '5%' }}>
      <Grid container direction="row" justify="center" alignItems="center" flexWrap="nowrap">
        <TripPhotoSlider />
        <TripInfo />
      </Grid>
      <TripFacts />
    </div>
  )
}
export default TripPage

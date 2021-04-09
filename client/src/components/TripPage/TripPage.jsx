import TripInfo from './TripInfo/TripInfo'
import TripPhotoSlider from './TripPhotoSlider/TripPhotoSlider'
import { Grid } from '@material-ui/core';
import TripFacts from './TripFacts/TripFacts';

const TripPage = () => {
  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center" flexWrap="nowrap">
        <TripPhotoSlider />
        <TripInfo />
      </Grid>
      <TripFacts />
    </div >
  )
}

export default TripPage

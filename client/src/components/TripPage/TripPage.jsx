import React from 'react'
import TripFacts from './TripFacts/TripFacts'
import TripInfo from './TripInfo/TripInfo'
import TripPhotoSlider from './TripPhotoSlider/TripPhotoSlider'
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

const TripPage = () => {

  const { id } = useParams()

  const categoriesList = useSelector(state => state.recommends.find((e => e.topics.find(el => el.id === id))))
  const myTopic = categoriesList.topics.find((el) => el.id === id)

  return (
    <div style={{ marginTop: '5%' }}>
      <Grid container direction="row" justify="center" alignItems="center" flexWrap="nowrap">
        <TripPhotoSlider />
        <TripInfo myTopic={myTopic} />
      </Grid>
      <TripFacts myTopic={myTopic} />
    </div>
  )
}
export default TripPage

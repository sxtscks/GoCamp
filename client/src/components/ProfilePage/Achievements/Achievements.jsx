import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import iconTent from './Дизайн без названия (4).png'
import iconFoot from './Дизайн без названия (5).png'
import iconLamp from './Дизайн без названия (6).png'
import { db } from '../../../firebase/firebase';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
}));

export default function Achievements() {
  const classes = useStyles();

  // 2 > lastTrips.length > 0
  // function checkLastTrip () {
  //   if (lastTrips.length > 0) {
  //       setAchievement(true)
  //   }
  // }
  // checkLastTrip()

  const [lastTrips, setLastTrips] = useState([])
  const user = useSelector(state => state.user)

  useEffect(() => {
    let currentUser
    currentUser = db.collection("LastTrips")
      .onSnapshot((querySnapshot) => {
        setLastTrips(querySnapshot.docs.map(trip => ({ ...trip.data(), id: trip.id })))
      })
    return () => {
      currentUser && currentUser()
    }
  }, [])

  const lastTripObj = lastTrips.find((trip) => trip.persons.includes(user.uid))


  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <div className={classes.root}>
        {/* <Avatar alt="Tent" src={iconTent} className={classes.large} />
        <Avatar alt="Foot" src={iconFoot} className={classes.large} /> */}
        {
          lastTripObj ? <Avatar alt="Lamp" src={iconLamp} className={classes.large} /> : null

        }

      </div>
    </Grid>
  );
}

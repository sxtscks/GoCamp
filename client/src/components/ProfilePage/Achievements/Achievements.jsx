import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import iconTent from './Дизайн без названия (4).png'
import iconFoot from './Дизайн без названия (5).png'
import iconLamp from './Дизайн без названия (6).png'

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

export default function Achievements({ lastTrips }) {
  const [achievement, setAchievement] = useState(false)
  const classes = useStyles();

  // 2 > lastTrips.length > 0
  // function checkLastTrip () {
  //   if (lastTrips.length > 0) {
  //       setAchievement(true)
  //   }
  // }
  // checkLastTrip()
  console.log(lastTrips);



  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <div className={classes.root}>
        {/* <Avatar alt="Tent" src={iconTent} className={classes.large} />
        <Avatar alt="Foot" src={iconFoot} className={classes.large} /> */}
        {
          (lastTrips[0]?.author) ?  <Avatar alt="Lamp" src={iconLamp} className={classes.large} /> : null

        }
       
      </div>
    </Grid>
  );
}

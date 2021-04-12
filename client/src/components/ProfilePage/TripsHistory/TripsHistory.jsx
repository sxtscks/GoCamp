import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Trip from './Trip/Trip';
import { Grid } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
export default function TripsHistory({ userFinishedTrips, userFutureTrips }) {
  const classes = useStyles();
  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center" flexWrap="nowrap">
        <List className={classes.root}>
          <h2>Past Trips:</h2>
          {userFinishedTrips
            ? userFinishedTrips.map((trip, index) => <Trip key={index} trip={trip} />)
            : 'No trips before'
          }
        </List>
        <List className={classes.root}>
          <h2>Future Trips:</h2>
          {userFutureTrips
            ? userFutureTrips.map((trip, index) => <Trip key={index} trip={trip} />)
            : 'Create your next trip'
          }
        </List>
      </Grid>
    </div>
  );
}

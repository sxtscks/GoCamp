import React from 'react';
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

export default function Achievements() {
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <div className={classes.root}>
        <Avatar alt="Tent" src={iconTent} className={classes.large}/>
        <Avatar alt="Foot" src={iconFoot} className={classes.large}/>
        <Avatar alt="Lamp" src={iconLamp} className={classes.large}/>
      </div>
    </Grid>
  );
}

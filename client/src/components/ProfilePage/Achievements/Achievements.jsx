import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

export default function Achievements() {
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <div className={classes.root}>
        <div>
          <h2>Achievements: </h2>
        </div>
        <Avatar alt="Remy Sharp" src="https://yt3.ggpht.com/ytc/AAUvwni9fc9ER7WhFQQdhJJec_x0Y-l7ufpVjd7E7I0p=s900-c-k-c0x00ffffff-no-rj" className={classes.large}/>
        <Avatar alt="Travis Howard" src="https://i.pinimg.com/originals/10/76/b4/1076b43d1fdc9c6487b648688ff6ac69.jpg" className={classes.large}/>
        <Avatar alt="Cindy Baker" src="https://www.nastol.com.ua/download.php?img=201812/1920x1200/nastol.com.ua-310658.jpg" className={classes.large}/>
      </div>
    </Grid>
  );
}

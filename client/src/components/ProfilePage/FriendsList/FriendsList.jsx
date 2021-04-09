import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

export default function FriendsList() {
  const classes = useStyles();

  return (
    <Box className={classes.root} flexWrap="wrap">
      <h2>FriendsList</h2>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
    </Box>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { db } from '../../../../firebase/firebase'
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
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
}));
export default function AvatarPicture(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {props.userPhoto ?
        <Avatar alt="Remy Sharp" src={props.userPhoto} className={classes.large} />
        :
        <Avatar alt="Remy Sharp" src="https://img2.pngio.com/person-icon-computer-icons-user-profile-symbol-person-free-png-user-avatars-png-910_512.png" className={classes.large} />
      }
    </div>
  );
}

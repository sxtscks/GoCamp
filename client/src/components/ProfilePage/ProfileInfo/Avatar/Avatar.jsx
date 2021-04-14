import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { db } from '../../../../firebase/firebase'
import firebase from '../../../../firebase/firebase'
import { useSelector } from 'react-redux';
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
  const userIdInFirebase = useSelector(state => state.user.uid)
  const [fileUrl, setFileUrl] = useState(null);
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file)
    setFileUrl(await fileRef.getDownloadURL());
  };
  const onSubmit = (e) => {
    e.preventDefault();
    db.collection("Users").doc(userIdInFirebase).set({
      photo: fileUrl
    }, { merge: true })
  };
  return (
    <div className={classes.root}>
      {props.photo ?
        <Avatar alt="Remy Sharp" src={props.photo} className={classes.large} />
        :
        <div>
          <Avatar alt="Remy Sharp" src="https://img2.pngio.com/person-icon-computer-icons-user-profile-symbol-person-free-png-user-avatars-png-910_512.png" className={classes.large} />
          <form onSubmit={onSubmit}>
            <div>
              <input type="file" onChange={onFileChange} />
            </div>
            <button>Загрузить фото</button>
          </form>
        </div>
      }
    </div>
  );
}

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
    width: theme.spacing(19),
    height: theme.spacing(19),
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
}));
export default function AvatarPicture({ user }) {
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
      {user.photo ?
        <Avatar alt="Remy Sharp" src={user.photo} className={classes.small} />
        :
        <div className='avatarBox'>
          <Avatar alt="Remy Sharp" src="https://img2.pngio.com/person-icon-computer-icons-user-profile-symbol-person-free-png-user-avatars-png-910_512.png" className={classes.small} />
          <form onSubmit={onSubmit}>
            <div>
              <div class="example-2">
                <div class="form-group mt-3">
                  <input type="file" name="file" id="file" class="input-file" onChange={onFileChange} />
                  <label for="file" class="btn btn-tertiary js-labelFile">
                    <span class="js-fileName">Загрузить файл</span>
                  </label>
                </div>
              </div>
            </div>
            <button className="btn btn-tertiary">Загрузить фото</button>
          </form>
        </div>
      }
    </div>
  );
}

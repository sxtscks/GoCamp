import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector } from 'react-redux';
import { db } from '../../../../firebase/firebase'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));
export default function AboutMe(props) {
  const [editModeTel, setEditModeTel] = useState(false);
  const [editModeAbout, setEditModeAbout] = useState(false);
  const userIdInFirebase = useSelector(state => state.user.uid)
  const activateEditMode = () => {
    setEditModeTel(true);
  }
  const deactivateEditMode = () => {
    setEditModeTel(false);
  }
  const activateEditModeAbout = () => {
    setEditModeAbout(true);
  }
  const deactivateEditModeAbout = () => {
    setEditModeAbout(false);
  }
  const onTelephoneChange = (event) => {
    let userTelephone = event.target.value;
    db.collection("Users").doc(userIdInFirebase).set({
      phone: userTelephone
    }, { merge: true })
  }
  const onAboutUserChange = (event) => {
    let aboutUserText = event.target.value;
    db.collection("Users").doc(userIdInFirebase).set({
      aboutMe: aboutUserText
    }, { merge: true })
  }
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  return (
    <div className={classes.root}>
      <div className={classes.demo}>
        <List dense={dense}>
          <ListItem >
            <ListItemText
              primary={'Телефон:'}
              secondary={
                !props.telegram
                  ?
                  !editModeTel
                    ? <div>
                      <span onClick={activateEditMode}>{props.telegram} Введите номер телефона</span>
                    </div>
                    : <div>
                      <input autoFocus={true} onBlur={deactivateEditMode} value={props.telegram} onChange={onTelephoneChange} />
                    </div>
                  :
                  !editModeTel
                    ? <div>
                      <span onClick={activateEditMode}>{props.telegram}</span>
                    </div>
                    : <div>
                      <input autoFocus={true} onBlur={deactivateEditMode} value={props.telegram} onChange={onTelephoneChange} />
                    </div>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={'О пользователе:'}
              secondary={
                !props.aboutUser
                  ?
                  !editModeAbout
                    ? <div>
                      <span onClick={activateEditModeAbout}>{props.aboutUser} Расскажите о себе</span>
                    </div>
                    : <div>
                      <input autoFocus={true} onBlur={deactivateEditModeAbout} value={props.aboutUser} onChange={onAboutUserChange} />
                    </div>
                  :
                  !editModeAbout
                    ? <div>
                      <span onClick={activateEditModeAbout}>{props.aboutUser}</span>
                    </div>
                    : <div>
                      <input autoFocus={true} onBlur={deactivateEditModeAbout} value={props.aboutUser} onChange={onAboutUserChange} />
                    </div>
              }
            />
          </ListItem>
        </List>
      </div>
    </div>
  );
}

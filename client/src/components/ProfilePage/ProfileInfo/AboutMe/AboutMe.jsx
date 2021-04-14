import React, { useState } from 'react';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector } from 'react-redux';
import { db } from '../../../../firebase/firebase'
import { ThemeProvider } from 'styled-components';
const theme = createMuiTheme({
  typography: {
    fontSize: 10
  },

})
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 190,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(3, 0, 1),
    fontSize: "18px",
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
              disableTypography='true'
              className={classes.title}
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
              disableTypography='true'
              className={classes.title}
              primary={'О себе:'}
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

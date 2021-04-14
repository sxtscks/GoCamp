import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { oneOfType } from 'prop-types';
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
  const [editMode, setEditMode] = useState(false);
  const userIdInFirebase = useSelector(state => state.user.uid)
  const activateEditMode = (event) => {
    setEditMode(true);
  }
  const deactivateEditMode = () => {
    setEditMode(false);
  }
  const onTelephoneChange = (event) => {
    let userTelephone = event.target.value;
    db.collection("Users").doc(userIdInFirebase).set({
      phone: userTelephone
    }, { merge: true })
  }
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
          <Typography variant="h6" className={classes.title}>
            {props.name}
          </Typography>
          <div className={classes.demo}>
            <List dense={dense}>
              <ListItem>
                <ListItemText
                  primary={'Телефон:'}
                  secondary={
                    !props.telegram
                      ?
                      !editMode
                        ? <div>
                          <span onClick={activateEditMode}>{props.telegram} Введите номер телефона</span>
                        </div>
                        : <div>
                          <input autoFocus={true} onBlur={deactivateEditMode} value={props.telegram} onChange={onTelephoneChange} />
                        </div>
                      :
                      !editMode
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
                  primary={'user.something2'}
                  secondary={secondary ? 'Secondary text' : null}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={'user.something3'}
                  secondary={secondary ? 'Secondary text' : null}
                />
              </ListItem>
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

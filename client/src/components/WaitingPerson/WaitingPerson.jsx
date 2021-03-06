import React from 'react'
import { useSelector } from "react-redux";
import firebase, { db } from '../../firebase/firebase'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import PriorityHighSharpIcon from '@material-ui/icons/PriorityHighSharp';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';

import {
  Link,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

function WaitingPerson({ person, tripId, trip }) {
  const classes = useStyles();
  const user = useSelector(state => state.user)


  const handlerConfirm = async (e) => {
    e.preventDefault()
    console.log('tut');
    db.collection('Trips').doc(tripId).update({
      "persons": firebase.firestore.FieldValue.arrayUnion(person.id),
      "waitingList": firebase.firestore.FieldValue.arrayRemove(person.id),
      "timeModified": Date.now()
    })

  }


  const handlerCansel = (e) => {
    e.preventDefault()
    db.collection('Trips').doc(tripId).update({
      "waitingList": firebase.firestore.FieldValue.arrayRemove(person.id),
      "timeModified": Date.now()
    })
      .catch((err) => console.log(err))
  }


  return (
    <div className='d-flex'>
      {/* <Link to="main"> */}
        <Avatar alt="Remy Sharp" src={person.photo} className={classes.orange}>
          {/* {person.name.slice(0, 1)} */}
        </Avatar>
      {/* </Link> */}
      <p style={{ color: 'white' }}>{person.name}</p>
      <div className='buttonCont'>
        <button className="btn mx-1" onClick={handlerConfirm} style={{ fontFamily: 'Montserrat', fontWeight: 400, color: 'white', fontSize: 10, background: '#65A414' }}> <DoneOutlineOutlinedIcon fontSize="small" style={{ color: null }} /></button>
        <button className="btn mx-1" onClick={handlerCansel} style={{ fontFamily: 'Montserrat', fontWeight: 400, color: 'white', fontSize: 10, background: '#f23333' }}> <DeleteOutlineOutlinedIcon fontSize="small" /></button>
      </div>
    </div>
  )
}

export default WaitingPerson

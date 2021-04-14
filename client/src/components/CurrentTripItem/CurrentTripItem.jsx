import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddBoxIcon from '@material-ui/icons/AddBox';
import firebase from '../../firebase/firebase';
import {
  Link, useHistory, useLocation,
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { db } from '../../firebase/firebase';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    background: 'whitesmoke',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontFamily: 'Montserrat',
    fontWeight: '700'
  },
  pos: {
    marginBottom: 12,
    fontFamily: 'Montserrat',
  },
});

export default function CurrentTripItem({ name, id, author, persons }) {
  const user = useSelector(state => state.user)
  const classes = useStyles();

  let location = useLocation()
  let history = useHistory()


  const handlerRequest = (e) => {
    e.preventDefault()
    if (JSON.stringify(user) !== '{}') {
      db.collection('Users').doc(author).collection('futureTrips').doc(id).update({
        'waitingList': firebase.firestore.FieldValue.arrayUnion(user.uid)
      })
    } else {
      history.push('/login')
    }
  }


  return (
    <Card className={classes.root}>
      <CardContent>
        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
          {author}
        </Typography> */}
        <Typography variant="h5" component="h2" className={classes.title}>
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {/* {startDate.toDate().toDateString()} - {endDate.toDate().toDateString()} */}
        </Typography>
        {
          location.pathname === '/currentTrips' ?
            <Typography variant="body2" component="p">
              {
                persons?.length ?
                  <div>
                    Количество людей: {persons.length}
                    <br />
                Едут: {persons.join(', ')}
                  </div>
                  : <p>Возьми кого-нибудь с собой!</p>
              }
            </Typography>
            : ''
        }
      </CardContent>
      <CardActions>
        {
          location.pathname === '/main' ?
            persons.includes(user.uid) ?
              <Button className='buttonCreateTrip' component={Link} to={`/create/${id}`} variant="contained" color="transparent" style={{ backgroundColor: '#f46e16', color: 'white', fontWeight: 700 }}>
                Подробнее
              </Button>
              :
              <Button className='buttonCreateTrip' component={Link} onClick={handlerRequest} to={`/create/${id}`} variant="contained" color="transparent" style={{ backgroundColor: '#f46e16', color: 'white', fontWeight: 700 }}>
                Оставить заявку
              </Button>
            :
            <Button className='buttonCreateTrip' component={Link} to={`/create/${id}`} variant="contained" color="transparent" style={{ backgroundColor: '#f46e16', color: 'white', fontWeight: 700 }}>
              Подробнее
          </Button>
        }
      </CardActions>
    </Card>
  );
}

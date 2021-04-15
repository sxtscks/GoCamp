import React, { useEffect, useState } from 'react';
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
import bg1 from './backgrounds/bg1.png'
import bg2 from './backgrounds/bg2.png'
import bg3 from './backgrounds/bg3.png'
import bg4 from './backgrounds/bg4.png'
import bg5 from './backgrounds/bg5.png'
import Avatar from '@material-ui/core/Avatar';



  let arr = [bg1,bg2,bg3,bg4,bg5]
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  let randBg = Math.floor(getRandomArbitrary(0,arr.length))


const useStyles = makeStyles({
  root: {
    minWidth: 375,
    minHeight:170,
    // background:'url('+bg1+') center',
    background: 'linear-gradient(90deg, rgba(245,245,245,1) 0%, rgba(245,245,245,1) 43%, rgba(255,255,255,0.2091211484593838) 70%), url('+arr[randBg]+') center',
    backgroundSize: 'cover',
  
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

export default function CurrentTripItem({ name, id, author, persons, waitingList }) {
  const [request, setRequest] = useState(false)
  const [people, setPeople] = useState([])

  const user = useSelector(state => state.user)
  const classes = useStyles();

  let location = useLocation()
  let history = useHistory()




  let arr = [bg1,bg2,bg3,bg4,bg5]
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  let randBg = Math.floor(getRandomArbitrary(0,arr.length))



  useEffect(() => {
    if (Array.isArray(persons))

      Promise.all(persons.map(persId => db.collection('Users').doc(persId).get().then((person) => person.data())))
        .then((persons) => setPeople(persons))

  }, [persons])
  console.log(people);


  const handlerRequest = (e) => {
    // e.preventDefault()
    if (JSON.stringify(user) !== '{}') {
      db.collection('Trips').doc(id).update({
        'waitingList': firebase.firestore.FieldValue.arrayUnion(user.uid),
        'timeModified': Date.now()
      })
    } else {
      history.push('/login')
    }
  }


  return (
    <Card style={{width: 775,minHeight:190,  background: 'linear-gradient(90deg, rgba(245,245,245,1) 20%, rgba(245,245,245,1) 43%, rgba(255,255,255,0.2091211484593838) 70%), url('+arr[randBg]+') center', backgroundSize: 'cover'}}>
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
            author === user.uid || persons.includes(user.uid) ?
              <Button className='buttonCreateTrip' component={Link} to={`/create/${id}`} variant="contained" color="transparent" style={{ backgroundColor: '#f46e16', color: 'white', fontWeight: 700 }}>
                Подробнее
              </Button>
              : ((waitingList?.includes(user.uid)) ?
                <Button className='buttonCreateTrip' component={Link}  to={`/create/${id}`} variant="contained" color="transparent" style={{ backgroundColor: '#f46e16', color: 'white', fontWeight: 700 }}>
                  На рассмотрении
              </Button> :
                <Button className='buttonCreateTrip' component={Link} onClick={(e) => handlerRequest({ e, author, id, user })}  variant="contained" color="transparent" style={{ backgroundColor: '#f46e16', color: 'white', fontWeight: 700 }}>
                  Оставить заявку
            </Button>
              ) :
            <Button Button className='buttonCreateTrip' component={Link} to={`/create/${id}`} variant="contained" color="transparent" style={{ backgroundColor: '#f46e16', color: 'white', fontWeight: 700 }}>
              Подробнее
              </Button>
        }
        {people ?
          people.map((el) => {
            return <div className='d-flex'>
              {
                el.photo ?
                <img src={el.photo } style={{ width: 30, height: 30 }} alt="" />
                :
                <img src={'https://img2.pngio.com/person-icon-computer-icons-user-profile-symbol-person-free-png-user-avatars-png-910_512.png'} style={{ width: 50, height: 30 }} alt="" />
              }
            </div>
          }) :

          'none'
        }

      </CardActions>
    </Card >
  );
}

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { Grid } from '@material-ui/core';
import CheckList from '../CheckList/CheckList'
import DateOfTrip from '../DateOfTrip/DateOfTrip'
import CheckRing from '../CheckRing/CheckRing'
import Form from '../Form/Form'
import './CurrentTripPage.css'
import BenzinForm from '../BenzinForm/BenzinForm';
import TripMap from '../TripMap/TripMap';
import { useSelector } from "react-redux";
import EndTrip from "../endTrip/endTrip";
import Chat from "../Chat/Chat";
import WaitingPerson from '../WaitingPerson/WaitingPerson'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors'



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

function CurrentTripPage() {
  const classes = useStyles();

  const user = useSelector(state => state.user)
  const { id } = useParams()
  const [trip, setTrip] = useState({})
  const [persons, setPersons] = useState([])
  useEffect(() => {
    let currentTrip

    currentTrip = db.collection('Trips').doc(id)
      .onSnapshot((doc) => {
        let currentTrip = doc.data()

        Promise.all(currentTrip.waitingList.map(personId => db.collection('Users').doc(personId).get().then(doc => ({ ...doc.data(), id: doc.id }))))
          .then((waitingListPersons) => setTrip({ ...currentTrip, id: doc.id, waitingList: waitingListPersons }))
        Promise.all(currentTrip.persons.map(personId => db.collection('Users').doc(personId).get().then(doc => ({ ...doc.data(), id: doc.id }))))
          .then((waitingListPersons) => setPersons(waitingListPersons))
      })
    return () => {
      currentTrip && currentTrip()
    }
  }, [])


  // Отрендерить дату
  const dateStart = trip?.startDate?.toDate().toLocaleDateString()
  const dateEnd = trip?.endDate?.toDate().toLocaleDateString()

  return (
    <div className='mainCont d-flex'>
      <div className='tripPage d-flex'>
        <div className='formMapBenzin'>
          <div className='formMapBenzWaiting d-flex flex-column'>
            <div className='formMapNameTrip'>
              <span>{trip.name}</span>
              <EndTrip trip={trip} tripId={id} />
            </div>
            <div className='mapForm'>
              {trip?.name ?
                <TripMap trip={trip} id={id} />
                :
                <span>netu</span>
              }
            </div>
            <div className='benzinForm'>
              <BenzinForm trip={trip} id={id} />
            </div>
          </div>
          <div className='cont1 d-flex flex-column justify-content-center'>
            <div className='textUsers'>
              <span >Заявки:</span>

            </div>
            <div className='waitersForm d-flex  flex-wrap flex-wrap-nowrap'>
              {
                trip.waitingList?.length ? trip.waitingList.map((el) =>
                  <div className='mx-3' key={el.id}>
                    <WaitingPerson name={el.name} person={el} tripId={id} trip={trip} />

                  </div>
                )
                  : null
              }
              {
                trip.waitingList?.length ? trip.waitingList.map((el) =>
                  <div key={el.id}>
                    <WaitingPerson name={el.name} person={el} tripId={id} trip={trip} />
                  </div>
                )
                  : null
              }
            </div>
          </div>
        </div>
        <div className='formTodoRingContainer d-flex flex-column'>
          <div className='formFormTodoRing'>
            <div className='formTodo'>
              <Form tripId={id} />
            </div>
            <div className='formTodoList'>
              <CheckList tripId={id} />
            </div>
            <div className='formTodoRing'>
              <CheckRing tripId={id} />
            </div>
          </div>
          <div className='textUsers'>
            <span >Едут:</span>
          </div>
          <div className='cont2 d-flex justify-content-center'>
            <div className='members d-flex justify-content-between flex-wrap'>
              {persons?.length ? persons.map(el =>
                <div className='user'>
                  <span style={{ fontFamily: 'Montserrat', fontWeight: 400, color: 'white', fontSize: 15 }}>{el.name}</span>
                  <Link to={`/profile/${el.id}`}>
                  <Avatar alt="Remy Sharp" src={el.photo} className={classes.orange}>
                    {el.name}
                  </Avatar>
                  </Link>
                </div>) : ''}

            </div>
          </div>
        </div>
      </div>
      <div className='chatContainer'>
        <Chat tripId={id} messages={trip.messages} />
      </div>
    </div>
  );
}
export default CurrentTripPage;

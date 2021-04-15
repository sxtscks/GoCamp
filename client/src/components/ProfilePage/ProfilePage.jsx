import React, { useEffect, useState } from 'react'
import Achievements from './Achievements/Achievements'
import { useSelector } from 'react-redux'
import { db } from '../../firebase/firebase'
import './ProfilePage.css'
import AvatarPicture from './ProfileInfo/Avatar/Avatar'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Trip from './TripsHistory/Trip/Trip';
import { Grid } from '@material-ui/core';


const ProfilePage = () => {

  const [user, setUser] = useState({});
  const userFromState = useSelector(state => state.user)
  const [futureTrips, setFutureTrips] = useState([]);
  const [lastTrips, setLastTrips] = useState([]);

  const [editModeTel, setEditModeTel] = useState(false);
  const [editModeAbout, setEditModeAbout] = useState(false);
  const userIdInFirebase = useSelector(state => state.user.uid)



  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 380,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    let currentUser
    if (userFromState.uid) {
      currentUser = db.collection('Users').doc(userFromState.uid)
        .onSnapshot((doc) => setUser(doc.data()))
    }
  }, [userFromState]) 


  useEffect(() => {
    let currentUser
    currentUser = db.collection("Trips")
      .onSnapshot((querySnapshot) => {
        setFutureTrips(querySnapshot.docs.map(trip => ({ ...trip.data(), id: trip.id })))
      })
      return () => {
        currentUser && currentUser()
      }
  }, [])

  const filteredArr = futureTrips.filter((trip) => trip.persons.includes(userIdInFirebase))


  // useEffect(() => {
  //   let currentUser
  //   if (userFromState.uid) {
  //     currentUser = db.collection('Users').doc(userFromState.uid).collection("lastTrips")
  //       .onSnapshot((querySnapshot) => {
  //         setLastTrips(querySnapshot.docs.map(el => ({ ...el.data(), id: el.id })))
  //       })
  //     return () => {
  //       currentUser && currentUser()
  //     }
  //   }
  // }, [userFromState])

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

  return (

    <div>

      <div className="container" style={{ marginTop: '6%' }}>
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <AvatarPicture user={user} />
                    <div className="mt-1">
                      <h4>{user.name}</h4>
                      <p className="text-secondary mb-1">Начинающий путешественник</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Имя</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.name}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Телефон</h6>
                    </div>
                    {
                      !user.phone
                        ?
                        !editModeTel
                          ? <div className="col-sm-9 text-secondary">
                            <span onClick={activateEditMode}>{user.phone} Введите номер телефона</span>
                          </div>
                          : <div className="col-sm-9 text-secondary">
                            <input autoFocus={true} onBlur={deactivateEditMode} value={user.phone} onChange={onTelephoneChange} />
                          </div>
                        :
                        !editModeTel
                          ? <div className="col-sm-9 text-secondary">
                            <span onClick={activateEditMode}>{user.phone}</span>
                          </div>
                          : <div className="col-sm-9 text-secondary">
                            <input autoFocus={true} onBlur={deactivateEditMode} value={user.phone} onChange={onTelephoneChange} />
                          </div>
                    }
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">О себе</h6>
                    </div>
                    {
                      !user.aboutMe
                        ?
                        !editModeAbout
                          ? <div className="col-sm-9 text-secondary">
                            <span onClick={activateEditModeAbout}>{user.aboutMe} Расскажите о себе</span>
                          </div>
                          : <div className="col-sm-9 text-secondary">
                            <input autoFocus={true} onBlur={deactivateEditModeAbout} value={user.aboutMe} onChange={onAboutUserChange} />
                          </div>
                        :
                        !editModeAbout
                          ? <div className="col-sm-9 text-secondary">
                            <span onClick={activateEditModeAbout}>{user.aboutMe}</span>
                          </div>
                          : <div className="col-sm-9 text-secondary">
                            <input autoFocus={true} onBlur={deactivateEditModeAbout} value={user.aboutMe} onChange={onAboutUserChange} />
                          </div>
                    }
                  </div>
                </div>
              </div>
              <div className="row gutters-sm">
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center">Текущие поездки</h6>
                      <Grid container direction="row" justify="start" alignItems="center" flexWrap="nowrap">
                        <List className={classes.root}>
                          {filteredArr
                            ? filteredArr.map((trip, index) => <Trip key={index} trip={trip} />)
                            : 'Создай новую поездку!'
                          }
                        </List>
                      </Grid>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center justify-content-center mb-4">Достижения</h6>
                      {/* <small>Web Design</small>
                      <div className="progress mb-3" style={{ height: "5px" }}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: "80%" }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div> */}
                      <Achievements lastTrips={lastTrips} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProfilePage

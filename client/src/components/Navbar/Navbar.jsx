import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DropDownButton from '../DropDownButton/DropDownButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Link, useHistory,
} from "react-router-dom";
import './Navbar.css'
import { slideInLeft } from 'react-animations'
import styled, { keyframes } from 'styled-components';
import { createTrip } from '../../redux/actionCreators/tripsAC';
import { Grid, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { addTripToFB } from '../../redux/reducers/tripReducer';
import firebase from '../../firebase/firebase'
import { db } from '../../firebase/firebase'



const SlideInLeft = styled.div`animation: 1s ${keyframes`${slideInLeft} infinite`}`;


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#32384d'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    background: '#32384d'
  },
  title: {
    flexGrow: 1,
    backgroundColor: '#32384d'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function Navbar() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);




  const handleClickOpen = () => {
    if (JSON.stringify(user) !== '{}') {
      setOpen(true);
    } else {
      history.push('/login')
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [trip, setTrip] = useState({
    name: '',
    place: '',
    startDate: '',
    endDate: '',
  })

  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector(state => state.user)



  const inputHandler = async (event) => {
    let address
    if (event.target.name === 'place') {
      address = event.target.value
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=de2b31d6-264f-4aab-b53f-b5c388f7bfde&format=json&geocode=${address}`
      );
      const resBody = await response.json()
      const coordinates = resBody?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point?.pos.split(' ').map(el => +el).reverse()
      setTrip(prev => {
        return {
          ...prev,
          coordinates: coordinates,
          [event.target.name]: event.target.value,
        }
      })

    } else if (event.target.type === 'date') {
      const myDate = new Date(event.target.value)
      setTrip(prev => {
        return {
          ...prev,
          [event.target.name]: myDate,
        }
      })
    } else {
      setTrip((prev) => {
        return { ...prev, [event.target.name]: event.target.value };
      });
    }
  }



  const handlerSubmit = (e, id) => {
    e.preventDefault()
    let tripId = ''
    console.log(user.uid);
    dispatch(addTripToFB(trip, user?.uid))
      .then((docref) => docref.id)
      .then((tripId) => history.push(`/create/${tripId}`))
      .then(() => setOpen(false))
  }

  const signOut = async () => {
    await firebase.auth().signOut()
    history.push('/')
  }

  return (
    <div className={classes.root}>

      <AppBar position="fixed" style={{ background: '#32384d' }} >
        <div className="container topContainer" style={{ position: 'relative' }}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <div className="logoContainer ">
                <Link to='/'><img src="/finalLogoHope.png" alt="" style={{ width: 378, margin: 6, position: 'absolute', top: 1, left: -280, paddingTop: 2, zIndex: 3 }} /></Link>
                <SlideInLeft style={{ display: 'inline-block' }}><img src="/WhiteText.svg" className="logoMove object van move-right" alt="" style={{ width: 240, marginLeft: 78, paddingTop: 5 }} /></SlideInLeft>
              </div>
            </Typography>
            <div className={JSON.stringify(user) !== '{}' ? 'logined' : 'unlogged'} style={{ display: 'flex', justifyContent: "space-between" }}>
              <Button onClick={handleClickOpen} className='buttonCreateTrip' variant="contained" color="transparent" style={{ backgroundColor: '#f46e16', color: 'white', fontWeight: 700 }}>
                Создать поездку
</Button>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handlerSubmit}>
                  <DialogTitle id="form-dialog-title">Создать поездку</DialogTitle>
                  <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                  <DialogContent style={{ fontFamily: 'Montserrat' }}>
                    <DialogContentText>
                      Введи название поездки и выбери дату(после можно будет изменить)
          </DialogContentText>
                    <Grid container>
                      <TextField
                        autoFocus
                        variant="outlined"
                        name='name'
                        margin="dense"
                        id="name"
                        placeholder='Название'
                        type="text"
                        fullWidth
                        onChange={inputHandler}
                      />
                      <TextField
                        variant="outlined"
                        name='place'
                        margin="dense"
                        placeholder='Куда'
                        id="place"
                        type="text"
                        fullWidth
                        onChange={inputHandler}
                      />
                      <Grid container justify='space-between'>
                        <Grid item>
                          <TextField
                            variant="outlined"
                            name='startDate'
                            margin="dense"
                            id="startDate"
                            type="date"
                            fullWidth
                            onChange={inputHandler}
                            style={{ width: "270px" }}
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            variant="outlined"
                            name='endDate'
                            margin="dense"
                            id="endDate"
                            type="date"
                            fullWidth
                            onChange={inputHandler}
                            style={{ width: "270px" }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Grid container justify="center">
                      <Button type='submit' color="primary" style={{ background: '#F46E16', color: 'white', fontWeight: 600, fontSize: '16px', height: '40px', transition: '0.3s' }}>
                        Поехали
          </Button>
                    </Grid>
                  </DialogActions>
                </form>
              </Dialog>
              {
                JSON.stringify(user) !== '{}' ?
                  <Button component={Link} to="/profile" style={{ color: 'white', fontWeight: 700 }}>Профиль</Button>
                  : ''
              }
              {
                JSON.stringify(user) !== '{}' ?
                  <DropDownButton />
                  :
                  <Button component={Link} to="/main" style={{ color: 'white', fontWeight: 700 }} color='inherit'>Поездки</Button>
              }
              {
                JSON.stringify(user) !== '{}' ?
                  <Button onClick={() => signOut()} style={{ color: 'white', fontWeight: 700 }} color='inherit'>Выйти</Button>
                  :
                  <Button component={Link} to="/login" style={{ color: 'white', fontWeight: 700 }} color='inherit'>Войти</Button>
              }
            </div>
          </Toolbar>
        </div>
      </AppBar>
    </div >
  );
}

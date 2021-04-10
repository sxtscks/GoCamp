import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from '../../firebase/firebase'
import { googleProvider, sigInFacebook } from '../../redux/actionCreators/userAC'
import { useHistory } from 'react-router-dom'
import logo from './GoCampLogoGraph (1).png'

import {
  Link,
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { userSignIn } from '../../redux/actionCreators/userAC';
import Facebook from '../Facebook/Facebook';
import GoogleBut from '../Signup/GoogleBut/GoogleBut';

import './Login.css'
import { Typography } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const [user, setUser] = useState({ userPassword: '', userEmail: '' })

  const dispatch = useDispatch()
  const classes = useStyles();
  const history = useHistory()

  const inputHandler = (e) => {
    console.log({ [e.target.name]: e.target.value });
    setUser({ ...user, [e.target.name]: e.target.value })
  }



  const submitHandler = (e) => {
    console.log("SUBMIT");
    e.preventDefault()
    dispatch(userSignIn(user.userEmail, user.userPassword))
    setUser({ userPassword: '', userEmail: '' })
    history.push("/");
  }



  const googleHandler = (e) => {
    e.preventDefault()
    dispatch(googleProvider())
    setUser({ userPassword: '', userEmail: '' })
    history.push("/");

  }


  const facebookHandler = (e) => {
    e.preventDefault()
    dispatch(sigInFacebook())
    setUser({ userPassword: '', userEmail: '' })
    history.push("/");

  }
  return (
    <div className='loginPage' >
      <Container component="main" maxWidth="xs"  className='logForm' >
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" style={{ marginTop: '30%' }}>
            <img src={logo} style={{ width: "100px" }}></img>
          </Typography>
          <form onSubmit={submitHandler} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              placeholder="Email"
              name="email"
              autoComplete="email"
              name="userEmail"
              value={user.userEmail}
              onChange={inputHandler}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              placeholder="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              name="userPassword"
              value={user.userPassword}
              onChange={inputHandler}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              style={{ backgroundColor: '#f46e16', color: 'white', fontWeight: 700, fontSize: '17px', height: '50px' }}
            >
              Войти
          </Button>
            <Grid container justify='center'>
              <Typography style={{ fontFamily: "Montserrat", fontWeight: '400', fontSize: '14px', color: 'grey', marginTop: '20px' }}>
                Войти с помощью
        </Typography>
            </Grid>
            <Grid container justify='space-between'>
              <GoogleBut googleHandler={googleHandler} />
              <Facebook facebookHandler={facebookHandler} />
            </Grid>
            <Grid container justify='center'>
              <Link to="/signup" variant="body2" style={{ color: '#32384d', textDecoration: 'none', marginTop: "20px" }}>
                {"Нет аккаунта? Зарегистрируйся!"}
              </Link>
            </Grid>
          </form>
        </div>
      </Container>
    </div >
  );
}


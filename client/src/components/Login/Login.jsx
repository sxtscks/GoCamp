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
    width: '100%', // Fix IE 11 issue.
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
    <Container component="main" maxWidth="xs" style={{ marginTop: '10%' }} className='logForm' >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} >

        </Avatar>
        <Typography component="h1" variant="h5">
          Войти
        </Typography>
        <form onSubmit={submitHandler} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            name="userEmail"
            value={user.userEmail}
            onChange={inputHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
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
            style={{ backgroundColor: '#f46e16', color: 'white', fontWeight: 700 }}
          >
            Войти
          </Button>
          <Facebook facebookHandler={facebookHandler} />
          <GoogleBut googleHandler={googleHandler} />
          <Grid container>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Нет аккаунта? Зарегистрируйся!"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}


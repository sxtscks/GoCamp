import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';
import { googleProvider, userSignUp, sigInFacebook } from '../../redux/actionCreators/userAC';
import firebase from '../../firebase/firebase'
import GoogleBut from './GoogleBut/GoogleBut';
import Facebook from '../Facebook/Facebook';



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

export default function Signup() {
  const classes = useStyles();

  const dispatch = useDispatch()

  const [user, setUser] = useState({ userName: '', userPassword: '', userEmail: '' })

  const inputHandler = (e) => {
    console.log({ [e.target.name]: e.target.value });
    setUser({ ...user, [e.target.name]: e.target.value })
  }



  const emailHandler = (e) => {
    e.preventDefault()
    dispatch(userSignUp(user.userName, user.userEmail, user.userPassword))
    setUser({ userName: '', userPassword: '', userEmail: '' })
  }

  const googleHandler = (e) => {
    e.preventDefault()
    dispatch(googleProvider())
    setUser({ userName: '', userPassword: '', userEmail: '' })
  }


  const facebookHandler = (e) => {
    e.preventDefault()
    dispatch(sigInFacebook())
    setUser({ userName: '', userPassword: '', userEmail: '' })
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" constiant="h5">
          Зарегистрироваться
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            constiant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Введите имя"
            name="userName"
            autoComplete="name"
            autoFocus
            value={user.userName}
            onChange={inputHandler}
          />
          <TextField
            constiant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Введите Email"
            name="userEmail"
            autoComplete="email"
            autoFocus
            value={user.userEmail}
            onChange={inputHandler}

          />
          <TextField
            constiant="outlined"
            margin="normal"
            required
            fullWidth
            name="userPassword"
            label="Придумайте пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            value={user.userPassword}
            onChange={inputHandler}
          />
          <Button
            type="submit"
            fullWidth
            constiant="contained"
            color="primary"
            className={classes.submit}
            onClick={emailHandler}
          >
            Зарегистрироваться
          </Button>
          <GoogleBut googleHandler={googleHandler} />
          <Facebook facebookHandler={facebookHandler} />
          <button onClick={()=> firebase.auth().signOut()}>sign out</button>
        </form>
      </div>
    </Container>
  );
}

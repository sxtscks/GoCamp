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
import { userSignUp } from '../../redux/actionCreators/userAC';
import firebase from '../../firebase/firebase'



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

  const userSignup = async () => {
    await firebase.auth().createUserWithEmailAndPassword(user.userEmail, user.userPassword)
      .then(data => {
        console.log('here', data);
        firebase.auth().currentUser.updateProfile({
          displayName: user.userName,
        })
      })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    // dispatch(userSignUp(user.userName, user.userPassword, user.userEmail))
    userSignup()
    setUser({ userName: '', userPassword: '', userEmail: '' })
  }


  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '12%' }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Зарегистрироваться
        </Typography>
        <form onSubmit={submitHandler} className={classes.form} noValidate>
          <TextField
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
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
            variant="contained"
            className={classes.submit}
            style={{ backgroundColor: '#f46e16', color: 'white', fontWeight: 700 }}
          >
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </Container>
  );
}

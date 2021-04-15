import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';
import { userSignUp } from '../../redux/reducers/userReducer';
import { useHistory } from 'react-router-dom'
import './Signup.css'


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
  const history = useHistory()



  const [user, setUser] = useState({ userName: '', userPassword: '', userEmail: '' })

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }



  const emailHandler = (e) => {
    e.preventDefault()
    dispatch(userSignUp(user.userName, user.userEmail, user.userPassword))
    setUser({ userName: '', userPassword: '', userEmail: '' })
    history.push("/");

  }

  return (


    <div className="itemsContainer">
      <div className="regPage">
        <Container className='govnoPoganoe' component="main" maxWidth="xs" style={{ marginTop: '10%', padding: 5 }}>
          <CssBaseline />
          <div className={classes.paper} >
            <Typography component="h1" variant="h5" style={{ fontFamily: "Montserrat", fontWeight: '500' }}>
              Добро Пожаловать!
        </Typography>
            <form className={classes.form} noValidate>
              <TextField
                className={classes.root}
                variant="outlined"
                margin="normal"
                fullWidth
                id="name"
                placeholder="Как тебя зовут?"
                name="name"
                autoComplete="name"
                name="userName"
                value={user.userName}
                onChange={inputHandler}
                InputProps={{
                  className: classes.input,
                }}
              />
              <TextField
                className={classes.root}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                placeholder="Напиши свой Email"
                name="userEmail"
                autoComplete="email"
                value={user.userEmail}
                onChange={inputHandler}

              />
              <TextField
                className={classes.root}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="userPassword"
                placeholder="Придумай пароль"
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
                variant="contained"
                className={classes.submit}
                style={{ backgroundColor: '#f46e16', color: 'white', fontWeight: 700, fontSize: '17px', height: '50px' }}
              >
                Зарегистрироваться
          </Button>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
}

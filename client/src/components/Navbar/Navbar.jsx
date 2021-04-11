import React from 'react';
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
import { useDispatch } from 'react-redux'
import {
  Link, useHistory,
} from "react-router-dom";
import './Navbar.css'
import { slideInLeft } from 'react-animations'
import styled, { keyframes } from 'styled-components';
import { createTrip } from '../../redux/actionCreators/tripsAC';

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
}));

export default function Navbar() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [form, setForm] = useState({
    name: '',
    place: '',
    startDate: '',
    endDate: '',
    id: Date.now().toLocaleString(),
  })

  const dispatch = useDispatch()
  const history = useHistory()


  const inputHandler = async (event) => {
    let address
    if (event.target.name === 'place') {
      address = event.target.value
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=51ad9d93-9100-4ffa-8ebf-138a17d2a225&format=json&geocode=${address}`
      );
      const resBody = await response.json()
      const coordinates = resBody?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point?.pos.split(' ').map(el => +el).reverse()
      setForm(prev => {
        return {
          ...prev,
          coordinates,
          [event.target.name]: event.target.value,
        }
      })
    } else {
      setForm((prev) => {
        return { ...prev, [event.target.name]: event.target.value };
      });
    }
  }

  console.log(form);

  const handlerSubmit = (e, id) => {
    e.preventDefault()

    dispatch(createTrip(form))
    // history.push(`/event-page/${id}`);
    setOpen(false);
  }

  return (
    <div className={classes.root}>

      <AppBar position="fixed" style={{ background: '#32384d' }} >
        <div className="container topContainer" style={{ positin: 'relative' }}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <div className="logoContainer ">
                <Link to='/'><img src="/finalLogoHope.png" alt="" style={{ width: 378, margin: 6, position: 'absolute', top: 1, left: -280, paddingTop: 2, zIndex: 3 }} /></Link>
                {/* <div style={{width:108,height:67,position:'absolute',left:-5,zIndex:2, backgroundColor:'red'}}></div> */}
                <SlideInLeft style={{ display: 'inline-block' }}><img src="/WhiteText.svg" className="logoMove object van move-right" alt="" style={{ width: 240, marginLeft: 78, paddingTop: 5 }} /></SlideInLeft>
              </div>
            </Typography>
            <div style={{ display: 'flex', justifyContent: "space-between", width: 550 }}>
              <Button onClick={handleClickOpen} className='buttonCreateTrip' variant="contained" color="transparent" style={{ backgroundColor: '#f46e16', color: 'white', fontWeight: 700 }}>
                Создать поездку
</Button>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handlerSubmit}>
                  <DialogTitle id="form-dialog-title">Создать поездку</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Введи название поездки и выбери дату(после можно будет изменить)
          </DialogContentText>
                    <TextField
                      autoFocus
                      name='name'
                      margin="dense"
                      id="name"
                      label="Название"
                      type="text"
                      fullWidth
                      onChange={inputHandler}
                    />
                    <TextField
                      name='place'
                      margin="dense"
                      label="Куда"
                      id="place"
                      type="text"
                      fullWidth
                      onChange={inputHandler}
                    />
                    <TextField
                      name='startDate'
                      margin="dense"
                      id="startDate"
                      type="date"
                      fullWidth
                      onChange={inputHandler}
                    />
                    <TextField
                      name='endDate'
                      margin="dense"
                      id="endDate"
                      type="date"
                      fullWidth
                      onChange={inputHandler}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Отмена
          </Button>
                    <Button type='submit' color="primary">
                      Поехали!
          </Button>
                  </DialogActions>
                </form>
              </Dialog>
              <Button component={Link} to="/profile" style={{ color: 'white', fontWeight: 700 }}>Профиль</Button>
              <DropDownButton />
              <Button component={Link} to="/login" style={{ color: 'white', fontWeight: 700 }} color='inherit'>Войти</Button>
            </div>
          </Toolbar>
        </div>
      </AppBar>
    </div>
  );
}

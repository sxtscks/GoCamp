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

import {
  Link,
} from "react-router-dom";

import './Navbar.css'
import { slideInLeft } from 'react-animations'
import styled, { keyframes } from 'styled-components';

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

  return (
    <div className={classes.root}>

      <AppBar position="fixed" style={{ background: '#32384d' }} >
        <div className="container topContainer" style={{ positin: 'relative' }}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <div className="logoContainer ">
                <Link to='/'><img src="/GoCampLogoGraph.png" alt="" style={{ width: 225, margin: 6, position: 'absolute', top: 2, left: -130, paddingTop: 2, zIndex: 3 }} /></Link>
                {/* <div style={{width:108,height:67,position:'absolute',left:-5,zIndex:2, backgroundColor:'red'}}></div> */}
                <SlideInLeft style={{ display: 'inline-block' }}><img src="/WhiteText.svg" className="logoMove object van move-right" alt="" style={{ width: 240, marginLeft: 78, paddingTop: 5 }} /></SlideInLeft>
              </div>
            </Typography>
            <div style={{ display: 'flex', justifyContent: "space-between", width: 550 }}>
              <Button onClick={handleClickOpen} className='buttonCreateTrip' variant="contained" color="transparent" style={{ backgroundColor: '#f46e16', color: 'white', fontWeight: 700 }}>
                Создать поездку
</Button>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
          </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
          </Button>
                  <Button onClick={handleClose} color="primary">
                    Subscribe
          </Button>
                </DialogActions>
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

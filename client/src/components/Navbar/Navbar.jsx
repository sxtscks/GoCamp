import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DropDownButton from '../DropDownButton/DropDownButton';
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

  return (
    <div className={classes.root}>

      <AppBar position="fixed" style={{ background: '#32384d'}} >
        <div className="container topContainer">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <div className="logoContainer ">
                <Link to='/'><img src="/GoCampLogoPlug2332.png" alt="" style={{ width: 110, margin: 6, position: 'absolute', top: -3, left: -20, paddingTop: 2, zIndex: 3 }} /></Link>
                {/* <div style={{width:108,height:67,position:'absolute',left:-5,zIndex:2, backgroundColor:'red'}}></div> */}
                <SlideInLeft style={{ display: 'inline-block' }}><img src="/WhiteText.svg" className="logoMove object van move-right" alt="" style={{ width: 240, marginLeft: 78, paddingTop: 5 }} /></SlideInLeft>
              </div>
            </Typography>
            <div style={{ display: 'flex', justifyContent: "space-between", width: 550 }}>
              <Button className='buttonCreateTrip' component={Link} to="/create" variant="contained" color="transparent" style={{ backgroundColor: '#f46e16', color: 'white', fontWeight: 700 }}>
                Создать поездку
</Button>
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

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
    background: '#217ca3'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    background: '#217ca3'
  },
  title: {
    flexGrow: 1,
    backgroundColor: '#217ca3'
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <AppBar position="static" color='transparent'>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <div className="logoContainer ">
            <img src="/GoCampLogoPlug2332.png" alt="" style={{width:110,margin:6,position:'absolute',top:-3,left:-20,paddingTop:2,zIndex:3}} />
            {/* <div style={{width:108,height:67,position:'absolute',left:-5,zIndex:2, backgroundColor:'red'}}></div> */}
            <SlideInLeft style={{display:'inline-block'}}><img src="/WhiteText.svg" className="logoMove object van move-right" alt="" style={{width:240,marginLeft:78,paddingTop:5}} /></SlideInLeft>
            </div>
          </Typography>
          <DropDownButton />
          <Button className='buttonCreateTrip' component={Link} to="/create" variant="contained" color="transparent" style={{backgroundColor:'#ff8d3f'}}>
            Создать поездку
</Button>
          <Button component={Link} to="/login" color='inherit'>Войти</Button>
        </Toolbar>
      </AppBar>
      </div>

  );
}

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color='secondary'>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            GoCamp
          </Typography>
          <DropDownButton />
          <Button component={Link} to="/create" variant="contained" color="primary">
            Создать поездку
</Button>
          <Button component={Link} to="/login" color='inherit'>Войти</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

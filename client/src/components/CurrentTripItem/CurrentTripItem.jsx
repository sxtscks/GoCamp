import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddBoxIcon from '@material-ui/icons/AddBox';

import {
  Link, useLocation,
} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    background: 'whitesmoke',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontFamily: 'Montserrat',
    fontWeight: '700'
  },
  pos: {
    marginBottom: 12,
    fontFamily: 'Montserrat',
  },
});

export default function CurrentTripItem({ name, id, persons, startDate, endDate, place }) {
  const classes = useStyles();

  let location = useLocation()

  return (
    <Card className={classes.root}>
      <CardContent>
        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
          {author}
        </Typography> */}
        <Typography variant="h5" component="h2" className={classes.title}>
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {/* {startDate.toDate().toDateString()} - {endDate.toDate().toDateString()} */}
        </Typography>
        {/* <Typography variant="body2" component="p">
          {
            persons?.length ?
              <div>
                Количество людей: {persons.length}
                <br />
                Едут: {persons.join(', ')}
              </div>
              : <p>Возьми кого-нибудь с собой!</p>
          }
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button className='buttonCreateTrip' component={Link} to={`/create/${id}`} variant="contained" color="transparent" style={{ backgroundColor: '#f46e16', color: 'white', fontWeight: 700 }}>
          Подробнее
</Button>
        {
          location.pathname === '/main' ?
            <Button className='buttonCreateTrip' component={Link} to={`/create/${id}`} variant="contained" color="transparent" style={{ backgroundColor: '#f46e16', color: 'white', fontWeight: 700 }}>
              {/* <AddBoxIcon/> */}
            </Button>
            : ''
        }
      </CardActions>
    </Card>
  );
}

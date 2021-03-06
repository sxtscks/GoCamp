import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TodayIcon from '@material-ui/icons/Today';
import RoomIcon from '@material-ui/icons/Room';
import DescriptionIcon from '@material-ui/icons/Description';
import EventIcon from '@material-ui/icons/Event';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    paddingLeft: 100
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));


export default function TripInfo({ myTopic }) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  console.log(myTopic);
  
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            {myTopic.title}
          </Typography>
          <div className={classes.demo}>
            <List dense={dense}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <TodayIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Start event"
                  secondary={'event.startdate'}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <EventIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="End event"
                  secondary={'event.enddate'}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <RoomIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Location"
                  secondary={'event.location'}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <DescriptionIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Description"
                  secondary={'event.description'}
                />
              </ListItem>

            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

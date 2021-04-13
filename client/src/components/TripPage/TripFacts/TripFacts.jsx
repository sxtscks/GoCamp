import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    paddingLeft: 120
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function TripFacts({ myTopic }) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <div className={classes.root}>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" className={classes.title}>
          Наши советы:
          </Typography>
        <div className={classes.demo}>
          <List dense={dense}>
            <ListItem>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText
                primary={myTopic.averageTemp}
                secondary={secondary ? 'Secondary text' : null}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText
                primary={myTopic.places}
                secondary={secondary ? 'Secondary text' : null}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText
                primary={myTopic.advices}
                secondary={secondary ? 'Secondary text' : null}
              />
            </ListItem>
          </List>
        </div>
      </Grid>
    </div>
  );
}

import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ExploreIcon from '@material-ui/icons/Explore';
import Divider from '@material-ui/core/Divider';
const Trip = ({ trip }) => {
  return (
    <div>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{background: '#f46e16'}}>
            <ExploreIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={trip.name} secondary={trip.place} />
      </ListItem>
      <Divider variant="fullwidth" component="li" />
    </div>
  )
}
export default Trip

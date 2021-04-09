import React from 'react'
import { Grid } from '@material-ui/core';
import './TripPage.css'
import CheckList from '../CheckList/CheckList'
import CheckRing from '../CheckRing/CheckRing'
import DateOfTrip from '../DateOfTrip/DateOfTrip'

function TripPage() {
    return (
 <div className="tripPage">

        <div className="container">
        <Grid 
        container spacing={2}  
        // direction="row-reverse"
        // justify="space-between"
        // alignItems="center"
        >
    

            <Grid item  sm={6} style={{marginTop:30}} >
                <CheckList/>
            </Grid>
            <Grid item
            spacing={2}  
            direction="column"
            // justify="center"
            alignItems="center"
            style={{marginLeft:150}}>

            <Grid  item sm={8} xs={3} style={{marginTop:30, marginLeft:30}}>
                <DateOfTrip/>
            </Grid>
            <Grid  item    xs={4}>
                <CheckRing/>
            </Grid>
            </Grid>
                <div className="roadMap">

                </div>
        </Grid>
    </div>
                </div>
    
    )
}

export default TripPage

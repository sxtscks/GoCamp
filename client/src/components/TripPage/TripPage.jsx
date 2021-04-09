import React from 'react'
import { Grid } from '@material-ui/core';

import CheckLiist from '../CheckList/CheckList'
import CheckRing from '../CheckRing/CheckRing'
import DateOfTrip from '../DateOfTrip/DateOfTrip'

function TripPage() {
    return (
        <Grid>
            <div className="checkList">
            <CheckLiist/>
            </div>
            <div className="dateOfTrip">
                <DateOfTrip/>
            </div>
            <div className="checkRing">
                <CheckRing/>
            </div>
            <div className="roadMap">

            </div>
        </Grid>
    )
}

export default TripPage

import { Grid } from '@material-ui/core';
import CheckList from '../CheckList/CheckList'
import DateOfTrip from '../DateOfTrip/DateOfTrip'
import CheckRing from '../CheckRing/CheckRing'
import Form from '../Form/Form'
import './CurrentTripPage.css'

function CurrentTripPage() {
    return (
        <div className="mainCont">

 <div className="tripPage">

        <div className="container">
        <Grid 
        container spacing={2}  
        // direction="row-reverse"
        // justify="space-between"
        // alignItems="center"
        >
    

            <Grid item  sm={6} style={{marginTop:30}} >
            <Grid item xs={12}>
                <Form/>
            </Grid>
                <CheckList/>
            </Grid>
            <Grid item
            spacing={2}  
            direction="column"
            // justify="center"
            alignItems="center"
            style={{marginLeft:150}}>

            <Grid  item sm={8} xs={3} style={{marginTop:40, marginLeft:30}}>
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
                </div>
    
    )
}

export default CurrentTripPage

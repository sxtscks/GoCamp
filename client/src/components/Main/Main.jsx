import { useSelector } from "react-redux"
import MainMap from '../MainMap/MainMap'
import CurrentTrips from '../CurrentTrips/CurrentTrips'
import './Main.css'

function Main() {

  const user = useSelector(state => state.user)

  console.log(user, "USER STATE");
  return (
    <div className="d-flex">
      <div className="feedContainer">
        <CurrentTrips />
      </div>
      <div style={{ marginTop: '2.5%' }} className="mapContainer">
        <MainMap />
      </div>
    </div>
  )
}

export default Main

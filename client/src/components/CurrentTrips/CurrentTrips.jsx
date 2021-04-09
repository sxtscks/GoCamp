import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTrips } from '../../redux/actionCreators/tripsAC'
import CurrentTripItem from '../CurrentTripItem/CurrentTripItem'
import todosReducer from '../../redux/reducers/todosReducer'

function CurrentTrips() {

  const dispatch = useDispatch()

  const trips = useSelector(state => state.trips)

  useEffect(() => {
    dispatch(getTrips(trips))
  }, [])

  return (
    <div style={{marginTop: '5%'}}>
      <div>
        <h2>Текущие Поездки:</h2>
      </div>
      <div>
        {
          trips.length ?
            trips.map((trip) => <CurrentTripItem key={trip.id} name={trip.name} author={trip.author} date={trip.date} persons={trip.persons} id={trip.id} />)
            : <h3>Список пуст. Создайте новую поездку!</h3>
        }
      </div>
    </div>
  )
}

export default CurrentTrips

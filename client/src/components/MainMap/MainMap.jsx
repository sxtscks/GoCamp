import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { YMaps, Map, Placemark, RouteButton, GeolocationControl, Clusterer, RoutePanel } from 'react-yandex-maps'
import { db } from '../../firebase/firebase'
import './MainMap.css'
import placeMarkIcon from './pointMark.svg'



function MainMap({ myTrips }) {

  const key = 'de2b31d6-264f-4aab-b53f-b5c388f7bfde'

  const user = useSelector(state => state.user)
  // const [myTrips, setMyTrips] = useState([])

  // useEffect(() => {
  //   let currentTrips = db.collection('Users').doc(user.uid)
  //     .collection('futureTrips')
  //     .onSnapshot((querySnapshot) => {
  //       setMyTrips(querySnapshot.docs.map((trip) => ({ ...trip.data(), id: trip.id })))
  //     })
  //   return () => {
  //     currentTrips()
  //   }

  // }, [])


  // if(!user.uid) return null

  return (
    <YMaps query={{ lang: 'ru_RU', ns: "use-load-option", apikey: key }}>
      <div>
        <Map defaultState={{
          center: [55.37, 35.75],
          zoom: 4,
          controls: ['zoomControl', 'fullscreenControl'],
        }}
          modules={['control.ZoomControl', 'control.FullscreenControl', 'geocode']}
          className='mainMap'>
          <GeolocationControl options={{ float: 'left' }} />
          <Clusterer options={{ groupByCoordinates: false }}>
            {myTrips.length ?
              myTrips.map(trip => {
                return (
                  <div key={trip.id}>
                    <Placemark
                      onClick={() => console.log('Привет')}
                      geometry={trip.coordinates}
                    />
                  </div>
                );
              })
              : ''
            }
          </Clusterer>
        </Map>
      </div>

    </YMaps>
  )
}

export default MainMap

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { YMaps, Map, Placemark, RouteButton, GeolocationControl, Clusterer, RoutePanel } from 'react-yandex-maps'
import { db } from '../../firebase/firebase'
import './MainMap.css'
// import icon from './GoCampLogoGraph (1).png'



function MainMap() {

  const key = 'de2b31d6-264f-4aab-b53f-b5c388f7bfde'

  // const user = useSelector(state => state.user)
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

  // console.log(myTrips);


  return (
    <YMaps query={{ lang: 'ru_RU', ns: "use-load-option", apikey: key }}>
      <div>
        <Map defaultState={{
          center: [55.37, 35.75],
          zoom: 6,
          controls: ['zoomControl', 'fullscreenControl'],
        }}
          modules={['control.ZoomControl', 'control.FullscreenControl', 'geocode']}
          className='mainMap'>
          {/* <RouteButton instanceRef={ref => {
            if (ref) {
              ref.routePanel.state.set({
                from: "Москва",
                to: myTrip.coordinates,
                type: "auto"
              });
              const obj = ref.routePanel.getRouteAsync()
              obj.then(function (multiRoute) {
                multiRoute.model.events.add('requestsuccess', function () {
                  const activeRoute = multiRoute.getActiveRoute()
                  if (activeRoute) {
                    console.log('distance', activeRoute.properties.get('distance').text);
                  }
                })
              })
            }
          }} options={{ float: 'right' }} /> */}
          <GeolocationControl options={{ float: 'left' }} />
          <Clusterer options={{ groupByCoordinates: false }}>
            <Placemark
              // geometry={myTrip.coordinates}
            />
          </Clusterer>
        </Map>
      </div>

    </YMaps>
  )
}

export default MainMap

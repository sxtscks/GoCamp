import { YMaps, Map, Placemark, RouteButton, GeolocationControl, Clusterer, RoutePanel } from 'react-yandex-maps'
import './TripMap.css'
import icon from './GoCampLogoGraph (1).png'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addDistance } from '../../redux/actionCreators/tripsAC'

function TripMap({ myTrip }) {

  const key = '51ad9d93-9100-4ffa-8ebf-138a17d2a225'

  const dispatch = useDispatch()  

  return (
    <YMaps query={{ lang: 'ru_RU', ns: "use-load-option", apikey: key }}>
      <div>
        <Map defaultState={{
          center: myTrip.coordinates,
          zoom: 6,
          controls: ['zoomControl', 'fullscreenControl'],
        }}
          modules={['control.ZoomControl', 'control.FullscreenControl', 'geocode']}
          className='map'>
          <RouteButton instanceRef={ref => {
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
                    let distance = activeRoute.properties.get('distance')
                    dispatch(addDistance(myTrip.id, distance))
                  }
                })
              })
            }
          }} options={{ float: 'right' }} />
          <GeolocationControl options={{ float: 'left' }} />
          <Clusterer options={{ groupByCoordinates: false }}>
            <Placemark
              geometry={myTrip.coordinates}
            />
          </Clusterer>
        </Map>
      </div>

    </YMaps>
  )
}

export default TripMap

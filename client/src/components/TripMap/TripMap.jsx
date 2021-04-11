import { YMaps, Map, Placemark, RouteButton, RouteEditor, GeolocationControl, Clusterer } from 'react-yandex-maps'
import './TripMap.css'
import icon from './GoCampLogoGraph (1).png'

function TripMap({ myTrip }) {

  const key = '51ad9d93-9100-4ffa-8ebf-138a17d2a225'


  return (
    <YMaps query={{ lang: 'ru_RU', ns: "use-load-option", apikey: key }}>
      <div>
        <Map defaultState={{
          center: myTrip.coordinates,
          zoom: 8,
          controls: ['zoomControl', 'fullscreenControl'],
        }}
          modules={['control.ZoomControl', 'control.FullscreenControl', 'geocode']}
          className='map'>
          <RouteButton options={{ float: 'right' }} />
          <RouteEditor />
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

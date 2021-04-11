import { YMaps, Map, Placemark, RouteButton, RouteEditor, GeolocationControl } from 'react-yandex-maps'
import './TripMap.css'
import icon from './GoCampLogoGraph (1).png'

function TripMap() {

  const key = 'de2b31d6-264f-4aab-b53f-b5c388f7bfde'

  return (
    <YMaps query={{ lang: 'ru_RU', ns: "use-load-option", apikey: key }}>
      <div>
        <Map defaultState={{
          center: [55.75, 37.57],
          zoom: 10,
          controls: ['zoomControl', 'fullscreenControl'],
        }}
          modules={['control.ZoomControl', 'control.FullscreenControl', 'geocode']}
          className='map'>
          <RouteButton options={{ float: 'right' }} />
          <RouteEditor />
          <GeolocationControl options={{ float: 'left' }} />
          <Placemark
            geometry='55.75, 37.57'
            options={{
              iconLayout: 'default#image',
              iconImageHref: {icon},
              iconImageSize: [40, 40],
            }}
          />
        </Map>
      </div>

    </YMaps>
  )
}

export default TripMap

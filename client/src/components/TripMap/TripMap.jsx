import { YMaps, Map } from 'react-yandex-maps'
import './TripMap.css'

function TripMap() {

  const key = 'de2b31d6-264f-4aab-b53f-b5c388f7bfde'

  return (
    <YMaps query={{lang: 'en_RU',  ns: "use-load-option", apikey: key }}>
      <div>
        Я КАРТА, Я КАРТА
        <Map defaultState={{
          center: [55.75, 37.57],
          zoom: 10,
          controls: ['zoomControl', 'fullscreenControl'],
        }}
          modules={['control.ZoomControl', 'control.FullscreenControl', 'geocode']}
          className='map' />
      </div>

    </YMaps>
  )
}

export default TripMap

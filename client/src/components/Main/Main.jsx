import { useSelector } from "react-redux"
import MainMap from '../MainMap/MainMap'
import CurrentTrips from '../CurrentTrips/CurrentTrips'
import './Main.css'
import { db } from "../../firebase/firebase"
import { useState, useEffect } from 'react'
import CurrentTripItem from '../CurrentTripItem/CurrentTripItem'



function Main() {

  const user = useSelector(state => state.user)
  const [myTrips, setMyTrips] = useState([])


  useEffect(() => {
    let currentUsersTrips = db.collection("Users")
      .onSnapshot((querySnapshot) => {
          querySnapshot.docs.map((trip) => db.collection('Users').doc(trip.id)
        .collection('futureTrips')
        .onSnapshot((querySnapshot) => { 
          setMyTrips((prev)=> [...prev,...querySnapshot.docs.map((trip) => ({ ...trip.data(), id: trip.id }))])
        })
          )})
    return () => {
      currentUsersTrips && currentUsersTrips()
    }
    },[])
   

    const simpleArr = myTrips
    const sortedTrips = simpleArr.sort((a, b) => a.startDate - b.startDate).filter((item, i, ar) => ar.indexOf(item) === i)

   
    let cities = sortedTrips.reduce((acc, city) => {
      if (acc.map[city.id]) // если данный город уже был
        return acc; // ничего не делаем, возвращаем уже собранное
  
      acc.map[city.id] = true; // помечаем город, как обработанный
      acc.cities.push(city); // добавляем объект в массив городов
      return acc; // возвращаем собранное
    }, {
      map: {}, // здесь будут отмечаться обработанные города
      cities: [] // здесь конечный массив уникальных городов
    })
    .cities; // получаем конечный массив

    console.log('idis',cities)
    


  return (
    <div className="d-flex">
      <div className="feedContainer">
        {
          cities.length ?
          cities.map((trip) => <ul><CurrentTripItem key={trip.id} name={trip.name} id={trip.id} author={trip.author} waitingList={trip.waitingList}  persons={trip.persons} /></ul>)
            : <h3>Список пуст. Создайте новую поездку!</h3>
        }
      </div>
      <div style={{ marginTop: '2.5%' }} className="mapContainer">
        <MainMap myTrips={cities} />
      </div>
    </div>
  )
}

export default Main

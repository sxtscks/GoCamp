import { useSelector } from "react-redux"
import MainMap from '../MainMap/MainMap'
import CurrentTrips from '../CurrentTrips/CurrentTrips'
import './Main.css'
import { db } from "../../firebase/firebase"
import { useState, useEffect } from 'react'
import CurrentTripItem from '../CurrentTripItem/CurrentTripItem'
import Preloader from "../Preloader/Preloader"
import { useHistory } from "react-router-dom"
import firebase from '../../firebase/firebase';




function Main() {

  const user = useSelector(state => state.user)
  const [subscribeTrips, setSubscribeTrips] = useState([])
  const [myTrips, setMyTrips] = useState([])

  console.log({myTrips})
  const history = useHistory()

  useEffect(() => {
    let currentUsersTrips = db.collection("Users")
      .onSnapshot((querySnapshot) => {

        Promise.all(querySnapshot.docs.map((user) => db.collection('Users').doc(user.id).collection('futureTrips').get()
        ))
        // .then(qss => console.log({qss}))
          .then(qss => qss.flatMap(qs => qs.docs.map(d => ({...d.data(), id: d.id}))))
          .then(allTrips => [...new Map(allTrips.map(item => [item['name'], item])).values()])
          // .then(allTrips => allTrips.filter(trip => trip.length))
          .then(trips =>setMyTrips(trips))
      })
    return () => {
      currentUsersTrips && currentUsersTrips()
    }
  }, [])

  const handlerRequest = ({e,author, id, user}) => {
    e.preventDefault()
    console.log({author, id})
    if (JSON.stringify(user) !== '{}') {
      db.collection('Users').doc(author).collection('futureTrips').doc(id).update({
        'waitingList': firebase.firestore.FieldValue.arrayUnion(user.uid)
      })
      setSubscribeTrips(prev => [...prev, {author, id}])
    } else {
      history.push('/login')
    }
  }

  useEffect(() => {
    console.log({subscribeTrips})
    let subscribes
    if (subscribeTrips.length) {
      subscribes = subscribeTrips.map(trip => db.collection("Users").doc(trip.author)
      .collection('futureTrips').doc(trip.id).onSnapshot((doc) => {
        console.log({doc: doc.data(), id: doc.id})
        console.log({myTrips})
        setMyTrips(prev => {
          if (prev.id === doc.id) {
            return {
              ...doc.data(),
              id: doc.id
            }
          }
          return prev
        })
      }))}
      
    
    return () => subscribes?.map(el => el())
  }, [subscribeTrips])


  
  return (
    <div className="d-flex">
      <div className="feedContainer">
        {
          myTrips.length ?
          myTrips.map((trip) => <ul><CurrentTripItem handlerRequest={handlerRequest} key={trip.id} name={trip.name} id={trip.id} author={trip.author} waitingList={trip.waitingList} persons={trip.persons} /></ul>)
            : <div className='d-flex justify-content-center align-items-center' style={{paddingTop: '300px'}}>
              <Preloader />
            </div>
        }
      </div>
      <div style={{ marginTop: '2.5%' }} className="mapContainer">
        <MainMap myTrips={myTrips} />
      </div>
    </div>
  )
}

export default Main

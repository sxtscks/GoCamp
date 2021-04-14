import React from 'react'
import { useSelector } from "react-redux";
import firebase,{db} from '../../firebase/firebase'

function WaitingPerson({person,tripId,trip}) {
    const user = useSelector(state => state.user)

    const handlerConfirm = (e) => {
        e.preventDefault()
          db.collection('Users').doc(person.id).collection('futureTrips').doc(tripId).set({
            name: trip.name,
            // distance: trip.distance,
            author: trip.author,
            coordinates: trip.coordinates,
            persons: trip.persons,
            endDate: trip.endDate,
            startDate: trip.startDate,
            place: trip.place,
          })

          db.collection('Users').doc(user.uid).collection('futureTrips').doc(tripId).update({
            "persons":  firebase.firestore.FieldValue.arrayUnion(person.id),
            "waitingList": firebase.firestore.FieldValue.arrayRemove(person.id)
        
          })
      }


    const handlerCansel = (e) => {
        e.preventDefault()
          db.collection('Users').doc(user.uid).collection('futureTrips').doc(tripId).update({          
            "waitingList": firebase.firestore.FieldValue.arrayRemove(person.id)
          })
          .catch((err) => console.log(err))
      }


    console.log('lelelelele',person)
    return (
        <div className='d-flex'>
            <img src={person.photo} style={{width:30, height:30}}alt=""/>
            <p style={{color:'white'}}>{person.name}</p>
            <div className='buttonCont'>
                 <button onClick={handlerConfirm}>Invite</button>
                 <button onClick={handlerCansel}>Go away!</button>
               </div>
        </div>
    )
}

export default WaitingPerson

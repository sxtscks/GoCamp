import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { Grid } from '@material-ui/core';
import CheckList from '../CheckList/CheckList'
import DateOfTrip from '../DateOfTrip/DateOfTrip'
import CheckRing from '../CheckRing/CheckRing'
import Form from '../Form/Form'
import './CurrentTripPage.css'
import BenzinForm from '../BenzinForm/BenzinForm';
import TripMap from '../TripMap/TripMap';
import { useSelector } from "react-redux";
import EndTrip from "../endTrip/endTrip";
import Chat from "../Chat/Chat";
import WaitingPerson from '../WaitingPerson/WaitingPerson'
function CurrentTripPage() {
  const user = useSelector(state => state.user)
  const { id } = useParams()
  const [trip, setTrip] = useState({})
  const [waitLi, setWaitLi] = useState([])
  let simpleArr
  useEffect(() => {
    console.log(id);
    let currentTrip
    if (user.uid) {
      currentTrip = db.collection('Users').doc(user.uid).collection('futureTrips').doc(id)
        .onSnapshot((doc) => {
          console.log('doc data here>>>>>>', doc.data())
          setTrip(doc.data())
          let id
          console.log('waiting list >>>>', doc.data().waitingList)
          Promise.all(doc.data().waitingList.map((el) => {
            console.log('el here', el)
            id = el
            return db.collection('Users').doc(el).get()
              .then((p) => { return { ...p.data(), id: p.id } })
          }))
            .then((w) => setWaitLi(w))
          // doc.data().waitingList.map((el) => {
          //           db.collection('Users').doc(el).get().then((el)=> setWaitLi(prev=>{
          //             if (prev.find(person => person.id === el.data().id)) return prev
          //             return [...prev,{...el.data(), id: el.id}]
          //           }))})
        })
    }
    return () => {
      currentTrip && currentTrip()
    }
  }, [user])

  console.log('waitli>>>>>>>>>>>>>>>', waitLi)
  return (
    <div className="mainCont d-flex">
      <div className="tripPage d-flex">
    
          <div className="formMapBenzin">
         
            <div className="formMapBenzWaiting d-flex flex-column">
            <div className="formMapNameTrip">
              <span>К мамке твоей</span>
            </div>
                 <div className="mapForm">
                  {trip?.name ?
                <TripMap trip={trip} id={id} />
                :
                <span>netu</span>
              }
               </div>
            <div className="benzinForm">
                 <BenzinForm trip={trip} id={id} />
            </div>
     
            </div>
            
            <div className="cont1 d-flex flex-column justify-content-center">
            <div className='textUsers'>
                    <span >Заявки:</span>
                  </div>
            <div className="waitersForm d-flex justify-content-between">
              
            <div className="user">
                      <img src="https://i.imgur.com/5c5JP4B.png" alt=""/>
                    </div>
                    <div className="user">
                      <img src="https://i.imgur.com/5c5JP4B.png" alt=""/>
                    </div>
                    <div className="user">
                      <img src="https://i.imgur.com/5c5JP4B.png" alt=""/>
                    </div>
            </div>
            </div>
          </div>
    
            <div className="formTodoRingContainer d-flex flex-column">
              <div className="formFormTodoRing">
                <div className="formTodo">
                  <Form tripId={id} />
                </div>

                <div className="formTodoList">
                  <CheckList tripId={id} />
                </div>

                <div className="formTodoRing">
                  <CheckRing tripId={id} />
                </div>
                </div>
                  <div className='textUsers'>
                    <span >Едут:</span>
                  </div>
                <div className="cont2 d-flex justify-content-center">
                <div className="members d-flex justify-content-between">
                    <div className="user">
                      <img src="https://i.imgur.com/5c5JP4B.png" alt=""/>
                    </div>
                    <div className="user">
                      <img src="https://i.imgur.com/5c5JP4B.png" alt=""/>
                    </div>
                    <div className="user">
                      <img src="https://i.imgur.com/5c5JP4B.png" alt=""/>
                    </div>
                    <div className="user">
                      <img src="https://i.imgur.com/5c5JP4B.png" alt=""/>
                    </div>
                </div>
                 

                </div>
            </div>
     
      </div>


      <div className="chatContainer">
      <Chat tripId={id} messages={trip.messages} />
      </div>
    </div>
  );
}
export default CurrentTripPage;

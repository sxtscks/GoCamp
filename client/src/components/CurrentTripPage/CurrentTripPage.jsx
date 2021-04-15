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

  useEffect(() => {
    let currentTrip

    currentTrip = db.collection('Trips').doc(id)
      .onSnapshot((doc) => {
        let currentTrip = doc.data()

        Promise.all(currentTrip.waitingList.map(personId => db.collection('Users').doc(personId).get().then(doc => ({ ...doc.data(), id: doc.id }))))
          .then((waitingListPersons) => setTrip({ ...currentTrip, id: doc.id, waitingList: waitingListPersons }))


      })
    return () => {
      currentTrip && currentTrip()
    }
  }, [])



  return (
    //     <div className="mainCont d-flex">
    //       <div className="tripPage d-flex">
    //         Notification
    //         <div>
    //           <div>
    //             {
    //               trip.author === user.uid || trip?.waitingList?.length > 0 ?
    //                 <img src="https://lh3.googleusercontent.com/C4d-yyif3xUnNmqFpNwVbJUs6vUDu6-QUP_WzLfc14_2R8FaVYd2c1L99gFTZLDjfQZR=w300" style={{ width: 30, height: 30 }} alt="" />
    //                 : null
    //             }
    //             <Form tripId={id} />
    //             <EndTrip trip={trip} tripId={id} />
    //             <CheckList tripId={id} />
    //             {trip?.name ?
    //               <TripMap trip={trip} id={id} />
    //               :
    //               <span>netu</span>    //             <EndTrip trip={trip} tripId={id} />
    //             }
    //           </div>
    //           <div className="benzinForm">
    //             <BenzinForm trip={trip} id={id} />
    //           </div>

    //         </div >

    //         <div className="cont1 d-flex flex-column justify-content-center">
    //           <div className='textUsers'>
    //             <span >Заявки:</span>
    //           </div>
    //           <div className="waitersForm d-flex justify-content-between">

    //             <div className="user">
    //               <img src="https://i.imgur.com/5c5JP4B.png" alt="" />
    //             </div>
    //             <div className="user">
    //               <img src="https://i.imgur.com/5c5JP4B.png" alt="" />
    //             </div>
    //             <div className="user">
    //               <img src="https://i.imgur.com/5c5JP4B.png" alt="" />
    //             </div>
    //           </div>
    //         </div>
    //       </div >

    //       <div className="formTodoRingContainer d-flex flex-column">
    //         <div className="formFormTodoRing">
    //           <div className="formTodo">
    //             <Form tripId={id} />
    //           </div>

    //           <div className="formTodoList">
    //             <CheckList tripId={id} />
    //           </div>

    //           <div className="formTodoRing">
    //             <CheckRing tripId={id} />
    //           </div>
    //         </div>
    //         <div className='textUsers'>
    //           <span >Едут:</span>
    //         </div>
    //         <div className="cont2 d-flex justify-content-center">
    //           <div className="members d-flex justify-content-between">
    //             <div className="user">
    //               <img src="https://i.imgur.com/5c5JP4B.png" alt="" />
    //             </div>
    //             <div className="user">
    //               <img src="https://i.imgur.com/5c5JP4B.png" alt="" />
    //             </div>
    //             <div className="user">
    //               <img src="https://i.imgur.com/5c5JP4B.png" alt="" />
    //             </div>
    //             <div className="user">
    //               <img src="https://i.imgur.com/5c5JP4B.png" alt="" />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       {/* <Grid item
    //               spacing={2}
    //               direction="column"
    //               // justify="center"
    //               alignItems="center"
    //               style={{ marginLeft: 150 }}>
    //               <Grid item sm={8} xs={3} style={{ marginTop: 40, marginLeft: 30 }}>
    //               </Grid>
    //               <Grid item xs={4}> */}
    //       {/* <CheckRing tripId={id} />
    //               </Grid>
    //               <Grid item sm={7} style={{ marginTop: 70 }}>
    //                 <BenzinForm trip={trip} id={id} />
    //               </Grid>
    //               <h5 style={{ color: 'white' }}>Едут: </h5> */}
    //       {/* {user.uid === trip.author ? } */}
    //       {
    //         trip.waitingList?.length ? trip.waitingList.map((el) =>
    //             <Grid key={el.id}>

    //               <WaitingPerson name={el.name} person={el} tripId={id} trip={trip} />
    //             {/* </Grid> */}
    //             <div className="roadMap">
    //         </div>
    //         <Chat tripId={id} messages={trip.messages} />
    //            </Grid>
    //     </div >
    //     <Chat tripId={id} messages={trip.messages} />
    //       </div >
    //     </div >
    //   );
    // }
    // export default CurrentTripPage;


    <div className='mainCont d-flex'>
      <div className='tripPage d-flex'>
        <div className='formMapBenzin'>
          <div className='formMapBenzWaiting d-flex flex-column'>
            <div className='formMapNameTrip'>
              <span>К мамке твоей</span>
              <EndTrip trip={trip} tripId={id} />
            </div>
            <div className='mapForm'>
              {trip?.name ?
                <TripMap trip={trip} id={id} />
                :
                <span>netu</span>
              }
            </div>
            <div className='benzinForm'>
              <BenzinForm trip={trip} id={id} />
            </div>
          </div>
          <div className='cont1 d-flex flex-column justify-content-center'>
            <div className='textUsers'>
              <span >Заявки:</span>

            </div>
            <div className='waitersForm d-flex justify-content-between'>
              {
                trip.waitingList?.length ? trip.waitingList.map((el) =>
                  <div key={el.id}>
                    <WaitingPerson name={el.name} person={el} tripId={id} trip={trip} />
                  </div>
                )
                  : null
              }
            </div>
          </div>
        </div>
        <div className='formTodoRingContainer d-flex flex-column'>
          <div className='formFormTodoRing'>
            <div className='formTodo'>
              <Form tripId={id} />
            </div>
            <div className='formTodoList'>
              <CheckList tripId={id} />
            </div>
            <div className='formTodoRing'>
              <CheckRing tripId={id} />
            </div>
          </div>
          <div className='textUsers'>
            <span >Едут:</span>
          </div>
          <div className='cont2 d-flex justify-content-center'>
            <div className='members d-flex justify-content-between'>
              <div className='user'>
                <img src='https://i.imgur.com/5c5JP4B.png' alt='' />
              </div>
              <div className='user'>
                <img src='https://i.imgur.com/5c5JP4B.png' alt='' />
              </div>
              <div className='user'>
                <img src='https://i.imgur.com/5c5JP4B.png' alt='' />
              </div>
              <div className='user'>
                <img src='https://i.imgur.com/5c5JP4B.png' alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='chatContainer'>
        <Chat tripId={id} messages={trip.messages} />
      </div>
    </div>
  );
}
export default CurrentTripPage;

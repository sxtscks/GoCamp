// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToAll, addTrip, addTripToFB } from "../../redux/reducers/tripReducer";
// import { addUserTrip } from "../../redux/reducers/userReducer";
// import firebase from '../../firebase/firebase'
// import { db } from '../../firebase/firebase'
// import { useHistory } from "react-router-dom";
// import Form from "../Form/Form";

// const AddTripForm = () => {
//   const [trip, setTrip] = useState({ name: '', start: '', finish: '', description: '' })

//   const userFromLS = JSON.parse(window.localStorage.getItem('myApp'))
//   const tripFromState = useSelector(state => state.trip)




//   //   const { initialising, user } = useAuthState(firebase.auth());
//   const history = useHistory()

//   const dispatch = useDispatch()

//   const inputHandler = (e) => {
//     setTrip({ ...trip, [e.target.name]: e.target.value })
//   }




//   const addtripSubmit = (e) => {
//     e.preventDefault()
//     let tripId = ''
//     dispatch(addTripToFB(trip, userFromLS.key)).then((docref) => tripId = docref.id)
//     console.log(tripId);
//     history.push(`/create/${tripId}`)
//   }


//   return (
//     <>
//     <form onSubmit={addtripSubmit}>
//       <div className="mb-3">
//         <input onChange={inputHandler} value={trip.name} name="name" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
//       </div>
//       <div className="mb-3">
//         <input onChange={inputHandler} value={trip.start} name="start" type="date" className="form-control" id="exampleInputPassword1" />
//       </div>
//       <div className="mb-3">
//         <input onChange={inputHandler} value={trip.finish} name="finish" type="date" className="form-control" id="exampleInputPassword1" />
//       </div>
//       <div className="mb-3">
//         <input onChange={inputHandler} value={trip.description} name="description" type="text" className="form-control" id="exampleInputPassword1" />
//       </div>

//       <button type="submit" className="btn btn-primary">Submit</button>
//     </form>
//     </>
//   );
// }

// export default AddTripForm;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToAll, addTrip, addTripToFB } from "../../redux/reducers/tripReducer";
import { addUserTrip } from "../../redux/reducers/userReducer";
import firebase from '../../firebase/firebase'
import { db } from '../../firebase/firebase'

const AddTripForm = () => {
  const tripFromState = useSelector(state => state.trip)
  const userFromState = useSelector(state => state.user)



  const [trip, setTrip] = useState({ name: '', start: '', finish: '', description: '' })

  //   const { initialising, user } = useAuthState(firebase.auth());


  const dispatch = useDispatch()

  const inputHandler = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value })
  }




  const addtripSubmit = (e) => {
    e.preventDefault()
    // console.log(trip);
    // dispatch(addTrip(trip))
    // dispatch(addToAll(tripFromState.trip))
    // dispatch(addUserTrip(tripFromState))
    console.log(userFromState, "USER");
    dispatch(addTripToFB(trip, userFromState.key))

  }


  return (
    <form onSubmit={addtripSubmit}>
      <div className="mb-3">
        <input onChange={inputHandler} value={trip.name} name="name" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <input onChange={inputHandler} value={trip.start} name="start" type="date" className="form-control" id="exampleInputPassword1" />
      </div>
      <div className="mb-3">
        <input onChange={inputHandler} value={trip.finish} name="finish" type="date" className="form-control" id="exampleInputPassword1" />
      </div>
      <div className="mb-3">
        <input onChange={inputHandler} value={trip.description} name="description" type="text" className="form-control" id="exampleInputPassword1" />
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

export default AddTripForm;

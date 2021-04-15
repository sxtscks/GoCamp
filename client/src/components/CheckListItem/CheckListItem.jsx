import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo, importantTodo } from '../../redux/actionCreators/todoAC'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import PriorityHighSharpIcon from '@material-ui/icons/PriorityHighSharp';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import { db } from '../../firebase/firebase';
import firebase from '../../firebase/firebase'

function CheckListItem({ tripId, todo, id }) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  //   const handlerConfirm = (e) => {
  //       e.preventDefault(e)
  //       return dispatch(confirmTodo(id))
  //   }
console.log(todo, "ITEMTODO");
  const takerHandler = (e) => {
    e.preventDefault()
    db.collection('CheckListItem').doc(id).update({
      "confirmed": !todo.confirmed
    }).then(() => {
      db.collection('Trips').doc(tripId).update({
        "timeModified": Date.now()
      })
    })
  }
  // const arrIdPersons = []
  //   const trip = db.collection('Users').doc(user.uid).collection('futureTrips').doc(tripId).get().then((doc)=> arrIdPersons.push(doc.data().persons))

  // const takerHandler = (e) => {
  // e.preventDefault()
  //   arrIdPersons.map((person) => {
  //     db.collection('Users').doc(user.uid).collection('futureTrips').doc(tripId).collection('checkList').doc('someIdTodo', todo.id).update({
  //       "confirmed": !todo.confirmed,
  //       "taker": !todo.confirmed ? user.uid : ''
  //     })
  //   })
  // }



  // const importantHandler = (e) => {
  //   e.preventDefault()
  //   // arrIdPersons.map((person) => {
  //     db.collection('Users').doc(user.uid).collection('futureTrips').doc(tripId).collection('checkList').doc('someIdTodo', todo.id).update({
  //       "important": !todo.important,
  //     })
  //   })
  // }

  const importantHandler = (e) => {
    e.preventDefault()
    db.collection('CheckListItem').doc(tripId).update({
      "important": !todo.important,
    })
      .catch((err) => console.log(err))
  }

  const deleteHandler = (e) => {
    e.preventDefault()
    db.collection('Trips').doc(tripId).update({ "checkList": firebase.firestore.FieldValue.arrayRemove({ id }) })
      .then(() => {
        console.log('I am fine')
      })
      .catch((err) => console.log(err))
  }



  return (

    <li className="list-group-item d-flex justify-content-between mx-8" style={{ backgroundColor: todo?.important ? "#FF9F5F" : null }}>

      <span className="mt-2" style={{ fontFamily: 'Montserrat', fontWeight: 700, color: "#211f30", fontSize: 15 }}> {todo?.text}</span>

      {/* onClick={() => dispatch(confirmTodo(id))} */}

      <div className="buttons">
        {/* <button className="btn btn-primary mx-1" onClick={() => setEdit(!edit)}> Edit</button> */}
        <button className="btn mx-1" onClick={takerHandler} style={{ fontFamily: 'Montserrat', fontWeight: 400, color: 'white', fontSize: 10, background: todo.confirmed ? null : '#65A414' }}> <DoneOutlineOutlinedIcon fontSize="small" style={{ color: todo.confirmed ? '#65A414' : null }} /></button>
        <button className="btn mx-1" onClick={deleteHandler} style={{ fontFamily: 'Montserrat', fontWeight: 400, color: 'white', fontSize: 10, background: '#f23333' }}> <DeleteOutlineOutlinedIcon fontSize="small" /></button>
        <button className="btn mx-1" onClick={importantHandler} style={{ fontFamily: 'Montserrat', fontWeight: 400, color: 'white', fontSize: 10, background: todo.important ? "#FFFFFF" : '#F46E16' }}> <PriorityHighSharpIcon fontSize="small" style={{ color: todo.important ? '#F46E16' : null }} /></button>

      </div>
    </li >
  )
}

export default CheckListItem

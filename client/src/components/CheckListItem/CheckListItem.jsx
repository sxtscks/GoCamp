import { useState } from 'react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo, importantTodo, confirmTodo } from '../../redux/actionCreators/todoAC'
import { takeTodo } from '../../redux/reducers/tripReducer';
import { db } from '../../firebase/firebase';

function CheckListItem({ tripId, todo, id }) {
  console.log(todo, "TODO");
  const dispatch = useDispatch()
  const userFromLS = JSON.parse(window.localStorage.getItem('myApp'))

  //   const handlerConfirm = (e) => {
  //       e.preventDefault(e)
  //       return dispatch(confirmTodo(id))
  //   }
  const takerHandler = (e) => {
    e.preventDefault()
    console.log(userFromLS.key,tripId, id);
    db.collection('Users').doc(userFromLS.key).collection('futureTrips').doc(tripId).collection('checkList').doc(id).update({
      taker: userFromLS.key
    }).then(()=>{
      console.log('I am fine')
    })
      .catch((err) => console.log(err))
  }

  return (

    <li className="list-group-item d-flex justify-content-around mx-8" style={{ backgroundColor: todo.confirmed ? "#3deb63" : null }}>

      <span className="mt-2" > {todo.text}</span>

      {/* onClick={() => dispatch(confirmTodo(id))} */}

      <div className="buttons">
        {/* <button className="btn btn-primary mx-1" onClick={() => setEdit(!edit)}> Edit</button> */}
        <button className="btn mx-1" onClick={takerHandler} style={{ fontFamily: 'Montserrat', fontWeight: 700, color: 'white', fontSize: 15, background: '#217ca3' }}> Я беру!</button>
        <button className="btn mx-1"  style={{ fontFamily: 'Montserrat', fontWeight: 700, color: 'white', fontSize: 15, background: '#f23333' }}> Удалить</button>
      </div>
    </li >
  )
}

export default CheckListItem

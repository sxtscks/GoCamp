import { useState } from 'react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo, importantTodo, confirmTodo } from '../../redux/actionCreators/todoAC'

function CheckListItem({ todo, id }) {

  const dispatch = useDispatch()

//   const handlerConfirm = (e) => {
//       e.preventDefault(e)
//       return dispatch(confirmTodo(id))
//   }
 console.log(todo.confirmed)

  return (

    <li className="list-group-item d-flex justify-content-around mx-8" style={{ backgroundColor: todo.confirmed ? "#3deb63" : null }}>

      <span className="mt-2" > {todo.text}</span>



      <div className="buttons">
        {/* <button className="btn btn-primary mx-1" onClick={() => setEdit(!edit)}> Edit</button> */}
        <button className="btn mx-1" onClick={()=> dispatch(confirmTodo(id))} style={{fontFamily:'Montserrat', fontWeight:700, color:'white', fontSize:15,background:'#217ca3'}}> Я беру!</button> 
        <button className="btn mx-1" onClick={() => dispatch(deleteTodo(id))} style={{fontFamily:'Montserrat', fontWeight:700, color:'white', fontSize:15,background:'#f23333'}}> Удалить</button>
      </div>
    </li >
  )
}

export default CheckListItem

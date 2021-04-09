import { useState } from 'react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo } from '../../redux/actionCreators/todoAC'

function CheckListItem({ todo, id }) {

  const dispatch = useDispatch()


  return (

    <li className="list-group-item d-flex justify-content-around mx-8" >

      <span className="mt-2" style={{ textDecoration: todo.state ? "line-through" : null }}> {todo.text}</span>



      <div className="buttons">
        {/* <button className="btn btn-primary mx-1" onClick={() => setEdit(!edit)}> Edit</button>
        <button className="btn btn-primary mx-1" onClick={handlerDone}> Confirm</button> */}
        <button className="btn btn-danger mx-1" onClick={() => dispatch(deleteTodo(id))}> Delete</button>
      </div>
    </li >
  )
}

export default CheckListItem

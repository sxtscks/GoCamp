import { useState } from 'react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo, importantTodo, confirmTodo } from '../../redux/actionCreators/todoAC'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import PriorityHighSharpIcon from '@material-ui/icons/PriorityHighSharp';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';

function CheckListItem({ todo, id }) {

  const dispatch = useDispatch()

//   const handlerConfirm = (e) => {
//       e.preventDefault(e)
//       return dispatch(confirmTodo(id))
//   }
 console.log(todo.confirmed)

  return (

    <li className="list-group-item d-flex justify-content-between mx-8" style={{backgroundColor: todo.important ? "#FF9F5F": null}}>

      <span className="mt-2" style={{fontFamily:'Montserrat', fontWeight:700, color:"#211f30", fontSize:15}}> {todo.text}</span>



      <div className="buttons">
        {/* <button className="btn btn-primary mx-1" onClick={() => setEdit(!edit)}> Edit</button> */}
        <button className="btn mx-1" onClick={()=> dispatch(confirmTodo(id))} style={{fontFamily:'Montserrat', fontWeight:400, color:'white', fontSize:10,background:todo.confirmed ? null : '#65A414'}}> <DoneOutlineOutlinedIcon fontSize="small" style={{ color:todo.confirmed? '#65A414' : null }}/></button> 
        <button className="btn mx-1" onClick={() => dispatch(deleteTodo(id))} style={{fontFamily:'Montserrat', fontWeight:400, color:'white', fontSize:10,background:'#f23333'}}> <DeleteOutlineOutlinedIcon fontSize="small" /></button>
        <button className="btn mx-1" onClick={()=> dispatch(importantTodo(id))} style={{fontFamily:'Montserrat', fontWeight:400, color:'white', fontSize:10,background:todo.important? "#FFFFFF":'#F46E16'}}> <PriorityHighSharpIcon fontSize="small" style={{ color:todo.important? '#F46E16' : null }}/></button> 
        
      </div>
    </li >
  )
}

export default CheckListItem

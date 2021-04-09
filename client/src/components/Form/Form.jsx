import { useDispatch } from 'react-redux'
import { addTodo } from '../../redux/actionCreators/todoAC'
import { useState } from 'react'

function Form() {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')

  function handlerChange(event) {

    setValue(event.target.value)
  }
  const addTodoHandler = (e) => {
    e.preventDefault()
    dispatch(addTodo(value))
    setValue('')
  }


  return (
    <form className="container d-flex col-8 my-2" onSubmit={addTodoHandler}>
      <div className="mb-3">
        <input type="text" value={value} onChange={(e) => handlerChange(e)} className="form-control" id="exampleInputEmail1" />

      </div>
      <button type="submit" className="btn mx-3" style={{height:40,fontFamily:'Montserrat', fontWeight:700, color:'white', fontSize:15,background:'#F46E16'}}>Добавить</button>
    </form>
  )
}


export default Form
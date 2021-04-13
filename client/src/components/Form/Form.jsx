import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from '../../redux/actionCreators/todoAC'
import { useState } from 'react'
import { addTripsTodo } from '../../redux/reducers/tripReducer'
import { db } from '../../firebase/firebase'

function Form({ tripId }) {
  const dispatch = useDispatch()
  const [value, setValue] = useState({ text: '', important: false, confirmed: false, taker: '' })
  const userFromLS = JSON.parse(window.localStorage.getItem('myApp'))

const user = useSelector(state=> state.user)

  function handlerChange(event) {
    setValue({ ...value, [event.target.name]: event.target.value })
  }


  const addTodoHandler = (e) => {
    e.preventDefault()
    let todoId = '';
    console.log(value);
    dispatch(addTripsTodo(user.uid, tripId, value))
      .then((docref) => todoId = docref.id)
      .then(() => console.log(todoId, 'fyufyh'))
    setValue({text: ''})
  }


  return (
    <form className="container d-flex col-8 my-2" onSubmit={addTodoHandler}>
      <div className="mb-3">
        <input type="text" name="text" value={value.text} onChange={(e) => handlerChange(e)} className="form-control" id="exampleInputEmail1" />

      </div>
      <button type="submit" className="btn mx-3" style={{ height: 40, fontFamily: 'Montserrat', fontWeight: 700, color: 'white', fontSize: 15, background: '#F46E16' }}>Добавить</button>
    </form>
  )
}


export default Form

import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from '../../redux/actionCreators/todoAC'
import { useState } from 'react'
import { addTripsTodo } from '../../redux/reducers/tripReducer'
import { db } from '../../firebase/firebase'

function Form({ tripId }) {
  const dispatch = useDispatch()
  const [value, setValue] = useState({ text: '', important: false, confirmed: false, taker: '' })

  const user = useSelector(state => state.user)

  function handlerChange(event) {
    setValue({ ...value, [event.target.name]: event.target.value })
  }


  const addTodoHandler = (e) => {
    e.preventDefault()
    let todoId = '';
    console.log(user, "SUer in form");
    console.log(tripId, "tripId in form");

    dispatch(addTripsTodo(user.uid, tripId, value))
    // .then((docref) => todoId = docref.id)
    setValue({ text: '' })
  }


  return (
    <form className=" d-flex justify-content-center" onSubmit={addTodoHandler}>
      <div > 
        <input type="text" name="text" value={value.text} onChange={(e) => handlerChange(e)} className="form-control" id="exampleInputEmail1" style={{height:40}}/>

      </div>
      <button type="submit" className="btn mx-3" style={{ height: 40, fontFamily: 'Montserrat', fontWeight: 700, color: 'white', fontSize: 15, background: '#F46E16' }}>Добавить</button>
    </form>
  )
}


export default Form
